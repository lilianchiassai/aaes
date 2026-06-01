import { useState } from "react";
import { Link } from "react-router-dom";
import type { ZEvent } from "../../data/events";
import { survivorsLabel } from "../../data/events";
import { photoUrl, youtubeThumb, youtubeEmbed } from "../../lib/assets";

/** Large 2-per-row past-event card; trailer events get a click-to-play facade. */
export function EventCard2({ ev }: { ev: ZEvent }) {
  const [playing, setPlaying] = useState(false);
  const sub = (ev.loc || ev.kicker || "").split(",")[0].trim();
  const thumbs = ev.photos.slice(1, 4);
  const q = ev.quotes[0];

  return (
    <div className="pcard2">
      {ev.trailer ? (
        <div
          className={"pcard2__media pcard2__media--video" + (playing ? " is-playing" : "")}
          onClick={() => setPlaying(true)}
        >
          <img
            className="pcard2__hero"
            src={youtubeThumb(ev.trailer)}
            alt={`${ev.name} — bande-annonce`}
            loading="lazy"
            decoding="async"
          />
          <span className="pcard2__ribbon">{ev.dateShort}</span>
          <span className="pcard2__play" aria-label="Lire la bande-annonce">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
          {playing && (
            <iframe
              src={youtubeEmbed(ev.trailer)}
              title="Bande-annonce"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          )}
        </div>
      ) : (
        <div className="pcard2__media">
          <img
            className="pcard2__hero"
            src={photoUrl(ev.photos[0])}
            alt={ev.name}
            loading="lazy"
            decoding="async"
          />
          <span className="pcard2__ribbon">{ev.dateShort}</span>
        </div>
      )}

      {thumbs.length > 0 && (
        <div className="pcard2__strip">
          {thumbs.map((p) => (
            <span className="pcard2__thumb" key={p}>
              <img src={photoUrl(p)} alt="" loading="lazy" decoding="async" />
            </span>
          ))}
        </div>
      )}

      <Link className="pcard2__body" to={`/event/${ev.id}`}>
        <div className="pcard2__k">{sub}</div>
        <h3 className="pcard2__t">{ev.name}</h3>
        <div className="pcard2__stats">
          <div className="pcard2__stat">
            <div className="n">{ev.participants}</div>
            <div className="l">Participants</div>
          </div>
          <div className="pcard2__stat">
            <div className="n">{ev.survivors}</div>
            <div className="l">{survivorsLabel(ev.survivors)}</div>
          </div>
          <div className="pcard2__stat pcard2__stat--fact">
            <div className="fn">{ev.fact}</div>
            <div className="l">Le fait</div>
          </div>
        </div>
        {q && (
          <div className="pcard2__quote">
            “{q.text}”<cite>— {q.author}</cite>
          </div>
        )}
        <div className="pcard2__more">Voir l'événement →</div>
      </Link>
    </div>
  );
}
