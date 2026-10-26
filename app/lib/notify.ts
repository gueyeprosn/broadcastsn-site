import nodemailer from 'nodemailer';
import type { QuotePayload } from '@/lib/validation';

/**
 * Alerte par courriel à chaque demande de devis.
 *
 * Configuration (fichier `mail.env` à la racine du stack, jamais versionné) :
 *   SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS
 *   DEVIS_MAIL_TO    destinataire(s), séparés par des virgules
 *   DEVIS_MAIL_FROM  expéditeur (défaut : SMTP_USER) — doit être autorisé par le service SMTP
 *
 * L'alerte vient APRÈS l'enregistrement : si l'envoi échoue, la demande reste
 * dans le dépôt et l'échec est journalisé (`docker compose logs web`). Un
 * serveur de messagerie en panne ne doit jamais faire perdre une demande.
 */

const HOST = process.env.SMTP_HOST ?? '';
const PORT = Number(process.env.SMTP_PORT ?? 587);
const USER = process.env.SMTP_USER ?? '';
const PASS = process.env.SMTP_PASS ?? '';
const TO = process.env.DEVIS_MAIL_TO ?? '';
const FROM = process.env.DEVIS_MAIL_FROM || USER;

export const mailConfigured = Boolean(HOST && TO && FROM);

const transport = mailConfigured
  ? nodemailer.createTransport({
      host: HOST,
      port: PORT,
      secure: PORT === 465, // 465 = TLS implicite ; 587 = STARTTLS, exigé ci-dessous
      requireTLS: PORT !== 465,
      auth: USER ? { user: USER, pass: PASS } : undefined,
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    })
  : null;

/** Retire les retours à la ligne : une valeur saisie ne doit jamais fabriquer d'en-tête. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ').trim();

function render(p: Omit<QuotePayload, 'website'>, receivedAt: string): string {
  const rows: [string, string][] = [
    ['Nom', p.fullName],
    ['Organisation', p.organization],
    ['E-mail', p.email],
    ['Téléphone', p.phone],
    ["Type d'événement", p.eventType],
    ['Date', p.eventDate],
    ['Lieu', p.location],
    ['Prestations', p.services.join(', ')],
    ['Durée', p.duration],
    ['Budget', p.budget],
  ];
  return [
    'Nouvelle demande de devis reçue sur le site.',
    '',
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k} : ${v}`),
    '',
    'Message :',
    p.message,
    '',
    '—',
    `Reçue le ${receivedAt} (UTC). Répondre à ce courriel écrit directement au demandeur.`,
  ].join('\n');
}

export async function notifyByMail(p: Omit<QuotePayload, 'website'>, receivedAt: string): Promise<void> {
  if (!transport) return;
  try {
    await transport.sendMail({
      from: FROM,
      to: TO,
      replyTo: { name: oneLine(p.fullName), address: p.email },
      subject: oneLine(`Demande de devis — ${p.eventType} — ${p.organization || p.fullName}`),
      text: render(p, receivedAt),
    });
  } catch (err) {
    console.error('[devis] alerte courriel non envoyée (demande bien enregistrée) :', (err as Error).message);
  }
}
