'use client';
import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://zevylo.netlify.app');
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(4);
  const [errorCorrection, setErrorCorrection] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const [colorDark, setColorDark] = useState('#000000');
  const [colorLight, setColorLight] = useState('#ffffff');
  const [qrDataUrl, setQrDataUrl] = useState('');

  useEffect(() => {
    let isCurrent = true;
    if (!text) {
      const timer = setTimeout(() => {
        if (isCurrent) setQrDataUrl('');
      }, 0);
      return () => {
        isCurrent = false;
        clearTimeout(timer);
      };
    }

    QRCode.toDataURL(text, {
      width: size,
      margin: margin,
      errorCorrectionLevel: errorCorrection,
      color: {
        dark: colorDark,
        light: colorLight,
      },
    })
      .then((url) => {
        if (isCurrent) setQrDataUrl(url);
      })
      .catch((err) => {
        console.error(err);
      });

    return () => {
      isCurrent = false;
    };
  }, [text, size, margin, errorCorrection, colorDark, colorLight]);

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const a = document.createElement('a');
    a.href = qrDataUrl;
    a.download = 'qrcode.png';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const copyImage = async () => {
    if (!qrDataUrl) return;
    try {
      const res = await fetch(qrDataUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);
      alert('Copied to clipboard!');
    } catch {
      alert('Failed to copy image. Your browser might not support this feature.');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-6 rounded-xl border p-4 bg-white dark:bg-gray-900">
        <h2 className="text-xl font-bold">QR Code Settings</h2>
        
        <div>
          <label className="block text-sm font-medium mb-1">Text or URL</label>
          <textarea 
            className="w-full border p-2 rounded dark:bg-gray-800" 
            rows={3} 
            value={text} 
            onChange={e => setText(e.target.value)} 
            placeholder="Enter text or URL here..."
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Size (px)</label>
            <select className="w-full border p-2 rounded dark:bg-gray-800" value={size} onChange={e => setSize(Number(e.target.value))}>
              <option value={128}>128 x 128</option>
              <option value={256}>256 x 256</option>
              <option value={512}>512 x 512</option>
              <option value={1024}>1024 x 1024</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Error Correction</label>
            <select className="w-full border p-2 rounded dark:bg-gray-800" value={errorCorrection} onChange={e => setErrorCorrection(e.target.value as 'L' | 'M' | 'Q' | 'H')}>
              <option value="L">Low (~7%)</option>
              <option value="M">Medium (~15%)</option>
              <option value="Q">Quartile (~25%)</option>
              <option value="H">High (~30%)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Margin (blocks)</label>
            <select className="w-full border p-2 rounded dark:bg-gray-800" value={margin} onChange={e => setMargin(Number(e.target.value))}>
              <option value={0}>0 (None)</option>
              <option value={1}>1 (Compact)</option>
              <option value={2}>2 (Standard)</option>
              <option value={4}>4 (Default)</option>
              <option value={6}>6 (Wide)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Foreground Color</label>
            <input type="color" className="w-full h-10 border p-1 rounded cursor-pointer" value={colorDark} onChange={e => setColorDark(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Background Color</label>
            <input type="color" className="w-full h-10 border p-1 rounded cursor-pointer" value={colorLight} onChange={e => setColorLight(e.target.value)} />
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="rounded-xl border p-4 bg-gray-50 dark:bg-gray-800 flex flex-col items-center justify-center min-h-[400px]">
          <h2 className="text-xl font-bold w-full mb-4 text-left">Preview</h2>
          
          {qrDataUrl ? (
            <div className="flex flex-col items-center gap-6">
              <div className="p-4 bg-white rounded-xl shadow-sm border inline-block">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrDataUrl} alt="Generated QR Code" style={{ maxWidth: '100%', maxHeight: '300px' }} />
              </div>
              <div className="flex gap-4">
                <button onClick={handleDownload} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">Download PNG</button>
                <button onClick={copyImage} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">Copy Image</button>
              </div>
            </div>
          ) : (
            <div className="text-gray-400">Enter text to generate QR code</div>
          )}
        </div>
      </div>
    </div>
  );
}
