/* ============================================================
   AAES — Z Survival Night · participant testimonials
   Two shapes, two placements:
   • ANECDOTES — the long survival stories; rendered as a card
     masonry in the home "Ils ont survécu" section.
   • SHORT_QUOTES — short punchy one-liners; rendered as a strip
     beneath the anecdotes in the same section.
   Verbatim participant voice, lightly cleaned for readability.
   ============================================================ */

export interface Testimonial {
  quote: string;
  author: string;
}

export const ANECDOTES: Testimonial[] = [
  {
    quote:
      "Poursuivi par une zombie, je décide de me cacher au milieu d'un arbre, les bras en l'air, en me répétant que dans la nuit je n'étais pas si différent d'un arbre… La zombie passe, je me dis « ouf ». La zombie revient, m'attrape, me mange et me dit : « je me disais bien que cet arbre se foutait de ma gueule. »",
    author: "Max",
  },
  {
    quote:
      "Il y a deux ans, je m'étais fait prendre à cinq minutes de la fin. Fort de cette expérience, j'y suis allé confiant l'an dernier. Début de partie, aucun zombie : on patrouille à la recherche d'objets pour aider le camp, quand soudain une petite lumière s'allume dans un buisson. Je me dis « j'y vais », malgré mes cinq potes qui me répètent que ce n'est pas prudent. Je ne les écoute pas… et je me fais choper par un zombie planqué dans le buisson. Résultat : 20 minutes de survie seulement.",
    author: "Guillaume",
  },
  {
    quote:
      "Je me suis fait attraper à la fin (il y avait plus de zombies que de survivants !). La personne m'a prise dans ses bras et m'a dit de hurler à la mort, ce que j'ai fait — puis je l'ai remerciée pour son super jeu d'acteur et la belle frayeur 😂 J'arrive au stand de maquillage et, par chance, il est minuit passé : c'est mon anniversaire. On m'offre des Schokobons, on me maquille avant tout le monde 😘 et j'ai même été interviewée alors que j'étais trempée de transpiration 😂",
    author: "Maeva",
  },
  {
    quote:
      "Meilleur souvenir de l'année dernière, avec mes cousines, pendant la course d'orientation : bouffée trois fois en moins de cinq minutes ! Ma cousine Laura a réussi à déprimer suffisamment le zombie pour qu'il l'aide à monter une butte en forêt et à se sauver… Un reste de son ancienne vie, peut-être : c'était un pompier zombie ^^",
    author: "Séverine",
  },
  {
    quote:
      "Avec mon frère, nous avions fait équipe avec un gars fort sympathique. Au début on se moquait un peu des zombies, ils étaient si peu nombreux. Tout a basculé lors d'une mission de réapprovisionnement en essence à l'infirmerie : nous étions une vingtaine quand soudain… une vague de zombies s'abattit sur nous. En fuite, alors qu'on pensait les avoir semés, mon frère se fit croquer. C'était fini pour lui — mais pas pour mon compagnon et moi. La nuit devenait de plus en plus obscure, les cris se multipliaient, et j'ai réussi à m'enfuir par les égouts. Je suis l'un des 24 survivants, et voilà mon histoire. Y aura-t-il une suite ? Vous le saurez au prochain épisode… *dou doumm*",
    author: "Un survivant",
  },
  {
    quote:
      "Première soirée avec vous, on y va ma fille et moi la fleur au fusil 😊 Après deux heures de courses et de recherches de « vivres » dans les fourrés, lampe en fin de vie et sur la pointe des pieds pour ne pas se faire repérer, on décide d'une petite pause. Retour au combat : deux silhouettes devant nous, on montre nos couleurs… pas de réponse 😱 Repli en courant comme des dératées ! On prend le premier chemin pour rejoindre le camp au plus vite, droit devant — ERREUR FATALE. Deux zombies sortis de nulle part nous attrapent en pleine course, juste le temps de rattraper les lunettes dans un cri mêlé de surprise et de peur 😂 Un bon fou rire, pour eux comme pour nous. Direction la zone de maquillage.",
    author: "Une maman survivante",
  },
  {
    quote:
      "C'était ma 3ᵉ participation et je ne suis pas près d'arrêter : le travail fourni par les organisateurs est juste impressionnant. Ma mort la plus remarquable restera la seconde : coincé entre trois zombies, un en face et deux derrière, chargé de provisions pour le camp, je m'enfuis et je cours… deux autres surgissent sur ma droite, je cours encore plus vite et j'aperçois enfin mon camp. J'y dépose les ressources, je souffle, je repars — et à peine 50 mètres plus loin, embuscade : les zombies croisés plus tôt m'attendaient avec trois renforts. Être traqué par autant de zombies n'a rien de reposant… mais qu'est-ce que c'était fun !",
    author: "Lucas",
  },
  {
    quote:
      "Ma première, c'était samedi, et mon anecdote à moi c'est que, prise par surprise, je me suis fait pipi dessus. (Je précise : c'est la faute d'enfants… et d'un périnée qui ne fait plus tout à fait son boulot.)",
    author: "Loriane",
  },
  {
    quote:
      "C'était la 4ᵉ fois, et je suis toujours autant dedans : j'adore ces soirées. Pour la première fois je me suis fait caresser une fesse par une zombie très cool — mort plutôt bizarre — avant de finir dans la team feuillage, qui fut très fun.",
    author: "Un habitué",
  },
];

export const SHORT_QUOTES: Testimonial[] = [
  {
    quote: "Quand la soirée zombie passe avant ton entorse, tu deviens le premier zombie à roulettes de l'histoire de l'AAES.",
    author: "Florence",
  },
  {
    quote: "Soirée parfaite 👌 J'ai perdu ma sœur dans les bois, c'était le top 😂",
    author: "Didine",
  },
  {
    quote: "Comme à chaque fois c'était top. L'adrénaline et le fun au rendez-vous. Merci à toute la team orga !",
    author: "Natacha",
  },
  {
    quote: "Juste génial ! Un bon fou rire quand on est mortes comme des débutantes… « chopées en plein vol » !",
    author: "Zukuari",
  },
  {
    quote: "Je regrette pas d'être descendu de la Manche pour ça. C'était top, on a bien rigolé !",
    author: "Mariine",
  },
  {
    quote: "La soirée était géniale, du coup on remet ça — en attendant la prochaine avec impatience !",
    author: "Nerick",
  },
  {
    quote: "C'était la première fois que je participais et c'était génial !",
    author: "Chou",
  },
];
