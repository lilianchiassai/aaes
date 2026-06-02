import { ANECDOTES, SHORT_QUOTES, type Testimonial } from "../../data/testimonials";

/* A participant quote shown directly on the concrete in the timeline's empty
   column space — no card, no background. Just a layered guillemet mark, the
   quote, and the author.

   Two treatments, chosen by length (SHORT_QUOTES are short, ANECDOTES long):
   • short — oversized white italic with the mark to its left (cinematic)
   • long  — smaller readable italic with the mark stacked above
*/

const LONG_THRESHOLD = 120;

/* Layered double-guillemet: cyan in front, blood offset down-left. */
function ChevronMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={
        "font-impact leading-[0.6] text-cyan select-none [text-shadow:-6px_7px_0_var(--color-blood)] " +
        (className ?? "")
      }
    >
      «
    </span>
  );
}

function Author({ name }: { name: string }) {
  return (
    <figcaption className="mt-3 font-impact uppercase text-2xl leading-none text-hazard">
      {name}
    </figcaption>
  );
}

export function TimelineQuote({ q, className }: { q: Testimonial; className?: string }) {
  const long = q.quote.length > LONG_THRESHOLD;

  if (long) {
    return (
      <figure className={className}>
        <ChevronMark className="block text-[clamp(38px,3.6vw,54px)] mb-1" />
        <blockquote className="font-body italic text-white text-xl leading-[1.46] max-w-[60ch]">
          {q.quote}
        </blockquote>
        <Author name={q.author} />
      </figure>
    );
  }

  return (
    <figure className={"flex items-center gap-5 md:gap-7 " + (className ?? "")}>
      <ChevronMark className="shrink-0 text-[clamp(54px,6vw,92px)]" />
      <div>
        <blockquote className="font-body italic text-white text-[clamp(26px,3vw,42px)] leading-[1.07]">
          {q.quote}
        </blockquote>
        <Author name={q.author} />
      </div>
    </figure>
  );
}

/** Pick one random quote from both pools (short one-liners + long anecdotes). */
export function pickTimelineQuote(): Testimonial {
  const pool = [...SHORT_QUOTES, ...ANECDOTES];
  return pool[Math.floor(Math.random() * pool.length)];
}
