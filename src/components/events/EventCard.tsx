import { Fragment } from "react";
import { Link } from "react-router-dom";
import { photoUrl } from "../../lib/assets";

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

/** Compact past-event preview card (the `.ecard` used on the home page). */
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
    <Link className="ecard" to={to}>
      <div className="ecard__media">
        <img src={photoUrl(photo)} alt="" loading="lazy" decoding="async" />
        <span className="ecard__ribbon">{ribbon}</span>
      </div>
      <div className="ecard__body">
        <div className="ecard__k">{kicker}</div>
        <h3 className="ecard__t">{title}</h3>
        <div className="ecard__row">
          <span className="ecard__loc">
            {locationLines.map((l, i) => (
              <Fragment key={i}>
                {i > 0 && <br />}
                {l}
              </Fragment>
            ))}
          </span>
          <span className="ecard__stat">
            {stat}
            <small>{statLabel}</small>
          </span>
        </div>
      </div>
    </Link>
  );
}
