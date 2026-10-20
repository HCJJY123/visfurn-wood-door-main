const assert = require('node:assert/strict');
const fs = require('node:fs');
const html = fs.readFileSync('products/school-doors.html', 'utf8');
const region = html.match(/<section[^>]+id="school-front-door-selection"[\s\S]*?<\/section>/)?.[0];
assert.ok(region, 'One opening-use comparison');
for (const title of ['School entrance doors', 'Classroom doors', 'Corridor doors']) {
  assert.ok(region.includes('<h3>' + title + '</h3>'), title);
}
for (const field of ['rough-opening width and height', 'leaf width, height and thickness', 'frame outer dimensions', 'finished wall thickness', 'frame/jamb depth', 'required clear opening', 'hardware models', 'vision-panel position']) {
  assert.ok(region.includes(field), field);
}
assert.ok(region.includes('does not establish suitability'));
assert.ok(region.includes('not a certification or approval'));
assert.equal((html.match(/<h1\b/g) || []).length, 1);
assert.equal((html.match(/rel="canonical"/g) || []).length, 1);
assert.ok(html.includes('href="https://www.visfurn.com/products/school-doors"'));
assert.equal((html.match(/data-visfurn-faq-schema/g) || []).length, 1);
const schema = JSON.parse(html.match(/data-visfurn-faq-schema>([\s\S]*?)<\/script>/)[1]);
assert.equal(schema.mainEntity.length, 6);
for (const q of schema.mainEntity) {
  assert.ok(html.includes('<h3>' + q.name + '</h3><p>' + q.acceptedAnswer.text + '</p>'), 'FAQ matches visible text: ' + q.name);
}
for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
for (const [file, anchor] of [
  ['blog/door-vision-panel-glazing-specification-hospital-school.html', 'school-front-door-selection'],
  ['blog/door-leaf-rough-opening-jamb-depth-bulk-projects.html', 'school-door-dimension-inputs']
]) {
  assert.ok(fs.readFileSync(file, 'utf8').includes('/products/school-doors#' + anchor));
  assert.ok(html.includes('id="' + anchor + '"'));
}
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]);
assert.equal(ids.length, new Set(ids).size, 'Unique IDs');
console.log('PASS: entrance/classroom/corridor intent, dimension and hardware fields, scope caveats, six visible/schema-matched FAQs, canonical, H1, IDs and two inbound deep links.');
