import { ToolDefinition } from '@/lib/tools/types';

export const keywordDensityAnalyzerDefinition: ToolDefinition = {
  id: 'keyword-density-analyzer',
  slug: 'keyword-density-analyzer',
  name: 'Keyword Density & N-Gram Analyzer',
  shortDescription: 'Analyze 1-word, 2-word, and 3-word keyword density with SEO stuffing alerts.',
  longDescription: 'Ensure your content strikes the perfect balance for search engine algorithms. Calculates 1-word, 2-word, and 3-word n-gram frequencies and density percentages, flags potential keyword stuffing penalties, and computes estimated reading times. An essential Ahrefs / SEO Spider companion.',
  category: 'seo',
  icon: 'bar-chart-2',
  keywords: ['keyword density analyzer', 'seo keyword counter', 'n-gram analyzer', 'keyword frequency', 'ahrefs free alternative', 'seo spider'],
  searchableText: 'keyword density analyzer seo keyword counter n-gram frequency ahrefs stuffing checker',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Keyword Density Analyzer — On-Page SEO Keyword Frequency | Zevylo',
    description: 'Analyze on-page keyword density, 1-3 word n-grams, and detect keyword stuffing online. 100% free and client-side.',
  },
  faq: [
    {
      question: 'What is the recommended keyword density for SEO?',
      answer: 'Most SEO experts recommend a primary keyword density between 1.0% and 2.5%. Anything above 3.5% may trigger search engine over-optimization flags.',
    },
    {
      question: 'Does this tool ignore common words like "the" and "is"?',
      answer: 'Yes! The built-in stopword filter automatically strips common English conjunctions and prepositions to highlight your true topical keywords.',
    },
  ],
  relatedTools: ['meta-tag-generator', 'serp-preview', 'og-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 5,
  component: 'keyword-density-analyzer',
};
