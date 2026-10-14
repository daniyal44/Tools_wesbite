'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Download, Copy, Check, Sparkles, Sliders, Code2 } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

interface ThemeConfig {
  name: string;
  background: string;
  text: string;
  keyword: string;
  string: string;
  comment: string;
  number: string;
  function: string;
  windowBg: string;
}

const THEMES: Record<string, ThemeConfig> = {
  dracula: {
    name: 'Dracula',
    background: '#282a36',
    text: '#f8f8f2',
    keyword: '#ff79c6',
    string: '#f1fa8c',
    comment: '#6272a4',
    number: '#bd93f9',
    function: '#50fa7b',
    windowBg: '#1e1f29',
  },
  oneDark: {
    name: 'One Dark',
    background: '#282c34',
    text: '#abb2bf',
    keyword: '#c678dd',
    string: '#98c379',
    comment: '#5c6370',
    number: '#d19a66',
    function: '#61afef',
    windowBg: '#21252b',
  },
  monokai: {
    name: 'Monokai',
    background: '#272822',
    text: '#f8f8f2',
    keyword: '#f92672',
    string: '#e6db74',
    comment: '#75715e',
    number: '#ae81ff',
    function: '#a6e22e',
    windowBg: '#1e1f1c',
  },
  nord: {
    name: 'Nord',
    background: '#2e3440',
    text: '#d8dee9',
    keyword: '#81a1c1',
    string: '#a3be8c',
    comment: '#616e88',
    number: '#b48ead',
    function: '#88c0d0',
    windowBg: '#242933',
  },
  synthwave: {
    name: 'Synthwave',
    background: '#262335',
    text: '#f92aad',
    keyword: '#fede5d',
    string: '#ff7edb',
    comment: '#614d85',
    number: '#36f9f6',
    function: '#72f1b8',
    windowBg: '#1b1828',
  },
  githubLight: {
    name: 'GitHub Light',
    background: '#ffffff',
    text: '#24292e',
    keyword: '#d73a49',
    string: '#032f62',
    comment: '#6a737d',
    number: '#005cc5',
    function: '#6f42c1',
    windowBg: '#f6f8fa',
  },
};

