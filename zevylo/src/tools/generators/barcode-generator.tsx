'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Download, Copy, Check, Barcode as BarcodeIcon, Sliders } from 'lucide-react';

// Code 128 Table B encoding patterns
// Each character is represented by 11 modules: bars and spaces (represented as 0s and 1s)
const CODE128_PATTERNS: string[] = [
  '11011001100', '11001101100', '11001100110', '10010011000', '10010001100', // 0-4
  '10001001100', '10011001000', '10011000100', '10001100100', '11001001000', // 5-9
  '11001000100', '11000100100', '10110011100', '10011011100', '10011001110', // 10-14
  '10111001100', '10011101100', '10011100110', '11001110010', '11001011100', // 15-19
  '11001001110', '11011100100', '11001110100', '11101101110', '11101001100', // 20-24
  '11100101100', '11100100110', '11101100100', '11100110100', '11100110010', // 25-29
  '11011011000', '11011000110', '11000110110', '10100011000', '10001011000', // 30-34
  '10001000110', '10110001000', '10001101000', '10001100010', '11010001000', // 35-39
  '11000101000', '11000100010', '10110111000', '10110001110', '10001101110', // 40-44
  '10111011000', '10111000110', '10001110110', '11101110110', '11010001110', // 45-49
  '11000101110', '11011101000', '11011100010', '11011101110', '11101011000', // 50-54
  '11101000110', '11100010110', '11101101000', '11101100010', '11100011010', // 55-59
  '11101111010', '11001000010', '11110001010', '10100110000', '10100001100', // 60-64
  '10010110000', '10010000110', '10000101100', '10000100110', '10110010000', // 65-69
  '10110000100', '10011010000', '10011000010', '10000110100', '10000110010', // 70-74
  '11000010010', '11001010000', '11110111010', '11000010100', '10001111010', // 75-79
  '10100111100', '10010111100', '10010011110', '10111100100', '10011110100', // 80-84
  '10011110010', '11110100100', '11110010100', '11110010010', '11011011110', // 85-89
  '11011110110', '11110110110', '10101111000', '10100011110', '10001011110', // 90-94
  '10111101000', '10111100010', '11110101000', '11110100010', '10111011110', // 95-99
  '10111101110', '11101011110', '11110101110', '11010000100', '11010010000', // 100-104 (104 = Start B)
  '11010011100', '1100011101011', // 105 = Start C, 106 = STOP
];

const START_CODE_B = 104;
const STOP_CODE = 106;

function encodeCode128B(text: string): { bits: string; valid: boolean } {
  if (!text) return { bits: '', valid: false };

  // Calculate checksum
  let checksum = START_CODE_B;
  const values: number[] = [START_CODE_B];

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i);
    // Code 128B maps ASCII 32 to 126 to values 0 to 94
    if (charCode < 32 || charCode > 126) {
      return { bits: '', valid: false };
    }
    const val = charCode - 32;
    values.push(val);
    checksum += val * (i + 1);
  }

  const checkVal = checksum % 103;
  values.push(checkVal);
  values.push(STOP_CODE);

  // Build binary string
  const bits = values.map((v) => CODE128_PATTERNS[v] || '').join('');
  return { bits, valid: true };
}

