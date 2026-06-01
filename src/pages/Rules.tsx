import type { ReactNode } from "react";
import { Section, Container, TapeDivider } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { PageHead } from "../components/ui/PageHead";
import { assetUrl } from "../lib/assets";

const Red = ({ children }: { children: ReactNode }) => (
  <span className="text-hazard font-normal">{children}</span>
);

/** Rule section: display heading with a hazard-tape marker box. */
function RuleBlock({ title, children }: { title: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-10">
      <h2 className="font-display text-[clamp(26px,3.4vw,40px)] uppercase text-white m-0 mb-[18px] flex items-center gap-[14px] before:content-[''] before:w-[34px] before:h-[34px] before:flex-none before:border-2 before:border-black before:bg-[repeating-linear-gradient(-45deg,var(--color-hazard)_0_6px,#000_6px_12px)]">
        {title}
      </h2>
      <ul className="list-none m-0 p-0 flex flex-col gap-3">{children}</ul>
    </div>
  );
}

/** Rule line: chevron-bulleted card with a hazard left border. */
function RuleItem({ children }: { children: ReactNode }) {
  return (
    <li className="relative font-body text-lg text-grey-100 leading-[1.55] bg-[#0d0d0d] border border-hairline border-l-[3px] border-l-hazard pl-[46px] pr-[18px] py-[14px] before:content-['☞'] before:absolute before:left-4 before:top-[13px] before:text-hazard before:text-lg before:leading-[1.5]">
      {children}
    </li>
  );
}

export function Rules() {
  return (
    <>
      <PageHead title="Regles" screenLabel="Règles — En-tête" image={assetUrl("hand-sil-yellow.png")}>
        Lisez attentivement avant de vous présenter. Le respect du règlement garantit une nuit
        réussie — pour les humains comme pour les zombies.
      </PageHead>

      <TapeDivider />

      <Section ground="concrete">
        <Container className="max-w-[880px]">
          <RuleBlock title="Presentation">
            <RuleItem>
              Au cours d'un Zombie Survival, les participants sont confrontés à une invasion zombie.
            </RuleItem>
            <RuleItem>
              Livrés à eux-mêmes en pleine nuit, ils doivent se débrouiller pour survivre en
              effectuant de nombreuses missions et peut-être découvrir l'origine de{" "}
              <Red>l'invasion</Red>. Mais attention, chaque participant attrapé par un zombie change
              de camp pour traquer ses anciens amis…
            </RuleItem>
            <RuleItem>
              Angoissante pour les humains, exultante pour les zombies&nbsp;: soyez prêts à tout.
            </RuleItem>
          </RuleBlock>

          <RuleBlock title="Deroulement">
            <RuleItem>Arrivez 15 minutes avant l'heure de début prévue.</RuleItem>
            <RuleItem>
              Dès que la soirée est commencée, si un humain se fait attraper par un zombie, il est
              emmené au camp des zombies pour être <Red>maquillé</Red> et devenir à son tour un
              zombie.
            </RuleItem>
            <RuleItem>
              Des <Red>missions</Red> sont organisées tout au long de la soirée pour aider les
              humains à survivre.
            </RuleItem>
          </RuleBlock>

          <RuleBlock title="Humains">
            <RuleItem>
              Les humains sont <Red>libres</Red> (dans le cadre des règles).
            </RuleItem>
            <RuleItem>
              Les humains sont identifiés par les <Red>bracelets lumineux</Red> qu'ils doivent
              porter de manière visible.
            </RuleItem>
            <RuleItem>Les humains ne peuvent pas tuer les zombies.</RuleItem>
            <RuleItem>
              Les humains doivent réussir les missions proposées pour assurer leur <Red>survie</Red>.
            </RuleItem>
            <RuleItem>
              Si tenter de survivre s'avère trop stressant, les humains peuvent se laisser attraper.
            </RuleItem>
          </RuleBlock>

          <RuleBlock title="Zombies">
            <RuleItem>
              Le zombie est le stade <Red>supérieur</Red> de l'évolution humaine.
            </RuleItem>
            <RuleItem>Les zombies peuvent ouvrir les portes, grimper, etc.</RuleItem>
            <RuleItem>
              Les zombies <Red>marchent</Red> et ne courent pas.
            </RuleItem>
            <RuleItem>Les zombies n'utilisent pas de lampe.</RuleItem>
            <RuleItem>
              Les camps protégés, signalés par des marquages fluorescents, sont interdits aux
              zombies.
            </RuleItem>
          </RuleBlock>

          <RuleBlock title="Materiel">
            <RuleItem>
              Les participants amènent leur propre matériel&nbsp;: gants, vêtements de pluie,
              vêtements salissables, chaussures de sport, eau, sac à dos, etc.
            </RuleItem>
            <RuleItem>
              Les lampes à LED pouvant éblouir les participants sont interdites. Seules les{" "}
              <Red>lampes torches</Red> à filament non éblouissantes sont autorisées.
            </RuleItem>
          </RuleBlock>

          <RuleBlock title="Regles importantes">
            <RuleItem>
              L'<Red>équipe d'organisation</Red> ne souhaite qu'une chose&nbsp;: vous faire passer
              une soirée réussie. Elle a toujours raison, et il est primordial de la respecter. Elle
              peut changer les règles de la soirée à tout moment.
            </RuleItem>
            <RuleItem>
              Pour que chacun s'amuse, n'oubliez pas de rester <Red>fair play</Red> et de bonne
              humeur&nbsp;!
            </RuleItem>
            <RuleItem>
              Bien évidemment, armes, alcool et substances illicites sont interdits.
            </RuleItem>
          </RuleBlock>

          <div className="bg-hazard text-black px-[26px] py-[22px] border-2 border-black shadow-hard font-cond font-semibold uppercase tracking-[0.04em] text-lg leading-[1.4]">
            ☞ Tout est sous contrôle. Rendez-vous le 12 septembre 2026, 20h, au Parc du Biez.
          </div>

          <div className="mt-[34px] flex gap-4 flex-wrap">
            <Button variant="cyan" to="/inscription">
              J'ai lu — Je m'inscris
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
