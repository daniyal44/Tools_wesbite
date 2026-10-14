'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Copy, Check, Lock, Unlock, Shuffle, Download, Sparkles } from 'lucide-react';

interface PaletteColor {
  hex: string;
  locked: boolean;
}

type HarmonyType = 'random' | 'analogous' | 'monochromatic' | 'triadic' | 'complementary';

// Helper conversions
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16) || 0;
  const g = parseInt(clean.substring(2, 4), 16) || 0;
  const b = parseInt(clean.substring(4, 6), 16) || 0;
  return { r, g, b };
}

function getLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

const INITIAL_PALETTE: PaletteColor[] = [
  { hex: '#3B82F6', locked: false },
  { hex: '#6366F1', locked: false },
  { hex: '#8B5CF6', locked: false },
  { hex: '#EC4899', locked: false },
  { hex: '#F43F5E', locked: false },
];

export default function ColorGenerator() {
  const [colors, setColors] = useState<PaletteColor[]>(INITIAL_PALETTE);
  const [harmony, setHarmony] = useState<HarmonyType>('random');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const generateHarmoniousColors = useCallback((): string[] => {
    const baseH = Math.floor(Math.random() * 360);
    const baseS = 65 + Math.floor(Math.random() * 25); // 65-90%
    const baseL = 45 + Math.floor(Math.random() * 20); // 45-65%

    switch (harmony) {
      case 'analogous':
        return [
          hslToHex((baseH - 40 + 360) % 360, baseS, baseL),
          hslToHex((baseH - 20 + 360) % 360, baseS, baseL),
          hslToHex(baseH, baseS, baseL),
          hslToHex((baseH + 20) % 360, baseS, baseL),
          hslToHex((baseH + 40) % 360, baseS, baseL),
        ];
      case 'monochromatic':
        return [
          hslToHex(baseH, baseS, 85),
          hslToHex(baseH, baseS, 70),
          hslToHex(baseH, baseS, 52),
          hslToHex(baseH, baseS, 36),
          hslToHex(baseH, baseS, 20),
        ];
      case 'triadic':
        return [
          hslToHex(baseH, baseS, baseL),
          hslToHex((baseH + 120) % 360, baseS, baseL),
          hslToHex((baseH + 240) % 360, baseS, baseL),
          hslToHex((baseH + 60) % 360, baseS - 20, 80),
          hslToHex((baseH + 180) % 360, baseS - 20, 25),
        ];
      case 'complementary':
        return [
          hslToHex(baseH, baseS, 75),
          hslToHex(baseH, baseS, baseL),
          hslToHex((baseH + 180) % 360, baseS, baseL),
          hslToHex((baseH + 180) % 360, baseS, 35),
          hslToHex((baseH + 30) % 360, baseS - 20, 90),
        ];
      case 'random':
      default:
        return [
          hslToHex(Math.floor(Math.random() * 360), 65 + Math.random() * 25, 45 + Math.random() * 25),
          hslToHex(Math.floor(Math.random() * 360), 65 + Math.random() * 25, 45 + Math.random() * 25),
          hslToHex(Math.floor(Math.random() * 360), 65 + Math.random() * 25, 45 + Math.random() * 25),
          hslToHex(Math.floor(Math.random() * 360), 65 + Math.random() * 25, 45 + Math.random() * 25),
          hslToHex(Math.floor(Math.random() * 360), 65 + Math.random() * 25, 45 + Math.random() * 25),
        ];
    }
  }, [harmony]);

  const handleGenerate = useCallback(() => {
    const newHexes = generateHarmoniousColors();
    setColors((prev) =>
      prev.map((c, i) => {
        if (c.locked) return c;
        return { hex: newHexes[i] || c.hex, locked: false };
      })
    );
  }, [generateHarmoniousColors]);

  // Spacebar hotkey listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && (e.target as HTMLElement).tagName !== 'INPUT') {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate]);

  const toggleLock = (index: number) => {
    setColors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
    );
  };

  const handleCopyHex = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const handleCopyCss = () => {
    const css = `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}\n}`;
    navigator.clipboard.writeText(css);
    alert('Copied CSS variables to clipboard!');
  };

  const handleExportJson = () => {
    const data = JSON.stringify(
      {
        palette: colors.map((c) => c.hex),
        harmony,
      },
      null,
      2
    );
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `palette-${harmony}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Control Bar */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 shadow-sm active:scale-95 transition-all"
          >
            <Shuffle className="h-4 w-4" /> Generate (Space)
          </button>

          <div className="flex items-center gap-2">
            <label htmlFor="harmony-rule-select" className="text-xs font-semibold text-gray-500">Harmony:</label>
            <select
              id="harmony-rule-select"
              value={harmony}
              onChange={(e) => setHarmony(e.target.value as HarmonyType)}
              className="rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-900 dark:text-white"
            >
              <option value="random">Dynamic Random</option>
              <option value="analogous">Analogous</option>
              <option value="monochromatic">Monochromatic</option>
              <option value="triadic">Triadic</option>
              <option value="complementary">Complementary</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyCss}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500"
          >
            <Copy className="h-3.5 w-3.5" /> Copy CSS Vars
          </button>
          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500"
          >
            <Download className="h-3.5 w-3.5" /> JSON
          </button>
        </div>
      </div>

      {/* 5-Color Interactive Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-5 h-[420px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
        {colors.map((c, idx) => {
          const isLight = getLuminance(c.hex) > 0.45;
          const isCopied = copiedIndex === idx;

          return (
            <div
              key={idx}
              className="relative flex flex-col justify-between p-6 transition-all duration-300 group"
              style={{ backgroundColor: c.hex }}
            >
              {/* Lock Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => toggleLock(idx)}
                  title={c.locked ? 'Unlock color' : 'Lock color'}
                  className={`p-2 rounded-full backdrop-blur-md transition-all ${
                    isLight
                      ? 'bg-black/10 text-gray-900 hover:bg-black/20'
                      : 'bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white/20'
                  }`}
                >
                  {c.locked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4 opacity-70 group-hover:opacity-100" />}
                </button>
              </div>

              {/* Color Code & Info */}
              <div className="space-y-2">
                <button
                  onClick={() => handleCopyHex(c.hex, idx)}
                  className={`w-full text-center py-2 px-3 rounded-xl backdrop-blur-md font-mono text-lg font-black tracking-wider transition-all flex items-center justify-center gap-1.5 ${
                    isLight
                      ? 'bg-black/10 text-gray-900 hover:bg-black/20'
                      : 'bg-white/15 text-white hover:bg-white/25'
                  }`}
                >
                  {isCopied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 opacity-70" />}
                  {isCopied ? 'Copied' : c.hex}
                </button>
                <div
                  className={`text-center text-[10px] uppercase font-bold tracking-widest ${
                    isLight ? 'text-black/60' : 'text-white/60'
                  }`}
                >
                  Color #{idx + 1}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
        <Sparkles className="h-4 w-4 text-blue-500" />
        <span>Press <strong>Spacebar</strong> to instantly generate a new aesthetic palette. Lock colors to preserve them.</span>
      </div>
    </div>
  );
}
