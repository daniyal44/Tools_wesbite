'use client';

import React, { useState, useEffect } from 'react';
import { Plus, ThumbsUp, Trash2, Download, Copy, Check, RotateCcw } from 'lucide-react';

type ColumnType = 'went-well' | 'needs-improvement' | 'action-items' | 'kudos';

interface RetroCard {
  id: string;
  column: ColumnType;
  text: string;
  author: string;
  votes: number;
  createdAt: number;
}

const COLUMNS: { id: ColumnType; title: string; color: string; badgeColor: string; description: string }[] = [
  {
    id: 'went-well',
    title: 'Went Well 🚀',
    color: 'border-emerald-500/30 bg-emerald-50/30 dark:bg-emerald-950/20',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    description: 'What worked effectively during this sprint?',
  },
  {
    id: 'needs-improvement',
    title: 'To Improve ⚠️',
    color: 'border-amber-500/30 bg-amber-50/30 dark:bg-amber-950/20',
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    description: 'What obstacles or bottlenecks occurred?',
  },
  {
    id: 'action-items',
    title: 'Action Items 🎯',
    color: 'border-blue-500/30 bg-blue-50/30 dark:bg-blue-950/20',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    description: 'Concrete steps and owners for next sprint.',
  },
  {
    id: 'kudos',
    title: 'Shoutouts 🙌',
    color: 'border-purple-500/30 bg-purple-50/30 dark:bg-purple-950/20',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    description: 'Recognition for teammates and wins.',
  },
];

const INITIAL_CARDS: RetroCard[] = [
  {
    id: '1',
    column: 'went-well',
    text: 'Shipped the client-side tool registry on schedule with 100% test coverage.',
    author: 'Sarah',
    votes: 4,
    createdAt: Date.now() - 3600000,
  },
  {
    id: '2',
    column: 'needs-improvement',
    text: 'PR review turnaround was slow on mid-week feature spikes.',
    author: 'Alex',
    votes: 3,
    createdAt: Date.now() - 2500000,
  },
  {
    id: '3',
    column: 'action-items',
    text: 'Automate bundle size checking in CI to prevent regression spikes.',
    author: 'Dev Lead',
    votes: 5,
    createdAt: Date.now() - 1500000,
  },
  {
    id: '4',
    column: 'kudos',
    text: 'Huge thanks to the design team for snappy UI components and dark mode tokens!',
    author: 'Elena',
    votes: 6,
    createdAt: Date.now() - 500000,
  },
];

function createRetroCard(col: ColumnType, text: string, author: string): RetroCard {
  return {
    id: Math.random().toString(36).substring(2, 9),
    column: col,
    text: text.trim(),
    author: author.trim() || 'Anonymous',
    votes: 0,
    createdAt: Date.now(),
  };
}

