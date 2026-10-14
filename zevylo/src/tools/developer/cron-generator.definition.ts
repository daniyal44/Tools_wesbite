import { ToolDefinition } from '@/lib/tools/types';

export const cronGeneratorDefinition: ToolDefinition = {
  id: 'developer-cron-generator',
  slug: 'cron-generator',
  name: 'Cron Expression Generator & Explainer',
  shortDescription: 'Build, validate, and understand crontab schedules with human-readable English translations.',
  longDescription: 'Easily construct complex cron schedules for crontab, GitHub Actions, and cloud tasks using an intuitive interactive visual schedule builder. Translates raw expressions into clear plain English sentences.',
  category: 'developer',
  icon: 'clock',
  keywords: ['cron generator', 'crontab generator', 'cron expression', 'schedule builder', 'it tools alternative', 'crontab guru alternative'],
  searchableText: 'cron expression generator crontab builder schedule explainer it-tools crontab guru',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Cron Expression Generator — Build & Explain Crontab Online | Zevylo',
    description: 'Build, validate, and explain cron expressions with real-time plain English translations and presets. 100% free IT-Tools alternative.',
  },
  faq: [
    {
      question: 'What is the format of a standard 5-part cron expression?',
      answer: 'Standard cron expressions consist of five fields separated by spaces: Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6, where 0 is Sunday).',
    },
    {
      question: 'Can I choose from popular schedule presets?',
      answer: 'Yes! Zevylo includes quick presets for "Every minute", "Every 15 minutes", "Daily at midnight", "Weekdays at 9 AM", and more.',
    },
  ],
  relatedTools: ['timestamp-converter', 'json-formatter', 'url-encoder'],
  status: 'active',
  visibility: 'public',
  sortOrder: 8,
  component: 'cron-generator',
};
