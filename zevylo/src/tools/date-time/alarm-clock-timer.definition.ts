import { ToolDefinition } from '@/lib/tools/types';

export const alarmClockTimerDefinition: ToolDefinition = {
  id: 'alarm-clock-timer',
  slug: 'alarm-clock-timer',
  name: 'Online Alarm Clock, Stopwatch & Countdown Timer',
  shortDescription: 'Free browser alarm clock with custom chimes, countdown focus timer, and precision split stopwatch.',
  longDescription: 'Manage your focus and schedule with a versatile web-based digital clock. Set custom alarms with synthetic audio chimes, run productivity countdown timers with quick presets, and measure lap times with a millisecond precision stopwatch.',
  category: 'date-time',
  icon: 'clock',
  keywords: ['online alarm clock', 'countdown timer', 'stopwatch online', 'alarm tool', 'web timer', 'lap timer'],
  searchableText: 'online alarm clock countdown timer stopwatch web timer chime audio split laps focus productivity free',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Online Alarm Clock & Countdown Timer — Free Stopwatch | Zevylo',
    description: 'Set custom alarms, run countdown focus timers, and track split stopwatch laps online for free in your browser.',
    keywords: ['online alarm clock', 'free countdown timer', 'web stopwatch online', 'browser alarm tool'],
  },
  faq: [
    {
      question: 'Will the alarm sound if my computer goes to sleep?',
      answer: 'The browser tab needs to remain open and active for the audio chime to trigger at your set time.',
    },
    {
      question: 'Does this require downloading any audio files?',
      answer: 'No. The chime sound is synthesized directly in your browser using the HTML5 Web Audio API.',
    },
  ],
  relatedTools: ['date-difference-calculator', 'timezone-converter', 'timestamp-converter'],
  status: 'active',
  visibility: 'public',
  sortOrder: 1,
  component: 'alarm-clock-timer',
};
