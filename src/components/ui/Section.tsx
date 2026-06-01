import { tv, type VariantProps } from "tailwind-variants";
import type { HTMLAttributes, ReactNode } from "react";

/* ---- Container ---- */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={"w-full max-w-[1180px] mx-auto px-[28px] " + className}>{children}</div>
  );
}

/* ---- Section grounds ---- */
const section = tv({
  base: "py-[84px] relative",
  variants: {
    ground: {
      black: "bg-[#070707]",
      concrete: "bg-transparent",
      ink: "bg-[linear-gradient(#0c0c0c,#040404)]",
    },
    tightTop: { true: "pt-[60px]" },
  },
  defaultVariants: { ground: "concrete" },
});

export function Section({
  ground,
  tightTop,
  className,
  children,
  ...rest
}: VariantProps<typeof section> & {
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLElement>) {
  return (
    <section className={section({ ground, tightTop, className })} {...rest}>
      {children}
    </section>
  );
}

/* ---- Section head / title / kicker ---- */
export function SectionHead({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-5 mb-[38px] flex-wrap">{children}</div>
  );
}

/** Title with hazard-coloured <em> support: pass JSX or use the `em` className via children. */
export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={
        "font-impact text-[clamp(34px,5.2vw,62px)] uppercase leading-[0.92] text-white m-0 [&_em]:text-hazard [&_em]:not-italic " +
        className
      }
    >
      {children}
    </h2>
  );
}

/* ---- Hazard-tape divider between sections ---- */
export function TapeDivider() {
  return (
    <div className="h-[30px] bg-[repeating-linear-gradient(-45deg,var(--color-hazard)_0_18px,#000_18px_36px)] border-t-[3px] border-b-[3px] border-black shadow-[0_6px_18px_rgba(0,0,0,0.5)]" />
  );
}
