import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/tools';
import { getAllTools, getToolBySlug } from '@/lib/tools/registry';
import { ToolPage } from '@/components/tools/tool-page';
import { ToolRenderer } from '@/components/tools/tool-renderer';
import { clampDescription } from '@/lib/seo/meta';

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
  const toolTitle = tool.seo?.title || `${tool.name} — Free Browser Tool | Zevylo`;
  const toolDesc = clampDescription(
    tool.seo?.description || `${tool.shortDescription} Runs in your browser with no account required.`
  );
  const toolKeywords = [
    ...(tool.seo?.keywords || tool.keywords || []),
    'free online tool',
    'client side tool',
    'browser tool',
    `${tool.category} utility`,
    `free ${tool.name.toLowerCase()}`,
    `${tool.name.toLowerCase()} no upload`,
    `${tool.name.toLowerCase()} online`,
  ];

  return {
    title: toolTitle,
    description: toolDesc,
    keywords: toolKeywords,
    authors: [{ name: 'Muhammad Daniyal', url: 'https://github.com/daniyal44' }],
    creator: 'Muhammad Daniyal',
    publisher: 'Zevylo',
    alternates: {
      canonical: fullCanonicalUrl,
    },
    openGraph: {
      title: toolTitle,
      description: toolDesc,
      url: fullCanonicalUrl,
      type: 'website',
      siteName: 'Zevylo',
      locale: 'en_US',
      images: [
        {
          url: `${baseUrl}/images/Zevylo_logo.png`,
          width: 1200,
          height: 630,
          alt: `${tool.name} — Free Browser Tool | Zevylo`,
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
          alt: `${tool.name} — Free Browser Tool | Zevylo`,
        },
      ],
    },
    other: {
      'application-name': tool.name,
      'tool-category': tool.category,
      'author': 'Muhammad Daniyal',
      'creator': 'Muhammad Daniyal',
      'privacy-model': 'Tool inputs processed in the browser (no tool-input upload)',
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
