import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import IllustrationFrame from './IllustrationFrame';
import type { Service } from '@/lib/services';

/** Fiche prestation : numéro et filet, planche visuelle, titre condensé, lien. */
export default function ServiceCard({ service, index }: { service: Service; index?: number }) {
  return (
    <Link href={`/services/${service.slug}`} className="group flex h-full flex-col">
      {index !== undefined && (
        <span aria-hidden className="mb-4 flex items-center gap-3">
          <span className="font-display text-3xl leading-none text-signal">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="h-px flex-1 bg-bone/25 transition-colors duration-300 group-hover:bg-accent" />
        </span>
      )}

      <div className="overflow-hidden rounded-card">
        <IllustrationFrame
          src={service.image.src}
          alt={service.image.alt}
          position={service.image.position}
          icon={service.icon}
          className="transition-transform duration-500 ease-soft group-hover:scale-[1.03]"
        />
      </div>

      <h3 className="mt-6 text-2xl leading-none">{service.title}</h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{service.short}</p>

      <span className="label mt-6 inline-flex items-center gap-2 text-signal">
        Découvrir
        <ArrowRight
          size={14}
          aria-hidden
          className="transition-transform duration-300 ease-soft group-hover:translate-x-1"
        />
      </span>
    </Link>
  );
}
