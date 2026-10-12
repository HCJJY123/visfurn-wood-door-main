(() => {
  // Reuse the existing contact form's attribution keys without adding global UI.
  const currentPath = window.location.pathname;
  if (!document.querySelector('[data-product-source-context]')) return;
  const params = new URLSearchParams(window.location.search);
  let localStore, sessionStore;
  try { localStore = window.localStorage; } catch (_) {}
  try { sessionStore = window.sessionStorage; } catch (_) {}
  const storageKey = 'vf_first_landing_context';
  let firstContext = null;
  try { firstContext = JSON.parse(localStore?.getItem(storageKey) || 'null'); } catch (_) {}
  const referrer = document.referrer || '';
  let referrerHost = '';
  try { referrerHost = new URL(referrer).hostname; } catch (_) {}
  const aiHosts = ['chatgpt.com', 'chat.openai.com', 'gemini.google.com', 'perplexity.ai', 'claude.ai'];
  const aiSource = aiHosts.find(host => referrerHost === host || referrerHost.endsWith('.' + host))
    || (params.get('utm_source') === 'chatgpt.com' ? 'chatgpt.com' : '');
  if (!firstContext || typeof firstContext !== 'object' || Array.isArray(firstContext) || !firstContext.landing_page) {
    firstContext = {
      landing_page: currentPath,
      first_referrer: referrer,
      ai_source: aiSource,
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      gclid: params.get('gclid') || '',
      first_product_page: currentPath,
      first_market_page: ''
    };
  }
  if (!firstContext.first_product_page) firstContext.first_product_page = currentPath;
  try { localStore?.setItem(storageKey, JSON.stringify(firstContext)); } catch (_) {}
  try { sessionStore?.setItem('vf_current_product_page', currentPath); } catch (_) {}
  if (aiSource) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'ai_referral_visit', ai_source: aiSource, landing_page: firstContext.landing_page });
  }
})();
