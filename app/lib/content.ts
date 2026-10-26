import type { LucideIcon } from 'lucide-react';
import {
  Briefcase, Landmark, Globe2, Presentation, HeartHandshake, MonitorPlay,
  MessageSquare, FileSpreadsheet, Camera, PackageCheck,
} from 'lucide-react';

export type Sector = {
  slug: string;
  title: string;
  description: string;
  needs: string[];
  icon: LucideIcon;
};

export const sectors: Sector[] = [
  {
    slug: 'entreprises',
    title: 'Entreprises et marques',
    description:
      "Lancements, conventions, séminaires internes et contenus de communication destinés aux clients comme aux collaborateurs.",
    needs: ['Conventions et séminaires', 'Lancements de produit', 'Communication interne', 'Contenus pour les réseaux'],
    icon: Briefcase,
  },
  {
    slug: 'institutions',
    title: 'Institutions et administrations',
    description:
      "Cérémonies officielles, signatures de convention, inaugurations et restitutions publiques, avec les exigences de rigueur propres au secteur public.",
    needs: ['Cérémonies officielles', 'Inaugurations', 'Restitutions publiques', 'Archives institutionnelles'],
    icon: Landmark,
  },
  {
    slug: 'ong',
    title: 'ONG et organisations internationales',
    description:
      "Valorisation des programmes, documentation des actions de terrain et production de contenus destinés aux bailleurs et aux partenaires.",
    needs: ['Documentation de projets', 'Rapports vidéo aux bailleurs', 'Témoignages de terrain', 'Ateliers et restitutions'],
    icon: Globe2,
  },
  {
    slug: 'conferences',
    title: 'Conférences et séminaires',
    description:
      "Captation des interventions, diffusion vers les participants à distance et production de contenus réutilisables après l'événement.",
    needs: ['Captation des plénières', 'Diffusion en direct', 'Capsules par intervenant', 'Archivage des sessions'],
    icon: Presentation,
  },
  {
    slug: 'ceremonies',
    title: 'Événements religieux et culturels',
    description:
      "Grands rassemblements, cérémonies et manifestations culturelles, captés avec la discrétion et le respect que ces moments exigent.",
    needs: ['Cérémonies religieuses', 'Manifestations culturelles', 'Grands rassemblements', 'Captation discrète'],
    icon: HeartHandshake,
  },
  {
    slug: 'medias',
    title: 'Médias et production de programmes',
    description:
      "Formats d'émission, plateaux d'interview et contenus destinés à la diffusion, produits en appui des équipes éditoriales.",
    needs: ['Plateaux et interviews', 'Formats d’émission', 'Captation pour diffusion', 'Appui aux rédactions'],
    icon: MonitorPlay,
  },
];

export const getSector = (slug: string) => sectors.find((s) => s.slug === slug);

/**
 * Engagements de service — formulés comme des engagements, jamais comme des
 * certifications ni des résultats déjà démontrés.
 */
export const commitments = [
  {
    title: 'Préparation rigoureuse',
    text: "Repérage, conducteur et dispositif arrêtés avant le jour J. Ce qui est anticipé ne se rattrape pas en direct.",
  },
  {
    title: 'Approche adaptée à chaque événement',
    text: "Le dispositif découle du programme et du lieu, pas d'une formule appliquée à tous les projets.",
  },
  {
    title: "Attention portée à l'image et au son",
    text: "Un son dégradé disqualifie une captation réussie à l'image. Les deux sont traités avec la même exigence.",
  },
  {
    title: 'Accompagnement du brief à la livraison',
    text: "Un interlocuteur du premier échange jusqu'à la remise des contenus convenus.",
  },
];

/** Méthode en quatre étapes. */
export const method = [
  {
    step: '01',
    title: 'Échange et compréhension du besoin',
    text: "Nous prenons le temps de comprendre l'événement, son programme, son audience et l'usage prévu des images.",
    icon: MessageSquare,
  },
  {
    step: '02',
    title: 'Définition du dispositif et devis',
    text: "Le dispositif technique et les livrables sont définis en fonction du projet, puis chiffrés sans zone d'ombre.",
    icon: FileSpreadsheet,
  },
  {
    step: '03',
    title: 'Préparation et réalisation',
    text: "Repérage lorsque c'est possible, installation en amont, puis captation pendant l'événement.",
    icon: Camera,
  },
  {
    step: '04',
    title: 'Postproduction et livraison',
    text: "Montage, finition et remise des contenus aux formats convenus lors de la préparation.",
    icon: PackageCheck,
  },
];

/**
 * Réalisations.
 *
 * RÈGLE : uniquement des projets fournis par le propriétaire ET recoupés :
 * vidéo publique existante (titre et chaîne vérifiés), et photo de Broadcast SN
 * montrant l'événement quand il y en a une. Le client n'est indiqué que s'il est
 * établi ; sinon on cite la chaîne qui publie la vidéo, sans extrapoler.
 *
 * Exception assumée : les deux projets African Leadership Group (Denver) n'ont
 * ni vidéo dédiée ni photo maison. Ils sont publiés sur confirmation écrite du
 * propriétaire (2026-10-26), avec un lien vers la chaîne officielle du client.
 */