export default function BarcodeGenerator() {
  const [text, setText] = useState<string>('ZEVYLO-84920');
  const [barHeight, setBarHeight] = useState<number>(80);
  const [barWidth, setBarWidth] = useState<number>(2);
  const [showLabel, setShowLabel] = useState<boolean>(true);
  const [barColor, setBarColor] = useState<string>('#000000');
  const [bgColor, setBgColor] = useState<string>('#ffffff');
  const [copied, setCopied] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const { bits, valid } = useMemo(() => encodeCode128B(text), [text]);

  const quietZone = 20; // Margin in px
  const totalBarcodeWidth = bits.length * barWidth;
  const svgWidth = totalBarcodeWidth + quietZone * 2;
  const svgHeight = barHeight + (showLabel ? 32 : 10) + quietZone * 2;

  // Render SVG paths for black modules
  const bars = useMemo(() => {
    if (!valid || !bits) return [];
    const elements: { x: number; width: number }[] = [];
    let i = 0;
    while (i < bits.length) {
      if (bits[i] === '1') {
        let run = 0;
        while (i < bits.length && bits[i] === '1') {
          run++;
          i++;
        }
        elements.push({
          x: quietZone + (i - run) * barWidth,
          width: run * barWidth,
        });
      } else {
        i++;
      }
    }
    return elements;
  }, [bits, valid, barWidth, quietZone]);

  const handleDownloadSVG = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgRef.current);
    const blob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `barcode-${text || 'code'}.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgRef.current);
    const img = new Image();
    const svgBlob = new Blob([svgStr], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = svgWidth * 2; // 2x retina scale
      canvas.height = svgHeight * 2;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        canvas.toBlob((blob) => {
          if (!blob) return;
          const a = document.createElement('a');
          const pngUrl = URL.createObjectURL(blob);
          a.href = pngUrl;
          a.download = `barcode-${text || 'code'}.png`;
          a.click();
          URL.revokeObjectURL(pngUrl);
        }, 'image/png');
      }
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const handleCopySVG = () => {
    if (!svgRef.current) return;
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svgRef.current);
    navigator.clipboard.writeText(svgStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const presets = ['SKU-99214', 'INV-2026-001', 'ITEM-A83B', '9780132350884', 'TRACK-US-991'];

  return (
    <div className="space-y-8">
      {/* Barcode Preview Canvas */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm sm:p-8 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
            <BarcodeIcon className="h-5 w-5 text-blue-600" /> Code 128 Standard Barcode
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySVG}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied SVG' : 'Copy SVG'}
            </button>
            <button
              onClick={handleDownloadSVG}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500"
            >
              <Download className="h-3.5 w-3.5" /> SVG
            </button>
            <button
              onClick={handleDownloadPNG}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-sm"
            >
              <Download className="h-3.5 w-3.5" /> PNG
            </button>
          </div>
        </div>

        {/* The SVG element */}
        <div className="max-w-full overflow-x-auto p-4 rounded-xl border border-gray-100 dark:border-gray-800 flex justify-center bg-gray-50/50 dark:bg-gray-800/50">
          {valid ? (
            <svg
              ref={svgRef}
              width={svgWidth}
              height={svgHeight}
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              xmlns="http://www.w3.org/2000/svg"
              className="rounded shadow-sm"
              style={{ backgroundColor: bgColor }}
            >
              <rect width={svgWidth} height={svgHeight} fill={bgColor} />
              {bars.map((bar, idx) => (
                <rect
                  key={idx}
                  x={bar.x}
                  y={quietZone}
                  width={bar.width}
                  height={barHeight}
                  fill={barColor}
                />
              ))}
              {showLabel && (
                <text
                  x={svgWidth / 2}
                  y={quietZone + barHeight + 20}
                  textAnchor="middle"
                  fill={barColor}
                  fontFamily="monospace"
                  fontSize="14"
                  fontWeight="600"
                  letterSpacing="2"
                >
                  {text}
                </text>
              )}
            </svg>
          ) : (
            <div className="p-8 text-center text-sm text-red-500">
              Only standard ASCII printable characters (letters, numbers, basic punctuation) are supported in Code 128.
            </div>
          )}
        </div>
      </div>

      {/* Barcode Configuration Options */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Sliders className="h-4 w-4 text-blue-600" /> Barcode Customization & Text
        </h3>

        <div className="space-y-4">
          <div>
            <label htmlFor="barcode-content-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
              Barcode Text / Value
            </label>
            <input
              id="barcode-content-input"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. SKU-12345 or 9780132350884"
              className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-base font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-gray-400">Sample Presets:</span>
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => setText(p)}
                className="rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2.5 py-1 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Settings Grid */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div>
              <label htmlFor="bar-height-range" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                Bar Height ({barHeight}px)
              </label>
              <input
                id="bar-height-range"
                type="range"
                min="40"
                max="160"
                step="5"
                value={barHeight}
                onChange={(e) => setBarHeight(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="bar-thickness-range" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                Bar Thickness ({barWidth}px)
              </label>
              <input
                id="bar-thickness-range"
                type="range"
                min="1"
                max="4"
                step="0.5"
                value={barWidth}
                onChange={(e) => setBarWidth(parseFloat(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="bar-color-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Bar Color</label>
              <div className="flex items-center gap-2">
                <input
                  id="bar-color-input"
                  type="color"
                  value={barColor}
                  onChange={(e) => setBarColor(e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border border-gray-300 dark:border-gray-700 bg-transparent"
                />
                <span className="text-xs font-mono text-gray-700 dark:text-gray-300">{barColor}</span>
              </div>
            </div>

            <div>
              <label htmlFor="bg-color-input" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Background Color</label>
              <div className="flex items-center gap-2">
                <input
                  id="bg-color-input"
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="h-8 w-10 cursor-pointer rounded border border-gray-300 dark:border-gray-700 bg-transparent"
                />
                <span className="text-xs font-mono text-gray-700 dark:text-gray-300">{bgColor}</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showLabel}
                onChange={(e) => setShowLabel(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Display text label beneath barcode
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
