import { useEffect, useState } from "react";
import { assetUrl } from "../../lib/assets";

/* Distance (px) over which the hands resaturate as the user scrolls. */
const SCROLL_RANGE = 120;

/* A smooth zombie-hand cluster anchored to the bottom-right of a dark header.
   Two variants (both face right; the "left" source is mirrored): pick per page.
   The hands start desaturated (grey/yellow) and regain full colour as the user
   scrolls down the page. */
export function HeaderHands({ variant = "right" }: { variant?: "left" | "right" }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const next = Math.min(window.scrollY / SCROLL_RANGE, 1);
      setProgress(next);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <img
      src={assetUrl(`hands-${variant}-y.svg`)}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
      style={{
        filter: `saturate(${0.55 + progress * 0.45}) brightness(${0.4 + progress * 0.6})`,
        transform: `scale(${1 + progress * 0.06})`,
        transformOrigin: "bottom right",
        transition: "filter 120ms linear, transform 120ms linear",
      }}
      className="absolute right-0 bottom-0 h-[clamp(140px,20vw,220px)] w-auto pointer-events-none select-none"
    />
  );
}
