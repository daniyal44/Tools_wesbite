'use client';

import React, { useState } from 'react';
import { Layers, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function CssBoxShadowGenerator() {
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(12);
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(-5);
  const [opacity, setOpacity] = useState(15);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [boxColor, setBoxColor] = useState('#ffffff');
  const [inset, setInset] = useState(false);
  const [copied, setCopied] = useState(false);

  // Convert hex color to rgba
  const hexToRgba = (hex: string, alphaPercent: number) => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map((char) => char + char).join('');
    const r = parseInt(c.substring(0, 2), 16) || 0;
    const g = parseInt(c.substring(2, 4), 16) || 0;
    const b = parseInt(c.substring(4, 6), 16) || 0;
    const a = (alphaPercent / 100).toFixed(2);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const shadowCss = `${inset ? 'inset ' : ''}${xOffset}px ${yOffset}px ${blur}px ${spread}px ${hexToRgba(shadowColor, opacity)}`;
  const fullCss = `box-shadow: ${shadowCss};\n-webkit-box-shadow: ${shadowCss};`;

  const handleCopy = async () => {
    await copyToClipboard(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Live Preview Box */}
      <div className="w-full h-72 rounded-3xl bg-gray-100 dark:bg-gray-950 flex items-center justify-center p-8 border border-gray-200 dark:border-gray-800">
        <div
          className="w-48 h-48 rounded-3xl transition-all duration-200 flex items-center justify-center text-xs font-bold text-gray-500"
          style={{
            backgroundColor: boxColor,
            boxShadow: shadowCss,
          }}
        >
          Preview Box
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Sliders */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            Shadow Parameters
          </h2>

          <div className="space-y-3 text-xs font-bold text-gray-700 dark:text-gray-300">
            <div>
              <div className="flex justify-between mb-1">
                <span>Horizontal Offset (X)</span>
                <span className="font-mono text-blue-600">{xOffset}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={xOffset}
                onChange={(e) => setXOffset(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Vertical Offset (Y)</span>
                <span className="font-mono text-blue-600">{yOffset}px</span>
              </div>
              <input
                type="range"
                min="-50"
                max="50"
                value={yOffset}
                onChange={(e) => setYOffset(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Blur Radius</span>
                <span className="font-mono text-blue-600">{blur}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={blur}
                onChange={(e) => setBlur(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Spread Radius</span>
                <span className="font-mono text-blue-600">{spread}px</span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                value={spread}
                onChange={(e) => setSpread(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span>Shadow Opacity</span>
                <span className="font-mono text-blue-600">{opacity}%</span>
              </div>
              <input
                type="range"
                min="1"
                max="100"
                value={opacity}
                onChange={(e) => setOpacity(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={shadowColor}
                  onChange={(e) => setShadowColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <span className="text-xs">Shadow Color</span>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="insetCheck"
                  checked={inset}
                  onChange={(e) => setInset(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 accent-blue-600"
                />
                <label htmlFor="insetCheck" className="cursor-pointer text-xs">
                  Inset Shadow
                </label>
              </div>
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
            {fullCss}
          </pre>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400">
            Box background color preview toggle:
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => setBoxColor('#ffffff')}
                className="px-3 py-1 rounded-lg border text-xs font-bold bg-white text-gray-800"
              >
                White
              </button>
              <button
                onClick={() => setBoxColor('#1e293b')}
                className="px-3 py-1 rounded-lg border text-xs font-bold bg-slate-800 text-white"
              >
                Dark Slate
              </button>
              <button
                onClick={() => setBoxColor('#3b82f6')}
                className="px-3 py-1 rounded-lg border text-xs font-bold bg-blue-500 text-white"
              >
                Blue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
