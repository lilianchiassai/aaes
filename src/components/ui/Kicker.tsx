import { tv, type VariantProps } from "tailwind-variants";
import type { ReactNode } from "react";

/* Small condensed all-caps label (card kickers, dates, "more" links).
   `tone` and `size` are the style axes; tracking / layout (block, margins,
   mt-auto) stay as call-site className. */
const kicker = tv({
  base: "font-cond font-semibold uppercase tracking-[0.16em]",
  variants: {
    tone: {
      hazard: "text-hazard",
      cyan: "text-cyan",
      white: "text-white",
      muted: "text-fg2",
    },
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: { tone: "hazard", size: "xs" },
});

export function Kicker({
  tone,
  size,
  className,
  children,
}: VariantProps<typeof kicker> & { className?: string; children: ReactNode }) {
  return <span className={kicker({ tone, size, className })}>{children}</span>;
}
