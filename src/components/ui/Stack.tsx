import { tv, type VariantProps } from "tailwind-variants";
import type { HTMLAttributes, ReactNode } from "react";

/* Vertical flow primitive: the PARENT owns the rhythm via `gap`, so stacked
   children carry no margins of their own. Add/remove/reorder children and the
   spacing stays correct. Use it for uniform-rhythm groups; genuinely uneven
   spacing (e.g. a hero header that tightens toward the title) stays as explicit
   margins. `gap` steps map to the shared spacing scale. */
const stack = tv({
  base: "flex flex-col",
  variants: {
    gap: {
      xs: "gap-2", // 8px
      sm: "gap-3.5", // 14px
      md: "gap-5", // 20px
      lg: "gap-7", // 28px
      xl: "gap-12", // 48px
    },
  },
  defaultVariants: { gap: "md" },
});

export function Stack({
  gap,
  className,
  children,
  ...rest
}: VariantProps<typeof stack> & {
  className?: string;
  children: ReactNode;
} & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={stack({ gap, className })} {...rest}>
      {children}
    </div>
  );
}
