import type { LucideIcon } from 'lucide-react';
import {
  Cctv, Radio, Clapperboard, Tv, Users, Building2, ClipboardCheck, DraftingCompass, LifeBuoy,
} from 'lucide-react';

export type Service = {
  slug: string;
  title: string;
  short: string;
  /** Paragraphes de la page de détail. */
  body: string[];
  /** Ce que la prestation couvre, formulé comme un périmètre, pas comme une garantie. */
  scope: string[];
  /** Réserves honnêtes : ce qui dépend du contexte du projet. */
  caveat?: string;
  icon: LucideIcon;
  /** Photo de terrain fournie par Broadcast SN (dans public/photos). */
  image: { src: string; alt: string; position?: string };
  /** Métier : production événementielle, ou ingénierie pour les diffuseurs. */
  group: ServiceGroup;
  /** Livrables remis au client (« Ce que vous recevez »). */
  deliverables?: string[];
};

export type ServiceGroup = 'evenementiel' | 'ingenierie';

export const serviceGroups: Record<ServiceGroup, { label: string; audience: string; lead: string }> = {
  evenementiel: {
    label: 'Production événementielle',
    audience: 'Entreprises, institutions, organisations',
    lead: "Captation, réalisation, direct et montage forment une seule chaîne. Le périmètre de chaque prestation est arrêté avec vous au moment du devis.",
  },
  ingenierie: {
    label: 'Ingénierie broadcast',
    audience: 'Chaînes de télévision, web TV, radios',
    lead: "Pour les diffuseurs : savoir où en est votre installation, concevoir celle dont vous avez besoin, puis l'amener jusqu'à l'antenne.",
  },
};

/**
 * Neuf prestations en deux métiers. Les descriptions décrivent un périmètre d'intervention et
 * non des moyens matériels ou humains : le parc technique et les équipes ne sont
 * pas documentés, on ne les affirme donc nulle part.
 */
