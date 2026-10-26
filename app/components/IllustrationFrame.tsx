import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';

/**
 * Cadre visuel.
 *
 * Tant qu'aucune image réelle n'est fournie, affiche une planche technique
 * (trame, repères de cadrage, pictogramme de la prestation) portant la mention
 * « Visuel d'illustration ». On n'utilise aucune photographie présentée comme
 * une production de Broadcast SN : le propriétaire remplace ces cadres par ses
 * propres images en renseignant `src`.
 */
export default function IllustrationFrame({
  src,
  alt,
  ratio = 'aspect-[4/3]',
  label = "Visuel d'illustration",
  icon: Icon,
  position,
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
  className = '',
  priority = false,
}: {
  src?: string;
  /** Cadrage de la photo dans son cadre (CSS object-position). */
  position?: string;
  sizes?: string;
  alt: string;
  ratio?: string;
  label?: string;
  icon?: LucideIcon;
  className?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-card ${ratio} ${className}`}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          style={position ? { objectPosition: position } : undefined}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden rounded-card bg-surface text-bone ${ratio} ${className}`}
      role="img"
      aria-label={`${alt} — ${label}`}
    >
      <svg
        aria-hidden
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 400 300"
      >
        <defs>
          <pattern id="grid-illus" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0v20" fill="none" stroke="currentColor" strokeOpacity="0.07" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="400" height="300" fill="url(#grid-illus)" />
        {/* Tiers de cadrage et repères d'angle, comme dans un viseur. */}
        <path d="M133 0V300M267 0V300M0 100H400M0 200H400" stroke="currentColor" strokeOpacity="0.08" />
        <g stroke="currentColor" strokeOpacity="0.45" strokeWidth="1.5" fill="none">
          <path d="M24 44V24H44M356 24H376V44M376 256V276H356M44 276H24V256" />
        </g>
        <g transform="translate(200 150)" fill="none" stroke="#FFC909" strokeWidth="1.5">
          <circle r="46" strokeOpacity="0.9" />
          <path d="M-62 0H-50M50 0H62M0-62V-50M0 50V62" />
        </g>
      </svg>
      {Icon && (
        <Icon
          aria-hidden
          strokeWidth={1.25}
          className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 text-bone/70"
        />
      )}
      <span className="label absolute bottom-3 left-3 bg-ink/80 px-2 py-1 text-muted">{label}</span>
    </div>
  );
}
