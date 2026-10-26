import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Logo from './Logo';
import { site, contact, socials, nav, whatsappLink } from '@/lib/site';
import { services } from '@/lib/services';

export default function Footer() {
  const year = new Date().getFullYear();
  const linkCls = 'text-sm text-bone/75 transition-colors hover:text-bone';

  return (
    <footer className="theme-dark border-t hairline">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1.2fr_1fr]">
          <div>
            <Logo variant="blanc" className="w-44" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted">
              Captation audiovisuelle, production vidéo et couverture événementielle
              à {site.city} et sur l&rsquo;ensemble du {site.country}.
            </p>
          </div>

          <nav aria-label="Pages">
            <h2 className="label font-mono text-muted">Navigation</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkCls}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Prestations">
            <h2 className="label font-mono text-muted">Prestations</h2>
            <ul className="mt-5 space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={linkCls}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="label font-mono text-muted">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm text-bone/75">
              <li>{contact.address ?? `${site.city}, ${site.country}`}</li>
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className={linkCls}>
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.whatsapp && (
                <li>
                  <a href={whatsappLink() ?? undefined} target="_blank" rel="noopener noreferrer" className={linkCls}>
                    WhatsApp {contact.whatsapp}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone.replace(/[^+0-9]/g, '')}`} className={linkCls}>
                    {contact.phone}
                  </a>
                </li>
              )}
            </ul>

            <Link
              href="/contact"
              className="label mt-6 inline-flex min-h-[44px] items-center gap-2 bg-accent px-5 text-onaccent transition-colors hover:bg-accent-soft"
            >
              Demander un devis
              <ArrowUpRight size={15} aria-hidden />
            </Link>

            {socials.length > 0 && (
              <ul className="mt-6 flex flex-wrap gap-4">
                {socials.map((s) => (
                  <li key={s.href}>
                    <a href={s.href} rel="noopener noreferrer" target="_blank" className={linkCls}>
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="label mt-14 flex flex-col gap-4 border-t hairline pt-8 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}
          </p>
          <nav aria-label="Mentions légales">
            <ul className="flex flex-wrap gap-6">
              <li>
                <Link href="/confidentialite" className="transition-colors hover:text-bone">
                  Confidentialité
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-bone">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
