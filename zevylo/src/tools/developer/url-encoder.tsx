'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, ArrowRightLeft, Link2, ListFilter } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function UrlEncoderTool() {
  const [input, setInput] = useState('https://zevylo.netlify.app/search?query=developer tools&category=web&tags=fast,free,private');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [scope, setScope] = useState<'component' | 'full'>('component');
  const [copied, setCopied] = useState(false);

  // Conversion result
  const output = useMemo(() => {
    if (!input) return '';
    try {
      if (mode === 'encode') {
        return scope === 'component' ? encodeURIComponent(input) : encodeURI(input);
      } else {
        return scope === 'component' ? decodeURIComponent(input) : decodeURI(input);
      }
    } catch {
      return 'Error: Malformed URI sequence';
    }
  }, [input, mode, scope]);

  // URL Query Parameters Parser
  const parsedUrl = useMemo(() => {
    if (!input.trim()) return null;
    try {
      // If it doesn't have protocol, add dummy for URL constructor
      const urlToParse = input.includes('://') ? input : `https://dummy.local/${input.startsWith('/') ? input.slice(1) : input}`;
      const parsed = new URL(urlToParse);
      const params: Array<{ key: string; value: string }> = [];
      parsed.searchParams.forEach((value, key) => {
        params.push({ key, value });
      });

      return {
        protocol: parsed.protocol.replace(':', ''),
        host: parsed.host,
        pathname: parsed.pathname,
        params,
        hash: parsed.hash,
      };
    } catch {
      return null;
    }
  }, [input]);

  const handleCopy = async () => {
    if (!output) return;
    await copyToClipboard(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setInput(output);
    setMode(mode === 'encode' ? 'decode' : 'encode');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Configuration Toolbar */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Link2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 dark:text-gray-100">URL Encoder / Decoder & Query Parser</h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">RFC 3986 compliant encoding with query parameter inspection</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSwap}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
            >
              <ArrowRightLeft className="w-3.5 h-3.5" />
              <span>Swap</span>
            </button>
            <button
              onClick={handleCopy}
              disabled={!output}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 shadow-sm transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-300" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied Output!' : 'Copy Result'}</span>
            </button>
          </div>
        </div>

        {/* Action Radio Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 mr-2">Mode:</span>
            <button
              onClick={() => setMode('encode')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'encode'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Encode (to %20 format)
            </button>
            <button
              onClick={() => setMode('decode')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                mode === 'decode'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              Decode (from %20 format)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 mr-2">Scope:</span>
            <button
              onClick={() => setScope('component')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                scope === 'component'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              encodeURIComponent (Encodes ?, =, &)
            </button>
            <button
              onClick={() => setScope('full')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                scope === 'full'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
            >
              encodeURI (Preserves URL structure)
            </button>
          </div>
        </div>
      </div>

      {/* Inputs & Outputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Input String or URL</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={6}
            className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 p-4 font-mono text-sm leading-relaxed outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            placeholder="Enter text or URL..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Converted Output</label>
          <div className="w-full min-h-[148px] rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-4 font-mono text-sm text-gray-900 dark:text-gray-100 break-all select-all">
            {output || <span className="text-gray-400">Awaiting input...</span>}
          </div>
        </div>
      </div>

      {/* URL Parameter Breakdown Table */}
      {parsedUrl && parsedUrl.params.length > 0 && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <ListFilter className="w-4 h-4 text-blue-600" />
              <span>Parsed Query Parameters ({parsedUrl.params.length})</span>
            </h3>
            <button
              onClick={() => copyToClipboard(JSON.stringify(Object.fromEntries(parsedUrl.params.map(p => [p.key, p.value])), null, 2))}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Copy as JSON
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
            <table className="w-full text-left text-sm font-mono">
              <thead className="bg-gray-50 dark:bg-gray-800/60 border-b border-gray-200 dark:border-gray-800 text-xs text-gray-500 font-sans">
                <tr>
                  <th className="px-4 py-2.5 font-bold">Parameter Key</th>
                  <th className="px-4 py-2.5 font-bold">Decoded Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {parsedUrl.params.map((p, idx) => (
                  <tr key={idx} className="hover:bg-blue-50/30 dark:hover:bg-blue-950/20">
                    <td className="px-4 py-2.5 font-bold text-blue-600 dark:text-blue-400 select-all">{p.key}</td>
                    <td className="px-4 py-2.5 text-gray-800 dark:text-gray-200 select-all">{p.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