export default function SprintRetroBoard() {
  const [cards, setCards] = useState<RetroCard[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zevylo_retro_cards');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // parse error
        }
      }
    }
    return INITIAL_CARDS;
  });

  const [cardInputs, setCardInputs] = useState<Record<ColumnType, { text: string; author: string }>>({
    'went-well': { text: '', author: '' },
    'needs-improvement': { text: '', author: '' },
    'action-items': { text: '', author: '' },
    'kudos': { text: '', author: '' },
  });

  const [activeInputCol, setActiveInputCol] = useState<ColumnType | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Sync with localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('zevylo_retro_cards', JSON.stringify(cards));
    }
  }, [cards]);

  const addCard = (col: ColumnType) => {
    const input = cardInputs[col];
    if (!input.text.trim()) return;

    const newCard = createRetroCard(col, input.text, input.author);

    setCards(prev => [...prev, newCard]);
    setCardInputs(prev => ({
      ...prev,
      [col]: { text: '', author: prev[col].author },
    }));
    setActiveInputCol(null);
  };

  const voteCard = (id: string) => {
    setCards(prev => prev.map(c => c.id === id ? { ...c, votes: c.votes + 1 } : c));
  };

  const deleteCard = (id: string) => {
    setCards(prev => prev.filter(c => c.id !== id));
  };

  const resetBoard = () => {
    if (confirm('Are you sure you want to clear all cards on the retro board?')) {
      setCards([]);
    }
  };

  const generateMarkdown = (): string => {
    let md = '# 📋 Sprint Retrospective Summary\n\n';
    COLUMNS.forEach(col => {
      const colCards = cards.filter(c => c.column === col.id);
      md += `### ${col.title} (${colCards.length})\n`;
      if (colCards.length === 0) {
        md += '_No cards in this category._\n\n';
      } else {
        colCards.forEach(c => {
          md += `- **${c.text}** — _${c.author}_ (👍 ${c.votes} votes)\n`;
        });
        md += '\n';
      }
    });
    return md;
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exportCsv = () => {
    const headers = ['Column', 'Card Text', 'Author', 'Votes', 'Created At'];
    const rows = cards.map(c => [
      `"${c.column}"`,
      `"${c.text.replace(/"/g, '""')}"`,
      `"${c.author}"`,
      c.votes,
      new Date(c.createdAt).toISOString(),
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sprint_retro_${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Sprint Retrospective Canvas
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            Total Cards: <strong className="text-blue-600 dark:text-blue-400">{cards.length}</strong> | Votes Cast: <strong className="text-blue-600 dark:text-blue-400">{cards.reduce((acc, c) => acc + c.votes, 0)}</strong>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={copyMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors shadow-sm"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? 'Copied Markdown' : 'Copy for Jira/Slack'}
          </button>
          <button
            onClick={exportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-xs font-semibold text-gray-700 dark:text-gray-300 transition-colors shadow-sm"
          >
            <Download className="h-3.5 w-3.5" /> Export CSV
          </button>
          <button
            onClick={resetBoard}
            className="p-2 rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 hover:text-rose-500 hover:border-rose-300 dark:hover:border-rose-900 transition-colors"
            title="Reset Board"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 4 Column Retro Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map((col) => {
          const colCards = cards.filter(c => c.column === col.id);
          const isInputActive = activeInputCol === col.id;

          return (
            <div
              key={col.id}
              className={`rounded-2xl border ${col.color} p-4 flex flex-col justify-between min-h-[500px] shadow-sm`}
            >
              <div>
                {/* Column Title Header */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-200 dark:border-gray-800 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-gray-900 dark:text-white">
                      {col.title}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${col.badgeColor}`}>
                      {colCards.length}
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveInputCol(isInputActive ? null : col.id)}
                    className="p-1 rounded-lg hover:bg-white dark:hover:bg-gray-800 text-gray-500 hover:text-blue-600 transition-colors"
                    title="Add Item"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Add Card Form Inline */}
                {isInputActive && (
                  <div className="mb-4 p-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md space-y-2">
                    <textarea
                      placeholder={col.description}
                      value={cardInputs[col.id].text}
                      onChange={(e) => setCardInputs(prev => ({
                        ...prev,
                        [col.id]: { ...prev[col.id], text: e.target.value },
                      }))}
                      rows={2}
                      className="w-full text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 text-gray-900 dark:text-white outline-none focus:border-blue-500 resize-none"
                    />
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={cardInputs[col.id].author}
                        onChange={(e) => setCardInputs(prev => ({
                          ...prev,
                          [col.id]: { ...prev[col.id], author: e.target.value },
                        }))}
                        className="flex-1 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 py-1.5 text-gray-900 dark:text-white outline-none"
                      />
                      <button
                        onClick={() => addCard(col.id)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                )}

                {/* Cards List */}
                <div className="space-y-3">
                  {colCards.map((card) => (
                    <div
                      key={card.id}
                      className="p-3.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800/80 shadow-sm hover:shadow transition-shadow group flex flex-col justify-between space-y-2"
                    >
                      <p className="text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-normal whitespace-pre-wrap">
                        {card.text}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-400">
                        <span className="font-medium text-gray-600 dark:text-gray-400 truncate max-w-[90px]">
                          {card.author}
                        </span>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => voteCard(card.id)}
                            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-700 dark:text-gray-300 hover:text-blue-600 transition-colors"
                            title="Upvote card"
                          >
                            <ThumbsUp className="h-3 w-3" />
                            <span className="font-bold tabular-nums">{card.votes}</span>
                          </button>

                          <button
                            onClick={() => deleteCard(card.id)}
                            className="opacity-0 group-hover:opacity-100 p-1 hover:text-rose-500 transition-opacity"
                            title="Delete"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}

                  {colCards.length === 0 && !isInputActive && (
                    <div className="py-12 text-center text-xs text-gray-400 select-none">
                      No feedback yet. Click + to add.
                    </div>
                  )}
                </div>
              </div>

              {/* Add Button at bottom of column */}
              {!isInputActive && (
                <button
                  onClick={() => setActiveInputCol(col.id)}
                  className="mt-4 w-full py-2 rounded-xl border border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 text-xs font-semibold text-gray-500 dark:text-gray-400 hover:text-blue-600 transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="h-3.5 w-3.5" /> Add Card
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
