const assert = require('node:assert/strict');
const fs = require('node:fs');
const html = fs.readFileSync('products/school-doors.html', 'utf8');
const section = html.match(/<section[^>]+id="school-door-coordination-schedule"[\s\S]*?<\/section>/)?.[0];
assert.ok(section);
assert.equal((html.match(/id="school-door-coordination-schedule"/g) || []).length, 1);
const fields = ['Opening ID', 'Room use', 'Door set', 'Door leaf', 'Frame', 'Handing', 'Hardware', 'Vision panel', 'Seals', 'Required performance files', 'Approval status'];
for (const field of fields) assert.ok(section.includes('<th scope="row">' + field + '</th>'), field);
for (const text of ['Illustrative template only.', 'not an actual project schedule, approval, certification', 'Not approved', 'no rating assumed', 'does not establish approval or authorise production']) assert.ok(section.includes(text), text);
assert.equal((section.match(/<caption>/g) || []).length, 1);
assert.ok(section.includes('aria-describedby="school-coordination-note"'));
const csv = fs.readFileSync('downloads/school-door-coordination-template.csv', 'utf8');
assert.ok(csv.startsWith(fields.join(',') + ',Template notice'));
assert.ok(csv.includes('Illustrative only; not an actual project schedule'));
assert.ok(csv.trimEnd().endsWith(','.repeat(11)), 'Blank opening row');
assert.equal((html.match(/<h1\b/g) || []).length, 1);
for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(m[1]);
assert.ok(html.includes('"legalName":"Tianjin Visfurn Furniture Co., Ltd."'));
for (const m of section.matchAll(/href="(\/[^"#?]+)[^"]*"/g)) {
  assert.ok(fs.existsSync('.' + m[1]) || fs.existsSync('.' + m[1] + '.html'), 'Local link: ' + m[1]);
}
const href = section.match(/href="([^\"]*\/contact\?[^\"]+)"/)[1].replaceAll('&amp;', '&');
const url = new URL(href, 'https://www.visfurn.com');
assert.equal(url.searchParams.get('product'), 'school-doors');
assert.equal(url.searchParams.get('source_page'), '/products/school-doors');
assert.equal(url.hash, '#quote-form');
console.log('PASS: one coordination aid, 11 fields, illustrative boundaries, accessible table, CSV, local links, school RFQ source, JSON-LD and entity.');
