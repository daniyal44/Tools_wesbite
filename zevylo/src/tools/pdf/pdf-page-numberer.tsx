'use client';

import React, { useState } from 'react';
import { Upload, Download, FileText, CheckCircle, ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { formatBytes } from '@/lib/utils';

export default function PdfPageNumberer() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [position, setPosition] = useState<'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-center' | 'top-right' | 'top-left'>('bottom-center');
  const [format, setFormat] = useState<'page-x-of-y' | 'x-of-y' | 'simple'>('page-x-of-y');
  const [startNumber, setStartNumber] = useState<number>(1);
  const [margin, setMargin] = useState<number>(30);
  const [fontSize, setFontSize] = useState<number>(11);
  const [colorHex, setColorHex] = useState<string>('#374151');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f && (f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf'))) {
      setFile(f);
      setSuccess(false);
      setError(null);
      try {
        const buffer = await f.arrayBuffer();
        const doc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        setPageCount(doc.getPageCount());
      } catch (err: any) {
        setError('Failed to inspect PDF: ' + (err.message || 'Corrupt or encrypted PDF'));
      }
    }
  };

  const processAndDownload = async () => {
    if (!file) return;
    setIsProcessing(true);
    setError(null);

    try {
      const buffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const totalPages = pdfDoc.getPageCount();

      const r = (parseInt(colorHex.slice(1, 3), 16) || 0) / 255;
      const g = (parseInt(colorHex.slice(3, 5), 16) || 0) / 255;
      const b = (parseInt(colorHex.slice(5, 7), 16) || 0) / 255;

      const pages = pdfDoc.getPages();
      pages.forEach((page, idx) => {
        const currentNum = startNumber + idx;
        let text = '';
        if (format === 'page-x-of-y') {
          text = `Page ${currentNum} of ${totalPages + startNumber - 1}`;
        } else if (format === 'x-of-y') {
          text = `${currentNum} / ${totalPages + startNumber - 1}`;
        } else {
          text = `${currentNum}`;
        }

        const textWidth = font.widthOfTextAtSize(text, fontSize);
        const { width, height } = page.getSize();

        let x = 0;
        let y = 0;

        // Position coordinates
        if (position === 'bottom-center') {
          x = (width - textWidth) / 2;
          y = margin;
        } else if (position === 'bottom-right') {
          x = width - textWidth - margin;
          y = margin;
        } else if (position === 'bottom-left') {
          x = margin;
          y = margin;
        } else if (position === 'top-center') {
          x = (width - textWidth) / 2;
          y = height - margin - fontSize;
        } else if (position === 'top-right') {
          x = width - textWidth - margin;
          y = height - margin - fontSize;
        } else if (position === 'top-left') {
          x = margin;
          y = height - margin - fontSize;
        }

        page.drawText(text, {
          x,
          y,
          size: fontSize,
          font,
          color: rgb(r, g, b),
        });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes as BlobPart], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `numbered-${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSuccess(true);
    } catch (err: any) {
      setError('Error stamping page numbers: ' + (err.message || 'Unknown error'));
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Box */}
      <div className="rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 text-center transition-all hover:border-blue-500">
        <input
          type="file"
          id="pdf-upload"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="pdf-upload" className="cursor-pointer space-y-3 block">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
            <Upload className="w-7 h-7" />
          </div>
          <div>
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100">
              {file ? file.name : 'Upload PDF Document'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {file
                ? `${formatBytes(file.size)} • ${pageCount ? `${pageCount} pages detected` : 'Ready'}`
                : 'Drag and drop your PDF here, or click to browse'}
            </p>
          </div>
        </label>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Settings Grid */}
      {file && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wider">
            Page Numbering Options
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            {/* Position */}
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">Placement</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value as any)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="bottom-center">Bottom Center (Footer)</option>
                <option value="bottom-right">Bottom Right (Footer)</option>
                <option value="bottom-left">Bottom Left (Footer)</option>
                <option value="top-center">Top Center (Header)</option>
                <option value="top-right">Top Right (Header)</option>
                <option value="top-left">Top Left (Header)</option>
              </select>
            </div>

            {/* Format */}
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">Numbering Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="page-x-of-y">Page X of Y (e.g. Page 1 of 12)</option>
                <option value="x-of-y">X / Y (e.g. 1 / 12)</option>
                <option value="simple">Simple Digit (e.g. 1)</option>
              </select>
            </div>

            {/* Start Number */}
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">Start Number</label>
              <input
                type="number"
                min="1"
                value={startNumber}
                onChange={(e) => setStartNumber(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Margin Offset */}
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">Margin from Edge (px)</label>
              <input
                type="number"
                min="10"
                max="100"
                value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value) || 30)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Font Size */}
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">Font Size (pt)</label>
              <input
                type="number"
                min="8"
                max="36"
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value) || 11)}
                className="w-full rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 font-semibold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Color */}
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1.5">Text Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={colorHex}
                  onChange={(e) => setColorHex(e.target.value)}
                  className="w-10 h-9 rounded-xl border border-gray-200 dark:border-gray-800 bg-transparent cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={colorHex}
                  onChange={(e) => setColorHex(e.target.value)}
                  className="flex-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 px-3 py-2 font-mono text-gray-900 dark:text-gray-100 text-xs"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between flex-wrap gap-4">
            <span className="text-xs text-gray-500 flex items-center gap-1.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              100% In-Browser Privacy • Zero cloud uploads
            </span>

            <button
              onClick={processAndDownload}
              disabled={isProcessing}
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-500 disabled:opacity-50 transition-colors flex items-center gap-2 shadow-lg shadow-blue-600/20"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Stamping Pages...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Insert Page Numbers &amp; Download</span>
                </>
              )}
            </button>
          </div>

          {success && (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>Page numbers added successfully! Your numbered PDF has been downloaded.</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
