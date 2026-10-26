import type { LucideIcon } from 'lucide-react';
import { Cctv, Radio, Clapperboard, Tv, Users, Building2 } from 'lucide-react';

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
};

/**
 * Six prestations. Les descriptions décrivent un périmètre d'intervention et
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
    image: { src: '/photos/regie-conference.jpg', alt: "Équipe en régie de conférence, mélangeur vidéo et moniteurs des intervenants", position: '50% 40%' },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
