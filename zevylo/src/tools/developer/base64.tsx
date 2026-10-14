'use client';

import React, { useState, useMemo } from 'react';
import { copyToClipboard } from '@/lib/utils';

export default function Base64Tool() {
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [input, setInput] = useState('');
  const [urlSafe, setUrlSafe] = useState(false);

  const { output, error } = useMemo(() => {
    if (!input) return { output: '', error: null };

    try {
      if (mode === 'encode') {
        const encoder = new TextEncoder();
        const bytes = encoder.encode(input);
        // Build the binary string in chunks — spreading a large byte array into
        // String.fromCharCode(...) overflows the call stack on big inputs.
        let binary = '';
        const CHUNK = 0x8000;
        for (let i = 0; i < bytes.length; i += CHUNK) {
          binary += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
        }
        let base64 = btoa(binary);
        if (urlSafe) {
          base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
        }
        return { output: base64, error: null };
      } else {
        let base64 = input;
        if (urlSafe) {
          base64 = base64.replace(/-/g, '+').replace(/_/g, '/');
          while (base64.length % 4) base64 += '=';
        }
        const str = atob(base64);
        const bytes = new Uint8Array(str.length);
        for (let i = 0; i < str.length; i++) {
          bytes[i] = str.charCodeAt(i);
        }
        const decoder = new TextDecoder('utf-8');
        return { output: decoder.decode(bytes), error: null };
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Invalid input';
      return { output: '', error: msg };
    }
  }, [input, mode, urlSafe]);

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold dark:text-white">Base64 Encoder/Decoder</h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">Processed locally in your browser</span>
      </div>

      <div className="flex gap-4 border-b dark:border-gray-700 pb-2">
        <button
          onClick={() => setMode('encode')}
          className={`font-semibold ${mode === 'encode' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400'} pb-2`}
        >
          Encode
        </button>
        <button
          onClick={() => setMode('decode')}
          className={`font-semibold ${mode === 'decode' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 dark:text-gray-400'} pb-2`}
        >
          Decode
        </button>
      </div>

      <div className="flex items-center gap-2">
        <input 
          type="checkbox" 
          id="urlsafe" 
          checked={urlSafe} 
          onChange={(e) => setUrlSafe(e.target.checked)} 
        />
        <label htmlFor="urlsafe" className="dark:text-white">URL Safe Base64</label>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label className="font-semibold dark:text-white">Input</label>
            <span className="text-sm text-gray-500">{input.length} chars</span>
          </div>
          <textarea
            className="w-full h-40 p-4 border rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:text-white dark:border-gray-700"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'encode' ? 'Text to encode...' : 'Base64 string to decode...'}
          />
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <label className="font-semibold dark:text-white">Output</label>
            <span className="text-sm text-gray-500">{output.length} chars</span>
          </div>
          <textarea
            readOnly
            className={`w-full h-40 p-4 border rounded-lg resize-y focus:outline-none dark:bg-gray-900 dark:text-white dark:border-gray-700 ${error ? 'border-red-500 text-red-500' : 'bg-gray-50'}`}
            value={error ? `Error: ${error}` : output}
          />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <button
          onClick={() => setInput('')}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors"
        >
          Clear
        </button>
        <button
          onClick={() => copyToClipboard(output)}
          disabled={!!error || !output}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-md transition-colors"
        >
          Copy Result
        </button>
      </div>
    </div>
  );
}
