import { Metadata } from 'next';
import { AIToolsClient } from './ai-tools-client';
import { AI_TOOLS_DATABASE } from '@/lib/ai-directory/database';
import { AI_CATEGORIES } from '@/lib/ai-directory/categories';

export const metadata: Metadata = {
  title: 'AI Tools Directory — Explore 100+ Best AI Tools from A to Z | Zevylo',
  description:
    'Discover the top AI tools across writing, video, audio, coding, image generation, business, and marketing. Filter by verified pricing, monthly traffic, and run 16 free browser AI utilities.',
  alternates: {
    canonical: '/ai-tools',
  },
  openGraph: {
    title: 'AI Tools Directory — Best AI Tools from A to Z | Zevylo',
    description:
      'Search 100+ top artificial intelligence tools and run browser-based generative AI utilities with zero wait timers and 100% privacy.',
    url: '/ai-tools',
    type: 'website',
    siteName: 'Zevylo',
    images: [
      {
        url: 'https://zevylo.netlify.app/images/Zevylo_logo.png',
        width: 1200,
        height: 630,
        alt: 'Zevylo AI Tools Directory — 100+ Top AI Tools & In-Browser Utilities',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Directory — Best AI Tools from A to Z | Zevylo',
    description: 'Discover 100+ top artificial intelligence tools and free in-browser AI utilities.',
    images: ['https://zevylo.netlify.app/images/Zevylo_logo.png'],
    creator: '@zevylo',
  },
  other: {
    'image': 'https://zevylo.netlify.app/images/Zevylo_logo.png',
  },
};

export default function AIToolsPage() {
  const directorySchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'AI Tools Directory & Discovery Hub',
    description: 'Catalog of 100+ top artificial intelligence tools and free in-browser utilities across 23 specialized categories.',
    url: 'https://zevylo.netlify.app/ai-tools',
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: 'https://zevylo.netlify.app/images/Zevylo_logo.png',
      caption: 'Zevylo AI Tools Directory',
      width: 1200,
      height: 630,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: 'Zevylo',
      url: 'https://zevylo.netlify.app',
    },
  };

  return (
    <div className="container mx-auto px-4 py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }}
      />
      <AIToolsClient initialTools={AI_TOOLS_DATABASE} categories={AI_CATEGORIES} />
    </div>
  );
}
