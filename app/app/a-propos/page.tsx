import type { Metadata } from 'next';
import { ArrowRight } from 'lucide-react';
import PageHero from '@/components/PageHero';
import SectionHeading from '@/components/SectionHeading';
import IllustrationFrame from '@/components/IllustrationFrame';
import Reveal from '@/components/Reveal';
import { ButtonLink } from '@/components/Button';
import { commitments, method } from '@/lib/content';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'À propos — production audiovisuelle à Dakar depuis 14 ans',
  description:
    "Broadcast Senegal, structure audiovisuelle basée à Dakar, 14 ans de terrain au Sénégal et aux États-Unis : notre approche de la captation, du direct et de l'ingénierie broadcast.",
  alternates: { canonical: '/a-propos' },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une structure audiovisuelle au service de vos événements"
        lead={`Basée à ${site.city}, forte de ${site.experience} de terrain, Broadcast Senegal intervient sur l'ensemble du ${site.country} et aux États-Unis, sous réserve des contraintes logistiques et techniques propres à chaque projet.`}
      />

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          <Reveal>
            <SectionHeading
              eyebrow="Notre approche"
              title="Comprendre avant de filmer"
              lead="Un dispositif de captation n'a de valeur que s'il sert le propos de l'événement. C'est pourquoi notre travail commence par des questions, pas par du matériel."
            />
            <div className="mt-8 space-y-6 leading-relaxed text-muted">
              <p>
                Qui parle, à qui, pendant combien de temps, dans quelle salle, pour quel usage
                final : ces réponses déterminent les axes de caméra, la prise de son et le
                mode de réalisation bien plus sûrement qu&rsquo;un catalogue d&rsquo;options.
              </p>
              <p>
                Nous préférons annoncer ce qui est réalisable dans les conditions d&rsquo;un
                projet plutôt que de promettre un dispositif que le lieu, le calendrier ou le
                budget ne permettraient pas de tenir. Cette franchise fait partie de la
                prestation.
              </p>
              <p>
                Notre positionnement : un partenaire audiovisuel professionnel, rigoureux et
                attentif à la qualité de production, du premier échange à la remise des
                contenus.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <IllustrationFrame
              src="/photos/regie-studio-2.jpg"
              alt="Opérateur de Broadcast SN à la console audio d'une régie, devant le mur d'écrans"
              ratio="aspect-[4/5]"
              position="60% 50%"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
        </div>
      </section>

      <section className="border-t hairline bg-surface/40 py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading
              eyebrow="Nos engagements"
              title="Ce sur quoi nous nous engageons"
              lead="Des engagements de service, et non des certifications ou des résultats déjà démontrés."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 sm:grid-cols-2">
            {commitments.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className="h-full rounded-card border hairline bg-ink/40 p-8">
                  <h3 className="text-lg font-semibold">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t hairline py-20 lg:py-28">
        <div className="shell">
          <Reveal>
            <SectionHeading eyebrow="Notre méthode" title="Du brief à la livraison" />
          </Reveal>
          <ol className="mt-14 space-y-px overflow-hidden rounded-card border hairline bg-bone/[0.08]">
            {method.map((m, i) => (
              <Reveal key={m.step} delay={i * 60} className="bg-ink">
                <li className="flex flex-col gap-4 p-8 sm:flex-row sm:items-baseline sm:gap-10 lg:p-10">
                  <span className="font-display text-2xl font-semibold text-signal/30 sm:w-16">
                    {m.step}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{m.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{m.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-muted">
            Le dispositif technique et les livrables sont définis en fonction de chaque projet.
          </p>
        </div>
      </section>

      <section className="border-t hairline bg-surface/40 py-20 lg:py-24">
        <div className="shell text-center">
          <h2 className="mx-auto max-w-2xl text-2xl font-semibold sm:text-3xl">
            Travaillons ensemble
          </h2>
          <div className="mt-8 flex justify-center">
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
