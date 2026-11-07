// Browser-independent RFQ integration check. Never sends a real inquiry.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync('contact.html', 'utf8');
const options = {};
for (const match of html.matchAll(/<select\b([^>]*name="([^"]+)"[^>]*)>([\s\S]*?)<\/select>/g)) {
  options[match[2]] = [...match[3].matchAll(/<option([^>]*)>([^<]*)<\/option>/g)].map(x => x[1].match(/value="([^"]*)"/)?.[1] ?? x[2]);
}
function run(search, preset={}) {
  const fields={};const handlers={};
  for (const [name,values] of Object.entries(options)) {
    let current=preset[name] || '';
    fields[name]={ get value(){return current;},set value(v){current=values.includes(v)?v:'';} };
  }
  for (const name of ['requirements','product_slug','product_name','product_url','source_page']) fields[name]={value:'',setAttribute(){}};
  const form={querySelector(s){const n=s.match(/name="([^"]+)"/);return n?fields[n[1]]:null;},addEventListener(n,f){handlers[n]=f;}};
  const context={hidden:true,textContent:''};
  const sandbox={URL,URLSearchParams,Object,document:{querySelector(s){return s==='#quote-form'?form:s==='[data-product-context]'?context:null;}},window:{location:{search},requestAnimationFrame(f){f();},setTimeout(f){f();},addEventListener(){}}};
  vm.createContext(sandbox);
  // Execute both production scripts in their real order, against actual form option values.
  for(const p of ['assets/steel-fire-door-prefill.js','assets/door-supply-context.js'])vm.runInContext(fs.readFileSync(p,'utf8'),sandbox);
  return fields;
}
let f=run('?product=wpc-doors&source_page=%2Fproducts%2Fwpc-doors&supply_scope=leaf-frame-trim&inquiry_purpose=commercial-trial&finish_state=white-finished');
assert.equal(f.product_slug.value,'wpc-doors');
assert.equal(f.source_page.value,'/products/wpc-doors');
assert.equal(f.door_type.value,'WPC Doors');
assert.equal(f.supply_scope.value,'Leaf, frame and trim');
assert.equal(f.inquiry_purpose.value,'Commercial trial review');
assert.equal(f.finish_state.value,'White finished surface');
assert.match(f.requirements.value,/WPC Doors Collection/);
f=run('?product=interior-doors&supply_scope=slab-only&finish_state=white-primed', {supply_scope:'Help me compare the scope'});
assert.equal(f.supply_scope.value,'Help me compare the scope');
assert.equal(f.finish_state.value,'White primed for subsequent finishing');
f=run('?product=interior-doors&supply_scope=__proto__&inquiry_purpose=%3Cscript%3E&finish_state=free-sample');
assert.equal(f.supply_scope.value,'');assert.equal(f.inquiry_purpose.value,'');assert.equal(f.finish_state.value,'');
f=run('');assert.equal(f.inquiry_purpose.value,'');assert.equal(f.supply_scope.value,'');
console.log('PASS: collection attribution, real form options, selected scope/finish/purpose, restored user choices and unknown-parameter rejection');

for (const [slug, category] of [['white-moulded-solid-wood','interior-doors'],['modern-pvc-wooden-door','interior-doors'],['waterproof-wpc-interior-door','wpc-doors'],['flush-woodgrain-wpc-bedroom-door','wpc-doors']]) {
  const source = `/products/${category}/${slug}`;
  const values = run(`?product=${slug}&source_page=${encodeURIComponent(source)}&supply_scope=leaf-frame-trim&inquiry_purpose=sample-review`);
  assert.equal(values.product_slug.value, slug);
  assert.equal(values.product_url.value, `https://www.visfurn.com${source}`);
  assert.equal(values.source_page.value, source);
  assert.equal(values.supply_scope.value, 'Leaf, frame and trim');
  assert.equal(values.inquiry_purpose.value, 'Professional sample review');
  assert.ok(values.requirements.value.includes(values.product_name.value));
}
console.log('PASS: all four core models retain model, product URL, source, package scope and sample purpose');
