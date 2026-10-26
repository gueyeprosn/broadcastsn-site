import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { ButtonLink } from '@/components/Button';
import Eyebrow from '@/components/Eyebrow';
import SectionHeading from '@/components/SectionHeading';
import ServiceCard from '@/components/ServiceCard';
import Image from 'next/image';
import IllustrationFrame from '@/components/IllustrationFrame';
import Reveal from '@/components/Reveal';
import { services } from '@/lib/services';
import { sectors, commitments, method, projects } from '@/lib/content';
import { site } from '@/lib/site';

/**
 * Repères du hero et bandeau d'engagements : uniquement des faits établis
 * (ancienneté et pays confirmés par le propriétaire, nombre de prestations).
 * Aucun chiffre de performance, d'effectif ou de parc matériel.
 */
const heroFacts = [`${site.experience} de terrain`, site.countries.join(' · '), `${services.length} prestations`];

const commitmentStrip = [
  { big: 'Repérage', small: commitments[0].title },
  { big: 'Sur mesure', small: commitments[1].title },
  { big: 'Image + son', small: commitments[2].title },
  { big: 'De bout en bout', small: commitments[3].title },
];

/**
 * Photos de terrain fournies par Broadcast SN. La première porte un logo
 * incrusté en haut : le cadrage bas l'écarte sur le format large.
 */
