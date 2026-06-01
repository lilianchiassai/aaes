/* ============================================================
   AAES — Z Survival Night · past-event data
   Ported from the prototype's js/events-data.js (window.ZEVENTS).
   Counts are kept as strings to match the prototype's rendering
   (survivors === "1" drives "Survivant" vs "Survivants").
   ============================================================ */

export interface Quote {
  text: string;
  author: string;
}

export interface ZEvent {
  /** URL key, e.g. "2019-zsn" — used by /event/:id */
  id: string;
  name: string;
  kicker: string;
  /** Short date; holds the year. The list view groups editions via /20\d\d/. */
  dateShort: string;
  dateLong: string;
  loc: string;
  participants: string;
  survivors: string;
  fact: string;
  blurb: string;
  /** Optional YouTube id — when present, the list card becomes a video facade. */
  trailer?: string;
  quotes: Quote[];
  /** Bare photo filenames (no path/extension) → resolved via photoUrl(). */
  photos: string[];
}

export const ZEVENTS: ZEvent[] = [
  {
    id: "2019-zsn",
    name: "Z Survival Night",
    kicker: "Édition 2019",
    dateShort: "29 Juin 2019",
    dateLong: "Samedi 29 juin 2019 · 21h",
    loc: "Parc du Biez, Mondeville",
    participants: "200",
    survivors: "1",
    fact: "Un seul humain a vu le lever du soleil.",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.",
    quotes: [
      {
        text: "On a tenu jusqu'à 1h du matin, puis ils ont défoncé le camp nord. Je n'ai jamais couru aussi vite de ma vie.",
        author: "Margaux · survivante",
      },
      {
        text: "Devenir zombie, c'est presque mieux : tu marches lentement vers tes potes et tu les regardes paniquer.",
        author: "Thomas · contaminé à 23h40",
      },
      {
        text: "200 personnes dans le noir complet, des cris partout… ambiance absolument incroyable.",
        author: "Léa · première participation",
      },
    ],
    photos: ["2019-1", "2019-2", "2019-3", "2019-4", "2019-5", "2019-6", "2019-7", "2019-8"],
  },
  {
    id: "2019-zlanta",
    name: "Z-Lanta",
    kicker: "Festival Les Interludes · 2019",
    dateShort: "8 Juin 2019",
    dateLong: "Samedi 8 juin 2019",
    loc: "Festival Les Interludes",
    participants: "80",
    survivors: "0",
    fact: "Aucune équipe n'a survécu au montage final.",
    blurb:
      "Vous avez accepté de participer à la toute nouvelle émission de télé-réalité : Z-Lanta. Vous vous retrouvez sur cette île, avec votre équipe, vos adversaires, des morts-vivants, l'équipe de production et les militaires qui gèrent la sécurité. Cependant… tout ne se passe pas comme prévu. Mais même si la situation dégénère, le tournage continue. Arriverez-vous à survivre à cette nuit, ou rejoindrez-vous l'armée des morts ? Quoi qu'il arrive, et quel que soit votre camp… the show must go on. Survivez, ou mourez.",
    quotes: [
      {
        text: "« The show must go on » — on répétait ça en boucle pendant que tout partait en vrille.",
        author: "Hugo · candidat",
      },
      {
        text: "Les militaires, les morts-vivants, la prod… on ne savait plus qui jouait quoi. Génial.",
        author: "Inès · équipe rouge",
      },
    ],
    photos: ["2019-5", "2019-6", "2019-7", "2019-8", "home-1", "home-2"],
  },
  {
    id: "2018-zsn",
    name: "Z Survival Night",
    kicker: "Édition 2018 · 2 nuits",
    dateShort: "2018",
    dateLong: "30 juin & 8 septembre 2018",
    loc: "Parc du Biez, Mondeville",
    participants: "150",
    survivors: "1",
    fact: "Deux nuits, deux invasions — un seul survivant à chaque édition.",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Deux dates, deux ambiances, le même Parc du Biez livré aux morts.",
    quotes: [
      {
        text: "La première date était humide et brumeuse, la seconde glaciale. Deux nuits totalement différentes.",
        author: "Camille · bénévole",
      },
      {
        text: "J'ai survécu en juin, je me suis fait avoir en septembre. 0 regret.",
        author: "Yanis · 2 éditions",
      },
    ],
    photos: ["2018-1", "2018-2", "2018-3", "2018-4", "2018-5", "2018-6", "2018-7", "2018-8"],
  },
  {
    id: "2018-interludes",
    name: "Festival Interludes",
    kicker: "Édition 2018",
    dateShort: "16 Juin 2018",
    dateLong: "Samedi 16 juin 2018",
    loc: "Festival Interludes",
    participants: "80",
    survivors: "0",
    fact: "Trois scénarios courts enchaînés dans la même nuit.",
    trailer: "ayT6cJZ1wlM",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    quotes: [
      {
        text: "Format court, rythme dingue : à peine fini un scénario qu'on était relancés dans le suivant.",
        author: "Sarah · joueuse",
      },
    ],
    photos: ["2018-5", "2018-6", "2018-7", "2018-8", "home-3"],
  },
  {
    id: "2017-zsn",
    name: "Z Survival Night",
    kicker: "Première édition · 2017",
    dateShort: "24 Juin 2017",
    dateLong: "Samedi 24 juin 2017",
    loc: "Vallée des Jardins, Caen",
    participants: "300",
    survivors: "0",
    fact: "La toute première — et déjà 300 âmes lâchées dans la nuit.",
    blurb:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. La nuit fondatrice de l'AAES : tout a commencé ici, dans la Vallée des Jardins, devant une foule qui ne se doutait de rien.",
    quotes: [
      {
        text: "Personne ne savait à quoi s'attendre. Au bout de 20 minutes, c'était la débandade totale.",
        author: "Maxime · de la première heure",
      },
      {
        text: "300 personnes pour une première… on a tout de suite su qu'on remettrait ça.",
        author: "Organisation AAES",
      },
    ],
    photos: ["2017-1", "2017-2", "2017-3", "2017-4", "2017-5", "2017-6"],
  },
];

/** Look up a single edition by id (falls back to the first). */
export function getEvent(id: string | undefined): ZEvent | undefined {
  if (!id) return ZEVENTS[0];
  return ZEVENTS.find((e) => e.id === id) ?? ZEVENTS[0];
}

/** Pluralise the survivors label the way the prototype does. */
export function survivorsLabel(survivors: string): string {
  return survivors === "1" ? "Survivant" : "Survivants";
}

/** Extract the grouping year from dateShort (the prototype uses /20\d\d/). */
export function yearOf(ev: ZEvent): string {
  const m = ev.dateShort.match(/(20\d\d)/);
  return m ? m[1] : ev.dateShort;
}

/** Editions grouped by year, preserving source order. */
export function eventsByYear(list: ZEvent[] = ZEVENTS): { year: string; events: ZEvent[] }[] {
  const order: string[] = [];
  const byYear: Record<string, ZEvent[]> = {};
  for (const ev of list) {
    const y = yearOf(ev);
    if (!byYear[y]) {
      byYear[y] = [];
      order.push(y);
    }
    byYear[y].push(ev);
  }
  return order.map((year) => ({ year, events: byYear[year] }));
}
