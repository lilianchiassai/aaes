import { Section, Container, TapeDivider } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { assetUrl } from "../lib/assets";

const Red = ({ children }: { children: React.ReactNode }) => (
  <span className="red">{children}</span>
);

export function Rules() {
  return (
    <>
      <section className="rules-hero" data-screen-label="Règles — En-tête">
        <img className="rules-hero__hand" src={assetUrl("hand-sil-yellow.png")} alt="" />
        <Container>
          <h1 className="font-display text-[clamp(54px,11vw,140px)] uppercase text-white leading-[0.82] mt-[6px] mb-4">
            Regles
          </h1>
          <p className="lead">
            Lisez attentivement avant de vous présenter. Le respect du règlement garantit une nuit
            réussie — pour les humains comme pour les zombies.
          </p>
        </Container>
      </section>

      <TapeDivider />

      <Section ground="concrete">
        <Container className="max-w-[880px]">
          <div className="rules-block">
            <h2>Presentation</h2>
            <ul className="rules-list">
              <li>
                Au cours d'un Zombie Survival, les participants sont confrontés à une invasion
                zombie.
              </li>
              <li>
                Livrés à eux-mêmes en pleine nuit, ils doivent se débrouiller pour survivre en
                effectuant de nombreuses missions et peut-être découvrir l'origine de{" "}
                <Red>l'invasion</Red>. Mais attention, chaque participant attrapé par un zombie
                change de camp pour traquer ses anciens amis…
              </li>
              <li>
                Angoissante pour les humains, exultante pour les zombies&nbsp;: soyez prêts à tout.
              </li>
            </ul>
          </div>

          <div className="rules-block">
            <h2>Deroulement</h2>
            <ul className="rules-list">
              <li>Arrivez 15 minutes avant l'heure de début prévue.</li>
              <li>
                Dès que la soirée est commencée, si un humain se fait attraper par un zombie, il est
                emmené au camp des zombies pour être <Red>maquillé</Red> et devenir à son tour un
                zombie.
              </li>
              <li>
                Des <Red>missions</Red> sont organisées tout au long de la soirée pour aider les
                humains à survivre.
              </li>
            </ul>
          </div>

          <div className="rules-block">
            <h2>Humains</h2>
            <ul className="rules-list">
              <li>
                Les humains sont <Red>libres</Red> (dans le cadre des règles).
              </li>
              <li>
                Les humains sont identifiés par les <Red>bracelets lumineux</Red> qu'ils doivent
                porter de manière visible.
              </li>
              <li>Les humains ne peuvent pas tuer les zombies.</li>
              <li>
                Les humains doivent réussir les missions proposées pour assurer leur{" "}
                <Red>survie</Red>.
              </li>
              <li>
                Si tenter de survivre s'avère trop stressant, les humains peuvent se laisser
                attraper.
              </li>
            </ul>
          </div>

          <div className="rules-block">
            <h2>Zombies</h2>
            <ul className="rules-list">
              <li>
                Le zombie est le stade <Red>supérieur</Red> de l'évolution humaine.
              </li>
              <li>Les zombies peuvent ouvrir les portes, grimper, etc.</li>
              <li>
                Les zombies <Red>marchent</Red> et ne courent pas.
              </li>
              <li>Les zombies n'utilisent pas de lampe.</li>
              <li>
                Les camps protégés, signalés par des marquages fluorescents, sont interdits aux
                zombies.
              </li>
            </ul>
          </div>

          <div className="rules-block">
            <h2>Materiel</h2>
            <ul className="rules-list">
              <li>
                Les participants amènent leur propre matériel&nbsp;: gants, vêtements de pluie,
                vêtements salissables, chaussures de sport, eau, sac à dos, etc.
              </li>
              <li>
                Les lampes à LED pouvant éblouir les participants sont interdites. Seules les{" "}
                <Red>lampes torches</Red> à filament non éblouissantes sont autorisées.
              </li>
            </ul>
          </div>

          <div className="rules-block">
            <h2>Regles importantes</h2>
            <ul className="rules-list">
              <li>
                L'<Red>équipe d'organisation</Red> ne souhaite qu'une chose&nbsp;: vous faire passer
                une soirée réussie. Elle a toujours raison, et il est primordial de la respecter.
                Elle peut changer les règles de la soirée à tout moment.
              </li>
              <li>
                Pour que chacun s'amuse, n'oubliez pas de rester <Red>fair play</Red> et de bonne
                humeur&nbsp;!
              </li>
              <li>Bien évidemment, armes, alcool et substances illicites sont interdits.</li>
            </ul>
          </div>

          <div className="rules-callout">
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
