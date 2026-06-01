import { Section, Container, SectionHead, SectionTitle } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { LocationBlock } from "../components/shared/LocationBlock";
import { UpcomingFacts } from "../components/shared/UpcomingFacts";
import { EventCard } from "../components/events/EventCard";
import { ParallaxBanner } from "../components/home/ParallaxBanner";
import { NightTimeline } from "../components/home/NightTimeline";
import { useCountdown } from "../hooks/useCountdown";
import { useScrollParallax } from "../hooks/useScrollParallax";
import { UPCOMING } from "../data/site";
import { assetUrl } from "../lib/assets";

/* Home "Éditions passées" preview cards (curated subset, like the prototype). */
const HOME_CARDS = [
  { to: "/event/2019-zsn", photo: "2019-2", ribbon: "29 Juin 2019", kicker: "Z Survival Night", title: "Edition 2019", locationLines: ["Parc du Biez", "Mondeville"], stat: "200" },
  { to: "/event/2018-zsn", photo: "2018-3", ribbon: "2018", kicker: "Z Survival Night · 2 dates", title: "Edition 2018", locationLines: ["Parc du Biez", "Mondeville"], stat: "150" },
  { to: "/event/2017-zsn", photo: "2017-2", ribbon: "24 Juin 2017", kicker: "Z Survival Night", title: "Edition 2017", locationLines: ["Vallée des Jardins", "Caen"], stat: "300" },
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
            <p className="hero__sub">{UPCOMING.heroBlurb}</p>
            <div className="hero__cta">
              <Button variant="primary" to="/inscription">
                S'inscrire · {UPCOMING.priceLabel}
              </Button>
              <Button variant="ghost" to="/regles">
                Lire les règles
              </Button>
            </div>
            <div className="hero__meta">
              <Badge variant="hazard">{UPCOMING.durationLabel}</Badge>
              <Badge variant="black">{UPCOMING.participantsLabel}</Badge>
              <Badge variant="outline">
                {UPCOMING.location.venue} · {UPCOMING.location.city}
              </Badge>
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
          <UpcomingFacts className="mb-[28px]" />
          <LocationBlock location={UPCOMING.location} />
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
              <EventCard key={c.title} {...c} />
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
              S'inscrire · {UPCOMING.priceLabel}
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
