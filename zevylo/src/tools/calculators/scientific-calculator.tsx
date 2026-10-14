'use client';

import React, { useState } from 'react';
import { Delete, RotateCcw, Copy, Check } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [angleMode, setAngleMode] = useState<'deg' | 'rad'>('deg');
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const inputDigit = (digit: string) => {
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? digit : prev + digit));
  };

  const inputOperator = (op: string) => {
    setEquation((prev) => `${prev} ${display} ${op}`);
    setDisplay('0');
  };

  const clearAll = () => {
    setDisplay('0');
    setEquation('');
  };

  const backspace = () => {
    setDisplay((prev) => {
      if (prev.length <= 1 || prev === 'Error') return '0';
      return prev.slice(0, -1);
    });
  };

  const calculateResult = () => {
    try {
      const fullExpr = `${equation} ${display}`
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\^/g, '**');

      // Safe evaluation of standard mathematical expressions
      const result = Function(`"use strict"; return (${fullExpr})`)();
      if (!isFinite(result) || isNaN(result)) {
        setDisplay('Error');
      } else {
        const rounded = Number(result.toFixed(8)).toString();
        setHistory((prev) => [`${fullExpr} = ${rounded}`, ...prev.slice(0, 9)]);
        setDisplay(rounded);
        setEquation('');
      }
    } catch {
      setDisplay('Error');
    }
  };

  const applyMathFunc = (func: string) => {
    const val = parseFloat(display);
    if (isNaN(val)) return;

    let res = 0;
    const toRad = angleMode === 'deg' ? (val * Math.PI) / 180 : val;

    switch (func) {
      case 'sin':
        res = Math.sin(toRad);
        break;
      case 'cos':
        res = Math.cos(toRad);
        break;
      case 'tan':
        res = Math.tan(toRad);
        break;
      case 'sqrt':
        res = Math.sqrt(val);
        break;
      case 'log10':
        res = Math.log10(val);
        break;
      case 'ln':
        res = Math.log(val);
        break;
      case 'sqr':
        res = Math.pow(val, 2);
        break;
      case 'inv':
        res = 1 / val;
        break;
      case 'fact': {
        let f = 1;
        for (let i = 2; i <= Math.min(val, 20); i++) f *= i;
        res = f;
        break;
      }
      default:
        return;
    }

    if (isNaN(res) || !isFinite(res)) {
      setDisplay('Error');
    } else {
      const formatted = Number(res.toFixed(8)).toString();
      setDisplay(formatted);
    }
  };

  const handleCopy = async () => {
    await copyToClipboard(display);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Calculator Body */}
      <div className="rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-xl overflow-hidden p-6 space-y-6">
        {/* Screen */}
        <div className="rounded-2xl bg-gray-50 dark:bg-gray-950 p-5 border border-gray-200/80 dark:border-gray-800 text-right space-y-1">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span className="font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
              Mode: {angleMode.toUpperCase()}
            </span>
            <span className="font-mono truncate max-w-xs">{equation}</span>
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              title="Copy Result"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <div className="text-4xl font-mono font-extrabold text-gray-900 dark:text-gray-100 tracking-tight overflow-x-auto">
              {display}
            </div>
          </div>
        </div>

        {/* Function Keys Grid */}
        <div className="grid grid-cols-5 gap-2 text-sm font-bold">
          {/* Scientific row 1 */}
          <button
            onClick={() => setAngleMode((prev) => (prev === 'deg' ? 'rad' : 'deg'))}
            className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 hover:bg-gray-200 dark:hover:bg-gray-700 text-xs"
          >
            {angleMode === 'deg' ? 'DEG' : 'RAD'}
          </button>
          <button
            onClick={() => applyMathFunc('sin')}
            className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            sin
          </button>
          <button
            onClick={() => applyMathFunc('cos')}
            className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            cos
          </button>
          <button
            onClick={() => applyMathFunc('tan')}
            className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            tan
          </button>
          <button
            onClick={clearAll}
            className="h-11 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 hover:bg-red-100"
          >
            AC
          </button>

          {/* Scientific row 2 */}
          <button
            onClick={() => applyMathFunc('log10')}
            className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
          >
            log
          </button>
          <button
            onClick={() => applyMathFunc('ln')}
            className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
          >
            ln
          </button>
          <button
            onClick={() => applyMathFunc('sqrt')}
            className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
          >
            √
          </button>
          <button
            onClick={() => applyMathFunc('sqr')}
            className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
          >
            x²
          </button>
          <button
            onClick={backspace}
            className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 flex items-center justify-center"
          >
            <Delete className="w-4 h-4" />
          </button>

          {/* Row 3 */}
          <button
            onClick={() => setDisplay(Math.PI.toString())}
            className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
          >
            π
          </button>
          <button
            onClick={() => inputDigit('7')}
            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-base"
          >
            7
          </button>
          <button
            onClick={() => inputDigit('8')}
            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-base"
          >
            8
          </button>
          <button
            onClick={() => inputDigit('9')}
            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-base"
          >
            9
          </button>
          <button
            onClick={() => inputOperator('÷')}
            className="h-11 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-base"
          >
            ÷
          </button>

          {/* Row 4 */}
          <button
            onClick={() => setDisplay(Math.E.toString())}
            className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
          >
            e
          </button>
          <button
            onClick={() => inputDigit('4')}
            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-base"
          >
            4
          </button>
          <button
            onClick={() => inputDigit('5')}
            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-base"
          >
            5
          </button>
          <button
            onClick={() => inputDigit('6')}
            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-base"
          >
            6
          </button>
          <button
            onClick={() => inputOperator('×')}
            className="h-11 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-base"
          >
            ×
          </button>

          {/* Row 5 */}
          <button
            onClick={() => applyMathFunc('inv')}
            className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
          >
            1/x
          </button>
          <button
            onClick={() => inputDigit('1')}
            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-base"
          >
            1
          </button>
          <button
            onClick={() => inputDigit('2')}
            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-base"
          >
            2
          </button>
          <button
            onClick={() => inputDigit('3')}
            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-base"
          >
            3
          </button>
          <button
            onClick={() => inputOperator('-')}
            className="h-11 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-base"
          >
            -
          </button>

          {/* Row 6 */}
          <button
            onClick={() => applyMathFunc('fact')}
            className="h-11 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
          >
            n!
          </button>
          <button
            onClick={() => inputDigit('0')}
            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-base"
          >
            0
          </button>
          <button
            onClick={() => (!display.includes('.') ? setDisplay((p) => p + '.') : null)}
            className="h-11 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 text-base"
          >
            .
          </button>
          <button
            onClick={calculateResult}
            className="h-11 rounded-xl bg-blue-600 text-white hover:bg-blue-700 text-base font-black shadow-md"
          >
            =
          </button>
          <button
            onClick={() => inputOperator('+')}
            className="h-11 rounded-xl bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400 hover:bg-blue-100 text-base"
          >
            +
          </button>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-gray-500">
            <span>Recent Calculations</span>
            <button
              onClick={() => setHistory([])}
              className="flex items-center gap-1 hover:text-gray-700"
            >
              <RotateCcw className="w-3 h-3" />
              Clear
            </button>
          </div>
          <div className="space-y-1 font-mono text-xs">
            {history.map((h, i) => (
              <div key={i} className="p-1.5 rounded bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {h}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
