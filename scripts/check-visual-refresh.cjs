// Image-only regression. External services are blocked; no leads are submitted.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const {chromium} = require('playwright');
const pages = ['/', '/products/interior-doors', '/markets/saudi-arabia', '/markets/uae', '/markets/qatar'];
(async () => {
 const root=process.cwd(), evidence=process.env.EVIDENCE_DIR;
 const server=http.createServer((req,res)=>{
  let name=decodeURIComponent(req.url.split('?')[0]);
  let file=path.join(root,name==='/'?'index.html':name);
  if(!path.extname(file))file+='.html';
  if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end();}
  res.setHeader('Content-Type', ({'.html':'text/html','.js':'application/javascript','.css':'text/css','.webp':'image/webp','.avif':'image/avif'})[path.extname(file)]||'application/octet-stream');
  res.end(fs.readFileSync(file));
 });
 await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base=`http://127.0.0.1:${server.address().port}`;
 let browser;
 try{
  browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||'/usr/bin/chromium',args:['--no-sandbox']});
  const context=await browser.newContext();
  await context.route('**/*',r=>r.request().url().startsWith(base)?r.continue():r.abort());
  const page=await context.newPage();
  const failures=[]; page.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)failures.push(`${r.status()} ${r.url()}`)});
  for(const width of [390,768,1440]){
   await page.setViewportSize({width,height:900});
   for(const route of pages){
    await page.goto(base+route);
    const images=page.locator('img[data-visual-refresh]');
    assert.equal(await images.count(),route==='/'?4:1,`${route} refreshed images`);
    for(let i=0;i<await images.count();i++){
     const img=images.nth(i); await img.scrollIntoViewIfNeeded();
     await img.evaluate(e=>e.decode());
     const result=await img.evaluate(e=>({src:e.currentSrc,w:e.naturalWidth,h:e.naturalHeight,alt:e.alt,loading:e.loading,priority:e.fetchPriority,sizes:e.sizes}));
     assert.ok(result.src.includes('/visual-refresh/2026-10-21/'),result.src);
     assert.ok(result.w>0&&result.h>0);
     assert.match(result.alt,/concept/i);
     assert.ok(result.sizes);
     if(route==='/'&&i>0)assert.equal(result.loading,'lazy');
     else {assert.equal(result.loading,'eager'); assert.equal(result.priority,'high');}
    }
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${route} overflow ${width}`);
    assert.ok(await page.locator('body').innerText().then(t=>t.includes('not a completed project photograph')),`${route} disclosure`);
    await page.evaluate(()=>scrollTo(0,0));
    if(evidence){fs.mkdirSync(evidence,{recursive:true});await page.screenshot({path:path.join(evidence,`${route==='/'?'home':route.replaceAll('/','_')}-${width}.png`),fullPage:false});}
   }
  }
  await page.goto(base+'/');
  for(const index of [1,0,1,0]){
   await page.locator('[data-home-hero-dot]').nth(index).click();
   await page.waitForTimeout(800);
   assert.equal(await page.locator('[data-home-hero-slide].is-active').count(),1);
   assert.equal(await page.locator('[data-home-hero-dot]').nth(index).getAttribute('aria-pressed'),'true');
  }
  assert.deepEqual(failures,[],'No missing local resources');
  console.log('PASS: 8 image placements across 5 pages, decoded responsive images, factual concept alt/disclosures, LCP/lazy priorities, 390/768/1440 layout, repeated carousel navigation, and zero local 404s.');
 } finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
