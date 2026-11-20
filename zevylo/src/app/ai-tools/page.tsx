import { Metadata } from 'next';
import { AIToolsClient } from './ai-tools-client';
import { AI_TOOLS_DATABASE } from '@/lib/ai-directory/database';
import { AI_CATEGORIES } from '@/lib/ai-directory/categories';
import { clampDescription } from '@/lib/seo/meta';

export const metadata: Metadata = {
  title: `AI Tools Directory — ${AI_TOOLS_DATABASE.length} AI Tools & Pricing | Zevylo`,
  description:
    clampDescription(`Browse ${AI_TOOLS_DATABASE.length} AI tools across ${AI_CATEGORIES.length} categories. Compare pricing models, features and limitations, and open each vendor's official site.`),
  alternates: {
    canonical: '/ai-tools',
  },
  openGraph: {
    title: 'AI Tools Directory — AI Tools & Pricing | Zevylo',
    description:
        clampDescription(`Browse ${AI_TOOLS_DATABASE.length} AI products with pricing, features and limitations. Listing details are compiled from public information; confirm them with the vendor.`),
    url: '/ai-tools',
    type: 'website',
    siteName: 'Zevylo',
    images: [
      {
        url: 'https://zevylo.netlify.app/images/Zevylo_logo.png',
        width: 1200,
        height: 630,
        alt: `Zevylo AI Tools Directory — ${AI_TOOLS_DATABASE.length} AI Tools`,
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Directory — AI Tools & Pricing | Zevylo',
    description: `${AI_TOOLS_DATABASE.length} AI tools with pricing, features and limitations.`,
    images: ['https://zevylo.netlify.app/images/Zevylo_logo.png'],
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
    description: `Catalog of ${AI_TOOLS_DATABASE.length}+ top artificial intelligence tools and free in-browser utilities across 23 specialized categories.`,
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
