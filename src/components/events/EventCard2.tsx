import { useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ZEvent } from "../../data/events";
import { survivorsLabel } from "../../data/events";
import { photoUrl, youtubeThumb, youtubeEmbed } from "../../lib/assets";
import { Card } from "../ui/Card";
import { Kicker } from "../ui/Kicker";
import { FilmImg } from "../ui/FilmImg";
import { Ribbon } from "../ui/Ribbon";
import { QuoteCard } from "../ui/QuoteCard";

const STAT_LABEL = "font-cond text-xs tracking-[0.12em] uppercase text-fg2 mt-1";
const HERO = "absolute inset-0 opacity-[0.82] transition-transform duration-300 group-hover/card:scale-105";

function Stat({ n, label }: { n: ReactNode; label: ReactNode }) {
  return (
    <div>
      <div className="font-impact text-2xl text-hazard leading-none">{n}</div>
      <div className={STAT_LABEL}>{label}</div>
    </div>
  );
}

/** Large 2-per-row past-event card; trailer events get a click-to-play facade. */
export function EventCard2({ ev }: { ev: ZEvent }) {
  const [playing, setPlaying] = useState(false);
  const sub = (ev.loc || ev.kicker || "").split(",")[0].trim();
  const thumbs = ev.photos.slice(1, 4);
  const q = ev.quotes[0];

  return (
    <Card className="group/card overflow-hidden">
      {ev.trailer ? (
        <div
          className="group/media relative overflow-hidden bg-black aspect-video cursor-pointer"
          onClick={() => setPlaying(true)}
        >
          <FilmImg
            className={
              HERO +
              " group-hover/media:grayscale-[0.4] group-hover/media:contrast-[1.2] group-hover/media:opacity-95"
            }
            src={youtubeThumb(ev.trailer)}
            alt={`${ev.name} — bande-annonce`}
          />
          {!playing && (
            <>
              <Ribbon>{ev.dateShort}</Ribbon>
              <span
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[3] w-16 h-16 flex items-center justify-center bg-blood-bright text-white border-2 border-black shadow-[4px_4px_0_rgba(0,0,0,0.6)] transition-transform duration-150 group-hover/media:scale-[1.08]"
                aria-label="Lire la bande-annonce"
              >
                <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </>
          )}
          {playing && (
            <iframe
              className="absolute inset-0 w-full h-full border-0 z-[4]"
              src={youtubeEmbed(ev.trailer)}
              title="Bande-annonce"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          )}
        </div>
      ) : (
        <div className="relative overflow-hidden bg-black aspect-video">
          <FilmImg className={HERO} src={photoUrl(ev.photos[0])} alt={ev.name} />
          <Ribbon>{ev.dateShort}</Ribbon>
        </div>
      )}

      {thumbs.length > 0 && (
        <div className="grid grid-cols-3 gap-[3px] bg-black">
          {thumbs.map((p) => (
            <span className="group/thumb relative overflow-hidden aspect-[3/2] bg-black" key={p}>
              <FilmImg
                src={photoUrl(p)}
                alt=""
                className="contrast-[1.15] opacity-70 transition-[opacity,transform] duration-300 group-hover/card:opacity-90 group-hover/thumb:opacity-100 group-hover/thumb:scale-[1.06]"
              />
            </span>
          ))}
        </div>
      )}

      <Link
        className="flex flex-col gap-[11px] flex-1 no-underline px-[22px] pt-5 pb-[22px]"
        to={`/event/${ev.id}`}
      >
        <Kicker>{sub}</Kicker>
        <h3 className="font-display text-3xl uppercase text-white leading-[0.9] m-0">{ev.name}</h3>
        <div className="grid grid-cols-[auto_auto_1fr] gap-[18px] items-stretch border-y border-hairline py-3">
          <Stat n={ev.participants} label="Participants" />
          <Stat n={ev.survivors} label={survivorsLabel(ev.survivors)} />
          <div className="border-l border-hairline pl-[18px]">
            <div className="font-body text-sm text-white leading-[1.3]">{ev.fact}</div>
            <div className={STAT_LABEL}>Le fait</div>
          </div>
        </div>
        {q && <QuoteCard variant="inline" text={q.text} author={q.author} />}
        <Kicker className="tracking-[0.14em] mt-auto">Voir l'événement →</Kicker>
      </Link>
    </Card>
  );
}
