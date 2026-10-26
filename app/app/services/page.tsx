import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import ServiceCard from '@/components/ServiceCard';
import Reveal from '@/components/Reveal';
import { ButtonLink } from '@/components/Button';
import { serviceGroups, servicesByGroup, type ServiceGroup } from '@/lib/services';
import SectionHeading from '@/components/SectionHeading';

export const metadata: Metadata = {
  title: 'Captation vidéo, live streaming et ingénierie broadcast au Sénégal',
  description:
    'Production événementielle (captation multicaméra, direct, montage, plateaux TV, cérémonies, films institutionnels) et ingénierie broadcast pour chaînes TV, web TV et radios : audit technique, architecture et devis, accompagnement.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title="Deux métiers, une même exigence"
        lead="Nous produisons vos événements, et nous accompagnons les chaînes de télévision, web TV et radios dans leurs projets techniques. Chaque prestation décrit un périmètre d'intervention, arrêté avec vous au moment du devis."
      />

      {(Object.keys(serviceGroups) as ServiceGroup[]).map((g, gi) => (
        <section
          key={g}
          id={g}
          className={`scroll-mt-24 py-20 lg:py-28 ${gi > 0 ? 'theme-dark' : ''}`}
        >
          <div className="shell">
            <SectionHeading
              split
              eyebrow={`Métier ${String(gi + 1).padStart(2, '0')} / ${serviceGroups[g].audience}`}
              title={serviceGroups[g].label}
              lead={serviceGroups[g].lead}
            />
            <div className="mt-14 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {servicesByGroup(g).map((service, i) => (
                <Reveal key={service.slug} delay={(i % 3) * 70}>
                  <ServiceCard service={service} index={i} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="border-t hairline py-20 lg:py-28">
        <div className="shell text-center">
          <h2 className="mx-auto max-w-2xl text-2xl font-semibold leading-tight sm:text-3xl">
            Votre besoin ne rentre dans aucune de ces cases ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
            Décrivez-nous votre projet. Nous vous dirons franchement ce qui est réalisable
            et dans quelles conditions.
          </p>
          <div className="mt-9 flex justify-center">
            <ButtonLink href="/contact">
              Demander un devis
              <ArrowRight size={16} aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
