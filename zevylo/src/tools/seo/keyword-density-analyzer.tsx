'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, BarChart2, AlertTriangle, FileText, CheckCircle2 } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

const STOPWORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'aren\'t',
  'as', 'at', 'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'can', 'can\'t', 'cannot', 'could', 'couldn\'t', 'did', 'didn\'t', 'do', 'does', 'doesn\'t', 'doing',
  'don\'t', 'down', 'during', 'each', 'few', 'for', 'from', 'further', 'had', 'hadn\'t', 'has', 'hasn\'t',
  'have', 'haven\'t', 'having', 'he', 'he\'d', 'he\'ll', 'he\'s', 'her', 'here', 'here\'s', 'hers',
  'herself', 'him', 'himself', 'his', 'how', 'how\'s', 'i', 'i\'d', 'i\'ll', 'i\'m', 'i\'ve', 'if',
  'in', 'into', 'is', 'isn\'t', 'it', 'it\'s', 'its', 'itself', 'let\'s', 'me', 'more', 'most',
  'mustn\'t', 'my', 'myself', 'no', 'nor', 'not', 'of', 'off', 'on', 'once', 'only', 'or', 'other',
  'ought', 'our', 'ours', 'ourselves', 'out', 'over', 'own', 'same', 'shan\'t', 'she', 'she\'d', 'she\'ll',
  'she\'s', 'should', 'shouldn\'t', 'so', 'some', 'such', 'than', 'that', 'that\'s', 'the', 'their',
  'theirs', 'them', 'themselves', 'then', 'there', 'there\'s', 'these', 'they', 'they\'d', 'they\'ll',
  'they\'re', 'they\'ve', 'this', 'those', 'through', 'to', 'too', 'under', 'until', 'up', 'very',
  'was', 'wasn\'t', 'we', 'we\'d', 'we\'ll', 'we\'re', 'we\'ve', 'were', 'weren\'t', 'what', 'what\'s',
  'when', 'when\'s', 'where', 'where\'s', 'which', 'while', 'who', 'who\'s', 'whom', 'why', 'why\'s',
  'with', 'won\'t', 'would', 'wouldn\'t', 'you', 'you\'d', 'you\'ll', 'you\'re', 'you\'ve', 'your',
  'yours', 'yourself', 'yourselves'
]);

interface KeywordItem {
  phrase: string;
  count: number;
  density: number;
}

const DEFAULT_ARTICLE = `Search engine optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic. Unpaid traffic may originate from different kinds of searches, including image search, video search, academic search, news search, and industry-specific vertical search engines.

As an internet marketing strategy, SEO considers how search engines work, the computer-programmed algorithms that dictate search engine behavior, what people search for, the actual search terms or keywords typed into search engines, and which search engines are preferred by their targeted audience. SEO is performed because a website will receive more visitors from a search engine when websites rank higher on the search engine results page (SERP).`;

