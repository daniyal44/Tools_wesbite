'use client';

import React, { useState, useMemo } from 'react';
import { PenTool, Copy, Check, Sparkles, BookOpen, Clock, FileText } from 'lucide-react';

interface HeadlineOption {
  title: string;
  type: string;
}

type Domain = 'tech' | 'finance' | 'health' | 'marketing' | 'creative' | 'general';

// Infer a rough subject domain from the topic so examples/metrics/pitfalls are relevant.
function detectDomain(topic: string): Domain {
  const t = topic.toLowerCase();
  if (/\b(code|coding|develop|program|software|web|app|data|ai|ml|engineer|devops|cloud|api|javascript|python|react|next|frontend|backend)\b/.test(t)) return 'tech';
  if (/\b(money|invest|finance|financial|budget|stock|crypto|trading|wealth|saving|savings|retire|retirement|tax|income|debt)\b/.test(t)) return 'finance';
  if (/\b(health|fitness|diet|workout|exercise|nutrition|weight|muscle|sleep|wellness|mental|yoga|run|running|habit)\b/.test(t)) return 'health';
  if (/\b(market|marketing|seo|brand|branding|content|social|ads|advertis|campaign|audience|growth|email|funnel|conversion)\b/.test(t)) return 'marketing';
  if (/\b(write|writing|design|art|music|photo|photography|video|film|craft|draw|paint|creativ|story|writer|author)\b/.test(t)) return 'creative';
  return 'general';
}

const DOMAIN_DETAIL: Record<Domain, { tools: string; metric: string; pitfall: string }> = {
  tech: { tools: 'version control, automated tests, and a CI pipeline', metric: 'error rates, build times, and deployment frequency', pitfall: 'over-engineering a solution before validating it with real usage' },
  finance: { tools: 'a tracked budget, a diversified allocation, and automatic transfers', metric: 'savings rate, net worth, and return on investment', pitfall: 'reacting emotionally to short-term volatility instead of following a plan' },
  health: { tools: 'a progressive routine, a simple food log, and recovery tracking', metric: 'resting heart rate, strength gains, and your consistency streak', pitfall: 'chasing extreme programs you cannot sustain beyond a few weeks' },
  marketing: { tools: 'an editorial calendar, UTM tracking, and A/B tests', metric: 'click-through rate, conversion rate, and cost per acquisition', pitfall: 'optimizing vanity metrics instead of revenue-driving actions' },
  creative: { tools: 'a reference library, a repeatable process, and a feedback circle', metric: 'output volume, completion rate, and audience response', pitfall: 'waiting for inspiration instead of shipping consistent work' },
  general: { tools: 'a simple system, a tracking habit, and a weekly review', metric: 'progress toward your goal, consistency, and quality of output', pitfall: 'spreading yourself thin across too many priorities at once' },
};

const AUDIENCE_FRAMING: Record<string, string> = {
  'Aspiring Developers': 'If you are early in your journey, prioritize building tangible projects over passively consuming tutorials—shipping something small teaches more than watching ten videos.',
  'Senior Executives & Founders': 'As a leader, your leverage comes from systems and delegation. Design the process so it keeps working when you are not in the room.',
  'General Public / Consumers': 'You need no specialist background here. Every concept below is written in plain language and is immediately usable.',
  'College Students': 'Treat this like a syllabus: master the fundamentals first, then reinforce them with spaced, deliberate practice before exams or deadlines.',
};

const TONE_INTRO: Record<string, (topic: string) => string> = {
  'Authoritative & Practical': (t) => `Mastering **${t}** rewards those who act on evidence rather than opinion. This guide distills the steps that consistently produce results, with no filler.`,
  'Conversational & Friendly': (t) => `Let's be honest—getting good at **${t}** can feel overwhelming at first. Don't worry: we'll walk through it together, step by step, in plain language.`,
  'In-Depth & Analytical': (t) => `This analysis examines **${t}** through its underlying mechanisms, trade-offs, and measurable outcomes, so you can reason about it from first principles rather than copy a recipe.`,
  'Storytelling & Motivational': (t) => `Every expert in **${t}** once started exactly where you are now. The difference was never raw talent—it was the decision to begin and the discipline to keep going.`,
};

