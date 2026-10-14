'use client';

import React, { useState, useMemo } from 'react';
import { Shield, Copy, Check, RotateCcw } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function Rot13Encoder() {
  const [text, setText] = useState('Why did the chicken cross the road? Gb trg gb gur bgure fvqr!');
  const [shift, setShift] = useState(13);
  const [copied, setCopied] = useState(false);

  const transformed = useMemo(() => {
    return text.replace(/[a-zA-Z]/g, (char) => {
      const code = char.charCodeAt(0);
      const isUpper = code >= 65 && code <= 90;
      const base = isUpper ? 65 : 97;
      return String.fromCharCode(((code - base + shift) % 26) + base);
    });
  }, [text, shift]);

  const handleCopy = async () => {
    await copyToClipboard(transformed);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Shift Slider Bar */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
        <div className="flex justify-between items-center text-xs font-bold text-gray-700 dark:text-gray-300">
          <span className="flex items-center gap-1.5">
            <Shield className="w-4 h-4 text-purple-600" />
            Letter Rotation Offset
          </span>
          <span className="font-mono text-purple-600 font-extrabold text-sm">
            {shift === 13 ? 'ROT13 (Shift 13)' : `Caesar Shift (+${shift})`}
          </span>
        </div>
        <input
          type="range"
          min="1"
          max="25"
          value={shift}
          onChange={(e) => setShift(parseInt(e.target.value, 10))}
          className="w-full accent-purple-600"
        />
        <div className="flex justify-between text-[11px] font-mono text-gray-400">
          <span>Shift 1 (Caesar)</span>
          <button
            onClick={() => setShift(13)}
            className="text-purple-600 font-bold hover:underline"
          >
            Reset to Standard ROT13
          </button>
          <span>Shift 25</span>
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>Input Text</span>
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
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs leading-relaxed"
            placeholder="Type text to shift or decode..."
          />
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>Transformed Output</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-600 dark:text-gray-300"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={transformed}
            rows={10}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs text-purple-600 dark:text-purple-400 leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
