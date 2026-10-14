import { ToolDefinition } from '@/lib/tools/types';

export const sprintRetroBoardDefinition: ToolDefinition = {
  id: 'sprint-retro-board',
  slug: 'sprint-retro-board',
  name: 'Agile Sprint Retrospective Board',
  shortDescription: 'Collaborate and organize agile sprint retrospectives with voting, categories, and report exports.',
  longDescription: 'Direct alternative to Reetro.io! Host agile sprint retrospectives without signing up or paying subscriptions. Features four distinct retrospective columns: "What Went Well" (Mad/Sad/Glad or Start/Stop/Continue), "What Needs Improvement", "Action Items & Owners", and "Team Kudos & Shoutouts". Supports card upvoting, filtering, local storage persistence, and one-click export to Markdown, CSV, or formatted JSON for Jira and Slack.',
  category: 'productivity',
  icon: 'columns',
  keywords: ['sprint retro board', 'reetro alternative', 'agile retrospective tool', 'scrum retro board', 'sprint review board', 'what went well tool', 'free retro board'],
  searchableText: 'sprint retro board reetro agile scrum retrospective what went well what went wrong action items kudos voting export markdown jira slack',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: true,
  supportsShare: true,
  supportsCopy: true,
  seo: {
    title: 'Free Agile Sprint Retrospective Board - No Sign Up Required',
    description: 'Run agile sprint retrospectives effortlessly. Add cards, upvote action items, track improvements, and export reports directly to Markdown, CSV, or JSON.',
    keywords: ['sprint retrospective online', 'reetro alternative', 'free scrum retro board', 'agile retro tool', 'sprint review notes'],
  },
  faq: [
    {
      question: 'Is a login or account required to use this retro board?',
      answer: 'No login required! Your retrospective cards and votes are preserved securely in your browser’s local storage so you can run quick standups without registration.',
    },
    {
      question: 'Can I export the retrospective summary to Jira or Slack?',
      answer: 'Yes, you can copy formatted Markdown with one click or download a CSV / JSON file of all columns, cards, authors, and vote tallies.',
    },
  ],
  relatedTools: ['markdown-table-generator', 'slug-generator', 'stl-viewer'],
  status: 'active',
  visibility: 'public',
  sortOrder: 2,
  component: 'src/tools/productivity/sprint-retro-board',
};
