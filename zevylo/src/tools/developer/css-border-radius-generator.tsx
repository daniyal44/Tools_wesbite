'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Play, Pause, Sparkles, RefreshCw } from 'lucide-react';

interface BlobPreset {
  name: string;
  tlX: number;
  trX: number;
  brX: number;
  blX: number;
  tlY: number;
  trY: number;
  brY: number;
  blY: number;
}

const PRESETS: BlobPreset[] = [
  { name: 'Organic Fluid', tlX: 30, trX: 70, brX: 70, blX: 30, tlY: 30, trY: 30, brY: 70, blY: 70 },
  { name: 'Smooth Pebble', tlX: 60, trX: 40, brX: 30, blX: 70, tlY: 60, trY: 30, brY: 70, blY: 40 },
  { name: 'Water Drop', tlX: 50, trX: 50, brX: 50, blX: 50, tlY: 20, trY: 20, brY: 80, blY: 80 },
  { name: 'Organic Egg', tlX: 50, trX: 50, brX: 50, blX: 50, tlY: 35, trY: 35, brY: 65, blY: 65 },
  { name: 'Shield Crest', tlX: 20, trX: 80, brX: 50, blX: 50, tlY: 10, trY: 10, brY: 90, blY: 90 },
  { name: 'Vibrant Leaf', tlX: 10, trX: 90, brX: 10, blX: 90, tlY: 90, trY: 10, brY: 90, blY: 10 },
];

export default function CssBorderRadiusGenerator() {
  const [tlX, setTlX] = useState<number>(30);
  const [trX, setTrX] = useState<number>(70);
  const [brX, setBrX] = useState<number>(70);
  const [blX, setBlX] = useState<number>(30);

  const [tlY, setTlY] = useState<number>(30);
  const [trY, setTrY] = useState<number>(30);
  const [brY, setBrY] = useState<number>(70);
  const [blY, setBlY] = useState<number>(70);

  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [gradientColor, setGradientColor] = useState<'indigo' | 'sunset' | 'emerald' | 'cyan'>('indigo');

  const borderRadiusCss = useMemo(() => {
    return `${tlX}% ${100 - trX}% ${100 - brX}% ${blX}% / ${tlY}% ${trY}% ${100 - brY}% ${100 - blY}%`;
  }, [tlX, trX, brX, blX, tlY, trY, brY, blY]);

  const cssCode = useMemo(() => {
    return `border-radius: ${borderRadiusCss};`;
  }, [borderRadiusCss]);

  const applyPreset = (preset: BlobPreset) => {
    setTlX(preset.tlX);
    setTrX(preset.trX);
    setBrX(preset.brX);
    setBlX(preset.blX);
    setTlY(preset.tlY);
    setTrY(preset.trY);
    setBrY(preset.brY);
    setBlY(preset.blY);
  };

  const randomize = () => {
    const r = () => Math.floor(Math.random() * 60) + 20;
    setTlX(r());
    setTrX(r());
    setBrX(r());
    setBlX(r());
    setTlY(r());
    setTrY(r());
    setBrY(r());
    setBlY(r());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const gradientStyles = {
    indigo: 'from-indigo-500 via-purple-500 to-pink-500',
    sunset: 'from-amber-500 via-rose-500 to-red-500',
    emerald: 'from-emerald-400 via-teal-500 to-cyan-600',
    cyan: 'from-cyan-400 via-blue-500 to-indigo-600',
  }[gradientColor];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Presets and Controls */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">Presets:</span>
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => applyPreset(p)}
              className="px-2.5 py-1 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400 transition"
            >
              {p.name}
            </button>
          ))}
        </div>

        <button
          onClick={randomize}
          className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition flex items-center gap-1.5"
        >
          <RefreshCw className="w-3.5 h-3.5" /> Randomize
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Grid */}
        <div className="lg:col-span-6 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-5">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            Horizontal Radius Axes (%)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Top-Left X</span>
                <span className="font-mono">{tlX}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={tlX}
                onChange={(e) => setTlX(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Top-Right X</span>
                <span className="font-mono">{trX}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={trX}
                onChange={(e) => setTrX(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Bottom-Left X</span>
                <span className="font-mono">{blX}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={blX}
                onChange={(e) => setBlX(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Bottom-Right X</span>
                <span className="font-mono">{brX}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={brX}
                onChange={(e) => setBrX(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider pt-2">
            Vertical Radius Axes (%)
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Top-Left Y</span>
                <span className="font-mono">{tlY}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={tlY}
                onChange={(e) => setTlY(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Top-Right Y</span>
                <span className="font-mono">{trY}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={trY}
                onChange={(e) => setTrY(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Bottom-Left Y</span>
                <span className="font-mono">{blY}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={blY}
                onChange={(e) => setBlY(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
            <div>
              <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                <span>Bottom-Right Y</span>
                <span className="font-mono">{brY}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={brY}
                onChange={(e) => setBrY(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>

          {/* Color theme & animation */}
          <div className="pt-3 border-t border-gray-100 dark:border-gray-750 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-500 dark:text-gray-400">Gradient:</span>
              {(['indigo', 'sunset', 'emerald', 'cyan'] as const).map((clr) => (
                <button
                  key={clr}
                  onClick={() => setGradientColor(clr)}
                  className={`w-5 h-5 rounded-full border-2 transition ${
                    clr === 'indigo'
                      ? 'bg-indigo-500'
                      : clr === 'sunset'
                      ? 'bg-rose-500'
                      : clr === 'emerald'
                      ? 'bg-emerald-500'
                      : 'bg-cyan-500'
                  } ${
                    gradientColor === clr
                      ? 'border-gray-900 dark:border-white scale-110'
                      : 'border-transparent'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setIsAnimated(!isAnimated)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition ${
                isAnimated
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {isAnimated ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isAnimated ? 'Stop Animation' : 'Morphing Preview'}
            </button>
          </div>
        </div>

        {/* Live Preview Display */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex-1 min-h-[350px] bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center p-8 relative overflow-hidden shadow-inner">
            <div
              style={{
                borderRadius: borderRadiusCss,
                transition: isAnimated ? 'border-radius 1.5s ease-in-out infinite alternate' : 'border-radius 0.2s ease',
              }}
              className={`w-64 h-64 bg-gradient-to-tr ${gradientStyles} shadow-xl shadow-indigo-500/20 flex items-center justify-center text-white text-center p-4 font-medium text-xs select-none ${
                isAnimated ? 'animate-pulse' : ''
              }`}
            >
              <div className="bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                8-Point CSS Blob
              </div>
            </div>
          </div>

          {/* CSS Code Box */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                CSS Property
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-300" /> Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Copy Code
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 bg-gray-900 rounded-lg font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed border border-gray-800">
              {cssCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
