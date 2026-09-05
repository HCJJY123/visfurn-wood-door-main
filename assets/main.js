document.documentElement.classList.add('js-enabled');

const header = document.querySelector('[data-header]');
const nav = document.querySelector('[data-nav]');
const toggle = document.querySelector('[data-menu-toggle]');
const track = (event, parameters = {}) => {
  window.dataLayer?.push({ event, ...parameters });
};
if (toggle && nav) {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    toggle.textContent = isOpen ? 'Close' : 'Menu';
    document.body.classList.toggle('nav-open', isOpen);
  });
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
      toggle.textContent = 'Menu';
      document.body.classList.remove('nav-open');
    });
  });
}
window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 12);
});

const setupHomeHeroCarousel = () => {
  const carousel = document.querySelector('[data-home-hero-carousel]');
  if (!carousel) return;

  const slides = Array.from(carousel.querySelectorAll('[data-home-hero-slide]'));
  const dots = Array.from(carousel.querySelectorAll('[data-home-hero-dot]'));
  if (slides.length < 2) return;

  let activeIndex = Math.max(0, slides.findIndex((slide) => slide.classList.contains('is-active')));
  let autoplayTimer = null;
  let hovered = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let suppressSlideClick = false;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const activateSlide = (nextIndex) => {
    activeIndex = (nextIndex + slides.length) % slides.length;
    slides.forEach((slide, index) => {
      const isActive = index === activeIndex;
      slide.classList.toggle('is-active', isActive);
      slide.setAttribute('aria-current', isActive ? 'true' : 'false');
      slide.tabIndex = isActive ? 0 : -1;
    });
    dots.forEach((dot, index) => {
      const isActive = index === activeIndex;
      dot.classList.toggle('is-active', isActive);
      dot.setAttribute('aria-pressed', String(isActive));
      dot.tabIndex = isActive ? 0 : -1;
    });
  };

  const nextSlide = () => activateSlide(activeIndex + 1);
  const stopAutoplay = () => {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };
  const startAutoplay = () => {
    if (reduceMotion || autoplayTimer || slides.length < 2) return;
    autoplayTimer = window.setInterval(() => {
      if (!hovered) nextSlide();
    }, 5000);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      activateSlide(index);
      stopAutoplay();
      startAutoplay();
    });
  });

  carousel.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    if (!touch) return;
    hovered = true;
    touchStartX = touch.clientX;
    touchStartY = touch.clientY;
  }, { passive: true });

  carousel.addEventListener('touchend', (event) => {
    const touch = event.changedTouches[0];
    if (!touch) return;

    const deltaX = touch.clientX - touchStartX;
    const deltaY = touch.clientY - touchStartY;
    const isHorizontalSwipe = Math.abs(deltaX) > 44 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25;
    hovered = false;

    if (!isHorizontalSwipe) return;
    suppressSlideClick = true;
    activateSlide(activeIndex + (deltaX < 0 ? 1 : -1));
    stopAutoplay();
    startAutoplay();
    window.setTimeout(() => { suppressSlideClick = false; }, 350);
  }, { passive: true });

  carousel.addEventListener('click', (event) => {
    if (!suppressSlideClick) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  carousel.addEventListener('mouseenter', () => { hovered = true; });
  carousel.addEventListener('mouseleave', () => { hovered = false; });
  carousel.addEventListener('focusin', () => { hovered = true; });
  carousel.addEventListener('focusout', () => { hovered = false; });

  activateSlide(activeIndex);
  startAutoplay();
};

const quoteForm = document.querySelector('#quote-form');
document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
  link.addEventListener('click', () => track('email_click', { page: window.location.pathname }));
});

document.querySelectorAll('[data-file-upload]').forEach((upload) => {
  const input = upload.querySelector('[data-file-input], input[type="file"]');
  const trigger = upload.querySelector('[data-file-trigger]');
  const name = upload.querySelector('[data-file-name]');
  if (!input || !trigger || !name) return;

  trigger.addEventListener('click', () => input.click());
  input.addEventListener('change', () => {
    name.textContent = input.files?.[0]?.name || 'No file chosen';
  });
});

