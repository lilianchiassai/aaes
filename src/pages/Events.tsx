import { Section, Container, SectionHead, SectionTitle, TapeDivider } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { EventCard2 } from "../components/events/EventCard2";
import { eventsByYear } from "../data/events";
import { UPCOMING } from "../data/site";

export function Events() {
  const groups = eventsByYear();

  return (
    <>
      <section className="pagehead py-[60px] bg-[#070707]" data-screen-label="Événements — En-tête">
        <Container>
          <h1>Evenements</h1>
          <p className="lead">
            De la Vallée des Jardins au Parc du Biez, retour sur les nuits où l'AAES a lâché la
            horde — et l'édition qui marque le grand retour. Cliquez une édition pour ses photos et
            les témoignages des participants.
          </p>
        </Container>
      </section>

      <TapeDivider />

      <Section ground="concrete">
        <Container>
          {/* ===== FEATURED 2026 (cyan) ===== */}
          <div className="feat" data-screen-label="Événements — 2026 à venir">
            <div className="feat__head">
              <div className="feat__txt">
                <div className="feat__date">À venir · Samedi 12 septembre 2026 · 20h00</div>
                <div className="feat__name">
                  Z Survival Night
                  <br />
                  2026
                </div>
                <p className="feat__blurb">{UPCOMING.featuredBlurb}</p>
                <div className="mt-5 flex gap-[14px] flex-wrap">
                  <Button variant="primary" to="/inscription">
                    S'inscrire · 15 €
                  </Button>
                  <Button variant="ghost" to="/regles">
                    Lire les règles
                  </Button>
                </div>
              </div>
              <div className="feat__recap">
                <div className="recap__row">
                  <span className="recap__n text-cyan">15 €</span>
                  <span className="recap__l">L'inscription</span>
                </div>
                <div className="recap__row">
                  <span className="recap__n text-cyan">+16</span>
                  <span className="recap__l">Âge minimum</span>
                </div>
                <div className="recap__row">
                  <span className="recap__n text-cyan">+3h</span>
                  <span className="recap__l">De jeu, en pleine nuit</span>
                </div>
                <div className="recap__row">
                  <span className="recap__n text-cyan text-[22px]">Parc du Biez</span>
                  <span className="recap__l">Mondeville</span>
                </div>
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
            <div className="yeargroup" key={g.year}>
              <div className="yeargroup__head">
                <span className="yeargroup__yr">{g.year}</span>
                <div className="yeargroup__rule" />
              </div>
              <div className="pcards2">
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
