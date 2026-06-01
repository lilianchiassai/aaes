import { Button } from "../ui/Button";
import { SectionKick } from "../ui/Section";
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
    <div className={"loc " + className}>
      <div className="loc__info">
        <SectionKick className="text-hazard">Lieu de l'invasion</SectionKick>
        <h3 className="font-display text-[clamp(30px,4vw,46px)] uppercase text-white leading-[0.9] mt-[6px] mb-3">
          {location.venue}
        </h3>
        <p className="lead text-[17px] mb-[18px]">{location.addressNote}</p>
        <Button variant="ghost" href={location.mapsUrl} target="_blank" rel="noopener">
          Ouvrir dans Google Maps ↗
        </Button>
      </div>
      <div className="loc__map">
        <iframe
          title={`Carte — ${location.venue}, ${location.city}`}
          src={location.mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </div>
  );
}
