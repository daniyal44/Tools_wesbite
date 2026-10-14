'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Copy,
  Check,
  Table,
  HelpCircle,
  Lightbulb,
  ArrowRight,
  Code2,
  Layers,
  BookOpen,
} from 'lucide-react';

interface FormulaResult {
  primaryFormula: string;
  alternativeFormula?: string;
  platform: 'Excel' | 'Google Sheets' | 'Universal';
  stepBreakdown: Array<{ step: string; explanation: string }>;
  proTip: string;
}

export default function AIExcelFormulaGenerator() {
  const [activeTab, setActiveTab] = useState<'generate' | 'explain'>('generate');
  const [prompt, setPrompt] = useState('');
  const [platform, setPlatform] = useState<'excel' | 'sheets'>('excel');
  const [formulaInput, setFormulaInput] = useState('');
  const [generateResult, setGenerateResult] = useState<FormulaResult | null>(null);
  const [explainResult, setExplainResult] = useState<{
    summary: string;
    steps: Array<{ part: string; meaning: string }>;
    pitfalls: string[];
  } | null>(null);
  const [copiedFormula, setCopiedFormula] = useState(false);
  const [copiedAlt, setCopiedAlt] = useState(false);

  const generatePresets = [
    {
      label: '💰 Sales Tier Bonus',
      prompt: 'If Sales (B2) is over 10,000 and Rating (C2) is over 4, give 15% of B2, otherwise 5% of B2',
    },
    {
      label: '🔍 Safe Table Lookup',
      prompt: 'Look up employee ID in D2 from Sheet2!A:A and return Department in Column C, showing "Not Found" if missing',
    },
    {
      label: '📅 Date & Region Sum',
      prompt: 'Sum Revenue in Column D where Region is "West" and Status is "Paid"',
    },
    {
      label: '📧 Extract Email Domain',
      prompt: 'Extract the domain part from full email address in cell A2 (e.g. john@acme.com -> acme.com)',
    },
  ];

  const explainPresets = [
    {
      label: '🔍 Nested XLOOKUP',
      formula: '=IFERROR(XLOOKUP(D2, Sheet2!A2:A100, Sheet2!B2:B100, "Missing"), "Error")',
    },
    {
      label: '📊 Conditional SUMIFS',
      formula: '=SUMIFS(Sales!D:D, Sales!A:A, "West", Sales!B:B, ">=2025-01-01")',
    },
    {
      label: '⚡ INDEX-MATCH Combo',
      formula: '=INDEX(Employees!C2:C500, MATCH(1, (Employees!A2:A500=D2)*(Employees!B2:B500="Active"), 0))',
    },
  ];

  const handleGenerateFormula = () => {
    if (!prompt.trim()) return;
    const q = prompt.toLowerCase().trim();

    if (q.includes('bonus') || q.includes('rating') || q.includes('tier') || q.includes('if')) {
      setGenerateResult({
        primaryFormula: '=IF(AND(B2>10000, C2>4), B2*0.15, B2*0.05)',
        alternativeFormula: '=IFS(AND(B2>10000, C2>4), B2*0.15, TRUE, B2*0.05)',
        platform: 'Universal',
        stepBreakdown: [
          {
            step: 'AND(B2>10000, C2>4)',
            explanation: 'Evaluates whether BOTH conditions are simultaneously true: sales exceed 10,000 and rating exceeds 4.',
          },
          {
            step: 'Value If True: B2*0.15',
            explanation: 'If both conditions pass, multiplies base sales in B2 by 15% (0.15).',
          },
          {
            step: 'Value If False: B2*0.05',
            explanation: 'If either condition fails, calculates standard 5% bonus instead.',
          },
        ],
        proTip: 'To prevent calculation errors when cells contain empty strings or text headers, wrap the formula inside =IFERROR(...).',
      });
    } else if (q.includes('lookup') || q.includes('find') || q.includes('vlookup') || q.includes('search')) {
      if (platform === 'excel') {
        setGenerateResult({
          primaryFormula: '=XLOOKUP(D2, Sheet2!A:A, Sheet2!C:C, "Not Found", 0)',
          alternativeFormula: '=IFERROR(INDEX(Sheet2!C:C, MATCH(D2, Sheet2!A:A, 0)), "Not Found")',
          platform: 'Excel',
          stepBreakdown: [
            {
              step: 'Lookup Value: D2',
              explanation: 'The search key you want to find (e.g. employee ID or product code).',
            },
            {
              step: 'Lookup Array: Sheet2!A:A',
              explanation: 'The column to search through on the target sheet.',
            },
            {
              step: 'Return Array: Sheet2!C:C',
              explanation: 'The column containing the data you want returned.',
            },
            {
              step: 'If Not Found: "Not Found"',
              explanation: 'Custom fallback text returned instead of ugly #N/A errors.',
            },
          ],
          proTip: 'XLOOKUP does not require the lookup column to be to the left of the return column, unlike classic VLOOKUP.',
        });
      } else {
        setGenerateResult({
          primaryFormula: '=IFERROR(XLOOKUP(D2, Sheet2!A:A, Sheet2!C:C, "Not Found"), "Not Found")',
          alternativeFormula: '=IFERROR(FILTER(Sheet2!C:C, Sheet2!A:A = D2), "Not Found")',
          platform: 'Google Sheets',
          stepBreakdown: [
            {
              step: 'FILTER(Sheet2!C:C, Sheet2!A:A = D2)',
              explanation: 'Extracts matching values dynamically using Google Sheets native FILTER engine.',
            },
            {
              step: 'IFERROR(..., "Not Found")',
              explanation: 'Catches missing matches gracefully without throwing #N/A.',
            },
          ],
          proTip: 'In Google Sheets, =FILTER() can return multiple matching rows automatically if your dataset contains duplicate keys.',
        });
      }
    } else if (q.includes('sum') || q.includes('total') || q.includes('revenue')) {
      setGenerateResult({
        primaryFormula: '=SUMIFS(D:D, A:A, "West", B:B, "Paid")',
        alternativeFormula: platform === 'sheets' ? '=QUERY(A:D, "SELECT SUM(D) WHERE A=\'West\' AND B=\'Paid\' LABEL SUM(D) \'\'", 0)' : '=SUMPRODUCT((A:A="West")*(B:B="Paid")*(D:D))',
        platform: platform === 'sheets' ? 'Google Sheets' : 'Excel',
        stepBreakdown: [
          {
            step: 'Sum Range: D:D',
            explanation: 'The numeric column containing numbers you want to add up (e.g. Revenue).',
          },
          {
            step: 'Criteria Range 1: A:A, "West"',
            explanation: 'First condition: filters rows where Region in Column A strictly equals "West".',
          },
          {
            step: 'Criteria Range 2: B:B, "Paid"',
            explanation: 'Second condition: filters rows where Payment Status in Column B strictly equals "Paid".',
          },
        ],
        proTip: 'Ensure that all range references (D:D, A:A, B:B) span the exact same row height to prevent #VALUE! calculation errors.',
      });
    } else if (q.includes('email') || q.includes('domain') || q.includes('extract') || q.includes('text')) {
      if (platform === 'sheets') {
        setGenerateResult({
          primaryFormula: '=REGEXEXTRACT(A2, "@(.+)")',
          alternativeFormula: '=RIGHT(A2, LEN(A2) - FIND("@", A2))',
          platform: 'Google Sheets',
          stepBreakdown: [
            {
              step: 'REGEXEXTRACT(A2, "@(.+)")',
              explanation: 'Uses regular expressions to capture all characters occurring immediately after the "@" sign.',
            },
          ],
          proTip: 'You can drag this down with =ARRAYFORMULA(REGEXEXTRACT(A2:A, "@(.+)")) to extract thousands of rows at once.',
        });
      } else {
        setGenerateResult({
          primaryFormula: '=RIGHT(A2, LEN(A2) - FIND("@", A2))',
          alternativeFormula: '=TEXTAFTER(A2, "@")',
          platform: 'Excel',
          stepBreakdown: [
            {
              step: 'FIND("@", A2)',
              explanation: 'Locates the exact numerical position of the "@" character in the text string.',
            },
            {
              step: 'LEN(A2) - FIND(...)',
              explanation: 'Calculates how many characters remain after the "@" symbol.',
            },
            {
              step: 'RIGHT(A2, ...)',
              explanation: 'Extracts that exact number of characters from the right end of cell A2.',
            },
          ],
          proTip: 'In modern Excel 365, =TEXTAFTER(A2, "@") is much cleaner and avoids nested LEN/FIND calculations.',
        });
      }
    } else {
      // General Smart Fallback
      setGenerateResult({
        primaryFormula: `=IFERROR(IF(A2>0, A2*1.1, 0), "Error")`,
        alternativeFormula: `=IFS(A2>0, A2*1.1, TRUE, 0)`,
        platform: 'Universal',
        stepBreakdown: [
          {
            step: 'Condition: A2>0',
            explanation: 'Tests whether the numerical input in cell A2 is greater than zero.',
          },
          {
            step: 'Calculation: A2*1.1',
            explanation: 'Computes 110% of cell A2 when positive.',
          },
          {
            step: 'IFERROR Wrapper',
            explanation: 'Safeguards the worksheet against unexpected non-numeric inputs.',
          },
        ],
        proTip: 'Use cell references like $A$2 (absolute) if you plan on copying this formula across other columns.',
      });
    }
  };

  const handleExplainFormula = () => {
    if (!formulaInput.trim()) return;
    const f = formulaInput.trim();

    if (f.toUpperCase().includes('XLOOKUP')) {
      setExplainResult({
        summary: 'This formula performs a modern vertical or horizontal lookup, finding a matching item in one column and returning the corresponding value from another column, with automated error handling.',
        steps: [
          {
            part: 'XLOOKUP(search_key, lookup_range, return_range, [if_not_found])',
            meaning: 'Scans lookup_range for the search_key and retrieves the item from return_range.',
          },
          {
            part: 'IFERROR(..., "Error")',
            meaning: 'Intercepts severe calculation crashes (like #DIV/0! or corrupt data) and displays a clean error label.',
          },
        ],
        pitfalls: [
          'Requires Excel 365 / 2021+ or Google Sheets (will throw #NAME? on Excel 2016/2019).',
          'If lookup ranges have different numbers of rows, an error will occur.',
        ],
      });
    } else if (f.toUpperCase().includes('SUMIFS')) {
      setExplainResult({
        summary: 'This formula sums up numeric values across a target range ONLY when multiple independent criteria are all satisfied simultaneously.',
        steps: [
          {
            part: 'SUMIFS(sum_range, criteria_range_1, condition_1, ...)',
            meaning: 'Evaluates each row against all criteria. Rows that meet every test are added together.',
          },
          {
            part: 'Comparison Operators (e.g. ">=2025-01-01")',
            meaning: 'Must be enclosed in quotation marks when paired with greater-than or less-than symbols.',
          },
        ],
        pitfalls: [
          'All criteria ranges MUST have the exact same dimensions as the sum_range.',
          'SUMIFS logic is strictly AND (all conditions must pass). For OR logic, use SUMPRODUCT or addition of SUMIFS.',
        ],
      });
    } else if (f.toUpperCase().includes('INDEX') && f.toUpperCase().includes('MATCH')) {
      setExplainResult({
        summary: 'This is the gold-standard legacy lookup combination. MATCH finds the numerical row position of the criteria, and INDEX fetches the value from that exact row in the target column.',
        steps: [
          {
            part: 'MATCH(1, (RangeA=ValA)*(RangeB=ValB), 0)',
            meaning: 'Multiplies boolean true/false arrays together (1*1=1) to execute a multi-condition lookup.',
          },
          {
            part: 'INDEX(ReturnRange, row_num)',
            meaning: 'Navigates to the exact row number computed by MATCH and outputs the cell contents.',
          },
        ],
        pitfalls: [
          'In older versions of Excel (pre-365), multi-condition INDEX-MATCH formulas required entering with Ctrl+Shift+Enter (Array Formula).',
          'Always use 0 as the third argument in MATCH for exact matching.',
        ],
      });
    } else {
      setExplainResult({
        summary: 'This formula evaluates conditional logical tests and computes mathematical transformations across selected worksheet cells.',
        steps: [
          {
            part: 'Logical Test',
            meaning: 'Evaluates whether conditions evaluate to TRUE or FALSE.',
          },
          {
            part: 'Value Execution',
            meaning: 'Returns the specified output corresponding to the logical outcome.',
          },
        ],
        pitfalls: [
          'Check for matching opening and closing parentheses.',
          'Verify that text strings inside formulas are enclosed in double quotation marks ("text").',
        ],
      });
    }
  };

  const copyText = (text: string, isAlt = false) => {
    navigator.clipboard.writeText(text);
    if (isAlt) {
      setCopiedAlt(true);
      setTimeout(() => setCopiedAlt(false), 2000);
    } else {
      setCopiedFormula(true);
      setTimeout(() => setCopiedFormula(false), 2000);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Top Mode Toggle */}
      <div className="p-2 rounded-2xl bg-gray-100 dark:bg-gray-800/60 flex items-center gap-2 max-w-md mx-auto">
        <button
          type="button"
          onClick={() => setActiveTab('generate')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'generate'
              ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>English → Formula</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('explain')}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'explain'
              ? 'bg-white dark:bg-gray-900 text-blue-600 dark:text-blue-400 shadow-md'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Formula → Explain</span>
        </button>
      </div>

      {activeTab === 'generate' ? (
        /* English to Formula Mode */
        <div className="space-y-6">
          {/* Presets */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Quick Formula Examples:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {generatePresets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setPrompt(p.prompt)}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                What do you want to calculate in plain English?
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. If Column B is greater than 1000 and Column C is 'Active', multiply Column B by 0.15, otherwise 0.05..."
                rows={3}
                className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 text-sm font-medium text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 mr-2">
                  Target Platform:
                </span>
                <button
                  type="button"
                  onClick={() => setPlatform('excel')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    platform === 'excel'
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Microsoft Excel (365)
                </button>
                <button
                  type="button"
                  onClick={() => setPlatform('sheets')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                    platform === 'sheets'
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  Google Sheets
                </button>
              </div>

              <button
                onClick={handleGenerateFormula}
                disabled={!prompt.trim()}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs hover:opacity-95 transition-opacity shadow-md shadow-blue-600/20 disabled:opacity-50 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Formula</span>
              </button>
            </div>
          </div>

          {/* Generated Result Card */}
          {generateResult && (
            <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md space-y-6 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-center gap-2">
                  <Table className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-black text-lg text-gray-900 dark:text-gray-100">
                    Generated Spreadsheet Formula
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                  {generateResult.platform}
                </span>
              </div>

              {/* Primary Formula Box */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                  Recommended Formula:
                </span>
                <div className="p-4 rounded-2xl bg-gray-900 text-emerald-400 font-mono text-sm sm:text-base flex items-center justify-between gap-4 overflow-x-auto shadow-inner">
                  <code>{generateResult.primaryFormula}</code>
                  <button
                    onClick={() => copyText(generateResult.primaryFormula, false)}
                    className="p-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 transition-colors shrink-0"
                    title="Copy Formula"
                  >
                    {copiedFormula ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Modern Alternative */}
              {generateResult.alternativeFormula && (
                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Alternative Approach:
                  </span>
                  <div className="p-3.5 rounded-xl bg-gray-100 dark:bg-gray-950 text-gray-800 dark:text-gray-200 font-mono text-xs sm:text-sm flex items-center justify-between gap-4 overflow-x-auto border border-gray-200 dark:border-gray-800">
                    <code>{generateResult.alternativeFormula}</code>
                    <button
                      onClick={() => copyText(generateResult.alternativeFormula!, true)}
                      className="p-1.5 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 transition-colors shrink-0"
                      title="Copy Alternative"
                    >
                      {copiedAlt ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Step by Step Breakdown */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Step-by-Step Logic Breakdown:
                </h4>
                <div className="space-y-2">
                  {generateResult.stepBreakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 text-xs space-y-1"
                    >
                      <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                        {item.step}
                      </span>
                      <p className="text-gray-600 dark:text-gray-400 font-medium">
                        {item.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pro Tip */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 space-y-1">
                <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-600" />
                  <span>Pro Spreadsheet Tip:</span>
                </div>
                <p className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed pl-5">
                  {generateResult.proTip}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Formula to Explain Mode */
        <div className="space-y-6">
          {/* Explain Presets */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
              Try Sample Complex Formulas:
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              {explainPresets.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormulaInput(p.formula)}
                  className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-xs"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                Paste any Excel or Google Sheets formula to deconstruct:
              </label>
              <input
                type="text"
                value={formulaInput}
                onChange={(e) => setFormulaInput(e.target.value)}
                placeholder="=IFERROR(INDEX(B2:B100, MATCH(1, (A2:A100=D2)*(C2:C100>0), 0)), 'N/A')"
                className="w-full p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 font-mono text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleExplainFormula}
              disabled={!formulaInput.trim()}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-sm hover:opacity-95 transition-opacity shadow-lg shadow-blue-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Explain Formula Step-by-Step</span>
            </button>
          </div>

          {/* Explanation Results */}
          {explainResult && (
            <div className="p-6 sm:p-8 rounded-3xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-md space-y-6 animate-in fade-in duration-300">
              <div className="space-y-2 border-b border-gray-100 dark:border-gray-800 pb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Formula Summary
                </span>
                <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 leading-relaxed">
                  {explainResult.summary}
                </p>
              </div>

              {/* Step by step components */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Component Syntax Breakdown:
                </h4>
                <div className="space-y-2">
                  {explainResult.steps.map((st, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 space-y-1"
                    >
                      <code className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 block">
                        {st.part}
                      </code>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {st.meaning}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pitfalls */}
              <div className="p-4 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-200/80 dark:border-red-900/60 space-y-2">
                <span className="text-xs font-bold text-red-800 dark:text-red-300 block">
                  ⚠️ Common Pitfalls &amp; Edge Cases:
                </span>
                <ul className="space-y-1 text-xs text-red-950 dark:text-red-200 list-disc pl-5">
                  {explainResult.pitfalls.map((pit, pIdx) => (
                    <li key={pIdx}>{pit}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
