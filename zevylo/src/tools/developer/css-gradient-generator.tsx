'use client';

import React, { useState, useMemo } from 'react';
import { Palette, Copy, Check, Plus, Trash2, RotateCw } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

export default function CssGradientGenerator() {
  const [type, setType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { id: '1', color: '#6366f1', position: 0 },
    { id: '2', color: '#ec4899', position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const cssValue = useMemo(() => {
    const sortedStops = [...stops].sort((a, b) => a.position - b.position);
    const stopStr = sortedStops.map((s) => `${s.color} ${s.position}%`).join(', ');

    if (type === 'linear') {
      return `linear-gradient(${angle}deg, ${stopStr})`;
    } else {
      return `radial-gradient(circle at center, ${stopStr})`;
    }
  }, [type, angle, stops]);

  const cssCode = `background: ${cssValue};`;

  const addStop = () => {
    if (stops.length >= 5) return;
    setStops((prev) => [
      ...prev,
      { id: Date.now().toString(), color: '#06b6d4', position: 50 },
    ]);
  };

  const removeStop = (id: string) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((s) => s.id !== id));
  };

  const updateStop = (id: string, field: keyof ColorStop, val: string | number) => {
    setStops((prev) =>
      prev.map((s) => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  const handleCopy = async () => {
    await copyToClipboard(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Live Visual Canvas */}
      <div
        className="w-full h-64 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 transition-all duration-300 flex items-end p-6"
        style={{ background: cssValue }}
      >
        <div className="bg-black/40 backdrop-blur-md rounded-2xl px-4 py-2 text-white font-mono text-xs max-w-full truncate">
          {cssCode}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-600" />
            Gradient Configuration
          </h2>

          <div className="space-y-4">
            {/* Type Switcher */}
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-xl">
              <button
                onClick={() => setType('linear')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  type === 'linear'
                    ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Linear Gradient
              </button>
              <button
                onClick={() => setType('radial')}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                  type === 'radial'
                    ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400'
                }`}
              >
                Radial Gradient
              </button>
            </div>

            {type === 'linear' && (
              <div>
                <div className="flex justify-between items-center text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                  <span className="flex items-center gap-1">
                    <RotateCw className="w-3.5 h-3.5" />
                    Angle
                  </span>
                  <span className="font-mono text-indigo-600">{angle}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(parseInt(e.target.value, 10))}
                  className="w-full accent-indigo-600"
                />
              </div>
            )}

            {/* Color Stops */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Color Stops</span>
                {stops.length < 5 && (
                  <button
                    onClick={addStop}
                    className="flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Stop
                  </button>
                )}
              </div>

              {stops.map((stop) => (
                <div
                  key={stop.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800"
                >
                  <input
                    type="color"
                    value={stop.color}
                    onChange={(e) => updateStop(stop.id, 'color', e.target.value)}
                    className="w-9 h-9 rounded-lg border-0 cursor-pointer bg-transparent"
                  />
                  <input
                    type="text"
                    value={stop.color}
                    onChange={(e) => updateStop(stop.id, 'color', e.target.value)}
                    className="w-24 h-9 px-2 text-xs font-mono font-bold rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900"
                  />
                  <div className="flex-1 flex items-center gap-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={(e) => updateStop(stop.id, 'position', parseInt(e.target.value, 10))}
                      className="w-full accent-indigo-600"
                    />
                    <span className="text-xs font-mono text-gray-500 w-8">{stop.position}%</span>
                  </div>
                  {stops.length > 2 && (
                    <button
                      onClick={() => removeStop(stop.id)}
                      className="text-gray-400 hover:text-red-500 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Code Output Panel */}
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

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 font-mono text-xs text-gray-800 dark:text-gray-200 space-y-2">
            <div>{cssCode}</div>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/30 text-xs text-blue-800 dark:text-blue-300 leading-relaxed">
            <strong>Pro Tip:</strong> Supports standard CSS3 syntax, fully compatible across Chrome, Safari, Firefox, and Edge browsers.
          </div>
        </div>
      </div>
    </div>
  );
}
