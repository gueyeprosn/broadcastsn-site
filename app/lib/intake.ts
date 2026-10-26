import { promises as fs } from 'node:fs';
import path from 'node:path';

/**
 * Réception des demandes de devis.
 *
 * Deux canaux possibles, cumulables :
 *   - DEVIS_WEBHOOK_URL : POST JSON vers un service externe (Make, n8n, Slack…)
 *   - DEVIS_STORE_PATH   : ajout d'une ligne JSON dans un fichier (défaut /data/devis.jsonl)
 *
 * Si aucun des deux n'est exploitable, le site l'annonce explicitement et
 * n'affiche AUCUNE confirmation : une demande perdue en silence est pire
 * qu'un formulaire désactivé.
 */

const STORE = process.env.DEVIS_STORE_PATH ?? '/data/devis.jsonl';
const WEBHOOK = process.env.DEVIS_WEBHOOK_URL ?? '';

export type IntakeMode = 'webhook' | 'file' | 'none';

/** Teste si le fichier de dépôt est réellement accessible en écriture. */
async function storeWritable(): Promise<boolean> {
  try {
    await fs.mkdir(path.dirname(STORE), { recursive: true });
    await fs.appendFile(STORE, '');
    return true;
  } catch {
    return false;
  }
}

export async function intakeMode(): Promise<IntakeMode> {
  if (WEBHOOK) return 'webhook';
  if (await storeWritable()) return 'file';
  return 'none';
}

export type IntakeResult = { stored: boolean; via: IntakeMode };

/** Enregistre la demande. `stored: false` ⇒ ne jamais afficher de confirmation. */
export async function recordRequest(payload: unknown, meta: Record<string, unknown>): Promise<IntakeResult> {
  const entry = { receivedAt: new Date().toISOString(), ...meta, request: payload };

  if (WEBHOOK) {
    try {
      const res = await fetch(WEBHOOK, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(entry),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) return { stored: true, via: 'webhook' };
    } catch {
      // On bascule sur le fichier plutôt que de perdre la demande.
    }
  }

  try {
    await fs.mkdir(path.dirname(STORE), { recursive: true });
    await fs.appendFile(STORE, `${JSON.stringify(entry)}\n`, 'utf8');
    return { stored: true, via: 'file' };
  } catch {
    return { stored: false, via: 'none' };
  }
}
