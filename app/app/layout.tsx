import type { Metadata, Viewport } from 'next';
import { Anton, Inter, JetBrains_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StructuredData from '@/components/StructuredData';
import WhatsAppButton from '@/components/WhatsAppButton';
import { site } from '@/lib/site';
import './globals.css';

// Titres : capitales très condensées, une seule graisse.
const display = Anton({
  subsets: ['latin', 'latin-ext'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

// Étiquettes techniques (sur-titres, repères, mentions).
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.legalName} — Captation audiovisuelle et production vidéo à Dakar`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_SN',
    url: site.url,
    siteName: site.legalName,
    title: `${site.legalName} — Captation audiovisuelle et production vidéo`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.legalName} — Captation audiovisuelle et production vidéo`,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#F4F3EF',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:font-medium focus:text-onaccent"
        >
          Aller au contenu
        </a>
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
        <WhatsAppButton />
        <StructuredData />
      </body>
    </html>
  );
}
