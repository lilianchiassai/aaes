/* ============================================================
   AAES — "Comment se déroule la nuit" timeline stages
   Ported from the inline STAGES script in index.html. Each stage
   tracks the human/zombie ratio (drives the crowd of SVG figures
   and the blood-splatter intensity) plus a gauge colour.
   ============================================================ */

export interface TimelineStage {
  /** Two-digit stage number, e.g. "01". */
  n: string;
  title: string;
  /** Number of human figures to render in the crowd. */
  human: number;
  /** Number of zombie figures to render in the crowd. */
  zombie: number;
  bullets: string[];
  /** Optional dramatic closing line (no bullet, centered, larger). */
  closer?: string;
  /** Gauge / tab colour for this stage. */
  color: string;
}

export const STAGES: TimelineStage[] = [
  {
    n: "01",
    title: "Arrivée",
    human: 10,
    zombie: 0,
    color: "#f5e000",
    bullets: [
      "Vous venez préparé à crapahuter dans les bois",
      "On vérifie votre inscription",
      "On vous remet votre panier-repas",
      "Votre bracelet lumineux : la preuve que vous êtes humain",
    ],
  },
  {
    n: "02",
    title: "L'invasion",
    human: 9,
    zombie: 1,
    color: "#c6cf33",
    bullets: [
      "À la nuit tombée, les zombies entrent en jeu",
      "Ils marchent, grimpent, ouvrent les portes",
      "Ils ne courent jamais, n'ont pas de lampe",
    ],
  },
  {
    n: "03",
    title: "Le scénario",
    human: 6,
    zombie: 4,
    color: "#3fc6a6",
    bullets: [
      "Vous rejoignez une équipe, avec son camp interdit aux zombies",
      "Chaque équipe a ses propres missions et un scénario à découvrir au fil de la nuit",
      "Plusieurs façons de l'emporter : concocter un remède, sauver les siens, s'échapper ou tenir jusqu'au bout…",
    ],
  },
  {
    n: "04",
    title: "La contamination",
    human: 3,
    zombie: 7,
    color: "#0e7790",
    bullets: [
      "Touché par un zombie ? Vous changez de camp et retirez votre bracelet lumineux",
      "Direction le camp zombie pour vous faire maquiller",
      "Vous traquez à votre tour vos anciens amis",
    ],
  },
  {
    n: "05",
    title: "La fin",
    human: 1,
    zombie: 9,
    color: "#1fa6cf",
    bullets: [
      "La partie s'achève quand les survivants trouvent un remède…",
      "… une échappatoire …",
      "… ou qu'ils sont tous morts",
    ],
    closer: "Bonne chance",
  },
];
