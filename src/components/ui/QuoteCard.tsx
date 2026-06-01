import { tv } from "tailwind-variants";
import type { ReactNode } from "react";

/* Participant quote. `card` = standalone bordered card (EventDetail);
   `inline` = compact left-bar blockquote inside another card (EventCard2).
   Replaces `.qcard` / `.pcard2__quote`. */
const quote = tv({
  slots: {
    root: "border-l-[3px] border-l-hazard",
    text: "font-body italic text-white m-0",
    cite: "not-italic font-cond uppercase tracking-[0.12em]",
  },
  variants: {
    variant: {
      card: {
        root: "bg-[#0d0d0d] border border-hairline px-6 py-[22px]",
        text: "text-lg leading-[1.5] mb-3",
        cite: "text-xs text-hazard",
      },
      inline: {
        root: "pl-3",
        text: "text-sm leading-[1.45]",
        cite: "block text-xs text-fg2 mt-[5px]",
      },
    },
  },
  defaultVariants: { variant: "card" },
});

export function QuoteCard({
  text,
  author,
  variant,
}: {
  text: ReactNode;
  author: ReactNode;
  variant?: "card" | "inline";
}) {
  const s = quote({ variant });
  return (
    <div className={s.root()}>
      <p className={s.text()}>“{text}”</p>
      <cite className={s.cite()}>— {author}</cite>
    </div>
  );
}
