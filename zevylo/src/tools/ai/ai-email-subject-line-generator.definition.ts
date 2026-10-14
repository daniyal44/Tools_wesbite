import { ToolDefinition } from '@/lib/tools/types';

export const aiEmailSubjectLineGeneratorDefinition: ToolDefinition = {
  id: 'ai-email-subject-line-generator',
  slug: 'ai-email-subject-line-generator',
  name: 'AI Email Subject Line & Open Rate Scorer',
  shortDescription: 'Generate high-CTR email subject lines with spam trigger audits and open-rate scores.',
  longDescription: 'Craft catchy, conversion-optimized email subject lines across 6 proven marketing psychological frameworks: Curiosity Gap, Urgent FOMO, Direct Benefit, Social Proof, and Question Hooks. Features character length audits, spam trigger warnings, and preview text pairings.',
  category: 'ai',
  icon: 'mail',
  keywords: ['ai email subject line generator', 'email subject lines', 'open rate booster', 'cold email subject line', 'spam trigger audit'],
  searchableText: 'ai email subject line generator open rate booster cold outreach newsletter spam checker preview text character count high ctr marketing client side free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'AI Email Subject Line Generator & Open Rate Scorer — Free | Zevylo',
    description: 'Boost your email open rates with AI-crafted subject lines, spam keyword audits, and matching inbox preview texts. 100% free and in-browser.',
    keywords: ['email subject line generator', 'boost email open rate', 'cold email subject lines', 'newsletter subject lines free'],
  },
  faq: [
    {
      question: 'Why do character counts matter in email subject lines?',
      answer: 'Mobile email clients (like Apple Mail and Gmail on iOS/Android) truncate subject lines beyond 40-50 characters. Keeping key hooks under 45 characters maximizes readability on mobile devices where over 60% of emails are opened.',
    },
    {
      question: 'How are spam triggers evaluated?',
      answer: 'The generator checks for known spam filters triggers including excessive capitalization, multiple exclamation marks, and sensitive words (like "100% free", "guaranteed cash", "urgent risk").',
    },
  ],
  relatedTools: ['ai-social-hook-generator', 'ai-article-writer', 'ai-humanizer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 13,
  component: 'ai-email-subject-line-generator',
};
