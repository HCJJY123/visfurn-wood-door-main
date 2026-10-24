#!/usr/bin/env python3
"""Check wooden/WPC/PVC MOQ and preserve unrelated source against a git baseline.
Run from repository root: python scripts/check-wood-door-moq.py
Optional --base-url checks the exact published HTML via GET; never sends an inquiry.
"""
import argparse
from collections import Counter
from html import unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import urllib.request

parser=argparse.ArgumentParser()
parser.add_argument('--baseline', default='6b43461')
parser.add_argument('--base-url')
args=parser.parse_args()
scope=json.loads(Path('docs/qa/wood-door-moq-20261024-scope.json').read_text())

def normalize(s):
    s=re.sub(r'</?(?:p|li|ul|ol|div|section|h[1-6]|summary|details|br|td|th)\b[^>]*>',' ',s)
    s=re.sub(r'<[^>]*>','',s)
    return re.sub(r'\s+',' ',unescape(s)).strip()

def visible(s):
    return normalize(re.sub(r'<(script|style)\b[^>]*>.*?</\1>','',s,flags=re.S))

def blocks(s):
    return [json.loads(x) for x in re.findall(r'<script[^>]+type=["\']application/ld\+json["\'][^>]*>(.*?)</script>',s,re.S)]

def walk(d):
    if isinstance(d,dict):
        yield d
        for v in d.values(): yield from walk(v)
    elif isinstance(d,list):
        for x in d: yield from walk(x)

def faqs(s):
    return [d for b in blocks(s) for d in walk(b) if d.get('@type')=='Question' and 'acceptedAnswer' in d]

def mismatch(s):
    text=visible(s)
    return {(q['name'],q['acceptedAnswer']['text']) for q in faqs(s) if normalize(q['name']) not in text or normalize(q['acceptedAnswer']['text']) not in text}

class Invariants(HTMLParser):
    def __init__(self,s):
        super().__init__(convert_charrefs=False)
        self.anchors=[];self.media=[];self.controls=[];self.styles=[];self.scripts=[]
        self.script_kind=None;self.content='';self.style=False;self.feed(s)
    def handle_starttag(self,t,attrs):
        a=dict(attrs)
        if t=='a': self.anchors.append(a.get('href'))
        if t in ('img','source'): self.media.append((t,attrs))
        if t in ('form','input','select','option','textarea','button'): self.controls.append((t,attrs))
        if t=='script':self.script_kind='json' if a.get('type')=='application/ld+json' else attrs;self.content=''
        if t=='style':self.style=True;self.content=''
    def handle_startendtag(self,t,attrs):self.handle_starttag(t,attrs)
    def handle_data(self,s):
        if self.script_kind is not None or self.style:self.content+=s
    def handle_endtag(self,t):
        if t=='script':
            if self.script_kind!='json': self.scripts.append((self.script_kind,self.content))
            self.script_kind=None
        if t=='style':self.styles.append(self.content);self.style=False

report=[]
for file,url in zip(scope['changed_html'],scope['canonical_urls']):
    old=subprocess.check_output(['git','show',f'{args.baseline}:{file}'],text=True)
    new=Path(file).read_text()
    a,b=Invariants(old),Invariants(new)
    for field in ('anchors','media','controls','styles','scripts'):
        assert getattr(a,field)==getattr(b,field),(file,field,'changed')
    prices=lambda s:set(re.findall(r'(?:US\$|USD\s*|\$)\s*\d+(?:[.,]\d+)*(?:[–-]\d+(?:[.,]\d+)*)?',s))
    assert prices(old)==prices(new),(file,'price value changed')
    assert len(re.findall(r'<h1\b',old))==len(re.findall(r'<h1\b',new)),(file,'H1 count')
    baseline_mismatches=mismatch(old)
    new_mismatches=mismatch(new)
    assert not new_mismatches-baseline_mismatches,(file,'introduced FAQ/schema mismatch',new_mismatches-baseline_mismatches)
    for q in faqs(new):
        ans=q['acceptedAnswer']['text']
        if '50' in ans and '10' in ans and ans not in [x['acceptedAnswer']['text'] for x in faqs(old)]:
            assert normalize(ans) in visible(new),(file,'changed MOQ answer must be visible')
    assert '50' in visible(new) and '10' in visible(new),(file,'missing numeric policy')
    if file.startswith('products/') and '/'+file.split('/')[1]+'/' in file:
        assert re.search(r'50 sets (?:per order|in total)',visible(new)),(file,'order minimum')
        assert re.search(r'(?:minimum |at least )10 sets per model',visible(new)),(file,'model minimum')
    if args.base_url:
        path=url.removeprefix('https://www.visfurn.com')
        req=urllib.request.Request(args.base_url.rstrip('/')+path,headers={'User-Agent':'VISFURN-MOQ-Verification'})
        with urllib.request.urlopen(req,timeout=30) as r:
            assert r.status==200,(file,r.status)
            actual=r.read().decode()
        assert actual==new,(file,'deployed HTML differs from reviewed source')
    report.append({'file':file,'json_ld_blocks':len(blocks(new)),'faq_count':len(faqs(new)),'preexisting_faq_mismatches':len(baseline_mismatches),'new_faq_mismatches':0})

for locale in ['us','es','fr','ru','mn']:
    d=json.loads(Path(f'i18n/{locale}.json').read_text())
    texts=[x['a'] for x in d['faq']]
    assert any('50' in x and '10' in x for x in texts),locale
    if locale!='mn':assert '50' in d['moq']['value'] and '10' in d['moq']['value'],locale
# No stale minimums in any covered active product page or locale source.
covered=scope['changed_html']+[f'i18n/{x}.json' for x in ['us','es','fr','ru','mn']]
for file in covered:
    s=Path(file).read_text()
    for stale in ['10 sets or more per model recommended','10 sets or more per model is recommended','MOQ of 5 pieces','1 Piece (sample accepted)','MOQ 10 sets','Pedido mínimo 10 juegos','Минимальный заказ 10 комплектов','50 مجموعة لكل موديل','Нийлмэл материалтай орцны хаалга: 20 иж бүрдэл','No universal MOQ is published']:
        assert stale not in s,(file,'stale policy',stale)
# Separate steel/automatic and unknown-material designs must remain byte-identical.
for file in ['products/exterior-doors/smart-steel-entrance-door.html','products/fire-security-doors/fire-rated-steel-security-door.html','products/fire-security-doors/steel-fire-door-for-house.html','products/school-doors/galvanized-steel-school-door.html','products/hospital-doors/automatic-hermetic-sliding-door.html','products/hospital-doors/index.html','products/exterior-doors/charcoal-panel-entrance-door.html','products/school-doors/custom-color-classroom-door.html','products/hospital-doors/modern-laboratory-door/index.html','products/hotel-doors/modern-finished-hotel-interior-door/index.html']:
    assert Path(file).read_bytes()==subprocess.check_output(['git','show',f'{args.baseline}:{file}']),(file,'excluded product altered')
# Prices, scripts, API, forms, consent and tracking are protected by source invariants.
for file in ['assets/main.js','assets/steel-fire-door-prefill.js','assets/product-source-context.js','vercel.json','.vercelignore']:
    assert Path(file).read_bytes()==subprocess.check_output(['git','show',f'{args.baseline}:{file}']),(file,'protected source changed')
print(json.dumps({'status':'PASS','pages':len(report),'locale_sources':5,'results':report,'remote_checked':bool(args.base_url)},indent=2))
