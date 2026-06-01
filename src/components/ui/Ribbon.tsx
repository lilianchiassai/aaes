import { tv } from "tailwind-variants";
import type { ReactNode } from "react";

/* Hazard corner ribbon used on event-card media (the former
   `.ecard__ribbon` / `.pcard2__ribbon`). Parent must be `relative`. */
const ribbon = tv({
  base: "absolute top-3 left-[-3px] z-[2] bg-hazard text-black font-impact text-base uppercase px-4 py-[5px] shadow-[3px_3px_0_rgba(0,0,0,0.5)]",
});

export function Ribbon({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={ribbon({ className })}>{children}</span>;
}
