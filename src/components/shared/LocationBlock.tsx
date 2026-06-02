import { Button } from "../ui/Button";
import { Kicker } from "../ui/Kicker";
import { Lead } from "../ui/Lead";
import type { EventLocation } from "../../data/site";

/**
 * Venue block: details + an embedded Google Map. Data comes from the
 * associated edition's `location` (no hardcoded venue/address here).
 */
export function LocationBlock({
  location,
  className = "",
}: {
  location: EventLocation;
  className?: string;
}) {
  return (
    <div
      className={
        "grid grid-cols-2 max-znav:grid-cols-1 border-2 border-black shadow-hard bg-[#0c0c0c] " +
        className
      }
    >
      <div className="p-[30px]">
        <Kicker size="sm" tracking="wide" className="block mb-2.5">Lieu de l'invasion</Kicker>
        <h3 className="font-display text-[clamp(30px,4vw,46px)] uppercase text-white leading-[0.9] mt-1.5 mb-3">
          {location.venue}
        </h3>
        <address className="not-italic font-cond text-lg text-grey-100 mb-3 leading-snug">
          {location.street}
          {location.postalCode ? `, ${location.postalCode}` : ""} {location.city}
        </address>
        <Lead className="mb-5">{location.addressNote}</Lead>
        <Button variant="ghost" href={location.mapsUrl} target="_blank" rel="noopener">
          Ouvrir dans Google Maps ↗
        </Button>
      </div>
      <div className="relative min-h-[260px] overflow-hidden bg-[#111] border-l-2 border-black max-znav:border-l-0 max-znav:border-t-2">
        <iframe
          title={`Carte — ${location.venue}, ${location.city}`}
          src={location.mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
          className="absolute inset-0 w-full h-full border-0 block [filter:invert(0.9)_hue-rotate(180deg)_brightness(0.95)_contrast(0.9)_grayscale(0.3)]"
        />
      </div>
    </div>
  );
}
