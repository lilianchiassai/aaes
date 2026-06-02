import { Kicker } from "../ui/Kicker";
import { ANECDOTES, SHORT_QUOTES } from "../../data/testimonials";

/* The long survival stories as a balanced card masonry, with the short
   one-liners gathered into a strip beneath them. */

export function Testimonials() {
  return (
    <>
      <div className="columns-1 md:columns-2 min-[1400px]:columns-3 gap-6 [column-fill:balance]">
        {ANECDOTES.map((a, i) => (
          <figure
            key={i}
            className="break-inside-avoid mb-6 bg-[#0e0e0e] border-2 border-black shadow-[5px_5px_0_rgba(0,0,0,0.45)] p-6"
          >
            <span className="block font-display text-blood text-5xl leading-[0.5] mb-3 select-none">
              “
            </span>
            <blockquote className="font-body text-[15px] leading-[1.62] text-grey-100">
              {a.quote}
            </blockquote>
            <figcaption className="mt-4">
              <Kicker tone="hazard" size="sm" tracking="wide">
                — {a.author}
              </Kicker>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Short one-liners. */}
      <div className="mt-12 grid grid-cols-3 max-[880px]:grid-cols-2 max-[560px]:grid-cols-1 gap-x-8 gap-y-6">
        {SHORT_QUOTES.map((q, i) => (
          <figure key={i} className="border-l-2 border-blood pl-4">
            <blockquote className="font-cond uppercase text-[15px] leading-[1.32] tracking-[0.02em] text-grey-100">
              {q.quote}
            </blockquote>
            <figcaption className="mt-1.5 font-cond uppercase tracking-[0.18em] text-[11px] text-hazard/80">
              — {q.author}
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );
}
