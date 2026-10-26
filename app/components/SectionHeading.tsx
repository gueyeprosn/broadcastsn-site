import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';

/**
 * Intitulé de section : sur-titre technique, grand titre condensé, chapô.
 * `split` place le chapô à droite du titre sur grand écran, comme un cartouche.
 */
export default function SectionHeading({
  eyebrow,
  title,
  lead,
  align = 'left',
  split = false,
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: 'left' | 'center';
  split?: boolean;
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <div
      className={`${
        split ? 'grid gap-6 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-16' : centered ? 'mx-auto max-w-3xl text-center' : 'max-w-4xl'
      } ${className}`}
    >
      <div>
        {eyebrow && <Eyebrow className={`mb-6 ${centered ? 'justify-center' : ''}`}>{eyebrow}</Eyebrow>}
        <h2 className="dot text-[2.5rem] leading-[1.1] sm:text-5xl lg:text-[4.25rem]">{title}</h2>
      </div>
      {lead && (
        <p
          className={`text-base leading-relaxed text-muted sm:text-lg ${
            split ? 'max-w-md lg:pb-2' : `mt-6 ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`
          }`}
        >
          {lead}
        </p>
      )}
    </div>
  );
}