export default function KeywordDensityAnalyzer() {
  const [text, setText] = useState(DEFAULT_ARTICLE);
  const [filterStopwords, setFilterStopwords] = useState(true);
  const [activeTab, setActiveTab] = useState<'1' | '2' | '3'>('1');
  const [copied, setCopied] = useState(false);

  const analysis = useMemo(() => {
    if (!text.trim()) return null;

    // Clean text: strip HTML tags and punctuation
    const clean = text.replace(/<[^>]*>/g, ' ').toLowerCase();
    const words = clean.match(/\b[a-z0-9_-]+\b/g) || [];
    const totalWords = words.length;

    if (totalWords === 0) return null;

    const charCount = text.length;
    const charCountNoSpaces = text.replace(/\s+/g, '').length;
    const readingTime = Math.ceil(totalWords / 200);

    // 1-Word counts
    const singleCounts: Record<string, number> = {};
    for (const w of words) {
      if (filterStopwords && STOPWORDS.has(w)) continue;
      if (w.length < 2) continue;
      singleCounts[w] = (singleCounts[w] || 0) + 1;
    }

    // 2-Word counts
    const twoCounts: Record<string, number> = {};
    for (let i = 0; i < words.length - 1; i++) {
      const w1 = words[i];
      const w2 = words[i + 1];
      if (filterStopwords && (STOPWORDS.has(w1) && STOPWORDS.has(w2))) continue;
      const phrase = `${w1} ${w2}`;
      twoCounts[phrase] = (twoCounts[phrase] || 0) + 1;
    }

    // 3-Word counts
    const threeCounts: Record<string, number> = {};
    for (let i = 0; i < words.length - 2; i++) {
      const phrase = `${words[i]} ${words[i + 1]} ${words[i + 2]}`;
      threeCounts[phrase] = (threeCounts[phrase] || 0) + 1;
    }

    const toSortedArray = (counts: Record<string, number>): KeywordItem[] => {
      return Object.entries(counts)
        .map(([phrase, count]) => ({
          phrase,
          count,
          density: parseFloat(((count / totalWords) * 100).toFixed(2)),
        }))
        .filter((item) => item.count > 1)
        .sort((a, b) => b.count - a.count)
        .slice(0, 30);
    };

    return {
      totalWords,
      uniqueWords: new Set(words).size,
      charCount,
      charCountNoSpaces,
      readingTime,
      oneWordList: toSortedArray(singleCounts),
      twoWordList: toSortedArray(twoCounts),
      threeWordList: toSortedArray(threeCounts),
    };
  }, [text, filterStopwords]);

  const currentList = useMemo(() => {
    if (!analysis) return [];
    if (activeTab === '1') return analysis.oneWordList;
    if (activeTab === '2') return analysis.twoWordList;
    return analysis.threeWordList;
  }, [analysis, activeTab]);

  const handleCopyTopKeywords = async () => {
    if (!currentList || currentList.length === 0) return;
    const kw = currentList.slice(0, 15).map(k => `${k.phrase} (${k.density}%)`).join(', ');
    await copyToClipboard(kw);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Editor & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Text Input */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex justify-between items-center text-xs font-semibold text-gray-700 dark:text-gray-300">
            <span className="flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" />
              Content to Analyze
            </span>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-xs">
              <input
                type="checkbox"
                checked={filterStopwords}
                onChange={(e) => setFilterStopwords(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Ignore Stopwords (the, a, is)</span>
            </label>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 p-4 font-mono text-xs leading-relaxed outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            placeholder="Paste text, article or blog content here..."
          />
        </div>

        {/* Content Summary Cards */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-blue-600" />
            Text Metrics
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <span className="text-xs text-gray-500 block">Total Words</span>
              <span className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">
                {analysis?.totalWords.toLocaleString() || 0}
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <span className="text-xs text-gray-500 block">Unique Words</span>
              <span className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">
                {analysis?.uniqueWords.toLocaleString() || 0}
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <span className="text-xs text-gray-500 block">Characters</span>
              <span className="text-2xl font-bold font-mono text-gray-900 dark:text-gray-100">
                {analysis?.charCount.toLocaleString() || 0}
              </span>
            </div>

            <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <span className="text-xs text-gray-500 block">Reading Time</span>
              <span className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
                ~{analysis?.readingTime || 1} min
              </span>
            </div>
          </div>

          {/* SEO Density Recommendations */}
          <div className="p-4 rounded-2xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/20 text-xs text-blue-900 dark:text-blue-300 space-y-2">
            <span className="font-bold block">SEO Best Practice Guide:</span>
            <ul className="list-disc pl-4 space-y-1">
              <li><strong>Optimal Density:</strong> 1.0% to 2.5% per target keyword.</li>
              <li><strong>Stuffing Warning:</strong> Keywords above 3.5% may trigger search engine over-optimization penalties.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Density Frequency Tables */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('1')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === '1'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              1-Word Keywords ({analysis?.oneWordList.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('2')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === '2'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              2-Word Phrases ({analysis?.twoWordList.length || 0})
            </button>
            <button
              onClick={() => setActiveTab('3')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === '3'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
              }`}
            >
              3-Word Phrases ({analysis?.threeWordList.length || 0})
            </button>
          </div>

          <button
            onClick={handleCopyTopKeywords}
            disabled={!currentList.length}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-gray-700 dark:text-gray-300 disabled:opacity-40"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy Top Keywords</span>
          </button>
        </div>

        {/* Results Table */}
        {currentList.length > 0 ? (
          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-xs text-gray-500">
                <tr>
                  <th className="px-5 py-3 font-bold">Keyword / Phrase</th>
                  <th className="px-5 py-3 font-bold font-mono">Count</th>
                  <th className="px-5 py-3 font-bold font-mono">Density</th>
                  <th className="px-5 py-3 font-bold">SEO Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {currentList.map((item, idx) => {
                  const isHigh = item.density > 3.5;
                  const isOptimal = item.density >= 1.0 && item.density <= 3.5;

                  return (
                    <tr key={idx} className="hover:bg-blue-50/20 dark:hover:bg-blue-950/20 font-mono">
                      <td className="px-5 py-3 font-bold text-gray-900 dark:text-gray-100 font-sans">
                        {item.phrase}
                      </td>
                      <td className="px-5 py-3 text-gray-600 dark:text-gray-400">
                        {item.count}
                      </td>
                      <td className="px-5 py-3 font-bold text-blue-600 dark:text-blue-400">
                        {item.density}%
                      </td>
                      <td className="px-5 py-3 font-sans">
                        {isHigh ? (
                          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300 font-semibold">
                            <AlertTriangle className="w-3 h-3" />
                            High Density
                          </span>
                        ) : isOptimal ? (
                          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 font-semibold">
                            <CheckCircle2 className="w-3 h-3" />
                            Optimal
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400 font-medium">Natural</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-sm text-gray-400">
            No repeated keywords found in this category. Type or paste more text to see density results.
          </div>
        )}
      </div>
    </div>
  );
}
