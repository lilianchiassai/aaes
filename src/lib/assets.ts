/**
 * Base-aware URL helpers for assets that live in `public/`.
 *
 * The site is served from `/aaes/` on GitHub Pages, so every runtime-resolved
 * public asset must be prefixed with `import.meta.env.BASE_URL` (which is
 * `/aaes/` in prod, `/` in dev). Assets imported through the bundler
 * (fonts, CSS backgrounds in src/assets) are handled by Vite and don't use this.
 */
const BASE = import.meta.env.BASE_URL;

/**
 * Past-event photos are NOT shipped in the deploy. They live in the repo's
 * top-level `photos/` dir and are served at runtime by the jsDelivr CDN, which
 * mirrors the GitHub repo. This keeps the deployed `dist/` artifact small while
 * still loading photos lazily (FilmImg sets loading="lazy"). Note: jsDelivr
 * resolves `@main` against the latest commit, so new/changed photos must be
 * pushed (and may take a few minutes to propagate) before they appear.
 * e.g. photoUrl("2019-1") → https://cdn.jsdelivr.net/gh/lilianchiassai/aaes@main/photos/2019-1.jpg
 */
const PHOTO_CDN = "https://cdn.jsdelivr.net/gh/lilianchiassai/aaes@main/photos";
export function photoUrl(name: string): string {
  return `${PHOTO_CDN}/${name}.jpg`;
}

/** Full URL for a static asset in public/assets, e.g. assetUrl("logo-aaes.webp") */
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
