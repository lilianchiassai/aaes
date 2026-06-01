import { tv, type VariantProps } from "tailwind-variants";
import type { ReactNode } from "react";

const badge = tv({
  base: "font-cond font-semibold text-xs tracking-[0.12em] uppercase px-[13px] py-[6px] inline-block rounded-full",
  variants: {
    variant: {
      hazard: "bg-hazard text-black",
      blood: "bg-blood-bright text-white",
      outline: "border-[1.5px] border-grey-500 text-grey-100",
      black: "bg-black text-hazard border-[1.5px] border-hazard",
    },
  },
  defaultVariants: { variant: "hazard" },
});

export function Badge({
  variant,
  children,
  className,
}: VariantProps<typeof badge> & { children: ReactNode; className?: string }) {
  return <span className={badge({ variant, className })}>{children}</span>;
}
