const siteUrl = 'https://www.visfurn.com';
const whatsappUrl = 'https://wa.me/8615222885400';

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function urlFor(config) {
  return `${siteUrl}/${config.pathPrefix || config.lang.split('-')[0]}/${config.slug}`;
}

function renderImage(image, alt, { priority = false, sizes = '100vw' } = {}) {
  const source = typeof image === 'string' ? image : image.src;
  const width = typeof image === 'string' ? 1200 : image.width;
  const height = typeof image === 'string' ? 1504 : image.height;
  return `<img src="${escapeHtml(source)}" alt="${escapeHtml(alt)}" width="${escapeHtml(width)}" height="${escapeHtml(height)}" ${priority ? 'fetchpriority="high" loading="eager"' : 'loading="lazy"'} decoding="async" sizes="${sizes}">`;
}

function renderFaqSchema(config, pageUrl) {
  const faq = config.faq.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a }
  }));
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'VISFURN', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: config.h1, item: pageUrl }
        ]
      },
      { '@type': 'FAQPage', '@id': `${pageUrl}#faq`, mainEntity: faq }
    ]
  }).replaceAll('<', '\\u003c');
}

function renderLandingPage(config) {
  const pageUrl = urlFor(config);
  const tabs = config.tabs.map((tab, index) => `<a class="ld-tab${index === 0 ? ' is-active' : ''}" href="#${['overview', 'specifications', 'applications', 'shipping', 'faq'][index]}">${escapeHtml(tab)}</a>`).join('');
  const chips = config.specChips.map((chip) => `<span class="ld-chip">${escapeHtml(chip)}</span>`).join('');
  const doorSet = config.doorSetItems.map((item) => `<article><h3>${escapeHtml(item.name)}</h3><p>${escapeHtml(item.spec)}</p></article>`).join('');
  const badges = config.badges.map((badge) => `<span>${escapeHtml(badge)}</span>`).join('');
  const specs = config.specTable.map((item) => `<div><dt>${escapeHtml(item.k)}</dt><dd>${escapeHtml(item.v)}</dd></div>`).join('');
  const sizeRows = config.sizeTable.rows.map((row) => `<tr><td dir="ltr">${escapeHtml(row[0])}</td><td dir="ltr">${escapeHtml(row[1])}</td></tr>`).join('');
  const applications = config.applications.map((item) => `<article><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.body)}</p></article>`).join('');
  const faq = config.faq.map((item, index) => `<details${index === 0 ? ' open' : ''}><summary>${escapeHtml(item.q)}</summary><p>${escapeHtml(item.a)}</p>${index === 0 ? `<a class="ld-text-cta" href="/contact#quote-form" data-lead-cta="quote" data-cta-placement="faq">${escapeHtml(config.cta.quote)}</a>` : ''}</details>`).join('');
  const alternates = config.liveAlternates.map((item) => `<link rel="alternate" hreflang="${escapeHtml(item.hreflang)}" href="${escapeHtml(item.href)}">`).join('\n  ');
  const priceBlock = config.priceLadder ? '<section class="ld-price">Price data loaded from configuration.</section>' : '';

  return `<!doctype html>
<html lang="${escapeHtml(config.lang)}" dir="${escapeHtml(config.dir)}">
<head>
  <!-- Google Tag Manager -->
  <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PD963ZR7');</script>
  <!-- End Google Tag Manager -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(config.meta.title)}</title>
  <meta name="description" content="${escapeHtml(config.meta.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
  <link rel="canonical" href="${pageUrl}">
  ${alternates}
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="VISFURN">
  <meta property="og:title" content="${escapeHtml(config.meta.title)}">
  <meta property="og:description" content="${escapeHtml(config.meta.description)}">
  <meta property="og:url" content="${pageUrl}">
  <meta property="og:image" content="${siteUrl}${typeof config.images.hero === 'string' ? config.images.hero : config.images.hero.src}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(config.meta.title)}">
  <meta name="twitter:description" content="${escapeHtml(config.meta.description)}">
  <meta name="twitter:image" content="${siteUrl}${typeof config.images.hero === 'string' ? config.images.hero : config.images.hero.src}">
  <link rel="icon" href="/assets/brand/favicon-door-v2-64.png" type="image/png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/assets/styles-v3-pdp-fix.css?v=20260815-about-video-contained-v2">
  <link rel="stylesheet" href="/assets/global-ui.css?v=20260816-floating-actions-aligned-v3">
  <script type="application/ld+json">${renderFaqSchema(config, pageUrl)}</script>
  <style>
    :root{--ld-ink:#222923;--ld-green:#1d4031;--ld-paper:#f5f5ef;--ld-line:#d9ddd6;--ld-muted:#627067;--ld-accent:#aa6543}*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;color:var(--ld-ink);font-family:Inter,"Noto Sans",system-ui,sans-serif;line-height:1.65}.ld-wrap{width:min(1380px,calc(100% - 44px));margin-inline:auto}.ld-top{background:var(--ld-green);color:#fff;padding:8px 16px;text-align:center;font-size:12px;font-weight:600;letter-spacing:.04em}.ld-header{position:sticky;top:0;z-index:20;background:rgba(255,255,255,.96);border-bottom:1px solid var(--ld-line);backdrop-filter:blur(12px)}.ld-header-in{height:78px;display:flex;align-items:center;justify-content:space-between;gap:18px}.ld-logo img{height:52px;width:auto;display:block}.ld-header-cta,.ld-button{display:flex;align-items:center;justify-content:center;text-decoration:none;border-radius:5px;font-weight:700}.ld-header-cta{padding:10px 20px;background:var(--ld-green);color:#fff}.ld-crumb{padding:22px 0 8px;color:var(--ld-muted);font-size:13px}.ld-crumb a{color:inherit;text-decoration:none}.ld-hero{display:grid;grid-template-columns:minmax(320px,.93fr) minmax(0,1.07fr);gap:60px;align-items:center;padding:26px 0 66px}.ld-hero-media{margin:0;border:1px solid var(--ld-line);background:var(--ld-paper);overflow:hidden}.ld-hero-media img{display:block;width:100%;aspect-ratio:4/5;object-fit:cover}.ld-hero-media figcaption,.ld-figure figcaption{padding:9px 12px;color:var(--ld-muted);font-size:12px}.ld-eyebrow{margin:0 0 14px;color:var(--ld-accent);font-size:13px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.ld-hero h1{max-width:13ch;margin:0 0 18px;font-size:clamp(39px,5vw,64px);letter-spacing:-.045em;line-height:1.07}.ld-subtitle{max-width:51ch;margin:0 0 24px;color:var(--ld-muted);font-size:19px}.ld-chips{display:flex;flex-wrap:wrap;gap:9px;margin-bottom:24px}.ld-chip{padding:8px 13px;border:1px solid var(--ld-line);border-radius:999px;background:#eff2ee;color:var(--ld-green);font-size:13px;font-weight:700}.ld-meta{display:flex;flex-wrap:wrap;gap:34px;padding:20px 0 24px;border-block:1px solid var(--ld-line)}.ld-meta strong{display:block;color:var(--ld-muted);font-size:12px;text-transform:uppercase;letter-spacing:.08em}.ld-meta span{font-size:17px;font-weight:800}.ld-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-top:24px}.ld-button{min-height:54px;padding:12px 14px;border:1px solid var(--ld-green);color:var(--ld-green);background:#fff}.ld-button-primary{color:#fff;background:var(--ld-green)}.ld-button-whatsapp{color:#168c48;border-color:#25d366;background:#f6fff8}.ld-badges{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:28px}.ld-badges span{padding:12px 5px;border-top:2px solid var(--ld-accent);font-size:12px;font-weight:800}.ld-tabs-shell{position:sticky;top:78px;z-index:19;background:#fff;border-block:1px solid var(--ld-line)}.ld-tabs{display:flex;overflow:auto}.ld-tab{padding:16px 20px;color:var(--ld-muted);text-decoration:none;border-bottom:2px solid transparent;font-size:14px;font-weight:800}.ld-tab.is-active,.ld-tab:hover{color:var(--ld-green);border-color:var(--ld-green)}.ld-section{padding:74px 0;border-bottom:1px solid var(--ld-line);scroll-margin-top:140px}.ld-grid{display:grid;grid-template-columns:minmax(220px,.65fr) minmax(0,1.35fr);gap:52px}.ld-section h2{margin:0;font-size:clamp(28px,3.3vw,44px);line-height:1.2}.ld-section p{color:#4f5c54}.ld-system{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin:0 0 25px}.ld-system article,.ld-apps article,.ld-extra,.ld-logistics{padding:19px;border:1px solid var(--ld-line);background:var(--ld-paper)}.ld-system h3,.ld-apps h3,.ld-extra h3,.ld-logistics h3{margin:0 0 8px;color:var(--ld-green);font-size:17px}.ld-system p,.ld-apps p,.ld-extra p,.ld-logistics p{margin:0;font-size:14px}.ld-specs{margin:0;border-top:1px solid var(--ld-line)}.ld-specs div{display:grid;grid-template-columns:190px 1fr;gap:20px;padding:14px 0;border-bottom:1px solid var(--ld-line)}.ld-specs dt{font-weight:800;color:var(--ld-muted)}.ld-specs dd{margin:0;font-weight:600}.ld-size{margin-top:30px;border:1px solid var(--ld-line);overflow:hidden}.ld-size h3{margin:0;padding:18px;background:var(--ld-paper);font-size:19px}.ld-size p{margin:0;padding:0 18px 14px;font-size:13px;color:var(--ld-muted)}table{width:100%;border-collapse:collapse}td{padding:13px 18px;border-top:1px solid var(--ld-line);font-weight:600}.ld-video{min-height:320px;display:grid;place-items:center;margin-top:26px;border:1px dashed #a2aca4;background:linear-gradient(135deg,#eff1ed,#faf9f4);color:var(--ld-muted);text-align:center}.ld-video.is-in-view{border-color:var(--ld-accent)}.ld-apps{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}.ld-figure{margin:22px 0 0;border:1px solid var(--ld-line);overflow:hidden}.ld-figure img{display:block;width:100%;aspect-ratio:16/9;object-fit:cover}.ld-shipping{display:grid;grid-template-columns:1fr 1fr;gap:14px}.ld-extra{margin-top:22px}.ld-text-cta{display:inline-block;margin-top:12px;color:var(--ld-green);font-weight:800}.ld-faq{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.ld-faq details{padding:17px;border:1px solid var(--ld-line)}.ld-faq summary{cursor:pointer;font-weight:800}.ld-faq p{margin:12px 0 0;font-size:14px}.ld-footer{padding:35px 0 90px;color:var(--ld-muted);font-size:13px}.ld-float{position:fixed;right:20px;bottom:20px;z-index:30;width:58px;height:58px;display:grid;place-items:center;border-radius:50%;background:#25d366;color:#fff;text-decoration:none;font-size:13px;font-weight:800;box-shadow:0 10px 26px rgba(18,103,48,.25)}@media(max-width:900px){.ld-hero,.ld-grid{grid-template-columns:1fr;gap:30px}.ld-system,.ld-badges{grid-template-columns:repeat(2,1fr)}}@media(max-width:620px){.ld-wrap{width:min(100% - 28px,1380px)}.ld-header-in{height:68px}.ld-logo img{height:44px}.ld-header-cta{padding:8px 12px;font-size:12px}.ld-hero h1{font-size:40px}.ld-actions,.ld-apps,.ld-shipping,.ld-faq{grid-template-columns:1fr}.ld-system{grid-template-columns:1fr 1fr}.ld-specs div{grid-template-columns:1fr;gap:4px}.ld-tab{padding-inline:14px}.ld-price{display:none}}
  </style>
</head>
<body>
  <!-- Google Tag Manager (noscript) --><noscript><iframe height="0" src="https://www.googletagmanager.com/ns.html?id=GTM-PD963ZR7" style="display:none;visibility:hidden" width="0"></iframe></noscript><!-- End Google Tag Manager (noscript) -->
  <div class="ld-top">Project-ready interior door sets · <bdi>VISFURN</bdi></div>
  <header class="ld-header"><div class="ld-wrap ld-header-in"><a class="ld-logo" href="/" aria-label="VISFURN home"><img src="/assets/brand/visfurn-logo-door-v2-360.webp" width="154" height="115" alt="VISFURN" decoding="async"></a><a class="ld-header-cta" href="/contact#quote-form" data-lead-cta="quote" data-cta-placement="header">${escapeHtml(config.cta.quote)}</a></div></header>
  <main><div class="ld-wrap"><nav class="ld-crumb"><a href="/">Home</a> / <a href="/products/wpc-doors">Interior Doors</a> / <span>${escapeHtml(config.h1)}</span></nav>
  <section class="ld-hero" id="overview"><figure class="ld-hero-media">${renderImage(config.images.hero, config.images.heroAlt, { priority: true, sizes: '(max-width: 900px) calc(100vw - 44px), 43vw' })}<figcaption>Illustrative planning visual</figcaption></figure><div><p class="ld-eyebrow">VISFURN · Project Door Supply</p><h1>${escapeHtml(config.h1)}</h1><p class="ld-subtitle">${escapeHtml(config.subtitle)}</p><div class="ld-chips">${chips}</div>${priceBlock}<div class="ld-meta"><div><strong>${escapeHtml(config.moq.label)}</strong><span>${escapeHtml(config.moq.value)}</span></div><div><strong>${escapeHtml(config.leadTime.label)}</strong><span>${escapeHtml(config.leadTime.value)}</span></div></div><div class="ld-actions"><a class="ld-button ld-button-primary" href="/contact#quote-form" data-lead-cta="quote" data-cta-placement="hero">${escapeHtml(config.cta.quote)}</a><a class="ld-button" href="/contact#quote-form" data-lead-cta="sample" data-cta-placement="hero">${escapeHtml(config.cta.sample)}</a><a class="ld-button ld-button-whatsapp" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" data-lead-cta="whatsapp" data-cta-placement="hero">${escapeHtml(config.cta.whatsapp)}</a></div><div class="ld-badges">${badges}</div></div></section></div>
  <nav class="ld-tabs-shell"><div class="ld-wrap ld-tabs">${tabs}</div></nav>
  <section class="ld-section"><div class="ld-wrap ld-grid"><h2>What's in a prehung set?</h2><div><div class="ld-system">${doorSet}</div><div class="ld-extra"><h3>${escapeHtml(config.extraModule.title)}</h3><p>${escapeHtml(config.extraModule.body)}</p><a class="ld-text-cta" href="/contact#quote-form" data-lead-cta="quote" data-cta-placement="slab-only">${escapeHtml(config.extraModule.cta)}</a></div></div></div></section>
  <section class="ld-section" id="specifications"><div class="ld-wrap ld-grid"><h2>${escapeHtml(config.tabs[1])}</h2><div><dl class="ld-specs">${specs}</dl><div class="ld-size"><h3>${escapeHtml(config.sizeTable.title)}</h3><p>${escapeHtml(config.sizeTable.unit)}</p><table><tbody>${sizeRows}</tbody></table></div><div class="ld-video" data-video-placeholder><span>${escapeHtml(config.videoCaption)}<br><small>Plyr source will load here when approved video is supplied.</small></span></div></div></div></section>
  <section class="ld-section" id="applications"><div class="ld-wrap ld-grid"><h2>${escapeHtml(config.tabs[2])}</h2><div><div class="ld-apps">${applications}</div><figure class="ld-figure">${renderImage(config.images.application, config.images.applicationAlt, { sizes: '(max-width: 900px) calc(100vw - 44px), 58vw' })}<figcaption>Illustrative planning visual</figcaption></figure></div></div></section>
  <section class="ld-section" id="shipping"><div class="ld-wrap ld-grid"><h2>${escapeHtml(config.tabs[3])}</h2><div><div class="ld-shipping"><article class="ld-logistics"><h3>${escapeHtml(config.packing.title)}</h3><p>${escapeHtml(config.packing.note)}</p><p><strong>40HQ:</strong> ${escapeHtml(config.packing.setsPer40HQ)}</p></article><article class="ld-logistics"><h3>${escapeHtml(config.logisticsBlock.title)}</h3><p>${escapeHtml(config.logisticsBlock.body)}</p></article></div><figure class="ld-figure">${renderImage(config.images.packing, config.images.packingAlt, { sizes: '(max-width: 900px) calc(100vw - 44px), 58vw' })}<figcaption>Illustrative planning visual</figcaption></figure></div></div></section>
  <section class="ld-section" id="faq"><div class="ld-wrap ld-grid"><h2>${escapeHtml(config.tabs[4])}</h2><div class="ld-faq">${faq}</div></div></section></main>
  <footer class="ld-footer"><div class="ld-wrap">© 2026 VISFURN · <a href="/products/wpc-doors">Interior Doors</a> · <a href="/contact#quote-form">${escapeHtml(config.cta.quote)}</a></div></footer>
  <a class="ld-float" href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" data-lead-cta="whatsapp" data-cta-placement="floating" aria-label="${escapeHtml(config.cta.whatsapp)}">WA</a>
  <script>(function(){function track(event,parameters){window.dataLayer=window.dataLayer||[];window.dataLayer.push(Object.assign({event:event},parameters));}document.querySelectorAll('[data-lead-cta]').forEach(function(cta){cta.addEventListener('click',function(){var type=cta.dataset.leadCta;var eventName={whatsapp:'whatsapp_click',quote:'quote_cta_click',sample:'sample_cta_click'}[type];track(eventName,{page_language:'${escapeHtml(config.lang)}',page_type:'localized_prehung_door_landing',cta_type:type,cta_placement:cta.dataset.ctaPlacement||'inline'});});});var tabs=[].slice.call(document.querySelectorAll('.ld-tab'));var sections=[].slice.call(document.querySelectorAll('.ld-section[id],.ld-hero[id]'));if('IntersectionObserver'in window){var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){tabs.forEach(function(tab){tab.classList.toggle('is-active',tab.getAttribute('href')==='#'+entry.target.id);});}});},{rootMargin:'-145px 0px -55% 0px',threshold:0});sections.forEach(function(section){observer.observe(section);});var video=document.querySelector('[data-video-placeholder]');if(video)new IntersectionObserver(function(entries,videoObserver){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-in-view');videoObserver.unobserve(entry.target);}});},{rootMargin:'180px 0px'}).observe(video);}}());</script>
</body>
</html>`;
}

module.exports = { renderLandingPage };
