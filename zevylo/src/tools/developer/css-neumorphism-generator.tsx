'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, Sun, Moon } from 'lucide-react';

type ShapeType = 'flat' | 'concave' | 'convex' | 'pressed';
type LightDirection = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return { r, g, b };
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

function adjustColor(hex: string, amount: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const clamp = (val: number) => Math.min(255, Math.max(0, Math.round(val)));
  const r = clamp(rgb.r + amount);
  const g = clamp(rgb.g + amount);
  const b = clamp(rgb.b + amount);
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

export default function CssNeumorphismGenerator() {
  const [bgColor, setBgColor] = useState<string>('#e0e5ec');
  const [size, setSize] = useState<number>(200);
  const [radius, setRadius] = useState<number>(30);
  const [distance, setDistance] = useState<number>(15);
  const [blur, setBlur] = useState<number>(30);
  const [shape, setShape] = useState<ShapeType>('flat');
  const [lightDir, setLightDir] = useState<LightDirection>('top-left');
  const [copied, setCopied] = useState<boolean>(false);

  // Compute light & dark shadow colors
  const { lightColor, darkColor, gradientBg, boxShadow } = useMemo(() => {
    const darkShade = adjustColor(bgColor, -35);
    const lightShade = adjustColor(bgColor, 35);

    let xMult = 1;
    let yMult = 1;

    switch (lightDir) {
      case 'top-left':
        xMult = 1;
        yMult = 1;
        break;
      case 'top-right':
        xMult = -1;
        yMult = 1;
        break;
      case 'bottom-left':
        xMult = 1;
        yMult = -1;
        break;
      case 'bottom-right':
        xMult = -1;
        yMult = -1;
        break;
    }

    const darkX = distance * xMult;
    const darkY = distance * yMult;
    const lightX = -distance * xMult;
    const lightY = -distance * yMult;

    let shadow = '';
    let background = bgColor;

    if (shape === 'pressed') {
      shadow = `inset ${darkX}px ${darkY}px ${blur}px ${darkShade}, inset ${lightX}px ${lightY}px ${blur}px ${lightShade}`;
    } else {
      shadow = `${darkX}px ${darkY}px ${blur}px ${darkShade}, ${lightX}px ${lightY}px ${blur}px ${lightShade}`;
    }

    if (shape === 'concave') {
      const gradLight = adjustColor(bgColor, -10);
      const gradDark = adjustColor(bgColor, 10);
      background = `linear-gradient(145deg, ${gradLight}, ${gradDark})`;
    } else if (shape === 'convex') {
      const gradLight = adjustColor(bgColor, 10);
      const gradDark = adjustColor(bgColor, -10);
      background = `linear-gradient(145deg, ${gradLight}, ${gradDark})`;
    }

    return {
      lightColor: lightShade,
      darkColor: darkShade,
      gradientBg: background,
      boxShadow: shadow,
    };
  }, [bgColor, distance, blur, shape, lightDir]);

  const generatedCss = useMemo(() => {
    return `border-radius: ${radius}px;
background: ${gradientBg};
box-shadow: ${boxShadow};`;
  }, [radius, gradientBg, boxShadow]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Presets */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-wrap items-center justify-between gap-3 shadow-sm">
        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500" />
          Color Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setBgColor('#e0e5ec')}
            className="px-3 py-1 text-xs rounded-lg bg-[#e0e5ec] text-gray-800 font-medium border border-gray-300"
          >
            Light Slate (#e0e5ec)
          </button>
          <button
            onClick={() => setBgColor('#2b303c')}
            className="px-3 py-1 text-xs rounded-lg bg-[#2b303c] text-white font-medium border border-gray-600"
          >
            Dark Onyx (#2b303c)
          </button>
          <button
            onClick={() => setBgColor('#e8edf2')}
            className="px-3 py-1 text-xs rounded-lg bg-[#e8edf2] text-gray-800 font-medium border border-gray-300"
          >
            Soft Ice (#e8edf2)
          </button>
          <button
            onClick={() => setBgColor('#1f232b')}
            className="px-3 py-1 text-xs rounded-lg bg-[#1f232b] text-white font-medium border border-gray-600"
          >
            Deep Charcoal (#1f232b)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 space-y-5 shadow-sm">
          {/* Base Color Picker */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Background Color
            </label>
            <div className="flex items-center gap-3">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-600 p-0.5"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="flex-1 font-mono text-sm px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 uppercase"
              />
            </div>
          </div>

          {/* Shape Types */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Shape Elevation
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              {(['flat', 'concave', 'convex', 'pressed'] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setShape(s)}
                  className={`py-2 px-3 rounded-lg capitalize border transition ${
                    shape === s
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-400'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Light Direction */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              Light Source Angle
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              {(['top-left', 'top-right', 'bottom-left', 'bottom-right'] as const).map((dir) => (
                <button
                  key={dir}
                  onClick={() => setLightDir(dir)}
                  className={`py-2 px-3 rounded-lg capitalize border transition ${
                    lightDir === dir
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-700/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-indigo-400'
                  }`}
                >
                  {dir.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-2">
            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                <span>Distance</span>
                <span>{distance}px</span>
              </div>
              <input
                type="range"
                min="5"
                max="50"
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                <span>Blur Intensity</span>
                <span>{blur}px</span>
              </div>
              <input
                type="range"
                min="5"
                max="100"
                value={blur}
                onChange={(e) => setBlur(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                <span>Border Radius</span>
                <span>{radius}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="120"
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                <span>Element Size</span>
                <span>{size}px</span>
              </div>
              <input
                type="range"
                min="120"
                max="300"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
            </div>
          </div>
        </div>

        {/* Live Preview & CSS Export */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Canvas Display */}
          <div
            className="flex-1 min-h-[380px] rounded-xl flex items-center justify-center p-8 transition-colors duration-200 border border-gray-300 dark:border-gray-700 shadow-inner"
            style={{ backgroundColor: bgColor }}
          >
            <div
              style={{
                width: `${size}px`,
                height: `${size}px`,
                borderRadius: `${radius}px`,
                background: gradientBg,
                boxShadow: boxShadow,
              }}
              className="flex flex-col items-center justify-center text-center p-4 transition-all duration-150 select-none cursor-pointer"
            >
              <span
                style={{
                  color: adjustColor(bgColor, bgColor.toLowerCase() > '#888888' ? -80 : 80),
                }}
                className="font-bold text-sm"
              >
                Soft UI
              </span>
              <span
                style={{
                  color: adjustColor(bgColor, bgColor.toLowerCase() > '#888888' ? -50 : 50),
                }}
                className="text-xs mt-1"
              >
                {shape}
              </span>
            </div>
          </div>

          {/* Generated Code Box */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                CSS Code Output
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
                    <Copy className="w-3.5 h-3.5" /> Copy CSS
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 bg-gray-900 rounded-lg font-mono text-xs text-emerald-400 overflow-x-auto leading-relaxed border border-gray-800">
              {generatedCss}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
