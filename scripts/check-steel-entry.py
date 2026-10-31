"""Release checks for steel entrance product and image-label cleanup. Run from any cwd."""
from html.parser import HTMLParser
from pathlib import Path
import re,json,hashlib,urllib.parse,xml.etree.ElementTree as ET
R=Path(__file__).resolve().parents[1]
route='/products/fire-security-doors/architectural-steel-security-entrance-door'
class Page(HTMLParser):
 def __init__(self,text):
  super().__init__();self.tags=[];self.feed(text)
 def handle_starttag(self,t,a):self.tags.append((t,dict(a)))
s=(R/(route[1:]+'.html')).read_text();tags=Page(s).tags
assert sum(t=='h1' for t,a in tags)==1
assert sum(t=='main' for t,a in tags)==1
assert [a['href'] for t,a in tags if t=='link' and a.get('rel')=='canonical']==['https://www.visfurn.com'+route]
assert 'noindex' not in s
thumbs=[a for t,a in tags if t=='button' and a.get('class')=='thumb'];assert len(thumbs)==4
assert len(set(a['data-image'] for a in thumbs))==4
imgs=[a for t,a in tags if t=='img' and a.get('class')=='detail-media'];assert len(imgs)==3
hashes=[]
for a in thumbs+imgs:
 p=R/(a.get('data-image') or a['src']).lstrip('/');assert p.is_file(),p
 hashes.append(hashlib.sha256(p.read_bytes()).hexdigest())
assert len(set(hashes))==7,'Duplicate images'
objects=[json.loads(x) for x in re.findall(r'<script type="application/ld\+json">(.*?)</script>',s,re.S)]
product=next(x for x in objects if x['@type']=='Product');assert len(product['image'])==4
for key in ['offers','aggregateRating','review','sku','mpn']:assert key not in product
faq=next(x for x in objects if x['@type']=='FAQPage')
from html import unescape
visible=[(unescape(a),unescape(b)) for a,b in re.findall('<details><summary>(.*?)</summary><p>(.*?)</p></details>',s,re.S)]
assert visible==[(x['name'],x['acceptedAnswer']['text']) for x in faq['mainEntity']]
assert 'Request a project quotation' in s and 'Tianjingang' in s
assert 'not a delivered project' in s
for t,a in tags:
 u=a.get('href') if t=='a' else a.get('src') if t in ['script','img'] else None
 if not u:continue
 parts=urllib.parse.urlsplit(unescape(u));p=parts.path
 if p.startswith('/'):
  assert (R/p[1:]).exists() or (R/(p[1:]+'.html')).exists(),u
 elif u.startswith('#'):
  assert any(b.get('id')==parts.fragment for _,b in tags),u
 if t=='a' and a.get('data-action')=='quote':
  qs=urllib.parse.parse_qs(parts.query);assert qs['product_page']==[route] and qs['source_page']==[route]
cat=(R/'products/fire-security-doors.html').read_text();assert f'href="{route}"' in cat
assert 'https://www.visfurn.com'+route in (R/'sitemap.xml').read_text();ET.fromstring((R/'sitemap.xml').read_text())
# Public pages and scripts only: technical attribution/AI-search discussion is unrelated.
pattern=re.compile(r'AI[-\s]+(?:generated|assisted|rendered|planning|visual|design)|(?:人工智能|AI)[\s-]*生成|generad[oa].{0,15}(?:IA|inteligencia artificial)',re.I)
checked=0
for p in R.rglob('*'):
 if p.suffix not in ['.html','.js','.json'] or set(p.relative_to(R).parts)&{'.git','docs','scripts','source','.github'}:continue
 text=p.read_text();assert not pattern.search(text),str(p);checked+=1
print(f'PASS: 4 main + 3 unique detail assets, schema/FAQ parity, category, sitemap, local links/assets, quote attribution, and {checked} public files without image-generation labels.')
