/**
 * Validation des demandes de devis, partagée client / serveur.
 * Écrite à la main plutôt qu'avec une librairie : les règles tiennent en
 * quelques lignes et cela évite une dépendance de plus dans le bundle.
 *
 * La validation serveur est la seule qui fait foi — celle du navigateur ne sert
 * qu'au confort de saisie.
 */

export type QuotePayload = {
  fullName: string;
  organization: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  location: string;
  services: string[];
  duration: string;
  budget: string;
  message: string;
  consent: boolean;
  /** Piège à robots : doit rester vide. Jamais affiché à un humain. */
  website?: string;
};

export type FieldErrors = Partial<Record<keyof QuotePayload, string>>;

export const eventTypes = [
  'Conférence ou séminaire',
  'Convention d’entreprise',
  'Cérémonie officielle',
  'Cérémonie religieuse ou culturelle',
  'Plateau TV ou interview',
  'Film institutionnel',
  'Autre',
] as const;

export const serviceOptions = [
  'Captation multicaméra',
  'Diffusion en direct',
  'Production et montage vidéo',
  'Réalisation de plateau TV',
  'Couverture de cérémonie',
  'Film institutionnel',
] as const;

export const durations = [
  'Moins d’une demi-journée',
  'Une demi-journée',
  'Une journée',
  'Deux jours',
  'Plus de deux jours',
  'À définir',
] as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Chiffres, espaces, points, tirets, parenthèses et un éventuel + en tête.
const PHONE = /^\+?[0-9\s().-]{8,20}$/;

const MAX = {
  fullName: 120, organization: 160, email: 160, phone: 30,
  eventType: 80, location: 160, duration: 60, budget: 80, message: 4000,
} as const;

/** Normalise une valeur venue du réseau en chaîne sûre. */
const str = (v: unknown): string => (typeof v === 'string' ? v.trim() : '');

export function normalize(input: unknown): QuotePayload {
  const o = (input ?? {}) as Record<string, unknown>;
  return {
    fullName: str(o.fullName),
    organization: str(o.organization),
    email: str(o.email),
    phone: str(o.phone),
    eventType: str(o.eventType),
    eventDate: str(o.eventDate),
    location: str(o.location),
    services: Array.isArray(o.services) ? o.services.map(str).filter(Boolean).slice(0, 12) : [],
    duration: str(o.duration),
    budget: str(o.budget),
    message: str(o.message),
    consent: o.consent === true || o.consent === 'true',
    website: str(o.website),
  };
}

export function validate(p: QuotePayload): FieldErrors {
  const e: FieldErrors = {};

  if (p.fullName.length < 2) e.fullName = 'Indiquez votre nom et prénom.';
  else if (p.fullName.length > MAX.fullName) e.fullName = 'Nom trop long.';

  if (!p.email) e.email = 'Une adresse électronique est nécessaire pour vous répondre.';
  else if (!EMAIL.test(p.email) || p.email.length > MAX.email)
    e.email = 'Cette adresse ne semble pas valide.';

  if (p.phone && !PHONE.test(p.phone))
    e.phone = 'Numéro invalide. Indiquez l’indicatif, par exemple +221 pour le Sénégal.';

  if (!p.eventType) e.eventType = 'Précisez le type d’événement.';

  if (p.eventDate) {
    const d = new Date(p.eventDate);
    if (Number.isNaN(d.getTime())) e.eventDate = 'Date illisible.';
    // Une date passée est acceptée (projet de montage sur images existantes),
    // mais une date absurde est rejetée.
    else if (d.getFullYear() > new Date().getFullYear() + 5) e.eventDate = 'Date trop lointaine.';
  }

  if (p.message.length < 10)
    e.message = 'Décrivez votre besoin en quelques lignes, même brièvement.';
  else if (p.message.length > MAX.message) e.message = 'Description trop longue.';

  if (p.organization.length > MAX.organization) e.organization = 'Nom trop long.';
  if (p.location.length > MAX.location) e.location = 'Lieu trop long.';
  if (p.budget.length > MAX.budget) e.budget = 'Valeur trop longue.';

  if (!p.consent)
    e.consent = 'Votre accord est nécessaire pour que nous puissions traiter la demande.';

  return e;
}

export const hasErrors = (e: FieldErrors) => Object.keys(e).length > 0;