if (quoteForm) {
  let hasStarted = false;
  let isSubmitting = false;
  const status = document.querySelector('#quote-form-status');
  const submitButton = quoteForm.querySelector('button[type="submit"]');
  const fileName = quoteForm.querySelector('[data-file-name]');

  const setFormStatus = (message, state = '') => {
    if (!status) return;
    status.textContent = message;
    status.dataset.state = state;
  };

  quoteForm.addEventListener('focusin', () => {
    if (hasStarted) return;
    hasStarted = true;
    track('form_start', { page: window.location.pathname });
  });

  quoteForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
    if (!quoteForm.reportValidity()) return;

    isSubmitting = true;
    submitButton?.setAttribute('disabled', 'disabled');
    submitButton?.setAttribute('aria-busy', 'true');
    setFormStatus('Sending your project inquiry…', 'sending');
    track('form_submit', { page: window.location.pathname });

    try {
      const response = await fetch(quoteForm.action, {
        method: 'POST',
        body: new FormData(quoteForm),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        const details = Array.isArray(result.errors)
          ? result.errors.map((error) => error.message).filter(Boolean).join(' ')
          : '';
        throw new Error(details || 'The inquiry could not be sent.');
      }

      quoteForm.reset();
      if (fileName) fileName.textContent = 'No file chosen';
      setFormStatus('Thank you. Your inquiry has been sent to VISFURN. Redirecting you now…', 'success');
      track('form_submit_success', { page: window.location.pathname });
      track('generate_lead', { page: window.location.pathname, form_name: 'project_inquiry' });
      const thankYouUrl = new URL('/thank-you', window.location.origin).href;
      window.setTimeout(() => {
        try {
          window.location.replace(thankYouUrl);
        } catch (redirectError) {
          if (status) {
            status.innerHTML = `Your inquiry was sent successfully. <a href="${thankYouUrl}">Open the thank-you page</a>.`;
          }
        }
      }, 50);
      window.setTimeout(() => {
        if (window.location.pathname === '/thank-you' || !status || status.dataset.state !== 'success') return;
        status.innerHTML = `Your inquiry was sent successfully. <a href="${thankYouUrl}">Open the thank-you page</a>.`;
      }, 1200);
    } catch (error) {
      setFormStatus(`We could not send the inquiry. ${error.message} Please email rose@visfurn.com directly if the problem continues.`, 'error');
      track('form_submit_error', { page: window.location.pathname });
    } finally {
      isSubmitting = false;
      submitButton?.removeAttribute('disabled');
      submitButton?.removeAttribute('aria-busy');
    }
  });
}

document.querySelectorAll('.faq-question').forEach((question) => {
  const answerId = question.getAttribute('aria-controls');
  const answer = answerId ? document.getElementById(answerId) : null;
  const item = question.closest('.faq-item');
  if (!answer) return;

  const syncFaqState = () => {
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    answer.hidden = !isExpanded;
    item?.classList.toggle('is-open', isExpanded);
  };

  syncFaqState();
  question.addEventListener('click', () => {
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    question.setAttribute('aria-expanded', String(!isExpanded));
    syncFaqState();
  });
});

