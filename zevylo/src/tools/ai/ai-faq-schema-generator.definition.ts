import { ToolDefinition } from '@/lib/tools/types';

export const aiFaqSchemaGeneratorDefinition: ToolDefinition = {
  id: 'ai-faq-schema-generator',
  slug: 'ai-faq-schema-generator',
  name: 'AI FAQ & Schema Markup Builder',
  shortDescription: 'Generate high-intent FAQs with Google-compliant JSON-LD FAQPage structured data.',
  longDescription: 'Create high-converting, search-engine-optimized Frequently Asked Questions with automatic Google FAQPage JSON-LD structured data schema markup. Boost search snippet visibility, rich snippets, and user conversion directly in your browser with zero server latency.',
  category: 'ai',
  icon: 'help-circle',
  keywords: ['ai faq schema generator', 'faqpage json ld', 'google rich snippets', 'faq generator', 'structured data generator'],
  searchableText: 'ai faq schema generator faqpage json ld schema rich snippets google serp seo questions answers client side free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI FAQ & Schema Markup Builder — Google Rich Snippets | Zevylo',
    description: 'Generate high-intent FAQs and valid Google FAQPage JSON-LD schema markup instantly. Copy formatted code for Next.js, WordPress, or HTML. 100% free.',
    keywords: ['faq schema generator', 'json ld faq generator', 'google faq rich snippets', 'faq creator ai'],
  },
  faq: [
    {
      question: 'What is JSON-LD FAQPage schema?',
      answer: 'FAQPage is a Schema.org structured data format recognized by Google, Bing, and AI search engines that signals Q&A content, allowing your webpage to appear with rich expandable dropdowns in search results.',
    },
    {
      question: 'Where do I paste the generated schema code?',
      answer: 'Paste the generated <script type="application/ld+json"> block inside the <head> or <body> tags of your HTML, or into your Next.js page component.',
    },
  ],
  relatedTools: ['geo-aeo-optimizer', 'ai-article-writer', 'meta-tag-generator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 16,
  component: 'ai-faq-schema-generator',
};
