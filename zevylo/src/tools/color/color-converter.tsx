'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Palette, Sparkles } from 'lucide-react';

export default function ColorConverter() {
  const [hexInput, setHexInput] = useState<string>('#3b82f6');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Normalize Hex
  const cleanHex = useMemo(() => {
    let clean = hexInput.replace(/[^0-9A-Fa-f]/g, '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    if (clean.length !== 6) return '3b82f6';
    return clean;
  }, [hexInput]);

  // Compute RGB
  const rgb = useMemo(() => {
    const r = parseInt(cleanHex.slice(0, 2), 16) || 0;
    const g = parseInt(cleanHex.slice(2, 4), 16) || 0;
    const b = parseInt(cleanHex.slice(4, 6), 16) || 0;
    return { r, g, b };
  }, [cleanHex]);

  // Compute HSL
  const hsl = useMemo(() => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  }, [rgb]);

  // Compute HSV
  const hsv = useMemo(() => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const d = max - min;
    let h = 0;
    const s = max === 0 ? 0 : d / max;
    const v = max;

    if (max !== min) {
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      v: Math.round(v * 100),
    };
  }, [rgb]);

  // Compute CMYK
  const cmyk = useMemo(() => {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const k = 1 - Math.max(r, g, b);
    if (k === 1) {
      return { c: 0, m: 0, y: 0, k: 100 };
    }
    const c = (1 - r - k) / (1 - k);
    const m = (1 - g - k) / (1 - k);
    const y = (1 - b - k) / (1 - k);
    return {
      c: Math.round(c * 100),
      m: Math.round(m * 100),
      y: Math.round(y * 100),
      k: Math.round(k * 100),
    };
  }, [rgb]);

  // Luminance & WCAG Contrast
  const contrastInfo = useMemo(() => {
    const sRGB = (val: number) => {
      val /= 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    };
    const lum = 0.2126 * sRGB(rgb.r) + 0.7152 * sRGB(rgb.g) + 0.0722 * sRGB(rgb.b);

    const contrastWhite = (1.0 + 0.05) / (lum + 0.05);
    const contrastBlack = (lum + 0.05) / (0.0 + 0.05);

    return {
      white: Math.round(contrastWhite * 100) / 100,
      black: Math.round(contrastBlack * 100) / 100,
    };
  }, [rgb]);

  // Generate Tints & Shades
  const tintsAndShades = useMemo(() => {
    const shades: string[] = [];

    // Tints (mix with white)
    for (let i = 4; i >= 1; i--) {
      const factor = i * 0.2;
      const nr = Math.round(rgb.r + (255 - rgb.r) * factor);
      const ng = Math.round(rgb.g + (255 - rgb.g) * factor);
      const nb = Math.round(rgb.b + (255 - rgb.b) * factor);
      shades.push(`#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`);
    }

    // Base color
    shades.push(`#${cleanHex}`);

    // Shades (mix with black)
    for (let i = 1; i <= 4; i++) {
      const factor = 1 - (i * 0.2);
      const nr = Math.round(rgb.r * factor);
      const ng = Math.round(rgb.g * factor);
      const nb = Math.round(rgb.b * factor);
      shades.push(`#${nr.toString(16).padStart(2, '0')}${ng.toString(16).padStart(2, '0')}${nb.toString(16).padStart(2, '0')}`);
    }

    return shades;
  }, [cleanHex, rgb]);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const formats = [
    { label: 'HEX', value: `#${cleanHex.toUpperCase()}` },
    { label: 'RGB', value: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'HSV', value: `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)` },
    { label: 'CMYK', value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Visual Color Preview & Input */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Large Color Swatch */}
          <div
            className="w-full md:w-56 h-40 rounded-2xl shadow-lg border border-gray-200/50 flex flex-col justify-end p-4 transition-colors"
            style={{ backgroundColor: `#${cleanHex}` }}
          >
            <span
              className="text-xs font-bold px-2.5 py-1 rounded-md backdrop-blur-md w-fit shadow-sm"
              style={{
                color: contrastInfo.black > contrastInfo.white ? '#000000' : '#ffffff',
                backgroundColor: contrastInfo.black > contrastInfo.white ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)',
              }}
            >
              #{cleanHex.toUpperCase()}
            </span>
          </div>

          {/* Color Input Controls */}
          <div className="flex-1 w-full space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                Pick or Type Hex Color Code
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={`#${cleanHex}`}
                  onChange={(e) => setHexInput(e.target.value)}
                  className="w-12 h-12 rounded-xl cursor-pointer border border-gray-300 dark:border-gray-700 p-1 bg-transparent shrink-0"
                />
                <input
                  type="text"
                  value={hexInput}
                  onChange={(e) => setHexInput(e.target.value)}
                  placeholder="#3B82F6"
                  className="flex-1 text-lg font-mono font-bold rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2.5 text-gray-900 dark:text-white uppercase outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* WCAG Contrast Ratio Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-500 font-medium">On White:</span>
                  <strong className="text-gray-900 dark:text-white tabular-nums">{contrastInfo.white}:1</strong>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${contrastInfo.white >= 4.5 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                  {contrastInfo.white >= 7 ? 'AAA Pass' : contrastInfo.white >= 4.5 ? 'AA Pass' : 'Fail'}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-100 dark:border-gray-800 text-xs">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-gray-500 font-medium">On Black:</span>
                  <strong className="text-gray-900 dark:text-white tabular-nums">{contrastInfo.black}:1</strong>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${contrastInfo.black >= 4.5 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-rose-500/10 text-rose-600'}`}>
                  {contrastInfo.black >= 7 ? 'AAA Pass' : contrastInfo.black >= 4.5 ? 'AA Pass' : 'Fail'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Formats Grid */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-4 flex items-center gap-2">
          <Palette className="h-4 w-4 text-blue-500" /> Color Values & CSS Syntax
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {formats.map((fmt) => (
            <div
              key={fmt.label}
              className="p-3.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/40 flex items-center justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-0.5">
                  {fmt.label}
                </span>
                <span className="text-xs font-mono font-bold text-gray-900 dark:text-white">
                  {fmt.value}
                </span>
              </div>
              <button
                onClick={() => copyToClipboard(fmt.value, fmt.label)}
                className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                title={`Copy ${fmt.label}`}
              >
                {copiedKey === fmt.label ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tints & Shades Palette Scale */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-indigo-500" /> Monochromatic Tints & Shades Scale
          </h4>
          <span className="text-xs text-gray-400">Click any swatch to copy HEX</span>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-9 gap-2">
          {tintsAndShades.map((swatchHex, idx) => (
            <button
              key={idx}
              onClick={() => copyToClipboard(swatchHex, `swatch-${idx}`)}
              className="group relative flex flex-col items-center rounded-xl overflow-hidden border border-gray-200/60 dark:border-gray-800 transition-transform hover:scale-105 active:scale-95"
            >
              <div
                className="w-full h-16 transition-opacity group-hover:opacity-90"
                style={{ backgroundColor: swatchHex }}
              />
              <span className="py-1 px-1.5 text-[10px] font-mono text-gray-600 dark:text-gray-300 font-semibold bg-white dark:bg-gray-800 w-full text-center">
                {copiedKey === `swatch-${idx}` ? 'Copied!' : swatchHex.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