(function initVisfurnGlobalUi() {
  const localeOptions = [
    ['en', 'English'],
    ['es', 'Español'],
    ['ar', 'العربية'],
    ['fr', 'Français'],
    ['pt', 'Português'],
    ['de', 'Deutsch'],
    ['it', 'Italiano'],
    ['ru', 'Русский'],
    ['nl', 'Nederlands']
  ];
  const supportedLocales = new Set(localeOptions.map(([locale]) => locale));
  const translations = {
    'Home': { es: 'Inicio', ar: 'الرئيسية', fr: 'Accueil', pt: 'Início', de: 'Startseite', it: 'Home', ru: 'Главная', nl: 'Home' },
    'Products': { es: 'Productos', ar: 'المنتجات', fr: 'Produits', pt: 'Produtos', de: 'Produkte', it: 'Prodotti', ru: 'Продукты', nl: 'Producten' },
    'About Us': { es: 'Sobre nosotros', ar: 'من نحن', fr: 'À propos', pt: 'Sobre nós', de: 'Über uns', it: 'Chi siamo', ru: 'О компании', nl: 'Over ons' },
    'Projects': { es: 'Proyectos', ar: 'المشاريع', fr: 'Projets', pt: 'Projetos', de: 'Projekte', it: 'Progetti', ru: 'Проекты', nl: 'Projecten' },
    'Blogs': { es: 'Blogs', ar: 'المدونة', fr: 'Articles', pt: 'Blog', de: 'Blog', it: 'Blog', ru: 'Блог', nl: 'Blog' },
    'Blog': { es: 'Blog', ar: 'المدونة', fr: 'Articles', pt: 'Blog', de: 'Blog', it: 'Blog', ru: 'Блог', nl: 'Blog' },
    'FAQ': { es: 'Preguntas frecuentes', ar: 'الأسئلة الشائعة', fr: 'FAQ', pt: 'FAQ', de: 'FAQ', it: 'FAQ', ru: 'FAQ', nl: 'FAQ' },
    'Contact': { es: 'Contacto', ar: 'اتصل بنا', fr: 'Contact', pt: 'Contato', de: 'Kontakt', it: 'Contatti', ru: 'Контакты', nl: 'Contact' },
    'Menu': { es: 'Menú', ar: 'القائمة', fr: 'Menu', pt: 'Menu', de: 'Menü', it: 'Menu', ru: 'Меню', nl: 'Menu' },
    'Get Quote': { es: 'Solicitar cotización', ar: 'طلب عرض سعر', fr: 'Demander un devis', pt: 'Solicitar cotação', de: 'Angebot anfragen', it: 'Richiedi preventivo', ru: 'Запросить цену', nl: 'Offerte aanvragen' },
    'Get a Quote': { es: 'Solicitar cotización', ar: 'طلب عرض سعر', fr: 'Demander un devis', pt: 'Solicitar cotação', de: 'Angebot anfragen', it: 'Richiedi preventivo', ru: 'Запросить цену', nl: 'Offerte aanvragen' },
    'Start a Project': { es: 'Iniciar un proyecto', ar: 'بدء مشروع', fr: 'Démarrer un projet', pt: 'Iniciar um projeto', de: 'Projekt starten', it: 'Avvia un progetto', ru: 'Начать проект', nl: 'Project starten' },
    'Request quotation': { es: 'Solicitar cotización', ar: 'طلب عرض سعر', fr: 'Demander un devis', pt: 'Solicitar cotação', de: 'Angebot anfragen', it: 'Richiedi preventivo', ru: 'Запросить предложение', nl: 'Offerte aanvragen' },
    'Request a Project Quote': { es: 'Solicitar cotización del proyecto', ar: 'طلب عرض سعر للمشروع', fr: 'Demander un devis projet', pt: 'Solicitar cotação do projeto', de: 'Projektangebot anfragen', it: 'Richiedi preventivo progetto', ru: 'Запросить цену проекта', nl: 'Projectofferte aanvragen' },
    'View Collection': { es: 'Ver colección', ar: 'عرض المجموعة', fr: 'Voir la collection', pt: 'Ver coleção', de: 'Kollektion ansehen', it: 'Vedi collezione', ru: 'Смотреть коллекцию', nl: 'Bekijk collectie' },
    'Send Inquiry': { es: 'Enviar consulta', ar: 'إرسال استفسار', fr: 'Envoyer une demande', pt: 'Enviar consulta', de: 'Anfrage senden', it: 'Invia richiesta', ru: 'Отправить запрос', nl: 'Aanvraag sturen' },
    'WhatsApp': { es: 'WhatsApp', ar: 'واتساب', fr: 'WhatsApp', pt: 'WhatsApp', de: 'WhatsApp', it: 'WhatsApp', ru: 'WhatsApp', nl: 'WhatsApp' },
    'WhatsApp Business': { es: 'WhatsApp Business', ar: 'واتساب للأعمال', fr: 'WhatsApp Business', pt: 'WhatsApp Business', de: 'WhatsApp Business', it: 'WhatsApp Business', ru: 'WhatsApp Business', nl: 'WhatsApp Business' },
    'Email': { es: 'Correo', ar: 'البريد الإلكتروني', fr: 'Email', pt: 'E-mail', de: 'E-Mail', it: 'Email', ru: 'Почта', nl: 'E-mail' },
    'Chat on WhatsApp': { es: 'Chatear por WhatsApp', ar: 'الدردشة عبر واتساب', fr: 'Discuter sur WhatsApp', pt: 'Conversar no WhatsApp', de: 'Per WhatsApp chatten', it: 'Chat su WhatsApp', ru: 'Написать в WhatsApp', nl: 'Chat via WhatsApp' },
    'Top': { es: 'Arriba', ar: 'أعلى', fr: 'Haut', pt: 'Topo', de: 'Oben', it: 'Su', ru: 'Вверх', nl: 'Boven' },
    'Bottom': { es: 'Abajo', ar: 'أسفل', fr: 'Bas', pt: 'Base', de: 'Unten', it: 'Giù', ru: 'Вниз', nl: 'Onder' },
    'Product FAQ': { es: 'Preguntas de productos', ar: 'الأسئلة الشائعة للمنتجات', fr: 'FAQ produits', pt: 'FAQ de produtos', de: 'Produkt-FAQ', it: 'FAQ prodotti', ru: 'FAQ по продуктам', nl: 'Product-FAQ' },
    'Direct Factory Wooden Door Supply Since 2009 | Quality Verified': { es: 'Suministro directo de puertas desde fábrica desde 2009 | Calidad verificada', ar: 'توريد أبواب مباشر من المصنع منذ 2009 | جودة موثقة', fr: 'Fourniture directe d’usine depuis 2009 | Qualité vérifiée', pt: 'Fornecimento direto da fábrica desde 2009 | Qualidade verificada', de: 'Direkt ab Werk seit 2009 | Qualität geprüft', it: 'Fornitura diretta dalla fabbrica dal 2009 | Qualità verificata', ru: 'Прямые поставки с фабрики с 2009 года | Проверенное качество', nl: 'Directe fabriekslevering sinds 2009 | Kwaliteit gecontroleerd' }
  };

  const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();
  const getStoredLocale = () => {
    const queryLocale = new URLSearchParams(window.location.search).get('lang');
    if (supportedLocales.has(queryLocale)) return queryLocale;
    try {
      const storedLocale = window.localStorage.getItem('visfurn-locale');
      if (supportedLocales.has(storedLocale)) return storedLocale;
    } catch (error) {
      return 'en';
    }
    return 'en';
  };

  let currentLocale = getStoredLocale();
  const getTranslation = (source, locale = currentLocale) => translations[source]?.[locale] || source;

  const applyLocale = (locale) => {
    currentLocale = supportedLocales.has(locale) ? locale : 'en';
    document.documentElement.lang = currentLocale;
    document.documentElement.dir = currentLocale === 'ar' ? 'rtl' : 'ltr';
    document.body.classList.toggle('vf-rtl', currentLocale === 'ar');
    try { window.localStorage.setItem('visfurn-locale', currentLocale); } catch (error) { /* storage is optional */ }

    document.querySelectorAll('[data-vf-language-select]').forEach((select) => {
      select.value = currentLocale;
    });

    const candidates = document.querySelectorAll('a, button, summary, .topbar, .vf-topbar, .vf-tab, .header-cta, .button, .vf-btn, .wpc-header-cta, .pdp-header-cta, [data-vf-i18n]');
    candidates.forEach((element) => {
      if (element.closest('.vf-language-switcher')) return;
      if (element.children.length > 0 && !element.querySelector('[data-vf-i18n-label]')) return;
      const label = element.querySelector('[data-vf-i18n-label]');
      const source = label?.dataset.vfSourceText || element.dataset.vfSourceText || normalizeText(element.textContent);
      if (!source || !translations[source]) return;
      element.dataset.vfSourceText = source;
      if (label) label.textContent = getTranslation(source);
      else element.textContent = getTranslation(source);
    });

    document.querySelectorAll('[data-vf-language-label]').forEach((element) => {
      element.textContent = currentLocale === 'en' ? 'Language' : localeOptions.find(([code]) => code === currentLocale)?.[1] || 'Language';
    });
  };

  const createLanguageSwitcher = () => {
    if (document.querySelector('.vf-language-switcher')) return;
    const target = document.querySelector('.site-header, .vf-header-in, .wpc-header-inner, .pdp-header .pdp-header-inner') || document.body;
    const switcher = document.createElement('div');
    switcher.className = 'vf-language-switcher';
    switcher.innerHTML = '<label class="vf-visually-hidden" data-vf-language-label>Language</label><select data-vf-language-select aria-label="Website language"></select>';
    const select = switcher.querySelector('select');
    localeOptions.forEach(([code, label]) => {
      const option = document.createElement('option');
      option.value = code;
      option.textContent = code.toUpperCase();
      option.title = label;
      select.appendChild(option);
    });
    select.addEventListener('change', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('lang', select.value);
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
      applyLocale(select.value);
    });
    const cta = target.querySelector('.header-cta, .vf-btn-primary, .wpc-header-cta, .pdp-header-cta');
    if (cta && cta.parentElement === target) target.insertBefore(switcher, cta);
    else target.appendChild(switcher);
  };

  const whatsappSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.82 11.82 0 0 0 12.1 0 11.9 11.9 0 0 0 .2 11.9c0 2.1.55 4.15 1.6 5.96L.1 24l6.29-1.65a11.9 11.9 0 0 0 5.7 1.45h.01A11.9 11.9 0 0 0 24 11.9a11.82 11.82 0 0 0-3.48-8.42Zm-8.42 18.3h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.73.98 1-3.64-.23-.37a9.86 9.86 0 1 1 8.36 4.62Zm5.42-7.38c-.3-.15-1.77-.87-2.05-.97-.28-.1-.49-.15-.7.15-.2.3-.8.97-.98 1.17-.18.2-.36.23-.66.08-.3-.15-1.25-.46-2.38-1.46-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.36.45-.54.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.7-1.68-.96-2.3-.25-.6-.51-.52-.7-.53h-.6c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.16 4.55.72.31 1.28.49 1.72.63.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z"/></svg>';

  const setupNativeActionLabels = () => {
    document.querySelectorAll('.vf-sticky a[href*="/contact"], .pdp-sticky-bar a[href*="/contact"]').forEach((link) => {
      link.dataset.vfSourceText = 'Send Inquiry';
      link.dataset.vfI18n = 'Send Inquiry';
      link.textContent = getTranslation('Send Inquiry');
    });
    document.querySelectorAll('.vf-sticky a[href*="wa.me"], .pdp-sticky-bar a[href*="wa.me"]').forEach((link) => {
      link.dataset.vfSourceText = 'WhatsApp';
      link.dataset.vfI18n = 'WhatsApp';
      link.textContent = getTranslation('WhatsApp');
    });
  };

  const emailSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.8 5.5A2.5 2.5 0 0 1 5.3 3h13.4a2.5 2.5 0 0 1 2.5 2.5v13a2.5 2.5 0 0 1-2.5 2.5H5.3a2.5 2.5 0 0 1-2.5-2.5v-13Zm2.2.2 6.6 5.25a.65.65 0 0 0 .8 0L19 5.7V5.5a.3.3 0 0 0-.3-.3H5.3a.3.3 0 0 0-.3.3v.2Zm14 1.7-5.2 4.15a2.85 2.85 0 0 1-3.6 0L5 7.4v11.1c0 .17.13.3.3.3h13.4c.17 0 .3-.13.3-.3V7.4Z"/></svg>';

  const setupHeaderActions = () => {
    const target = document.querySelector('.site-header, .vf-header-in, .wpc-header-inner, .pdp-header .pdp-header-inner');
    if (!target || target.querySelector('[data-vf-header-actions]')) return;
    const cta = target.querySelector('.header-cta, .vf-btn-primary, .wpc-header-cta, .pdp-header-cta');
    const actions = document.createElement('div');
    actions.dataset.vfHeaderActions = 'true';
    actions.className = 'vf-header-actions';
    const whatsapp = document.createElement('a');
    whatsapp.className = 'vf-header-whatsapp';
    whatsapp.href = 'https://wa.me/8615222885400?text=Hello%20Visfurn%2C%20I%20would%20like%20to%20discuss%20a%20door%20project.';
    whatsapp.target = '_blank';
    whatsapp.rel = 'nofollow noopener';
    whatsapp.setAttribute('aria-label', 'WhatsApp');
    whatsapp.innerHTML = `<span class="vf-header-icon" aria-hidden="true">${whatsappSvg}</span><span data-vf-i18n-label data-vf-source-text="WhatsApp Business">${getTranslation('WhatsApp Business')}</span>`;
    const email = document.createElement('a');
    email.className = 'vf-header-email';
    email.href = 'mailto:rose@visfurn.com?subject=VISFURN%20Door%20Project%20Inquiry';
    email.dataset.vfSourceText = 'Email';
    email.dataset.vfI18n = 'Email';
    email.innerHTML = `<span class="vf-header-icon" aria-hidden="true">${emailSvg}</span><span data-vf-i18n-label data-vf-source-text="Email">${getTranslation('Email')}</span>`;
    if (cta) {
      target.insertBefore(actions, cta);
      actions.append(whatsapp, email);
      cta.remove();
    } else {
      actions.append(whatsapp, email);
      target.appendChild(actions);
    }

  };

  const setupFloatingActions = () => {
    if (document.querySelector('[data-vf-floating-whatsapp]')) return;
    const whatsapp = document.createElement('a');
    whatsapp.dataset.vfFloatingWhatsapp = 'true';
    whatsapp.className = 'vf-whatsapp-float';
    whatsapp.href = 'https://wa.me/8615222885400?text=Hello%20Visfurn%2C%20I%20would%20like%20to%20discuss%20a%20door%20project.';
    whatsapp.target = '_blank';
    whatsapp.rel = 'nofollow noopener';
    whatsapp.setAttribute('aria-label', 'WhatsApp');
    whatsapp.innerHTML = `<span aria-hidden="true">${whatsappSvg}</span><span data-vf-i18n-label data-vf-source-text="WhatsApp">${getTranslation('WhatsApp')}</span>`;
    document.body.appendChild(whatsapp);
    const inquiry = document.createElement('a');
    inquiry.className = 'vf-inquiry-float';
    inquiry.href = '/contact#quote-form';
    inquiry.dataset.vfInquiryFloat = 'true';
    inquiry.dataset.vfSourceText = 'Get Quote';
    inquiry.dataset.vfI18n = 'Get Quote';
    inquiry.innerHTML = '<span aria-hidden="true">↗</span><span data-vf-i18n-label data-vf-source-text="Get Quote">' + getTranslation('Get Quote') + '</span>';
    document.body.appendChild(inquiry);

    const syncMobileActions = () => {
      const threshold = Math.max(240, Math.round(window.innerHeight * 0.9));
      const isMobile = window.matchMedia('(max-width: 620px), (pointer: coarse)').matches;
      document.body.classList.toggle('vf-mobile-actions-visible', isMobile && window.scrollY > threshold);
    };
    syncMobileActions();
    window.addEventListener('scroll', syncMobileActions, { passive: true });
    window.addEventListener('resize', syncMobileActions);
  };

  const setupImageFallbacks = () => {
    document.querySelectorAll('img').forEach((image) => {
      image.addEventListener('error', () => {
        if (image.dataset.vfFallbackTried === 'true') return;
        image.dataset.vfFallbackTried = 'true';
        const current = new URL(image.currentSrc || image.src, document.baseURI).href;
        const candidates = [];
        const picture = image.closest('picture');
        picture?.querySelectorAll('source[srcset]').forEach((source) => {
          source.getAttribute('srcset').split(',').forEach((candidate) => {
            const url = candidate.trim().split(/\s+/)[0];
            if (url) candidates.push(url);
          });
        });
        const base = image.getAttribute('src');
        if (base) candidates.push(base);
        const fallback = candidates.find((url) => new URL(url, document.baseURI).href !== current && /\.(?:avif|webp|jpe?g|png)(?:\?|$)/i.test(url));
        if (!fallback) return;
        image.removeAttribute('srcset');
        image.src = fallback;
      }, { passive: true });
    });
  };

  const setupPageAnchors = () => {
    if (document.querySelector('[data-vf-page-anchors]')) return;
    const anchors = document.createElement('nav');
    anchors.dataset.vfPageAnchors = 'true';
    anchors.className = 'vf-page-anchors';
    anchors.setAttribute('aria-label', 'Page navigation');
    anchors.innerHTML = '<button class="vf-page-anchor" type="button" data-vf-scroll="top" data-vf-i18n="Top" data-vf-source-text="Top" aria-label="Top"><span class="vf-page-anchor-icon" aria-hidden="true">↑</span><span class="vf-page-anchor-label vf-visually-hidden" data-vf-i18n-label data-vf-source-text="Top">Top</span></button><button class="vf-page-anchor" type="button" data-vf-scroll="bottom" data-vf-i18n="Bottom" data-vf-source-text="Bottom" aria-label="Bottom"><span class="vf-page-anchor-icon" aria-hidden="true">↓</span><span class="vf-page-anchor-label vf-visually-hidden" data-vf-i18n-label data-vf-source-text="Bottom">Bottom</span></button>';
    anchors.querySelector('[data-vf-scroll="top"]').addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    anchors.querySelector('[data-vf-scroll="bottom"]').addEventListener('click', () => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' }));
    document.body.appendChild(anchors);
  };

  const zoomSelector = '.editorial-media img, .vf-main-img img, .wpc-stage img, .pdp-main-stage img, #pdp-main-image';
  let zoomImages = [];
  let lightbox;
  let activeZoomIndex = 0;
  let restoreFocus;

  const getZoomImages = () => Array.from(document.querySelectorAll(zoomSelector)).filter((image) => {
    if (image.closest('.product-visual, .product-card, .card-media, .featured-door-media, .category-hero, .vf-thumb, .wpc-thumb, .pdp-thumb-btn')) return false;
    return image.currentSrc || image.src;
  });

  const createLightbox = () => {
    if (lightbox) return lightbox;
    lightbox = document.createElement('div');
    lightbox.className = 'vf-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Expanded image');
    lightbox.innerHTML = '<div class="vf-lightbox-dialog"><button class="vf-lightbox-close" type="button" aria-label="Close image">×</button><button class="vf-lightbox-nav vf-lightbox-nav--prev" type="button" aria-label="Previous image">‹</button><div><img class="vf-lightbox-image" alt=""><p class="vf-lightbox-caption"></p></div><button class="vf-lightbox-nav vf-lightbox-nav--next" type="button" aria-label="Next image">›</button></div>';
    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) closeLightbox();
    });
    lightbox.querySelector('.vf-lightbox-close').addEventListener('click', closeLightbox);
    lightbox.querySelector('.vf-lightbox-nav--prev').addEventListener('click', () => showLightbox(activeZoomIndex - 1));
    lightbox.querySelector('.vf-lightbox-nav--next').addEventListener('click', () => showLightbox(activeZoomIndex + 1));
    document.body.appendChild(lightbox);
    return lightbox;
  };

  const showLightbox = (index) => {
    zoomImages = getZoomImages();
    if (!zoomImages.length) return;
    activeZoomIndex = (index + zoomImages.length) % zoomImages.length;
    const image = zoomImages[activeZoomIndex];
    const box = createLightbox();
    const preview = box.querySelector('.vf-lightbox-image');
    preview.src = image.currentSrc || image.src;
    preview.alt = image.alt || '';
    box.querySelector('.vf-lightbox-caption').textContent = image.alt || '';
    box.querySelector('.vf-lightbox-nav--prev').hidden = zoomImages.length < 2;
    box.querySelector('.vf-lightbox-nav--next').hidden = zoomImages.length < 2;
    restoreFocus = document.activeElement;
    box.hidden = false;
    document.body.classList.add('vf-lightbox-open');
    box.querySelector('.vf-lightbox-close').focus();
  };

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.hidden = true;
    document.body.classList.remove('vf-lightbox-open');
    restoreFocus?.focus?.();
  }

  const setupImageZoom = () => {
    getZoomImages().forEach((image) => {
      image.classList.add('vf-zoomable-image');
      image.setAttribute('tabindex', '0');
      image.setAttribute('role', 'button');
      image.setAttribute('aria-label', image.alt ? `Expand image: ${image.alt}` : 'Expand image');
      image.addEventListener('click', () => showLightbox(getZoomImages().indexOf(image)));
      image.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          showLightbox(getZoomImages().indexOf(image));
        }
      });
    });
  };

  document.addEventListener('keydown', (event) => {
    if (!lightbox || lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') showLightbox(activeZoomIndex - 1);
    if (event.key === 'ArrowRight') showLightbox(activeZoomIndex + 1);
  });
  document.addEventListener('contextmenu', (event) => {
    if (event.target.closest('img')) event.preventDefault();
  });
  document.addEventListener('dragstart', (event) => {
    if (event.target.closest('img')) event.preventDefault();
  });

createLanguageSwitcher();
setupHomeHeroCarousel();
setupHeaderActions();
setupNativeActionLabels();
setupFloatingActions();
  setupPageAnchors();
  setupImageFallbacks();
  setupImageZoom();
  applyLocale(currentLocale);
})();

