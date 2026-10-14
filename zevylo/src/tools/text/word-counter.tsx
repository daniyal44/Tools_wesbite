'use client';

import React, { useState } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function WordCounter() {
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean).length;
  const lines = text.split(/\n/).length;
  const readingTime = Math.ceil(words / 200);
  const speakingTime = Math.ceil(words / 130);

  const handleCopy = async () => {
    const res = await copyToClipboard(text);
    if (res) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Word Counter</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">Processed locally in your browser</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Words', value: words },
          { label: 'Characters', value: chars },
          { label: 'Characters (No Spaces)', value: charsNoSpaces },
          { label: 'Sentences', value: sentences },
          { label: 'Paragraphs', value: paragraphs },
          { label: 'Lines', value: lines },
          { label: 'Reading Time', value: `${readingTime} min` },
          { label: 'Speaking Time', value: `${speakingTime} min` },
        ].map(stat => (
          <div key={stat.label} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border dark:border-gray-700 flex flex-col items-center">
            <span className="text-3xl font-semibold text-blue-600 dark:text-blue-400">{stat.value}</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</span>
          </div>
        ))}
      </div>

      <textarea
        className="w-full h-64 p-4 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
        placeholder="Type or paste your text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setText('')}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Results'}
        </button>
      </div>
    </div>
  );
}
