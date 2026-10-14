'use client';

import React, { useState, useMemo } from 'react';

// Simple diff logic for demonstration without using external library
function computeDiff(original: string, modified: string, mode: 'line' | 'char') {
  const origArr = mode === 'line' ? original.split('\n') : original.split('');
  const modArr = mode === 'line' ? modified.split('\n') : modified.split('');
  
  let added = 0;
  let removed = 0;
  const changed = 0;
  
  const diffs = [];
  let i = 0, j = 0;
  
  // Very naive diffing for simple illustration (real world should use diff-match-patch or jsdiff)
  // We'll just do a basic line-by-line or char-by-char matching
  while (i < origArr.length || j < modArr.length) {
    if (i < origArr.length && j < modArr.length && origArr[i] === modArr[j]) {
      diffs.push({ type: 'unchanged', value: origArr[i] });
      i++; j++;
    } else {
      // Find next match to sync up
      let syncI = -1;
      let syncJ = -1;
      let found = false;
      for (let lookI = i; lookI < Math.min(i + 10, origArr.length) && !found; lookI++) {
        for (let lookJ = j; lookJ < Math.min(j + 10, modArr.length) && !found; lookJ++) {
          if (origArr[lookI] === modArr[lookJ]) {
            syncI = lookI;
            syncJ = lookJ;
            found = true;
          }
        }
      }
      
      if (found) {
        for (let x = i; x < syncI; x++) {
          diffs.push({ type: 'removed', value: origArr[x] });
          removed++;
        }
        for (let x = j; x < syncJ; x++) {
          diffs.push({ type: 'added', value: modArr[x] });
          added++;
        }
        i = syncI;
        j = syncJ;
      } else {
        // No match nearby, just output changes
        if (i < origArr.length) {
          diffs.push({ type: 'removed', value: origArr[i] });
          removed++;
          i++;
        }
        if (j < modArr.length) {
          diffs.push({ type: 'added', value: modArr[j] });
          added++;
          j++;
        }
      }
    }
  }
  
  return { diffs, added, removed, changed };
}

export default function TextDiff() {
  const [original, setOriginal] = useState('');
  const [modified, setModified] = useState('');
  const [viewMode, setViewMode] = useState<'split' | 'inline'>('split');
  const [diffMode, setDiffMode] = useState<'line' | 'char'>('line');

  const { diffs, added, removed } = useMemo(() => {
    return computeDiff(original, modified, diffMode);
  }, [original, modified, diffMode]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Text Diff Checker</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">Processed locally in your browser</span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 flex flex-col gap-2">
          <label className="font-semibold dark:text-white">Original Text</label>
          <textarea
            className="w-full h-48 p-4 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            value={original}
            onChange={(e) => setOriginal(e.target.value)}
          />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <label className="font-semibold dark:text-white">Modified Text</label>
          <textarea
            className="w-full h-48 p-4 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            value={modified}
            onChange={(e) => setModified(e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center mb-4">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded p-1">
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 rounded ${viewMode === 'split' ? 'bg-white dark:bg-gray-700 shadow' : ''} dark:text-white`}
          >
            Split View
          </button>
          <button
            onClick={() => setViewMode('inline')}
            className={`px-3 py-1 rounded ${viewMode === 'inline' ? 'bg-white dark:bg-gray-700 shadow' : ''} dark:text-white`}
          >
            Inline View
          </button>
        </div>
        
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded p-1">
          <button
            onClick={() => setDiffMode('line')}
            className={`px-3 py-1 rounded ${diffMode === 'line' ? 'bg-white dark:bg-gray-700 shadow' : ''} dark:text-white`}
          >
            Line Level
          </button>
          <button
            onClick={() => setDiffMode('char')}
            className={`px-3 py-1 rounded ${diffMode === 'char' ? 'bg-white dark:bg-gray-700 shadow' : ''} dark:text-white`}
          >
            Character Level
          </button>
        </div>

        <div className="ml-auto flex gap-4 text-sm font-medium">
          <span className="text-green-600 dark:text-green-400">+{added} Additions</span>
          <span className="text-red-600 dark:text-red-400">-{removed} Deletions</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg p-4 font-mono text-sm overflow-auto max-h-[500px]">
        {viewMode === 'inline' ? (
          <div>
            {diffs.map((d, i) => (
              <span
                key={i}
                className={
                  d.type === 'added' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' :
                  d.type === 'removed' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 line-through' :
                  'text-gray-800 dark:text-gray-300'
                }
              >
                {d.value}{diffMode === 'line' && '\n'}
              </span>
            ))}
          </div>
        ) : (
          <div className="flex w-full">
            <div className="w-1/2 border-r dark:border-gray-700 pr-2">
              {diffs.map((d, i) => (
                (d.type === 'unchanged' || d.type === 'removed') && (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap ${d.type === 'removed' ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'text-gray-800 dark:text-gray-300'}`}
                  >
                    {d.value}
                  </div>
                )
              ))}
            </div>
            <div className="w-1/2 pl-2">
              {diffs.map((d, i) => (
                (d.type === 'unchanged' || d.type === 'added') && (
                  <div
                    key={i}
                    className={`whitespace-pre-wrap ${d.type === 'added' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300' : 'text-gray-800 dark:text-gray-300'}`}
                  >
                    {d.value}
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
