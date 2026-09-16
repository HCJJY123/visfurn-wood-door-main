#!/usr/bin/env python3
"""Post-deploy checks for the Latin American Spanish landing page.
Usage:  python3 scripts/check-es-latam-landing.py
        BASE=http://localhost:3000 python3 scripts/check-es-latam-landing.py
Exit 0 = all PASS, 1 = at least one FAIL.
"""
import json, os, re, sys, urllib.request, urllib.error
from html.parser import HTMLParser

BASE = os.environ.get("BASE", "https://www.visfurn.com").rstrip("/")
PROD = "https://www.visfurn.com"
ES_PATH = "/es/puertas-para-proyectos"
EN_PATH = "/solutions/door-schedule-quotation"
ES_ABS, EN_ABS = PROD + ES_PATH, PROD + EN_PATH
MARKET_TAG = "market_page=es-419-puertas-para-proyectos"
# Facts shown on the Spanish page must still match the English product pages.
FACTS = {
    "/products/hotel-doors/hotel-guestroom-door": ["50 Sets", "30–45 days", "US$148", "US$112"],
    "/products/hospital-doors/automatic-hermetic-sliding-door": ["1 Set", "35–50 days", "US$1,680", "US$1,280"],
    "/products/fire-security-doors/fire-rated-steel-security-door": ["10 Sets", "30–45 days", "US$185", "US$145"],
    "/products/school-doors/galvanized-steel-school-door": ["50 Sets", "30–45 days", "US$178", "US$138"],
    "/products/wpc-doors/waterproof-wpc-interior-door": ["50 Sets", "42", "38"],
    "/products/interior-doors/modern-pvc-wooden-door": ["10 Sets", "25–35 Days", "$66", "$61"],
}
failures = 0

def result(ok, label, detail=""):
    global failures
    print(("PASS " if ok else "FAIL ") + label + (f"  [{detail}]" if detail and not ok else ""))
    failures += 0 if ok else 1

def get(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "visfurn-es-latam-check"})
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status, r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        return e.code, ""
    except Exception as e:
        return 0, str(e)

class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.html_attrs, self.alts, self.anchors, self.jsonld, self.text = {}, {}, [], [], []
        self.title = self.desc = self.canonical = self.robots = ""
        self.h1 = 0; self._stack = []; self._ld = False
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html": self.html_attrs = a
        if tag == "meta" and a.get("name") == "description": self.desc = a.get("content", "")
        if tag == "meta" and a.get("name") == "robots": self.robots = a.get("content", "")
        if tag == "link" and a.get("rel") == "canonical": self.canonical = a.get("href", "")
        if tag == "link" and a.get("rel") == "alternate" and a.get("hreflang"): self.alts[a["hreflang"]] = a.get("href", "")
        if tag == "a" and a.get("href"): self.anchors.append(a["href"])
        if tag == "h1": self.h1 += 1
        if tag == "script" and a.get("type") == "application/ld+json": self._ld = True; self.jsonld.append("")
        if tag not in ("meta", "link", "img", "source", "br", "input"): self._stack.append(tag)
    def handle_endtag(self, tag):
        if tag == "script": self._ld = False
        if self._stack and self._stack[-1] == tag: self._stack.pop()
    def handle_data(self, data):
        if self._ld: self.jsonld[-1] += data; return
        top = self._stack[-1] if self._stack else ""
        if top in ("script", "style", "noscript"): return
        if top == "title": self.title += data
        if data.strip(): self.text.append(data.strip())

status, es_html = get(ES_PATH)
result(status == 200, f"ES page 200 ({BASE}{ES_PATH})", str(status))
if status != 200: sys.exit(1)
es = Page(); es.feed(es_html)

result(es.html_attrs.get("lang") == "es", '<html lang="es">', str(es.html_attrs.get("lang")))
result(es.html_attrs.get("data-vf-page-locale") == "es", 'data-vf-page-locale="es"')
result(0 < len(es.title.strip()) <= 60, "title 1-60 chars", f"{len(es.title.strip())}")
result(120 <= len(es.desc) <= 160, "meta description 120-160 chars", str(len(es.desc)))
result(es.canonical == ES_ABS, "canonical = self", es.canonical)
result("noindex" not in es.robots.lower(), "indexable", es.robots)
result(es.h1 == 1, "one <h1>", str(es.h1))
result(es.alts.get("es-419") == ES_ABS and es.alts.get("en") == EN_ABS and es.alts.get("x-default") == EN_ABS,
       "hreflang: es-419 self, en + x-default -> EN", json.dumps(es.alts))

faq = None
for block in es.jsonld:
    try:
        d = json.loads(block)
        faq = d if d.get("@type") == "FAQPage" else faq
    except json.JSONDecodeError as e:
        result(False, "JSON-LD parses", str(e))
result(len(es.jsonld) == 3, "3 JSON-LD blocks", str(len(es.jsonld)))
visible = [(q.strip(), a.strip()) for q, a in re.findall(r"<summary>(.*?)</summary>\s*<p>(.*?)</p>", es_html, re.S)]
schema = [(q["name"], q["acceptedAnswer"]["text"]) for q in (faq or {}).get("mainEntity", [])]
result(bool(schema) and visible == schema, "FAQ schema = visible FAQ", f"{len(visible)} vs {len(schema)}")

english = re.compile(r"\b(the|and|with|your|request|quote|doors?|project|sample|shipping|pieces|sets|days)\b", re.I)
left = [t for t in es.text if english.search(t)]
result(not left, "no English leftovers", " | ".join(left[:5]))
visible_text = " ".join(es.text)
result(not re.search(r"garantiz|#1\b|número uno|líder", visible_text, re.I), "no unverifiable promises in visible text")

contacts = [h.replace("&amp;", "&") for h in es.anchors if h.startswith("/contact")]
result(contacts and all(MARKET_TAG in h and h.endswith("#quote-form") for h in contacts), "all /contact links tagged", str(len(contacts)))

status, en_html = get(EN_PATH); en = Page(); en.feed(en_html)
result(status == 200, "EN page 200", str(status))
result(en.alts.get("es-419") == ES_ABS and en.alts.get("en") == EN_ABS and en.alts.get("x-default") == EN_ABS,
       "EN page reciprocal hreflang", json.dumps(en.alts))
result(en.canonical == EN_ABS, "EN canonical unchanged", en.canonical)

status, sitemap = get("/sitemap.xml")
result(f"<loc>{ES_ABS}</loc>" in sitemap, "sitemap lists ES page")

seen = set()
for href in es.anchors:
    if not href.startswith("/") or href.startswith("//"): continue
    path = href.split("#")[0].split("?")[0]
    if path in seen: continue
    seen.add(path); code, _ = get(path)
    result(code == 200, f"internal link 200: {path}", str(code))

for path, needles in FACTS.items():
    code, body = get(path)
    missing = [n for n in needles if n not in body]
    result(code == 200 and not missing, f"facts still match EN page: {path}", f"missing {missing}")

code, mainjs = get("/assets/main.js")
result("vfPageLocale" in mainjs, "deployed main.js supports data-vf-page-locale")

print("\nALL PASS" if not failures else f"\n{failures} FAIL(S)")
sys.exit(1 if failures else 0)
