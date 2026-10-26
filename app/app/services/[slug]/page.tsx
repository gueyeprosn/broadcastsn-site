import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Info } from 'lucide-react';
import PageHero from '@/components/PageHero';
import IllustrationFrame from '@/components/IllustrationFrame';
import { ButtonLink } from '@/components/Button';
import { services, getService, serviceGroups } from '@/lib/services';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: 'Prestation introuvable' };
  return {
    title: service.title,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
    // Un `openGraph` défini ici remplace celui du layout : l'image de partage
    // racine doit donc être redéclarée, sinon ces pages partent sans visuel.
    openGraph: {
      title: `${service.title} — Broadcast SN`,
      description: service.short,
      url: `/services/${service.slug}`,
      images: ['/opengraph-image'],
    },
    twitter: { card: 'summary_large_image', images: ['/opengraph-image'] },
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  // D'abord les prestations du même métier, puis les autres.
  const others = [
    ...services.filter((s) => s.slug !== service.slug && s.group === service.group),
    ...services.filter((s) => s.group !== service.group),
  ].slice(0, 3);
  const group = serviceGroups[service.group];

  return (
    <>
      <PageHero eyebrow={`${group.label} / ${group.audience}`} title={service.title} lead={service.short}>
        <Link
          href="/services"
          className="mt-9 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-signal"
        >
          <ArrowLeft size={15} aria-hidden />
          Toutes les prestations
        </Link>
      </PageHero>

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div>
            {service.body.map((p) => (
              <p key={p.slice(0, 40)} className="mb-6 leading-relaxed text-muted last:mb-0">
                {p}
              </p>
            ))}

            <h2 className="mt-12 text-xl font-semibold">Ce que la prestation couvre</h2>
            <ul className="mt-6 space-y-3">
              {service.scope.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check size={16} className="mt-1 shrink-0 text-signal" aria-hidden />
                  <span className="text-sm leading-relaxed text-bone/85">{item}</span>
                </li>
              ))}
            </ul>

            {service.deliverables && (
              <div className="theme-dark mt-10 rounded-card p-6 sm:p-7">
                <h2 className="label font-mono text-signal">Ce que vous recevez</h2>
                <ul className="mt-4 flex flex-wrap gap-2.5">
                  {service.deliverables.map((d) => (
                    <li key={d} className="label border border-bone/25 px-3 py-2 text-bone">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {service.caveat && (
              <div className="mt-10 flex items-start gap-4 rounded-card border hairline bg-surface p-6">
                <Info size={18} className="mt-0.5 shrink-0 text-signal" aria-hidden />
                <p className="text-sm leading-relaxed text-muted">{service.caveat}</p>
              </div>
            )}

            <div className="mt-12">
              <ButtonLink href="/contact">
                Demander un devis pour cette prestation
                <ArrowRight size={16} aria-hidden />
              </ButtonLink>
            </div>
          </div>

          <div>
            <IllustrationFrame
              src={service.image.src}
              alt={service.image.alt}
              position={service.image.position}
              ratio="aspect-[4/5]"
              sizes="(min-width: 1024px) 40vw, 100vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="border-t hairline bg-surface/40 py-20 lg:py-24">
        <div className="shell">
          <h2 className="text-xl font-semibold">Autres prestations</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group rounded-card border hairline bg-ink/40 p-6 transition-all duration-500 ease-soft hover:-translate-y-1 hover:border-accent/40"
              >
                <h3 className="text-base font-semibold leading-snug">{s.title}</h3>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-signal">
                  En savoir plus
                  <ArrowRight size={14} aria-hidden className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