export default function AiArticleWriter() {
  const [topic, setTopic] = useState<string>('How to Master Full-Stack Web Development in 2026');
  const [audience, setAudience] = useState<string>('Aspiring Developers');
  const [tone, setTone] = useState<string>('Authoritative & Practical');
  const [copied, setCopied] = useState<boolean>(false);

  // Generate structured outline and article content
  const headlines: HeadlineOption[] = useMemo(() => {
    if (!topic.trim()) return [];
    return [
      { title: `The Ultimate Guide to ${topic.trim()}`, type: 'Comprehensive Guide' },
      { title: `Why Most People Fail at ${topic.trim()} (And What to Do Instead)`, type: 'Contrarian Hook' },
      { title: `7 Proven Strategies to Accelerate Your ${topic.trim()}`, type: 'Listicle' },
      { title: `How Anyone Can Learn ${topic.trim()} Without Spending Thousands`, type: 'Actionable / Value' },
      { title: `The Step-by-Step Blueprint for ${topic.trim()} in 2026`, type: 'Modern Framework' },
    ];
  }, [topic]);

  const articleMarkdown = useMemo(() => {
    const cleanTopic = topic.trim() || 'Modern Technology';
    const domain = detectDomain(cleanTopic);
    const d = DOMAIN_DETAIL[domain];
    const intro = (TONE_INTRO[tone] || TONE_INTRO['Authoritative & Practical'])(cleanTopic);
    const framing = AUDIENCE_FRAMING[audience] || AUDIENCE_FRAMING['General Public / Consumers'];
    const readingTime = Math.max(5, Math.ceil(cleanTopic.length / 6) + 5);

    return `# ${headlines[0]?.title || cleanTopic}

*Target Audience: ${audience} | Tone: ${tone} | Reading Time: ~${readingTime} mins*

---

## Introduction

${intro}

${framing}

---

## 1. Foundational Principles of ${cleanTopic}
Before advanced tactics, lock in the fundamentals that everything else builds on:
* **Understand the mechanism** — Learn *why* ${cleanTopic} works the way it does, not just the surface steps. First-principles understanding lets you adapt when conditions change.
* **Practice deliberately** — Short, focused sessions beat occasional marathons. Consistency compounds.
* **Close the feedback loop** — Set up ${d.tools} early so you can measure progress instead of guessing.

---

## 2. A Step-by-Step Framework
1. **Assess your starting point** — Benchmark where you stand with ${cleanTopic} today and name the single biggest bottleneck.
2. **Focus your effort** — Put roughly 80% of your energy into the 20% of activities that actually move ${d.metric}.
3. **Systematize and scale** — Once a method works, document it and automate the repetitive parts so you can repeat results reliably.

---

## 3. How to Measure Progress
Track what matters for ${cleanTopic}: ${d.metric}. Review these on a fixed cadence (weekly is a good default) and let the numbers—not your mood—drive your next adjustment.

---

## 4. Common Pitfalls to Avoid
* **The big one:** ${d.pitfall}.
* **Chasing novelty** — jumping to the next trend before mastering the current fundamentals.
* **Working in isolation** — skipping outside feedback that would expose blind spots early.

---

## Conclusion & Next Steps
Progress with **${cleanTopic}** comes from a repeatable system, honest measurement, and steady iteration—not from a single breakthrough. Pick one principle above and apply it today.

### Key Takeaways
- Build on fundamentals specific to ${cleanTopic} before optimizing.
- Measure ${d.metric} and review on a fixed schedule.
- Avoid the trap of ${d.pitfall}.

---

*Draft generated locally in your browser from your topic, audience, and tone selections. Review, fact-check, and edit before publishing—this is a structured starting point, not a finished or AI-researched article.*`;
  }, [topic, headlines, audience, tone]);

  const wordCount = useMemo(() => {
    return articleMarkdown.trim().split(/\s+/).length;
  }, [articleMarkdown]);

  const readingTimeMin = Math.ceil(wordCount / 200);

  const handleCopy = () => {
    navigator.clipboard.writeText(articleMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Configuration Form */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div>
          <label htmlFor="article-topic-input" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
            Article Topic or Keyword
          </label>
          <input
            id="article-topic-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. Remote Work Productivity, Next.js Optimization, Personal Finance..."
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-base font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 pt-2">
          <div>
            <label htmlFor="target-audience-select" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Target Audience
            </label>
            <select
              id="target-audience-select"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white"
            >
              <option value="Aspiring Developers">Aspiring Developers & Tech Beginners</option>
              <option value="Senior Executives & Founders">Senior Executives & Founders</option>
              <option value="General Public / Consumers">General Public & Consumers</option>
              <option value="College Students">Students & Academic Researchers</option>
            </select>
          </div>

          <div>
            <label htmlFor="writing-tone-select" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
              Tone & Voice
            </label>
            <select
              id="writing-tone-select"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-xs font-semibold text-gray-900 dark:text-white"
            >
              <option value="Authoritative & Practical">Authoritative & Practical (High Trust)</option>
              <option value="Conversational & Friendly">Conversational & Engaging (Blog style)</option>
              <option value="In-Depth & Analytical">In-Depth & Analytical (Whitepaper)</option>
              <option value="Storytelling & Motivational">Storytelling & Inspiring</option>
            </select>
          </div>
        </div>
      </div>

      {/* Suggested Headlines */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-amber-500" /> High-CTR Headline Variations
        </h3>
        <div className="grid gap-2 sm:grid-cols-2">
          {headlines.map((hl, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 text-xs text-gray-800 dark:text-gray-200"
            >
              <span className="font-semibold truncate pr-2">{hl.title}</span>
              <span className="rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 text-[9px] shrink-0 font-medium">
                {hl.type}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Generated Article Studio */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1.5 text-gray-900 dark:text-white font-bold">
              <PenTool className="h-4 w-4 text-blue-600" /> Full Article Blueprint
            </span>
            <span className="flex items-center gap-1">
              <FileText className="h-3.5 w-3.5" /> {wordCount} words
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" /> ~{readingTimeMin} min read
            </span>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 shadow-sm"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied Markdown' : 'Copy Markdown'}
          </button>
        </div>

        <div className="h-96 overflow-y-auto rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 p-5 font-mono text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap select-all">
          {articleMarkdown}
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <BookOpen className="h-4 w-4 text-blue-500" />
        Structured for SEO readability, H2/H3 semantic architecture, and natural engagement.
      </div>
    </div>
  );
}
