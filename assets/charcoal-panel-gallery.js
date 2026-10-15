(() => {
  const views = [{"src": "/assets/images/products/exterior-doors/charcoal-panel/main-01-1200.webp", "srcset": "/assets/images/products/exterior-doors/charcoal-panel/main-01-640.webp 640w, /assets/images/products/exterior-doors/charcoal-panel/main-01-1200.webp 1200w", "alt": "Charcoal entrance door design visualization with offset vertical panel and silver escutcheon", "label": "Single-door front view"}, {"src": "/assets/images/products/exterior-doors/charcoal-panel/main-02-1200.webp", "srcset": "/assets/images/products/exterior-doors/charcoal-panel/main-02-640.webp 640w, /assets/images/products/exterior-doors/charcoal-panel/main-02-1200.webp 1200w", "alt": "Wider charcoal panel entrance design visualization with central vertical strip", "label": "Wider front view"}, {"src": "/assets/images/products/exterior-doors/charcoal-panel/main-03-1200.webp", "srcset": "/assets/images/products/exterior-doors/charcoal-panel/main-03-640.webp 640w, /assets/images/products/exterior-doors/charcoal-panel/main-03-1200.webp 1200w", "alt": "Single charcoal entrance door visualized in a sheltered architectural setting", "label": "Single-door setting"}, {"src": "/assets/images/products/exterior-doors/charcoal-panel/main-04-1200.webp", "srcset": "/assets/images/products/exterior-doors/charcoal-panel/main-04-640.webp 640w, /assets/images/products/exterior-doors/charcoal-panel/main-04-1200.webp 1200w", "alt": "Wider charcoal entrance door visualized at an angle in an architectural setting", "label": "Wider angled view"}];
  const image = document.querySelector('#main-stage img');
  const caption = document.querySelector('#gallery-caption');
  const buttons = [...document.querySelectorAll('[data-view]')];
  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const view = views[index];
      image.src = view.src; image.srcset = view.srcset; image.alt = view.alt;
      caption.textContent = `${index + 1} / 4 · ${view.label}`;
      buttons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
    });
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
      buttons[next].focus(); buttons[next].click();
    });
  });
})();
