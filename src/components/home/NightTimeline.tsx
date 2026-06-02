import { useLayoutEffect, useMemo, useRef } from "react";
import { STAGES, type TimelineStage } from "../../data/timeline";
import { TimelineQuote, pickTimelineQuote } from "./TimelineQuote";
import splat02 from "../../assets/img/splatters/splat-02.svg";
import splat03 from "../../assets/img/splatters/splat-03.svg";
import splat04 from "../../assets/img/splatters/splat-04.svg";
import splat05 from "../../assets/img/splatters/splat-05.svg";

/* Human + zombie silhouettes (paths ported from index.html). */
function HumanFig() {
  return (
    <svg className="block h-[26px] w-auto fill-hazard [filter:drop-shadow(1.5px_2px_0_rgba(0,0,0,.55))]" viewBox="0 0 50 116">
      <circle cx="25" cy="13" r="11.5" />
      <path d="M25 26 C16 26 12 30 11 39 L7 69 C6.4 73 12 74 13 70 L17 43 L19 43 L18 73 C16 81 14 103 14 108 C14 113 22 113 22.6 108 L24.4 80 L25.6 80 L27.4 108 C28 113 36 113 36 108 C36 103 34 81 32 73 L31 43 L33 43 L37 70 C38 74 43.6 73 43 69 L39 39 C38 30 34 26 25 26 Z" />
    </svg>
  );
}
function ZombieFig() {
  return (
    <svg className="block h-[26px] w-auto fill-cyan [filter:drop-shadow(1.5px_2px_0_rgba(0,0,0,.55))]" viewBox="0 0 96 120">
      <path d="M30 80 L16 116 L26 116 L41 86 Z" />
      <path d="M40 84 L50 116 L60 116 L51 88 Z" />
      <path d="M27 34 C19 46 22 64 36 82 C43 90 52 88 49 79 C42 64 41 50 46 40 C50 31 31 27 27 34 Z" />
      <ellipse cx="35" cy="20" rx="11.5" ry="12" transform="rotate(14 35 20)" />
      <path d="M42 40 L90 50 L90 58 L44 53 Z" />
      <path d="M43 50 L88 64 L87 72 L45 61 Z" />
    </svg>
  );
}

/* Pre-rendered blood splatter per stage (generated once from the original
   PRNG-driven dot field, then frozen as SVG). Stage 01 has none. */
const SPLATTERS: Record<string, string> = {
  "02": splat02,
  "03": splat03,
  "04": splat04,
  "05": splat05,
};

function Splatter({ n }: { n: string }) {
  const src = SPLATTERS[n];
  if (!src) return null;
  return (
    <img
      className="absolute inset-0 z-0 pointer-events-none block w-full h-full"
      src={src}
      alt=""
      aria-hidden="true"
    />
  );
}

/* Alternating column card with a connector stub (::after) and dot (::before)
   reaching the central spine; the dot colour comes from the --dot custom
   prop. Desktop (zmd:, ≥760px) lays the cards in two alternating columns;
   mobile (max-zmd:, <760px) stacks them to the right of a left-aligned spine.
   The two breakpoints are split across non-overlapping min/max media queries
   so neither cascade order nor specificity can let one leak into the other. */
const CARD =
  "relative border-2 border-black bg-[rgba(8,8,8,.85)] shadow-[5px_5px_0_#000] " +
  "after:content-[''] after:absolute after:top-6 after:h-[3px] after:bg-black after:z-[1] " +
  "before:content-[''] before:absolute before:top-[25.5px] before:w-3.5 before:h-3.5 before:rounded-full " +
  "before:border-2 before:border-black before:bg-[var(--dot,#888)] before:shadow-[0_0_0_3px_#0b0b0b] before:-translate-y-1/2 before:z-[2] " +
  // desktop ≥760: two alternating columns
  "zmd:w-[calc(50%-42px)] zmd:[&:nth-child(odd)]:self-start zmd:[&:nth-child(even)]:self-end zmd:[&:not(:first-child)]:mt-[-58px] " +
  "zmd:after:w-[42px] zmd:[&:nth-child(odd)]:after:right-[-42px] zmd:[&:nth-child(even)]:after:left-[-42px] " +
  "zmd:[&:nth-child(odd)]:before:right-[-51px] zmd:[&:nth-child(even)]:before:left-[-51px] " +
  // mobile <760: single column right of the left-aligned spine
  "max-zmd:w-auto max-zmd:self-stretch max-zmd:ml-12 max-zmd:[&:not(:first-child)]:mt-4 " +
  "max-zmd:after:w-8 max-zmd:after:left-[-32px] max-zmd:before:left-[-39px]";

