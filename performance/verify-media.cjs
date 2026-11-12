const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const sharp = require('sharp');
const { buildMedia } = require('./build-media.cjs');
const { mediaUrl, mediaKey } = require('./media-policy.cjs');
const { optimizeHtml, attr } = require('./static-html.cjs');
(async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'site-media-'));
  try {
    await fs.mkdir(path.join(root, 'assets'), { recursive: true });
    // A real transparent image verifies that conversion keeps the full product canvas.
    await sharp({ create: { width: 1400, height: 1000, channels: 4, background: '#c67c3b88' } }).png().toFile(path.join(root, 'assets', 'product.png'));
    await sharp({ create: { width: 600, height: 1000, channels: 4, background: '#34567888' } }).png().toFile(path.join(root, 'assets', 'mobile.png'));
    await fs.writeFile(path.join(root, 'index.html'), '<html><head><link rel="preload" as="image" href="/assets/obsolete.webp"></head><body><img src="/assets/product.png" alt="Door"><img src="/assets/mobile.png" alt="Detail"></body></html>');
    const result = await buildMedia({ root, mode: 'static', minBytes: 0 });
    assert.equal(result.summary.optimizedImages, 2);
    const html = await fs.readFile(path.join(root, 'dist', 'index.html'), 'utf8');
    const images = [...html.matchAll(/<img\b[^>]*>/g)].map((m) => m[0]);
    assert.equal(attr(images[0], 'loading'), 'eager');
    assert.equal(attr(images[1], 'loading'), 'lazy');
    assert.equal(attr(images[0], 'data-full-src'), '/assets/product.png');
    assert(!html.includes('obsolete.webp'));
    const preload = html.match(/<link\b[^>]*>/)[0];
    assert.equal(attr(preload, 'imagesrcset'), attr(images[0], 'srcset'));
    for (const image of result.images) {
      for (const w of image.variants) {
        const url = mediaUrl(image.src, w, result.index);
        const metadata = await sharp(path.join(root, 'dist', url)).metadata();
        assert.equal(metadata.width, Math.min(w, image.width));
        assert.equal(metadata.hasAlpha, true);
        assert(Math.abs(metadata.width / metadata.height - image.width / image.height) < 0.003);
      }
    }
    const info = Object.fromEntries(result.images.map((image) => [image.src, image]));
    const art = optimizeHtml('<head></head><picture><source media="(max-width: 620px)" type="image/png" srcset="/assets/mobile.png 600w"><source type="image/png" srcset="/assets/product.png 1400w"><img src="/assets/product.png"></picture>', result.index, info).html;
    assert(art.includes('media="(max-width: 620px)"'));
    assert(art.includes('/assets/mobile.png 600w'));
    const avif = optimizeHtml('<head></head><picture><source type="image/avif" srcset="/assets/door-480.avif 480w, /assets/door-960.avif 960w" sizes="100vw"><img src="/assets/product.png"></picture>', result.index, info).html;
    const avifPreload = avif.match(/<link\b[^>]*>/)[0];
    assert.equal(attr(avifPreload, 'type'), 'image/avif');
    assert.equal(attr(avifPreload, 'imagesrcset'), '/assets/door-480.avif 480w, /assets/door-960.avif 960w');
    assert(!art.includes('rel="preload"'));
    assert.equal(mediaUrl('/assets/unknown.webp', 480, result.index), '/assets/unknown.webp');
    assert.equal(mediaUrl('https://example.com/photo.jpg', 480, result.index), 'https://example.com/photo.jpg');
    // Different source bytes must change the URL so immutable caches cannot go stale.
    const previous = mediaUrl('/assets/product.png', 480, result.index);
    await sharp({ create: { width: 1400, height: 1000, channels: 4, background: '#22553388' } }).png().toFile(path.join(root, 'assets', 'product.png'));
    const changed = await buildMedia({ root, mode: 'static', minBytes: 0 });
    assert.notEqual(mediaUrl('/assets/product.png', 480, changed.index), previous);
    console.log('PASS: responsive URLs, preload match, lazy loading, original zoom, mobile art direction, alpha, aspect ratio and cache invalidation');
  } finally { await fs.rm(root, { recursive: true, force: true }); }
})().catch((error) => { console.error(error); process.exitCode = 1; });
