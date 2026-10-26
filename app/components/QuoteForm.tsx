'use client';

import { useState } from 'react';
import { Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from './Button';
import {
  eventTypes, serviceOptions, durations,
  normalize, validate, hasErrors,
  type FieldErrors, type QuotePayload,
} from '@/lib/validation';

const field =
  'w-full rounded-card border hairline bg-ink/60 px-4 py-3 text-sm text-bone placeholder:text-muted/60 transition-colors duration-300 focus:border-accent/60';
const labelCls = 'mb-2 block text-sm text-bone/90';
const errCls = 'mt-1.5 text-xs text-signal';

const empty: QuotePayload = {
  fullName: '', organization: '', email: '', phone: '', eventType: '',
  eventDate: '', location: '', services: [], duration: '', budget: '',
  message: '', consent: false, website: '',
};

export default function QuoteForm({ canReceive }: { canReceive: boolean }) {
  const [data, setData] = useState<QuotePayload>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');

  const set = <K extends keyof QuotePayload>(key: K, value: QuotePayload[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (name: string) =>
    setData((d) => ({
      ...d,
      services: d.services.includes(name)
        ? d.services.filter((s) => s !== name)
        : [...d.services, name],
    }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerMessage('');

    // Validation locale d'abord, pour éviter un aller-retour inutile.
    const local = validate(normalize(data));
    if (hasErrors(local)) {
      setErrors(local);
      setStatus('error');
      setServerMessage('Certains champs demandent une correction.');
      document.getElementById('formulaire-devis')?.scrollIntoView({ block: 'start' });
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch('/api/devis', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      // On ne confirme que si le serveur a confirmé l'enregistrement.
      if (res.ok && json.ok && json.stored) {
        setStatus('sent');
        setData(empty);
        return;
      }

      setStatus('error');
      setErrors(json.errors ?? {});
      setServerMessage(
        json.message ?? "Votre demande n'a pas pu être envoyée. Réessayez dans un instant.",
      );
    } catch {
      setStatus('error');
      setServerMessage(
        'Connexion impossible. Vérifiez votre réseau puis réessayez.',
      );
    }
  }

  if (status === 'sent') {
    return (
      <div className="rounded-card border border-accent/30 bg-accent/[0.06] p-10 text-center lg:p-14">
        <CheckCircle2 size={34} className="mx-auto text-signal" aria-hidden />
        <h2 className="mt-6 text-2xl font-semibold">Votre demande est enregistrée</h2>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-muted">
          Merci. Nous revenons vers vous après étude de votre besoin. Si votre événement
          est imminent, n&rsquo;hésitez pas à nous relancer.
        </p>
        <Button variant="secondary" className="mt-8" onClick={() => setStatus('idle')}>
          Envoyer une autre demande
        </Button>
      </div>
    );
  }

  return (
    <form id="formulaire-devis" onSubmit={onSubmit} noValidate className="scroll-mt-28">
      {!canReceive && (
        <div
          role="status"
          className="mb-8 flex items-start gap-4 rounded-card border border-accent/40 bg-accent/[0.07] p-5"
        >
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-signal" aria-hidden />
          <p className="text-sm leading-relaxed text-bone/90">
            <strong className="font-semibold">Formulaire en mode démonstration.</strong>{' '}
            La réception des demandes n&rsquo;est pas encore configurée sur ce site : ce
            formulaire n&rsquo;enverra rien pour l&rsquo;instant et ne confirmera aucune
            demande. Utilisez un contact direct en attendant.
          </p>
        </div>
      )}

      {status === 'error' && serverMessage && (
        <div
          role="alert"
          className="mb-8 flex items-start gap-4 rounded-card border border-accent/40 bg-accent/[0.07] p-5"
        >
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-signal" aria-hidden />
          <p className="text-sm leading-relaxed text-bone/90">{serverMessage}</p>
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelCls} htmlFor="fullName">
            Nom et prénom <span className="text-signal">*</span>
          </label>
          <input
            id="fullName" name="fullName" className={field} autoComplete="name" required
            value={data.fullName} onChange={(e) => set('fullName', e.target.value)}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'err-fullName' : undefined}
          />
          {errors.fullName && <p id="err-fullName" className={errCls}>{errors.fullName}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="organization">Organisation</label>
          <input
            id="organization" name="organization" className={field} autoComplete="organization"
            value={data.organization} onChange={(e) => set('organization', e.target.value)}
          />
          {errors.organization && <p className={errCls}>{errors.organization}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="email">
            Adresse électronique professionnelle <span className="text-signal">*</span>
          </label>
          <input
            id="email" name="email" type="email" className={field} autoComplete="email" required
            value={data.email} onChange={(e) => set('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'err-email' : undefined}
          />
          {errors.email && <p id="err-email" className={errCls}>{errors.email}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="phone">Téléphone (avec indicatif)</label>
          <input
            id="phone" name="phone" type="tel" className={field} autoComplete="tel"
            placeholder="+221 ..."
            value={data.phone} onChange={(e) => set('phone', e.target.value)}
            aria-invalid={!!errors.phone}
          />
          {errors.phone && <p className={errCls}>{errors.phone}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="eventType">
            Type d&rsquo;événement ou de projet <span className="text-signal">*</span>
          </label>
          <select
            id="eventType" name="eventType" className={field} required
            value={data.eventType} onChange={(e) => set('eventType', e.target.value)}
            aria-invalid={!!errors.eventType}
          >
            <option value="">Sélectionner…</option>
            {eventTypes.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.eventType && <p className={errCls}>{errors.eventType}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="eventDate">Date prévue</label>
          <input
            id="eventDate" name="eventDate" type="date" className={field}
            value={data.eventDate} onChange={(e) => set('eventDate', e.target.value)}
            aria-invalid={!!errors.eventDate}
          />
          {errors.eventDate && <p className={errCls}>{errors.eventDate}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="location">Lieu</label>
          <input
            id="location" name="location" className={field} placeholder="Ville, salle, site…"
            value={data.location} onChange={(e) => set('location', e.target.value)}
          />
          {errors.location && <p className={errCls}>{errors.location}</p>}
        </div>

        <div>
          <label className={labelCls} htmlFor="duration">Durée estimée</label>
          <select
            id="duration" name="duration" className={field}
            value={data.duration} onChange={(e) => set('duration', e.target.value)}
          >
            <option value="">Sélectionner…</option>
            {durations.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        <div className="sm:col-span-2">
          <fieldset>
            <legend className={labelCls}>Prestations recherchées</legend>
            <div className="mt-1 flex flex-wrap gap-2.5">
              {serviceOptions.map((name) => {
                const on = data.services.includes(name);
                return (
                  <button
                    key={name} type="button" onClick={() => toggleService(name)}
                    aria-pressed={on}
                    className={`border px-4 py-2 text-sm transition-all duration-300 ease-soft ${
                      on
                        ? 'border-accent bg-accent text-onaccent'
                        : 'hairline bg-bone/[0.03] text-muted hover:border-accent/40 hover:text-bone'
                    }`}
                  >
                    {name}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="budget">
            Budget indicatif <span className="text-muted">(facultatif)</span>
          </label>
          <input
            id="budget" name="budget" className={field}
            placeholder="Une fourchette suffit"
            value={data.budget} onChange={(e) => set('budget', e.target.value)}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={labelCls} htmlFor="message">
            Description du besoin <span className="text-signal">*</span>
          </label>
          <textarea
            id="message" name="message" rows={6} className={`${field} resize-y`} required
            placeholder="Programme, nombre d'intervenants, contraintes du lieu, usage prévu des images…"
            value={data.message} onChange={(e) => set('message', e.target.value)}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'err-message' : undefined}
          />
          {errors.message && <p id="err-message" className={errCls}>{errors.message}</p>}
        </div>
      </div>

      {/* Piège à robots : masqué aux humains et aux lecteurs d'écran. */}
      <div className="absolute left-[-9999px]" aria-hidden>
        <label htmlFor="website">Ne pas remplir</label>
        <input
          id="website" name="website" tabIndex={-1} autoComplete="off"
          value={data.website} onChange={(e) => set('website', e.target.value)}
        />
      </div>

      <div className="mt-8">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox" required checked={data.consent}
            onChange={(e) => set('consent', e.target.checked)}
            aria-invalid={!!errors.consent}
            className="mt-1 h-4 w-4 shrink-0 accent-[#FFC909]"
          />
          <span className="text-sm leading-relaxed text-muted">
            J&rsquo;accepte que les informations transmises soient utilisées pour traiter ma
            demande et me recontacter. Elles ne sont ni revendues ni transmises à des tiers
            à des fins commerciales. <span className="text-signal">*</span>
          </span>
        </label>
        {errors.consent && <p className={errCls}>{errors.consent}</p>}
      </div>

      <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? (
            <>
              <Loader2 size={16} aria-hidden className="animate-spin" />
              Envoi en cours…
            </>
          ) : (
            <>
              Envoyer la demande
              <Send size={16} aria-hidden />
            </>
          )}
        </Button>
        <p className="text-xs text-muted">
          Les champs marqués <span className="text-signal">*</span> sont obligatoires.
        </p>
      </div>
    </form>
  );
}
