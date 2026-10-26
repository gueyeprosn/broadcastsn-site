import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { site } from '@/lib/site';

/**
 * Image de partage (Facebook, LinkedIn, WhatsApp, X) générée au build à partir
 * du logo officiel et des textes de `lib/site.ts` — rien d'autre n'y figure.
 * Next.js l'utilise aussi pour `twitter:image` faute de fichier dédié.
 */
export const alt = `${site.legalName} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), 'public/brand/broadcast-sn-blanc.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#08090B',
          padding: '72px 80px',
          color: '#F4F3EF',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {/* Le PNG a une marge interne à gauche : on la compense pour l'aligner sur le texte. */}
        <img src={logoSrc} width={576} height={155} alt="" style={{ marginLeft: -52 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ fontSize: 50, fontWeight: 700, lineHeight: 1.15, maxWidth: 980 }}>
            {`Captation audiovisuelle et production vidéo à ${site.city}`}
          </div>
          <div style={{ fontSize: 26, color: '#9297A1', maxWidth: 980, lineHeight: 1.4 }}>
            {site.description}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 24, color: '#9297A1' }}>
          <div style={{ width: 64, height: 6, background: '#FFC909' }} />
          <div>{site.url.replace('https://', '')}</div>
        </div>
      </div>
    ),
    size,
  );
}
