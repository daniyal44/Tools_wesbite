'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Terminal, Copy, Check, Upload, Download } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

// ASCII font dictionaries for simple clean banner generation
const BANNER_CHARS: Record<string, string[]> = {
  Z: ['███████', '     ██', '   ███ ', ' ██    ', '███████'],
  E: ['███████', '██     ', '██████ ', '██     ', '███████'],
  V: ['██    ██', '██    ██', '██    ██', ' ██  ██ ', '   ██   '],
  Y: ['██    ██', ' ██  ██ ', '   ██   ', '   ██   ', '   ██   '],
  L: ['██     ', '██     ', '██     ', '██     ', '███████'],
  O: [' █████ ', '██   ██', '██   ██', '██   ██', ' █████ '],
  A: [' █████ ', '██   ██', '███████', '██   ██', '██   ██'],
  B: ['██████ ', '██   ██', '██████ ', '██   ██', '██████ '],
  C: [' █████ ', '██     ', '██     ', '██     ', ' █████ '],
  D: ['██████ ', '██   ██', '██   ██', '██   ██', '██████ '],
  T: ['███████', '  ███  ', '  ███  ', '  ███  ', '  ███  '],
  S: [' █████ ', '██     ', ' █████ ', '     ██', '██████ '],
};

const DENSITY_PALETTE = '@%#*+=-:. ';

export default function AsciiArtGenerator() {
  const [mode, setMode] = useState<'text' | 'image'>('text');
  const [textInput, setTextInput] = useState('ZEVYLO');
  const [charWidth, setCharWidth] = useState(60);
  const [invert, setInvert] = useState(false);
  const [imageAscii, setImageAscii] = useState('');
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Text Banner Generator
  const textBanner = useMemo(() => {
    const clean = textInput.toUpperCase().replace(/[^A-Z]/g, '');
    if (!clean) return '';

    const lines = ['', '', '', '', ''];
    for (const char of clean) {
      const art = BANNER_CHARS[char] || [
        ' ███ ',
        '█   █',
        '█   █',
        '█   █',
        ' ███ ',
      ];
      for (let i = 0; i < 5; i++) {
        lines[i] += `${art[i]}  `;
      }
    }
    return lines.join('\n');
  }, [textInput]);

  // Image to ASCII processor
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const aspect = img.naturalHeight / img.naturalWidth;
        const width = charWidth;
        const height = Math.round(width * aspect * 0.55); // Adjust for font height aspect
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.drawImage(img, 0, 0, width, height);
        const imgData = ctx.getImageData(0, 0, width, height).data;

        let result = '';
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const offset = (y * width + x) * 4;
            const r = imgData[offset];
            const g = imgData[offset + 1];
            const b = imgData[offset + 2];
            const a = imgData[offset + 3];

            if (a < 50) {
              result += ' ';
              continue;
            }

            // Luminance
            let lum = 0.299 * r + 0.587 * g + 0.114 * b;
            if (invert) lum = 255 - lum;

            const charIndex = Math.floor((lum / 255) * (DENSITY_PALETTE.length - 1));
            result += DENSITY_PALETTE[charIndex];
          }
          result += '\n';
        }

        setImageAscii(result);
      };
    };
    reader.readAsDataURL(file);
  };

  const finalOutput = mode === 'text' ? textBanner : imageAscii;

  const handleCopy = async () => {
    if (!finalOutput) return;
    await copyToClipboard(finalOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!finalOutput) return;
    const blob = new Blob([finalOutput], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ascii-art.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
          <button
            onClick={() => setMode('text')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'text'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Text Banner
          </button>
          <button
            onClick={() => setMode('image')}
            className={`px-5 py-2 rounded-lg text-xs font-bold transition-all ${
              mode === 'image'
                ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            Image to ASCII Art
          </button>
        </div>

        {mode === 'image' && (
          <div className="flex items-center gap-4 text-xs font-bold">
            <div className="flex items-center gap-2">
              <span>Width: {charWidth}</span>
              <input
                type="range"
                min="30"
                max="100"
                value={charWidth}
                onChange={(e) => setCharWidth(parseInt(e.target.value, 10))}
                className="w-24 accent-blue-600"
              />
            </div>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={invert}
                onChange={(e) => setInvert(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600"
              />
              Invert
            </label>
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 space-y-3">
        {mode === 'text' ? (
          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
              Banner Text Headline
            </label>
            <input
              type="text"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              className="w-full h-11 px-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-mono text-sm uppercase font-bold"
              placeholder="ZEVYLO"
            />
          </div>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer border-2 border-dashed border-gray-300 dark:border-gray-800 rounded-xl p-8 text-center hover:border-blue-500 transition-all"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) processImageFile(e.target.files[0]);
              }}
            />
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-6 h-6 text-blue-600" />
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                Click or Drop Image to Convert to ASCII
              </span>
              <span className="text-[11px] text-gray-400">High contrast logos & avatars work best</span>
            </div>
          </div>
        )}
      </div>

      {/* ASCII Output Display */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-950 p-5 space-y-3 text-white">
        <div className="flex justify-between items-center text-xs font-bold text-gray-400">
          <span className="flex items-center gap-1.5 text-green-400">
            <Terminal className="w-4 h-4" />
            Monospace ASCII Output
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleDownload}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border border-gray-800 hover:bg-gray-900 text-gray-300"
            >
              <Download className="w-3.5 h-3.5" />
              Download .txt
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Art'}
            </button>
          </div>
        </div>

        <pre className="font-mono text-[10px] leading-[10px] text-green-400 overflow-x-auto p-4 bg-black/60 rounded-xl max-h-96 select-all whitespace-pre">
          {finalOutput || 'No ASCII output generated yet.'}
        </pre>
      </div>
    </div>
  );
}
