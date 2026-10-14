'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Pen, Eraser, RotateCcw, RotateCw, Trash2, Download, Copy, Check, ShieldCheck } from 'lucide-react';

export default function SketchCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);
  const [isEraser, setIsEraser] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const [history, setHistory] = useState<ImageData[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [copied, setCopied] = useState(false);

  // Initialize canvas size and default white background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set internal resolution
    canvas.width = 900;
    canvas.height = 550;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (!isTransparent) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    const initialState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory([initialState]);
    setHistoryIndex(0);
  }, [isTransparent]);

  const saveHistory = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const currentData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory((prev) => {
      const updated = prev.slice(0, historyIndex + 1);
      return [...updated, currentData];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;

    if (isEraser) {
      ctx.strokeStyle = isTransparent ? 'rgba(0,0,0,1)' : '#ffffff';
      ctx.globalCompositeOperation = isTransparent ? 'destination-out' : 'source-over';
      ctx.lineWidth = brushSize * 4;
    } else {
      ctx.strokeStyle = brushColor;
      ctx.globalCompositeOperation = 'source-over';
      ctx.lineWidth = brushSize;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false);
      saveHistory();
    }
  };

  const handleUndo = () => {
    if (historyIndex <= 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newIndex = historyIndex - 1;
    ctx.putImageData(history[newIndex], 0, 0);
    setHistoryIndex(newIndex);
  };

  const handleRedo = () => {
    if (historyIndex >= history.length - 1) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newIndex = historyIndex + 1;
    ctx.putImageData(history[newIndex], 0, 0);
    setHistoryIndex(newIndex);
  };

  const handleClear = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!isTransparent) {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    saveHistory();
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `sketch-${Date.now()}.png`;
    link.click();
  };

  const handleCopy = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      try {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        alert('Image copying not supported in this browser.');
      }
    });
  };

  const COLORS = ['#000000', '#2563eb', '#dc2626', '#16a34a', '#9333ea', '#ea580c', '#ffffff'];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Toolbar */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Drawing Tools */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsEraser(false)}
            className={`p-2.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors ${
              !isEraser
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <Pen className="w-4 h-4" />
            <span>Pen</span>
          </button>

          <button
            onClick={() => setIsEraser(true)}
            className={`p-2.5 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-colors ${
              isEraser
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200'
            }`}
          >
            <Eraser className="w-4 h-4" />
            <span>Eraser</span>
          </button>

          {/* Stroke Width */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <span className="text-xs font-semibold text-gray-500">Size:</span>
            {[2, 4, 8, 14].map((sz) => (
              <button
                key={sz}
                onClick={() => setBrushSize(sz)}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  brushSize === sz
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>

          {/* Color Palette */}
          {!isEraser && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              {COLORS.map((c) => (
                <button
                  key={c}
                  onClick={() => setBrushColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-5 h-5 rounded-full border border-gray-300 transition-transform ${
                    brushColor === c ? 'scale-125 ring-2 ring-blue-500' : 'hover:scale-110'
                  }`}
                />
              ))}
              <input
                type="color"
                value={brushColor}
                onChange={(e) => setBrushColor(e.target.value)}
                className="w-6 h-6 rounded cursor-pointer border-none bg-transparent"
                title="Custom Color"
              />
            </div>
          )}
        </div>

        {/* Canvas Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 text-gray-700 dark:text-gray-300"
            title="Undo"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 disabled:opacity-40 text-gray-700 dark:text-gray-300"
            title="Redo"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleClear}
            className="p-2 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/20"
            title="Clear Canvas"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>Copy</span>
          </button>
          <button
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>

      {/* Drawing Canvas Board */}
      <div className="rounded-3xl border-2 border-gray-300 dark:border-gray-800 overflow-hidden shadow-lg bg-white dark:bg-gray-950 flex justify-center items-center relative">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full max-w-[900px] h-[500px] touch-none cursor-crosshair"
        />
      </div>

      {/* Signature & Export Options */}
      <div className="flex flex-wrap items-center justify-between text-xs text-gray-500 gap-4">
        <label className="inline-flex items-center gap-2 cursor-pointer font-medium text-gray-700 dark:text-gray-300">
          <input
            type="checkbox"
            checked={isTransparent}
            onChange={(e) => setIsTransparent(e.target.checked)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span>Transparent Canvas (Recommended for digital signatures)</span>
        </label>
        <span className="flex items-center gap-1 text-green-600">
          <ShieldCheck className="w-4 h-4" />
          100% Client-Side. No drawings leave your browser.
        </span>
      </div>
    </div>
  );
}
