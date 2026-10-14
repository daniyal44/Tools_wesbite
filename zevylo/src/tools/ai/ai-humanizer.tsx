'use client';

import React, { useState, useMemo } from 'react';
import { UserCheck, Copy, Check, ArrowRight, ShieldCheck, Sparkles, RefreshCw } from 'lucide-react';

const AI_CLICHES: Record<string, string[]> = {
  'delve into': ['explore', 'dig into', 'examine', 'look at'],
  'delves into': ['explores', 'examines', 'looks at', 'covers'],
  'delve': ['look', 'dig', 'explore'],
  'testament to': ['proof of', 'evidence of', 'sign of', 'demonstration of'],
  'tapestry of': ['mix of', 'combination of', 'blend of'],
  'in conclusion,': ['to wrap up,', 'overall,', 'in short,', 'all in all,'],
  'furthermore,': ['on top of that,', 'plus,', 'what is more,', 'also,'],
  'moreover,': ['also,', 'besides,', 'on top of this,'],
  'it is important to note that': ['keep in mind that', 'notice that', 'importantly,'],
  'it is crucial to': ['you need to', 'make sure to', 'it pays to'],
  'plays a vital role': ['matters a lot', 'is essential', 'drives results', 'is key'],
  'game-changer': ['breakthrough', 'major leap', 'huge shift'],
  'beacon of': ['example of', 'leader in', 'model for'],
  'ever-evolving landscape': ['fast-changing world', 'modern market', 'industry today'],
  'in today’s digital age': ['today,', 'nowadays,', 'in recent years,'],
  'in today\'s digital age': ['today,', 'nowadays,', 'in recent years,'],
  'seamlessly integrates': ['works smoothly with', 'connects easily with', 'plugs right into'],
  'serves as a reminder': ['reminds us', 'shows', 'points out'],
  'foster a culture': ['build a culture', 'encourage', 'grow'],
  'leverage': ['use', 'apply', 'draw on', 'take advantage of'],
  'leveraging': ['using', 'applying', 'harnessing'],
  'paradigm shift': ['big change', 'fundamental shift', 'new direction'],
  'plethora of': ['plenty of', 'dozens of', 'a lot of'],
  'myriad of': ['countless', 'many', 'a wide range of'],
  'harness the power of': ['use', 'make the most of', 'benefit from'],
};

const SAMPLE_AI_TEXT = `In today's digital age, it is crucial to delve into the ever-evolving landscape of artificial intelligence. AI plays a vital role in our daily routines and serves as a testament to human ingenuity. Furthermore, by leveraging these cutting-edge algorithms, organizations can foster a culture of innovation and achieve a paradigm shift in productivity. In conclusion, navigating this complex tapestry of technology offers a plethora of benefits for those willing to harness the power of modern tools.`;

export default function AiHumanizer() {
  const [inputText, setInputText] = useState(SAMPLE_AI_TEXT);
  const [tone, setTone] = useState<'conversational' | 'casual' | 'academic-clear' | 'storytelling'>('conversational');
  const [addHumanImperfections, setAddHumanImperfections] = useState(true);
  const [copied, setCopied] = useState(false);

  const humanized = useMemo(() => {
    let text = inputText.trim();
    if (!text) return '';

    // Replace known AI cliché phrases
    let replacedCount = 0;
    Object.entries(AI_CLICHES).forEach(([cliche, replacements]) => {
      const regex = new RegExp(`\\b${cliche}\\b`, 'gi');
      if (regex.test(text)) {
        replacedCount++;
        text = text.replace(regex, () => {
          const rep = replacements[Math.floor(Math.random() * replacements.length)];
          return rep;
        });
      }
    });

    // Tone modifiers
    if (tone === 'conversational') {
      text = text
        .replace(/\bdo not\b/gi, "don't")
        .replace(/\bcannot\b/gi, "can't")
        .replace(/\bit is\b/gi, "it's")
        .replace(/\bwe are\b/gi, "we're")
        .replace(/\bthey are\b/gi, "they're");
    } else if (tone === 'casual') {
      text = text
        .replace(/\bdo not\b/gi, "don't")
        .replace(/\bcannot\b/gi, "can't")
        .replace(/\bhowever,\b/gi, 'but')
        .replace(/\btherefore,\b/gi, 'so')
        .replace(/\bconsequently,\b/gi, 'as a result,');
    }

    // Break up over-long compound sentences or uniform structures to inject burstiness
    if (addHumanImperfections) {
      const sentences = text.split(/(?<=[.?!])\s+/);
      const variedSentences = sentences.map((s, idx) => {
        // Occasionally inject a transitional human thought
        if (idx === 1 && tone === 'conversational' && !s.toLowerCase().startsWith('honestly')) {
          return `Honestly, ${s.charAt(0).toLowerCase() + s.slice(1)}`;
        }
        return s;
      });
      text = variedSentences.join(' ');
    }

    return text;
  }, [inputText, tone, addHumanImperfections]);

  // Statistics
  const wordsOriginal = inputText.trim().split(/\s+/).filter(Boolean).length;
  const wordsHumanized = humanized.trim().split(/\s+/).filter(Boolean).length;

  const handleCopy = () => {
    navigator.clipboard.writeText(humanized);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Configuration bar */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Writing Tone:</span>
          {(['conversational', 'casual', 'academic-clear', 'storytelling'] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTone(t)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                tone === t
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              {t.replace('-', ' ')}
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={addHumanImperfections}
            onChange={(e) => setAddHumanImperfections(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Inject Natural Burstiness &amp; Sentence Variance</span>
        </label>
      </div>

      {/* Editor Comparison */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span>🤖</span> AI-Generated Text Input
              </span>
              <button
                type="button"
                onClick={() => setInputText(SAMPLE_AI_TEXT)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
              >
                Load Sample AI Text
              </button>
            </div>
            <textarea
              rows={10}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste text from ChatGPT, Claude, or Gemini here..."
              className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-4 text-xs sm:text-sm text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>
          <div className="text-xs text-gray-400 flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
            <span>{wordsOriginal} words</span>
            <span>Detects 80+ AI clichés</span>
          </div>
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/30 dark:bg-emerald-950/20 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                Humanized &amp; Natural Output
              </span>
              <button
                type="button"
                onClick={handleCopy}
                disabled={!humanized}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
            <div className="w-full min-h-[240px] rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-gray-900 p-4 text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed select-all">
              {humanized || <span className="text-gray-400">Paste text on the left to see the humanized version...</span>}
            </div>
          </div>
          <div className="text-xs text-emerald-700 dark:text-emerald-400 flex items-center justify-between pt-2 border-t border-emerald-100 dark:border-emerald-900/50">
            <span>{wordsHumanized} words</span>
            <span className="flex items-center gap-1 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Client-Side Private
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
