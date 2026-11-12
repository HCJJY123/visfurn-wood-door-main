'use client';
import policy from './media-policy.cjs';
import index from './generated-image-index.json';

// Static CDN files: no image function, cold start, or per-request transformation.
export default function staticMediaLoader({ src, width }) {
  return policy.mediaUrl(src, width, index);
}
