'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Logo from './Logo';
import { nav } from '@/lib/site';

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Referme le menu à chaque navigation.
  useEffect(() => setOpen(false), [pathname]);

  // Empêche le défilement de l'arrière-plan quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Échap ferme le menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b hairline bg-ink/95 backdrop-blur-md">
      <div className="shell flex h-20 items-center justify-between gap-6">
        <div className="flex items-center gap-8">
          <Logo variant="noir" className="w-36 sm:w-40" priority />
          <span aria-hidden className="hidden h-10 w-px bg-bone/20 lg:block" />
        </div>

        <nav className="hidden flex-1 items-center gap-8 lg:flex" aria-label="Navigation principale">
          {nav
            .filter((item) => item.href !== '/')
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
                className={`label py-2 transition-colors duration-200 hover:text-bone ${
                  isActive(item.href)
                    ? 'text-bone underline decoration-accent decoration-2 underline-offset-[10px]'
                    : 'text-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
        </nav>

        <Link
          href="/contact"
          className="label hidden min-h-[44px] items-center gap-2 bg-bone px-5 text-ink transition-colors duration-200 hover:bg-bone/85 lg:inline-flex"
        >
          Demander un devis
          <ArrowUpRight size={15} aria-hidden />
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="-mr-2 flex h-11 w-11 items-center justify-center text-bone lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? <X size={22} aria-hidden /> : <Menu size={22} aria-hidden />}
        </button>
      </div>

      <div id="menu-mobile" hidden={!open} className="h-[calc(100dvh-5rem)] overflow-y-auto border-t hairline bg-ink lg:hidden">
        <nav className="shell flex flex-col py-4" aria-label="Navigation mobile">
          {nav.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className="flex items-baseline gap-4 border-b hairline py-4"
            >
              <span className="label text-muted">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-display text-3xl uppercase">{item.label}</span>
            </Link>
          ))}
          <Link
            href="/contact"
            className="label mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 bg-accent px-5 text-onaccent"
          >
            Demander un devis
            <ArrowUpRight size={15} aria-hidden />
          </Link>
        </nav>
      </div>
    </header>
  );
}
