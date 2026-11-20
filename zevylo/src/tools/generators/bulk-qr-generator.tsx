'use client';

import React, { useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, Download, Sparkles, ShieldCheck, Copy, Trash2 } from 'lucide-react';

interface GeneratedQr {
  id: string;
  value: string;
  dataUrl: string;
}

const SAMPLE = `https://zevylo.netlify.app
https://zevylo.netlify.app/ai-tools
https://zevylo.netlify.app/tools`;

export default function BulkQrGenerator() {
  const [input, setInput] = useState('');
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(2);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [colorDark, setColorDark] = useState('#000000');
  const [colorLight, setColorLight] = useState('#ffffff');
  const [results, setResults] = useState<GeneratedQr[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const values = input
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0);

  const generate = async () => {
    if (values.length === 0) return;
    setIsGenerating(true);
    setResults([]);

    try {
      const output: GeneratedQr[] = [];
      for (let i = 0; i < values.length; i++) {
        const dataUrl = await QRCode.toDataURL(values[i], {
          width: size,
          margin,
          errorCorrectionLevel: errorCorrection,
          color: { dark: colorDark, light: colorLight },
        });
        output.push({
          id: `${i}-${Date.now()}`,
          value: values[i],
          dataUrl,
        });
      }
      setResults(output);
    } catch {
      // Ignore lines that cannot be encoded
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadAll = () => {
    results.forEach((r, idx) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = r.dataUrl;
        a.download = `qr-${idx + 1}.png`;
        a.click();
      }, idx * 150);
    });
  };

  const copyList = async () => {
    const list = results.map((r, idx) => `${idx + 1}. ${r.value}`).join('\n');
    try {
      await navigator.clipboard.writeText(list);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard may be blocked by the browser
    }
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-violet-500/10 text-violet-400">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Bulk QR Code Generator</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Paste one URL or text per line — a QR code is generated for every line.
            </p>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={8}
          placeholder={'https://example.com\nHello world\n+1234567890'}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
        />

        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-gray-500 dark:text-gray-400 font-semibold">
            {values.length} valid {values.length === 1 ? 'line' : 'lines'} detected
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setInput(SAMPLE)}
              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-600 dark:text-gray-300 font-semibold"
            >
              Load Sample
            </button>
            <button
              type="button"
              onClick={() => {
                setInput('');
                setResults([]);
              }}
              className="px-3 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-600 dark:text-gray-300 font-semibold flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 items-end">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
            Size (px)
          </label>
          <input
            type="number"
            min={128}
            max={1024}
            step={32}
            value={size}
            onChange={(e) => setSize(Math.min(1024, Math.max(128, parseInt(e.target.value) || 256)))}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
            Error Correction
          </label>
          <select
            value={errorCorrection}
            onChange={(e) => setErrorCorrection(e.target.value as 'L' | 'M' | 'Q' | 'H')}
            className="w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="L">L — Low (7%)</option>
            <option value="M">M — Medium (15%)</option>
            <option value="Q">Q — Quartile (25%)</option>
            <option value="H">H — High (30%)</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
            Dark Colour
          </label>
          <input
            type="color"
            value={colorDark}
            onChange={(e) => setColorDark(e.target.value)}
            className="w-full h-9 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 cursor-pointer"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block">
            Light Colour
          </label>
          <input
            type="color"
            value={colorLight}
            onChange={(e) => setColorLight(e.target.value)}
            className="w-full h-9 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-950 cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Generated locally in your browser · No links stored
        </div>

        <div className="flex items-center gap-2">
          {results.length > 0 && (
            <>
              <button
                type="button"
                onClick={copyList}
                className="px-4 py-3 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-700 dark:text-gray-200 font-bold text-sm flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied' : 'Copy List'}
              </button>
              <button
                type="button"
                onClick={downloadAll}
                className="px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm flex items-center gap-2 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download All ({results.length})
              </button>
            </>
          )}
          <button
            type="button"
            onClick={generate}
            disabled={isGenerating || values.length === 0}
            className="px-6 py-3 rounded-xl bg-violet-500 hover:bg-violet-400 disabled:opacity-50 text-black font-bold text-sm flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? 'Generating...' : `Generate ${values.length || ''} QR Codes`}
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((r, idx) => (
            <div
              key={r.id}
              className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 flex flex-col items-center gap-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={r.dataUrl} alt={`QR code ${idx + 1}: ${r.value}`} className="w-full max-w-[160px] h-auto rounded-lg" />
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate w-full text-center">{r.value}</p>
              <a
                href={r.dataUrl}
                download={`qr-${idx + 1}.png`}
                className="w-full py-1.5 rounded-lg bg-violet-500 hover:bg-violet-400 text-black font-bold text-xs flex items-center justify-center gap-1 transition-colors"
              >
                <Download className="w-3.5 h-3.5" /> PNG
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