export const services: Service[] = [
  {
    slug: 'captation-multicamera',
    title: 'Captation multicaméra',
    short:
      'Captation coordonnée des événements avec une réalisation adaptée au format et aux besoins du client.',
    body: [
      "La captation multicaméra permet de restituer un événement sous plusieurs angles et de construire un récit visuel pendant son déroulement. Le dispositif est défini en amont avec vous, en fonction du lieu, du programme et de l'usage final des images.",
      "Le nombre de points de vue, les axes de prise de vue et le mode de réalisation sont arrêtés lors de la préparation, puis ajustés lors du repérage technique lorsque celui-ci est possible.",
    ],
    scope: [
      'Repérage et définition du dispositif de captation',
      'Réalisation coordonnée pendant l’événement',
      'Captation des interventions, du public et des temps forts',
      'Remise des rushes ou d’un montage selon ce qui est convenu',
    ],
    caveat:
      "Le nombre de caméras et la configuration technique dépendent du lieu, de la durée et du budget : ils sont arrêtés au moment du devis.",
    icon: Cctv,
    group: 'evenementiel',
    image: { src: '/photos/captation-stade.jpg', alt: "Cadreur de Broadcast SN derrière une caméra sur trépied, au bord du terrain d'un stade", position: '50% 12%' },
  },
  {
    slug: 'diffusion-en-direct',
    title: 'Diffusion en direct',
    short:
      'Solutions de retransmission en ligne, sous réserve de validation de la connectivité, du matériel et des plateformes nécessaires.',
    body: [
      "La diffusion en direct rend un événement accessible à distance, en temps réel, sur les plateformes que vous utilisez déjà ou sur une page dédiée.",
      "La faisabilité d'un direct se vérifie avant l'engagement : elle dépend de la connexion disponible sur site, du débit montant réellement mesuré et des plateformes visées. Cette vérification fait partie de la préparation.",
    ],
    scope: [
      'Étude de faisabilité et test de la connexion sur site',
      'Mise en place de la chaîne de diffusion',
      'Encodage et retransmission pendant l’événement',
      'Supervision du direct du début à la fin',
    ],
    caveat:
      "Aucun direct n'est confirmé avant la validation de la connectivité sur le lieu de l'événement. Une liaison de secours peut être recommandée selon l'enjeu.",
    icon: Radio,
    group: 'evenementiel',
    image: { src: '/photos/regie-direct.jpg', alt: "Opérateur au mélangeur vidéo pendant une diffusion en direct, écrans de contrôle et console audio" },
  },
  {
    slug: 'production-montage',
    title: 'Production et montage vidéo',
    short:
      'Conception et montage de contenus audiovisuels pour les événements et la communication professionnelle.',
    body: [
      "Au-delà de la captation, les images prennent leur valeur au montage : choix des séquences, rythme, habillage, étalonnage et mixage sonore.",
      "Les formats de sortie sont définis avec vous selon l'usage prévu — diffusion interne, réseaux sociaux, site web, projection en salle ou archivage.",
    ],
    scope: [
      'Dérushage et sélection des séquences',
      'Montage, habillage graphique et sous-titrage',
      'Étalonnage et traitement du son',
      'Export aux formats convenus',
    ],
    icon: Clapperboard,
    group: 'evenementiel',
    image: { src: '/photos/montage-diffusion.jpg', alt: "Techniciens devant les écrans de montage et de diffusion en régie" },
  },
  {
    slug: 'plateaux-tv',
    title: 'Réalisation de plateaux TV',
    short:
      "Production de formats d'interviews, d'émissions et de plateaux, selon les moyens techniques disponibles.",
    body: [
      "Un plateau permet de produire un format maîtrisé : interview, table ronde, émission ou capsule de communication, dans des conditions de lumière et de son contrôlées.",
      "Le dispositif — décor, éclairage, nombre d'intervenants, durée — est défini projet par projet, en fonction des moyens techniques mobilisables.",
    ],
    scope: [
      'Définition du format et du conducteur',
      'Mise en place du plateau, lumière et son',
      'Captation des échanges',
      'Montage et livraison du programme',
    ],
    caveat:
      "La configuration du plateau dépend des moyens techniques disponibles pour le projet et du lieu retenu.",
    icon: Tv,
    group: 'evenementiel',
    image: { src: '/photos/plateau-interview.jpg', alt: "Caméras et moniteur de contrôle installés pour une interview dans un salon" },
  },
  {
    slug: 'ceremonies',
    title: 'Couverture de cérémonies religieuses et culturelles',
    short:
      'Captation respectueuse et professionnelle de conférences, cérémonies et grands rassemblements.',
    body: [
      "Les cérémonies religieuses et culturelles demandent une approche particulière : discrétion des équipes, respect du déroulé et des usages, attention portée aux moments qui comptent.",
      "La préparation se fait avec les organisateurs afin que le dispositif de captation s'intègre sans perturber l'événement ni ceux qui y participent.",
    ],
    scope: [
      'Préparation avec les organisateurs et repérage',
      'Captation discrète du déroulé',
      'Prise de son adaptée aux prises de parole',
      'Montage respectueux du déroulé de la cérémonie',
    ],
    icon: Users,
    group: 'evenementiel',
    image: { src: '/photos/regie-lutte.jpg', alt: "Régie mobile pendant la retransmission d'un combat de lutte devant un large public" },
  },
  {
    slug: 'films-institutionnels',
    title: 'Films institutionnels',
    short:
      'Production de vidéos destinées à présenter les organisations, leurs activités, leurs projets et leurs actions.',
    body: [
      "Le film institutionnel donne une forme visuelle à ce que fait une organisation : ses métiers, ses projets, ses résultats, les personnes qui la composent.",
      "Le travail commence par la définition du message et de l'audience, avant l'écriture, le tournage et le montage.",
    ],
    scope: [
      'Définition du message et de l’audience',
      'Écriture et préparation du tournage',
      'Tournage sur site ou en plateau',
      'Montage, habillage et déclinaisons de format',
    ],
    icon: Building2,
    group: 'evenementiel',
    image: { src: '/photos/regie-conference.jpg', alt: "Équipe en régie de conférence, mélangeur vidéo et moniteurs des intervenants", position: '50% 40%' },
  },
  {
    slug: 'audit-technique',
    title: 'Audit technique',
    short:
      'État des lieux de votre régie, de votre studio ou de votre chaîne de diffusion, avec des recommandations classées par priorité.',
    body: [
      "Avant d'investir, il faut savoir où en est l'installation. L'audit passe en revue l'existant — régie, plateau, studio radio, chaîne de diffusion hertzienne, IP ou streaming — pour établir ce qui fonctionne, ce qui fragilise l'antenne et ce qui freine vos projets.",
      "Le rapport distingue l'urgent de l'utile : points de défaillance unique, équipements en fin de vie, flux mal maîtrisés, absence de secours, puis pistes d'évolution.",
    ],
    scope: [
      'Inventaire du matériel et des logiciels en place',
      'Analyse des flux audio, vidéo et réseau, de la source à la diffusion',
      'Repérage des points de défaillance et des besoins de secours',
      'Recommandations classées par priorité',
    ],
    deliverables: ['Rapport d’audit', 'Synoptique de l’existant', 'Plan d’action priorisé'],
    caveat:
      "L'étendue de l'audit — une régie, un studio ou toute la chaîne — est fixée au devis. Une visite sur site est nécessaire.",
    icon: ClipboardCheck,
    image: { src: '/photos/regie-studio.jpg', alt: "Réalisateur devant le multiviewer d'une régie de télévision" },
    group: 'ingenierie',
  },
  {
    slug: 'architecture-technique-devis',
    title: 'Architecture technique et devis',
    short:
      'Conception de votre installation et chiffrage du matériel : régie TV, studio radio, web TV ou chaîne de diffusion.',
    body: [
      "Lancement d'une chaîne, d'une web TV ou d'une radio, ou modernisation d'une installation : l'architecture technique traduit votre projet éditorial en un système cohérent — sources, mélange, habillage, enregistrement, diffusion et secours.",
      "Nous établissons le synoptique, la liste du matériel et le devis, en comparant les options quand plusieurs approches sont possibles, pour que vous décidiez en connaissant le coût et les compromis de chacune.",
    ],
    scope: [
      'Recueil du besoin éditorial et des contraintes : budget, locaux, équipe',
      'Conception de la régie, du plateau ou du studio, de l’encodage et de la diffusion',
      'Synoptique et liste de matériel',
      'Devis détaillé et comparaison des options',
    ],
    deliverables: ['Synoptique technique', 'Liste de matériel', 'Devis chiffré'],
    icon: DraftingCompass,
    image: {
      src: '/photos/regie-studio-2.jpg',
      alt: "Console audio et mur d'écrans d'une régie de diffusion",
      position: '30% 50%',
    },
    group: 'ingenierie',
  },
  {
    slug: 'accompagnement-technique',
    title: 'Accompagnement technique',
    short:
      'Suivi du projet, mise en service, formation des équipes et assistance après le lancement.',
    body: [
      "Une installation bien conçue peut encore échouer au démarrage. L'accompagnement couvre la suite : coordination avec les fournisseurs, réception et mise en service du matériel, tests avant le passage à l'antenne.",
      "Nous formons vos équipes à l'exploitation de leur installation et restons disponibles après le lancement, ponctuellement ou dans la durée.",
    ],
    scope: [
      'Suivi du projet et coordination des fournisseurs',
      'Réception, mise en service et tests avant antenne',
      'Formation des opérateurs et des techniciens',
      'Assistance après le lancement, ponctuelle ou suivie',
    ],
    deliverables: ['Dossier technique de l’installation', 'Formation des équipes', 'Assistance au démarrage'],
    icon: LifeBuoy,
    image: {
      src: '/photos/montage-diffusion.jpg',
      alt: 'Techniciens devant les écrans de diffusion et de streaming en régie',
    },
    group: 'ingenierie',
  },
];

export const servicesByGroup = (group: ServiceGroup) => services.filter((s) => s.group === group);

export const getService = (slug: string) => services.find((s) => s.slug === slug);