function StageCard({ s }: { s: TimelineStage }) {
  const onDark = s.zombie / (s.human + s.zombie) >= 0.5;
  return (
    <div data-tl-card className={CARD} style={{ "--dot": s.color } as React.CSSProperties}>
      <div
        className="relative overflow-hidden flex items-center gap-[11px] px-[14px] py-2 border-b-2 border-black"
        style={{ background: s.color, color: onDark ? "#fff" : "#000" }}
      >
        <Splatter n={s.n} />
        <span className="relative z-[1] font-display text-[27px] leading-[.78]">{s.n}</span>
        <span className="relative z-[1] font-impact text-[23px] uppercase tracking-[0.01em] leading-none">
          {s.title}
        </span>
      </div>
      <div className="pt-[13px] px-4 pb-[15px]">
        <div className="flex flex-wrap items-end gap-[2px] mb-[11px] min-h-0">
          {s.human > 0 && (
            <div className="flex flex-wrap items-end gap-1">
              {Array.from({ length: s.human }, (_, i) => (
                <HumanFig key={i} />
              ))}
            </div>
          )}
          {s.zombie > 0 && (
            <div className="flex flex-wrap items-end gap-1">
              {Array.from({ length: s.zombie }, (_, i) => (
                <ZombieFig key={i} />
              ))}
            </div>
          )}
        </div>
        <ul className="list-none m-0 p-0 flex flex-col gap-[6px]">
          {s.bullets.map((b, i) => (
            <li
              key={i}
              className="font-body font-light text-2xl text-grey-100 leading-[1.4] pl-[18px] relative before:content-[''] before:absolute before:left-0 before:top-[10px] before:w-[7px] before:h-[7px] before:bg-[var(--dot,var(--color-hazard))] before:rotate-45"
            >
              {b}
            </li>
          ))}
        </ul>
        {s.closer && (
          <p className="mt-4 text-center font-display uppercase text-[clamp(22px,2.2vw,30px)] leading-none text-hazard">
            {s.closer}
          </p>
        )}
      </div>
    </div>
  );
}

export function NightTimeline() {
  const rowsRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);
  const quote = useMemo(() => pickTimelineQuote(), []);

  // Fit the gradient spine to the last (overlapping) card's connector, like
  // fitSpine(). Re-fits on resize, on font load, and — crucially — whenever the
  // cards' own size changes (e.g. text wraps differently), via a ResizeObserver.
  useLayoutEffect(() => {
    const fit = () => {
      const rows = rowsRef.current;
      const spine = spineRef.current;
      if (!rows || !spine) return;
      const cards = rows.querySelectorAll<HTMLElement>("[data-tl-card]");
      const last = cards[cards.length - 1];
      if (!last) return;
      const y = rows.offsetTop + last.offsetTop + 24;
      spine.style.bottom = "auto";
      spine.style.height = `${y + 64}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    if (document.fonts?.ready) document.fonts.ready.then(fit).catch(() => {});

    const ro = new ResizeObserver(fit);
    if (rowsRef.current) ro.observe(rowsRef.current);

    return () => {
      window.removeEventListener("resize", fit);
      ro.disconnect();
    };
  }, []);

  return (
    <div className="relative max-w-[1060px] mx-auto mt-[6px] py-[4px]">
      <div
        ref={spineRef}
        className="absolute zmd:left-1/2 max-zmd:left-[22px] top-[6px] bottom-[6px] w-3 -translate-x-1/2 border-2 border-black shadow-hard z-0 bg-[linear-gradient(180deg,#f5e000_2%,#c6cf33_27%,#3fc6a6_50%,#0e7790_74%,#1fa6cf_98%)]"
      />
      <div ref={rowsRef} className="relative z-[2] flex flex-col items-stretch">
        {STAGES.map((s) => (
          <StageCard key={s.n} s={s} />
        ))}
        <TimelineQuote
          q={quote}
          className="zmd:self-end zmd:w-fit zmd:max-w-[45%] zmd:mt-[-150px] zmd:mb-8 zmd:mr-[-24px] zmd:pt-[60px] max-zmd:mt-12 max-zmd:ml-12"
        />
      </div>
    </div>
  );
}
