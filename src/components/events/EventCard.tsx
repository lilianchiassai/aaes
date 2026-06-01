import { Fragment } from "react";
import { photoUrl } from "../../lib/assets";
import { Card } from "../ui/Card";
import { Kicker } from "../ui/Kicker";
import { FilmImg } from "../ui/FilmImg";
import { Ribbon } from "../ui/Ribbon";

export interface EventCardProps {
  /** Route to navigate to on click. */
  to: string;
  /** Photo filename (no path/extension). */
  photo: string;
  /** Corner ribbon text (usually the date). */
  ribbon: string;
  kicker: string;
  title: string;
  /** One or more location lines (rendered <br>-separated). */
  locationLines: readonly string[];
  /** Headline stat value (e.g. participant count). */
  stat: string;
  statLabel?: string;
}

/** Compact past-event preview card (used on the home page). */
export function EventCard({
  to,
  photo,
  ribbon,
  kicker,
  title,
  locationLines,
  stat,
  statLabel = "Participants",
}: EventCardProps) {
  return (
    <Card to={to}>
      <div className="relative h-[172px] overflow-hidden bg-black">
        <FilmImg dim src={photoUrl(photo)} alt="" />
        <Ribbon>{ribbon}</Ribbon>
      </div>
      <div className="flex flex-col gap-2 flex-1 px-5 py-[18px]">
        <Kicker>{kicker}</Kicker>
        <h3 className="font-display text-3xl uppercase text-white leading-[0.9] m-0">{title}</h3>
        <div className="flex justify-between items-end border-t border-hairline pt-3 mt-auto">
          <span className="font-body text-lg text-grey-100 leading-[1.4]">
            {locationLines.map((l, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {l}
              </Fragment>
            ))}
          </span>
          <span className="font-impact text-2xl text-hazard text-right">
            {stat}
            <small className="block font-cond text-xs tracking-[0.14em] text-fg2">
              {statLabel}
            </small>
          </span>
        </div>
      </div>
    </Card>
  );
}
