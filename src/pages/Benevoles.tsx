import type { ReactNode } from "react";
import { Section, Container, TapeDivider } from "../components/ui/Section";
import { Button } from "../components/ui/Button";
import { PageHead } from "../components/ui/PageHead";

const Red = ({ children }: { children: ReactNode }) => (
  <span className="text-hazard font-normal">{children}</span>
);

/** Volunteer role: a single boxed card — hazard-tape heading, intro, and a
    chevron-bulleted list of responsibilities. */
function RoleCard({ title, lead, children }: { title: ReactNode; lead: ReactNode; children: ReactNode }) {
  return (
    <div className="mb-6 bg-[#0d0d0d] border border-hairline border-l-[3px] border-l-hazard shadow-hard px-[26px] py-[24px]">
      <h2 className="font-display text-[clamp(26px,3.4vw,40px)] uppercase text-white m-0 mb-[14px] flex items-center gap-[14px] before:content-[''] before:w-[34px] before:h-[34px] before:flex-none before:border-2 before:border-black before:bg-[repeating-linear-gradient(-45deg,var(--color-hazard)_0_6px,#000_6px_12px)]">
        {title}
      </h2>
      <p className="font-body text-2xl text-grey-100 leading-[1.6] m-0 mb-4">{lead}</p>
      <ul className="list-none m-0 p-0 flex flex-col gap-[10px]">{children}</ul>
    </div>
  );
}

/** Responsibility line: chevron bullet, no individual box. */
function RoleItem({ children }: { children: ReactNode }) {
  return (
    <li className="relative font-body text-2xl text-grey-100 leading-[1.55] pl-[30px] before:content-['☞'] before:absolute before:left-0 before:top-[2px] before:text-hazard before:text-2xl before:leading-[1.5]">
      {children}
    </li>
  );
}

export function Benevoles() {
  return (
    <>
      <PageHead title="Bénévoles" screenLabel="Bénévoles — En-tête" hands="right">
        Pas de Z Survival Night sans l'équipe dans l'ombre. Maquilleurs, PNJ, zombies
        de départ, sécu. Nous avons besoin de votre aide&nbsp;!
      </PageHead>

      <TapeDivider />

      <Section ground="concrete">
        <Container width="article">
          <div className="mb-8">
            <p className="font-display text-[clamp(28px,4vw,46px)] uppercase text-white leading-[0.95] m-0 mb-[16px]">
              Rejoignez l'équipe — <Red>écrivez-nous</Red>
            </p>
            <p className="font-body text-2xl text-grey-100 leading-[1.6] m-0 mb-[18px]">
              Envie de donner un coup de main&nbsp;? Dites-nous le rôle qui vous tente et on
              vous recontacte.
            </p>
            <Button variant="primary" href="mailto:asso.aaes@gmail.com">
              Contacte-nous à asso.aaes@gmail.com
            </Button>
          </div>

          <RoleCard
            title="Zombie de départ"
            lead={
              <>
                Vous commencez la nuit en <Red>zombie</Red> et lancez la machine&nbsp;: c'est vous
                qui attrapez les premiers humains et donnez le ton de la soirée.
              </>
            }
          >
            <RoleItem>
              Vous attrapez les humains pour <Red>lancer la partie</Red> et entretenir la pression
              toute la nuit.
            </RoleItem>
            <RoleItem>
              Vous <Red>encadrez les nouveaux zombies</Red> — les joueurs qui viennent de se faire
              attraper — et leur transmettez les bons réflexes.
            </RoleItem>
            <RoleItem>
              Vous <Red>coordonnez avec les maîtres du jeu</Red> pour amener les zombies au bon
              endroit, au bon moment, selon le scénario.
            </RoleItem>
            <RoleItem>
              Vous aidez à faire vivre le <Red>camp des zombies</Red> et à le garder en ordre.
            </RoleItem>
          </RoleCard>

          <RoleCard
            title="Sécurité"
            lead={
              <>
                Votre mission&nbsp;: que tout le monde reste <Red>en sécurité</Red> et que la nuit
                se passe bien, du début à la fin.
              </>
            }
          >
            <RoleItem>
              Vous veillez à la <Red>sécurité de tous</Red>.
            </RoleItem>
            <RoleItem>
              Vous gérez les <Red>comportements problématiques</Red> et désamorcez les situations
              qui dérapent.
            </RoleItem>
            <RoleItem>
              Vous faites <Red>respecter le règlement</Red>&nbsp;: pas d'alcool, pas de musique
              sonorisée, pas de lampes LED puissantes, pas de zombies qui courent, et personne ne
              joue en dehors des limites du terrain.
            </RoleItem>
          </RoleCard>

          <RoleCard
            title="Maquillage"
            lead={
              <>
                C'est vous qui transformez les vivants en morts&nbsp;: chaque humain attrapé passe
                entre vos mains pour devenir un <Red>vrai zombie</Red>.
              </>
            }
          >
            <RoleItem>
              Vous <Red>maquillez les joueurs en zombies</Red> tout au long de la nuit, au camp
              zombie.
            </RoleItem>
            <RoleItem>
              Le <Red>matériel de maquillage est fourni et pris en charge</Red> par l'association —
              vous n'avancez rien.
            </RoleItem>
          </RoleCard>

          <RoleCard
            title="PNJ"
            lead={
              <>
                Vous incarnez un <Red>personnage non joueur</Red> — un humain de l'histoire — et
                vous faites partie intégrante du scénario.
              </>
            }
          >
            <RoleItem>
              Vous <Red>jouez un rôle</Red> et guidez les joueurs dans leurs missions.
            </RoleItem>
            <RoleItem>
              Vous faites avancer la <Red>trame narrative</Red> de la soirée.
            </RoleItem>
          </RoleCard>

          <div className="mt-[34px]">
            <p className="font-display text-[clamp(30px,4.4vw,52px)] uppercase text-white leading-[0.95] m-0 mb-[18px]">
              Envie de rejoindre l'équipe&nbsp;?
            </p>
            <Button variant="primary" href="mailto:asso.aaes@gmail.com">
              Contacte-nous à asso.aaes@gmail.com
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
