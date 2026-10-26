import { ArrowUpRight, Play } from 'lucide-react';
import IllustrationFrame from './IllustrationFrame';
import { youtubeId, type Project } from '@/lib/content';

/**
 * Fiche de réalisation : texte à gauche, preuve visuelle à droite.
 * Sans photo maison, on montre la miniature de la vidéo publique (servie par
 * YouTube) : c'est l'événement lui-même, pas une image empruntée.
 */
export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  const vid = project.video ? youtubeId(project.video.url) : null;
  const [main, ...rest] = project.images;

  const facts: [string, string][] = [
    ...(project.client ? [['Client', project.client] as [string, string]] : []),
    ['Lieu', project.place],
    ['Date', project.date],
  ];

  return (
    <article
      id={project.id}
      className="grid scroll-mt-28 gap-10 border-t hairline pt-14 lg:grid-cols-[1fr_1.15fr] lg:gap-16"
    >
      <div>
        <p className="label flex items-center gap-3 text-signal">
          <span className="font-display text-3xl normal-case leading-none tracking-normal">
            {String(index + 1).padStart(2, '0')}
          </span>
          {project.kind}
        </p>
        <h2 className="mt-5 text-4xl leading-[1.1] sm:text-5xl">{project.title}</h2>

        <dl className="mt-7 divide-y divide-bone/[0.14] border-y hairline text-sm">
          {facts.map(([k, v]) => (
            <div key={k} className="flex gap-4 py-2.5">
              <dt className="label w-16 shrink-0 pt-0.5 text-muted">{k}</dt>
              <dd className="text-bone/85">{v}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-7 space-y-2.5">
          {project.scope.map((s) => (
            <li key={s} className="flex gap-3 text-sm leading-relaxed text-bone/80">
              <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
              {s}
            </li>
          ))}
        </ul>

        {project.video && (
          <div className="mt-8">
            <a
              href={project.video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="label inline-flex min-h-[44px] items-center gap-2.5 bg-accent px-5 text-onaccent transition-colors hover:bg-accent-soft"
            >
              {vid ? 'Voir la captation' : 'Voir la chaîne officielle'}
              <ArrowUpRight size={15} aria-hidden />
              <span className="sr-only">(YouTube, nouvel onglet)</span>
            </a>
            <p className="label mt-3 text-muted">
              {vid ? 'Vidéo publique' : 'Chaîne YouTube du client'} · {project.video.channel}
            </p>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {main ? (
          <IllustrationFrame
            src={main.src}
            alt={main.alt}
            position={main.position}
            ratio="aspect-[16/10]"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ) : !vid || !project.video ? (
          // Ni photo ni vidéo dédiée : panneau typographique plutôt qu'une image empruntée.
          <div className="theme-dark flex aspect-[16/10] flex-col justify-between rounded-card p-7 sm:p-9">
            <p className="label text-muted">{project.kind}</p>
            <div>
              <p className="font-display text-4xl uppercase leading-[1.1] sm:text-5xl">{project.place}</p>
              <p className="label mt-4 text-signal">{project.date}</p>
            </div>
          </div>
        ) : (
          vid &&
          project.video && (
            <a
              href={project.video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-video overflow-hidden rounded-card bg-surface"
              aria-label={`Voir la captation ${project.title} sur YouTube (nouvel onglet)`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${vid}/hqdefault.jpg`}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 ease-soft group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-16 w-16 items-center justify-center bg-accent text-onaccent">
                  <Play size={22} aria-hidden fill="currentColor" />
                </span>
              </span>
              <span className="label absolute bottom-3 left-3 bg-[#08090B]/85 px-2 py-1 text-[#F4F3EF]">
                Image : vidéo publique
              </span>
            </a>
          )
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-2 gap-4">
            {rest.map((img) => (
              <IllustrationFrame
                key={img.src}
                src={img.src}
                alt={img.alt}
                position={img.position}
                ratio="aspect-[4/3]"
                sizes="(min-width: 1024px) 25vw, 50vw"
              />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
