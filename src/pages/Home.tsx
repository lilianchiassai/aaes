import { Section, Container, SectionHead, SectionTitle } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { Lead } from "../components/ui/Lead";
import { Stack } from "../components/ui/Stack";
import { Kicker } from "../components/ui/Kicker";
import { LocationBlock } from "../components/shared/LocationBlock";
import { UpcomingFacts } from "../components/shared/UpcomingFacts";
import { InscriptionStatus } from "../components/shared/InscriptionStatus";
import { EventCard2 } from "../components/events/EventCard2";
import { ParallaxBanner } from "../components/home/ParallaxBanner";
import { NightTimeline } from "../components/home/NightTimeline";
import { LockIcon } from "../components/ui/icons";
import { useCountdown } from "../hooks/useCountdown";
import { useScrollParallax } from "../hooks/useScrollParallax";
import { UPCOMING, inscriptionIsOpen } from "../data/site";
import { ZEVENTS } from "../data/events";
import { assetUrl } from "../lib/assets";

/* Home "Éditions passées" preview — the 3 most recent editions
   (ZEVENTS is ordered newest-first). */
const HOME_EVENTS = ZEVENTS.slice(0, 3);

export function Home() {
  const cd = useCountdown(UPCOMING.countdownTarget);
  useScrollParallax();
  const open = inscriptionIsOpen();

  const description = (
    <>
      <p>
        Une Soirée Zombie, c'est un jeu de rôle grandeur nature. Le temps d'une nuit, vous et vos
        amis incarnez un survivant en pleine invasion zombie. Quelle est l'origine de la
        contamination&nbsp;? Existe-t-il un remède&nbsp;? Comment prendre la fuite&nbsp;? Pour
        répondre à ces questions — et survivre jusqu'au petit matin —, vous devrez accomplir des
        missions et suivre un scénario original créé par nos soins. Mais alors que les humains se
        font contaminer un à un, la horde se renforce et le danger grandit.
      </p>
      <p>
        Si un zombie vous touche, c'est fini pour vous… à moins que ce ne soit que le début&nbsp;?
        Fraîchement maquillé, vous passez de l'autre côté&nbsp;: zombie à votre tour, prêt à faire
        peur à vos anciens compagnons.
      </p>
    </>
  );

  return (
    <>
      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-black z-[1]" data-screen-label="Accueil — Hero">
        <img
          data-parallax-hero
          className="absolute right-[-2%] top-1/2 -translate-y-1/2 h-[95%] z-[1] opacity-90 max-[760px]:opacity-20 pointer-events-none mix-blend-screen will-change-transform [filter:grayscale(1)_contrast(1.25)_brightness(.9)] [-webkit-mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,.35)_22%,#000_48%)] [mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,.35)_22%,#000_48%)]"
          src={assetUrl("zombie-hand-recto.png")}
          alt=""
        />
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
              <Kicker size="sm" tracking="wider" className="block mb-3.5">
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
            {UPCOMING.heroBlurb.map((para, i) => (
              <p
                key={i}
                className="font-body text-2xl text-grey-100 max-w-[64ch] mt-5 mb-4 leading-[1.5]"
              >
                {para}
              </p>
            ))}
            <div className="flex gap-4 flex-wrap items-center mt-[14px]">
              {open ? (
                <Button variant="primary" to="/inscription">
                  S'inscrire · {UPCOMING.priceLabel}
                </Button>
              ) : (
                <span className="inline-flex items-center gap-[10px] font-impact uppercase text-lg leading-none px-[22px] py-[13px] border-2 border-cyan text-cyan">
                  <LockIcon /> Inscriptions dès le {UPCOMING.inscriptionOpenLabel}
                </span>
              )}
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

      {/* ============ À QUOI S'ATTENDRE ============ */}
      <Section ground="concrete" tightTop data-screen-label="Accueil — À quoi s'attendre">
        <Container>
          <SectionHead>
            <div>
              <SectionTitle>
                À quoi <em>s'attendre</em>
              </SectionTitle>
            </div>
          </SectionHead>
          <div className="font-body text-2xl text-white leading-snug space-y-4">
            {description}
          </div>

          <div className="mt-14">
            <NightTimeline />
          </div>
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
          <Stack gap="lg">
            <UpcomingFacts />
            <LocationBlock location={UPCOMING.location} />
          </Stack>
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

          <div className="grid grid-cols-3 max-[880px]:grid-cols-2 max-[560px]:grid-cols-1 gap-6">
            {HOME_EVENTS.map((ev) => (
              <EventCard2 ev={ev} preview key={ev.id} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ============ CTA BAND ============ */}
      <Section
        ground="black"
        className={open ? "text-center" : ""}
        data-screen-label="Accueil — CTA"
      >
        <Container>
          {open ? (
            <>
              <SectionTitle font="display">
                Choisirez-vous
                <br />
                de survivre&nbsp;?
              </SectionTitle>
              <Lead className="mx-auto mt-5 mb-7">
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
            </>
          ) : (
            <InscriptionStatus />
          )}
        </Container>
      </Section>
    </>
  );
}
