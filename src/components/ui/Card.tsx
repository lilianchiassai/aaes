import { Link } from "react-router-dom";
import { tv } from "tailwind-variants";
import type { ReactNode } from "react";

/* Hard-edged, black-bordered card with the brand offset shadow and a
   hover lift (translate + grown shadow + hazard border). Renders a
   router <Link> when `to` is given, otherwise a <div>. */
const card = tv({
  base: "flex flex-col no-underline bg-[#0e0e0e] border-2 border-black shadow-[5px_5px_0_rgba(0,0,0,0.45)] transition-[transform,box-shadow,border-color] duration-150 hover:-translate-x-0.5 hover:-translate-y-[3px] hover:shadow-[8px_9px_0_rgba(0,0,0,0.55)] hover:border-hazard",
});

export function Card({
  to,
  className,
  children,
}: {
  to?: string;
  className?: string;
  children: ReactNode;
}) {
  const cls = card({ className });
  return to ? (
    <Link to={to} className={cls}>
      {children}
    </Link>
  ) : (
    <div className={cls}>{children}</div>
  );
}
