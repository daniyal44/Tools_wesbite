'use client';

import React, { useState, useMemo } from 'react';
import { Binary, ArrowRightLeft, Copy, Check, RotateCcw } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function BinaryTextConverter() {
  const [mode, setMode] = useState<'textToBinary' | 'binaryToText'>('textToBinary');
  const [input, setInput] = useState('Hello, World!');
  const [useSpaces, setUseSpaces] = useState(true);
  const [copied, setCopied] = useState(false);

  const { output, error } = useMemo(() => {
    if (!input) return { output: '', error: null };

    if (mode === 'textToBinary') {
      const binArray = [];
      for (let i = 0; i < input.length; i++) {
        const bin = input.charCodeAt(i).toString(2).padStart(8, '0');
        binArray.push(bin);
      }
      return { output: binArray.join(useSpaces ? ' ' : ''), error: null };
    } else {
      // Binary to Text
      const clean = input.replace(/\s+/g, '');
      if (/[^01]/.test(clean)) {
        return { output: '', error: 'Binary string contains non-binary characters (only 0 and 1 allowed).' };
      }
      if (clean.length % 8 !== 0) {
        return { output: '', error: `Incomplete byte! Length is ${clean.length} (must be a multiple of 8 bits).` };
      }

      let textResult = '';
      for (let i = 0; i < clean.length; i += 8) {
        const byte = clean.slice(i, i + 8);
        const charCode = parseInt(byte, 2);
        textResult += String.fromCharCode(charCode);
      }
      return { output: textResult, error: null };
    }
  }, [input, mode, useSpaces]);

  const switchDirection = () => {
    if (output && !error) {
      setInput(output);
    }
    setMode((prev) => (prev === 'textToBinary' ? 'binaryToText' : 'textToBinary'));
  };

  const handleCopy = async () => {
    if (!output) return;
    await copyToClipboard(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Direction & Settings */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setMode('textToBinary')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'textToBinary'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Text → Binary
          </button>
          <button
            onClick={() => setMode('binaryToText')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'binaryToText'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Binary → Text
          </button>
        </div>

        <div className="flex items-center gap-4">
          {mode === 'textToBinary' && (
            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={useSpaces}
                onChange={(e) => setUseSpaces(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600"
              />
              Space delimiter
            </label>
          )}

          <button
            onClick={switchDirection}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-700 dark:text-gray-300"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Invert
          </button>
        </div>
      </div>

      {/* Editor Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Input */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>{mode === 'textToBinary' ? 'ASCII / Unicode Text' : 'Binary Bits (0s & 1s)'}</span>
            <button
              onClick={() => setInput('')}
              className="flex items-center gap-1 hover:text-gray-700 text-gray-400"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={10}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs leading-relaxed"
            placeholder={mode === 'textToBinary' ? 'Type text to translate...' : '01001000 01101001'}
          />
          {error && (
            <div className="p-3 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/40 text-xs text-red-600 font-medium">
              {error}
            </div>
          )}
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span className="flex items-center gap-1 text-blue-600">
              <Binary className="w-4 h-4" />
              {mode === 'textToBinary' ? 'Binary Output' : 'Plain Text Result'}
            </span>
            {output && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-600 dark:text-gray-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <textarea
            readOnly
            value={output}
            rows={10}
            className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-xs text-blue-600 dark:text-blue-400 leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
