import { ToolDefinition } from '@/lib/tools/types';

export const countdownTimerDefinition: ToolDefinition = {
  id: 'countdown-timer',
  slug: 'countdown-timer',
  name: 'Countdown Timer',
  shortDescription: 'Live countdown to any date and time — days, hours, minutes, and seconds.',
  longDescription:
    'Count down to any event — a product launch, holiday, birthday, deadline, or the New Year. Pick a target date and time (or use a quick preset) and watch a live days / hours / minutes / seconds countdown update every second. Once the moment arrives, it flips to show the time elapsed since. Runs entirely in your browser with no sign-up.',
  category: 'date-time',
  icon: 'calendar-clock',
  keywords: ['countdown timer', 'event countdown', 'days until', 'countdown clock', 'new year countdown', 'time until', 'date countdown'],
  searchableText: 'countdown timer event days until clock new year deadline birthday time until date',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Countdown Timer Online (Days Until Any Event) | Zevylo Tools',
    description: 'Free online countdown timer — count down the days, hours, minutes, and seconds to any date and time. New Year, launches, deadlines. 100% client-side.',
  },
  faq: [
    { question: 'What can I count down to?', answer: 'Any future date and time — holidays, product launches, exams, birthdays, deadlines, or the New Year. Use the presets or set a custom date and time.' },
    { question: 'Does it keep running if I leave the page open?', answer: 'Yes. The countdown updates every second while the tab is open and recalculates from the real clock, so it stays accurate.' },
    { question: 'What happens when the countdown reaches zero?', answer: 'It switches to show how much time has elapsed since the event, so you can see both before and after.' },
  ],
  relatedTools: ['pomodoro-timer', 'alarm-clock-timer', 'birthday-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 3,
  component: 'countdown-timer',
};
