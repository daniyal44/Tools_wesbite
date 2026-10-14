'use client';

import React, { useState, useMemo } from 'react';
import { Bot, CheckCircle, AlertTriangle, Sparkles, FileText } from 'lucide-react';

const SAMPLE_CONTENT = `What is Cloud Computing? Cloud computing is the on-demand delivery of IT resources over the internet with pay-as-you-go pricing. Instead of buying, owning, and maintaining physical data centers and servers, companies access compute power, storage, and databases on an as-needed basis from a cloud provider like AWS or Azure.

According to Gartner's 2025 report, over 85% of enterprise workloads will embrace a cloud-first principle by 2026.

Key Benefits of Cloud Infrastructure:
1. Cost Savings: Eliminate upfront capital expenditure (CapEx) for hardware.
2. Global Scalability: Deploy applications worldwide in seconds with zero latency.
3. High Availability: Redundant data centers ensure 99.99% uptime SLAs.`;

export default function GeoAeoOptimizer() {
  const [content, setContent] = useState<string>(SAMPLE_CONTENT);

  // Analysis criteria
  const analysis = useMemo(() => {
    const text = content.trim();
    if (!text) {
      return {
        score: 0,
        directAnswer: false,
        citations: false,
        structuredLists: false,
        entityClarity: false,
        lengthScore: 0,
        recommendations: ['Paste your article or copy to begin analysis.'],
      };
    }

    const words = text.split(/\s+/).length;
    const first100Words = text.split(/\s+/).slice(0, 100).join(' ');

    // 1. Direct Answer (is, refers to, defined as in first 100 words)
    const directAnswer = /\b(is|refers to|defined as|means|consists of)\b/i.test(first100Words);

    // 2. Citations & Numbers (percentages, dates, studies, according to)
    const citations = /\b(\d{4}|\d+%|according to|reported|study|research|survey)\b/i.test(text);

    // 3. Structured Lists (1. 2. or bullet points)
    const structuredLists = /(?:^|\n)(?:\d+\.|\*|-)\s+/m.test(text);

    // 4. Entity Clarity (question or bold definition header)
    const entityClarity = /\b(what is|how to|why|benefits of)\b/i.test(text);

    // Score calculation
    let calculatedScore = 20; // baseline
    if (directAnswer) calculatedScore += 25;
    if (citations) calculatedScore += 20;
    if (structuredLists) calculatedScore += 20;
    if (entityClarity) calculatedScore += 15;
    if (words >= 150) calculatedScore = Math.min(100, calculatedScore);

    const recs: string[] = [];
    if (!directAnswer) {
      recs.push('Provide a direct 30-word definitional summary in the very first paragraph (e.g., "[Topic] is a...").');
    }
    if (!citations) {
      recs.push('Include specific data points, dates, or authority citations ("According to 2025 research...") to trigger Perplexity citations.');
    }
    if (!structuredLists) {
      recs.push('Break prose into numbered steps or bulleted lists. LLMs prioritize structured lists for featured answers.');
    }
    if (!entityClarity) {
      recs.push('Include clear question headings like "What is [Topic]?" or "How does [Topic] work?" to match conversational AI queries.');
    }
    if (words < 100) {
      recs.push('Expand content depth to at least 150-300 words to give AI engines sufficient contextual depth.');
    }

    return {
      score: calculatedScore,
      directAnswer,
      citations,
      structuredLists,
      entityClarity,
      lengthScore: words,
      recommendations: recs,
    };
  }, [content]);

  return (
    <div className="space-y-8">
      {/* Overview Score Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            AI Search Visibility Score
          </span>
          <div className="text-3xl font-black text-gray-900 dark:text-white mt-1 font-mono">
            {analysis.score} <span className="text-base font-normal text-gray-400">/ 100</span>
          </div>
          <span className="text-xs text-blue-700 dark:text-blue-300 font-semibold mt-1 block">
            {analysis.score >= 80 ? 'Excellent GEO/AEO Readiness' : 'Needs Optimization'}
          </span>
        </div>

        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
            Direct Answer Clarity
          </span>
          <div className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mt-2">
            {analysis.directAnswer ? (
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            )}
            <span>{analysis.directAnswer ? 'Detected' : 'Missing'}</span>
          </div>
          <span className="text-xs text-gray-500 mt-1 block">First 100 words hook</span>
        </div>

        <div className="rounded-2xl border border-purple-200 dark:border-purple-900/50 bg-purple-50/50 dark:bg-purple-950/20 p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
            Citation & Data Signals
          </span>
          <div className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mt-2">
            {analysis.citations ? (
              <CheckCircle className="h-5 w-5 text-purple-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            )}
            <span>{analysis.citations ? 'Strong' : 'Weak'}</span>
          </div>
          <span className="text-xs text-gray-500 mt-1 block">Stats & Year references</span>
        </div>

        <div className="rounded-2xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 p-5">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
            List Formatting
          </span>
          <div className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white mt-2">
            {analysis.structuredLists ? (
              <CheckCircle className="h-5 w-5 text-emerald-500" />
            ) : (
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            )}
            <span>{analysis.structuredLists ? 'Present' : 'None'}</span>
          </div>
          <span className="text-xs text-gray-500 mt-1 block">Bullets or numbers</span>
        </div>
      </div>

      {/* Editor & Recommendations */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Content Input */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label htmlFor="content-to-audit-input" className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                <FileText className="h-4 w-4 text-blue-600" /> Article / Landing Page Text
              </label>
              <button
                onClick={() => setContent(SAMPLE_CONTENT)}
                className="text-xs text-blue-600 hover:underline"
              >
                Reset to Sample
              </button>
            </div>

            <textarea
              id="content-to-audit-input"
              rows={12}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste article, blog draft, or landing page section to audit..."
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-4 text-xs font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="mt-3 text-xs text-gray-400">
            Word count: {content.trim() ? content.trim().split(/\s+/).length : 0} words
          </div>
        </div>

        {/* Actionable Recommendations */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-blue-600" /> AI Citation & Ranking Recommendations
          </h3>

          {analysis.recommendations.length > 0 ? (
            <div className="space-y-3">
              {analysis.recommendations.map((rec, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5"
                >
                  <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20 text-center text-xs text-emerald-800 dark:text-emerald-200">
              <CheckCircle className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              Outstanding! Your content satisfies all critical criteria for generative search citation and direct answer extracts.
            </div>
          )}

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 text-xs text-gray-500 space-y-2">
            <div className="font-semibold text-gray-700 dark:text-gray-300">Target AI Engines:</div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-[11px]">ChatGPT Search</span>
              <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-[11px]">Perplexity AI</span>
              <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-[11px]">Google AI Overviews</span>
              <span className="px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-[11px]">Claude 3.5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
        <Bot className="h-4 w-4 text-blue-500" />
        Generative Engine Optimization (GEO) maximizes your brand citation frequency across LLM search engines.
      </div>
    </div>
  );
}
