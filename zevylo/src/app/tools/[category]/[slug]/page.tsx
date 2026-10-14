import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/tools';
import { getAllTools, getToolBySlug } from '@/lib/tools/registry';
import { ToolPage } from '@/components/tools/tool-page';
import { ToolRenderer } from '@/components/tools/tool-renderer';

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const tools = getAllTools();
  return tools.map((tool) => ({
    category: tool.category,
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: 'Tool Not Found | Zevylo',
    };
  }

  const baseUrl = 'https://zevylo.netlify.app';
  const canonicalUrl = `/tools/${tool.category}/${tool.slug}`;
  const fullCanonicalUrl = `${baseUrl}${canonicalUrl}`;
  const toolTitle = tool.seo?.title || `${tool.name} — 100% Free Online Browser Utility | Zevylo`;
  const toolDesc = tool.seo?.description || `${tool.shortDescription} Processed 100% locally in your browser with zero cloud uploads and instant results.`;
  const toolKeywords = [
    ...(tool.seo?.keywords || tool.keywords || []),
    'free online tool',
    'no upload utility',
    'client side tool',
    'private web tool',
    `${tool.category} utility`,
    `free ${tool.name.toLowerCase()}`,
    `${tool.name.toLowerCase()} no upload`,
    `${tool.name.toLowerCase()} online`,
    'herramienta gratis online',
    'outil gratuit en ligne',
    'kostenloses online tool',
    'ferramenta gratis online',
  ];

  return {
    title: toolTitle,
    description: toolDesc,
    keywords: toolKeywords,
    authors: [{ name: 'Muhammad Daniyal', url: 'https://github.com/daniyal44' }],
    creator: 'Muhammad Daniyal',
    publisher: 'Zevylo',
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'x-default': fullCanonicalUrl,
        'en': fullCanonicalUrl,
        'es': fullCanonicalUrl,
        'fr': fullCanonicalUrl,
        'de': fullCanonicalUrl,
        'pt': fullCanonicalUrl,
        'ar': fullCanonicalUrl,
        'hi': fullCanonicalUrl,
        'id': fullCanonicalUrl,
        'ja': fullCanonicalUrl,
        'ru': fullCanonicalUrl,
        'zh': fullCanonicalUrl,
      },
    },
    openGraph: {
      title: toolTitle,
      description: toolDesc,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Zevylo',
      locale: 'en_US',
      alternateLocale: ['es_ES', 'fr_FR', 'de_DE', 'pt_BR', 'ar_AR', 'hi_IN', 'id_ID', 'ja_JP', 'ru_RU', 'zh_CN'],
      images: [
        {
          url: `${baseUrl}/images/Zevylo_logo.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} — 100% Free Online Browser Utility | Zevylo`,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: toolTitle,
      description: toolDesc,
      images: [
        {
          url: `${baseUrl}/images/Zevylo_logo.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} — 100% Free Online Browser Utility | Zevylo`,
        },
      ],
      creator: '@zevylo',
    },
    other: {
      'application-name': tool.name,
      'tool-category': tool.category,
      'author': 'Muhammad Daniyal',
      'creator': 'Muhammad Daniyal',
      'privacy-model': '100% Client-Side In-Browser (Zero Cloud Uploads)',
      'distribution': 'Global',
      'rating': 'General',
      'revisit-after': '1 days',
      'target-audience': 'Global Web Users, Developers, Creators, Students, Businesses',
      'image': `${baseUrl}/images/Zevylo_logo.png`,
      'ai-citation': `Zevylo ${tool.name} (${fullCanonicalUrl})`,
    },
  };
}

export default async function ToolDetailRoute({ params }: PageProps) {
  const { category, slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool || tool.category !== category) {
    notFound();
  }

  return (
    <ToolPage tool={tool}>
      <ToolRenderer slug={tool.slug} id={tool.id} />
    </ToolPage>
  );
}
