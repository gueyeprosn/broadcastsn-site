import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import { site, contact } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description:
    'Traitement des données personnelles collectées par le formulaire de demande de devis de Broadcast Senegal.',
  alternates: { canonical: '/confidentialite' },
};

const sections = [
  {
    title: 'Données collectées',
    body: [
      "Le site ne collecte des données que par l'intermédiaire du formulaire de demande de devis : nom et prénom, organisation, adresse électronique, numéro de téléphone, type d'événement, date, lieu, prestations recherchées, durée estimée, budget indicatif facultatif et description du besoin.",
      "Aucune autre donnée n'est demandée. Le site n'utilise ni traceur publicitaire, ni outil de mesure d'audience tiers.",
    ],
  },
  {
    title: 'Finalité du traitement',
    body: [
      "Ces informations servent uniquement à étudier la demande, à établir une proposition et à recontacter la personne qui en est à l'origine. Elles ne sont ni revendues, ni cédées, ni transmises à des tiers à des fins commerciales.",
    ],
  },
  {
    title: 'Informations techniques',
    body: [
      "Lors de l'envoi du formulaire, l'adresse IP et l'identifiant du navigateur sont enregistrés avec la demande. Ces éléments servent exclusivement à limiter les envois automatisés et les abus.",
    ],
  },
  {
    title: 'Conservation',
    body: [
      "Les demandes sont conservées le temps nécessaire au traitement du dossier et au suivi de la relation commerciale qui peut en découler. Toute demande de suppression est honorée.",
    ],
  },
  {
    title: 'Vos droits',
    body: [
      "Vous pouvez demander l'accès à vos données, leur rectification ou leur suppression. La demande se fait par les moyens de contact indiqués sur la page Contact.",
      "Au Sénégal, le traitement des données personnelles relève de la loi n° 2008-12 du 25 janvier 2008 et du contrôle de la Commission de protection des données personnelles (CDP).",
    ],
  },
  {
    title: 'Cookies',
    body: [
      "Le site ne dépose aucun cookie de suivi. Seuls les mécanismes strictement nécessaires à son fonctionnement sont utilisés.",
    ],
  },
  {
    title: 'Hébergement',
    body: [
      "Le site est hébergé sur un serveur dédié administré par Broadcast Senegal. Les échanges sont chiffrés par TLS.",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Mentions"
        title="Politique de confidentialité"
        lead={`Comment ${site.legalName} traite les informations transmises par le formulaire de demande de devis.`}
      />

      <section className="py-20 lg:py-28">
        <div className="shell max-w-3xl">
          {sections.map((s) => (
            <article key={s.title} className="mb-12 last:mb-0">
              <h2 className="text-xl font-semibold">{s.title}</h2>
              {s.body.map((p) => (
                <p key={p.slice(0, 32)} className="mt-4 leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </article>
          ))}

          <div className="mt-4 rounded-card border hairline bg-surface p-6">
            <h2 className="text-base font-semibold">Responsable du traitement</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {site.legalName}, {site.city}, {site.country}.
              {contact.email ? (
                <>
                  {' '}
                  Contact :{' '}
                  <a href={`mailto:${contact.email}`} className="text-signal hover:underline">
                    {contact.email}
                  </a>
                  .
                </>
              ) : (
                <>
                  {' '}
                  <span className="text-bone/70">
                    Les coordonnées du responsable du traitement seront complétées dès leur
                    confirmation par l&rsquo;entreprise.
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
