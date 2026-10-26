import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { services } from '@/lib/services';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = [
    { path: '', priority: 1 },
    { path: '/services', priority: 0.9 },
    { path: '/realisations', priority: 0.8 },
    { path: '/secteurs', priority: 0.8 },
    { path: '/a-propos', priority: 0.7 },
    { path: '/contact', priority: 0.9 },
    { path: '/confidentialite', priority: 0.3 },
  ];

  return [
    ...pages.map((p) => ({
      url: `${site.url}${p.path}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: p.priority,
    })),
    ...services.map((s) => ({
      url: `${site.url}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
