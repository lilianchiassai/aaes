import type { ReactNode } from "react";
import { Section, Container, TapeDivider } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { PageHead } from "../components/ui/PageHead";
import { assetUrl } from "../lib/assets";

const Red = ({ children }: { children: ReactNode }) => (
  <span className="text-hazard font-normal">{children}</span>
);

/** About section: display heading with a hazard-tape marker box + free content. */
function AboutBlock({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-[clamp(26px,3.4vw,40px)] uppercase text-white m-0 mb-[18px] flex items-center gap-[14px] before:content-[''] before:w-[34px] before:h-[34px] before:flex-none before:border-2 before:border-black before:bg-[repeating-linear-gradient(-45deg,var(--color-hazard)_0_6px,#000_6px_12px)]">
        {title}
      </h2>
      <div className="font-body text-2xl text-grey-100 leading-[1.6] flex flex-col gap-4">
        {children}
      </div>
    </div>
  );
}

export function About() {
  return (
    <>
      <PageHead title="À propos" screenLabel="À propos — En-tête" image={assetUrl("hand-sil-yellow.png")}>
        L'AAES — l'Amicale des Amateurs d'Excursions Scénarisées. Une bande de copains, une
        invasion zombie, et l'envie de remettre ça.
      </PageHead>

      <TapeDivider />

      <Section ground="concrete">
        <Container width="article">
          <AboutBlock title="Qui sommes-nous">
            <p>
              L'AAES est une <Red>association loi 1901</Red>, à but non lucratif. Tout ce qu'on
              récolte repart dans la prochaine soirée.
            </p>
            <p>
              Au début, ce n'était qu'une <Red>soirée zombie entre amis</Red>. On s'est bien
              amusés. Alors on a recommencé. Et de bouche à oreille, c'est devenu de plus en plus
              gros.
            </p>
          </AboutBlock>

          <AboutBlock title="Comment ça a grandi">
            <p>
              Les scénarios sont devenus de plus en plus <Red>fous</Red>, les nuits de plus en plus
              longues, les missions de plus en plus tordues. On est passés d'une soirée à{" "}
              <Red>plusieurs événements par an</Red>.
            </p>
          </AboutBlock>

          <AboutBlock title="Notre philosophie">
            <p>Deux règles simples, et on n'en démord pas&nbsp;:</p>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              <li className="relative bg-[#0d0d0d] border border-hairline border-l-[3px] border-l-hazard pl-[46px] pr-[18px] py-[14px] before:content-['☞'] before:absolute before:left-4 before:top-[13px] before:text-hazard before:text-2xl before:leading-[1.5]">
                <Red>Accessible</Red> — un tarif qui reste à la portée de tout le monde.
              </li>
              <li className="relative bg-[#0d0d0d] border border-hairline border-l-[3px] border-l-hazard pl-[46px] pr-[18px] py-[14px] before:content-['☞'] before:absolute before:left-4 before:top-[13px] before:text-hazard before:text-2xl before:leading-[1.5]">
                <Red>Simple</Red> — venez comme vous êtes. Des règles claires, une bonne ambiance, une
                nuit qu'on n'oublie pas.
              </li>
            </ul>
          </AboutBlock>

          <AboutBlock title="Ce qu'on aime">
            <p>
              Le moment où les lumières s'éteignent. Les cris dans le noir. Les inconnus qui
              deviennent une équipe le temps d'une nuit. Le maquillage qui dégouline. Et surtout,
              tous ces gens qui repartent avec une <Red>histoire à raconter</Red>.
            </p>
          </AboutBlock>

          <AboutBlock title="Pourquoi on s'était arrêtés">
            <p>
              Le Covid, d'abord, qui a tout mis en pause. Puis la <Red>vie</Red> — les boulots, les
              déménagements, les agendas qui ne collent plus. On a rangé le maquillage et les
              bracelets lumineux dans un carton.
            </p>
          </AboutBlock>

          <AboutBlock title="Pourquoi on recommence">
            <p>
              Parce que le carton nous faisait de l'œil. Parce que ça nous manquait. Parce
              que… <Red>pourquoi pas&nbsp;?</Red>
            </p>
          </AboutBlock>

          <div className="bg-hazard text-black px-[26px] py-[22px] border-2 border-black shadow-hard font-cond font-semibold uppercase tracking-[0.04em] text-lg leading-[1.4]">
            ☞ Nous contacter —{" "}
            <a href="mailto:asso.aaes@gmail.com" className="underline">
              asso.aaes@gmail.com
            </a>
          </div>

          <div className="mt-[34px] flex gap-4 flex-wrap">
            <Button variant="cyan" to="/inscription">
              Rejoindre la prochaine nuit
            </Button>
            <Button variant="ghost" to="/">
              Retour à l'accueil
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
