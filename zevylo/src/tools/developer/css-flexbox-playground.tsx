'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, Plus, Minus, RotateCcw, Layout } from 'lucide-react';

type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';
type JustifyContent =
  | 'flex-start'
  | 'center'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';
type AlignItems = 'stretch' | 'flex-start' | 'center' | 'flex-end' | 'baseline';
type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export default function CssFlexboxPlayground() {
  const [direction, setDirection] = useState<FlexDirection>('row');
  const [justify, setJustify] = useState<JustifyContent>('center');
  const [align, setAlign] = useState<AlignItems>('center');
  const [wrap, setWrap] = useState<FlexWrap>('wrap');
  const [gap, setGap] = useState<number>(16);
  const [itemCount, setItemCount] = useState<number>(5);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [itemGrow, setItemGrow] = useState<Record<number, number>>({});
  const [outputTab, setOutputTab] = useState<'css' | 'tailwind'>('css');
  const [copied, setCopied] = useState<boolean>(false);

  const resetAll = () => {
    setDirection('row');
    setJustify('center');
    setAlign('center');
    setWrap('wrap');
    setGap(16);
    setItemCount(5);
    setSelectedItem(null);
    setItemGrow({});
  };

  const handleGrowChange = (index: number, val: number) => {
    setItemGrow((prev) => ({ ...prev, [index]: val }));
  };

  // Generate CSS code
  const generatedCss = useMemo(() => {
    let css = `.container {\n  display: flex;\n  flex-direction: ${direction};\n  justify-content: ${justify};\n  align-items: ${align};\n  flex-wrap: ${wrap};\n  gap: ${gap}px;\n}\n`;

    const growOverrides = Object.entries(itemGrow).filter(([, val]) => val > 0);
    if (growOverrides.length > 0) {
      growOverrides.forEach(([idx, val]) => {
        css += `\n.container > :nth-child(${Number(idx) + 1}) {\n  flex-grow: ${val};\n}`;
      });
    }

    return css;
  }, [direction, justify, align, wrap, gap, itemGrow]);

  // Generate Tailwind classes
  const generatedTailwind = useMemo(() => {
    const dirMap: Record<FlexDirection, string> = {
      row: 'flex-row',
      'row-reverse': 'flex-row-reverse',
      column: 'flex-col',
      'column-reverse': 'flex-col-reverse',
    };
    const justifyMap: Record<JustifyContent, string> = {
      'flex-start': 'justify-start',
      center: 'justify-center',
      'flex-end': 'justify-end',
      'space-between': 'justify-between',
      'space-around': 'justify-around',
      'space-evenly': 'justify-evenly',
    };
    const alignMap: Record<AlignItems, string> = {
      stretch: 'items-stretch',
      'flex-start': 'items-start',
      center: 'items-center',
      'flex-end': 'items-end',
      baseline: 'items-baseline',
    };
    const wrapMap: Record<FlexWrap, string> = {
      nowrap: 'flex-nowrap',
      wrap: 'flex-wrap',
      'wrap-reverse': 'flex-wrap-reverse',
    };

    const gapRem = (gap / 16).toFixed(2).replace(/\.00$/, '');
    const tailwindClasses = `flex ${dirMap[direction]} ${justifyMap[justify]} ${alignMap[align]} ${wrapMap[wrap]} gap-[${gap}px]`;

    return `<div className="${tailwindClasses}">\n  {/* flex children */}\n</div>`;
  }, [direction, justify, align, wrap, gap]);

  const activeOutput = outputTab === 'css' ? generatedCss : generatedTailwind;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top action toolbar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Layout className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
            Flexbox Playground
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium">
            <span className="text-gray-600 dark:text-gray-300">Items: {itemCount}</span>
            <button
              onClick={() => setItemCount((c) => Math.max(1, c - 1))}
              disabled={itemCount <= 1}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setItemCount((c) => Math.min(12, c + 1))}
              disabled={itemCount >= 12}
              className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-40"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={resetAll}
            className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Controls Column */}
        <div className="lg:col-span-5 bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-4">
          {/* flex-direction */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              flex-direction
            </label>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
              {(['row', 'row-reverse', 'column', 'column-reverse'] as const).map((d) => (
                <button
                  key={d}
                  onClick={() => setDirection(d)}
                  className={`py-1.5 px-2.5 rounded-lg border transition ${
                    direction === d
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-750 text-gray-700 dark:text-gray-300 border-gray-250 dark:border-gray-700'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* justify-content */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              justify-content
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-medium">
              {(
                [
                  'flex-start',
                  'center',
                  'flex-end',
                  'space-between',
                  'space-around',
                  'space-evenly',
                ] as const
              ).map((j) => (
                <button
                  key={j}
                  onClick={() => setJustify(j)}
                  className={`py-1.5 px-2 rounded-lg border transition truncate ${
                    justify === j
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-750 text-gray-700 dark:text-gray-300 border-gray-250 dark:border-gray-700'
                  }`}
                >
                  {j.replace('space-', '')}
                </button>
              ))}
            </div>
          </div>

          {/* align-items */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              align-items
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-medium">
              {(['stretch', 'flex-start', 'center', 'flex-end', 'baseline'] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAlign(a)}
                  className={`py-1.5 px-2 rounded-lg border transition truncate ${
                    align === a
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-750 text-gray-700 dark:text-gray-300 border-gray-250 dark:border-gray-700'
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          {/* flex-wrap */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1.5">
              flex-wrap
            </label>
            <div className="grid grid-cols-3 gap-1.5 text-xs font-medium">
              {(['nowrap', 'wrap', 'wrap-reverse'] as const).map((w) => (
                <button
                  key={w}
                  onClick={() => setWrap(w)}
                  className={`py-1.5 px-2 rounded-lg border transition ${
                    wrap === w
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-750 text-gray-700 dark:text-gray-300 border-gray-250 dark:border-gray-700'
                  }`}
                >
                  {w}
                </button>
              ))}
            </div>
          </div>

          {/* Gap slider */}
          <div>
            <div className="flex justify-between text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
              <span>gap</span>
              <span className="font-mono">{gap}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="48"
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
              className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Individual Item settings if selected */}
          {selectedItem !== null && (
            <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-indigo-900 dark:text-indigo-200">
                <span>Selected Item #{selectedItem + 1}</span>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Deselect
                </button>
              </div>
              <div>
                <div className="flex justify-between text-xs text-indigo-700 dark:text-indigo-300 mb-1">
                  <span>flex-grow</span>
                  <span className="font-mono">{itemGrow[selectedItem] || 0}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="5"
                  value={itemGrow[selectedItem] || 0}
                  onChange={(e) => handleGrowChange(selectedItem, Number(e.target.value))}
                  className="w-full h-1.5 bg-indigo-200 dark:bg-indigo-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            </div>
          )}
        </div>

        {/* Live Visual Stage & Code Output */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Playground Container */}
          <div className="flex-1 min-h-[380px] bg-gray-100 dark:bg-gray-900/80 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 flex flex-col justify-start overflow-auto">
            <div
              style={{
                display: 'flex',
                flexDirection: direction,
                justifyContent: justify,
                alignItems: align,
                flexWrap: wrap,
                gap: `${gap}px`,
                minHeight: '280px',
              }}
              className="w-full transition-all duration-200"
            >
              {Array.from({ length: itemCount }).map((_, index) => {
                const grow = itemGrow[index] || 0;
                const isSelected = selectedItem === index;
                return (
                  <div
                    key={index}
                    onClick={() => setSelectedItem(isSelected ? null : index)}
                    style={{
                      flexGrow: grow,
                    }}
                    className={`cursor-pointer rounded-xl p-4 flex flex-col items-center justify-center font-bold text-sm shadow-md transition-all select-none min-w-[70px] min-h-[70px] ${
                      isSelected
                        ? 'bg-indigo-600 text-white ring-4 ring-indigo-300 dark:ring-indigo-700 scale-105'
                        : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700 hover:border-indigo-400'
                    }`}
                  >
                    <span>#{index + 1}</span>
                    {grow > 0 && <span className="text-[10px] font-normal opacity-75">grow: {grow}</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Output Code Box */}
          <div className="bg-white dark:bg-gray-800 p-5 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1 text-xs font-semibold">
                <button
                  onClick={() => setOutputTab('css')}
                  className={`px-3 py-1 rounded-md transition ${
                    outputTab === 'css'
                      ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Vanilla CSS
                </button>
                <button
                  onClick={() => setOutputTab('tailwind')}
                  className={`px-3 py-1 rounded-md transition ${
                    outputTab === 'tailwind'
                      ? 'bg-white dark:bg-gray-800 text-indigo-600 dark:text-indigo-400 shadow-sm'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  Tailwind CSS
                </button>
              </div>

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
              {activeOutput}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
