import { Section, Container, SectionHead, SectionTitle } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Lead } from "../components/ui/Lead";
import { Kicker } from "../components/ui/Kicker";
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
      <section className="relative overflow-hidden bg-black z-[1]" data-screen-label="Accueil — Hero">
        <img className="hero__art" src={assetUrl("zombie-hand-recto.png")} alt="" />
        <div className="absolute left-0 right-0 bottom-0 z-[2] pointer-events-none h-[100px] bg-[linear-gradient(180deg,transparent,#000_92%)]" />
        <Container className="relative z-[3] min-h-[120vh] flex flex-col justify-center pt-[clamp(80px,14vh,170px)] pb-[clamp(120px,18vh,220px)] gap-[clamp(28px,4vh,52px)]">
          <div className="relative flex flex-col gap-[clamp(88px,17vh,200px)]">
            <div className="flex flex-col items-center gap-[18px] text-center mx-auto w-full">
              <span className="font-cond font-semibold tracking-[0.28em] uppercase text-[clamp(15px,1.8vw,20px)] text-cyan">
                Les zombies reviennent dans
              </span>
              <div className="flex gap-[clamp(12px,1.6vw,20px)]">
                {[
                  { n: cd.days, l: "Jours" },
                  { n: cd.hours, l: "Heures" },
                  { n: cd.minutes, l: "Minutes" },
                ].map((c) => (
                  <div
                    key={c.l}
                    className="bg-[rgba(0,0,0,0.5)] border border-[rgba(39,194,230,0.55)] px-[clamp(18px,2.4vw,32px)] py-[clamp(14px,1.8vw,22px)] min-w-[clamp(96px,12vw,140px)]"
                  >
                    <div className="font-impact text-[clamp(48px,7vw,84px)] text-cyan leading-none">
                      {c.n}
                    </div>
                    <div className="font-cond text-[clamp(11px,1.1vw,13px)] tracking-[0.16em] uppercase text-grey-100 mt-[6px]">
                      {c.l}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Kicker size="sm" className="block tracking-[0.24em] mb-[14px]">
                {UPCOMING.kicker}
              </Kicker>
              <h1 className="font-display text-9xl max-[560px]:text-6xl leading-[0.82] uppercase text-white mt-0 mb-[6px] max-w-[11ch]">
                Z Survival Night
              </h1>
            </div>
          </div>

          <div>
            <div className="font-impact text-[clamp(28px,3.8vw,52px)] text-hazard uppercase tracking-[0.01em] leading-none mt-2 mb-[6px]">
              {UPCOMING.dateLong}
            </div>
            <p className="font-body text-xl text-grey-100 max-w-[64ch] mt-5 mb-4 leading-[1.5]">
              {UPCOMING.heroBlurb}
            </p>
            <div className="flex gap-4 flex-wrap items-center mt-[14px]">
              <Button variant="primary" to="/inscription">
                S'inscrire · {UPCOMING.priceLabel}
              </Button>
              <Button variant="ghost" to="/regles">
                Lire les règles
              </Button>
            </div>
            <div className="flex gap-[10px] mt-7 flex-wrap">
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

          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-[22px]">
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
          <Lead className="mx-auto mt-[18px] mb-[28px]">
            Les places sont limitées. Lisez le règlement, acceptez les conditions, puis réservez
            votre nuit.
          </Lead>
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
