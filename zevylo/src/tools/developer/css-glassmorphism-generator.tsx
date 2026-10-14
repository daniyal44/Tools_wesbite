'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function CssGlassmorphismGenerator() {
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(25);
  const [saturation, setSaturation] = useState(180);
  const [borderOpacity, setBorderOpacity] = useState(30);
  const [borderWidth, setBorderWidth] = useState(1);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [copied, setCopied] = useState(false);

  const rgb = isDarkTheme ? '0, 0, 0' : '255, 255, 255';
  const bgStyle = `rgba(${rgb}, ${(opacity / 100).toFixed(2)})`;
  const borderStyle = `${borderWidth}px solid rgba(${rgb}, ${(borderOpacity / 100).toFixed(2)})`;
  const filterStyle = `blur(${blur}px) saturate(${saturation}%)`;

  const cssCode = `background: ${bgStyle};\nbackdrop-filter: ${filterStyle};\n-webkit-backdrop-filter: ${filterStyle};\nborder-radius: 24px;\nborder: ${borderStyle};\nbox-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);`;

  const handleCopy = async () => {
    await copyToClipboard(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Live Visual Playground */}
      <div className="relative w-full h-80 rounded-3xl overflow-hidden flex items-center justify-center p-8 bg-gradient-to-tr from-purple-600 via-pink-500 to-amber-400 shadow-2xl">
        {/* Background shapes behind glass to prove refraction */}
        <div className="absolute -top-10 -left-10 w-44 h-44 rounded-full bg-cyan-400 blur-xl opacity-80" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full bg-blue-600 blur-xl opacity-80" />
        <div className="absolute top-1/2 left-1/4 w-32 h-32 rounded-full bg-yellow-300 blur-lg opacity-70" />

        {/* The Glass Card */}
        <div
          className="relative z-10 w-72 h-48 p-6 text-white flex flex-col justify-between shadow-2xl transition-all duration-150"
          style={{
            background: bgStyle,
            backdropFilter: filterStyle,
            WebkitBackdropFilter: filterStyle,
            borderRadius: '24px',
            border: borderStyle,
          }}
        >
          <div className="flex justify-between items-center">
            <span className="font-extrabold text-sm tracking-wider uppercase opacity-90">Glass Card</span>
            <div className="w-6 h-6 rounded-full bg-white/40 border border-white/60" />
          </div>
          <div>
            <span className="text-xl font-black block">Frosted Glass</span>
            <span className="text-xs opacity-75">Seamless UI Elevation</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Glass Parameters
            </h2>
            <div className="flex gap-2">
              <button
                onClick={() => setIsDarkTheme(false)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border ${!isDarkTheme ? 'bg-purple-50 text-purple-600 border-purple-300' : 'text-gray-500'}`}
              >
                Light Glass
              </button>
              <button
                onClick={() => setIsDarkTheme(true)}
                className={`px-3 py-1 rounded-lg text-xs font-bold border ${isDarkTheme ? 'bg-purple-950 text-purple-300 border-purple-700' : 'text-gray-500'}`}
              >
                Dark Glass
              </button>
            </div>
          </div>

          <div className="space-y-3 text-xs font-bold text-gray-700 dark:text-gray-300">
            <div>
              <div className="flex justify-between mb-1">
                <span>Backdrop Blur</span>
                <span className="font-mono text-purple-600">{blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={blur}
                onChange={(e) => setBlur(parseInt(e.target.value, 10))}
                className="w-full accent-purple-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Background Opacity</span>
                <span className="font-mono text-purple-600">{opacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(parseInt(e.target.value, 10))}
                className="w-full accent-purple-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Saturation Boost</span>
                <span className="font-mono text-purple-600">{saturation}%</span>
              </div>
              <input
                type="range"
                min="100"
                max="250"
                value={saturation}
                onChange={(e) => setSaturation(parseInt(e.target.value, 10))}
                className="w-full accent-purple-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Border Transparency</span>
                <span className="font-mono text-purple-600">{borderOpacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={borderOpacity}
                onChange={(e) => setBorderOpacity(parseInt(e.target.value, 10))}
                className="w-full accent-purple-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Border Width</span>
                <span className="font-mono text-purple-600">{borderWidth}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="4"
                value={borderWidth}
                onChange={(e) => setBorderWidth(parseInt(e.target.value, 10))}
                className="w-full accent-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              CSS Code
            </h2>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-600 dark:text-gray-300"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy CSS'}
            </button>
          </div>

          <pre className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 font-mono text-xs text-gray-800 dark:text-gray-200 overflow-x-auto whitespace-pre-wrap">
            {cssCode}
          </pre>
        </div>
      </div>
    </div>
  );
}