(() => {
  const params = new URLSearchParams(window.location.search);
  const storageKey = 'vf_first_referrer';
  const firstReferrer = localStorage.getItem(storageKey) || document.referrer || '';
  localStorage.setItem(storageKey, firstReferrer);
  const aiSources = ['chatgpt.com', 'chat.openai.com', 'gemini.google.com', 'perplexity.ai', 'claude.ai'];
  const referrer = document.referrer || '';
  const aiSource = aiSources.find((source) => referrer.includes(source)) || (params.get('utm_source') === 'chatgpt.com' ? 'chatgpt.com' : '');
  if (aiSource) track('ai_referral_visit', { ai_source: aiSource, landing_page: window.location.pathname });
  document.querySelectorAll('[data-attribution]').forEach((field) => {
    const key = field.dataset.attribution;
    field.value = key === 'landing_page' ? window.location.pathname : key === 'first_referrer' ? firstReferrer : key === 'ai_source' ? aiSource : params.get(key) || '';
  });
  document.querySelectorAll('[data-track="project_rfq_start"]').forEach((link) => link.addEventListener('click', () => track('project_rfq_start', { page: window.location.pathname })));
  const rfq = document.querySelector('[data-qualified-rfq]');
  if (!rfq) return;
  const upload = rfq.querySelector('input[type="file"]');
  upload?.addEventListener('change', () => track('schedule_upload', { page: window.location.pathname, file_name: upload.files?.[0]?.name || '' }));
  rfq.addEventListener('submit', () => {
    const quantity = Number.parseInt(rfq.querySelector('[name="quantity"]')?.value || '', 10) || 0;
    const buyerType = rfq.querySelector('[name="buyer_type"]')?.value || '';
    const hasUpload = Boolean(upload?.files?.length);
    const score = (quantity >= 50 ? 40 : quantity >= 20 ? 25 : 0) + (hasUpload ? 20 : 0) + (rfq.querySelector('[name="company"]')?.value ? 15 : 0) + (/Builder|Developer|Distributor|Hotel|Commercial/.test(buyerType) ? 15 : 0) + (rfq.querySelector('[name="destination_port"]')?.value ? 10 : 0);
    track('project_rfq_submit', { page: window.location.pathname, lead_score_internal: score });
    if (score >= 60) track('qualified_lead', { page: window.location.pathname, lead_score_internal: score });
  });
})();
