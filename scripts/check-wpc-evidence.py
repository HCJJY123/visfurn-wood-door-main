#!/usr/bin/env python3
"""Validate WPC answer/schema parity and preserve the approved product release.

Run from the repository root. Optional --base-url checks public HTML without
submitting forms. --baseline must be the reviewed pre-change commit.
"""
import argparse
from html import unescape
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET

parser = argparse.ArgumentParser()
parser.add_argument('--baseline', default='bbd3ba724a4c8931e2f724ac35170d7bcab29279')
parser.add_argument('--base-url')
args = parser.parse_args()
origin = 'https://www.visfurn.com'
pages = ['products/wpc-doors.html', 'products/wpc-doors/waterproof-wpc-interior-door.html']

def normalized(value):
    value = re.sub(r'<(script|style)\b[^>]*>.*?</\1>', '', value, flags=re.S)
    return re.sub(r'\s+', ' ', unescape(re.sub('<[^>]*>', ' ', value))).strip()

def walk(value):
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from walk(child)
    elif isinstance(value, list):
        for child in value:
            yield from walk(child)

class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.tags = []
        self.feed(source)
    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))

report = []
for path in pages:
    text = Path(path).read_text()
    before = subprocess.check_output(['git', 'show', f'{args.baseline}:{path}'], text=True)
    tags = Page(text).tags
    oldtags = Page(before).tags
    canonical = origin + '/' + path.removesuffix('.html')
    assert [a['href'] for t, a in tags if t == 'link' and a.get('rel') == 'canonical'] == [canonical]
    assert len([t for t, a in tags if t == 'h1']) == 1
    assert not any('noindex' in a.get('content', '') for t, a in tags if t == 'meta')
    for tag in ['img', 'source', 'form', 'input', 'select', 'textarea', 'button']:
        def fields(items):
            return [{k: v for k, v in a.items() if k != 'alt'} for t, a in items if t == tag]
        assert fields(tags) == fields(oldtags), (path, tag, 'protected media/control altered')
    assert re.findall(r'<script(?![^>]*application/ld\+json)[^>]*>.*?</script>', text, re.S) == re.findall(r'<script(?![^>]*application/ld\+json)[^>]*>.*?</script>', before, re.S)
    assert re.findall(r'<style.*?</style>', text, re.S) == re.findall(r'<style.*?</style>', before, re.S)
    blocks = [json.loads(x) for x in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', text, re.S)]
    questions = [x for b in blocks for x in walk(b) if x.get('@type') == 'Question']
    visible = normalized(text)
    for question in questions:
        assert normalized(question['name']) in visible, (path, question['name'])
        assert normalized(question['acceptedAnswer']['text']) in visible, (path, question['name'], 'answer parity')
    for tag, attrs in tags:
        href = attrs.get('href', '')
        if tag != 'a' or not href.startswith('/') or href.startswith('//'):
            continue
        target = urllib.parse.urlsplit(href).path.strip('/')
        assert not target or any(p.is_file() for p in [Path(target), Path(target + '.html'), Path(target) / 'index.html']), (path, href)
    assert '50' in visible and '10' in visible, (path, 'MOQ preserved')
    assert 'Since 2009' not in visible and 'Quality Verified' not in visible
    if args.base_url:
        request = urllib.request.Request(args.base_url.rstrip('/') + '/' + path.removesuffix('.html'), headers={'User-Agent': 'VISFURN-Evidence-QA'})
        with urllib.request.urlopen(request, timeout=30) as response:
            assert response.status == 200
            assert 'noindex' not in response.headers.get('X-Robots-Tag', '')
            assert response.read().decode() == text, (path, 'published source mismatch')
    report.append({'page': canonical, 'faq_answers_visible': len(questions)})

# Every product link in the collection remains discoverable, including the latest release.
collection = Path(pages[0]).read_text()
assert 'Representative WPC Bathroom Project Brief' in collection
assert '"publisher":{"@id":"' + origin + '/#organization"}' in collection
product = Path(pages[1]).read_text()
assert '"manufacturer":{"@id":"' + origin + '/#organization"}' in product
assert 'not verified installation or test records' in product
assert 'No waterproof, fire or acoustic rating is established by this page.' in product
newest = 'products/wpc-doors/flush-woodgrain-wpc-bedroom-door.html'
assert Path(newest).read_bytes() == subprocess.check_output(['git', 'show', f'{args.baseline}:{newest}'])
assert '/products/wpc-doors/flush-woodgrain-wpc-bedroom-door' in collection
allowed = set(pages + ['sitemap.xml', 'scripts/check-wpc-evidence.py'])
changed = set(subprocess.check_output(['git', 'diff', '--name-only', args.baseline], text=True).splitlines())
assert changed <= allowed, ('out-of-scope changes', changed - allowed)

root = ET.parse('sitemap.xml').getroot()
ns = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
locations = [u.find('s:loc', ns).text for u in root]
assert len(locations) == len(set(locations))
for path in pages:
    location = origin + '/' + path.removesuffix('.html')
    found = [u for u in root if u.find('s:loc', ns).text == location]
    assert len(found) == 1
    assert found[0].find('s:lastmod', ns).text == '2026-10-25'
print(json.dumps({'status': 'PASS', 'pages': report, 'unique_sitemap_urls': len(locations), 'latest_product_preserved': True, 'remote_checked': bool(args.base_url)}, indent=2))
