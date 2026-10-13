const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const productPath = '/products/school-doors/galvanized-steel-school-door';
const product = fs.readFileSync('.' + productPath + '.html', 'utf8');
const category = fs.readFileSync('products/school-doors.html', 'utf8');
const dimensions = product.match(/<section[^>]+id="classroom-door-dimensions">([\s\S]*?)<\/section>/)?.[1];
assert.ok(dimensions, 'Product must provide a dimensions section');
for (const label of ['Door leaf:', 'Wall opening:', 'Frame and wall:', 'Finished floor:', 'Clear opening:', 'Handing and location:']) {
  assert.ok(dimensions.includes(label), 'Missing measurement label: ' + label);
}
assert.ok(dimensions.includes('There is no single classroom door size'));
assert.ok(dimensions.includes('/blog/how-to-send-door-sizes'));
assert.match(product, /class="vf-tab" href="#classroom-door-dimensions">Dimensions/);
assert.ok(category.includes(productPath + '#classroom-door-dimensions'));
assert.ok(category.includes('id="school-front-door-selection"'));
assert.ok(category.includes('href="/products/entrance-doors"'));
assert.ok(category.includes('href="/products/exterior-doors"'));
for (const [html, path] of [[product, productPath], [category, '/products/school-doors']]) {
  assert.equal((html.match(/<h1\b/g) || []).length, 1);
  assert.ok(html.includes('href="https://www.visfurn.com' + path + '"'));
  for (const match of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    JSON.parse(match[1]);
  }
  assert.ok(html.includes('"legalName":"Tianjin Visfurn Furniture Co., Ltd."'));
}

// Exercise the existing collection prefill with the new product-source RFQ link.
// No browser networking and no form submission.
const href = dimensions.match(/href="([^\"]*\/contact\?[^\"]+)"/)?.[1].replaceAll('&amp;', '&');
assert.ok(href);
const url = new URL(href, 'https://www.visfurn.com');
assert.equal(url.searchParams.get('product'), 'school-doors');
assert.equal(url.searchParams.get('source_page'), productPath);
assert.equal(url.hash, '#quote-form');
const script = fs.readFileSync('assets/steel-fire-door-prefill.js', 'utf8');
function run(prior = {}) {
  const fields = { project_type: { value: prior.project || '' }, door_type: { value: '' }, requirements: { value: prior.requirements || '' } };
  const context = { hidden: true };
  const listeners = {};
  const form = {
    querySelector: selector => fields[selector.match(/name="([^"]+)"/)[1]],
    appendChild: field => { fields[field.name] = field; },
    addEventListener: (name, callback) => { listeners[name] = callback; }
  };
  const window = { location: { search: url.search }, requestAnimationFrame: fn => fn(), setTimeout: fn => fn(), addEventListener: (name, callback) => { listeners[name] = callback; } };
  const document = { querySelector: selector => selector === '#quote-form' ? form : context, createElement: () => ({ setAttribute(name, value) { this[name] = value; } }) };
  vm.runInNewContext(script, { window, document, URL, URLSearchParams });
  return { fields, context, listeners };
}
const result = run();
assert.equal(result.fields.door_type.value, 'School Doors');
assert.equal(result.fields.project_type.value, 'School');
assert.equal(result.fields.source_page.value, productPath);
assert.equal(result.context.hidden, false);
assert.match(result.context.textContent, /Collection selected: School Doors Collection/);
const data = new Map();
result.listeners.formdata({ formData: data });
assert.equal(data.get('source_page'), productPath);
result.fields.project_type.value = 'Other';
result.fields.door_type.value = 'Exterior Doors';
result.fields.requirements.value = 'Buyer-entered opening notes';
result.listeners.pageshow();
assert.equal(result.fields.project_type.value, 'Other');
assert.equal(result.fields.door_type.value, 'Exterior Doors');
assert.equal(result.fields.requirements.value, 'Buyer-entered opening notes');
assert.equal(result.fields.source_page.value, productPath);
const prior = run({ project: 'Other', requirements: 'Existing buyer notes' });
assert.equal(prior.fields.project_type.value, 'Other');
assert.equal(prior.fields.requirements.value, 'Existing buyer notes');
console.log('PASS: school dimensions, selection links, canonical/H1/schema/entity, existing school RFQ mapping, exact product source and preserved buyer edits. No real form submission.');
