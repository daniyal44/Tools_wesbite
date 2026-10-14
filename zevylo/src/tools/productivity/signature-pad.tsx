'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Download, Trash2, Undo2, Copy, Check, PenTool } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  points: Point[];
  color: string;
  width: number;
}

const PEN_COLORS = [
  { name: 'Black', hex: '#0f172a' },
  { name: 'Navy Blue', hex: '#1e3a8a' },
  { name: 'Royal Blue', hex: '#2563eb' },
  { name: 'Dark Green', hex: '#14532d' },
];

export default function SignaturePad() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penColor, setPenColor] = useState('#0f172a');
  const [penWidth, setPenWidth] = useState(3);
  const [transparentBg, setTransparentBg] = useState(true);
  const [copied, setCopied] = useState(false);

  // Redraw all strokes on canvas
  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!transparentBg) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const allStrokes = currentStroke ? [...strokes, currentStroke] : strokes;

    for (const stroke of allStrokes) {
      if (stroke.points.length === 0) continue;
      ctx.beginPath();
      ctx.strokeStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      if (stroke.points.length === 1) {
        ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.width / 2, 0, Math.PI * 2);
        ctx.fillStyle = stroke.color;
        ctx.fill();
      } else {
        ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
        for (let i = 1; i < stroke.points.length; i++) {
          const xc = (stroke.points[i].x + stroke.points[i - 1].x) / 2;
          const yc = (stroke.points[i].y + stroke.points[i - 1].y) / 2;
          ctx.quadraticCurveTo(stroke.points[i - 1].x, stroke.points[i - 1].y, xc, yc);
        }
        ctx.lineTo(stroke.points[stroke.points.length - 1].x, stroke.points[stroke.points.length - 1].y);
        ctx.stroke();
      }
    }
  }, [strokes, currentStroke, transparentBg]);

  useEffect(() => {
    redraw();
  }, [redraw]);

  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      if (e.touches.length === 0) return null;
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const p = getCanvasCoords(e);
    if (!p) return;
    setIsDrawing(true);
    setCurrentStroke({ points: [p], color: penColor, width: penWidth });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !currentStroke) return;
    const p = getCanvasCoords(e);
    if (!p) return;
    setCurrentStroke((prev) => (prev ? { ...prev, points: [...prev.points, p] } : null));
  };

  const stopDrawing = () => {
    if (isDrawing && currentStroke) {
      setStrokes((prev) => [...prev, currentStroke]);
      setCurrentStroke(null);
      setIsDrawing(false);
    }
  };

  const handleUndo = () => {
    setStrokes((prev) => prev.slice(0, -1));
  };

  const handleClear = () => {
    setStrokes([]);
    setCurrentStroke(null);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `signature-${Date.now()}.png`;
    a.click();
  };

  const handleCopy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch {
      alert('Clipboard image copy not supported in this browser. Please use Download PNG.');
    }
  };

  return (
    <div className="space-y-8">
      {/* Canvas Card */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
            <PenTool className="h-4 w-4 text-blue-600" /> Digital Signature Pad
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleUndo}
              disabled={strokes.length === 0}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 disabled:opacity-40"
            >
              <Undo2 className="h-3.5 w-3.5" /> Undo
            </button>
            <button
              onClick={handleClear}
              disabled={strokes.length === 0}
              className="inline-flex items-center gap-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 disabled:opacity-40"
            >
              <Trash2 className="h-3.5 w-3.5" /> Clear
            </button>
            <button
              onClick={handleCopy}
              disabled={strokes.length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 disabled:opacity-40"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={handleDownload}
              disabled={strokes.length === 0}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-700 shadow-sm disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5" /> Download PNG
            </button>
          </div>
        </div>

        {/* Signature Canvas */}
        <div className="relative rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-hidden bg-slate-50/50 dark:bg-gray-950 touch-none">
          <canvas
            ref={canvasRef}
            width={800}
            height={320}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full h-72 cursor-crosshair block"
          />

          {strokes.length === 0 && !isDrawing && (
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 select-none">
              <span className="text-xl font-medium tracking-wide">Sign your name here</span>
              <span className="text-xs mt-1">Use your mouse, trackpad, or finger on touchscreens</span>
            </div>
          )}

          {/* Baseline guide line */}
          <div className="pointer-events-none absolute bottom-16 left-8 right-8 border-b border-gray-300 dark:border-gray-800" />
        </div>
      </div>

      {/* Settings & Styling Controls */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
        <div className="grid gap-6 sm:grid-cols-3">
          {/* Pen Color */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Pen Color</label>
            <div className="flex gap-2">
              {PEN_COLORS.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => setPenColor(c.hex)}
                  title={c.name}
                  className={`h-8 w-8 rounded-full border-2 transition-transform ${
                    penColor === c.hex ? 'scale-110 border-blue-500 ring-2 ring-blue-500/20' : 'border-transparent'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Pen Width */}
          <div>
            <label htmlFor="pen-thickness-range" className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
              Pen Thickness: {penWidth}px
            </label>
            <input
              id="pen-thickness-range"
              type="range"
              min="1"
              max="8"
              step="1"
              value={penWidth}
              onChange={(e) => setPenWidth(parseInt(e.target.value, 10))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          {/* Background Toggle */}
          <div>
            <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Background</label>
            <label className="inline-flex items-center gap-2 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={transparentBg}
                onChange={(e) => setTransparentBg(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                Transparent PNG Background
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
