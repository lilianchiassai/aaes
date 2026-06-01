import { useEffect, useRef, useState } from "react";
import { Section, Container, TapeDivider } from "../components/ui/Section";
import { LocationBlock } from "../components/shared/LocationBlock";
import { UpcomingFacts } from "../components/shared/UpcomingFacts";
import { siteConfig, UPCOMING } from "../data/site";

const Red = ({ children }: { children: React.ReactNode }) => (
  <span className="red">{children}</span>
);

export function Inscription() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [read, setRead] = useState(false);
  const [agree, setAgree] = useState(false);
  const [agreeAge, setAgreeAge] = useState(false);

  const unlocked = agree && agreeAge;

  // Unlock the first checkbox once the rules summary is scrolled to the end
  // (or immediately if it fits without scrolling).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      if (el.scrollTop + el.clientHeight >= el.scrollHeight - 24) setRead(true);
    };
    if (el.scrollHeight <= el.clientHeight + 24) setRead(true);
    el.addEventListener("scroll", check);
    return () => el.removeEventListener("scroll", check);
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
      <section className="pagehead py-[60px] bg-[#070707]" data-screen-label="Inscription — En-tête">
        <Container>
          <h1>S'inscrire</h1>
          <p className="lead">
            Avant de réserver, vous devez lire le règlement et accepter les conditions. Faites
            défiler le résumé ci-dessous jusqu'au bout, cochez la case, puis l'inscription se
            débloque.
          </p>
        </Container>
      </section>

      <TapeDivider />

      <Section ground="concrete">
        <Container className="insc">
          {/* ===== EVENT INFO ===== */}
          <UpcomingFacts className="mb-[24px]" />
          <LocationBlock location={UPCOMING.location} className="mb-[34px]" />

          {/* ===== STEP 1 — READ & AGREE ===== */}
          <div className="gate">
            <div className="gate__head">
              <span className="gate__num">01</span>
              <span className="gate__title">Lisez le règlement</span>
            </div>

            <div className="gate__scroll" ref={scrollRef}>
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

            <div className={"gate__hint" + (read ? " read" : "")}>
              {read
                ? "✓ Règlement lu — vous pouvez accepter"
                : "↓ Faites défiler le règlement jusqu'en bas pour continuer"}
            </div>

            <div className={"gate__agree" + (agree ? " armed" : "")}>
              <input
                type="checkbox"
                id="agree"
                disabled={!read}
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
              />
              <label htmlFor="agree">
                J'ai lu et j'accepte le règlement de Z Survival Night.
                <span className="req">
                  Obligatoire pour débloquer l'inscription · Interdit aux −16 ans
                </span>
              </label>
            </div>

            <div className={"gate__agree border-t border-hairline" + (agreeAge ? " armed" : "")}>
              <input
                type="checkbox"
                id="agree-age"
                checked={agreeAge}
                onChange={(e) => setAgreeAge(e.target.checked)}
              />
              <label htmlFor="agree-age">
                Je certifie avoir 18 ans ou plus — ou, si j'ai entre 16 et 18 ans, je fournirai une
                autorisation parentale signée le soir de l'événement.
                <span className="req">Obligatoire · Interdit aux −16 ans</span>
              </label>
            </div>
          </div>

          {/* ===== STEP 2 — REGISTER (HelloAsso) ===== */}
          <div className="gate__head border-2 border-black border-b-0">
            <span className="gate__num">02</span>
            <span className="gate__title">Réservez votre place · 15 €</span>
          </div>
          <div className={"formwrap" + (unlocked ? " unlocked" : "")}>
            <div className="formlock">
              <div className="lk">🔒</div>
              <div className="t">Inscription verrouillee</div>
              <div className="s">
                Lisez le règlement ci-dessus, puis cochez les deux confirmations pour débloquer le
                formulaire HelloAsso.
              </div>
            </div>
            <iframe
              ref={iframeRef}
              title="Inscription HelloAsso"
              allowTransparency
              scrolling="auto"
              src={siteConfig.helloAssoWidget}
              style={{ width: "100%", height: "750px", border: "none" }}
            />
          </div>

          <p className="font-cond text-[12px] tracking-[0.08em] uppercase text-fg2 mt-4 text-center">
            Paiement sécurisé via HelloAsso
          </p>
        </Container>
      </Section>
    </>
  );
}
