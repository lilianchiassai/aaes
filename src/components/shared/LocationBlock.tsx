import { Button } from "../ui/Button";
import { SectionKick } from "../ui/Section";
import { siteConfig } from "../../data/site";

/** Location + faux-map block (shared by Accueil and Inscription). */
export function LocationBlock({ className = "" }: { className?: string }) {
  return (
    <div className={"loc " + className}>
      <div className="loc__info">
        <SectionKick className="text-hazard">Lieu de l'invasion</SectionKick>
        <h3 className="font-display text-[clamp(30px,4vw,46px)] uppercase text-white leading-[0.9] mt-[6px] mb-3">
          Parc du Biez
        </h3>
        <p className="lead text-[17px] mb-[18px]">
          Mondeville (14120). Rendez-vous à l'entrée du parc dès 19h45. Stationnement à
          proximité — venez équipés pour la boue et la nuit.
        </p>
        <Button variant="ghost" href={siteConfig.mapsUrl} target="_blank" rel="noopener">
          Ouvrir dans Google Maps ↗
        </Button>
      </div>
      <a
        className="loc__map"
        href={siteConfig.mapsUrl}
        target="_blank"
        rel="noopener"
        aria-label="Ouvrir le plan"
      >
        <div className="grid" />
        <div className="loc__pin">
          <div className="ico">📍</div>
          <div className="lbl">Parc du Biez</div>
          <div className="sub">Mondeville · voir le plan</div>
        </div>
      </a>
    </div>
  );
}
