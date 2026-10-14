'use client';

import React, { useState, useEffect } from 'react';
import { copyToClipboard } from '@/lib/utils';
import { md5 } from '@/lib/crypto/md5';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState<Record<string, string>>({
    'MD5': '',
    'SHA-1': '',
    'SHA-256': '',
    'SHA-384': '',
    'SHA-512': '',
  });

  useEffect(() => {
    let isCurrent = true;

    if (!input) {
      const timer = setTimeout(() => {
        if (isCurrent) {
          setHashes({
            'MD5': '',
            'SHA-1': '',
            'SHA-256': '',
            'SHA-384': '',
            'SHA-512': '',
          });
        }
      }, 0);
      return () => {
        isCurrent = false;
        clearTimeout(timer);
      };
    }

    const computeHashes = async () => {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      
      const algos = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
      const results: Record<string, string> = {};
      
      // Compute real MD5
      results['MD5'] = md5(input);

      for (const algo of algos) {
        try {
          const hashBuffer = await crypto.subtle.digest(algo, data);
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
          results[algo] = hashHex;
        } catch {
          results[algo] = 'Error computing hash';
        }
      }
      
      if (isCurrent) {
        setHashes(results);
      }
    };

    computeHashes();
    return () => {
      isCurrent = false;
    };
  }, [input]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Hash Generator</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">Processed locally in your browser</span>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-semibold dark:text-white">Input String</label>
        <textarea
          className="w-full h-32 p-4 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter text to hash..."
        />
      </div>

      <div className="flex flex-col gap-4">
        {Object.entries(hashes).map(([algo, hash]) => (
          <div key={algo} className="flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <label className="font-semibold text-blue-600 dark:text-blue-400">{algo}</label>
              {hash && (
                <button 
                  onClick={() => copyToClipboard(hash)}
                  className="text-xs px-3 py-1 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white rounded transition-colors"
                >
                  Copy
                </button>
              )}
            </div>
            <div className="p-3 bg-gray-50 dark:bg-gray-800 border dark:border-gray-700 rounded-lg font-mono text-sm break-all dark:text-gray-300 min-h-[3rem] flex items-center">
              {hash || <span className="text-gray-400">Awaiting input...</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
