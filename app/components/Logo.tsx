import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';

/**
 * Logo officiel. Deux déclinaisons fournies par le propriétaire :
 * `blanc` pour les fonds sombres (le site l'est partout), `noir` pour les
 * fonds clairs. Le fichier porte déjà la baseline et les couleurs du drapeau.
 */
export default function Logo({
  variant = 'blanc',
  className = '',
  priority = false,
}: {
  variant?: 'blanc' | 'noir';
  className?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 items-center transition-opacity duration-300 ease-soft hover:opacity-80 ${className}`}
      aria-label={`${site.legalName} — retour à l'accueil`}
    >
      <Image
        src={`/brand/broadcast-sn-${variant}.png`}
        alt={site.legalName}
        width={768}
        height={206}
        priority={priority}
        className="h-auto w-full"
      />
    </Link>
  );
}
