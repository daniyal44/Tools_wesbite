import { ToolDefinition } from '@/lib/tools/types';

export const pomodoroTimerDefinition: ToolDefinition = {
  id: 'pomodoro-timer',
  slug: 'pomodoro-timer',
  name: 'Pomodoro Timer',
  shortDescription: 'Focus timer with work/break cycles, session tracking, and an alert chime.',
  longDescription:
    'A clean, distraction-free Pomodoro timer to boost focus and beat procrastination. Work in focused intervals (default 25 minutes) separated by short breaks, with a longer break after a set number of rounds. Durations are fully customizable, a soft chime signals each phase change, the tab title shows your countdown, and the drift-free timer stays accurate even in a background tab — all running privately in your browser.',
  category: 'productivity',
  icon: 'timer',
  keywords: ['pomodoro timer', 'focus timer', 'productivity timer', 'study timer', 'work timer', 'tomato timer', 'pomodoro technique', '25 minute timer'],
  searchableText: 'pomodoro timer focus productivity study work break cycle technique 25 minute tomato',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Pomodoro Timer Online (Free Focus Timer) | Zevylo Tools',
    description: 'Free online Pomodoro timer with customizable focus/break cycles, session tracking, and a chime. Boost productivity — runs entirely in your browser.',
  },
  faq: [
    { question: 'What is the Pomodoro Technique?', answer: 'A time-management method that breaks work into focused intervals (traditionally 25 minutes) separated by short breaks, with a longer break after four rounds — helping you stay focused and avoid burnout.' },
    { question: 'Can I change the focus and break lengths?', answer: 'Yes. Open Settings to set your own focus length, short break, long break, and how many rounds to run before the long break.' },
    { question: 'Will the timer keep accurate time in a background tab?', answer: 'Yes. It tracks a target end time rather than counting ticks, so it stays accurate even if the browser throttles background tabs.' },
  ],
  relatedTools: ['alarm-clock-timer', 'coin-flip', 'sprint-retro-board'],
  status: 'active',
  visibility: 'public',
  sortOrder: 7,
  component: 'pomodoro-timer',
};
