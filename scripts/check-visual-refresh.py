"""Static image integrity and non-image scope regression for the visual refresh.
Run from repository root with Python 3 and Pillow. Browser checks are separate.
"""
from pathlib import Path
from html.parser import HTMLParser
from PIL import Image
import re, subprocess, json
ROOT = Path.cwd()
BASE = '750891f0f7e8e04174b998314be3df68e154fce5'
PAGES = ['index.html', 'products/interior-doors.html', 'markets/saudi-arabia.html', 'markets/uae.html', 'markets/qatar.html']
PREFIX = '/assets/images/visual-refresh/2026-10-21/'
class Parser(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.parts=[]; self.images=[]; self.feed(text)
    def handle_data(self, text):
        if text.strip(): self.parts.append(text.strip())
    def handle_starttag(self, tag, attrs):
        if tag=='img': self.images.append(dict(attrs))
def prose(text):
    text=re.sub(r'<(script|style)\b.*?</\1>', '', text, flags=re.S)
    text=re.sub(r'<p[^>]*class="(?:illustrative-visual-label|visual-concept-caption)"[^>]*>.*?</p>', '', text, flags=re.S)
    return Parser(re.sub(r'<figcaption>.*?</figcaption>', '', text, flags=re.S)).parts
count=0
for name in PAGES:
    text=(ROOT/name).read_text()
    original=subprocess.check_output(['git', 'show', f'{BASE}:{name}'], text=True)
    assert prose(text)==prose(original), f'Unrelated text changed: {name}'
    assert re.findall(r'<a\b[^>]*href="([^"]+)"', text)==re.findall(r'<a\b[^>]*href="([^"]+)"', original), f'Links changed: {name}'
    assert 'not a completed project photograph' in text, name
    for im in Parser(text).images:
        if 'data-visual-refresh' not in im: continue
        count+=1
        assert 'concept' in im['alt'] and im.get('sizes'), im
        with Image.open(ROOT/im['src'].lstrip('/')) as asset:
            assert asset.size==(int(im['width']), int(im['height'])), im
    for source in set(re.findall(re.escape(PREFIX)+r'[^\s",<>]+\.(?:webp|avif)', text)):
        with Image.open(ROOT/source.lstrip('/')) as asset:
            asset.verify()
    for raw in re.findall(r'<script type="application/ld\+json">(.*?)</script>', text, re.S): json.loads(raw)
assert count==8, count
for file in (ROOT/PREFIX.lstrip('/')).glob('*'):
    assert file.stat().st_size < 200_000, f'Asset budget exceeded: {file}'
    with Image.open(file) as im: im.verify()
print('PASS: 8 image placements; all responsive AVIF/WebP files decode; dimensions, alt, disclosures, JSON-LD, <=200KB image budget, and unchanged commercial text/links.')
