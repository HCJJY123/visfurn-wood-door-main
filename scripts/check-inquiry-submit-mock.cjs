const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const script = fs.readFileSync('assets/main.js','utf8');
const fragment = script.slice(script.indexOf('if (quoteForm) {'), script.indexOf("document.querySelectorAll('.faq-question')"));
async function run() {
 const handlers={}, events=[], stored=new Map(), fields={submission_attempt_id:{value:''}, country:{value:'United Arab Emirates'},product_page:{value:'/products/wpc-doors/waterproof-wpc-interior-door'}};
 let valid=false, requests=0, fail=true, engineering=false, resolveFetch;
 const status={dataset:{},textContent:''}, button={setAttribute(){},removeAttribute(){}};
 const form={action:'https://formspree.io/f/xoeadjwv',querySelector(s){if(s==='button[type="submit"]')return button;if(s==='[data-file-name]')return null;if(s==='.rfq-more-details')return {open:engineering};const name=s.match(/name="([^"]+)"/);return name ? fields[name[1]] : null;},addEventListener(k,f){handlers[k]=f;},reportValidity(){return valid;},reset(){}};
 const sandbox={quoteForm:form,document:{querySelector:()=>status,documentElement:{lang:'en'}},window:{location:{pathname:'/contact',origin:'https://www.visfurn.com'},crypto:{randomUUID:()=> 'mock-attempt-1'},setTimeout(){}},getSessionStorage:()=>({getItem:k=>stored.get(k),setItem:(k,v)=>stored.set(k,v)}),track:(event,params)=>events.push({event,...params}),getMarketTrackingParameters:()=>null,FormData:class {},URL,fetch:async()=>{requests++;await new Promise(r=>resolveFetch=r);return {ok:!fail,json:async()=> fail?{errors:[{message:'Mock error'}]}:{ok:true}};}};
 vm.runInNewContext(fragment,sandbox);
 const submit=()=>handlers.submit({preventDefault(){}});
 await submit();assert.equal(requests,0);
 handlers.focusin();handlers.focusin();assert.equal(events.filter(e=>e.event==='form_start').length,1);
 valid=true;let pending=submit();await submit();assert.equal(requests,1);resolveFetch();await pending;
 assert.equal(status.dataset.state,'error');assert.equal(events.filter(e=>e.event==='form_submit_success').length,0);
 assert.equal(events.find(e=>e.event==='form_submit_error').inquiry_path,'initial_inquiry');
 fail=false;engineering=true;pending=submit();resolveFetch();await pending;
 assert.equal(status.dataset.state,'success');assert.equal(events.filter(e=>e.event==='form_submit_success').length,1);
 assert.equal(events.find(e=>e.event==='form_submit_success').inquiry_path,'engineering_details');
 await submit();assert.equal(requests,2,'Confirmed attempt not resubmitted');
 assert.equal(events.find(e=>e.event==='form_submit_success').product_page,fields.product_page.value);
 console.log('PASS: invalid form, one form_start, duplicate click guard, HTTP error, retry, success after response, success dedup, inquiry path and product attribution. All requests mocked.');
}
run().catch(e=>{console.error(e);process.exitCode=1;});
