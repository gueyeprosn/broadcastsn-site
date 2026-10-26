import type { Metadata } from 'next';
import { ArrowUpRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import ProjectCard from '@/components/ProjectCard';
import { ButtonLink } from '@/components/Button';
import { projects, youtubeId } from '@/lib/content';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Réalisations : captations et directs au Sénégal et aux États-Unis',
  description:
    'Réalisations de Broadcast Senegal au Sénégal et aux États-Unis : Afrik Impact Summit (African Leadership Group, Denver), Sports Business Forum (Atlantic Council), Rencontres Santé Numérique (Amref Health Africa), Forum de Dakar #2.',
  alternates: { canonical: '/realisations' },
};

/** Repères établis par les fiches elles-mêmes : rien qui ne soit vérifiable plus bas. */
const proof = [
  { big: site.experience, small: 'De terrain' },
  { big: 'Sénégal · USA', small: 'Interventions' },
  { big: '2021 → 2024', small: 'Projets référencés' },
  { big: `${projects.filter((p) => p.video && youtubeId(p.video.url)).length} captations`, small: 'Consultables en ligne' },
];

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title="Du Sénégal aux États-Unis"
        lead="Chaque projet ci-dessous a été réalisé par nos équipes. Quand une captation est publiée sur la chaîne officielle de l'organisateur, le lien est là : vous pouvez juger notre travail sur pièce, sans avoir à nous demander d'exemple."
      />

      <section className="py-16 lg:py-20">
        <div className="shell">
          <ul className="grid border-y hairline sm:grid-cols-2 lg:grid-cols-4">
            {proof.map((c, i) => (
              <li
                key={c.big}
                className={[
                  'hairline px-4 py-7 text-center',
                  i > 0 && 'border-t',
                  i === 1 && 'sm:border-l sm:border-t-0',
                  i === 3 && 'sm:border-l',
                  i > 0 && 'lg:border-l lg:border-t-0',
                ]
                  .filter(Boolean)
                  .join(' ')}
              >
                <p className="font-display text-3xl uppercase leading-none">{c.big}</p>
                <p className="label mt-3 text-muted">{c.small}</p>
              </li>
            ))}
          </ul>

          <div className="mt-20 space-y-20">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="theme-dark py-20 lg:py-24">
        <div className="shell flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="dot text-4xl leading-[1.1] sm:text-5xl">Votre événement, le prochain</h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Décrivez-nous votre événement et ce que vous attendez des images. Nous vous
            proposons le dispositif adapté.
          </p>
          <ButtonLink href="/contact">
            Demander un devis
            <ArrowUpRight size={15} aria-hidden />
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
