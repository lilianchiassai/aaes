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
      "On vous remet votre bracelet lumineux",
      "Vérification de votre inscription",
      "Remise de votre panier-repas",
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
    title: "Les missions",
    human: 6,
    zombie: 4,
    color: "#3fc6a6",
    bullets: [
      "Percez l'origine de l'épidémie",
      "Trouvez un remède",
      "Trouvez comment vous échapper",
      "Protégez vos camps : marquages fluo, interdits aux zombies",
    ],
  },
  {
    n: "04",
    title: "La contamination",
    human: 3,
    zombie: 7,
    color: "#0e7790",
    bullets: [
      "Vous changez de camp",
      "Direction le camp zombie pour être maquillé",
      "Vous traquez à votre tour vos anciens amis",
    ],
  },
  {
    n: "05",
    title: "La survie",
    human: 1,
    zombie: 9,
    color: "#1fa6cf",
    bullets: [
      "La partie s'achève quand les humains trouvent un remède…",
      "… une échappatoire …",
      "… ou qu'ils sont tous tombés",
      "Bonne chance.",
    ],
  },
];
