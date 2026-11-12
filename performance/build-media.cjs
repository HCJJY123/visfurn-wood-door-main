const fs = require('node:fs/promises');
const path = require('node:path');
const crypto = require('node:crypto');
const sharp = require('sharp');
const { WIDTHS, mediaKey } = require('./media-policy.cjs');
const { optimizeHtml } = require('./static-html.cjs');
const RASTER = /\.(?:avif|webp|png|jpe?g)$/i;
const SKIP = new Set(['node_modules', '.git', '.next', '.cache', 'dist', '_media', 'screenshots', 'deliveries']);
async function walk(root, predicate, output = []) {
  for (const item of await fs.readdir(root, { withFileTypes: true }).catch(() => [])) {
    if (SKIP.has(item.name)) continue;
    const file = path.join(root, item.name);
    if (item.isDirectory()) await walk(file, predicate, output);
    else if (predicate(file)) output.push(file);
  }
  return output;
}
async function pool(items, limit, callback) {
  let cursor = 0;
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) await callback(items[cursor++]);
  }));
}
async function buildMedia({ root = process.cwd(), mode = 'next', minBytes = 24000 } = {}) {
  sharp.cache({ memory: 64, files: 20, items: 80 });
  sharp.concurrency(1);
  const sourceRoot = mode === 'static' ? root : path.join(root, 'public');
  const outputRoot = mode === 'static' ? path.join(root, 'dist') : sourceRoot;
  const sourceFiles = mode === 'static'
    ? await walk(root, (file) => /\.(?:html|css|js|json)$/i.test(file) && !file.includes(`${path.sep}docs${path.sep}`) && !file.includes(`${path.sep}src${path.sep}`))
    : (await Promise.all(['app', 'src', 'content'].map((folder) => walk(path.join(root, folder), (file) => /\.(?:js|jsx|mjs|json|css|md)$/i.test(file))))).flat();
  const references = new Set();
  for (const file of sourceFiles) {
    const source = await fs.readFile(file, 'utf8');
    for (const match of source.matchAll(/\/(?:assets|images)\/[^"'`<>\\\s?#){}$]+\.(?:avif|webp|png|jpe?g)/gi)) {
      try { references.add(decodeURI(match[0])); } catch { /* Invalid URLs stay original. */ }
    }
  }
  // Include WebP assets referenced by dynamically assembled product/gallery URLs.
  for (const file of await walk(path.join(sourceRoot, 'assets'), (file) => /\.webp$/i.test(file))) references.add(`/${path.relative(sourceRoot, file).split(path.sep).join('/')}`);
  const images = [], warnings = [];
  await pool([...references].sort(), 3, async (src) => {
    const input = path.resolve(sourceRoot, `.${src}`);
    if (!input.startsWith(`${sourceRoot}${path.sep}`) || !RASTER.test(src)) return;
    try {
      const stat = await fs.stat(input), metadata = await sharp(input).metadata();
      if ((metadata.pages || 1) > 1) return;
      const sideways = metadata.orientation >= 5 && metadata.orientation <= 8;
      const width = sideways ? metadata.height : metadata.width, height = sideways ? metadata.width : metadata.height;
      if (!width || !height) return;
      const hash = crypto.createHash('sha256').update(await fs.readFile(input)).digest('hex').slice(0, 12);
      const maxWidth = WIDTHS.find((n) => n >= width) || WIDTHS.at(-1);
      const variants = stat.size >= minBytes && width >= 400 ? WIDTHS.filter((w) => w <= maxWidth) : [];
      images.push({ src, input, width, height, hash, bytes: stat.size, key: mediaKey(src), maxWidth, variants });
    } catch (error) { if (error.code !== 'ENOENT') warnings.push({ src, error: error.message }); }
  });
  images.sort((a, b) => a.src.localeCompare(b.src));
  const eligible = images.filter((item) => item.variants.length), index = { images: {} };
  for (const image of eligible) {
    if (index.images[image.key]) throw new Error(`Image path hash collision: ${image.src}`);
    index.images[image.key] = [image.hash, image.maxWidth];
  }
  const mediaDir = path.join(outputRoot, '_media', 'v1'), cacheDir = path.join(root, '.next', 'cache', 'static-media-v2');
  await fs.mkdir(mediaDir, { recursive: true }); await fs.mkdir(cacheDir, { recursive: true });
  let generated = 0, outputBytes = 0;
  await pool(eligible, 3, async (image) => {
    for (const width of image.variants) {
      const name = `${image.key}-${image.hash}-${width}.webp`, cacheFile = path.join(cacheDir, name);
      try { await fs.access(cacheFile); }
      catch { await sharp(image.input).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82, alphaQuality: 100, effort: 4 }).toFile(cacheFile); }
      const target = path.join(mediaDir, name);
      await fs.copyFile(cacheFile, target); outputBytes += (await fs.stat(target)).size; generated++;
    }
  });
  let htmlPages = 0;
  if (mode === 'static') {
    const files = await walk(root, (file) => !path.relative(root, file).split(path.sep).some((part) => part.startsWith('.') || ['docs', 'scripts', 'performance', 'src'].includes(part)) && !/package(?:-lock)?\.json$|vercel\.json$/.test(file));
    const imageInfo = Object.fromEntries(images.map((image) => [image.src, image]));
    for (const file of files) {
      const target = path.join(outputRoot, path.relative(root, file)); await fs.mkdir(path.dirname(target), { recursive: true });
      if (/\.html$/i.test(file)) { await fs.writeFile(target, optimizeHtml(await fs.readFile(file, 'utf8'), index, imageInfo).html); htmlPages++; }
      else await fs.copyFile(file, target);
    }
  } else await fs.writeFile(path.join(root, 'performance', 'generated-image-index.json'), `${JSON.stringify(index)}\n`);
  const summary = { mode, sourceImages: images.length, optimizedImages: eligible.length, generatedFiles: generated, outputBytes, htmlPages, warnings };
  await fs.writeFile(path.join(mediaDir, 'build-summary.json'), `${JSON.stringify(summary, null, 2)}\n`);
  console.log(JSON.stringify(summary));
  return { index, images, summary, outputRoot };
}
module.exports = { buildMedia };
if (require.main === module) buildMedia({ mode: process.argv.includes('--static') ? 'static' : 'next' }).catch((error) => { console.error(error); process.exitCode = 1; });
