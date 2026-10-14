'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Download, Smile, ShieldCheck } from 'lucide-react';

export default function MemeGenerator() {
  const [imageSrc, setImageSrc] = useState<string>('');
  const [topText, setTopText] = useState('WHEN YOUR CODE RUNS');
  const [bottomText, setBottomText] = useState('ON THE FIRST TRY WITHOUT ERRORS');
  const [fontSize, setFontSize] = useState(38);
  const [uppercase, setUppercase] = useState(true);
  const [textColor, setTextColor] = useState('#ffffff');
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [isProcessing, setIsProcessing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const drawCaptions = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.textAlign = 'center';
    ctx.fillStyle = textColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = Math.max(3, Math.round(fontSize / 7));
    ctx.font = `900 ${fontSize}px Impact, "Arial Black", sans-serif`;

    const top = uppercase ? topText.toUpperCase() : topText;
    const bottom = uppercase ? bottomText.toUpperCase() : bottomText;

    if (top) {
      ctx.strokeText(top, w / 2, fontSize + 20);
      ctx.fillText(top, w / 2, fontSize + 20);
    }

    if (bottom) {
      ctx.strokeText(bottom, w / 2, h - 25);
      ctx.fillText(bottom, w / 2, h - 25);
    }
  }, [textColor, strokeColor, fontSize, uppercase, topText, bottomText]);

  // Render meme on canvas
  const renderMeme = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!imageSrc) {
      // Draw a default meme template background
      canvas.width = 600;
      canvas.height = 450;
      const grad = ctx.createLinearGradient(0, 0, 600, 450);
      grad.addColorStop(0, '#3b82f6');
      grad.addColorStop(1, '#8b5cf6');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 600, 450);

      // Draw playful graphic
      ctx.fillStyle = 'rgba(255,255,255,0.15)';
      ctx.beginPath();
      ctx.arc(300, 225, 120, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        canvas.width = img.naturalWidth || 600;
        canvas.height = img.naturalHeight || 450;
        ctx.drawImage(img, 0, 0);
        drawCaptions(ctx, canvas.width, canvas.height);
      };
      return;
    }

    drawCaptions(ctx, canvas.width, canvas.height);
  }, [imageSrc, drawCaptions]);

  useEffect(() => {
    renderMeme();
  }, [renderMeme]);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    setIsProcessing(true);
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'meme.png';
      link.click();
      URL.revokeObjectURL(url);
      setIsProcessing(false);
    }, 'image/png');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Canvas Display */}
        <div className="md:col-span-7 rounded-3xl border border-gray-200 dark:border-gray-800 bg-gray-950 p-4 flex flex-col items-center justify-center shadow-xl overflow-hidden">
          <canvas
            ref={canvasRef}
            className="max-h-[480px] max-w-full rounded-2xl object-contain shadow-md"
          />
        </div>

        {/* Controls */}
        <div className="md:col-span-5 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
              <Smile className="w-5 h-5 text-amber-500" />
              Meme Text & Style
            </h2>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
              }}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:underline"
            >
              <Upload className="w-3.5 h-3.5" />
              Upload Image
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Top Caption Text
              </label>
              <input
                type="text"
                value={topText}
                onChange={(e) => setTopText(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold uppercase"
                placeholder="TOP CAPTION"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Bottom Caption Text
              </label>
              <input
                type="text"
                value={bottomText}
                onChange={(e) => setBottomText(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-bold uppercase"
                placeholder="BOTTOM CAPTION"
              />
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                <span>Font Size</span>
                <span className="font-mono text-blue-600">{fontSize}px</span>
              </div>
              <input
                type="range"
                min="18"
                max="72"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Text Color</span>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={strokeColor}
                  onChange={(e) => setStrokeColor(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
                />
                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">Outline Stroke</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="upperCheck"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 accent-blue-600"
              />
              <label htmlFor="upperCheck" className="text-xs font-bold text-gray-700 dark:text-gray-300 cursor-pointer">
                Force Uppercase (Classic Meme Style)
              </label>
            </div>

            <button
              onClick={handleDownload}
              disabled={isProcessing}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Download className="w-4 h-4" />
              {isProcessing ? 'Generating...' : 'Download Meme PNG'}
            </button>
          </div>
        </div>
      </div>

      {/* Privacy Badge */}
      <div className="rounded-xl border border-green-200 dark:border-green-900/50 bg-green-50/60 dark:bg-green-950/20 p-4 flex items-center gap-3 text-xs text-green-800 dark:text-green-300">
        <ShieldCheck className="w-5 h-5 shrink-0" />
        <span>
          <strong>No Watermarks & 100% Client-Side:</strong> Memes are generated completely on your device without server uploads.
        </span>
      </div>
    </div>
  );
}
