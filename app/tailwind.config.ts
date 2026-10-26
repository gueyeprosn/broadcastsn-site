import type { Config } from 'tailwindcss';

// Palette : neutres du brief, accent repris du logo réel (#FFC909).
// Les neutres passent par des variables CSS (voir globals.css) : le site est
// clair par défaut, et toute section portant `.theme-dark` s'inverse d'elle-même.
// Changer `accent` ici suffit à repiquer toute l'identité du site.
const v = (name: string) => `rgb(var(--c-${name}) / <alpha-value>)`;

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: v('bg'), // fond de la section courante
        bone: v('fg'), // texte principal de la section courante
        surface: v('surface'),
        'surface-2': v('surface-2'),
        muted: v('muted'),
        // Texte d'accent lisible : ambre foncé sur fond clair, jaune sur fond sombre.
        signal: v('signal'),
        accent: {
          DEFAULT: '#FFC909',
          soft: '#FFD64A',
          deep: '#D9A800',
        },
        // Texte posé sur l'accent jaune, quel que soit le thème de la section.
        onaccent: '#0B0B0C',
        brand: '#231F20',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Impact', 'system-ui', 'sans-serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      maxWidth: { shell: '84rem' },
      // Angles vifs, comme le reste de l'identité industrielle.
      borderRadius: { card: '2px' },
      transitionTimingFunction: { soft: 'cubic-bezier(0.22, 1, 0.36, 1)' },
      keyframes: {
        rise: {
          from: { opacity: '0', transform: 'translateY(14px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: { rise: 'rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) both' },
    },
  },
  plugins: [],
};

export default config;
