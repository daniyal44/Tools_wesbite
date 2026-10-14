import { ToolDefinition } from '@/lib/tools/types';

export const slugToTitleConverterDefinition: ToolDefinition = {
  id: 'slug-to-title-converter',
  slug: 'slug-to-title-converter',
  name: 'Slug to Title & Heading Converter',
  shortDescription: 'Convert URL slugs, snake_case, and kebab-case into clean, grammatical titles.',
  longDescription: 'Turn hyphenated URL slugs, file names, snake_case identifiers, and camelCase strings into clean AP Title Case, Chicago Title Case, sentence case, and start case. Corrects articles, prepositions, and acronyms automatically.',
  category: 'text',
  icon: 'type',
  keywords: ['slug to title', 'kebab case to title', 'url to heading', 'title case converter', 'slug decoder'],
  searchableText: 'slug to title converter kebab case snake case camel case ap title case headline url file name client side free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: true,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'Slug to Title Converter — URL Slug to Clean Headline | Zevylo',
    description: 'Convert URL slugs, kebab-case, and snake_case into professional AP and Chicago title case headings instantly. 100% free and in-browser.',
    keywords: ['slug to title converter', 'url slug to heading', 'kebab case to title case', 'batch slug to title'],
  },
  faq: [
    {
      question: 'What casing styles are supported?',
      answer: 'It converts your input into AP Title Case (Associated Press), Chicago Title Case, Sentence case, UPPERCASE, and Capital Case, automatically handling minor words (a, an, the, and, but, or, for, in, on, at, to).',
    },
    {
      question: 'Can I convert multiple slugs in bulk?',
      answer: 'Yes! Simply paste multiple slugs or file paths separated by new lines to convert all of them simultaneously in batch mode.',
    },
  ],
  relatedTools: ['slug-generator', 'case-converter', 'word-counter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 19,
  component: 'slug-to-title-converter',
};
