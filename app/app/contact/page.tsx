import type { Metadata } from 'next';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import PageHero from '@/components/PageHero';
import QuoteForm from '@/components/QuoteForm';
import { intakeMode } from '@/lib/intake';
import { site, contact, hasDirectContact, whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from '@/components/WhatsAppButton';

export const metadata: Metadata = {
  title: 'Devis captation vidéo et live streaming — Contact',
  description:
    "Demandez un devis pour la captation vidéo, la diffusion en direct ou la production de votre événement au Sénégal, ou pour un projet de chaîne TV, web TV ou radio. Réponse par e-mail ou WhatsApp.",
  alternates: { canonical: '/contact' },
};

// La page lit l'état réel de la réception des formulaires à chaque requête.
export const dynamic = 'force-dynamic';

export default async function ContactPage() {
  const mode = await intakeMode();
  const canReceive = mode !== 'none';

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Parlons de votre prochain événement"
        lead="Décrivez-nous votre projet : type d'événement, date, lieu et usage prévu des images. Nous étudierons vos besoins pour vous proposer une solution adaptée."
      />

      <section className="py-20 lg:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
          <div>
            <h2 className="text-2xl font-semibold">Demande de devis</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              Plus votre description est précise, plus notre proposition le sera.
            </p>
            <div className="mt-10">
              <QuoteForm canReceive={canReceive} />
            </div>
          </div>

          <aside id="contact" className="scroll-mt-28">
            <div className="rounded-card border hairline bg-surface/60 p-8">
              <h2 className="text-lg font-semibold">Nous joindre</h2>

              <ul className="mt-7 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin size={17} className="mt-0.5 shrink-0 text-signal" aria-hidden />
                  <span className="text-bone/85">
                    {contact.address ?? `${site.city}, ${site.country}`}
                  </span>
                </li>

                {contact.email && (
                  <li className="flex items-start gap-3">
                    <Mail size={17} className="mt-0.5 shrink-0 text-signal" aria-hidden />
                    <a href={`mailto:${contact.email}`} className="text-bone/85 hover:text-signal">
                      {contact.email}
                    </a>
                  </li>
                )}

                {contact.whatsapp && (
                  <li className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 text-signal">
                      <WhatsAppIcon size={17} />
                    </span>
                    <a
                      href={whatsappLink() ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-bone/85 hover:text-signal"
                    >
                      WhatsApp {contact.whatsapp}
                    </a>
                  </li>
                )}

                {contact.phone && (
                  <li className="flex items-start gap-3">
                    <Phone size={17} className="mt-0.5 shrink-0 text-signal" aria-hidden />
                    <a
                      href={`tel:${contact.phone.replace(/[^+0-9]/g, '')}`}
                      className="text-bone/85 hover:text-signal"
                    >
                      {contact.phone}
                    </a>
                  </li>
                )}

                <li className="flex items-start gap-3">
                  <Clock size={17} className="mt-0.5 shrink-0 text-signal" aria-hidden />
                  <span className="text-bone/85">
                    Réponse après étude de votre demande
                  </span>
                </li>
              </ul>

              {!hasDirectContact && (
                <p className="mt-7 border-t hairline pt-6 text-xs leading-relaxed text-muted">
                  Les coordonnées directes (adresse électronique, téléphone) seront publiées
                  ici une fois confirmées par Broadcast Senegal. En attendant, le formulaire
                  reste le moyen de nous joindre.
                </p>
              )}
            </div>

            <div className="mt-5 rounded-card border hairline bg-surface/60 p-8">
              <h2 className="text-lg font-semibold">Zone d&rsquo;intervention</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {site.country} entier et États-Unis, sous réserve des contraintes logistiques
                et techniques propres à chaque projet. Pour les événements hors de {site.city},
                précisez le lieu dès votre demande : il entre dans le calcul du dispositif.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
