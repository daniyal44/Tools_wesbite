'use client';

import React, { useState, useRef } from 'react';
import { Edit3, Download, Printer, Palette, Sliders } from 'lucide-react';

const SAMPLE_TEXT = `Dear Professor Mitchell,

Here is my homework assignment for the Computer Science module. 
I have completed the algorithmic proofs on time and reviewed all edge cases.

Key Highlights:
1. Dynamic programming optimization achieved O(N) linear time complexity.
2. Space consumption was reduced to constant O(1) auxiliary memory.

Thank you for your guidance throughout this semester!
- Alex`;

export default function HandwritingGenerator() {
  const [text, setText] = useState<string>(SAMPLE_TEXT);
  const [fontStyle, setFontStyle] = useState<'cursive' | 'casual' | 'script'>('cursive');
  const [inkColor, setInkColor] = useState<string>('#1e3a8a'); // dark navy blue
  const [paperType, setPaperType] = useState<'lined' | 'plain' | 'yellow'>('lined');
  const [fontSize, setFontSize] = useState<number>(18);
  const [lineHeight, setLineHeight] = useState<number>(36);
  const previewRef = useRef<HTMLDivElement>(null);

  const getFontFamily = () => {
    switch (fontStyle) {
      case 'cursive':
        return '"Brush Script MT", "Segoe Script", "Apple Chancery", cursive';
      case 'casual':
        return '"Comic Sans MS", "Chalkboard SE", "Comic Neue", cursive, sans-serif';
      case 'script':
      default:
        return '"Snell Roundhand", "Bradley Hand", "Caveat", cursive';
    }
  };

  const getPaperBackground = () => {
    switch (paperType) {
      case 'lined':
        return 'linear-gradient(transparent, transparent 35px, #93c5fd 35px, #93c5fd 36px)';
      case 'yellow':
        return 'linear-gradient(transparent, transparent 35px, #fde047 35px, #fde047 36px)';
      case 'plain':
      default:
        return 'none';
    }
  };

  const getPaperBgColor = () => {
    switch (paperType) {
      case 'yellow':
        return '#fef9c3'; // yellow legal pad
      case 'lined':
      case 'plain':
      default:
        return '#ffffff';
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPng = async () => {
    if (!previewRef.current) return;
    const canvas = document.createElement('canvas');
    const width = 800;
    const height = Math.max(900, previewRef.current.offsetHeight + 60);
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background fill
    ctx.fillStyle = getPaperBgColor();
    ctx.fillRect(0, 0, width, height);

    // Margin red line if lined
    if (paperType === 'lined' || paperType === 'yellow') {
      ctx.strokeStyle = '#f87171'; // red vertical margin
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(80, 0);
      ctx.lineTo(80, height);
      ctx.stroke();

      // Horizontal lines
      ctx.strokeStyle = paperType === 'yellow' ? '#fde047' : '#bfdbfe';
      ctx.lineWidth = 1;
      for (let y = 60; y < height; y += lineHeight) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    // Draw text
    ctx.fillStyle = inkColor;
    ctx.font = `${fontSize}px ${fontStyle === 'cursive' ? 'cursive' : 'sans-serif'}`;
    const lines = text.split('\n');
    let currentY = 56;
    for (const line of lines) {
      ctx.fillText(line, paperType === 'plain' ? 40 : 96, currentY);
      currentY += lineHeight;
    }

    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `handwritten-notes-${Date.now()}.png`;
    a.click();
  };

  return (
    <div className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between flex-wrap gap-4 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-gray-900 dark:text-white">Realistic Handwritten Notes Generator</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPng}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white text-xs font-semibold transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PNG
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-colors shadow-lg shadow-amber-500/20"
          >
            <Printer className="w-4 h-4" />
            Print to PDF
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
        {/* Controls Column */}
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-4">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider text-amber-400">
              Note Text Content
            </h3>
            <textarea
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your notes or homework assignment text here..."
              className="w-full p-4 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-amber-500/50 leading-relaxed"
            />
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-5">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-sky-400" />
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                Style & Paper Formatting
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-medium">Handwriting Font Style</label>
                <select
                  value={fontStyle}
                  onChange={(e) => setFontStyle(e.target.value as 'cursive' | 'casual' | 'script')}
                  className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
                >
                  <option value="cursive">Classic Cursive Script</option>
                  <option value="casual">Casual Student Handwriting</option>
                  <option value="script">Elegant Calligraphic Pen</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1.5 font-medium">Paper Texture</label>
                <select
                  value={paperType}
                  onChange={(e) => setPaperType(e.target.value as 'lined' | 'plain' | 'yellow')}
                  className="w-full px-3 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white text-xs"
                >
                  <option value="lined">Blue Lined College Ruled</option>
                  <option value="yellow">Yellow Legal Pad</option>
                  <option value="plain">Clean Blank Parchment</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" /> Ink Pen Color
              </label>
              <div className="flex gap-3">
                {[
                  { name: 'Navy Blue', color: '#1e3a8a' },
                  { name: 'Deep Black', color: '#09090b' },
                  { name: 'Fountain Pen', color: '#1e1b4b' },
                  { name: 'Red Pen', color: '#b91c1c' },
                ].map((item) => (
                  <button
                    key={item.color}
                    onClick={() => setInkColor(item.color)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      inkColor === item.color
                        ? 'border-amber-400 bg-gray-100 dark:bg-white/10 text-gray-900 dark:text-white ring-1 ring-amber-400'
                        : 'border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-zinc-200'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Font Size ({fontSize}px)</label>
                <input
                  type="range"
                  min="14"
                  max="28"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Line Height ({lineHeight}px)</label>
                <input
                  type="range"
                  min="28"
                  max="48"
                  value={lineHeight}
                  onChange={(e) => setLineHeight(parseInt(e.target.value))}
                  className="w-full accent-amber-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Live Handwritten Notebook Sheet Preview */}
        <div
          ref={previewRef}
          className="sticky top-6 rounded-2xl shadow-2xl min-h-[600px] border border-zinc-300 p-8 sm:p-12 transition-all relative overflow-hidden"
          style={{
            backgroundColor: getPaperBgColor(),
            backgroundImage: getPaperBackground(),
            backgroundSize: `100% ${lineHeight}px`,
            color: inkColor,
            fontFamily: getFontFamily(),
            fontSize: `${fontSize}px`,
            lineHeight: `${lineHeight}px`,
          }}
        >
          {/* Vertical Red Margin Line */}
          {(paperType === 'lined' || paperType === 'yellow') && (
            <div className="absolute top-0 bottom-0 left-16 sm:left-20 w-[1.5px] bg-red-400/80 pointer-events-none" />
          )}

          <div
            className={`whitespace-pre-wrap select-text ${
              paperType === 'plain' ? 'pl-2' : 'pl-10 sm:pl-12'
            }`}
          >
            {text}
          </div>
        </div>
      </div>
    </div>
  );
}
