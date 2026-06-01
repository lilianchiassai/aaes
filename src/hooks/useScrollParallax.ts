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

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY || window.pageYOffset;
        const vh = window.innerHeight;
        if (pbanner && layers.length) {
          const r = pbanner.getBoundingClientRect();
          const progress = vh / 2 - (r.top + r.height / 2);
          for (const l of layers) {
            l.el.style.transform = `translateX(${progress * l.factor}px)`;
          }
        }
        if (heroArt) {
          heroArt.style.transform = `translateY(calc(-50% + ${y * 0.5}px))`;
          const prog = Math.min(1, Math.max(0, y / (vh * 0.4)));
          heroArt.style.filter =
            `grayscale(${(1 - prog).toFixed(3)}) contrast(${(1.25 - prog * 0.15).toFixed(3)}) ` +
            `brightness(${(0.9 + prog * 0.12).toFixed(3)}) saturate(${(1 + prog * 0.25).toFixed(3)})`;
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
}
