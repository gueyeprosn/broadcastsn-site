import type { Metadata } from 'next';
import { ArrowRight, Check } from 'lucide-react';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { ButtonLink } from '@/components/Button';
import { sectors } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Captation vidéo pour entreprises, institutions, ONG et médias au Sénégal',
  description:
    "Entreprises, institutions, ONG, conférences et séminaires, événements religieux et culturels, chaînes TV, web TV et radios : nos interventions audiovisuelles par secteur au Sénégal.",
  alternates: { canonical: '/secteurs' },
};

export default function SectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Secteurs d'activité"
        title="Chaque secteur a ses exigences"
        lead="Le dispositif, la posture des équipes sur le terrain et les livrables attendus ne sont pas les mêmes selon le contexte. Voici comment nous abordons les principaux."
      />

      <section className="py-20 lg:py-28">
        <div className="shell space-y-5">
          {sectors.map((sector, i) => {
            const Icon = sector.icon;
            return (
              <Reveal key={sector.slug} delay={i * 50}>
                <article
                  id={sector.slug}
                  className="scroll-mt-28 rounded-card border hairline bg-surface/50 p-8 lg:p-12"
                >
                  <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
                    <div>
                      <span className="flex h-11 w-11 items-center justify-center rounded-card border hairline bg-ink/60 text-signal">
                        <Icon size={19} aria-hidden />
                      </span>
                      <h2 className="mt-6 text-2xl font-semibold leading-snug">{sector.title}</h2>
                      <p className="mt-4 max-w-2xl leading-relaxed text-muted">
                        {sector.description}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xs uppercase tracking-[0.18em] text-muted">
                        Interventions courantes
                      </h3>
                      <ul className="mt-5 space-y-2.5">
                        {sector.needs.map((need) => (
                          <li key={need} className="flex items-start gap-3">
                            <Check size={15} className="mt-1 shrink-0 text-signal" aria-hidden />
                            <span className="text-sm text-bone/85">{need}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-t hairline py-20 lg:py-24">
        <div className="shell text-center">
          <h2 className="mx-auto max-w-2xl text-2xl font-semibold sm:text-3xl">
            Votre secteur n&rsquo;apparaît pas ?
          </h2>
          <p className="mx-auto mt-5 max-w-xl leading-relaxed text-muted">
            Cette liste reflète les contextes les plus fréquents, pas une limite.
            Présentez-nous votre projet.
          </p>
          <div className="mt-9 flex justify-center">
            <ButtonLink href="/contact">
              Nous en parler
              <ArrowRight size={16} aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
