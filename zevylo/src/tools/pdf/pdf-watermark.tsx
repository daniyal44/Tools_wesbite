'use client';

import React, { useState } from 'react';
import { Upload, Download, FileText, CheckCircle, Shield } from 'lucide-react';
import { PDFDocument, StandardFonts, degrees, rgb } from 'pdf-lib';
import { formatBytes } from '@/lib/utils';

export default function PdfWatermark() {
  const [file, setFile] = useState<File | null>(null);
  const [watermarkText, setWatermarkText] = useState<string>('CONFIDENTIAL');
  const [opacity, setOpacity] = useState<number>(0.25);
  const [angle, setAngle] = useState<number>(45);
  const [fontSize, setFontSize] = useState<number>(48);
  const [colorHex, setColorHex] = useState<string>('#dc2626'); // red
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))) {
      setFile(f);
      setSuccess(false);
    }
  };

  const applyWatermarkAndDownload = async () => {
    if (!file) return;
    setIsProcessing(true);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

      const r = (parseInt(colorHex.slice(1, 3), 16) || 0) / 255;
      const g = (parseInt(colorHex.slice(3, 5), 16) || 0) / 255;
      const b = (parseInt(colorHex.slice(5, 7), 16) || 0) / 255;

      const text = watermarkText || 'WATERMARK';
      const rad = (angle * Math.PI) / 180;

      for (const page of pdfDoc.getPages()) {
        const { width, height } = page.getSize();
        const textWidth = font.widthOfTextAtSize(text, fontSize);
        // Anchor so the rotated text is centered on the page.
        page.drawText(text, {
          x: width / 2 - (textWidth / 2) * Math.cos(rad),
          y: height / 2 - (textWidth / 2) * Math.sin(rad),
          size: fontSize,
          font,
          color: rgb(r, g, b),
          opacity,
          rotate: degrees(angle),
        });
      }

      const bytes = await pdfDoc.save();
      const blob = new Blob([bytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${file.name.replace(/\.pdf$/i, '')}_watermarked.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      setSuccess(true);
    } catch {
      alert('Error applying watermark. Please ensure the file is a valid, unencrypted PDF document.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Upload Zone */}
      <div className="rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center hover:border-red-500 transition-colors shadow-sm">
        <Upload className="h-10 w-10 text-red-500 mx-auto mb-3" />
        <h3 className="text-base font-bold text-gray-900 dark:text-white">
          {file ? file.name : 'Select PDF Document to Watermark'}
        </h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-4">
          {file
            ? `File size: ${formatBytes(file.size)} | Ready to apply watermark: "${watermarkText}"`
            : 'Stamp contracts and drafts with custom security text. Processed privately in your browser.'}
        </p>

        <label className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer shadow-sm transition-all active:scale-95">
          <FileText className="h-4 w-4" /> {file ? 'Change PDF Document' : 'Choose PDF Document'}
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {file && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm space-y-6">
          {/* Watermark Live Stamp Preview */}
          <div className="relative h-44 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex items-center justify-center overflow-hidden">
            <div
              style={{
                transform: `rotate(-${angle}deg)`,
                opacity: opacity,
                fontSize: `${Math.min(36, fontSize * 0.7)}px`,
                color: colorHex,
              }}
              className="font-black tracking-widest uppercase border-4 border-dashed px-8 py-3 rounded-xl select-none"
            >
              {watermarkText || 'WATERMARK'}
            </div>
            <span className="absolute bottom-2 right-3 text-[10px] text-gray-400">
              Live Stamp Preview
            </span>
          </div>

          {/* Watermark Configuration Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                Watermark Text
              </label>
              <input
                type="text"
                value={watermarkText}
                onChange={(e) => setWatermarkText(e.target.value)}
                placeholder="e.g. CONFIDENTIAL, DRAFT, DO NOT COPY"
                className="w-full text-sm font-bold rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2 text-gray-900 dark:text-white outline-none focus:border-red-500"
              />
              <div className="flex flex-wrap gap-1.5 mt-2">
                {['CONFIDENTIAL', 'DRAFT', 'DO NOT COPY', 'SAMPLE', 'APPROVED'].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setWatermarkText(preset)}
                    className="px-2 py-0.5 rounded text-[10px] font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                Opacity ({Math.round(opacity * 100)}%)
              </label>
              <input
                type="range"
                min="0.1"
                max="0.8"
                step="0.05"
                value={opacity}
                onChange={(e) => setOpacity(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                Angle ({angle}°)
              </label>
              <div className="flex gap-2">
                {[
                  { label: '45° Diagonal', val: 45 },
                  { label: '0° Horizontal', val: 0 },
                ].map((a) => (
                  <button
                    key={a.val}
                    onClick={() => setAngle(a.val)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      angle === a.val
                        ? 'bg-red-600 text-white border-red-600'
                        : 'border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                Font Size ({fontSize} pt)
              </label>
              <input
                type="range"
                min="24"
                max="80"
                step="4"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full accent-red-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                Stamp Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colorHex}
                  onChange={(e) => setColorHex(e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-gray-300 dark:border-gray-700 p-0.5 bg-transparent"
                />
                <span className="text-xs font-mono uppercase text-gray-600 dark:text-gray-300 font-semibold">
                  {colorHex}
                </span>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Shield className="h-4 w-4 text-emerald-500" />
              <span>Zero cloud uploads: your PDF remains completely private</span>
            </div>

            <button
              onClick={applyWatermarkAndDownload}
              disabled={isProcessing}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all active:scale-95 disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              {isProcessing ? 'Applying Watermark...' : 'Download Watermarked PDF'}
            </button>
          </div>

          {success && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-300">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>Watermark successfully stamped and PDF downloaded!</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
