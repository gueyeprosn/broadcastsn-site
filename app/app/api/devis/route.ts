import { NextResponse } from 'next/server';
import { normalize, validate, hasErrors } from '@/lib/validation';
import { recordRequest } from '@/lib/intake';
import { notifyByMail } from '@/lib/notify';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Limitation de débit en mémoire : 5 envois par IP et par quart d'heure.
 * Suffisant pour un formulaire de devis sur une instance unique. Sur plusieurs
 * instances, il faudrait un magasin partagé (Redis) — ce n'est pas le cas ici.
 */
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);

  // Purge opportuniste pour éviter que la Map ne grossisse indéfiniment.
  if (hits.size > 500) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-real-ip') ??
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    'inconnue';

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, message: 'Trop de demandes envoyées. Réessayez dans quelques minutes.' },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, message: 'Requête illisible.' }, { status: 400 });
  }

  const payload = normalize(body);

  // Piège à robots : un humain ne remplit jamais ce champ, il est masqué.
  // On répond 200 sans rien enregistrer pour ne pas renseigner le robot.
  if (payload.website) {
    return NextResponse.json({ ok: true, stored: false, silent: true });
  }

  const errors = validate(payload);
  if (hasErrors(errors)) {
    return NextResponse.json(
      { ok: false, errors, message: 'Certains champs demandent une correction.' },
      { status: 422 },
    );
  }

  const { website: _ignored, ...clean } = payload;
  const result = await recordRequest(clean, { ip, userAgent: request.headers.get('user-agent') });

  if (!result.stored) {
    // Aucune confirmation n'est affichée si rien n'a pu être enregistré.
    return NextResponse.json(
      {
        ok: false,
        message:
          "Votre demande n'a pas pu être enregistrée : la réception des formulaires n'est pas encore configurée sur ce site. Contactez-nous directement en attendant.",
      },
      { status: 503 },
    );
  }

  // Alerte envoyée sans faire attendre le visiteur : la demande est déjà
  // enregistrée, un échec d'envoi est seulement journalisé.
  void notifyByMail(clean, new Date().toISOString());

  return NextResponse.json({ ok: true, stored: true });
}
