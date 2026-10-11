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
const category = fs.readFileSync('products/hospital-doors.html', 'utf8');
const links = [...category.matchAll(/href="([^\"]+)"/g)].map(m => m[1].replaceAll('&amp;', '&')).filter(href => href.includes('/contact') && href.includes('#quote-form'));
assert.equal(links.length, 2);
for (const href of links) {
  const url = new URL(href, 'https://www.visfurn.com');
  const result = run(url.search);
  assert.equal(result.fields.door_type.value, 'Hospital Doors');
  assert.equal(result.fields.project_type.value, 'Hospital / Healthcare');
  assert.equal(result.fields.source_page.value, '/products/hospital-doors');
  assert.equal(result.fields.product_url.value, 'https://www.visfurn.com/products/hospital-doors');
  assert.equal(result.fields.product_slug.value, 'hospital-doors');
  assert.equal(result.context.hidden, false);
  assert.match(result.context.textContent, /Collection selected: Hospital Doors Collection/);
  result.fields.project_type.value = 'Other';
  result.fields.door_type.value = 'School Doors';
  result.listeners.pageshow();
  assert.equal(result.fields.project_type.value, 'Other');
  assert.equal(result.fields.door_type.value, 'School Doors');
  const data = new Map(); result.listeners.formdata({ formData: data });
  assert.equal(data.get('source_page'), '/products/hospital-doors');
}
for (const query of ['', '?product=unknown', '?product=__proto__']) {
  const result = run(query);
  assert.equal(result.fields.door_type.value, 'Interior Wooden Doors');
  assert.equal(result.fields.project_type.value, '');
  assert.equal(result.context.hidden, true);
}
for (const [slug, door, project] of [['modern-laboratory-door', 'Hospital Doors', 'Hospital / Healthcare'], ['custom-color-classroom-door', 'School Doors', 'School'], ['modern-finished-hotel-interior-door', 'Hotel Doors', 'Hotel']]) {
  const result = run('?product=' + slug);
  assert.equal(result.fields.door_type.value, door);
  assert.equal(result.fields.project_type.value, project);
}
const prior = run('?product=hospital-doors', { project: 'Other', requirements: 'Buyer-entered detail' });
assert.equal(prior.fields.project_type.value, 'Other');
assert.equal(prior.fields.requirements.value, 'Buyer-entered detail');
const contact = fs.readFileSync('contact.html', 'utf8');
assert.match(contact, /steel-fire-door-prefill\.js\?v=20261011-hospital-category-v4/);
console.log('PASS: hospital CTAs, category selections, source, context, history restoration, buyer edits, unknown/default routes and existing product mappings. No network or form submission.');