const GRADIENTS = [
  { id: 'sunset', label: 'Sunset Glow', css: 'linear-gradient(135deg, #ff0844 0%, #ffb199 100%)' },
  { id: 'ocean', label: 'Ocean Breeze', css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 'midnight', label: 'Midnight Neon', css: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
  { id: 'emerald', label: 'Emerald Dusk', css: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)' },
  { id: 'cotton', label: 'Cotton Candy', css: 'linear-gradient(135deg, #b721ff 0%, #21d4fd 100%)' },
  { id: 'carbon', label: 'Dark Carbon', css: 'linear-gradient(135deg, #232526 0%, #414345 100%)' },
  { id: 'transparent', label: 'Transparent', css: 'transparent' },
];

const DEFAULT_CODE = `// Zevylo Code to Image Generator
async function fetchTools() {
  const response = await fetch('/api/tools');
  const data = await response.json();
  console.log('Active Tools:', data.total);
  return data.tools;
}`;

export default function CodeToImage() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [title, setTitle] = useState('script.ts');
  const [theme, setTheme] = useState('dracula');
  const [gradient, setGradient] = useState(GRADIENTS[0].id);
  const [padding, setPadding] = useState(32);
  const [fontSize, setFontSize] = useState(14);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [showWindowControls, setShowWindowControls] = useState(true);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const selectedTheme = THEMES[theme] || THEMES.dracula;
  const selectedGradient = GRADIENTS.find((g) => g.id === gradient) || GRADIENTS[0];

  const lines = code.split('\n');

  // Syntax colorizer for tokens
  const renderLine = (line: string) => {
    // Basic regex-based token coloring
    const parts = line.split(/(\/\/[^\n]*|".*?"|'.*?'|`.*?`|\b(?:function|const|let|var|return|async|await|import|from|export|default|if|else|class)\b|\b\d+\b)/g);
    
    return parts.map((part, i) => {
      if (!part) return null;
      if (part.startsWith('//')) {
        return <span key={i} style={{ color: selectedTheme.comment, fontStyle: 'italic' }}>{part}</span>;
      }
      if (part.startsWith('"') || part.startsWith("'") || part.startsWith('`')) {
        return <span key={i} style={{ color: selectedTheme.string }}>{part}</span>;
      }
      if (/^\b(?:function|const|let|var|return|async|await|import|from|export|default|if|else|class)\b$/.test(part)) {
        return <span key={i} style={{ color: selectedTheme.keyword, fontWeight: 'bold' }}>{part}</span>;
      }
      if (/^\d+$/.test(part)) {
        return <span key={i} style={{ color: selectedTheme.number }}>{part}</span>;
      }
      return <span key={i} style={{ color: selectedTheme.text }}>{part}</span>;
    });
  };

  const drawToCanvas = useCallback((): HTMLCanvasElement | null => {
    const card = cardRef.current;
    if (!card) return null;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const scale = 2; // High-DPI export
    const width = card.offsetWidth;
    const height = card.offsetHeight;

    canvas.width = width * scale;
    canvas.height = height * scale;
    ctx.scale(scale, scale);

    // Draw background gradient
    if (selectedGradient.id !== 'transparent') {
      const grad = ctx.createLinearGradient(0, 0, width, height);
      if (selectedGradient.id === 'sunset') {
        grad.addColorStop(0, '#ff0844');
        grad.addColorStop(1, '#ffb199');
      } else if (selectedGradient.id === 'ocean') {
        grad.addColorStop(0, '#4facfe');
        grad.addColorStop(1, '#00f2fe');
      } else if (selectedGradient.id === 'midnight') {
        grad.addColorStop(0, '#0f2027');
        grad.addColorStop(0.5, '#203a43');
        grad.addColorStop(1, '#2c5364');
      } else if (selectedGradient.id === 'emerald') {
        grad.addColorStop(0, '#0ba360');
        grad.addColorStop(1, '#3cba92');
      } else if (selectedGradient.id === 'cotton') {
        grad.addColorStop(0, '#b721ff');
        grad.addColorStop(1, '#21d4fd');
      } else {
        grad.addColorStop(0, '#232526');
        grad.addColorStop(1, '#414345');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    } else {
      ctx.clearRect(0, 0, width, height);
    }

    // Window position
    const winX = padding;
    const winY = padding;
    const winW = width - padding * 2;
    const winH = height - padding * 2;
    const radius = 12;

    // Draw window shadow
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.35)';
    ctx.shadowBlur = 25;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 12;

    // Draw window background
    ctx.fillStyle = selectedTheme.background;
    ctx.beginPath();
    ctx.roundRect(winX, winY, winW, winH, radius);
    ctx.fill();
    ctx.restore();

    // Window header
    const headerH = 38;
    ctx.fillStyle = selectedTheme.windowBg;
    ctx.beginPath();
    ctx.roundRect(winX, winY, winW, headerH, [radius, radius, 0, 0]);
    ctx.fill();

    // Draw window dots
    if (showWindowControls) {
      const dotY = winY + headerH / 2;
      const dotRadius = 5.5;
      
      // Close (red)
      ctx.fillStyle = '#ff5f56';
      ctx.beginPath();
      ctx.arc(winX + 16, dotY, dotRadius, 0, Math.PI * 2);
      ctx.fill();

      // Minimize (yellow)
      ctx.fillStyle = '#ffbd2e';
      ctx.beginPath();
      ctx.arc(winX + 32, dotY, dotRadius, 0, Math.PI * 2);
      ctx.fill();

      // Maximize (green)
      ctx.fillStyle = '#27c93f';
      ctx.beginPath();
      ctx.arc(winX + 48, dotY, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw title
    if (title) {
      ctx.font = '12px "SF Pro Text", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
      ctx.fillStyle = selectedTheme.comment;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(title, winX + winW / 2, winY + headerH / 2);
    }

    // Draw Code Lines
    const lineHeight = fontSize * 1.6;
    const codeStartY = winY + headerH + 18;
    const codeStartX = winX + (showLineNumbers ? 50 : 20);

    ctx.font = `${fontSize}px "JetBrains Mono", Menlo, Monaco, Consolas, "Courier New", monospace`;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';

    lines.forEach((lineText, idx) => {
      const y = codeStartY + idx * lineHeight;

      // Line numbers
      if (showLineNumbers) {
        ctx.fillStyle = selectedTheme.comment;
        ctx.textAlign = 'right';
        ctx.fillText(String(idx + 1), winX + 36, y);
      }

      // Line text
      ctx.fillStyle = selectedTheme.text;
      ctx.textAlign = 'left';
      ctx.fillText(lineText, codeStartX, y);
    });

    return canvas;
  }, [selectedGradient, padding, selectedTheme, showWindowControls, title, fontSize, lines, showLineNumbers]);

  const handleDownload = () => {
    setDownloading(true);
    try {
      const canvas = drawToCanvas();
      if (!canvas) return;

      const link = document.createElement('a');
      link.download = `${title.replace(/\.[^/.]+$/, '') || 'code'}-zevylo.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setDownloading(false);
    }
  };

  const handleCopyImage = async () => {
    try {
      const canvas = drawToCanvas();
      if (!canvas) return;

      canvas.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } catch {
      await copyToClipboard(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Configuration Toolbar */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 shadow-sm space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
          <div className="flex items-center gap-2 text-lg font-bold text-gray-900 dark:text-gray-100">
            <Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Customize Code Card</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyImage}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied PNG!' : 'Copy Image'}</span>
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export High-Res PNG</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full h-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs px-2.5 font-medium"
            >
              {Object.entries(THEMES).map(([k, v]) => (
                <option key={k} value={k}>{v.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">Background</label>
            <select
              value={gradient}
              onChange={(e) => setGradient(e.target.value)}
              className="w-full h-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs px-2.5 font-medium"
            >
              {GRADIENTS.map((g) => (
                <option key={g.id} value={g.id}>{g.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">Padding</label>
            <select
              value={padding}
              onChange={(e) => setPadding(Number(e.target.value))}
              className="w-full h-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs px-2.5 font-medium"
            >
              <option value={16}>Compact (16px)</option>
              <option value={32}>Medium (32px)</option>
              <option value={48}>Spacious (48px)</option>
              <option value={64}>Hero (64px)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">Font Size</label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full h-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs px-2.5 font-medium"
            >
              <option value={12}>12px</option>
              <option value={14}>14px</option>
              <option value={16}>16px</option>
              <option value={18}>18px</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 block mb-1">Window Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. app.ts"
              className="w-full h-9 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs px-2.5 font-medium"
            />
          </div>

          <div className="flex items-center gap-3 pt-5">
            <label className="inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={showLineNumbers}
                onChange={(e) => setShowLineNumbers(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Lines</span>
            </label>
            <label className="inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer">
              <input
                type="checkbox"
                checked={showWindowControls}
                onChange={(e) => setShowWindowControls(e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span>Dots</span>
            </label>
          </div>
        </div>
      </div>

      {/* Main Workspace: Code Input & Visual Card Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Code Input Area */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-300">
            <span className="flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-blue-600" />
              Source Code
            </span>
            <span className="text-xs text-gray-400">{lines.length} lines</span>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
            className="w-full rounded-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 p-4 font-mono text-sm leading-relaxed outline-none focus:ring-2 focus:ring-blue-500 shadow-inner"
            placeholder="Paste code snippet here..."
          />
        </div>

        {/* Live Visual Card Preview */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-sm font-semibold text-gray-700 dark:text-gray-300">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Real-time Card Preview
            </span>
            <span className="text-xs text-gray-400">Ray.so Quality • 2x DPI</span>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900/50 p-4 flex items-center justify-center">
            {/* The Renderable Card Container */}
            <div
              ref={cardRef}
              style={{
                background: selectedGradient.css,
                padding: `${padding}px`,
                minWidth: '420px',
                maxWidth: '100%',
              }}
              className="rounded-2xl transition-all duration-200"
            >
              {/* Window Box */}
              <div
                style={{
                  backgroundColor: selectedTheme.background,
                  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                }}
                className="rounded-xl overflow-hidden border border-white/10"
              >
                {/* Window Header */}
                <div
                  style={{ backgroundColor: selectedTheme.windowBg }}
                  className="px-4 py-2.5 flex items-center justify-between border-b border-black/10 select-none"
                >
                  {showWindowControls ? (
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                  ) : <div />}
                  <span
                    style={{ color: selectedTheme.comment }}
                    className="text-xs font-mono font-medium truncate max-w-[200px]"
                  >
                    {title}
                  </span>
                  <div className="w-10" />
                </div>

                {/* Code Body */}
                <div
                  style={{
                    fontSize: `${fontSize}px`,
                    lineHeight: 1.6,
                    padding: '16px 20px',
                  }}
                  className="font-mono overflow-x-auto whitespace-pre selection:bg-blue-500/30"
                >
                  {lines.map((l, idx) => (
                    <div key={idx} className="flex gap-4">
                      {showLineNumbers && (
                        <span
                          style={{ color: selectedTheme.comment }}
                          className="w-6 text-right select-none opacity-50 shrink-0"
                        >
                          {idx + 1}
                        </span>
                      )}
                      <span className="flex-1">{renderLine(l)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
