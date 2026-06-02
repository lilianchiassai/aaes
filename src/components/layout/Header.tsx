import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Container } from "../ui/Section";
import { assetUrl } from "../../lib/assets";

const linkBase =
  "font-cond font-semibold text-sm tracking-[0.14em] uppercase no-underline px-3 py-2 border-2 border-transparent transition-[color,border-color,background] duration-100";

function navClass({ isActive }: { isActive: boolean }) {
  return (
    linkBase +
    (isActive
      ? " text-hazard border-b-hazard"
      : " text-grey-100 hover:text-hazard hover:border-b-hazard")
  );
}

function ctaClass({ isActive }: { isActive: boolean }) {
  return (
    linkBase +
    " border-black shadow-[3px_3px_0_#000]" +
    (isActive
      ? " bg-black text-hazard border-hazard shadow-[3px_3px_0_var(--color-hazard)]"
      : " bg-hazard text-black hover:bg-black hover:text-hazard hover:shadow-[3px_3px_0_var(--color-hazard)]")
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(8,8,8,0.86)] backdrop-blur-[8px] border-b-[3px] border-hazard shadow-[0_3px_0_#000,0_10px_26px_rgba(0,0,0,0.5)]">
      <Container className="flex items-center gap-[22px] h-[74px]">
        <Link to="/" className="flex items-center gap-[18px] no-underline" onClick={close}>
          <img
            src={assetUrl("logo-aaes.png")}
            alt="AAES"
            className="w-[46px] h-[46px] [filter:drop-shadow(2px_2px_0_#000)]"
          />
          <b className="font-display text-2xl text-white uppercase tracking-[0.02em] leading-none">
            AAES
          </b>
        </Link>

        <button
          type="button"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          className="znav:hidden ml-auto bg-transparent border-2 border-hazard text-hazard font-impact text-lg px-3 py-[6px] cursor-pointer"
        >
          MENU
        </button>

        <nav
          className={
            "flex-col items-stretch gap-0 px-[18px] pt-2 pb-[18px] border-b-[3px] border-hazard " +
            "fixed top-[74px] inset-x-0 bg-[rgba(6,6,6,0.97)] " +
            (open ? "flex" : "hidden") +
            " znav:static znav:flex znav:flex-row znav:items-center znav:gap-[6px] znav:ml-auto znav:p-0 znav:border-0 znav:bg-transparent"
          }
        >
          <NavLink to="/" end className={navClass} onClick={close}>
            Accueil
          </NavLink>
          <NavLink to="/evenements" className={navClass} onClick={close}>
            Événements
          </NavLink>
          <NavLink to="/regles" className={navClass} onClick={close}>
            Règles
          </NavLink>
          <NavLink to="/a-propos" className={navClass} onClick={close}>
            À propos
          </NavLink>
          <NavLink to="/inscription" className={ctaClass} onClick={close}>
            S'inscrire
          </NavLink>
        </nav>
      </Container>
    </header>
  );
}
