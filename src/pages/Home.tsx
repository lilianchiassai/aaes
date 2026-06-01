import { Link } from "react-router-dom";
import { Section, Container, SectionHead, SectionTitle } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { FactsStrip, Fact } from "../components/ui/Fact";
import { LocationBlock } from "../components/shared/LocationBlock";
import { ParallaxBanner } from "../components/home/ParallaxBanner";
import { NightTimeline } from "../components/home/NightTimeline";
import { useCountdown } from "../hooks/useCountdown";
import { useScrollParallax } from "../hooks/useScrollParallax";
import { UPCOMING } from "../data/site";
import { assetUrl, photoUrl } from "../lib/assets";

/* Home "Éditions passées" preview cards (curated subset, like the prototype). */
const HOME_CARDS = [
  { photo: "2019-2", ribbon: "29 Juin 2019", k: "Z Survival Night", t: "Edition 2019", loc: ["Parc du Biez", "Mondeville"], stat: "200" },
  { photo: "2018-3", ribbon: "2018", k: "Z Survival Night · 2 dates", t: "Edition 2018", loc: ["Parc du Biez", "Mondeville"], stat: "150" },
  { photo: "2017-2", ribbon: "24 Juin 2017", k: "Z Survival Night", t: "Edition 2017", loc: ["Vallée des Jardins", "Caen"], stat: "300" },
] as const;

export function Home() {
  const cd = useCountdown(UPCOMING.countdownTarget);
  useScrollParallax();

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="hero" data-screen-label="Accueil — Hero">
        <img className="hero__art" src={assetUrl("zombie-hand-recto.png")} alt="" />
        <div className="hero__btmfade" />
        <Container className="hero__inner">
          <div className="hero__lead">
            <div className="hero__countdown">
              <span className="lbl">Les zombies reviennent dans</span>
              <div className="hero__cd-row">
                <div className="hero__cd-cell">
                  <div className="n">{cd.days}</div>
                  <div className="l">Jours</div>
                </div>
                <div className="hero__cd-cell">
                  <div className="n">{cd.hours}</div>
                  <div className="l">Heures</div>
                </div>
                <div className="hero__cd-cell">
                  <div className="n">{cd.minutes}</div>
                  <div className="l">Minutes</div>
                </div>
              </div>
            </div>
            <div className="hero__titleblock">
              <div className="hero__kicker">{UPCOMING.kicker}</div>
              <h1 className="hero__title">Z Survival Night</h1>
            </div>
          </div>

          <div className="hero__details">
            <div className="hero__date">{UPCOMING.dateLong}</div>
            <p className="hero__sub">
              Sept ans après la dernière contamination, l'AAES rouvre le périmètre. Dressez-vous
              face à l'invasion&nbsp;: trois heures de jeu de rôle grandeur nature, en pleine nuit,
              au Parc du Biez à Mondeville. Réussissez les missions, restez dans la lumière et percez
              l'origine de l'infection… ou laissez-vous attraper et rejoignez la horde.
            </p>
            <div className="hero__cta">
              <Button variant="primary" to="/inscription">
                S'inscrire · 15 €
              </Button>
              <Button variant="ghost" to="/regles">
                Lire les règles
              </Button>
            </div>
            <div className="hero__meta">
              <Badge variant="hazard">+3 heures</Badge>
              <Badge variant="black">100 participants</Badge>
              <Badge variant="outline">Parc du Biez · Mondeville</Badge>
            </div>
          </div>
        </Container>
      </section>

      <ParallaxBanner />

      {/* ============ COMMENT ÇA SE PASSE ============ */}
      <Section ground="concrete" tightTop data-screen-label="Accueil — Déroulement">
        <Container>
          <SectionHead>
            <div>
              <SectionTitle>
                Comment se déroule <em>la nuit</em>
              </SectionTitle>
            </div>
          </SectionHead>
          <NightTimeline />
        </Container>
      </Section>

      {/* ============ INFOS PRATIQUES + LIEU ============ */}
      <Section ground="black" data-screen-label="Accueil — Infos pratiques">
        <Container>
          <SectionHead>
            <div>
              <SectionTitle>Le rendez-vous</SectionTitle>
            </div>
          </SectionHead>
          <FactsStrip className="mb-[28px]">
            <Fact k="Date" v="Sam. 12 sept." />
            <Fact k="Heure" v="20h00" />
            <Fact k="Durée" v="+3 heures" />
            <Fact k="Âge" v="+16 ans" />
            <Fact k="Tarif" v="15 €" tone="hazard" />
          </FactsStrip>
          <LocationBlock />
        </Container>
      </Section>

      {/* ============ ÉDITIONS PASSÉES ============ */}
      <Section ground="concrete" data-screen-label="Accueil — Éditions passées">
        <Container>
          <SectionHead>
            <div>
              <SectionTitle>
                Les éditions <em>passées</em>
              </SectionTitle>
            </div>
            <Button variant="ghost" to="/evenements">
              Toutes les éditions
            </Button>
          </SectionHead>

          <div className="events">
            {HOME_CARDS.map((c) => (
              <Link key={c.t} className="ecard" to="/evenements">
                <div className="ecard__media">
                  <img src={photoUrl(c.photo)} alt="" loading="lazy" decoding="async" />
                  <span className="ecard__ribbon">{c.ribbon}</span>
                </div>
                <div className="ecard__body">
                  <div className="ecard__k">{c.k}</div>
                  <h3 className="ecard__t">{c.t}</h3>
                  <div className="ecard__row">
                    <span className="ecard__loc">
                      {c.loc[0]}
                      <br />
                      {c.loc[1]}
                    </span>
                    <span className="ecard__stat">
                      {c.stat}
                      <small>Participants</small>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      {/* ============ CTA BAND ============ */}
      <Section ground="black" className="text-center" data-screen-label="Accueil — CTA">
        <Container>
          <SectionTitle className="font-display">
            Choisirez-vous
            <br />
            de survivre&nbsp;?
          </SectionTitle>
          <p className="lead mx-auto mt-[18px] mb-[28px]">
            Les places sont limitées. Lisez le règlement, acceptez les conditions, puis réservez
            votre nuit.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="cyan" to="/inscription">
              S'inscrire · 15 €
            </Button>
            <Button variant="ghost" to="/regles">
              Lire les règles
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
