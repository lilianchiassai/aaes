import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps } from "react";

/* The brand's desaturated photo treatment (grayscale + contrast), lazily
   loaded. `fit="cover"` (default) fills its box; `fit="none"` leaves sizing
   to the caller (e.g. the lightbox's max-w/max-h contain image).
   `dim` is the recurring hero/preview knock-back; finer contrast/opacity/hover
   tweaks still layer on via className (tailwind-merged). */
const filmImg = tv({
  base: "grayscale contrast-[1.18]",
  variants: {
    fit: {
      cover: "w-full h-full object-cover",
      none: "",
    },
    dim: { true: "opacity-80" },
  },
  defaultVariants: { fit: "cover" },
});

export function FilmImg({
  className,
  fit,
  dim,
  alt = "",
  ...props
}: ComponentProps<"img"> & VariantProps<typeof filmImg>) {
  return (
    <img loading="lazy" decoding="async" alt={alt} className={filmImg({ fit, dim, className })} {...props} />
  );
}
