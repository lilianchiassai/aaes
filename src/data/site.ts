/* ============================================================
   AAES — Z Survival Night · upcoming edition + site config
   These values were hardcoded across index/evenements/inscription
   in the prototype; lifted here so there is one source of truth.
   ============================================================ */

/** A venue + its map, reusable by any edition (drives <LocationBlock />). */
export interface EventLocation {
  /** Venue name, e.g. "Parc du Biez". */
  venue: string;
  city: string;
  postalCode?: string;
  /** Paragraph shown under the venue name (directions, parking, etc.). */
  addressNote: string;
  /** Link target for the "open in Google Maps" button. */
  mapsUrl: string;
  /** Keyless Google Maps embed URL for the <iframe> (q=…&output=embed). */
  mapsEmbedUrl: string;
}

export interface UpcomingEdition {
  kicker: string;
  title: string;
  /** ISO target that drives the hero countdown. */
  countdownTarget: string;
  dateLong: string;
  dateShort: string;
  time: string;
  location: EventLocation;
  durationLabel: string;
  participantsLabel: string;
  ageLabel: string;
  priceLabel: string;
  /** ISO timestamp when registration opens; before it the locked panel shows. */
  inscriptionOpenAt: string;
  /** Human label for the opening date, e.g. "1er juillet 2026". */
  inscriptionOpenLabel: string;
  heroBlurb: string;
  featuredBlurb: string;
}

const PARC_DU_BIEZ: EventLocation = {
  venue: "Parc du Biez",
  city: "Mondeville",
  postalCode: "14120",
  addressNote:
    "Mondeville (14120). Rendez-vous à l'entrée du parc dès 19h45. Stationnement à proximité — venez équipés pour la boue et la nuit.",
  mapsUrl: "https://maps.app.goo.gl/GLzU4qhYdh8LCHRG8",
  mapsEmbedUrl: "https://www.google.com/maps?q=Parc+du+Biez,+Mondeville+14120&output=embed",
};

export const UPCOMING: UpcomingEdition = {
  kicker: "L'AAES présente · Édition 2026",
  title: "Z Survival Night",
  countdownTarget: "2026-09-12T20:00:00",
  dateLong: "Sam. 12 Septembre 2026 · 20h00",
  dateShort: "Sam. 12 sept.",
  time: "20h00",
  location: PARC_DU_BIEZ,
  durationLabel: "+3 heures",
  participantsLabel: "100 participants",
  ageLabel: "+16 ans",
  priceLabel: "15 €",
  inscriptionOpenAt: "2026-07-01T10:00:00",
  inscriptionOpenLabel: "1er juillet 2026",
  heroBlurb:
    "Sept ans après la dernière contamination, l'AAES rouvre le périmètre. Dressez-vous face à l'invasion : trois heures de jeu de rôle grandeur nature, en pleine nuit, au Parc du Biez à Mondeville. Réussissez les missions, restez dans la lumière et percez l'origine de l'infection… ou laissez-vous attraper et rejoignez la horde.",
  featuredBlurb:
    "Après 7 ans, l'infection regagne le Parc du Biez à Mondeville. Trois heures de jeu de rôle grandeur nature en pleine nuit : survivez aux missions ou rejoignez la horde. Places limitées — l'inscription est ouverte.",
};

/** Is registration open right now? (Compared against `inscriptionOpenAt`.) */
export function inscriptionIsOpen(edition: UpcomingEdition = UPCOMING): boolean {
  return Date.now() >= new Date(edition.inscriptionOpenAt).getTime();
}

/** Google Calendar "add event" link reminding the user when registration opens. */
export function reminderCalendarUrl(edition: UpcomingEdition = UPCOMING): string {
  const start = new Date(edition.inscriptionOpenAt);
  const end = new Date(start.getTime() + 60 * 60 * 1000);
  const stamp = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Ouverture des inscriptions — ${edition.title}`,
    dates: `${stamp(start)}/${stamp(end)}`,
    details:
      "Les inscriptions pour Z Survival Night ouvrent maintenant. Réservez votre place — les places sont limitées et partent vite.",
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}

export const siteConfig = {
  mapsUrl: PARC_DU_BIEZ.mapsUrl,
  helloAssoWidget:
    "https://www.helloasso.com/associations/amicale-des-amateurs-d-excursions-scenarisees-aaes/evenements/z-survival-night-12-septembre-2026-1/widget",
  associationName: "Amicale des Amateurs d'Excursions Scénarisées",
  // TODO(AAES): replace with the real AAES Facebook / Instagram pages.
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
  },
};
