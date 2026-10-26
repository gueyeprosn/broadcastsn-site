/** @type {import('next').NextConfig} */
const nextConfig = {
  // Image autonome : le runtime ne contient que le serveur + les deps utilisées.
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  compress: true,
  // Gardé hors du bundle : copié tel quel dans l'image, il sert aussi à
  // scripts/test-mail.mjs (même version que celle du formulaire).
  serverExternalPackages: ['nodemailer'],
};

export default nextConfig;
