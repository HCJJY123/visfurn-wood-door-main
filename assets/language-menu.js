(() => {
  const localeOptions = [
    ['en', 'English'],
    ['es', 'Español'],
    ['ar', 'العربية'],
    ['mn', 'Монгол'],
    ['fr', 'Français'],
    ['pt', 'Português'],
    ['ru', 'Русский']
  ];
  const supportedLocales = new Set(localeOptions.map(([locale]) => locale));
  const localeLandingRoutes = {
    en: '/',
    es: '/es/puertas-para-proyectos',
    ar: '/ar/wpc-doors',
    mn: '/mn',
    fr: '/fr/blocs-portes-interieures',
    pt: '/br/portas-internas-de-madeira-sob-medida',
    ru: '/ru/mezhkomnatnye-dveri'
  };
  const currentLocale = (document.documentElement.dataset.vfPageLocale || document.documentElement.lang || 'en').split('-')[0].toLowerCase();
  window.visfurnSetupLanguageMenu = () => {
    if (document.querySelector('.vf-language-switcher')) return;
    const target = document.querySelector('.site-header, .vf-header-in, .wpc-header-inner, .pdp-header .pdp-header-inner, .ld-header-in, .ar-header-in') || document.body;
    const switcher = document.createElement('div');
    switcher.className = 'vf-language-switcher';
    const languageName = localeOptions.find(([code]) => code === currentLocale)?.[1] || 'English';
    switcher.innerHTML = `<button type="button" class="vf-language-trigger" data-vf-language-trigger aria-label="Choose language. Current: ${languageName}" aria-expanded="false" aria-controls="vf-language-panel"><span data-vf-language-code>${currentLocale.toUpperCase()}</span><svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" focusable="false"><path d="m4 6 4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button><div id="vf-language-panel" class="vf-language-panel" hidden><p>Language pages</p><ul></ul></div>`;
    const trigger = switcher.querySelector('button');
    const panel = switcher.querySelector('.vf-language-panel');
    const list = panel.querySelector('ul');
    localeOptions.forEach(([code, label]) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = localeLandingRoutes[code];
      link.lang = code;
      link.hreflang = code;
      link.dataset.vfLanguageLink = code;
      link.textContent = label;
      if (code === currentLocale) link.setAttribute('aria-current', 'true');
      item.append(link);
      list.append(item);
    });
    const closeLanguages = () => {
      panel.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    };
    trigger.addEventListener('click', () => {
      const open = trigger.getAttribute('aria-expanded') !== 'true';
      // Keep the language list separate from the mobile navigation drawer.
      const menu = document.querySelector('.vf-menu-toggle[aria-expanded="true"]');
      if (open && menu) menu.click();
      panel.hidden = !open;
      trigger.setAttribute('aria-expanded', String(open));
      if (open) {
        panel.style.transform = '';
        const rect = panel.getBoundingClientRect();
        const shift = rect.left < 12 ? 12 - rect.left : Math.min(0, document.documentElement.clientWidth - 12 - rect.right);
        panel.style.transform = `translateX(${shift}px)`;
        panel.style.maxHeight = `${Math.max(80, Math.min(420, window.innerHeight - rect.top - 12))}px`;
      }
    });
    document.addEventListener('click', (event) => {
      if (!switcher.contains(event.target)) closeLanguages();
    });
    window.addEventListener('resize', closeLanguages);
    document.addEventListener('focusin', (event) => {
      if (!switcher.contains(event.target)) closeLanguages();
    });
    switcher.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !panel.hidden) {
        event.stopPropagation();
        closeLanguages();
        trigger.focus();
      }
    });
    const cta = target.querySelector('.header-cta, .vf-btn-primary, .wpc-header-cta, .pdp-header-cta, .ld-header-cta, .ar-header-link');
    if (cta && cta.parentElement === target) target.insertBefore(switcher, cta);
    else target.appendChild(switcher);
  };

  window.visfurnSetupLanguageMenu();
})();