const fieldPhotos = [
  {
    src: '/photos/conference-salle.jpg',
    alt: "Captation d'une conférence dans un grand auditorium, caméras au premier plan et intervenante sur l'écran géant",
    caption: 'Conférence en auditorium',
    position: '50% 100%',
  },
  {
    src: '/photos/regie-studio.jpg',
    alt: "Réalisateur devant le multiviewer d'une régie de studio",
    caption: 'Régie de studio',
  },
  {
    src: '/photos/regie-soiree.jpg',
    alt: "Technicien devant l'écran de contrôle d'une régie installée en extérieur, lors d'une soirée",
    caption: 'Événement en soirée',
  },
  {
    src: '/photos/regie-studio-2.jpg',
    alt: 'Opérateur à la console audio devant le mur d’écrans d’une régie',
    caption: 'Console son en régie',
  },
  {
    src: '/photos/captation-stade.jpg',
    alt: "Cadreur au bord du terrain d'un stade, caméra sur trépied",
    caption: 'Captation en stade',
    position: '50% 12%',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------- Hero ---------------- */}
      <section className="pb-16 pt-28 lg:pb-20 lg:pt-36">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-12">
          <div>
            <Eyebrow className="animate-rise">
              {site.city}, {site.country} / {site.tagline}
            </Eyebrow>

            <h1 className="mt-8 animate-rise text-[3.1rem] leading-[1.1] sm:text-7xl lg:text-[5.2rem] xl:text-[5.8rem]">
              Chaque événement mérite une image{' '}
              <span className="mark">à sa hauteur</span>
              <span aria-hidden className="ml-[0.04em] inline-block h-[0.15em] w-[0.15em] bg-accent" />
            </h1>

            <p className="mt-8 max-w-lg text-base leading-relaxed text-muted sm:text-lg">{site.description}</p>

            <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
              <ButtonLink href="/contact">
                Lancer un projet
                <ArrowUpRight size={15} aria-hidden />
              </ButtonLink>
              <ButtonLink href="/services" variant="ghost">
                Voir nos services
                <ArrowRight size={15} aria-hidden />
              </ButtonLink>
            </div>

            <ul className="label mt-12 flex flex-wrap border-t hairline pt-5 text-muted">
              {heroFacts.map((f, i) => (
                <li key={f} className={`py-1 pr-5 ${i > 0 ? 'hairline sm:border-l sm:pl-5' : ''}`}>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Visible dès le chargement : pas d'apparition au défilement au-dessus de la ligne de flottaison. */}
          <figure className="animate-rise">
            {/* Montage fourni par Broadcast SN, fond transparent : affiché en entier, sans recadrage. */}
            <div className="relative aspect-[842/596]">
              <Image
                src="/photos/montage-productions.png"
                alt="Montage de quatre photos de productions Broadcast SN — régie multicaméra, plateau de conférence, opérateur en régie et régie de salle — avec le logo Broadcast SN au centre"
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="label mt-2 flex items-center gap-3 text-muted">
              <span aria-hidden className="h-px w-8 bg-accent" />
              <span className="text-signal">Sur le terrain</span>
              Dispositif défini projet par projet
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ---------------- Bandeau secteurs ---------------- */}
      <section className="theme-dark" aria-label="Secteurs d'activité">
        <ul className="shell label grid grid-cols-2 py-4 text-bone/85 sm:grid-cols-3 lg:grid-cols-6">
          {sectors.map((s, i) => (
            <li
              key={s.slug}
              className={`py-2 text-center ${i > 0 ? 'lg:border-l lg:border-bone/20' : ''}`}
            >
              <a href={`/secteurs#${s.slug}`} className="transition-colors hover:text-signal">
                {s.title.split(' et ')[0]}
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------------- Références ---------------- */}
      <section className="border-b hairline py-12 lg:py-14" aria-labelledby="references-titre">
        <div className="shell grid gap-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-16">
          <div>
            <p id="references-titre" className="label text-muted">Références</p>
            <p className="mt-2 font-display text-2xl uppercase leading-none">Sénégal · États-Unis</p>
          </div>
          <ul className="grid gap-px bg-bone/[0.14] sm:grid-cols-2 xl:grid-cols-5">
            {projects.map((p) => (
              <li key={p.id} className="bg-ink">
                <a
                  href={`/realisations#${p.id}`}
                  className="group flex h-full items-start justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface"
                >
                  <span>
                    <span className="block font-display text-xl uppercase leading-tight">{p.title}</span>
                    <span className="label mt-1.5 block text-muted">
                      {p.client ? p.client.split(' — ')[0] : p.place} · {p.date.match(/\d{4}/g)?.join('–')}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    aria-hidden
                    className="mt-1 shrink-0 text-signal transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Prestations ---------------- */}
      <section id="services" className="py-24 lg:py-32">
        <div className="shell">
          <Reveal>
            <SectionHeading
              split
              eyebrow="Capter / produire / diffuser"
              title="Tout le cycle de l'image"
              lead="Captation, réalisation, direct et montage forment une seule chaîne. Le périmètre de chaque prestation est arrêté avec vous au moment du devis."
            />
          </Reveal>

          <div className="mt-16 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 80}>
                <ServiceCard service={service} index={i} />
              </Reveal>
            ))}
          </div>

          {/* Bandeau d'engagements, au format des repères chiffrés de la référence */}
          <Reveal className="mt-24">
            <ul className="grid border-y hairline sm:grid-cols-2 lg:grid-cols-4">
              {commitmentStrip.map((c, i) => (
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
          </Reveal>
        </div>
      </section>

      {/* ---------------- Sur le terrain ---------------- */}
      <section className="border-t hairline py-24 lg:py-32">
        <div className="shell">
          <Reveal>
            <SectionHeading
              split
              eyebrow="Sur le terrain"
              title="Nos équipes en intervention"
              lead="Régies de conférence, de studio ou d'événement en soirée : des images de nos équipes au travail, sur des dispositifs montés pour chaque projet."
            />
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {fieldPhotos.map((p, i) => (
              <Reveal
                key={p.src}
                delay={(i % 4) * 70}
                className={i === 0 ? 'sm:col-span-2 lg:col-span-4' : ''}
              >
                <figure>
                  <IllustrationFrame
                    src={p.src}
                    alt={p.alt}
                    position={p.position}
                    ratio={i === 0 ? 'aspect-[4/3] sm:aspect-[5/2]' : 'aspect-[4/3]'}
                    sizes={i === 0 ? '100vw' : '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw'}
                  />
                  <figcaption className="label mt-3 flex items-center gap-3 text-muted">
                    <span className="text-signal">{String(i + 1).padStart(2, '0')}</span>
                    {p.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- Méthode + appel à l'action ---------------- */}
      <section className="theme-dark py-24 lg:py-32">
        <div className="shell">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.3fr] lg:items-center lg:gap-16">
            <Reveal>
              <Eyebrow>Du brief à la livraison</Eyebrow>
              <h2 className="mt-7 text-[2.75rem] leading-[1.1] sm:text-6xl lg:text-7xl">
                Un seul interlocuteur.
                <br />
                <span className="text-signal">Aucune rupture.</span>
              </h2>
              <p className="mt-7 max-w-md leading-relaxed text-muted">
                Le même interlocuteur suit votre projet du premier échange à la remise des
                contenus. Le dispositif et les livrables sont définis pour chaque événement.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <ol className="relative grid gap-8 sm:grid-cols-4 sm:gap-4">
                {/* Ligne de production reliant les étapes */}
                <span
                  aria-hidden
                  className="absolute left-[5px] top-0 h-full w-px bg-accent/70 sm:left-0 sm:top-[5px] sm:h-px sm:w-full"
                />
                {method.map((m) => {
                  const Icon = m.icon;
                  return (
                    <li key={m.step} className="relative pl-8 sm:pl-0 sm:pt-8">
                      <span
                        aria-hidden
                        className="absolute left-0 top-1 h-3 w-3 rounded-full border-2 border-accent bg-ink sm:top-0"
                      />
                      <p className="label text-signal">{m.step}</p>
                      <h3 className="mt-2 text-xl leading-none">{m.title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted">{m.text}</p>
                      <Icon size={20} strokeWidth={1.5} aria-hidden className="mt-4 text-bone/60" />
                    </li>
                  );
                })}
              </ol>
            </Reveal>
          </div>

          <Reveal className="mt-20">
            <div className="flex flex-col gap-8 border-t hairline pt-10 lg:flex-row lg:items-center lg:justify-between">
              <h2 className="dot text-4xl leading-none sm:text-5xl">Parlons de votre événement</h2>
              <p className="max-w-sm text-sm leading-relaxed text-muted">
                Décrivez le programme, le lieu et l&rsquo;usage prévu des images. Nous vous
                proposons le dispositif adapté.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/contact">
                  Demander un devis
                  <ArrowUpRight size={15} aria-hidden />
                </ButtonLink>
                <ButtonLink href="/a-propos" variant="secondary">
                  Notre approche
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
