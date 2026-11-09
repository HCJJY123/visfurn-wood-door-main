/* Progressive filter: the complete library stays readable without JavaScript. */
(() => {
  const library = document.querySelector('[data-project-library]');
  if (!library) return;
  const cards = [...library.querySelectorAll('[data-project-category]')];
  const controls = [...document.querySelectorAll('[data-project-filter]')];
  const count = document.querySelector('[data-project-count]');
  controls.forEach((button) => button.addEventListener('click', () => {
    const category = button.dataset.projectFilter;
    cards.forEach((card) => { card.hidden = category !== 'all' && card.dataset.projectCategory !== category; });
    controls.forEach((control) => control.setAttribute('aria-pressed', String(control === button)));
    const visible = cards.filter((card) => !card.hidden).length;
    if (count) count.textContent = `${visible} of ${cards.length} planning examples`;
  }));
})();
