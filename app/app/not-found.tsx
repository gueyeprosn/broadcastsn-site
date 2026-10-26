import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { ButtonLink } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden pt-32">
      <div aria-hidden className="absolute inset-0 -z-10">
        <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1200 600">
          <defs>
            <pattern id="nf-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M48 0H0v48" fill="none" stroke="#FFC909" strokeOpacity="0.05" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="1200" height="600" fill="url(#nf-grid)" />
        </svg>
      </div>

      <div className="shell py-20">
        <p className="font-display text-7xl font-semibold text-signal/25 sm:text-8xl">404</p>
        <h1 className="mt-6 max-w-2xl text-3xl font-semibold leading-tight sm:text-4xl">
          Cette page n&rsquo;existe pas, ou plus.
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-muted">
          Le lien est peut-être erroné ou la page a été déplacée. Reprenez depuis
          l&rsquo;accueil ou consultez nos prestations.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <ButtonLink href="/">
            <ArrowLeft size={16} aria-hidden />
            Retour à l&rsquo;accueil
          </ButtonLink>
          <ButtonLink href="/services" variant="secondary">
            Voir nos services
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
