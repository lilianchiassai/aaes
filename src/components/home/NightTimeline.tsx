import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { STAGES, type TimelineStage } from "../../data/timeline";

/* Human + zombie silhouettes (paths ported from index.html). */
function HumanFig() {
  return (
    <svg className="fig fig--human" viewBox="0 0 50 116">
      <circle cx="25" cy="13" r="11.5" />
      <path d="M25 26 C16 26 12 30 11 39 L7 69 C6.4 73 12 74 13 70 L17 43 L19 43 L18 73 C16 81 14 103 14 108 C14 113 22 113 22.6 108 L24.4 80 L25.6 80 L27.4 108 C28 113 36 113 36 108 C36 103 34 81 32 73 L31 43 L33 43 L37 70 C38 74 43.6 73 43 69 L39 39 C38 30 34 26 25 26 Z" />
    </svg>
  );
}
function ZombieFig() {
  return (
    <svg className="fig fig--zombie" viewBox="0 0 96 120">
      <path d="M30 80 L16 116 L26 116 L41 86 Z" />
      <path d="M40 84 L50 116 L60 116 L51 88 Z" />
      <path d="M27 34 C19 46 22 64 36 82 C43 90 52 88 49 79 C42 64 41 50 46 40 C50 31 31 27 27 34 Z" />
      <ellipse cx="35" cy="20" rx="11.5" ry="12" transform="rotate(14 35 20)" />
      <path d="M42 40 L90 50 L90 58 L44 53 Z" />
      <path d="M43 50 L88 64 L87 72 L45 61 Z" />
    </svg>
  );
}

/* Deterministic PRNG (mulberry32-ish), ported from index.html so the splatter
   is identical on every render — no Math.random(). */
function rng(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CLUSTERS: Record<string, number> = { "01": 0, "02": 1, "03": 2, "04": 3, "05": 8 };
const XMIN: Record<string, number> = { "02": 52, "04": 40 };

interface Dot {
  x: number;
  y: number;
  d: number;
  sq: number;
  rot: number;
}

function splatterDots(n: string): Dot[] {
  const clusters = CLUSTERS[n] || 0;
  if (!clusters) return [];
  const r = rng(parseInt(n, 10) * 97 + 13);
  const xMin = XMIN[n] || 7;
  const xSpan = 93 - xMin;
  const dots: Dot[] = [];
  const dot = (x: number, y: number, d: number) => {
    const sq = 0.72 + r() * 0.55;
    const rot = Math.floor(r() * 360);
    dots.push({ x, y, d, sq, rot });
  };
  for (let c = 0; c < clusters; c++) {
    const cx = xMin + r() * xSpan;
    const cy = 14 + r() * 72;
    const core = 4.5 + r() * 6.5;
    const spread = 13 + r() * 15;
    const sat = 11 + Math.floor(r() * 16);
    dot(cx, cy, core);
    for (let s = 0; s < sat; s++) {
      const ang = r() * Math.PI * 2;
      const dist = Math.pow(r(), 0.6) * spread;
      const dx = cx + Math.cos(ang) * dist;
      const dy = cy + Math.sin(ang) * dist * 0.62;
      const sz = 1 + r() * r() * 5;
      dot(dx, dy, sz);
    }
  }
  return dots;
}

function Splatter({ n }: { n: string }) {
  const dots = useMemo(() => splatterDots(n), [n]);
  if (!dots.length) return null;
  return (
    <div className="tl4__splat">
      {dots.map((dt, i) => (
        <i
          key={i}
          style={{
            left: `${dt.x.toFixed(1)}%`,
            top: `${dt.y.toFixed(1)}%`,
            width: `${dt.d.toFixed(1)}px`,
            height: `${(dt.d * dt.sq).toFixed(1)}px`,
            background: "rgba(0,0,0,.32)",
            transform: `translate(-50%,-50%) rotate(${dt.rot}deg)`,
          }}
        />
      ))}
    </div>
  );
}

function StageCard({ s }: { s: TimelineStage }) {
  const onDark = s.zombie / (s.human + s.zombie) >= 0.5;
  return (
    <div className="tl4__card" style={{ "--dot": s.color } as React.CSSProperties}>
      <div className="tl4__tab" style={{ background: s.color, color: onDark ? "#fff" : "#000" }}>
        <Splatter n={s.n} />
        <span className="tl4__num">{s.n}</span>
        <span className="tl4__ttl">{s.title}</span>
      </div>
      <div className="tl4__body">
        <div className="crowd">
          {s.human > 0 && (
            <div className="crowd__g">
              {Array.from({ length: s.human }, (_, i) => (
                <HumanFig key={i} />
              ))}
            </div>
          )}
          {s.zombie > 0 && (
            <div className="crowd__g">
              {Array.from({ length: s.zombie }, (_, i) => (
                <ZombieFig key={i} />
              ))}
            </div>
          )}
        </div>
        <ul className="tl4__list">
          {s.bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function NightTimeline() {
  const rowsRef = useRef<HTMLDivElement>(null);
  const spineRef = useRef<HTMLDivElement>(null);

  // Fit the gradient spine to the last (overlapping) card, like fitSpine().
  useLayoutEffect(() => {
    const fit = () => {
      const rows = rowsRef.current;
      const spine = spineRef.current;
      if (!rows || !spine) return;
      const cards = rows.querySelectorAll<HTMLElement>(".tl4__card");
      const last = cards[cards.length - 1];
      if (!last) return;
      const y = rows.offsetTop + last.offsetTop + 24;
      spine.style.bottom = "auto";
      spine.style.height = `${y + 64}px`;
    };
    fit();
    window.addEventListener("resize", fit);
    if (document.fonts?.ready) document.fonts.ready.then(fit).catch(() => {});
    return () => window.removeEventListener("resize", fit);
  }, []);

  // Re-fit once more after first paint (fonts/layout settle).
  useEffect(() => {
    const id = setTimeout(() => window.dispatchEvent(new Event("resize")), 60);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className="tl4">
      <div className="tl4__spine" ref={spineRef} />
      <div className="tl4__rows" ref={rowsRef}>
        {STAGES.map((s) => (
          <StageCard key={s.n} s={s} />
        ))}
      </div>
    </div>
  );
}
