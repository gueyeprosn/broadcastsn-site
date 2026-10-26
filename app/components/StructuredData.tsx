import { site, contact } from '@/lib/site';
import { services, serviceGroups, type Service } from '@/lib/services';

/**
 * Données structurées schema.org, lues par Google pour comprendre l'activité.
 *
 * Seules des informations exactes sont émises. L'adresse postale est
 * volontairement omise tant qu'elle n'est pas confirmée : une adresse
 * approximative dans un schema.org est pire que rien, car les moteurs s'en
 * servent pour les fiches d'établissement.
 */

const ORG_ID = `${site.url}/#organisation`;

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Contenu statique issu de nos propres constantes : aucune entrée utilisateur.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Entreprise : présente sur toutes les pages (layout). */
export default function StructuredData() {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'ProfessionalService'],
    '@id': ORG_ID,
    name: site.legalName,
    alternateName: site.name,
    url: site.url,
    logo: `${site.url}/brand/broadcast-sn-noir.png`,
    image: `${site.url}/opengraph-image`,
    description: site.description,
    slogan: site.tagline,
    areaServed: site.countries.map((name) => ({ '@type': 'Country', name })),
    knowsLanguage: ['fr'],
    knowsAbout: [
      'Captation vidéo multicaméra',
      'Diffusion en direct',
      'Live streaming',
      'Événements hybrides',
      'Production et montage vidéo',
      'Réalisation de plateaux TV',
      'Film institutionnel',
      'Ingénierie broadcast',
      'Régie de télévision',
      'Web TV',
      'Studio radio',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Prestations',
      itemListElement: (Object.keys(serviceGroups) as Service['group'][]).map((g) => ({
        '@type': 'OfferCatalog',
        name: serviceGroups[g].label,
        itemListElement: services
          .filter((s) => s.group === g)
          .map((s) => ({
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: s.title, url: `${site.url}/services/${s.slug}` },
          })),
      })),
    },
  };

  if (contact.email) data.email = contact.email;
  if (contact.phone) data.telephone = contact.phone;
  if (contact.email || contact.whatsapp) {
    data.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['French'],
      ...(contact.email ? { email: contact.email } : {}),
      ...(contact.whatsapp ? { telephone: contact.whatsapp.replace(/\s/g, '') } : {}),
    };
  }

  return <JsonLd data={data} />;
}

/** Prestation + fil d'Ariane : sur chaque page /services/[slug]. */
export function ServiceStructuredData({ service }: { service: Service }) {
  const url = `${site.url}/services/${service.slug}`;
  return (
    <>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: service.seo.title,
          serviceType: service.title,
          description: service.seo.description,
          url,
          image: `${site.url}${service.image.src}`,
          provider: { '@id': ORG_ID },
          areaServed: site.countries.map((name) => ({ '@type': 'Country', name })),
          audience: { '@type': 'Audience', audienceType: serviceGroups[service.group].audience },
        }}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Accueil', item: site.url },
            { '@type': 'ListItem', position: 2, name: 'Services', item: `${site.url}/services` },
            { '@type': 'ListItem', position: 3, name: service.title, item: url },
          ],
        }}
      />
    </>
  );
}
