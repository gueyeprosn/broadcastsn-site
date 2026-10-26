/**
 * Informations de l'entreprise.
 *
 * RÈGLE : aucune donnée de contact n'est inventée. Les champs laissés à `null`
 * ne sont pas affichés sur le site tant que le propriétaire ne les a pas
 * renseignés — voir la section « À compléter » du README.
 */

export const site = {
  name: 'Broadcast SN',
  legalName: 'Broadcast Senegal',
  tagline: 'Professionnel des nouveaux médias',
  // Signature proposée dans le brief, à valider par le propriétaire.
  claim: 'Nous donnons une image à vos événements.',
  url: 'https://sn.broadcastsn.com',
  city: 'Dakar',
  country: 'Sénégal',
  description:
    'Captation vidéo multicaméra, diffusion en direct et production vidéo à Dakar et au Sénégal, et ingénierie broadcast pour les chaînes TV, web TV et radios.',
  /** Zone d'intervention : le Sénégal, sous réserve des contraintes de chaque projet. */
  coverage: 'Sénégal',
  /** Ancienneté confirmée par le propriétaire le 2026-10-26. */
  experience: '14 ans',
  /** Pays d'intervention confirmés par le propriétaire le 2026-10-26. */
  countries: ['Sénégal', 'États-Unis'],
  /**
   * Code de vérification Google Search Console (méthode « balise HTML »),
   * c'est-à-dire la valeur de content="…" fournie par Google. null : pas de balise.
   */
  googleSiteVerification: '8TCruvHgnk5aYzlV-XQC4xx73qLe1O9_iCVJczH5CyM' as string | null,
} as const;

/**
 * Coordonnées — À COMPLÉTER PAR LE PROPRIÉTAIRE.
 * Tant qu'une valeur vaut `null`, le composant correspondant ne l'affiche pas
 * et invite à la renseigner. Ne jamais y mettre de valeur approximative :
 * un numéro ou une adresse erronée sur un site public est pire qu'une absence.
 */
export const contact: {
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
} = {
  // Confirmés par le propriétaire le 2026-10-26.
  email: 'contact@broadcastsn.com',
  phone: null,
  whatsapp: '+221 77 724 56 54',
  address: null,
};

/** Lien WhatsApp direct (wa.me attend le numéro international sans « + » ni espaces). */
export const whatsappLink = (text?: string) =>
  contact.whatsapp
    ? `https://wa.me/${contact.whatsapp.replace(/\D/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}`
    : null;

/**
 * Réseaux sociaux — À COMPLÉTER. Uniquement des comptes officiels confirmés.
 * Chaque entrée non vide apparaît dans le pied de page.
 */
export const socials: { label: string; href: string }[] = [];

export const nav = [
  { label: 'Accueil', href: '/' },
  { label: 'Nos services', href: '/services' },
  { label: 'Réalisations', href: '/realisations' },
  { label: "Secteurs d'activité", href: '/secteurs' },
  { label: 'À propos', href: '/a-propos' },
] as const;

/** Vrai si au moins un moyen de contact direct est renseigné. */
export const hasDirectContact = Boolean(contact.email || contact.phone || contact.whatsapp);
