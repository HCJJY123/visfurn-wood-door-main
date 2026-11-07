#!/usr/bin/env python3
"""Validate the published supply-package content and buyer-to-RFQ paths locally.

Run from repository root. This script does not send an inquiry or make network calls.
"""
from collections import Counter
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, parse_qs, unquote
import json
import re
import xml.etree.ElementTree as ET

NEW = [
    'solutions/interior-door-supply-packages.html',
    'blog/white-primed-vs-white-finished-interior-doors.html',
    'blog/interior-door-trial-order-for-distributors-contractors.html',
]
TOUCHED = NEW + [
    'index.html', 'products.html', 'blog.html', 'contact.html',
    'products/interior-doors.html', 'products/wooden-doors.html', 'products/wpc-doors.html',
    'solutions/custom-interior-wood-door-projects.html', 'solutions/door-schedule-quotation.html',
    'blog/slab-vs-prehung-vs-full-door-set-specification.html',
    'blog/door-sample-approval-checklist-before-mass-production.html',
]

class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.tags=[]; self.ids=[]; self.feed(text)
    def handle_starttag(self, tag, attrs):
        a=dict(attrs);self.tags.append((tag,a))
        if a.get('id'):self.ids.append(a['id'])
    def count(self, tag): return sum(t==tag for t,a in self.tags)

def schema_walk(obj):
    if isinstance(obj,dict):
        yield obj
        for v in obj.values():yield from schema_walk(v)
    elif isinstance(obj,list):
        for v in obj:yield from schema_walk(v)

for name in NEW:
    text=Path(name).read_text(); p=Page(text)
    assert p.count('h1')==p.count('main')==1, name
    assert all(n==1 for n in Counter(p.ids).values()), name+' duplicate IDs'
    canonical=[a['href'] for t,a in p.tags if t=='link' and a.get('rel')=='canonical']
    assert canonical==['https://www.visfurn.com/'+name[:-5]], canonical
    blocks=[json.loads(b) for b in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>',text,re.S)]
    types=Counter(o.get('@type') for b in blocks for o in schema_walk(b) if isinstance(o.get('@type'),str))
    assert types.get('Article',0)==(1 if name.startswith('blog/') else 0), types
    assert not types.get('Product') and not types.get('Offer'), types
    assert not re.search(r'jinluxi|金陆禧|金鲁西|NFPA 701|BS 7837|98%|2005',text,re.I), name
    assert '50 sets' in text and '10 sets per model' in text, name
    for t,a in p.tags:
        if t=='img':assert a.get('alt') and a.get('width') and a.get('height'), (name,a)

# Every new article has a product route, a package route and a working RFQ destination.
contact=Page(Path('contact.html').read_text())
names={a.get('name') for t,a in contact.tags if t in ('input','select','textarea')}
for field in ['inquiry_purpose','supply_scope','finish_state']:
    attrs=[a for t,a in contact.tags if t=='select' and a.get('name')==field]
    assert len(attrs)==1 and 'required' not in attrs[0], field
form=[a for t,a in contact.tags if t=='form' and a.get('id')=='quote-form'][0]
assert form['action']=='https://formspree.io/f/xoeadjwv' and form['method']=='post'
assert {'submission_attempt_id','source_page','product_slug','product_name','product_url','_replyto','requirements'}<=names

valid={
 'supply_scope':{'slab-only','leaf-frame-trim','hardware-package','help-me-choose'},
 'inquiry_purpose':{'bulk-order','sample-review','commercial-trial','specification-review'},
 'finish_state':{'white-primed','white-finished'},
}
contexts=[]
for name in TOUCHED:
    p=Page(Path(name).read_text())
    for t,a in p.tags:
        if t!='a':continue
        href=a.get('href','');u=urlsplit(href)
        if u.path!='/contact':continue
        q=parse_qs(u.query)
        if not any(k in q for k in valid):continue
        for k,options in valid.items():
            if k in q:assert len(q[k])==1 and q[k][0] in options,(name,href)
        assert q.get('product',[''])[0] in ['interior-doors','wooden-doors','wpc-doors'],(name,href)
        assert q.get('source_page',[''])[0]==('/' if name=='index.html' else '/'+name[:-5]),(name,href)
        assert u.fragment=='quote-form'
        contexts.append(href)

xml=ET.fromstring(Path('sitemap.xml').read_text());ns={'s':'http://www.sitemaps.org/schemas/sitemap/0.9'}
locs=[x.find('s:loc',ns).text for x in xml.findall('s:url',ns)]
for name in NEW:assert locs.count('https://www.visfurn.com/'+name[:-5])==1,name
hub=Page(Path('blog.html').read_text())
for name in NEW[1:]:assert sum(t=='a' and a.get('href')=='/'+name[:-5] for t,a in hub.tags)==1,name
cards=[a for t,a in hub.tags if a.get('data-blog-category')]
total=re.search(r'data-blog-total>(\d+)<',Path('blog.html').read_text()).group(1)
assert int(total)==len(cards),(total,len(cards))

print(json.dumps({'status':'passed','new_pages':len(NEW),'contextual_RFQ_links':len(contexts),'filterable_blog_cards':len(cards),'form_endpoint':'unchanged'},indent=2))
