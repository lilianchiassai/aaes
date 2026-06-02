import { useEffect } from "react";

/**
 * Scroll-driven parallax for the hero art + the floating tape banner,
 * ported from site.js. Strips translate on X relative to the banner's
 * distance from viewport centre; the hero art drifts down and gains
 * colour as you scroll through the hero. Queried from the DOM so it
 * stays decoupled from the JSX tree.
 */
export function useScrollParallax() {
  useEffect(() => {
    const heroArt = document.querySelector<HTMLElement>("[data-parallax-hero]");
    const pbanner = document.querySelector<HTMLElement>("[data-parallax-banner]");
    const layers = Array.from(
      document.querySelectorAll<HTMLElement>("[data-factor]"),
    ).map((el) => ({ el, factor: parseFloat(el.dataset.factor || "0.08") }));

    if (!heroArt && !pbanner) return;

    // Cache the banner's static layout (document offset + height) and the
    // viewport height so the scroll loop never reads geometry — reading
    // `getBoundingClientRect()` every frame forces a synchronous reflow.
    // These only change on resize, so we re-measure there inside a rAF.
    let vh = window.innerHeight;
    let bannerCenter = 0; // banner centre as a document offset (px from top)
    const measure = () => {
      vh = window.innerHeight;
      if (pbanner) {
        const r = pbanner.getBoundingClientRect();
        const top = r.top + (window.scrollY || window.pageYOffset);
        bannerCenter = top + r.height / 2;
      }
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        if (pbanner && layers.length) {
          // Banner centre relative to viewport centre, derived from cached
          // offsets — no layout read. (bannerCenter - y) === r.top + r.height/2.
          const progress = vh / 2 - (bannerCenter - y);
          for (const l of layers) {
            l.el.style.transform = `translateX(${progress * l.factor}px)`;
          }
        }
        if (heroArt) {
          // The class `-translate-y-1/2` already centres the art via the CSS
          // `translate` property (Tailwind v4). Only contribute scroll drift
          // here through `transform`, which composes with `translate` — adding
          // `-50%` again would stack and push the art up by its full height.
          heroArt.style.transform = `translateY(${y * 0.5}px)`;
          const prog = Math.min(1, Math.max(0, y / (vh * 0.4)));
          heroArt.style.filter =
            `grayscale(${(1 - prog).toFixed(3)}) contrast(${(1.25 - prog * 0.15).toFixed(3)}) ` +
            `brightness(${(0.9 + prog * 0.12).toFixed(3)}) saturate(${(1 + prog * 0.25).toFixed(3)})`;
        }
        ticking = false;
      });
    };

    const onResize = () => {
      measure();
      onScroll();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    // Defer the first measure+paint to the next frame so the geometry read
    // happens after the browser's post-commit layout, not synchronously
    // inside the effect (which would force a reflow on the load path).
    const raf = requestAnimationFrame(onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);
}
