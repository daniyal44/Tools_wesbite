// Keyword Research Tools
import { registerTools } from '@/lib/tools/registry';
import { ToolDefinition } from '@/lib/tools/types';

const tools: ToolDefinition[] = [
  {
    id: 'keyword-tool-1',
    slug: 'keyword-research',
    name: 'Keyword Tool',
    shortDescription: 'Research keywords and search terms',
    longDescription: 'Find relevant keywords for SEO and content planning',
    category: 'keyword_research',
    subcategory: 'search',
    icon: 'Tag',
    keywords: ['keyword', 'research', 'seo', 'search'],
    searchableText: 'keyword research tool',
    version: '1.0',
    executionMode: 'client',
    requiresAuth: false,
    requiresUpload: false,
    supportsBatch: false,
    supportsDownload: false,
    supportsShare: true,
    supportsCopy: true,
    seo: {
      title: 'Keyword Research Tool',
      description: 'Find relevant keywords for SEO',
      keywords: ['keyword', 'research', 'seo'],
      canonical: undefined,
    },
    faq: [
      { question: 'How many keywords can I research?', answer: 'Up to 1000 per search' },
    ],
    relatedTools: [],
    status: 'active',
    visibility: 'public',
    sortOrder: 1,
    component: 'KeywordResearch',
  },
];

registerTools(tools);
