import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Section, Container, SectionTitle, TapeDivider } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { FactsStrip, Fact } from "../components/ui/Fact";
import { Lightbox } from "../components/ui/Lightbox";
import { Lead } from "../components/ui/Lead";
import { QuoteCard } from "../components/ui/QuoteCard";
import { Kicker } from "../components/ui/Kicker";
import { FilmImg } from "../components/ui/FilmImg";
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
      <section
        className="relative overflow-hidden bg-[#070707] pt-[66px] pb-[52px]"
        data-screen-label="Événement — En-tête"
      >
        <div className="absolute inset-0 opacity-[0.22]">
          <FilmImg src={photoUrl(ev.photos[0])} alt="" className="contrast-[1.25]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55),#070707)]" />
        <Container className="relative">
          <Button
            variant="ghost"
            to="/evenements"
            className="!border-0 !p-0 !shadow-none !bg-transparent font-cond text-sm tracking-[0.12em]"
          >
            ← Tous les événements
          </Button>
          <div className="mt-[18px] text-hazard">{ev.kicker}</div>
          <h1 className="font-display text-[clamp(46px,8vw,104px)] uppercase text-white leading-[0.84] mt-2 mb-[10px]">
            {ev.name}
          </h1>
          <Kicker size="sm" className="tracking-[0.18em]">{ev.dateLong}</Kicker>
          <Lead className="mt-[6px]">{ev.loc}</Lead>
        </Container>
      </section>

      <TapeDivider />

      {/* ===== BODY ===== */}
      <Section ground="concrete">
        <Container className="max-w-[1000px]">
          <FactsStrip className="mb-2">
            <Fact k="Participants" v={ev.participants} tone="hazard" />
            <Fact k="Survivants" v={ev.survivors} />
            <Fact k="Lieu" v={ev.loc} size="sm" />
            <Fact k="Date" v={ev.dateShort} size="sm" />
          </FactsStrip>

          <div className="text-base mt-[14px] mb-[30px]">
            <b className="text-hazard font-cond tracking-[0.1em] uppercase text-sm">
              Le fait marquant —{" "}
            </b>
            <span className="font-body text-grey-100">{ev.fact}</span>
          </div>

          <Lead className="mb-2">{ev.blurb}</Lead>
        </Container>
      </Section>

      {/* ===== RÉCITS / QUOTES ===== */}
      {ev.quotes.length > 0 && (
        <Section ground="concrete" className="!pt-0">
          <Container className="max-w-[1000px]">
            <SectionTitle className="mb-[28px]">
              Ils <em>y étaient</em>
            </SectionTitle>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(290px,1fr))] gap-[18px]">
              {ev.quotes.map((q, i) => (
                <QuoteCard key={i} variant="card" text={q.text} author={q.author} />
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
            <div className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-2">
              {ev.photos.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setLightbox(photoUrl(p))}
                  aria-label="Agrandir la photo"
                  className="group relative block aspect-square overflow-hidden border border-[#1c1c1c] p-0 cursor-pointer bg-black"
                >
                  <FilmImg
                    src={photoUrl(p)}
                    alt=""
                    className="contrast-[1.15] transition-[transform,filter] duration-300 group-hover:scale-[1.06] group-hover:grayscale-[0.3] group-hover:contrast-[1.25]"
                  />
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
