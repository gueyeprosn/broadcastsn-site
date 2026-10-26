import type { ReactNode } from 'react';
import Eyebrow from './Eyebrow';

/** Bandeau d'en-tête commun aux pages intérieures : titre à gauche, chapô en cartouche. */
export default function PageHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="border-b hairline pb-14 pt-32 lg:pb-20 lg:pt-40">
      <div className="shell">
        <Eyebrow>{eyebrow}</Eyebrow>
        <div className="mt-7 grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-16">
          <h1 className="dot text-[2.75rem] leading-[1.1] sm:text-6xl lg:text-[5.25rem]">{title}</h1>
          {lead && <p className="max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:pb-2">{lead}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
