/* ============================================================
   AAES — past-event archive
   Editions of the AAES zombie night, oldest to newest.
   Naming follows how each edition was actually billed:
   2013–2016 ran as "Soirée Zombie"; the "Z Survival Night"
   brand starts in 2017. The "Les Interludes" entries are the
   smaller scenarios played at the Cormelles-le-Royal festival.

   Synopses are drawn from the original scenario handouts.
   `participants` counts come from the organisers' records.
   `survivors` is left as "?" wherever the night's outcome was
   not recorded — fill in real figures when known.

   Counts are kept as strings to match rendering
   (survivors === "1" drives "Survivant" vs "Survivants").
   ============================================================ */

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
  /** Bare photo filenames (no path/extension) → resolved via photoUrl(). */
  photos: string[];
}

export const ZEVENTS: ZEvent[] = [
  {
    id: "2019-zsn",
    name: "Z Survival Night",
    kicker: "Édition 2019 · Z-Lanta",
    dateShort: "29 juin 2019",
    dateLong: "Samedi 29 juin 2019 · 21h",
    loc: "Parc du Biez, Mondeville",
    participants: "200",
    survivors: "1",
    fact: "Une télé-réalité qui vire au carnage : the show must go on.",
    trailer: "poq5LXyiq6w",
    blurb:
      "Vous avez accepté de participer à la toute nouvelle émission de télé-réalité : Z-Lanta. Vous voilà sur l'île, avec votre équipe, vos adversaires, des morts-vivants, l'équipe de production et les militaires chargés de la sécurité. Mais rien ne se passe comme prévu — et même quand la situation dégénère, le tournage continue. Arriverez-vous à survivre à cette nuit, ou rejoindrez-vous l'armée des morts ? Quoi qu'il arrive, et quel que soit votre camp… the show must go on. Survivez, ou mourez.",
    photos: ["2019-1", "2019-2", "2019-3", "2019-4", "2019-5", "2019-6", "2019-7", "2019-8"],
  },
  {
    id: "2019-interludes",
    name: "Les Interludes",
    kicker: "Festival Les Interludes · 2019",
    dateShort: "8 juin 2019",
    dateLong: "Samedi 8 juin 2019",
    loc: "Festival Les Interludes, Cormelles-le-Royal",
    participants: "130",
    survivors: "0",
    fact: "Une arme biologique testée sur la foule du festival… qui s'échappe.",
    trailer: "ayT6cJZ1wlM",
    blurb:
      "En marge du festival Les Interludes, une unité militaire profite de la foule pour tester en conditions réelles une nouvelle arme biologique. L'essai tourne court : le pathogène s'échappe, les premiers contaminés s'effondrent puis se relèvent. Entre les stands et les allées, militaires et festivaliers doivent contenir une épidémie qu'ils ont eux-mêmes déclenchée.",
    photos: ["2019int-1", "2019int-2", "2019int-3", "2019int-4", "2019int-5", "2019int-6"],
  },
  {
    id: "2018-zsn-sept",
    name: "Z Survival Night",
    kicker: "Édition 2018 · Nuit 2",
    dateShort: "8 sept. 2018",
    dateLong: "Samedi 8 septembre 2018",
    loc: "Parc du Biez, Mondeville",
    participants: "200",
    survivors: "0",
    fact: "1789 — Louis XVI ressuscité à demi, et toujours maître des morts.",
    trailer: "MzEtuDkZxbE",
    blurb:
      "Seconde nuit de la légende royale. 1789 : l'exécution de Louis XVI fut suivie d'une tentative de résurrection menée par un sorcier à la solde de nobles fidèles à la monarchie — interrompue de justesse par les mercenaires de la guilde des Alchimistes. Le rituel échoua à moitié : le roi, à demi ressuscité et zombifié, disparut dans la nature. Deux siècles plus tard, trois factions — la Cour des Nobles, les Scientifiques-Alchimistes et la Mafia — se partagent des camps fortifiés tandis que les morts ressurgissent. Potions anti-zombie, bijoux de Marie-Antoinette, Graal et trahisons : chacun poursuit ses propres fins pendant que Louis XVI rôde, prêt à rappeler ses morts à lui.",
    photos: ["2018-9", "2018-10", "2018-11", "2018-12", "2018-13", "2018-14", "2018-15", "2018-16"],
  },
  {
    id: "2018-zsn-juin",
    name: "Z Survival Night",
    kicker: "Édition 2018 · Nuit 1",
    dateShort: "30 juin 2018",
    dateLong: "Samedi 30 juin 2018",
    loc: "Vallée des Jardins, Caen",
    participants: "300",
    survivors: "3",
    fact: "Nobles, Alchimistes et Mafia se disputent un roi mort-vivant.",
    trailer: "IsKRWF66-_w",
    blurb:
      "Première nuit de la légende royale. 1789 : la tentative de résurrection de Louis XVI par un sorcier, sur ordre de nobles fidèles à la monarchie, est brisée par des mercenaires de la guilde des Alchimistes — mais le roi, à demi zombifié, s'échappe. Aujourd'hui la légende se réveille : silhouettes difformes, disparitions, cadavres mutilés. Trois factions se retrouvent dans la forêt pour bâtir des camps fortifiés. Les Nobles veulent restaurer la couronne, les Scientifiques fabriquer la potion anti-zombie, la Mafia tirer son épingle du jeu — et Louis XVI compte bien régner sur les morts.",
    photos: ["2018-1", "2018-2", "2018-3", "2018-4", "2018-5", "2018-6", "2018-7", "2018-8"],
  },
  {
    id: "2018-interludes",
    name: "Les Interludes",
    kicker: "Festival Les Interludes · 2018",
    dateShort: "16 juin 2018",
    dateLong: "Samedi 16 juin 2018",
    loc: "Festival Les Interludes, Cormelles-le-Royal",
    participants: "100",
    survivors: "2",
    fact: "Le festival pris d'assaut par les morts en pleine programmation.",
    trailer: "ayT6cJZ1wlM",
    blurb:
      "Format court joué au cœur du festival Les Interludes : entre deux scènes, la fête bascule quand les morts s'invitent dans la programmation. Festivaliers et organisateurs se retrouvent à devoir survivre là où, une heure plus tôt, on venait s'amuser.",
    photos: [],
  },
  {
    id: "2017-zsn",
    name: "Z Survival Night",
    kicker: "Première édition · 2017",
    dateShort: "24 juin 2017",
    dateLong: "Samedi 24 juin 2017",
    loc: "Vallée des Jardins, Caen",
    participants: "300",
    survivors: "24",
    fact: "300 joueurs — le plus grand rassemblement jamais lâché dans la nuit par l'AAES.",
    trailer: "x_KsK1fEIZ0",
    blurb:
      "Première édition à porter le nom de Z Survival Night, et la plus massive de toutes : 300 joueurs lâchés dans la Vallée des Jardins, à Caen, sur fond de décor médiéval. Factions rivales, morts-vivants et quêtes nocturnes dans le plus grand rassemblement jamais organisé par l'AAES.",
    photos: ["2017-1", "2017-2", "2017-3", "2017-4", "2017-5", "2017-6", "2017-7", "2017-8"],
  },
  {
    id: "2016-soiree-zombie",
    name: "Soiree Zombie",
    kicker: "Édition 2016",
    dateShort: "25 juin 2016",
    dateLong: "Samedi 25 juin 2016",
    loc: "Parc du Biez, Mondeville",
    participants: "100",
    survivors: "0",
    fact: "Pour la première fois, l'humanité contre-attaque à armes égales.",
    trailer: "9QqPeRBXxis",
    blurb:
      "Des années que les morts règnent. Puis vint le Conseil — les premiers Immunisés, ceux que les zombies ne peuvent mordre. Sous leur protection, l'humanité est sortie de ses caches : laboratoires rouverts, refuges bâtis, société renaissante. Ce soir, le Conseil déclare la guerre : une arme a été mise au point, un remède va être testé pour la première fois. À armes égales enfin, survivez aux zombies, capturez-les, soignez-les. Guérissez-les tous et l'humanité l'emporte — mais ne vous faites pas mordre avant.",
    photos: ["2016-1", "2016-2", "2016-3", "2016-4", "2016-5", "2016-6", "2016-7", "2016-8"],
  },
  {
    id: "2015-soiree-zombie",
    name: "Soiree Zombie",
    kicker: "Édition 2015",
    dateShort: "27 juin 2015",
    dateLong: "Samedi 27 juin 2015",
    loc: "Parc du Biez, Mondeville",
    participants: "100",
    survivors: "5",
    fact: "Un prophète qu'aucun zombie n'ose mordre.",
    trailer: "ZAM7sSxOW0Q",
    blurb:
      "Le monde n'est plus que cadavres, et l'apocalypse, vous l'avez vécue deux fois. Mais hiver après hiver, les zombies pourrissent et disparaissent. De ces ruines s'est élevé un homme dont la parole est vérité : un prophète qui, par sa foi, rallie les survivants vers un monde de paix. On dit que, bien que vivant, il a si bien accepté la mort qu'aucun zombie n'ose porter les dents sur lui ni sur ses disciples. Sa procession touche à son but… mais dans les bois rôdent encore des bruits — des indépendants qui n'ont jamais vu la lumière. Choisissez vos alliés, protégez votre groupe, et survivez.",
    photos: ["2015-1", "2015-2", "2015-3", "2015-4", "2015-5", "2015-6", "2015-7", "2015-8"],
  },
  {
    id: "2014-soiree-zombie",
    name: "Soiree Zombie",
    kicker: "Édition 2014",
    dateShort: "28 juin 2014",
    dateLong: "Samedi 28 juin 2014",
    loc: "Parc du Biez, Mondeville",
    participants: "80",
    survivors: "0",
    fact: "Trois factions, des bombes à eau, et un zombie meneur qui parle.",
    trailer: "y43ut7xwpfM",
    blurb:
      "Trois ans après l'explosion du complexe scientifique mondevillais — berceau présumé du premier zombie — les morts sont désormais plus nombreux que les vivants. Le complexe vient d'être réinvesti en secret, et trois groupes convergent vers le centre militaire : les Renégats, anciens prisonniers soudés autour de leur chef ; le Front Humain, milice organisée et efficace ; et l'Église de la Vie, communauté religieuse éclairant ces heures sombres. Bombes à eau, camps à défendre et un zombie meneur capable de parler : chaque faction devra choisir ce qu'elle est prête à sacrifier pour survivre.",
    photos: ["2014-1", "2014-2", "2014-3", "2014-4", "2014-5", "2014-6", "2014-7", "2014-8"],
  },
  {
    id: "2013-soiree-zombie",
    name: "Soiree Zombie",
    kicker: "Édition 2013",
    dateShort: "17 août 2013",
    dateLong: "Samedi 17 août 2013",
    loc: "Bois de Lebisey, Hérouville-Saint-Clair",
    participants: "60",
    survivors: "3",
    fact: "Civils en fuite contre militaires en chasse d'un spécimen unique.",
    blurb:
      "Un an plus tôt, un seul homme — Maxime M. — avait survécu aux zombies et alerté le monde. Les foyers furent bouclés en zones de quarantaine… jusqu'à ce que des brèches apparaissent et que l'invasion reprenne autour de Caen. Deux camps s'affrontent dans le Bois de Lebisey : les Civils, menés par Jane Besançon, fuyant un village où le virus tarde étrangement à agir et cherchant une évacuation ; et les Militaires du commandant Alexandre Letois, envoyés en zone contaminée pour capturer un spécimen de zombie aux capacités hors du commun. Repérer, capturer, évacuer — ou survivre.",
    photos: ["2013-1", "2013-2", "2013-3", "2013-4", "2013-5", "2013-6", "2013-7", "2013-8"],
  },
  {
    id: "2012-soiree-zombie",
    name: "Soiree Zombie",
    kicker: "Édition 2012",
    dateShort: "2012",
    dateLong: "2012",
    loc: "Cairon",
    participants: "70",
    survivors: "1",
    fact: "La fête de l'été tourne court — et Maxime M. s'en sort.",
    blurb:
      "C'est la fête de l'été à Cairon : le maire reçoit le village pour sa grande soirée estivale. Mais un an après l'explosion du laboratoire de Mondeville, les morts sont de retour et s'invitent au milieu des festivités. Dans le chaos, un homme tire son épingle du jeu — Maxime M., seul rescapé de la nuit. C'est lui qui alertera le monde sur la menace, point de départ de tout ce qui suivra.",
    photos: ["2012-1", "2012-2", "2012-3", "2012-4", "2012-5", "2012-6", "2012-7", "2012-8"],
  },
  {
    id: "2011-soiree-zombie",
    name: "Soiree Zombie",
    kicker: "Édition 2011",
    dateShort: "2011",
    dateLong: "2011",
    loc: "Parc du Biez, Mondeville",
    participants: "40",
    survivors: "0",
    fact: "Tout commence ici : le laboratoire secret de Mondeville explose.",
    blurb:
      "Aux origines de l'épidémie. De nouvelles recrues sont amenées au laboratoire ultra-secret de Mondeville, où l'on mène d'étranges expériences. Mais tout n'est pas sous contrôle : les spécimens échappent à leurs gardiens. Pour tenter de contenir la pandémie naissante, il ne reste qu'une issue — faire sauter le complexe. C'est cette explosion qui, des années plus tard, restera dans toutes les mémoires comme le berceau du premier zombie.",
    photos: ["2011-1"],
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
