import { tv } from "tailwind-variants";
import type { ReactNode } from "react";

/* Intro paragraph used under page/section headings (the former `.lead`).
   `className` is tailwind-merged, so `text-lg`, `mx-auto`, margins, etc.
   override the base cleanly. */
const lead = tv({
  base: "font-body text-lg text-grey-100 leading-[1.6] max-w-[80ch]",
});

export function Lead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={lead({ className })}>{children}</p>;
}
