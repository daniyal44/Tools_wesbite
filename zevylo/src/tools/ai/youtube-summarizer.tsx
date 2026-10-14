'use client';

import React, { useState, useMemo } from 'react';
import { Video, Copy, Check, Sparkles, Clock, ListChecks } from 'lucide-react';

const SAMPLE_TRANSCRIPT = `00:00 Welcome back everyone. Today we are breaking down the 5 daily habits of top 1% software engineers.
01:15 First and foremost is deep work blocks. Highly effective developers don't code in 15-minute fragmented bursts. They protect 2 to 3-hour uninterrupted focus slots every morning without Slack or emails.
03:40 Second is automated test coverage. If you don't write automated tests, you spend half your week manually debugging regressions.
05:20 Third is deliberate refactoring and continuous learning. Don't just ship hacky patches; take 30 minutes to clean up tech debt.
07:10 Fourth is health and sleep. Cognitive stamina is directly linked to 7+ hours of quality sleep and hydration.
09:00 And fifth is writing documentation. Great code is easy to read, but great engineers communicate clearly through architecture decision records.`;

// ---- Client-side extractive summarizer (no external AI; works on the pasted text) ----
const STOPWORDS = new Set([
  'the','a','an','and','or','but','is','are','was','were','be','been','being','to','of','in','on',
  'for','with','as','at','by','that','this','it','its','from','you','your','yours','we','our','us',
  'they','their','them','i','he','she','his','her','him','not','no','so','if','then','than','there',
  'here','what','which','who','whom','will','would','can','could','should','just','about','into','over',
  'out','up','down','more','most','very','also','have','has','had','do','does','did','these','those',
  'because','while','when','where','how','why','all','any','some','such','only','own','same','too',
  'get','got','like','one','two','every','dont','don',
]);

function splitSentences(text: string): string[] {
  const cleaned = text
    .replace(/\[?\(?\d{1,2}:\d{2}(?::\d{2})?\)?\]?/g, ' ') // strip timestamps (00:00, 1:15:30, [00:00])
    .replace(/\s+/g, ' ');
  return (cleaned.match(/[^.!?]+[.!?]+/g) || [cleaned])
    .map((s) => s.trim())
    .filter((s) => s.split(/\s+/).length >= 4);
}

function wordFreq(sentences: string[]): Record<string, number> {
  const freq: Record<string, number> = {};
  for (const s of sentences) {
    for (const w of s.toLowerCase().match(/[a-z][a-z']{2,}/g) || []) {
      if (!STOPWORDS.has(w)) freq[w] = (freq[w] || 0) + 1;
    }
  }
  return freq;
}

function summarize(text: string, maxSentences: number): string[] {
  const sentences = splitSentences(text);
  if (sentences.length <= maxSentences) return sentences;
  const freq = wordFreq(sentences);
  const maxF = Math.max(1, ...Object.values(freq));
  const scored = sentences.map((s, idx) => {
    const words = s.toLowerCase().match(/[a-z][a-z']{2,}/g) || [];
    let score = 0;
    for (const w of words) if (!STOPWORDS.has(w)) score += (freq[w] || 0) / maxF;
    const positionBoost = idx < 3 ? 1.1 : 1; // intros often set context
    return { s, idx, score: (words.length ? score / Math.sqrt(words.length) : 0) * positionBoost };
  });
  const top = [...scored].sort((a, b) => b.score - a.score).slice(0, maxSentences);
  top.sort((a, b) => a.idx - b.idx);
  return top.map((t) => t.s);
}

function topKeywords(text: string, n: number): string[] {
  const freq = wordFreq(splitSentences(text));
  return Object.entries(freq)
    .filter(([w]) => w.length >= 4)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([w]) => w);
}

export default function YoutubeSummarizer() {
  const [videoTitle, setVideoTitle] = useState<string>('5 Daily Habits of Elite Software Engineers');
  const [transcript, setTranscript] = useState<string>(SAMPLE_TRANSCRIPT);
  const [copied, setCopied] = useState<boolean>(false);

  // Build a structured summary from the actual pasted transcript.
  const summaryMarkdown = useMemo(() => {
    const text = transcript.trim();
    if (!text) return '';

    const sentences = summarize(text, 6);
    if (sentences.length === 0) {
      return '_Paste a transcript with at least a few full sentences to generate a summary._';
    }

    const keywords = topKeywords(text, 8);
    const lead = sentences.slice(0, 2).join(' ');
    const takeaways = sentences.map((s) => `* ${s}`).join('\n');
    const topics = keywords.length ? keywords.join(' · ') : '—';
    const wordCount = text.split(/\s+/).filter(Boolean).length;

    return `### ⚡ Executive Summary
**${videoTitle || 'Video Summary'}** — ${lead}

---

### 📌 Key Points (${sentences.length})
${takeaways}

---

### 🏷️ Main Topics
${topics}

_Condensed from ~${wordCount.toLocaleString()} words of transcript, extracted directly from the text you pasted._`;
  }, [videoTitle, transcript]);

  const handleCopy = () => {
    navigator.clipboard.writeText(summaryMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Transcript Input */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div>
          <label htmlFor="video-title-input" className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-1">
            Video Title (Optional)
          </label>
          <input
            id="video-title-input"
            type="text"
            value={videoTitle}
            onChange={(e) => setVideoTitle(e.target.value)}
            placeholder="e.g. 5 Daily Habits of Elite Software Engineers"
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-sm font-semibold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="video-transcript-input" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
              <Video className="h-4 w-4 text-red-600" /> Paste Video Transcript / Timestamps / Notes
            </label>
            <button
              onClick={() => {
                setVideoTitle('5 Daily Habits of Elite Software Engineers');
                setTranscript(SAMPLE_TRANSCRIPT);
              }}
              className="text-xs text-red-600 hover:underline"
            >
              Load Sample
            </button>
          </div>
          <textarea
            id="video-transcript-input"
            rows={6}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
            placeholder="Paste transcript from YouTube (auto-generated or manual subtitles with timestamps)..."
            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 font-mono text-xs text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500/20"
          />
        </div>
      </div>

      {/* Generated Summary Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-red-600" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">
              Structured Executive Summary & Action Steps
            </h3>
          </div>

          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-700 shadow-sm"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied Summary' : 'Copy Summary'}
          </button>
        </div>

        <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-800/40 p-5 font-mono text-xs text-gray-800 dark:text-gray-200 whitespace-pre-wrap select-all">
          {summaryMarkdown}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Clock className="h-3.5 w-3.5 text-red-500" /> Saves ~15-30 minutes of watch time
        </span>
        <span className="flex items-center gap-1">
          <ListChecks className="h-3.5 w-3.5 text-red-500" /> High-retention bullet format
        </span>
      </div>
    </div>
  );
}
