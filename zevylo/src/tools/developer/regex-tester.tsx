'use client';

import React, { useState, useMemo } from 'react';

const COMMON_REGEXES = [
  { label: 'Email', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', flags: 'g' },
  { label: 'URL', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', flags: 'g' },
  { label: 'IPv4', pattern: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b', flags: 'g' },
  { label: 'Phone', pattern: '^\\+?[1-9]\\d{1,14}$', flags: 'g' },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('');

  const { matches, highlightedText, error } = useMemo(() => {
    if (!pattern) return { matches: [], highlightedText: testString, error: null };

    try {
      const regex = new RegExp(pattern, flags);
      const matchesArr = [];
      let match;
      
      let highlighted = testString;
      
      if (flags.includes('g')) {
        const replaceSegments = [];
        let lastIndex = 0;

        while ((match = regex.exec(testString)) !== null) {
          matchesArr.push(match);
          
          replaceSegments.push(testString.substring(lastIndex, match.index));
          replaceSegments.push(`<span class="bg-yellow-200 dark:bg-yellow-800 text-black dark:text-white rounded px-0.5">${match[0]}</span>`);
          lastIndex = regex.lastIndex;
          
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
        replaceSegments.push(testString.substring(lastIndex));
        highlighted = replaceSegments.join('');
      } else {
        match = regex.exec(testString);
        if (match) {
          matchesArr.push(match);
          highlighted = testString.substring(0, match.index) + 
            `<span class="bg-yellow-200 dark:bg-yellow-800 text-black dark:text-white rounded px-0.5">${match[0]}</span>` + 
            testString.substring(match.index + match[0].length);
        }
      }

      return { matches: matchesArr, highlightedText: highlighted, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Invalid regular expression';
      return { matches: [], highlightedText: testString, error: message };
    }
  }, [pattern, flags, testString]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Regex Tester</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">Processed locally</span>
      </div>

      <div className="flex flex-wrap gap-2 mb-2">
        <span className="text-sm font-semibold dark:text-gray-300 py-1">Common Regexes:</span>
        {COMMON_REGEXES.map(rx => (
          <button 
            key={rx.label}
            onClick={() => { setPattern(rx.pattern); setFlags(rx.flags); }}
            className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white rounded border dark:border-gray-700"
          >
            {rx.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border dark:border-gray-700">
        <div className="flex flex-col md:flex-row gap-4 items-start">
          <div className="flex-1 w-full flex items-center bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-md overflow-hidden">
            <span className="px-3 text-gray-500 font-mono text-lg font-bold">/</span>
            <input 
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              className="flex-1 py-2 focus:outline-none font-mono dark:bg-gray-900 dark:text-white"
              placeholder="pattern"
            />
            <span className="px-3 text-gray-500 font-mono text-lg font-bold">/</span>
            <input 
              type="text"
              value={flags}
              onChange={(e) => setFlags(e.target.value)}
              className="w-16 py-2 focus:outline-none font-mono text-blue-600 dark:text-blue-400 dark:bg-gray-900"
              placeholder="flags"
            />
          </div>
        </div>
        {error && <div className="text-red-500 text-sm font-mono">{error}</div>}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex justify-between">
          <label className="font-semibold dark:text-white">Test String</label>
          <span className="text-sm font-bold text-green-600 dark:text-green-400">{matches.length} matches</span>
        </div>
        
        <div className="relative">
          {/* Overlay div for highlighting */}
          <div 
            className="absolute inset-0 p-4 pointer-events-none whitespace-pre-wrap break-words font-mono text-transparent"
            dangerouslySetInnerHTML={{ __html: highlightedText.replace(/\n/g, '<br/>') }}
          />
          {/* Actual textarea */}
          <textarea
            className="w-full h-64 p-4 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-700 font-mono bg-transparent relative z-10 text-gray-900 dark:text-gray-100 placeholder-gray-400"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Enter text to test against..."
            spellCheck="false"
          />
        </div>
      </div>

      {matches.length > 0 && (
        <div className="flex flex-col gap-2 mt-4">
          <label className="font-semibold dark:text-white">Match Details</label>
          <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4 overflow-auto max-h-64">
            {matches.map((m, i) => (
              <div key={i} className="mb-4 pb-4 border-b dark:border-gray-700 last:border-0 last:mb-0 last:pb-0">
                <div className="font-semibold text-blue-600 dark:text-blue-400 mb-1">Match {i + 1}</div>
                <div className="font-mono text-sm dark:text-gray-300 break-all">{m[0]}</div>
                {m.length > 1 && (
                  <div className="mt-2 pl-4 border-l-2 border-gray-300 dark:border-gray-600">
                    <div className="text-xs text-gray-500 font-semibold mb-1">Groups</div>
                    {Array.from(m).slice(1).map((g, gi) => (
                      <div key={gi} className="font-mono text-sm dark:text-gray-400">
                        <span className="text-gray-400 dark:text-gray-500">[{gi + 1}]</span> {g || 'undefined'}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
