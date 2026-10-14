'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, ArrowRightLeft, Maximize2 } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface RatioPreset {
  label: string;
  w: number;
  h: number;
  name: string;
}

const PRESETS: RatioPreset[] = [
  { label: '16:9', w: 16, h: 9, name: 'Widescreen / YouTube / 1080p' },
  { label: '4:3', w: 4, h: 3, name: 'Standard TV / iPad / Classic' },
  { label: '1:1', w: 1, h: 1, name: 'Square / Instagram Post' },
  { label: '9:16', w: 9, h: 16, name: 'Vertical / TikTok / Shorts / Story' },
  { label: '21:9', w: 21, h: 9, name: 'Cinematic / Ultrawide Monitor' },
  { label: '3:2', w: 3, h: 2, name: 'Classic 35mm Photography' },
];

export default function AspectRatioCalculator() {
  const [ratioW, setRatioW] = useState(16);
  const [ratioH, setRatioH] = useState(9);
  const [currentWidth, setCurrentWidth] = useState('1920');
  const [currentHeight, setCurrentHeight] = useState('1080');
  const [lockDimension, setLockDimension] = useState<'width' | 'height'>('width');
  const [copied, setCopied] = useState(false);

  const calculated = useMemo(() => {
    const rw = ratioW || 16;
    const rh = ratioH || 9;

    if (lockDimension === 'width') {
      const w = parseFloat(currentWidth) || 0;
      const h = Math.round((w * rh) / rw);
      return { width: w, height: h };
    } else {
      const h = parseFloat(currentHeight) || 0;
      const w = Math.round((h * rw) / rh);
      return { width: w, height: h };
    }
  }, [ratioW, ratioH, currentWidth, currentHeight, lockDimension]);

  const handleCopy = async () => {
    await copyToClipboard(`${calculated.width} × ${calculated.height} (${ratioW}:${ratioH})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyPreset = (preset: RatioPreset) => {
    setRatioW(preset.w);
    setRatioH(preset.h);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Visual Dimension Card */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 p-8 flex flex-col items-center justify-center space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Aspect Ratio Preview ({ratioW}:{ratioH})
        </div>

        <div
          className="border-2 border-dashed border-blue-500 bg-blue-50/50 dark:bg-blue-950/20 rounded-2xl flex items-center justify-center p-4 transition-all duration-200 shadow-sm"
          style={{
            width: '260px',
            height: `${Math.max(60, Math.min(260, (260 * ratioH) / ratioW))}px`,
          }}
        >
          <span className="font-mono text-sm font-black text-gray-800 dark:text-gray-200">
            {calculated.width} × {calculated.height} px
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Input Parameters */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Maximize2 className="w-5 h-5 text-blue-600" />
            Aspect Ratio & Dimensions
          </h2>

          <div className="space-y-4">
            {/* Ratio W:H */}
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Ratio Proportions (Width : Height)
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  value={ratioW}
                  onChange={(e) => setRatioW(parseFloat(e.target.value) || 1)}
                  className="flex-1 h-11 px-3 text-center rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base font-bold"
                />
                <span className="font-black text-lg text-gray-400">:</span>
                <input
                  type="number"
                  min="1"
                  value={ratioH}
                  onChange={(e) => setRatioH(parseFloat(e.target.value) || 1)}
                  className="flex-1 h-11 px-3 text-center rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-base font-bold"
                />
              </div>
            </div>

            {/* Target Dimensions */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Width (Pixels)
                  </label>
                  {lockDimension === 'width' && (
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                      Active Input
                    </span>
                  )}
                </div>
                <input
                  type="number"
                  value={lockDimension === 'width' ? currentWidth : calculated.width}
                  onChange={(e) => {
                    setLockDimension('width');
                    setCurrentWidth(e.target.value);
                  }}
                  className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-mono text-base font-bold"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    Height (Pixels)
                  </label>
                  {lockDimension === 'height' && (
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded">
                      Active Input
                    </span>
                  )}
                </div>
                <input
                  type="number"
                  value={lockDimension === 'height' ? currentHeight : calculated.height}
                  onChange={(e) => {
                    setLockDimension('height');
                    setCurrentHeight(e.target.value);
                  }}
                  className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 font-mono text-base font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Popular Presets */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Popular Ratio Presets
            </h2>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-600 dark:text-gray-300"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Result'}
            </button>
          </div>

          <div className="space-y-2.5">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                onClick={() => applyPreset(p)}
                className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                  ratioW === p.w && ratioH === p.h
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30'
                    : 'border-gray-200 dark:border-gray-800 hover:border-blue-400'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-gray-900 dark:text-gray-100 block">{p.name}</span>
                  <span className="text-xs text-gray-400">Standard Ratio</span>
                </div>
                <span className="font-mono font-black text-sm text-blue-600 bg-blue-100 dark:bg-blue-900/40 px-2.5 py-1 rounded-lg">
                  {p.label}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              const tempW = ratioW;
              setRatioW(ratioH);
              setRatioH(tempW);
            }}
            className="w-full py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center justify-center gap-1.5"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            Flip Landscape / Portrait Orientation
          </button>
        </div>
      </div>
    </div>
  );
}
