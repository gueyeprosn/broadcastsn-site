import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import ServiceCard from '@/components/ServiceCard';
import Reveal from '@/components/Reveal';
import { ButtonLink } from '@/components/Button';
import { services } from '@/lib/services';

export const metadata: Metadata = {
  title: 'Nos services',
  description:
    'Captation multicaméra, diffusion en direct, production et montage vidéo, plateaux TV, couverture de cérémonies et films institutionnels au Sénégal.',
  alternates: { canonical: '/services' },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title="Six prestations audiovisuelles, définies projet par projet"
        lead="Chaque prestation décrit un périmètre d'intervention. Le dispositif technique, le nombre de postes et les livrables sont arrêtés au moment du devis, en fonction du lieu, de la durée et de l'usage prévu."
      />

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.slug} delay={i * 70}>
              <ServiceCard service={service} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

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
