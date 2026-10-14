'use client';

import React, { useState } from 'react';
import { RotateCw, Trophy, BarChart3, RotateCcw } from 'lucide-react';

type CoinSide = 'heads' | 'tails';

interface FlipHistoryItem {
  side: CoinSide;
  timestamp: string;
}

export default function CoinFlip() {
  const [currentSide, setCurrentSide] = useState<CoinSide>('heads');
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [headsCount, setHeadsCount] = useState<number>(0);
  const [tailsCount, setTailsCount] = useState<number>(0);
  const [streak, setStreak] = useState<{ side: CoinSide; count: number }>({ side: 'heads', count: 0 });
  const [history, setHistory] = useState<FlipHistoryItem[]>([]);
  const [multiAmount, setMultiAmount] = useState<number>(10);
  const [multiResult, setMultiResult] = useState<{ heads: number; tails: number } | null>(null);

  // Cryptographically secure random binary choice
  const getCryptoRandomSide = (): CoinSide => {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);
    return array[0] % 2 === 0 ? 'heads' : 'tails';
  };

  const handleSingleFlip = () => {
    if (isFlipping) return;
    setIsFlipping(true);

    const outcome = getCryptoRandomSide();

    // Flip animation completes in 800ms
    setTimeout(() => {
      setCurrentSide(outcome);
      setIsFlipping(false);

      if (outcome === 'heads') {
        setHeadsCount((prev) => prev + 1);
      } else {
        setTailsCount((prev) => prev + 1);
      }

      setStreak((prev) => {
        if (prev.side === outcome) {
          return { side: outcome, count: prev.count + 1 };
        }
        return { side: outcome, count: 1 };
      });

      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setHistory((prev) => [{ side: outcome, timestamp: timeStr }, ...prev.slice(0, 19)]);
    }, 700);
  };

  const handleMultiFlip = (count: number) => {
    const array = new Uint32Array(count);
    crypto.getRandomValues(array);

    let h = 0;
    let t = 0;
    for (let i = 0; i < count; i++) {
      if (array[i] % 2 === 0) h++;
      else t++;
    }

    setMultiResult({ heads: h, tails: t });
    setHeadsCount((prev) => prev + h);
    setTailsCount((prev) => prev + t);
  };

  const handleReset = () => {
    setHeadsCount(0);
    setTailsCount(0);
    setStreak({ side: 'heads', count: 0 });
    setHistory([]);
    setMultiResult(null);
  };

  const totalFlips = headsCount + tailsCount;
  const headsPercentage = totalFlips > 0 ? ((headsCount / totalFlips) * 100).toFixed(1) : '50.0';
  const tailsPercentage = totalFlips > 0 ? ((tailsCount / totalFlips) * 100).toFixed(1) : '50.0';

  return (
    <div className="space-y-8">
      {/* 3D Coin & Interactive Flip Stage */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 shadow-sm flex flex-col items-center justify-center">
        {/* Animated 3D Coin Element */}
        <div className="my-8 flex justify-center [perspective:1000px]">
          <div
            className={`relative h-44 w-44 rounded-full shadow-2xl transition-transform duration-700 select-none cursor-pointer ${
              isFlipping ? 'animate-bounce [transform:rotateY(1440deg)]' : ''
            }`}
            onClick={handleSingleFlip}
            title="Click to Flip Coin"
          >
            {/* Heads Side */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center rounded-full border-4 border-amber-300 bg-gradient-to-tr from-amber-500 via-yellow-400 to-amber-200 text-amber-950 shadow-inner transition-opacity duration-300 ${
                currentSide === 'heads' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="h-36 w-36 rounded-full border-2 border-dashed border-amber-600/40 flex flex-col items-center justify-center">
                <span className="text-3xl font-black tracking-widest uppercase">HEADS</span>
                <span className="text-xs font-bold text-amber-900 mt-1">★ 1 COIN ★</span>
              </div>
            </div>

            {/* Tails Side */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center rounded-full border-4 border-slate-300 bg-gradient-to-tr from-slate-400 via-gray-200 to-slate-100 text-slate-800 shadow-inner transition-opacity duration-300 ${
                currentSide === 'tails' ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="h-36 w-36 rounded-full border-2 border-dashed border-slate-400 flex flex-col items-center justify-center">
                <span className="text-3xl font-black tracking-widest uppercase">TAILS</span>
                <span className="text-xs font-bold text-slate-700 mt-1">★ 1 COIN ★</span>
              </div>
            </div>
          </div>
        </div>

        {/* Big Flip Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSingleFlip}
            disabled={isFlipping}
            className="inline-flex items-center gap-2 rounded-2xl bg-amber-500 hover:bg-amber-600 px-8 py-3.5 text-base font-black text-amber-950 shadow-md hover:shadow-lg transition-all disabled:opacity-50 active:scale-95"
          >
            <RotateCw className={`h-5 w-5 ${isFlipping ? 'animate-spin' : ''}`} />
            {isFlipping ? 'Flipping...' : 'Flip Coin'}
          </button>
          {totalFlips > 0 && (
            <button
              onClick={handleReset}
              title="Reset stats"
              className="p-3 rounded-2xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <RotateCcw className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Current Result Banner */}
        <div className="mt-6 text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">Outcome</span>
          <div className="text-2xl font-black text-gray-900 dark:text-white capitalize">
            {isFlipping ? 'In the air...' : `Result: ${currentSide}!`}
          </div>
          {streak.count > 1 && (
            <div className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 px-2.5 py-0.5 rounded-full">
              <Trophy className="h-3 w-3" /> Streak: {streak.count}x {streak.side} in a row!
            </div>
          )}
        </div>
      </div>

      {/* Probability & Statistics Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20 p-5">
          <div className="text-xs font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider mb-1">
            Heads Count
          </div>
          <div className="text-3xl font-black text-amber-950 dark:text-amber-100 font-mono">
            {headsCount.toLocaleString()}
          </div>
          <div className="text-xs text-amber-700/80 dark:text-amber-400 mt-1 font-semibold">
            {headsPercentage}% of total
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 p-5">
          <div className="text-xs font-bold text-slate-800 dark:text-slate-300 uppercase tracking-wider mb-1">
            Tails Count
          </div>
          <div className="text-3xl font-black text-slate-950 dark:text-slate-100 font-mono">
            {tailsCount.toLocaleString()}
          </div>
          <div className="text-xs text-slate-700/80 dark:text-slate-400 mt-1 font-semibold">
            {tailsPercentage}% of total
          </div>
        </div>

        <div className="rounded-2xl border border-blue-200 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20 p-5">
          <div className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider mb-1">
            Total Flips
          </div>
          <div className="text-3xl font-black text-blue-950 dark:text-blue-100 font-mono">
            {totalFlips.toLocaleString()}
          </div>
          <div className="text-xs text-blue-700/80 dark:text-blue-400 mt-1">
            Fair 50/50 Cryptographic PRNG
          </div>
        </div>
      </div>

      {/* Multi-Flip Simulator & History */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Multi-flip batch simulator */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-600" /> Multi-Coin Batch Simulator
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
            Simulate flipping up to 1,000 coins simultaneously to verify large-number probability laws.
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {[5, 10, 50, 100, 500, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => {
                  setMultiAmount(amt);
                  handleMultiFlip(amt);
                }}
                className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                  multiAmount === amt
                    ? 'bg-blue-600 text-white'
                    : 'border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-blue-500'
                }`}
              >
                Flip {amt}x
              </button>
            ))}
          </div>

          {multiResult && (
            <div className="rounded-xl border border-blue-100 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20 p-4">
              <div className="text-xs font-bold text-blue-900 dark:text-blue-200 mb-2">
                Last Batch Result ({multiAmount} coins flipped):
              </div>
              <div className="flex justify-between text-xs text-gray-700 dark:text-gray-300">
                <span>
                  Heads: <strong className="text-amber-600">{multiResult.heads}</strong> (
                  {((multiResult.heads / multiAmount) * 100).toFixed(1)}%)
                </span>
                <span>
                  Tails: <strong className="text-slate-600">{multiResult.tails}</strong> (
                  {((multiResult.tails / multiAmount) * 100).toFixed(1)}%)
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Recent flips log */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 shadow-sm">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-3">
            Recent Flip History (Last 20)
          </h3>
          {history.length > 0 ? (
            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto p-1">
              {history.map((h, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold border ${
                    h.side === 'heads'
                      ? 'border-amber-300 bg-amber-50 text-amber-900 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                      : 'border-slate-300 bg-slate-50 text-slate-900 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700'
                  }`}
                >
                  <span>{h.side === 'heads' ? '🪙 H' : '⚪ T'}</span>
                  <span className="text-[10px] text-gray-400 font-normal">{h.timestamp}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-gray-400 border border-dashed border-gray-200 dark:border-gray-800 rounded-xl">
              No flips yet. Click the coin above to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
