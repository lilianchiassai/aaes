import { Section, Container, SectionHead, SectionTitle, TapeDivider } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { PageHead } from "../components/ui/PageHead";
import { Kicker } from "../components/ui/Kicker";
import { EventCard2 } from "../components/events/EventCard2";
import { eventsByYear } from "../data/events";
import { UPCOMING } from "../data/site";

function Recap({ n, l }: { n: React.ReactNode; l: string }) {
  return (
    <div className="flex items-baseline gap-3">
      <span className="font-impact text-4xl text-cyan leading-none min-w-[90px]">{n}</span>
      <span className="font-cond text-sm tracking-[0.1em] uppercase text-grey-100">{l}</span>
    </div>
  );
}

export function Events() {
  const groups = eventsByYear();

  return (
    <>
      <PageHead title="Événements" screenLabel="Événements — En-tête">
        De la Vallée des Jardins au Parc du Biez, retour sur les nuits où l'AAES a lâché la horde —
        et l'édition qui marque le grand retour.
      </PageHead>

      <TapeDivider />

      <Section ground="concrete">
        <Container>
          {/* ===== FEATURED 2026 (cyan) ===== */}
          <div
            className="overflow-hidden bg-[#0b0b0b] border-2 border-cyan shadow-[8px_8px_0_#000,0_0_40px_rgba(39,194,230,0.22)] mb-[54px]"
            data-screen-label="Événements — 2026 à venir"
          >
            <div className="grid grid-cols-[1.2fr_0.8fr] max-zmd:grid-cols-1">
              <div className="px-9 py-[34px]">
                <Kicker tone="cyan" tracking="wide" className="block">
                  À venir · Samedi 12 septembre 2026 · 19h00
                </Kicker>
                <div className="font-display text-[clamp(36px,4.6vw,60px)] uppercase text-white leading-[0.9] mt-2 mb-[14px]">
                  Z Survival Night
                  <br />
                  2026
                </div>
                {UPCOMING.heroBlurb.map((para, i) => (
                  <p
                    key={i}
                    className="font-body text-2xl text-grey-100 leading-[1.6] max-w-[72ch]"
                  >
                    {para}
                  </p>
                ))}
                <div className="mt-5 flex gap-[14px] flex-wrap">
                  <Button variant="primary" to="/inscription">
                    S'inscrire · 15 €
                  </Button>
                  <Button variant="ghost" to="/regles">
                    Lire les règles
                  </Button>
                </div>
              </div>
              <div className="bg-black border-l-4 border-cyan px-7 py-6 flex flex-col justify-center gap-[14px]">
                <Recap n={UPCOMING.time} l="Début" />
                <Recap n="15 €" l="L'inscription" />
                <Recap n="+16" l="Âge minimum" />
                <Recap n="+3h" l="De jeu, en pleine nuit" />
                <Recap n={<span className="text-2xl">Parc du Biez</span>} l="Mondeville" />
              </div>
            </div>
          </div>

          {/* ===== PAST EDITIONS (grouped by year) ===== */}
          <SectionHead>
            <div>
              <SectionTitle>
                Les éditions <em>passées</em>
              </SectionTitle>
            </div>
          </SectionHead>

          {groups.map((g) => (
            <div className="mb-[60px]" key={g.year}>
              <div className="flex items-center gap-[18px] mb-6">
                <span className="font-display text-[clamp(48px,8vw,96px)] text-white leading-[0.8]">
                  {g.year}
                </span>
                <div className="flex-1 h-[3px] bg-[repeating-linear-gradient(-45deg,var(--color-hazard)_0_9px,#000_9px_18px)]" />
              </div>
              <div className="grid grid-cols-2 max-[880px]:grid-cols-1 gap-6">
                {g.events.map((ev) => (
                  <EventCard2 ev={ev} key={ev.id} />
                ))}
              </div>
            </div>
          ))}
        </Container>
      </Section>
    </>
  );
}
