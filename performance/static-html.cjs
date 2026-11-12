const { mediaUrl } = require('./media-policy.cjs');
const escape = (value) => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;');
const attr = (tag, name) => (tag.match(new RegExp(`(?:^|\\s)${name}\\s*=\\s*["']([^"']*)["']`, 'i'))?.[1] || '').replaceAll('&amp;', '&');
function setAttr(tag, name, value) {
  const pattern = new RegExp(`\\s${name}\\s*=\\s*(?:"[^"]*"|'[^']*'|[^\\s>]+)`, 'i');
  return pattern.test(tag) ? tag.replace(pattern, ` ${name}="${escape(value)}"`) : tag.replace(/\s*\/?\s*>$/, (end) => ` ${name}="${escape(value)}"${end}`);
}
function sources(value) {
  return value.split(',').map((item) => item.trim().split(/\s+/)[0]).filter(Boolean);
}
function bestImage(paths, imageInfo) {
  return paths.filter((src) => imageInfo[src]).sort((a, b) => imageInfo[b].width - imageInfo[a].width)[0];
}
function optimizeHtml(html, index, imageInfo) {
  let firstPhoto = null;
  let activePicture = null;
  function responsive(src, sizes) {
    const info = imageInfo[src];
    if (!info?.variants.length) return null;
    return { src: mediaUrl(src, 1200, index), srcset: info.variants.map((w) => `${mediaUrl(src, w, index)} ${Math.min(w, info.width)}w`).join(', '), sizes };
  }
  function image(original) {
    let tag = original;
    const src = attr(tag, 'src');
    if (!src || /^(?:data:|blob:)/i.test(src)) return tag;
    const best = activePicture?.src || bestImage([src, ...sources(attr(tag, 'srcset'))], imageInfo);
    const sizes = activePicture?.sizes || attr(tag, 'sizes') || '(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 40vw';
    const optimized = best && responsive(best, sizes);
    if (optimized) {
      tag = setAttr(setAttr(setAttr(tag, 'src', optimized.src), 'srcset', optimized.srcset), 'sizes', sizes);
      tag = setAttr(tag, 'data-full-src', attr(tag, 'data-full-src') || best);
    }
    if (best) {
      if (!attr(tag, 'width')) tag = setAttr(tag, 'width', imageInfo[best].width);
      if (!attr(tag, 'height')) tag = setAttr(tag, 'height', imageInfo[best].height);
    }
    const raster = /\.(?:avif|webp|png|jpe?g)(?:\?|$)/i.test(src);
    const chrome = /(?:logo|favicon|icon|whatsapp|qr[-_/])/i.test(src);
    if (raster && !chrome && !firstPhoto) {
      tag = setAttr(setAttr(tag, 'loading', 'eager'), 'fetchpriority', 'high');
      firstPhoto = { src: attr(tag, 'src'), srcset: attr(tag, 'srcset'), sizes: attr(tag, 'sizes'), artDirected: activePicture?.artDirected, ...activePicture?.preload };
    } else if (raster && !chrome) {
      // Keep explicitly eager secondary above-the-fold product photos eager.
      tag = setAttr(tag, 'loading', attr(tag, 'loading') === 'eager' ? 'eager' : 'lazy');
      tag = setAttr(tag, 'fetchpriority', 'low');
    } else if (/logo/i.test(src)) tag = setAttr(tag, 'loading', 'eager');
    return setAttr(tag, 'decoding', 'async');
  }
  // Process pictures as a unit to preserve mobile crops and match preload URLs.
  let result = html.replace(/<picture\b[^>]*>[\s\S]*?<\/picture>|<img\b[^>]*>/gi, (block) => {
    if (!/^<picture/i.test(block)) return image(block);
    const sourceTags = [...block.matchAll(/<source\b[^>]*>/gi)].map((match) => match[0]);
    // Existing AVIF/WebP source sets are already compact. Keep the browser's
    // format negotiation and mobile art direction exactly as authored.
    const defaults = sourceTags.filter((tag) => !attr(tag, 'media'));
    const fallback = defaults.find((tag) => attr(tag, 'type') === 'image/webp') || defaults.at(-1);
    const preferred = defaults.find((tag) => attr(tag, 'type') === 'image/avif') || defaults[0];
    const img = block.match(/<img\b[^>]*>/i)?.[0] || '';
    const fallbackSrc = bestImage([...sources(attr(fallback || '', 'srcset')), attr(img, 'src')], imageInfo);
    const preloadSet = attr(preferred || '', 'srcset');
    activePicture = {
      src: fallbackSrc,
      sizes: attr(fallback || '', 'sizes') || attr(img, 'sizes') || '100vw',
      artDirected: sourceTags.some((tag) => Boolean(attr(tag, 'media'))),
      preload: preloadSet ? { src: sources(preloadSet).at(-1), srcset: preloadSet, sizes: attr(preferred, 'sizes') || '100vw', type: attr(preferred, 'type') } : {},
    };
    const clean = block.replace(/<img\b[^>]*>/i, image);
    activePicture = null;
    return clean;
  });
  result = result.replace(/<link\b[^>]*>/gi, (tag) => attr(tag, 'rel') === 'preload' && attr(tag, 'as') === 'image' ? '' : tag);
  if (firstPhoto && !firstPhoto.artDirected) {
    let link = `<link rel="preload" as="image" href="${escape(firstPhoto.src)}" fetchpriority="high"`;
    if (firstPhoto.type) link += ` type="${escape(firstPhoto.type)}"`;
    if (firstPhoto.srcset) link += ` imagesrcset="${escape(firstPhoto.srcset)}" imagesizes="${escape(firstPhoto.sizes || '100vw')}"`;
    result = result.replace(/<\/head>/i, `${link}>\n</head>`);
  }
  return { html: result, firstPhoto };
}
module.exports = { optimizeHtml, attr, setAttr };
