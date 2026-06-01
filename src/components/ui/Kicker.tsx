import { tv, type VariantProps } from "tailwind-variants";
import type { ReactNode } from "react";

/* Small condensed all-caps label (card kickers, dates, "more" links).
   `tone`, `size` and `tracking` are the style axes; pure layout (block,
   margins, mt-auto) stays as call-site className. */
const kicker = tv({
  base: "font-cond font-semibold uppercase",
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
    tracking: {
      tight: "tracking-[0.08em]",
      normal: "tracking-[0.16em]",
      wide: "tracking-[0.18em]",
      wider: "tracking-[0.24em]",
    },
  },
  defaultVariants: { tone: "hazard", size: "xs", tracking: "normal" },
});

export function Kicker({
  tone,
  size,
  tracking,
  className,
  children,
}: VariantProps<typeof kicker> & { className?: string; children: ReactNode }) {
  return <span className={kicker({ tone, size, tracking, className })}>{children}</span>;
}
