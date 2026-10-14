import { ToolDefinition } from '@/lib/tools/types';

export const bulkEmailGeneratorDefinition: ToolDefinition = {
  id: 'bulk-email-generator',
  slug: 'bulk-email-generator',
  name: 'Bulk Personalized Email Outreach Generator',
  shortDescription: 'Generate personalized bulk email templates with variables, merge tags, and TXT/CSV batch exports.',
  longDescription: 'Speed up cold email and outreach campaigns. Merge dynamic contact variables like name, company, and role directly into customized subject lines and email copy. Preview individual emails and export the entire batch in one click.',
  category: 'marketing',
  icon: 'mail',
  keywords: ['bulk email generator', 'cold email template generator', 'email merge tool', 'outreach email generator', 'personalized email maker'],
  searchableText: 'bulk email generator outreach template personalization mail merge variables recipient csv batch cold email free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: true,
  supportsDownload: true,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Bulk Email Generator — Free Personalized Outreach Studio | Zevylo',
    description: 'Create customized bulk emails with merge tags, dynamic variables, and one-click batch exports. 100% free and client-side.',
    keywords: ['bulk email generator', 'cold email generator free', 'mail merge tool online', 'email outreach templates'],
  },
  faq: [
    {
      question: 'Are my contact lists uploaded to a server?',
      answer: 'No. Everything is parsed, merged, and rendered entirely in your browser memory. Your contacts never leave your device.',
    },
    {
      question: 'Can I add custom variables to my emails?',
      answer: 'Yes! You can use {{name}}, {{company}}, {{role}}, and {{email}} tags in both your subject line and email body.',
    },
  ],
  relatedTools: ['utm-builder', 'youtube-tag-generator', 'ai-article-writer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 4,
  component: 'bulk-email-generator',
};
