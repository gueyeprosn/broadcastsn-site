import { whatsappLink } from '@/lib/site';

/** Logo WhatsApp (marque utilisée pour désigner le service, pas comme décor). */
export function WhatsAppIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden fill="currentColor">
      <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A12.95 12.95 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.73c-2.01 0-3.97-.54-5.69-1.56l-.41-.24-3.96 1.04 1.06-3.86-.27-.4A10.69 10.69 0 0 1 5.3 16c0-5.92 4.82-10.73 10.74-10.73 5.91 0 10.7 4.81 10.7 10.73 0 5.92-4.8 10.73-10.7 10.73Zm5.88-8.03c-.32-.16-1.91-.94-2.2-1.05-.3-.11-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.15-.14.32-.38.48-.56.16-.19.21-.32.32-.54.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.86.4-.3.32-1.13 1.1-1.13 2.69 0 1.58 1.16 3.12 1.32 3.33.16.21 2.28 3.48 5.53 4.88.77.33 1.37.53 1.84.68.77.25 1.48.21 2.03.13.62-.09 1.91-.78 2.18-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

/**
 * Bouton WhatsApp flottant, présent sur toutes les pages. N'apparaît que si
 * un numéro est renseigné dans `lib/site.ts`. Le message est pré-rempli pour
 * que le visiteur n'ait qu'à décrire son projet.
 */
export default function WhatsAppButton() {
  const href = whatsappLink('Bonjour Broadcast SN, je vous contacte depuis votre site au sujet d’un projet.');
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Nous écrire sur WhatsApp (nouvel onglet)"
      className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-40 flex h-14 items-center gap-0 overflow-hidden rounded-full bg-[#25D366] pl-4 pr-4 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-[gap,padding] duration-300 ease-soft hover:gap-2.5 hover:pr-5 focus-visible:gap-2.5 focus-visible:pr-5 sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon size={26} />
      <span className="label max-w-0 overflow-hidden whitespace-nowrap text-white transition-[max-width] duration-300 ease-soft group-hover:max-w-[10rem] group-focus-visible:max-w-[10rem]">
        WhatsApp
      </span>
    </a>
  );
}
