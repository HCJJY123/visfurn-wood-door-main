(function () {
  'use strict';
  const PHONE = '8618830278977';
  const ORIGIN = 'https://www.visfurn.com';
  const COUNTRIES = {
    us: 'United States', usa: 'United States', 'united-states': 'United States', uk: 'United Kingdom', 'united-kingdom': 'United Kingdom',
    canada: 'Canada', australia: 'Australia', germany: 'Germany', france: 'France', uae: 'UAE', 'united-arab-emirates': 'UAE',
    'saudi-arabia': 'Saudi Arabia', qatar: 'Qatar', kuwait: 'Kuwait', mn: 'Mongolia', mongolia: 'Mongolia',
    norway: 'Norway', sweden: 'Sweden', denmark: 'Denmark', ireland: 'Ireland', 'new-zealand': 'New Zealand',
  };
  const FIELDS = [
    ['Door type / application', 'product'], ['Quantity (sets)', 'quantity'], ['Door leaf / opening size', 'size'],
    ['Finished wall thickness', 'wallThickness'], ['Leaf only / complete door set', 'scope'],
    ['Frame / hardware requirements', 'hardware'], ['Finish / color', 'finish'],
    ['Destination country / port', 'country'], ['Required delivery date', 'date'], ['Drawings / door schedule available', 'drawings'],
  ];
  const line = value => String(value || '').replace(/\s+/g, ' ').trim();
  function countryFromPath(value) {
    const path = String(value || '');
    const slug = path.match(/(?:^|\/)markets\/([^/?#]+)/)?.[1] || path.match(/^\/(us|mn)(?:\/|$)/)?.[1];
    return COUNTRIES[slug] || '';
  }
  function buildMessage(context = {}) {
    const country = line(context.country) || countryFromPath(context.pageUrl);
    const values = { ...context, country };
    const existing = String(context.message || '');
    let body;
    if (existing.includes('\nDoor type / application:')) body = existing.split(/\n\n--- Attribution ---/)[0];
    else {
      const lines = ['Hello VISFURN, I would like a quote for a door project.', '', ...FIELDS.map(([label, key]) => label + ': ' + line(values[key]))];
      if (existing && !/^Hello Visfurn,? I would like to discuss a door project\.?$/i.test(existing.trim())) {
        lines.push('', 'Additional request: ' + existing.replace(/^(Hello|Hi)( VISFURN( team)?)?[,!.]?\s*/i, ''));
      }
      lines.push('', 'Please share a quotation with the supply scope, sample options and production lead time. Thank you.');
      body = lines.join('\n');
    }
    for (const [label, key] of FIELDS) {
      if (line(values[key])) body = body.split('\n').map(row => row.trimEnd() === label + ':' ? label + ': ' + line(values[key]) : row).join('\n');
    }
    let url;
    try { const parsed = new URL(context.pageUrl || '/', ORIGIN); url = parsed.origin + parsed.pathname; } catch { url = ORIGIN + '/'; }
    const attribution = [
      ['Source', line(context.source || 'website_whatsapp')],
      ['Page', line(context.pageTitle || 'VISFURN door project inquiry').replace(/\s*[|·–-]\s*VISFURN\s*$/i, '')],
      ['Intent', line(context.intent || 'request_door_quote')], ['URL', url], ['Campaign', line(context.campaign)],
    ].filter(([, value]) => value);
    return body + '\n\n--- Attribution ---\n' + attribution.map(([label, value]) => label + ': ' + value).join('\n');
  }
  function getUrl(context = {}) { return 'https://wa.me/' + PHONE + '?text=' + encodeURIComponent(buildMessage(context)); }

  if (typeof module !== 'undefined' && module.exports) module.exports = { buildMessage, getUrl, countryFromPath };
  if (typeof document === 'undefined' || window.visfurnWhatsAppPrefill) return;
  window.visfurnWhatsAppPrefill = { buildMessage, getUrl };
  const originals = new WeakMap();
  const readField = name => document.querySelector('#quote-form [name="' + name + '"]')?.value || '';
  function placement(anchor) {
    if (anchor.dataset.whatsappPlacement) return anchor.dataset.whatsappPlacement;
    if (anchor.dataset.ctaPlacement) return anchor.dataset.ctaPlacement.includes('whatsapp') ? anchor.dataset.ctaPlacement : anchor.dataset.ctaPlacement + '_whatsapp';
    if (anchor.classList.contains('vf-header-whatsapp')) return 'header_whatsapp';
    if (anchor.hasAttribute('data-vf-floating-whatsapp') || anchor.classList.contains('ld-float')) return 'floating_whatsapp';
    if (anchor.closest('footer')) return 'footer_whatsapp';
    if (anchor.closest('.pdp-sticky-bar, .vf-sticky')) return 'product_sticky_whatsapp';
    return 'inline_whatsapp';
  }
  function prepare(anchor) {
    let url;
    try { url = new URL(anchor.href, location.origin); } catch { return; }
    if (url.origin !== 'https://wa.me' || url.pathname !== '/' + PHONE) return;
    const previous = originals.get(anchor);
    const original = previous && previous.applied === anchor.href ? previous.original : anchor.href;
    const message = new URL(original).searchParams.get('text') || '';
    const market = document.documentElement.dataset.marketCountry || '';
    const country = readField('country') || COUNTRIES[market.toLowerCase().replace(/\s+/g, '-')] || (market.length > 2 ? market : '') || countryFromPath(location.pathname);
    const params = new URLSearchParams(location.search);
    const campaign = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'msclkid'].filter(key => params.get(key)).map(key => key + '=' + params.get(key)).join(', ');
    const product = readField('door_type') || readField('product_name') || anchor.dataset.productName || (/^\/products\/[^/]+\/[^/]+/.test(location.pathname) ? document.querySelector('h1')?.textContent : '') || '';
    anchor.href = getUrl({
      message, source: placement(anchor), pageTitle: document.title, pageUrl: location.origin + location.pathname,
      intent: anchor.dataset.whatsappIntent || 'request_door_quote', campaign, product, quantity: readField('quantity'),
      size: readField('size_information'), wallThickness: readField('wall_thickness'), scope: readField('supply_scope'),
      hardware: readField('frame_hardware_requirements'), finish: readField('finish_state'),
      country: [country, readField('destination_port')].filter(Boolean).join(' / '), date: readField('expected_purchase_date'),
    });
    originals.set(anchor, { original, applied: anchor.href });
  }
  document.querySelectorAll('a[href*="wa.me/"]').forEach(prepare);
  function handle(event) {
    const anchor = event.target instanceof Element ? event.target.closest('a') : null;
    if (anchor) prepare(anchor);
  }
  ['pointerdown', 'focusin', 'click', 'auxclick'].forEach(name => document.addEventListener(name, handle, true));
})();
