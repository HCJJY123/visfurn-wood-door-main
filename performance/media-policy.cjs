// Keep this module browser-safe: the build and Next image loader share the URLs.
const WIDTHS = [480, 768, 1200, 1600, 1920];
function mediaKey(src) {
  let hash = 2166136261;
  for (let i = 0; i < src.length; i++) hash = Math.imul(hash ^ src.charCodeAt(i), 16777619);
  return (hash >>> 0).toString(16).padStart(8, '0');
}
function localPath(src = '') {
  if (typeof src !== 'string' || !src.startsWith('/') || src.startsWith('//')) return null;
  try { return decodeURI(src.split(/[?#]/, 1)[0]); } catch { return null; }
}
function mediaUrl(src, width, index) {
  const pathname = localPath(src);
  if (!pathname || !/\.(?:avif|webp|png|jpe?g)$/i.test(pathname)) return src;
  const key = mediaKey(pathname);
  const info = index.images[key];
  if (!info) return src;
  const bucket = WIDTHS.find((value) => value >= width) || WIDTHS.at(-1);
  return `/_media/v1/${key}-${info[0]}-${Math.min(bucket, info[1])}.webp`;
}
module.exports = { WIDTHS, mediaKey, localPath, mediaUrl };
