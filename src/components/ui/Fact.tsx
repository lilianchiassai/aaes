import { tv } from "tailwind-variants";
import type { ReactNode } from "react";

/* Facts strip — grid of key/value cells with hairline separators.
   <FactsStrip><Fact k="Date" v="Sam. 12 sept." /></FactsStrip> */
export function FactsStrip({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={
        "grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-px bg-hairline border border-hairline " +
        className
      }
    >
      {children}
    </div>
  );
}

const factValue = tv({
  base: "font-impact text-[26px] uppercase mt-1",
  variants: {
    tone: { default: "text-white", hazard: "text-hazard" },
    size: { default: "", sm: "text-[18px]" },
  },
  defaultVariants: { tone: "default", size: "default" },
});

export function Fact({
  k,
  v,
  tone = "default",
  size = "default",
}: {
  k: string;
  v: ReactNode;
  tone?: "default" | "hazard";
  size?: "default" | "sm";
}) {
  return (
    <div className="bg-ink px-[18px] py-[18px]">
      <div className="font-cond text-[10px] tracking-[0.16em] uppercase text-fg2">{k}</div>
      <div className={factValue({ tone, size })}>{v}</div>
    </div>
  );
}
