import { Link } from "react-router-dom";
import { Container } from "../ui/Section";
import { assetUrl } from "../../lib/assets";
import { siteConfig } from "../../data/site";

const colLink =
  "font-body text-[19px] text-grey-100 no-underline block mb-2 leading-[1.45] hover:text-hazard";
const colHead =
  "font-cond font-semibold text-[12px] tracking-[0.16em] uppercase text-hazard m-0 mb-[14px]";

export function Footer({ extraLegal }: { extraLegal?: string }) {
  return (
    <footer className="mt-auto bg-black border-t-[3px] border-hazard pt-[50px] pb-[30px]">
      <Container>
        <div className="grid grid-cols-1 znav:grid-cols-[1.5fr_1fr_1fr] gap-[38px]">
          <div>
            <div className="flex items-center gap-3 mb-[14px]">
              <img src={assetUrl("logo-aaes.png")} alt="AAES" className="w-[50px] h-[50px]" />
              <b className="font-display text-[28px] text-white uppercase leading-none">AAES</b>
            </div>
            <p className="font-body text-[19px] text-grey-100 leading-[1.45] m-0">
              Amicale des Amateurs
              <br />
              d'Excursions Scénarisées
            </p>
            <p className="font-cond tracking-[0.08em] uppercase text-hazard mt-2">
              Tout est sous contrôle.
            </p>
          </div>

          <div>
            <h4 className={colHead}>Z Survival Night</h4>
            <Link to="/" className={colLink}>
              L'édition 2026
            </Link>
            <Link to="/regles" className={colLink}>
              Règles & infos
            </Link>
            <Link to="/evenements" className={colLink}>
              Éditions passées
            </Link>
            <Link to="/inscription" className={colLink}>
              S'inscrire
            </Link>
          </div>

          <div>
            <h4 className={colHead}>L'association</h4>
            <Link to="/evenements" className={colLink}>
              Nos événements
            </Link>
            <a
              href={siteConfig.mapsUrl}
              target="_blank"
              rel="noopener"
              className={colLink}
            >
              Parc du Biez, Mondeville
            </a>
            <p className="font-body text-[19px] text-grey-300 m-0">Réseaux sociaux à venir</p>
          </div>
        </div>

        <div className="mt-[34px] pt-[18px] border-t border-hairline flex justify-between gap-4 flex-wrap">
          <span className="font-cond text-[11px] tracking-[0.12em] uppercase text-grey-300">
            © 2026 AAES — Z Survival Night
          </span>
          {extraLegal && (
            <span className="font-cond text-[11px] tracking-[0.12em] uppercase text-grey-300">
              {extraLegal}
            </span>
          )}
        </div>
      </Container>
    </footer>
  );
}
