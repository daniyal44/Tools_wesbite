'use client';

import React, { useState, useMemo } from 'react';
import { Copy, Check, BookOpen, Maximize2, Minimize2, Type, Sparkles } from 'lucide-react';

const SAMPLE_TEXT = `Bionic Reading is a reading system designed to guide your eyes through text with artificial fixation points. By highlighting the initial letters of words, your brain can complete words faster, reducing cognitive load and significantly increasing reading speed and information retention.`;

function convertToBionicWords(text: string, fixationLevel: number) {
  // fixationLevel 1 to 5 corresponds to roughly 30% to 70%
  const ratio = (fixationLevel + 2) / 10;

  const lines = text.split('\n');
  return lines.map((line) => {
    const tokens = line.split(/(\s+)/);
    return tokens.map((token) => {
      if (/^\s+$/.test(token) || !token) {
        return { original: token, bold: '', rest: token, isSpace: true };
      }

      // Find leading non-alphabetical chars if any
      const match = token.match(/^([^a-zA-Z0-9]*)([a-zA-Z0-9]+)([^a-zA-Z0-9]*)$/);
      if (!match) {
        return { original: token, bold: '', rest: token, isSpace: false };
      }

      const [, prefix, word, suffix] = match;
      const boldLen = Math.max(1, Math.ceil(word.length * ratio));
      const boldPart = prefix + word.slice(0, boldLen);
      const restPart = word.slice(boldLen) + suffix;

      return {
        original: token,
        bold: boldPart,
        rest: restPart,
        isSpace: false,
      };
    });
  });
}

export default function BionicReadingConverter() {
  const [inputText, setInputText] = useState<string>(SAMPLE_TEXT);
  const [fixation, setFixation] = useState<number>(3); // 1 to 5
  const [fontSize, setFontSize] = useState<'text-sm' | 'text-base' | 'text-lg' | 'text-xl'>('text-base');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif'>('sans');
  const [copiedMode, setCopiedMode] = useState<'html' | 'markdown' | null>(null);
  const [isFocusMode, setIsFocusMode] = useState<boolean>(false);

  const parsedLines = useMemo(() => {
    return convertToBionicWords(inputText, fixation);
  }, [inputText, fixation]);

  const wordCount = useMemo(() => {
    return inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  }, [inputText]);

  const readTimeSeconds = Math.ceil((wordCount / 250) * 60);

  const copyAsHtml = () => {
    const html = parsedLines
      .map((line) =>
        line
          .map((item) => (item.isSpace ? item.rest : `<b>${item.bold}</b>${item.rest}`))
          .join('')
      )
      .join('<br>\n');
    navigator.clipboard.writeText(html);
    setCopiedMode('html');
    setTimeout(() => setCopiedMode(null), 2000);
  };

  const copyAsMarkdown = () => {
    const md = parsedLines
      .map((line) =>
        line
          .map((item) => (item.isSpace ? item.rest : `**${item.bold}**${item.rest}`))
          .join('')
      )
      .join('\n\n');
    navigator.clipboard.writeText(md);
    setCopiedMode('markdown');
    setTimeout(() => setCopiedMode(null), 2000);
  };

  return (
    <div className={`mx-auto space-y-6 ${isFocusMode ? 'fixed inset-0 z-50 bg-white dark:bg-gray-900 p-8 overflow-y-auto' : 'max-w-5xl'}`}>
      {/* Action / Setting Toolbar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Fixation:
            </span>
            <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5 text-xs font-semibold">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setFixation(lvl)}
                  className={`w-7 h-7 rounded-md transition ${
                    fixation === lvl
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:text-indigo-600'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Font:
            </span>
            <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5 text-xs font-semibold">
              <button
                onClick={() => setFontFamily('sans')}
                className={`px-2.5 py-1 rounded-md transition ${
                  fontFamily === 'sans' ? 'bg-white dark:bg-gray-850 text-indigo-600 shadow-sm' : 'text-gray-700 dark:text-gray-300'
                }`}
              >
                Sans
              </button>
              <button
                onClick={() => setFontFamily('serif')}
                className={`px-2.5 py-1 rounded-md transition ${
                  fontFamily === 'serif' ? 'bg-white dark:bg-gray-850 text-indigo-600 shadow-sm' : 'text-gray-700 dark:text-gray-300 font-serif'
                }`}
              >
                Serif
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">
              Size:
            </span>
            <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-0.5 text-xs font-semibold">
              {(
                [
                  ['text-sm', 'S'],
                  ['text-base', 'M'],
                  ['text-lg', 'L'],
                  ['text-xl', 'XL'],
                ] as const
              ).map(([cls, label]) => (
                <button
                  key={cls}
                  onClick={() => setFontSize(cls)}
                  className={`px-2 py-1 rounded-md transition ${
                    fontSize === cls ? 'bg-white dark:bg-gray-850 text-indigo-600 shadow-sm' : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:text-indigo-600 transition"
            title={isFocusMode ? 'Exit Full Screen' : 'Focus Reading Mode'}
          >
            {isFocusMode ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            onClick={copyAsHtml}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white transition flex items-center gap-1.5 shadow-sm"
          >
            {copiedMode === 'html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedMode === 'html' ? 'Copied HTML!' : 'Copy HTML'}
          </button>

          <button
            onClick={copyAsMarkdown}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 transition flex items-center gap-1.5"
          >
            {copiedMode === 'markdown' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copiedMode === 'markdown' ? 'Copied MD!' : 'Copy Markdown'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column: Input Text */}
        <div className="flex flex-col h-[520px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
              Input Text
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {wordCount} words • ~{readTimeSeconds}s read
            </span>
          </div>
          <div className="flex-1 p-3">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or type text here to convert into Bionic reading format..."
              className="w-full h-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none text-sm leading-relaxed"
            />
          </div>
        </div>

        {/* Right Column: Bionic Preview */}
        <div className="flex flex-col h-[520px] bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" /> Bionic Reading View
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
              Guided Eye Fixation
            </span>
          </div>

          <div
            className={`flex-1 p-6 overflow-y-auto leading-loose ${fontSize} ${
              fontFamily === 'serif' ? 'font-serif' : 'font-sans'
            } text-gray-800 dark:text-gray-200 bg-amber-50/20 dark:bg-gray-900/40`}
          >
            {parsedLines.map((line, lIdx) => (
              <p key={lIdx} className="mb-4">
                {line.map((item, wIdx) => {
                  if (item.isSpace) {
                    return <span key={wIdx}>{item.rest}</span>;
                  }
                  return (
                    <span key={wIdx}>
                      <strong className="font-extrabold text-gray-950 dark:text-white">
                        {item.bold}
                      </strong>
                      <span className="opacity-80">{item.rest}</span>
                    </span>
                  );
                })}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
