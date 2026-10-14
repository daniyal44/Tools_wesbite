'use client';

import React, { useState, useMemo } from 'react';
import { BookOpen, Copy, Check, RotateCcw } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function ReadabilityCalculator() {
  const [text, setText] = useState(
    'The quick brown fox jumps over the lazy dog. Writing clear and concise sentences makes your content engaging and easy to understand. Try keeping your paragraphs focused on a single topic so your readers stay interested.'
  );
  const [copied, setCopied] = useState(false);

  // Syllable counter approximation
  const countSyllables = (word: string): number => {
    const w = word.toLowerCase().replace(/[^a-z]/g, '');
    if (w.length <= 3) return 1;
    const clean = w.replace(/(?:[^laeiouy]|ed|es|e)$/, '').replace(/^y/, '');
    const matches = clean.match(/[aeiouy]{1,2}/g);
    return matches ? Math.max(1, matches.length) : 1;
  };

  const stats = useMemo(() => {
    if (!text.trim()) return null;

    // Sentences
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const numSentences = Math.max(1, sentences.length);

    // Words
    const words = text.split(/\s+/).filter((w) => /[a-zA-Z0-9]/.test(w));
    const numWords = Math.max(1, words.length);

    // Syllables
    let totalSyllables = 0;

    words.forEach((w) => {
      totalSyllables += countSyllables(w);
    });

    const wordsPerSentence = numWords / numSentences;
    const syllablesPerWord = totalSyllables / numWords;

    // Flesch Reading Ease Formula:
    // 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
    let fleschEase = 206.835 - 1.015 * wordsPerSentence - 84.6 * syllablesPerWord;
    fleschEase = Math.max(0, Math.min(100, parseFloat(fleschEase.toFixed(1))));

    // Flesch-Kincaid Grade Level Formula:
    // 0.39 * (total words / total sentences) + 11.8 * (total syllables / total words) - 15.59
    let fkGrade = 0.39 * wordsPerSentence + 11.8 * syllablesPerWord - 15.59;
    fkGrade = Math.max(1, parseFloat(fkGrade.toFixed(1)));

    // Categorization
    let clarity = 'Plain English (8th - 9th Grade)';
    let badgeColor = 'text-green-600 bg-green-50 dark:bg-green-950/30 border-green-200';
    if (fleschEase >= 90) {
      clarity = 'Very Easy (5th Grade)';
      badgeColor = 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200';
    } else if (fleschEase >= 70) {
      clarity = 'Fairly Easy (7th Grade)';
      badgeColor = 'text-green-600 bg-green-50 dark:bg-green-950/30 border-green-200';
    } else if (fleschEase >= 50) {
      clarity = 'Fairly Difficult (10th - 12th Grade)';
      badgeColor = 'text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-amber-200';
    } else if (fleschEase >= 30) {
      clarity = 'Difficult (College Level)';
      badgeColor = 'text-orange-600 bg-orange-50 dark:bg-orange-950/30 border-orange-200';
    } else {
      clarity = 'Very Difficult (Graduate Level)';
      badgeColor = 'text-red-600 bg-red-50 dark:bg-red-950/30 border-red-200';
    }

    const readingTimeMinutes = Math.max(1, Math.ceil(numWords / 200));

    return {
      fleschEase,
      fkGrade,
      clarity,
      badgeColor,
      numWords,
      numSentences,
      totalSyllables,
      wordsPerSentence: wordsPerSentence.toFixed(1),
      readingTimeMinutes,
    };
  }, [text]);

  const handleCopy = async () => {
    if (!stats) return;
    const summary = `Readability Analysis:\nFlesch Reading Ease: ${stats.fleschEase} / 100 (${stats.clarity})\nFlesch-Kincaid Grade: ${stats.fkGrade}\nWords: ${stats.numWords} | Sentences: ${stats.numSentences} | Avg Words/Sentence: ${stats.wordsPerSentence}`;
    await copyToClipboard(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Score Banner */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-1">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
              Flesch Reading Ease
            </span>
            <div className="text-4xl font-black text-blue-600 dark:text-blue-400">
              {stats.fleschEase}
              <span className="text-sm font-semibold text-gray-400"> / 100</span>
            </div>
            <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full border ${stats.badgeColor} mt-1`}>
              {stats.clarity}
            </span>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-1">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
              Grade Level
            </span>
            <div className="text-4xl font-black text-gray-900 dark:text-gray-100">
              Grade {stats.fkGrade}
            </div>
            <p className="text-xs text-gray-500 mt-1">Flesch-Kincaid Education Scale</p>
          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-1 sm:col-span-2 md:col-span-1">
            <span className="text-xs uppercase font-bold tracking-wider text-gray-400">
              Reading Time
            </span>
            <div className="text-4xl font-black text-gray-900 dark:text-gray-100">
              ~{stats.readingTimeMinutes} min
            </div>
            <p className="text-xs text-gray-500 mt-1">Based on 200 words / minute</p>
          </div>
        </div>
      )}

      {/* Editor & Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        <div className="md:col-span-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              Source Content
            </span>
            <button
              onClick={() => setText('')}
              className="flex items-center gap-1 hover:text-gray-700 text-gray-400"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-sm leading-relaxed"
            placeholder="Paste your text here to analyze readability..."
          />
        </div>

        {/* Stats Column */}
        <div className="md:col-span-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-gray-900 dark:text-gray-100">
            <span>Text Structure</span>
            {stats && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-700"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>

          {stats ? (
            <div className="space-y-2.5 text-xs font-medium divide-y divide-gray-100 dark:divide-gray-800">
              <div className="flex justify-between pt-1">
                <span className="text-gray-500">Total Words:</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{stats.numWords}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-500">Total Sentences:</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{stats.numSentences}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-500">Total Syllables:</span>
                <span className="font-bold text-gray-900 dark:text-gray-100">{stats.totalSyllables}</span>
              </div>
              <div className="flex justify-between pt-2">
                <span className="text-gray-500">Avg Words / Sentence:</span>
                <span className="font-bold text-blue-600">{stats.wordsPerSentence}</span>
              </div>
            </div>
          ) : (
            <div className="text-xs text-gray-400 py-6 text-center">
              Type or paste text to see metrics.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
