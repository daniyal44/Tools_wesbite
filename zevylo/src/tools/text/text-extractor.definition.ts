import { ToolDefinition } from '@/lib/tools/types';

export const textExtractorDefinition: ToolDefinition = {
  id: 'text-extractor',
  slug: 'text-extractor',
  name: 'Text Extractor (Emails, URLs, Phone Numbers, IPs)',
  shortDescription: 'Extract email addresses, web links, phone numbers, IP addresses, hashtags, and numbers from raw text.',
  longDescription: 'Fast, client-side regex data scraper and entity parser. Extract structured emails, URLs, international phone numbers, IPv4 addresses, social hashtags, mentions, and hex codes with automatic deduplication, sorting, and CSV/JSON export.',
  category: 'text',
  icon: 'filter',
  keywords: ['text extractor', 'email extractor', 'url extractor', 'phone number extractor', 'extract emails from text', 'regex text scraper'],
  searchableText: 'text extractor email extractor url extractor phone extractor ip address hashtag regex scrape parse raw text export csv json',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Free Text Extractor — Extract Emails, URLs & Phones Online | Zevylo',
    description: 'Instantly extract email addresses, URLs, phone numbers, and IP addresses from messy text blocks. Deduplicate and export to CSV or JSON with zero server upload.',
    keywords: ['text extractor', 'email extractor from text', 'url extractor online', 'regex data extractor', 'free email scraper tool'],
  },
  faq: [
    {
      question: 'Is my extracted text stored on your server?',
      answer: 'No. All regex parsing and extraction happens 100% inside your browser. No text or emails are ever transmitted over the network.',
    },
    {
      question: 'Can I export the extracted items to Excel or Google Sheets?',
      answer: 'Yes, click the "CSV" export button to immediately download a spreadsheet-ready file.',
    },
  ],
  relatedTools: ['word-counter', 'text-diff', 'developer-regex-tester'],
  status: 'active',
  visibility: 'public',
  sortOrder: 9,
  component: 'text-extractor',
};
