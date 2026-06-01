/**
 * Base-aware URL helpers for assets that live in `public/`.
 *
 * The site is served from `/aaes/` on GitHub Pages, so every runtime-resolved
 * public asset must be prefixed with `import.meta.env.BASE_URL` (which is
 * `/aaes/` in prod, `/` in dev). Assets imported through the bundler
 * (fonts, CSS backgrounds in src/assets) are handled by Vite and don't use this.
 */
const BASE = import.meta.env.BASE_URL;

/** Full URL for a past-event photo, e.g. photoUrl("2019-1") → /aaes/photos/2019-1.jpg */
export function photoUrl(name: string): string {
  return `${BASE}photos/${name}.jpg`;
}

/** Full URL for a static asset in public/assets, e.g. assetUrl("logo-aaes.png") */
export function assetUrl(file: string): string {
  return `${BASE}assets/${file}`;
}

/** YouTube thumbnail for a video id (used by the trailer card facade). */
export function youtubeThumb(id: string): string {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

/** YouTube embed URL (autoplay) for the trailer player swap. */
export function youtubeEmbed(id: string): string {
  return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
}
