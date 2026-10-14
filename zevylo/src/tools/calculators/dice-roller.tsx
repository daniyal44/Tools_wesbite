'use client';

import React, { useState } from 'react';
import { Dices, RotateCcw, Copy, Check, CircleDot } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';

type DiceType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

const DICE_CONFIG: Record<DiceType, { sides: number; label: string; color: string }> = {
  d4: { sides: 4, label: 'D4', color: 'bg-emerald-500' },
  d6: { sides: 6, label: 'D6', color: 'bg-blue-500' },
  d8: { sides: 8, label: 'D8', color: 'bg-indigo-500' },
  d10: { sides: 10, label: 'D10', color: 'bg-purple-500' },
  d12: { sides: 12, label: 'D12', color: 'bg-pink-500' },
  d20: { sides: 20, label: 'D20', color: 'bg-rose-500' },
  d100: { sides: 100, label: 'D100', color: 'bg-amber-500' },
};

export default function DiceRoller() {
  const [selectedDice, setSelectedDice] = useState<DiceType>('d20');
  const [count, setCount] = useState(1);
  const [modifier, setModifier] = useState(0);
  const [latestRoll, setLatestRoll] = useState<{
    rolls: number[];
    modifier: number;
    total: number;
    dice: DiceType;
  } | null>(null);
  const [coinResult, setCoinResult] = useState<'Heads' | 'Tails' | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const rollDice = (type: DiceType = selectedDice) => {
    const sides = DICE_CONFIG[type].sides;
    const rolls: number[] = [];

    // Cryptographically secure random roll
    const array = new Uint32Array(count);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < count; i++) {
      rolls.push((array[i] % sides) + 1);
    }

    const sum = rolls.reduce((a, b) => a + b, 0) + modifier;
    const res = { rolls, modifier, total: sum, dice: type };
    setLatestRoll(res);

    const log = `${count}${type} ${modifier >= 0 ? `+${modifier}` : modifier} = [${rolls.join(', ')}] = ${sum}`;
    setHistory((prev) => [log, ...prev.slice(0, 9)]);
  };

  const flipCoin = () => {
    const array = new Uint8Array(1);
    window.crypto.getRandomValues(array);
    const side = array[0] % 2 === 0 ? 'Heads' : 'Tails';
    setCoinResult(side);
    setHistory((prev) => [`Coin Flip: ${side}`, ...prev.slice(0, 9)]);
  };

  const handleCopy = async () => {
    if (!latestRoll) return;
    await copyToClipboard(`Rolled ${latestRoll.total} (${latestRoll.rolls.join(' + ')}${latestRoll.modifier ? ` + ${latestRoll.modifier}` : ''})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Dice Selection Ribbon */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {(Object.keys(DICE_CONFIG) as DiceType[]).map((d) => (
          <button
            key={d}
            onClick={() => {
              setSelectedDice(d);
              rollDice(d);
            }}
            className={`px-4 py-2.5 rounded-xl text-sm font-extrabold transition-all ${
              selectedDice === d
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400'
            }`}
          >
            {DICE_CONFIG[d].label}
          </button>
        ))}

        <button
          onClick={flipCoin}
          className="px-4 py-2.5 rounded-xl text-sm font-extrabold bg-amber-500 text-white hover:bg-amber-600 shadow-md flex items-center gap-1.5"
        >
          <CircleDot className="w-4 h-4" />
          Flip Coin
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Controls */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-5">
          <h2 className="text-base font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
            <Dices className="w-5 h-5 text-blue-600" />
            Dice Configuration ({selectedDice.toUpperCase()})
          </h2>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">
                <span>Number of Dice</span>
                <span className="text-blue-600 font-mono">{count}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value, 10))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">
                Modifier (+/-)
              </label>
              <input
                type="number"
                value={modifier}
                onChange={(e) => setModifier(parseInt(e.target.value, 10) || 0)}
                className="w-full h-11 px-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-sm font-semibold"
                placeholder="0"
              />
            </div>

            <button
              onClick={() => rollDice()}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-base shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Dices className="w-5 h-5" />
              Roll {count}{selectedDice.toUpperCase()} {modifier !== 0 && (modifier > 0 ? `+ ${modifier}` : `- ${Math.abs(modifier)}`)}
            </button>
          </div>
        </div>

        {/* Big Outcome Banner */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
              Outcome
            </h2>
            {latestRoll && (
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-50 text-gray-600 dark:text-gray-300"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>

          {coinResult && !latestRoll && (
            <div className="text-center py-12 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-500">Coin Toss</span>
              <div className="text-5xl font-black text-amber-600">{coinResult}</div>
            </div>
          )}

          {latestRoll ? (
            <div className="space-y-4">
              <div className="p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-900 text-center space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                  Total Sum
                </span>
                <div className="text-6xl font-black text-gray-900 dark:text-gray-100">
                  {latestRoll.total}
                </div>
              </div>

              {/* Individual Dice */}
              <div>
                <span className="text-xs font-bold text-gray-500 block mb-2">Individual Rolls:</span>
                <div className="flex flex-wrap gap-2">
                  {latestRoll.rolls.map((val, idx) => (
                    <div
                      key={idx}
                      className="w-11 h-11 rounded-xl bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center justify-center font-black text-base text-gray-900 dark:text-gray-100"
                    >
                      {val}
                    </div>
                  ))}
                  {latestRoll.modifier !== 0 && (
                    <div className="h-11 px-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 font-bold flex items-center text-xs">
                      mod: {latestRoll.modifier > 0 ? `+${latestRoll.modifier}` : latestRoll.modifier}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : !coinResult ? (
            <div className="text-center py-12 text-sm text-gray-400">
              Click a die or Roll button to cast dice.
            </div>
          ) : null}

          {/* History */}
          {history.length > 0 && (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
              <div className="flex justify-between items-center text-xs text-gray-500 mb-2 font-bold">
                <span>Recent Rolls</span>
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
                  <div key={i} className="p-1 rounded bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400">
                    {h}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
