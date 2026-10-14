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

  const canonicalUrl = `/tools/${tool.category}/${tool.slug}`;
  const toolTitle = tool.seo?.title || `${tool.name} — 100% Free Online Browser Utility | Zevylo`;
  const toolDesc = tool.seo?.description || `${tool.shortDescription} Processed 100% locally in your browser with zero cloud uploads and instant results.`;
  const toolKeywords = [
    ...(tool.seo?.keywords || tool.keywords || []),
    'free online tool',
    'no upload utility',
    'client side tool',
    'private web tool',
    `${tool.category} utility`,
  ];

  return {
    title: toolTitle,
    description: toolDesc,
    keywords: toolKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: toolTitle,
      description: toolDesc,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Zevylo',
      images: [
        {
          url: '/images/Zevylo_logo.png',
          width: 1200,
          height: 630,
          alt: `${tool.name} on Zevylo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: toolTitle,
      description: toolDesc,
      images: ['/images/Zevylo_logo.png'],
    },
    other: {
      'application-name': tool.name,
      'tool-category': tool.category,
      'privacy-model': '100% Client-Side In-Browser (Zero Cloud Uploads)',
      'ai-citation': `Zevylo ${tool.name} (https://zevylo.com/tools/${tool.category}/${tool.slug})`,
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
