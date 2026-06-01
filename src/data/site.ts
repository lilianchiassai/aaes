/* ============================================================
   AAES — Z Survival Night · upcoming edition + site config
   These values were hardcoded across index/evenements/inscription
   in the prototype; lifted here so there is one source of truth.
   ============================================================ */

export interface UpcomingEdition {
  kicker: string;
  title: string;
  /** ISO target that drives the hero countdown. */
  countdownTarget: string;
  dateLong: string;
  dateShort: string;
  time: string;
  location: string;
  city: string;
  postalCode: string;
  durationLabel: string;
  participantsLabel: string;
  ageLabel: string;
  priceLabel: string;
  heroBlurb: string;
  featuredBlurb: string;
}

export const UPCOMING: UpcomingEdition = {
  kicker: "L'AAES présente · Édition 2026",
  title: "Z Survival Night",
  countdownTarget: "2026-09-12T20:00:00",
  dateLong: "Sam. 12 Septembre 2026 · 20h00",
  dateShort: "Sam. 12 sept.",
  time: "20h00",
  location: "Parc du Biez",
  city: "Mondeville",
  postalCode: "14120",
  durationLabel: "+3 heures",
  participantsLabel: "100 participants",
  ageLabel: "+16 ans",
  priceLabel: "15 €",
  heroBlurb:
    "Sept ans après la dernière contamination, l'AAES rouvre le périmètre. Dressez-vous face à l'invasion : trois heures de jeu de rôle grandeur nature, en pleine nuit, au Parc du Biez à Mondeville. Réussissez les missions, restez dans la lumière et percez l'origine de l'infection… ou laissez-vous attraper et rejoignez la horde.",
  featuredBlurb:
    "Après 7 ans, l'infection regagne le Parc du Biez à Mondeville. Trois heures de jeu de rôle grandeur nature en pleine nuit : survivez aux missions ou rejoignez la horde. Places limitées — l'inscription est ouverte.",
};

export const siteConfig = {
  mapsUrl: "https://maps.app.goo.gl/GLzU4qhYdh8LCHRG8",
  helloAssoWidget:
    "https://www.helloasso.com/associations/amicale-des-amateurs-d-excursions-scenarisees-aaes/evenements/z-survival-night-12-septembre-2026-1/widget",
  associationName: "Amicale des Amateurs d'Excursions Scénarisées",
};
