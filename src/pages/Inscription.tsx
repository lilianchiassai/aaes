import { useEffect, useRef, useState } from "react";
import { Section, Container, TapeDivider } from "../components/ui/Section";
import { PageHead } from "../components/ui/PageHead";
import { Kicker } from "../components/ui/Kicker";
import { LocationBlock } from "../components/shared/LocationBlock";
import { UpcomingFacts } from "../components/shared/UpcomingFacts";
import { InscriptionStatus } from "../components/shared/InscriptionStatus";
import { siteConfig, UPCOMING, inscriptionIsOpen } from "../data/site";

const Red = ({ children }: { children: React.ReactNode }) => (
  <span className="text-hazard font-normal">{children}</span>
);

/** Numbered hazard-striped step bar (the gate's "01"/"02" headers). */
function StepHead({ n, title, className = "" }: { n: string; title: string; className?: string }) {
  return (
    <div
      className={
        "flex items-center gap-[14px] px-6 py-[18px] bg-[repeating-linear-gradient(-45deg,#141414_0_14px,#0c0c0c_14px_28px)] " +
        className
      }
    >
      <span className="font-display text-3xl text-hazard">{n}</span>
      <Kicker tone="white" size="lg" tracking="tight">
        {title}
      </Kicker>
    </div>
  );
}

