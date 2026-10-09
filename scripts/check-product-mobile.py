"""Static product mobile regression checks; not a substitute for browser QA."""
from pathlib import Path
from html.parser import HTMLParser
import subprocess
import unittest

ROOT = Path(__file__).resolve().parents[1]
PAGES = sorted(p for p in (ROOT / 'products').rglob('*.html')
               if len(p.relative_to(ROOT).parts) >= 3
               and p.relative_to(ROOT).as_posix() != 'products/hospital-doors/index.html')


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.tags = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        self.tags.append((tag, dict(attrs)))


class ProductMobileTests(unittest.TestCase):
    def test_all_eighteen_details_are_scoped(self):
        self.assertEqual(len(PAGES), 18)
        for path in PAGES:
            with self.subTest(page=str(path.relative_to(ROOT))):
                tags = Page(path.read_text()).tags
                body = [a for t, a in tags if t == 'body']
                self.assertEqual(len(body), 1)
                self.assertEqual(body[0]['class'].split().count('vf-product-detail'), 1)
                css = [a.get('href') for t, a in tags if t == 'link' and a.get('rel') == 'stylesheet']
                self.assertEqual(css[-1], '/assets/product-mobile.css?v=20261010-v1')

    def test_business_links_metadata_and_images_unchanged(self):
        for path in PAGES:
            rel = path.relative_to(ROOT).as_posix()
            old = subprocess.check_output(['git', 'show', '77cbd15:' + rel], cwd=ROOT, text=True)
            def protected(source):
                return [(t, a) for t, a in Page(source).tags
                        if t in ('meta', 'a', 'img', 'form', 'input', 'textarea', 'select')
                        or (t == 'link' and a.get('rel') == 'canonical')]
            with self.subTest(page=rel):
                self.assertEqual(protected(old), protected(path.read_text()))

    def test_styles_are_mobile_scoped(self):
        css = (ROOT / 'assets/product-mobile.css').read_text()
        self.assertIn('@media screen and (max-width: 760px)', css)
        self.assertEqual(css.count('{'), css.count('}'))
        self.assertNotIn('overflow-x: hidden', css)
        self.assertIn('vf-mobile-actions-visible :is(.wpc-sticky-cta, .pvc-sticky)', css)


if __name__ == '__main__':
    unittest.main(verbosity=2)
