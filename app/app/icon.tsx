import { ImageResponse } from 'next/og';
import BrandMark from '@/components/BrandMark';

/** Favicon : le monogramme « SN » du logo, généré au build (aucun fichier binaire à maintenir). */
export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(<BrandMark size={64} />, size);
}
