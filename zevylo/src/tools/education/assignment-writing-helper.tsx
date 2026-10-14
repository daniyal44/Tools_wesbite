'use client';

import React, { useState, useMemo } from 'react';
import { BookOpen, Copy, Check, Sparkles, Layers } from 'lucide-react';

export default function AssignmentWritingHelper() {
  const [topic, setTopic] = useState<string>('The Impact of Artificial Intelligence on Higher Education');
  const [assignmentType, setAssignmentType] = useState<string>('research');
  const [targetWords, setTargetWords] = useState<number>(1500);
  const [thesisClaim, setThesisClaim] = useState<string>('AI enhances personalized learning');
  const [thesisReason, setThesisReason] = useState<string>('it adapts coursework to individual student pacing and provides 24/7 tutoring');
  const [thesisCounter, setThesisCounter] = useState<string>('concerns regarding academic integrity and reduced critical thinking persist');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const wordBreakdown = useMemo(() => {
    const total = Math.max(100, targetWords);
    const intro = Math.round(total * 0.1);
    const conclusion = Math.round(total * 0.1);
    const bodyTotal = total - intro - conclusion;
    const bodySections = assignmentType === 'research' ? 4 : 3;
    const perSection = Math.round(bodyTotal / bodySections);

    return {
      intro,
      conclusion,
      bodyTotal,
      bodySections,
      perSection,
    };
  }, [targetWords, assignmentType]);

  const thesisStatement = useMemo(() => {
    return `Although ${thesisCounter.trim()}, ${thesisClaim.trim()} because ${thesisReason.trim()}.`;
  }, [thesisClaim, thesisReason, thesisCounter]);

  const outlineMarkdown = useMemo(() => {
    return `# Assignment Outline: ${topic}
Target Word Count: ${targetWords} words | Format: ${assignmentType.toUpperCase()}

## 1. Introduction (~${wordBreakdown.intro} words)
- Hook / Attention Grabber: Introduce contemporary context of ${topic}.
- Background & Context: Define key concepts and academic relevance.
- Thesis Statement:
  "${thesisStatement}"
- Roadmap / Overview of Main Arguments.

## 2. Core Body Arguments (~${wordBreakdown.bodyTotal} words total)
${Array.from({ length: wordBreakdown.bodySections })
  .map(
    (_, i) => `### Argument ${i + 1} (~${wordBreakdown.perSection} words)
- Point: Main assertion supporting the thesis.
- Evidence: Scholarly peer-reviewed citations, empirical studies, or statistics.
- Explanation: In-depth analytical evaluation of why this evidence proves the argument.
- Link: Conceptual bridge connecting back to the thesis and leading into the next point.`
  )
  .join('\n\n')}

## 3. Counterargument & Rebuttal (~${wordBreakdown.perSection} words)
- Academic Counterclaim: Acknowledge legitimate limitations (${thesisCounter}).
- Refutation / Rebuttal: Provide counter-evidence demonstrating why the primary thesis remains substantiated.

## 4. Conclusion (~${wordBreakdown.conclusion} words)
- Restatement of Thesis in new phrasing.
- Synthesis of primary arguments (avoid simple repeating).
- Broader Implications / Call to Action / Future Research directions.`;
  }, [topic, targetWords, assignmentType, wordBreakdown, thesisStatement, thesisCounter]);

  return (
    <div className="space-y-8">
      {/* Configuration Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <div className="md:col-span-2">
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
            Assignment Topic / Prompt Question
          </label>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
            Target Word Count
          </label>
          <input
            type="number"
            min="200"
            step="100"
            value={targetWords}
            onChange={(e) => setTargetWords(parseInt(e.target.value) || 0)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50 font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-gray-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
            Paper Structure Type
          </label>
          <select
            value={assignmentType}
            onChange={(e) => setAssignmentType(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50"
          >
            <option value="research">Academic Research Paper</option>
            <option value="argumentative">Argumentative / Persuasive Essay</option>
            <option value="analytical">Analytical Essay</option>
            <option value="report">Case Study & Report</option>
          </select>
        </div>
      </div>

      {/* Word Count Allocation Planner */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-gray-900 dark:text-white">Target Word Count Allocation</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-center">
            <span className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400 uppercase">Introduction (10%)</span>
            <div className="text-xl font-bold text-gray-900 dark:text-white mt-1">~{wordBreakdown.intro} words</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-center">
            <span className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400 uppercase">Per Body Section</span>
            <div className="text-xl font-bold text-amber-400 mt-1">~{wordBreakdown.perSection} words</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-center">
            <span className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400 uppercase">Total Body (80%)</span>
            <div className="text-xl font-bold text-sky-400 mt-1">~{wordBreakdown.bodyTotal} words</div>
          </div>
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-center">
            <span className="text-[11px] font-semibold text-gray-500 dark:text-zinc-400 uppercase">Conclusion (10%)</span>
            <div className="text-xl font-bold text-emerald-400 mt-1">~{wordBreakdown.conclusion} words</div>
          </div>
        </div>
      </div>

      {/* Thesis Statement Generator */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-sky-400" />
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Academic Thesis Statement Builder</h2>
          </div>
          <button
            onClick={() => copyText('thesis', thesisStatement)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white text-xs font-semibold transition-colors"
          >
            {copiedKey === 'thesis' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Thesis
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-500 dark:text-zinc-400 mb-1 font-medium">Counter-perspective / Concession</label>
            <input
              type="text"
              value={thesisCounter}
              onChange={(e) => setThesisCounter(e.target.value)}
              placeholder="e.g. ethical concerns exist"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-zinc-400 mb-1 font-medium">Your Primary Claim</label>
            <input
              type="text"
              value={thesisClaim}
              onChange={(e) => setThesisClaim(e.target.value)}
              placeholder="e.g. renewable energy is vital"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-500 dark:text-zinc-400 mb-1 font-medium">Core Reasons / Evidence</label>
            <input
              type="text"
              value={thesisReason}
              onChange={(e) => setThesisReason(e.target.value)}
              placeholder="e.g. it lowers carbon emissions"
              className="w-full px-3 py-2 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-black/50 border border-gray-200 dark:border-gray-800 text-sm font-serif italic text-zinc-200">
          &ldquo;{thesisStatement}&rdquo;
        </div>
      </div>

      {/* Complete Assignment Outline */}
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-gray-900 dark:text-white">Full Assignment Framework & Markdown Outline</h2>
          </div>
          <button
            onClick={() => copyText('outline', outlineMarkdown)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black text-xs font-semibold transition-colors"
          >
            {copiedKey === 'outline' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            Copy Complete Outline
          </button>
        </div>

        <pre className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {outlineMarkdown}
        </pre>
      </div>
    </div>
  );
}