export function Inscription() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [read, setRead] = useState(false);
  const [agree, setAgree] = useState(false);
  const [agreeAge, setAgreeAge] = useState(false);

  const unlocked = agree && agreeAge;
  const open = inscriptionIsOpen();

  // Unlock the first checkbox once the rules summary is scrolled to the end
  // (or immediately if it fits without scrolling).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) setRead(true);
    };
    // Defer the initial fits-without-scrolling measurement to the next frame
    // so the layout read happens after the browser's post-commit layout
    // rather than synchronously inside the effect (avoids a forced reflow).
    const raf = requestAnimationFrame(() => {
      if (el.scrollHeight <= el.clientHeight + 24) setRead(true);
    });
    el.addEventListener("scroll", check);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("scroll", check);
    };
  }, []);

  // HelloAsso posts its content height; grow the iframe to fit.
  useEffect(() => {
    const onMsg = (e: MessageEvent) => {
      const h = (e.data && (e.data as { height?: number }).height) || 0;
      const f = iframeRef.current;
      if (f && h > parseFloat(f.style.height || "0")) f.style.height = h + "px";
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  return (
    <>
      <PageHead title="S'inscrire" screenLabel="Inscription — En-tête">
        {open
          ? "Avant de réserver, vous devez lire le règlement et accepter les conditions. Faites défiler le résumé ci-dessous jusqu'au bout, cochez la case, puis l'inscription se débloque."
          : "La billetterie de l'édition 2026 n'est pas encore en ligne. Voici les infos pratiques — et comment être prévenu dès l'ouverture."}
      </PageHead>

      <TapeDivider />

      <Section ground="concrete">
        <Container width="article">
          {/* ===== EVENT INFO ===== */}
          <UpcomingFacts className="mb-6" />
          <LocationBlock location={UPCOMING.location} className="mb-8" />

          {!open && <InscriptionStatus />}

          {open && (
          <>
          {/* ===== STEP 1 — READ & AGREE ===== */}
          <div className="bg-[#0c0c0c] border-2 border-black shadow-hard mb-6">
            <StepHead n="01" title="Lisez le règlement" className="border-b-2 border-black" />

            <div
              ref={scrollRef}
              className="max-h-[300px] overflow-y-auto px-[26px] py-6 border-b border-dashed border-hairline [scrollbar-width:thin] [&_h4]:font-cond [&_h4]:font-semibold [&_h4]:uppercase [&_h4]:tracking-[0.08em] [&_h4]:text-hazard [&_h4]:text-[13px] [&_h4]:mt-[18px] [&_h4]:mb-2 [&_h4:first-child]:mt-0 [&_p]:font-body [&_p]:text-[19px] [&_p]:text-grey-100 [&_p]:leading-[1.55] [&_li]:font-body [&_li]:text-[19px] [&_li]:text-grey-100 [&_li]:leading-[1.55] [&_ul]:mb-[6px] [&_ul]:pl-[18px]"
            >
              <h4>Présentation</h4>
              <p>
                Au cours d'un Zombie Survival, vous êtes confronté à une invasion zombie. Livré à
                vous-même en pleine nuit, vous devez survivre en effectuant des missions.{" "}
                <Red>Chaque humain attrapé change de camp</Red> et traque ensuite ses anciens amis.
              </p>

              <h4>Déroulement</h4>
              <ul>
                <li>Arrivez 15 minutes avant l'heure de début.</li>
                <li>
                  Si un zombie vous attrape, vous êtes emmené au camp pour être maquillé et devenir
                  zombie à votre tour.
                </li>
                <li>Des missions sont organisées toute la soirée pour aider les humains à survivre.</li>
              </ul>

              <h4>Si vous êtes humain</h4>
              <ul>
                <li>Vous êtes libre, dans le cadre des règles.</li>
                <li>
                  Vous portez un <Red>bracelet lumineux</Red> visible en permanence.
                </li>
                <li>
                  Vous ne pouvez pas tuer les zombies. Vous pouvez vous laisser attraper si le stress
                  est trop fort.
                </li>
              </ul>

              <h4>Si vous êtes zombie</h4>
              <ul>
                <li>Vous marchez, vous ne courez pas. Vous n'utilisez pas de lampe.</li>
                <li>Vous pouvez ouvrir les portes, grimper, etc.</li>
                <li>Les camps protégés (marquages fluorescents) vous sont interdits.</li>
              </ul>

              <h4>Matériel</h4>
              <ul>
                <li>
                  Apportez votre matériel : gants, vêtements de pluie / salissables, chaussures de
                  sport, eau, sac à dos.
                </li>
                <li>
                  Lampes LED éblouissantes interdites — seules les lampes torches à filament non
                  éblouissantes sont autorisées.
                </li>
              </ul>

              <h4>Règles importantes</h4>
              <ul>
                <li>
                  L'équipe d'organisation a toujours raison et peut modifier les règles à tout
                  moment. Respectez-la.
                </li>
                <li>Restez fair play et de bonne humeur.</li>
                <li>
                  <Red>Armes, alcool et substances illicites sont interdits.</Red> Interdit aux −16
                  ans.
                </li>
              </ul>
              <p className="mt-[14px]">
                Règlement complet sur la page{" "}
                <a href="#/regles" className="text-hazard">
                  Règles
                </a>
                . — Vous arrivez au bout du résumé. ☞
              </p>
            </div>

            <div
              className={
                "flex items-center gap-[10px] px-[26px] py-3 font-cond text-xs tracking-[0.1em] uppercase transition-colors " +
                (read ? "text-cyan" : "text-fg2")
              }
            >
              {read
                ? "✓ Règlement lu — vous pouvez accepter"
                : "↓ Faites défiler le règlement jusqu'en bas pour continuer"}
            </div>

            <label
              htmlFor="agree"
              className={
                "px-[26px] py-[18px] flex items-start gap-[14px] bg-black cursor-pointer " +
                (agree ? "shadow-[inset_0_0_0_2px_var(--color-cyan)]" : "")
              }
            >
              <input
                type="checkbox"
                id="agree"
                disabled={!read}
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                className="w-[26px] h-[26px] flex-none accent-hazard mt-[2px] cursor-pointer disabled:cursor-not-allowed"
              />
              <span className="font-body text-lg text-white leading-[1.4]">
                J'ai lu et j'accepte le règlement de Z Survival Night.
                <span className="block text-fg2 text-sm mt-[2px]">
                  Obligatoire pour débloquer l'inscription · Interdit aux −16 ans
                </span>
              </span>
            </label>

            <label
              htmlFor="agree-age"
              className={
                "px-[26px] py-[18px] flex items-start gap-[14px] bg-black border-t border-hairline cursor-pointer " +
                (agreeAge ? "shadow-[inset_0_0_0_2px_var(--color-cyan)]" : "")
              }
            >
              <input
                type="checkbox"
                id="agree-age"
                checked={agreeAge}
                onChange={(e) => setAgreeAge(e.target.checked)}
                className="w-[26px] h-[26px] flex-none accent-hazard mt-[2px] cursor-pointer"
              />
              <span className="font-body text-lg text-white leading-[1.4]">
                Je certifie avoir 18 ans ou plus — ou, si j'ai entre 16 et 18 ans, je fournirai une
                autorisation parentale signée le soir de l'événement.
                <span className="block text-fg2 text-sm mt-[2px]">
                  Obligatoire · Interdit aux −16 ans
                </span>
              </span>
            </label>
          </div>

          {/* ===== STEP 2 — REGISTER (HelloAsso) ===== */}
          <StepHead n="02" title="Réservez votre place · 15 €" className="border-2 border-black border-b-0" />
          <div className="relative border-2 border-black shadow-hard bg-[#0c0c0c] p-2">
            {!unlocked && (
              <div className="absolute inset-0 z-[5] bg-[rgba(6,6,6,0.93)] flex flex-col items-center justify-center text-center p-10 gap-[14px] backdrop-blur-[3px]">
                <div className="text-5xl">🔒</div>
                <div className="font-display text-4xl uppercase text-white leading-[0.95]">
                  Inscription verrouillee
                </div>
                <div className="font-body text-lg text-grey-100 max-w-[38ch]">
                  Lisez le règlement ci-dessus, puis cochez les deux confirmations pour débloquer le
                  formulaire HelloAsso.
                </div>
              </div>
            )}
            <iframe
              ref={iframeRef}
              title="Inscription HelloAsso"
              allowTransparency
              scrolling="auto"
              src={siteConfig.helloAssoWidget}
              className="block w-full border-0 bg-white"
              style={{ height: "750px" }}
            />
          </div>

          <p className="font-cond text-xs tracking-[0.08em] uppercase text-fg2 mt-4 text-center">
            Paiement sécurisé via HelloAsso
          </p>
          </>
          )}
        </Container>
      </Section>
    </>
  );
}
