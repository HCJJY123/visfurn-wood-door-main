from pathlib import Path
from bs4 import BeautifulSoup
import json,hashlib
R=Path(__file__).resolve().parents[1];route='/products/exterior-doors/charcoal-panel-entrance-door';p=R/(route[1:]+'.html');s=BeautifulSoup(p.read_text(),'html.parser');cat=BeautifulSoup((R/'products/exterior-doors.html').read_text(),'html.parser')
assert len(s.select('h1'))==1
assert len(s.select('main'))==1
assert s.select_one('link[rel=canonical]')['href']=='https://www.visfurn.com'+route
assert len(s.select('[data-view]'))==4
assert len(s.select('#details figure'))==3
schema=json.loads(s.select_one('script[type="application/ld+json"]').string)['@graph'];prod=next(x for x in schema if x['@type']=='Product');faq=next(x for x in schema if x['@type']=='FAQPage')
assert len(prod['image'])==7 and len(set(prod['image']))==7
for key in ['offers','aggregateRating','review','material','sku','mpn']:assert key not in prod,key
visible=[(x.summary.get_text(),x.p.get_text()) for x in s.select('#faq details')]
assert visible==[(x['name'],x['acceptedAnswer']['text']) for x in faq['mainEntity']]
assert cat.select_one('a.vf-category-card[href="'+route+'"]')
assert 'https://www.visfurn.com'+route in (R/'sitemap.xml').read_text()
for a in s.select('a[href]'):
 href=a['href'].split('?')[0].split('#')[0]
 if not href: assert s.select_one('#'+a['href'].split('#')[1]);continue
 if href.startswith('/'):
  assert (R/href.lstrip('/')).exists() or (R/(href.lstrip('/')+'.html')).exists(),href
for node in s.select('img[src],script[src]'):
 src=node['src']
 if src.startswith('/'):assert (R/src[1:]).is_file(),src
hashes=[]
for image in prod['image']:
 path=R/image.split('https://www.visfurn.com/')[1];hashes.append(hashlib.sha256(path.read_bytes()).hexdigest())
assert len(set(hashes))==7
print('PASS: 4 main + 3 detail assets, unique hashes, single H1/main, canonical, FAQ parity, conservative Product schema, category card, sitemap, all page links/assets.')
