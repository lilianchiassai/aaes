import { Fragment } from "react";

/* The floating caution-tape banner that straddles the hero→concrete seam.
   Strips translate on X with scroll (useScrollParallax reads data-factor). */

const HAZARD_ITEMS = ["Parc du Biez", "Mondeville", "12 Septembre 2026", "20H00", "15 €"];
const TAG_ITEMS = [
  "Tout est sous contrôle",
  "Jeu de rôle grandeur nature",
  "+3 heures",
  "100 participants",
];

/* Shared tape geometry: each <span> is a bordered cell, last cell drops its
   divider. Variants supply the colour, font-size and drop shadow. */
const TAPE_BASE =
  "inline-flex items-center font-impact uppercase border-y-[3px] whitespace-nowrap " +
  "[&_span]:flex [&_span]:items-center [&_span]:px-[26px] [&_span]:py-[9px] [&_span]:leading-none " +
  "[&_span]:border-r-[3px] [&_span]:border-black [&_span:last-child]:border-r-0";

function HazardTape() {
  return (
    <span
      className={
        TAPE_BASE +
        " border-black bg-hazard text-black text-[clamp(28px,4vw,54px)] shadow-[0_10px_0_rgba(0,0,0,.5)]"
      }
    >
      {HAZARD_ITEMS.map((t, i) => (
        <span key={i}>{t}</span>
      ))}
    </span>
  );
}

function TagTape() {
  return (
    <span
      className={
        TAPE_BASE +
        " border-hazard bg-[#0f0f0f] text-hazard text-[clamp(18px,2.3vw,30px)] shadow-[0_8px_0_rgba(0,0,0,.45)]"
      }
    >
      {TAG_ITEMS.map((t, i) => (
        <Fragment key={i}>
          <span>{t}</span>
          {i < TAG_ITEMS.length - 1 && (
            <span className="w-[10px] h-[10px] rounded-full bg-current opacity-80 mx-[6px]" />
          )}
        </Fragment>
      ))}
    </span>
  );
}

/* A diagonal hazard stripe (the darker back layers). */
function Stripe() {
  return (
    <div className="h-[30px] min-w-[200vw] border-y-[3px] border-black bg-[repeating-linear-gradient(-45deg,var(--color-hazard-dim)_0_18px,#000_18px_36px)]" />
  );
}

const STRIP = "relative w-full overflow-hidden my-[11px]";
const PARALLAX = "inline-flex will-change-transform ml-[-16vw]";
const TRACK = "flex w-max";

export function ParallaxBanner() {
  return (
    <div className="relative z-[2]">
      <div className="h-5 bg-black relative z-[1]" />
      <div className="h-40 relative z-[1] bg-[linear-gradient(180deg,#000_0%,transparent_100%)]" />

      <div
        className="absolute left-0 right-0 z-[5] top-[45px] -translate-y-1/2 py-2 overflow-hidden"
        data-parallax-banner
        aria-hidden="true"
      >
        {/* back plain stripe (darker) */}
        <div className={`${STRIP} z-[1] rotate-[2deg] opacity-[.85]`}>
          <div className={PARALLAX} data-factor="0.06">
            <div className={TRACK}>
              <Stripe />
            </div>
          </div>
        </div>

        {/* solid yellow info tape (logistics) */}
        <div className={`${STRIP} z-[3] rotate-[-2.2deg]`}>
          <div className={PARALLAX} data-factor="0.16">
            <div className={TRACK}>
              <HazardTape />
              <HazardTape />
              <HazardTape />
            </div>
          </div>
        </div>

        {/* black tape with yellow borders (the pitch) */}
        <div className={`${STRIP} z-[2] rotate-[-1deg]`}>
          <div className={PARALLAX} data-factor="-0.13">
            <div className={TRACK}>
              <TagTape />
              <TagTape />
              <TagTape />
            </div>
          </div>
        </div>

        {/* back plain stripe (darker) */}
        <div className={`${STRIP} z-[1] rotate-[-1.6deg] opacity-[.85]`}>
          <div className={PARALLAX} data-factor="-0.08">
            <div className={TRACK}>
              <Stripe />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
