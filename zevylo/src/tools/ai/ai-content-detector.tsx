'use client';

import React, { useState, useMemo } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Info, Sparkles, RefreshCw } from 'lucide-react';

const AI_MARKERS = [
  'delve', 'testament', 'tapestry', 'furthermore', 'moreover', 'vital role',
  'ever-evolving', 'paradigm shift', 'plethora', 'myriad', 'crucial', 'pivotal',
  'seamlessly', 'beacon', 'in conclusion', 'harness', 'foster', 'underscore',
  'it is important to note', 'testament to the', 'deep dive', 'game-changing'
];

export default function AiContentDetector() {
  const [text, setText] = useState(
    `In today's fast-paced world, artificial intelligence plays a vital role in transforming modern industries. It is crucial to delve into how machine learning models enhance daily productivity. Furthermore, these technological breakthroughs serve as a testament to human ingenuity. By leveraging automated systems, organizations can foster a culture of sustained growth. In conclusion, navigating this complex tapestry of digital tools provides a plethora of competitive advantages.`
  );

  const analysis = useMemo(() => {
    const raw = text.trim();
    if (!raw) {
      return {
        aiScore: 0,
        label: 'No text',
        sentenceCount: 0,
        wordCount: 0,
        burstiness: 0,
        flaggedCount: 0,
        sentences: [],
      };
    }

    // Split sentences
    const rawSentences = raw.match(/[^.!?]+[.!?]+/g) || [raw];
    const cleanSentences = rawSentences.map((s) => s.trim()).filter(Boolean);

    const wordCount = raw.split(/\s+/).filter(Boolean).length;
    const sentenceLengths = cleanSentences.map((s) => s.split(/\s+/).filter(Boolean).length);

    // Calculate sentence length variance (Burstiness)
    const avgLen = sentenceLengths.reduce((a, b) => a + b, 0) / (sentenceLengths.length || 1);
    const variance =
      sentenceLengths.reduce((acc, len) => acc + Math.pow(len - avgLen, 2), 0) /
      (sentenceLengths.length || 1);
    const stdDev = Math.sqrt(variance);
    // Low standard deviation indicates uniform robotic sentence lengths (typical of AI)
    const burstinessScore = Math.min(100, Math.round((stdDev / (avgLen || 1)) * 100));

    // Check sentence by sentence for AI indicators
    let flaggedCount = 0;
    const analyzedSentences = cleanSentences.map((sentence) => {
      const lower = sentence.toLowerCase();
      let matchCount = 0;
      AI_MARKERS.forEach((marker) => {
        if (lower.includes(marker)) matchCount++;
      });

      // AI sentences typically are between 14-25 words with low clause complexity
      const sWordCount = sentence.split(/\s+/).filter(Boolean).length;
      const isUniformLength = sWordCount >= 14 && sWordCount <= 26;

      const sentenceAiProb = Math.min(
        98,
        matchCount * 35 + (isUniformLength ? 25 : 5)
      );

      if (sentenceAiProb > 45) flaggedCount++;

      return {
        text: sentence,
        prob: sentenceAiProb,
        matches: AI_MARKERS.filter((m) => lower.includes(m)),
      };
    });

    // Overall AI score: Combines marker density + low burstiness penalty
    const markerDensity = (flaggedCount / (cleanSentences.length || 1)) * 100;
    const burstinessPenalty = burstinessScore < 30 ? (30 - burstinessScore) * 1.5 : 0;
    const finalScore = Math.min(99, Math.max(2, Math.round(markerDensity * 0.75 + burstinessPenalty + 15)));

    let label = 'Highly Likely Human';
    let labelColor = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200';
    if (finalScore > 65) {
      label = 'Likely AI-Generated';
      labelColor = 'text-red-600 bg-red-50 dark:bg-red-950/40 border-red-200';
    } else if (finalScore > 35) {
      label = 'Mixed / AI-Assisted';
      labelColor = 'text-amber-600 bg-amber-50 dark:bg-amber-950/40 border-amber-200';
    }

    return {
      aiScore: finalScore,
      label,
      labelColor,
      sentenceCount: cleanSentences.length,
      wordCount,
      burstiness: burstinessScore,
      flaggedCount,
      sentences: analyzedSentences,
    };
  }, [text]);

  return (
    <div className="space-y-8">
      {/* Input area */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <label className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-500" />
            Enter Content to Analyze
          </label>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span>{analysis.wordCount} words</span>
            <span>{analysis.sentenceCount} sentences</span>
          </div>
        </div>
        <textarea
          rows={6}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste essays, blog posts, or marketing text to check AI probability..."
          className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4 text-xs sm:text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
        />
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-2">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">AI Probability</span>
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">{analysis.aiScore}%</span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${analysis.labelColor}`}>
              {analysis.label}
            </span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 mt-2">
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                analysis.aiScore > 65 ? 'bg-red-500' : analysis.aiScore > 35 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${analysis.aiScore}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Burstiness &amp; Rhythm</span>
          <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">{analysis.burstiness}/100</div>
          <p className="text-[11px] text-gray-400">
            {analysis.burstiness < 30 ? 'Low variance (Uniform AI rhythm)' : 'High variance (Natural human flow)'}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-1">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Suspect Sentences</span>
          <div className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
            {analysis.flaggedCount} <span className="text-sm font-normal text-gray-400">of {analysis.sentenceCount}</span>
          </div>
          <p className="text-[11px] text-gray-400">Sentences exhibiting textbook LLM patterns</p>
        </div>
      </div>

      {/* Sentence by Sentence Breakdown */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-500" />
          Sentence-by-Sentence AI Heatmap
        </h3>
        <div className="space-y-3">
          {analysis.sentences.map((s, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded-xl border text-xs sm:text-sm leading-relaxed transition-colors ${
                s.prob > 60
                  ? 'border-red-200 dark:border-red-900/50 bg-red-50/40 dark:bg-red-950/20 text-red-950 dark:text-red-200'
                  : s.prob > 30
                  ? 'border-amber-200 dark:border-amber-900/50 bg-amber-50/40 dark:bg-amber-950/20 text-amber-950 dark:text-amber-200'
                  : 'border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5 text-[11px] font-semibold">
                <span className="text-gray-400">Sentence #{idx + 1}</span>
                <span className={s.prob > 60 ? 'text-red-600' : s.prob > 30 ? 'text-amber-600' : 'text-emerald-600'}>
                  {s.prob}% AI likelihood
                </span>
              </div>
              <p>{s.text}</p>
              {s.matches.length > 0 && (
                <div className="mt-2 flex items-center gap-1.5 flex-wrap text-[10px]">
                  <span className="text-gray-400">Detected clichés:</span>
                  {s.matches.map((m, mIdx) => (
                    <span key={mIdx} className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 font-mono">
                      "{m}"
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
