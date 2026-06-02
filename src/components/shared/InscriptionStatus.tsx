import { useRef, useState } from "react";
import { Kicker } from "../ui/Kicker";
import { Button } from "../ui/Button";
import { FacebookIcon, InstagramIcon, LinkIcon, BellIcon, LockIcon } from "../ui/icons";
import {
  UPCOMING,
  siteConfig,
  reminderCalendarUrl,
  type UpcomingEdition,
} from "../../data/site";

/* Cyan-accented "registration not open yet" panel. Replaces the S'inscrire CTA
   on the home CTA band and the rules gate on /inscription until the edition's
   `inscriptionOpenAt` date passes. */

const panelBtnBase =
  "inline-flex items-center gap-[10px] font-impact uppercase tracking-[0.02em] text-lg leading-none px-[22px] py-[13px] border-2 no-underline cursor-pointer transition-colors";
const panelGhost =
  panelBtnBase + " bg-transparent border-cyan text-cyan hover:bg-cyan hover:text-black";
const panelPrimary =
  panelBtnBase + " bg-cyan border-cyan text-black hover:bg-black hover:text-cyan";

function CopyLinkButton() {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };
  return (
    <button type="button" onClick={copy} className={panelGhost}>
      <LinkIcon /> {copied ? "Lien copié" : "Copier le lien"}
    </button>
  );
}

export function InscriptionStatus({
  edition = UPCOMING,
  className = "",
}: {
  edition?: UpcomingEdition;
  className?: string;
}) {
  return (
    <div
      className={
        "relative bg-[#0a0a0a] border-2 border-cyan shadow-[8px_8px_0_#000] text-left " + className
      }
    >
      {/* hazard tape header */}
      <div className="h-[26px] bg-[repeating-linear-gradient(-45deg,var(--color-hazard)_0_18px,#000_18px_36px)] border-b-2 border-black" />

      <div className="p-[clamp(24px,4vw,52px)]">
        <span className="inline-flex items-center gap-2 bg-cyan text-black font-cond font-semibold text-xs tracking-[0.14em] uppercase px-[13px] py-[7px]">
          <LockIcon className="w-[14px] h-[14px]" /> Statut des inscriptions
        </span>

        <h2 className="font-display uppercase text-[clamp(40px,7vw,82px)] leading-[0.85] text-white mt-6 mb-0 max-w-[15ch]">
          Inscriptions pas encore ouvertes
        </h2>

        <p className="font-body text-2xl text-grey-100 max-w-[60ch] mt-6 leading-[1.5]">
          La billetterie de l'édition 2026 n'est pas encore en ligne — tout est sous contrôle.
          Programmez un rappel ou partagez l'événement pour ne pas rater l'ouverture : les places
          sont limitées et partent vite.
        </p>

        <div className="flex items-center gap-4 mt-8 border-l-[3px] border-cyan pl-4">
          <Kicker tone="cyan" size="sm" tracking="wide">
            Ouverture prévue
          </Kicker>
          <span className="font-impact uppercase text-[clamp(26px,4vw,40px)] text-white leading-none">
            {edition.inscriptionOpenLabel}
          </span>
        </div>

        <Kicker tone="muted" size="xs" tracking="wide" className="block mt-9 mb-4">
          Restez informé
        </Kicker>
        <div className="flex flex-wrap gap-[14px]">
          <a
            className={panelGhost}
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon /> Facebook
          </a>
          <a
            className={panelGhost}
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon /> Instagram
          </a>
          <CopyLinkButton />
          <a
            className={panelPrimary}
            href={reminderCalendarUrl(edition)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <BellIcon /> Me rappeler l'ouverture
          </a>
        </div>

        <div className="flex flex-wrap gap-[14px] mt-4">
          <Button variant="ghost" to="/regles">
            Lire les règles en attendant
          </Button>
          <Button variant="ghost" to="/evenements">
            Revoir les éditions passées
          </Button>
        </div>
      </div>
    </div>
  );
}
