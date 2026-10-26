import { site, contact } from '@/lib/site';

/**
 * Données structurées Organization.
 *
 * Seules des informations exactes sont émises. L'adresse postale et le
 * téléphone sont volontairement omis tant qu'ils ne sont pas confirmés :
 * publier une adresse approximative dans un schema.org est pire que de ne
 * rien publier — les moteurs s'en servent pour les fiches d'établissement.
 */
export default function StructuredData() {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/brand/broadcast-sn-noir.png`,
    description: site.description,
    areaServed: site.countries.map((name) => ({ '@type': 'Country', name })),
    knowsLanguage: ['fr'],
  };

  if (contact.email) data.email = contact.email;
  if (contact.phone) data.telephone = contact.phone;

  return (
    <script
      type="application/ld+json"
      // Contenu statique issu de nos propres constantes : aucune entrée utilisateur.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
