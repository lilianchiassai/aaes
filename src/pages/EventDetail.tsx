import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Section, Container, SectionTitle, TapeDivider } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { FactsStrip, Fact } from "../components/ui/Fact";
import { Lightbox } from "../components/ui/Lightbox";
import { getEvent } from "../data/events";
import { photoUrl } from "../lib/assets";

export function EventDetail() {
  const { id } = useParams();
  const ev = getEvent(id);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    if (ev) document.title = `${ev.name} — Z Survival Night · AAES`;
  }, [ev]);

  if (!ev) {
    return (
      <Section ground="concrete">
        <Container>
          <SectionTitle>Événement introuvable</SectionTitle>
          <Button variant="ghost" to="/evenements" className="mt-6">
            ← Tous les événements
          </Button>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="edhero" data-screen-label="Événement — En-tête">
        <div className="edhero__bg">
          <img src={photoUrl(ev.photos[0])} alt="" />
        </div>
        <div className="edhero__scrim" />
        <Container>
          <Button variant="ghost" to="/evenements" className="edhero__back !border-0 !p-0 !shadow-none !bg-transparent">
            ← Tous les événements
          </Button>
          <div className="edhero__kicker section__kick mt-[18px] text-hazard">{ev.kicker}</div>
          <h1 className="edhero__name">{ev.name}</h1>
          <div className="edhero__date mt-0">{ev.dateLong}</div>
          <div className="lead text-[17px] mt-[6px]">{ev.loc}</div>
        </Container>
      </section>

      <TapeDivider />

      {/* ===== BODY ===== */}
      <Section ground="concrete">
        <Container className="max-w-[1000px]">
          <FactsStrip className="edstats">
            <Fact k="Participants" v={ev.participants} tone="hazard" />
            <Fact k="Survivants" v={ev.survivors} />
            <Fact k="Lieu" v={ev.loc} size="sm" />
            <Fact k="Date" v={ev.dateShort} size="sm" />
          </FactsStrip>

          <div className="text-[16px] mt-[14px] mb-[30px]">
            <b className="text-hazard font-cond tracking-[0.1em] uppercase text-[13px]">
              Le fait marquant —{" "}
            </b>
            <span className="font-body text-grey-100">{ev.fact}</span>
          </div>

          <p className="lead mb-2">{ev.blurb}</p>
        </Container>
      </Section>

      {/* ===== RÉCITS / QUOTES ===== */}
      {ev.quotes.length > 0 && (
        <Section ground="concrete" className="!pt-0">
          <Container className="max-w-[1000px]">
            <SectionTitle className="mb-[28px]">
              Ils <em>y étaient</em>
            </SectionTitle>
            <div className="edquotes">
              {ev.quotes.map((q, i) => (
                <div className="qcard" key={i}>
                  <p>“{q.text}”</p>
                  <cite>— {q.author}</cite>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ===== GALERIE ===== */}
      {ev.photos.length > 0 && (
        <Section ground="concrete" className="!pt-0">
          <Container className="max-w-[1000px]">
            <SectionTitle className="mb-[28px]">
              La <em>galerie</em>
            </SectionTitle>
            <div className="egallery">
              {ev.photos.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setLightbox(photoUrl(p))}
                  aria-label="Agrandir la photo"
                >
                  <img src={photoUrl(p)} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* ===== ACTIONS ===== */}
      <Section ground="concrete" className="!pt-0">
        <Container className="max-w-[1000px]">
          <div className="flex gap-4 flex-wrap">
            <Button variant="ghost" to="/evenements">
              ← Autres événements
            </Button>
            <Button variant="cyan" to="/inscription">
              S'inscrire à l'édition 2026
            </Button>
          </div>
        </Container>
      </Section>

      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}
