import { Kicker } from "../ui/Kicker";
import { Button } from "../ui/Button";
import { FacebookIcon, InstagramIcon, LockIcon } from "../ui/icons";
import { UPCOMING, siteConfig, type UpcomingEdition } from "../../data/site";

/* Cyan-accented "the edition is sold out" panel — same shape as
   <InscriptionStatus />, shown instead of it (and instead of the S'inscrire
   CTA) once the edition's `isFull` flag is set. */

const panelBtnBase =
  "inline-flex items-center gap-[10px] font-impact uppercase tracking-[0.02em] text-lg leading-none px-[22px] py-[13px] border-2 no-underline cursor-pointer transition-colors";
const panelGhost =
  panelBtnBase + " bg-transparent border-cyan text-cyan hover:bg-cyan hover:text-black";
const panelPrimary =
  panelBtnBase + " bg-cyan border-cyan text-black hover:bg-black hover:text-cyan";

export function EventFullNotice({
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
          C'est complet
        </h2>

        <p className="font-body text-2xl text-grey-100 max-w-[60ch] mt-6 leading-[1.5]">
          Les {edition.participantsLabel} de cette édition sont au complet — la billetterie est
          fermée. Merci à tous&nbsp;: vous avez rempli la nuit en un temps record.
        </p>

        <p className="font-body text-2xl text-grey-100 max-w-[60ch] mt-4 leading-[1.5]">
          Suivez-nous sur Instagram et Facebook pour les désistements de dernière minute et
          l'annonce de la prochaine édition. Vous pouvez aussi venir avec nous&nbsp;: l'équipe de
          bénévoles, elle, recrute encore.
        </p>

        <Kicker tone="muted" size="xs" tracking="wide" className="block mt-9 mb-4">
          Restez informé
        </Kicker>
        <div className="flex flex-wrap gap-[14px]">
          <a
            className={panelPrimary}
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon /> Instagram
          </a>
          <a
            className={panelGhost}
            href={siteConfig.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon /> Facebook
          </a>
        </div>

        <div className="flex flex-wrap gap-[14px] mt-4">
          <Button variant="ghost" to="/benevoles">
            Devenir bénévole
          </Button>
          <Button variant="ghost" to="/regles">
            Lire les règles
          </Button>
        </div>
      </div>
    </div>
  );
}
