const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const script = fs.readFileSync('assets/steel-fire-door-prefill.js', 'utf8');
function run(search, prior = {}) {
  const fields = { project_type: { value: prior.project || '' }, door_type: { value: 'Interior Wooden Doors' }, requirements: { value: prior.requirements || '' } };
  const context = { hidden: true };
  const listeners = {};
  const form = {
    querySelector: selector => fields[selector.match(/name="([^"]+)"/)[1]],
    appendChild: field => { fields[field.name] = field; },
    addEventListener: (name, callback) => { listeners[name] = callback; }
  };
  const window = { location: { search }, requestAnimationFrame: fn => fn(), setTimeout: fn => fn(), addEventListener: (name, callback) => { listeners[name] = callback; } };
  const document = { querySelector: selector => selector === '#quote-form' ? form : context, createElement: () => ({ setAttribute(name, value) { this[name] = value; } }) };
  vm.runInNewContext(script, { window, document, URL, URLSearchParams });
  return { fields, context, listeners };
}
const category = fs.readFileSync('products/hotel-doors.html', 'utf8');
const links = [...category.matchAll(/href="([^\"]+)"/g)].map(m => m[1].replaceAll('&amp;', '&')).filter(href => href.includes('/contact') && href.includes('#quote-form'));
assert.equal(links.length, 4);
for (const href of links) {
  const url = new URL(href, 'https://www.visfurn.com');
  const result = run(url.search);
  assert.equal(result.fields.door_type.value, 'Hotel Doors');
  assert.equal(result.fields.project_type.value, 'Hotel / Hospitality');
  assert.equal(result.fields.source_page.value, '/products/hotel-doors');
  assert.equal(result.fields.product_url.value, 'https://www.visfurn.com/products/hotel-doors');
  assert.equal(result.fields.product_slug.value, 'hotel-doors');
  assert.equal(result.context.hidden, false);
  assert.match(result.context.textContent, /Collection selected: Hotel Doors Collection/);
  result.fields.project_type.value = 'Other';
  result.fields.door_type.value = 'School Doors';
  result.listeners.pageshow();
  assert.equal(result.fields.project_type.value, 'Other');
  assert.equal(result.fields.door_type.value, 'School Doors');
  const data = new Map(); result.listeners.formdata({ formData: data });
  assert.equal(data.get('source_page'), '/products/hotel-doors');
}
for (const query of ['', '?product=unknown', '?product=__proto__']) {
  const result = run(query);
  assert.equal(result.fields.door_type.value, 'Interior Wooden Doors');
  assert.equal(result.fields.project_type.value, '');
  assert.equal(result.context.hidden, true);
}
for (const [slug, door, project] of [['modern-laboratory-door', 'Hospital Doors', 'Hospital / Healthcare'], ['custom-color-classroom-door', 'School Doors', 'School'], ['modern-finished-hotel-interior-door', 'Hotel Doors', 'Hotel / Hospitality']]) {
  const result = run('?product=' + slug);
  assert.equal(result.fields.door_type.value, door);
  assert.equal(result.fields.project_type.value, project);
}
const prior = run('?product=hotel-doors', { project: 'Other', requirements: 'Buyer-entered detail' });
assert.equal(prior.fields.project_type.value, 'Other');
assert.equal(prior.fields.requirements.value, 'Buyer-entered detail');
const contact = fs.readFileSync('contact.html', 'utf8');
assert.match(contact, /steel-fire-door-prefill\.js\?v=20261011-hotel-category-v5/);
console.log('PASS: hotel CTAs, category selections, source, context, history restoration, buyer edits, unknown/default routes and existing product mappings. No network or form submission.');

const main = fs.readFileSync('assets/main.js', 'utf8');
const helper = main.match(/const getPageQuoteHref = \(\) => \{[\s\S]*?\n  \};/)[0];
for (const path of ['/products/hotel-doors', '/products/hotel-doors/', '/products/hotel-doors.html', '/products/hotel-doors/index.html']) {
  assert.equal(vm.runInNewContext(helper + '\ngetPageQuoteHref()', { location: { pathname: path } }), links[0]);
}
for (const path of ['/contact', '/products/school-doors', '/products/hospital-doors/modern-laboratory-door']) {
  assert.equal(vm.runInNewContext(helper + '\ngetPageQuoteHref()', { location: { pathname: path } }), '/contact#quote-form');
}
assert.match(main, /inquiry\.href = getPageQuoteHref\(\)/);
assert.match(main, /let quoteHref = getPageQuoteHref\(\)/);
console.log('PASS: generated floating and navigation quote route scoped to supported categories; unrelated routes retain defaults.');

for (const match of script.matchAll(/projectType: '([^']+)'/g)) assert.ok(contact.includes('<option>' + match[1] + '</option>'), 'Project type must exist in real contact select: ' + match[1]);
