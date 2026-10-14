'use client';

import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  RefreshCw,
  Lock,
  Unlock,
  Download,
  Code2,
  Sliders,
  Palette,
  Eye,
} from 'lucide-react';

interface Swatch {
  id: string;
  hex: string;
  locked: boolean;
}

type HarmonyType = 'complementary' | 'analogous' | 'triadic' | 'tetradic' | 'monochromatic' | 'split';

// Color conversion helpers
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  const r = (num >> 16) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hexToRgb(hex: string): string {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  return `rgb(${num >> 16}, ${(num >> 8) & 255}, ${num & 255})`;
}

function getLuminance(hex: string): number {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const num = parseInt(c, 16);
  const r = (num >> 16) / 255;
  const g = ((num >> 8) & 255) / 255;
  const b = (num & 255) / 255;
  const srgb = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [harmony, setHarmony] = useState<HarmonyType>('analogous');
  const [swatches, setSwatches] = useState<Swatch[]>([
    { id: '1', hex: '#1E3A8A', locked: false },
    { id: '2', hex: '#2563EB', locked: false },
    { id: '3', hex: '#3B82F6', locked: false },
    { id: '4', hex: '#60A5FA', locked: false },
    { id: '5', hex: '#93C5FD', locked: false },
  ]);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [copiedCodeType, setCopiedCodeType] = useState<string | null>(null);

  const generatePalette = (forcedBase?: string, forcedHarmony?: HarmonyType) => {
    const curBase = forcedBase || baseColor;
    const curHarmony = forcedHarmony || harmony;
    const hsl = hexToHsl(curBase);

    let hues: number[] = [];
    let sats: number[] = [hsl.s, hsl.s, hsl.s, hsl.s, hsl.s];
    let lights: number[] = [
      Math.max(15, hsl.l - 30),
      Math.max(25, hsl.l - 15),
      hsl.l,
      Math.min(85, hsl.l + 15),
      Math.min(95, hsl.l + 30),
    ];

    switch (curHarmony) {
      case 'complementary':
        hues = [hsl.h, hsl.h, hsl.h, (hsl.h + 180) % 360, (hsl.h + 180) % 360];
        lights = [hsl.l - 20, hsl.l, hsl.l + 20, hsl.l - 10, hsl.l + 20];
        break;
      case 'analogous':
        hues = [
          (hsl.h + 300) % 360,
          (hsl.h + 330) % 360,
          hsl.h,
          (hsl.h + 30) % 360,
          (hsl.h + 60) % 360,
        ];
        break;
      case 'triadic':
        hues = [
          hsl.h,
          hsl.h,
          (hsl.h + 120) % 360,
          (hsl.h + 240) % 360,
          (hsl.h + 240) % 360,
        ];
        lights = [hsl.l - 20, hsl.l, hsl.l, hsl.l, hsl.l + 25];
        break;
      case 'tetradic':
        hues = [
          hsl.h,
          (hsl.h + 90) % 360,
          (hsl.h + 180) % 360,
          (hsl.h + 270) % 360,
          hsl.h,
        ];
        lights = [hsl.l, hsl.l, hsl.l, hsl.l, hsl.l + 25];
        break;
      case 'monochromatic':
        hues = [hsl.h, hsl.h, hsl.h, hsl.h, hsl.h];
        lights = [20, 38, 55, 72, 90];
        sats = [hsl.s, Math.max(20, hsl.s - 10), hsl.s, Math.max(15, hsl.s - 20), Math.max(10, hsl.s - 30)];
        break;
      case 'split':
        hues = [
          hsl.h,
          hsl.h,
          (hsl.h + 150) % 360,
          (hsl.h + 210) % 360,
          (hsl.h + 210) % 360,
        ];
        lights = [hsl.l - 20, hsl.l, hsl.l, hsl.l, hsl.l + 25];
        break;
    }

    setSwatches((prev) =>
      prev.map((sw, idx) => {
        if (sw.locked) return sw;
        const newHex = hslToHex(hues[idx] || hsl.h, sats[idx] || hsl.s, lights[idx] || hsl.l);
        return { ...sw, hex: newHex };
      })
    );
  };

  const randomizeAll = () => {
    const randomHex = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`.toUpperCase();
    setBaseColor(randomHex);
    generatePalette(randomHex);
  };

  const toggleLock = (id: string) => {
    setSwatches((prev) =>
      prev.map((s) => (s.id === id ? { ...s, locked: !s.locked } : s))
    );
  };

  const copyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  const copyExport = (type: 'css' | 'tailwind' | 'json') => {
    let output = '';
    if (type === 'css') {
      output = `:root {\n`;
      swatches.forEach((s, idx) => {
        output += `  --color-${idx + 1}: ${s.hex};\n`;
      });
      output += `}`;
    } else if (type === 'tailwind') {
      output = `colors: {\n  palette: {\n`;
      swatches.forEach((s, idx) => {
        output += `    ${(idx + 1) * 100}: '${s.hex}',\n`;
      });
      output += `  }\n}`;
    } else {
      output = JSON.stringify(
        swatches.map((s, idx) => ({ name: `Color ${idx + 1}`, hex: s.hex, rgb: hexToRgb(s.hex) })),
        null,
        2
      );
    }

    navigator.clipboard.writeText(output);
    setCopiedCodeType(type);
    setTimeout(() => setCopiedCodeType(null), 2000);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Controls Bar */}
      <div className="p-6 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={baseColor}
              onChange={(e) => {
                setBaseColor(e.target.value.toUpperCase());
                generatePalette(e.target.value.toUpperCase());
              }}
              className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent p-0"
              title="Pick base color"
            />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block">
                Base Seed Color:
              </span>
              <span className="font-mono text-sm font-black text-gray-900 dark:text-gray-100">
                {baseColor}
              </span>
            </div>
          </div>

          {/* Harmony Mode Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {(
              [
                ['analogous', 'Analogous'],
                ['complementary', 'Complementary'],
                ['triadic', 'Triadic'],
                ['monochromatic', 'Monochrome'],
                ['split', 'Split Comp'],
                ['tetradic', 'Tetradic'],
              ] as const
            ).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => {
                  setHarmony(mode);
                  generatePalette(undefined, mode);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                  harmony === mode
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <button
            type="button"
            onClick={randomizeAll}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold hover:opacity-95 transition-opacity shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Randomize Palette</span>
          </button>
        </div>
      </div>

      {/* Main 5-Swatch Palette Stage */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-lg grid grid-cols-1 sm:grid-cols-5 min-h-[360px]">
        {swatches.map((swatch, idx) => {
          const isDark = getLuminance(swatch.hex) < 0.45;
          const textClass = isDark ? 'text-white' : 'text-gray-900';
          const subTextClass = isDark ? 'text-white/70' : 'text-gray-900/70';

          return (
            <div
              key={swatch.id}
              className="relative p-6 flex flex-col justify-between transition-colors group"
              style={{ backgroundColor: swatch.hex }}
            >
              {/* Top Controls: Lock Button */}
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-wider ${subTextClass}`}>
                  0{idx + 1}
                </span>

                <button
                  type="button"
                  onClick={() => toggleLock(swatch.id)}
                  className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                    swatch.locked
                      ? 'bg-white/30 text-white shadow-xs'
                      : 'bg-black/10 text-white/70 opacity-0 group-hover:opacity-100 hover:bg-white/20'
                  }`}
                  title={swatch.locked ? 'Unlock Color' : 'Lock Color'}
                >
                  {swatch.locked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                </button>
              </div>

              {/* Bottom Info: Hex & Copy */}
              <div className="space-y-2 pt-16">
                <button
                  type="button"
                  onClick={() => copyHex(swatch.hex)}
                  className={`w-full text-left font-mono font-black text-lg sm:text-xl tracking-tight transition-transform group-hover:scale-105 flex items-center justify-between ${textClass}`}
                >
                  <span>{swatch.hex}</span>
                  {copiedHex === swatch.hex ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 opacity-60" />
                  )}
                </button>

                <p className={`text-[10px] font-mono ${subTextClass}`}>
                  {hexToRgb(swatch.hex)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Code Export Cards */}
      <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-blue-500" />
            <h3 className="font-bold text-sm text-gray-900 dark:text-gray-100">
              Export Palette Code
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => copyExport('css')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-100 transition-colors"
            >
              {copiedCodeType === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>CSS Variables</span>
            </button>

            <button
              onClick={() => copyExport('tailwind')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-100 transition-colors"
            >
              {copiedCodeType === 'tailwind' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>Tailwind Config</span>
            </button>

            <button
              onClick={() => copyExport('json')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-800 dark:text-gray-200 hover:bg-gray-100 transition-colors"
            >
              {copiedCodeType === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>JSON Tokens</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