export type Project = {
  id: string;
  title: string;
  /** Ligne de typologie, en tête de fiche. */
  kind: string;
  client?: string;
  place: string;
  date: string;
  scope: string[];
  /** Vidéo publique de l'événement, ou à défaut chaîne officielle du client. */
  video?: { url: string; channel: string };
  /** Photos de Broadcast SN (public/photos). Absentes : miniature de la vidéo publique. */
  images: { src: string; alt: string; position?: string }[];
};

export const projects: Project[] = [
  {
    id: 'afrik-impact-summit',
    title: 'Afrik Impact Summit',
    kind: 'Summit international · États-Unis',
    client: 'African Leadership Group',
    place: 'Denver, Colorado — États-Unis',
    date: '2023 — 2024',
    scope: [
      'Captation multicaméra des forums d’affaires, panels et sessions',
      'Interviews de dirigeants, d’entrepreneurs et de décideurs',
      'Reportage de terrain et capsules courtes pour la diffusion en ligne',
      'Diffusion en ligne des séquences retenues',
    ],
    video: { url: 'https://www.youtube.com/@AfricanLeadershipGroup', channel: 'African Leadership Group' },
    images: [],
  },
  {
    id: 'delegation-colorado-senegal',
    title: 'Délégation du Colorado au Sénégal',
    kind: 'Délégation internationale',
    client: 'African Leadership Group',
    place: 'Sénégal',
    date: '2023 — 2024',
    scope: [
      'Couverture de la visite de la délégation et des rencontres institutionnelles',
      'Captation de terrain, portraits et interviews',
      'Production de supports de communication pour la délégation',
      'Livraison de contenus destinés à une diffusion aux États-Unis',
    ],
    images: [],
  },
  {
    id: 'sports-business-forum',
    title: 'Sports Business Forum',
    kind: 'Forum international · Direct',
    client: 'Atlantic Council — Africa Center, avec le SEED Project',
    place: 'Sénégal',
    date: '4 mars 2022',
    scope: [
      'Captation de l’événement et de l’ensemble des sessions',
      'Interviews et contributions d’experts',
      'Habillage antenne et habillage graphique',
      'Diffusion en direct et replays',
    ],
    video: { url: 'https://www.youtube.com/live/ky6ST2tYleY', channel: 'Atlantic Council' },
    images: [
      {
        src: '/photos/atlantic-forum.jpg',
        alt: 'Salle du Sports Business Forum : public, scène, écran géant aux couleurs de l’Atlantic Council et caméras de Broadcast SN au premier plan',
      },
      {
        src: '/photos/atlantic-regie.jpg',
        alt: 'Opérateur de Broadcast SN en régie pendant le Sports Business Forum, casque sur les oreilles, devant les retours vidéo',
      },
    ],
  },
  {
    id: 'rencontres-sante-numerique',
    title: 'Rencontres Santé Numérique 2021',
    kind: 'Événement hybride · Direct',
    client: 'Amref Health Africa',
    place: 'Dakar, Sénégal',
    date: '1er et 2 décembre 2021',
    scope: [
      'Gestion de la partie visioconférence et de l’habillage antenne',
      'Captation et multidiffusion en format hybride, présentiel et à distance',
      'Coordination technique des intervenants à distance',
      'Livrables de diffusion',
    ],
    video: { url: 'https://www.youtube.com/live/BZyPAXPZbOo', channel: 'Amref Health Africa (France)' },
    images: [],
  },
  {
    id: 'forum-de-dakar-2',
    title: 'Forum de Dakar #2',
    kind: 'Forum · Captation multicaméra',
    place: 'Dakar, Sénégal',
    date: '2021',
    scope: [
      'Captation multicaméra et habillage antenne de l’événement',
      'Présentation des intervenants et captation des sessions',
      'Production de contenus pour la diffusion en ligne',
    ],
    video: { url: 'https://youtu.be/XZSOSrjHHAQ', channel: 'Phrenos EU' },
    images: [
      {
        src: '/photos/dakar2-regie.jpg',
        alt: 'Multiviewer de la régie du Forum de Dakar #2 : intervenant à l’image, caméras et habillage « Dakar #2 »',
      },
      {
        src: '/photos/dakar2-salle.jpg',
        alt: 'Régie de Broadcast SN installée au fond de la salle du Forum de Dakar #2, face à la scène',
      },
    ],
  },
];

/** Identifiant YouTube d'une URL de vidéo (watch, live ou youtu.be). */
export function youtubeId(url: string): string | null {
  const m = url.match(/(?:youtu\.be\/|\/live\/|[?&]v=)([\w-]{11})/);
  return m ? m[1] : null;
}
