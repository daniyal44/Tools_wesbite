import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Zevylo — Every Useful Tool',
    short_name: 'Zevylo',
    description: '157+ free online tools for developers, creators, and professionals with 100% client-side privacy.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#2563eb',
    icons: [
      {
        src: '/images/Zevylo_tab_logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/images/Zevylo_tab_logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
