import Link from 'next/link';
import type { ComponentProps, ReactNode } from 'react';

/**
 * primary : jaune du logo, texte noir (seule association lisible du jaune).
 * solid   : noir plein, pour les appels secondaires sur fond clair.
 * secondary : contour, s'adapte au thème de la section.
 */
type Variant = 'primary' | 'solid' | 'secondary' | 'ghost';

const base =
  'inline-flex min-h-[44px] items-center whitespace-nowrap justify-center gap-2.5 rounded-card px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] transition-colors duration-200 ease-soft disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary: 'bg-accent text-onaccent hover:bg-accent-soft',
  solid: 'bg-bone text-ink hover:bg-bone/85',
  secondary: 'border border-bone/40 text-bone hover:border-bone hover:bg-bone/[0.04]',
  ghost: 'px-0 text-bone underline decoration-accent decoration-2 underline-offset-[6px] hover:decoration-bone',
};

export function ButtonLink({
  href,
  variant = 'primary',
  className = '',
  children,
  ...rest
}: { href: string; variant?: Variant; className?: string; children: ReactNode } & Omit<
  ComponentProps<typeof Link>,
  'href' | 'className' | 'children'
>) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: { variant?: Variant } & ComponentProps<'button'>) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}
