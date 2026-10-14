'use client';

import React, { useState, useMemo } from 'react';
import { Plus, Trash2, Printer, FileText, CheckCircle2 } from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export default function InvoiceGenerator() {
  const [invoiceNumber, setInvoiceNumber] = useState('INV-2026-001');
  const [issueDate, setIssueDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  });
  const [currencySymbol, setCurrencySymbol] = useState('$');

  // Sender info
  const [senderName, setSenderName] = useState('Zevylo Creative Agency');
  const [senderEmail, setSenderEmail] = useState('billing@zevylo.com');
  const [senderAddress, setSenderAddress] = useState('100 Innovation Way\nSan Francisco, CA 94107');

  // Client info
  const [clientName, setClientName] = useState('Acme Corporation');
  const [clientEmail, setClientEmail] = useState('accounts@acme.corp');
  const [clientAddress, setClientAddress] = useState('500 Enterprise Blvd, Suite 200\nAustin, TX 78701');

  // Line items
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Full-Stack Web Application Development', quantity: 1, rate: 2500 },
    { id: '2', description: 'UI/UX Design System & Mobile Optimization', quantity: 1, rate: 800 },
    { id: '3', description: 'Cloud Infrastructure & High Availability Setup', quantity: 1, rate: 450 },
  ]);

  const [taxRate, setTaxRate] = useState<number>(8.5);
  const [discount, setDiscount] = useState<number>(0);
  const [notes, setNotes] = useState(
    'Payment due within 14 days of invoice date. Thank you for your business!'
  );

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  }, [items]);

  const taxAmount = useMemo(() => (subtotal * taxRate) / 100, [subtotal, taxRate]);
  const total = useMemo(() => Math.max(0, subtotal + taxAmount - discount), [subtotal, taxAmount, discount]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: Date.now().toString(), description: 'New Service or Product', quantity: 1, rate: 100 },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Action Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 shadow-sm print:hidden">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white">
          <FileText className="h-5 w-5 text-blue-600" />
          <span>Professional Invoice Builder</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-blue-700 shadow-sm active:scale-95 transition-all"
          >
            <Printer className="h-4 w-4" /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Invoice Sheet (Formatted like an actual letterhead invoice) */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-8 sm:p-12 shadow-md print:border-none print:shadow-none print:p-0">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div>
            <span className="text-3xl font-black text-blue-600 tracking-tight">INVOICE</span>
            <div className="mt-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Zevylo Invoice Engine
            </div>
          </div>

          <div className="space-y-2 text-right sm:w-64">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-semibold">Invoice No:</span>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-32 rounded border border-gray-200 dark:border-gray-700 bg-transparent px-2 py-1 text-right font-bold text-xs"
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-semibold">Issue Date:</span>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="rounded border border-gray-200 dark:border-gray-700 bg-transparent px-2 py-1 text-right text-xs"
              />
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500 font-semibold">Due Date:</span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="rounded border border-gray-200 dark:border-gray-700 bg-transparent px-2 py-1 text-right text-xs"
              />
            </div>
          </div>
        </div>

        {/* Sender & Recipient addresses */}
        <div className="grid gap-6 sm:grid-cols-2 py-8 border-b border-gray-200 dark:border-gray-800">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">From (Sender):</span>
            <input
              type="text"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              placeholder="Your Business Name"
              className="w-full text-base font-bold text-gray-900 dark:text-white bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none mb-1"
            />
            <input
              type="email"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              placeholder="Email address"
              className="w-full text-xs text-gray-500 bg-transparent border-b border-transparent hover:border-gray-300 focus:outline-none mb-1"
            />
            <textarea
              rows={2}
              value={senderAddress}
              onChange={(e) => setSenderAddress(e.target.value)}
              placeholder="Address / City / Country"
              className="w-full text-xs text-gray-500 bg-transparent border-b border-transparent hover:border-gray-300 focus:outline-none resize-none"
            />
          </div>

          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Bill To (Client):</span>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Client Company Name"
              className="w-full text-base font-bold text-gray-900 dark:text-white bg-transparent border-b border-transparent hover:border-gray-300 focus:border-blue-500 focus:outline-none mb-1"
            />
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              placeholder="Client email address"
              className="w-full text-xs text-gray-500 bg-transparent border-b border-transparent hover:border-gray-300 focus:outline-none mb-1"
            />
            <textarea
              rows={2}
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
              placeholder="Client Address / City"
              className="w-full text-xs text-gray-500 bg-transparent border-b border-transparent hover:border-gray-300 focus:outline-none resize-none"
            />
          </div>
        </div>

        {/* Line Items Table */}
        <div className="py-8">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-800 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="pb-3 w-1/2">Description</th>
                  <th className="pb-3 w-20 text-center">Qty</th>
                  <th className="pb-3 w-28 text-right">Rate</th>
                  <th className="pb-3 w-28 text-right">Amount</th>
                  <th className="pb-3 w-12 text-center print:hidden"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {items.map((it) => (
                  <tr key={it.id}>
                    <td className="py-3">
                      <input
                        type="text"
                        value={it.description}
                        onChange={(e) => updateItem(it.id, 'description', e.target.value)}
                        className="w-full bg-transparent font-medium text-xs sm:text-sm text-gray-900 dark:text-white focus:outline-none"
                      />
                    </td>
                    <td className="py-3 text-center">
                      <input
                        type="number"
                        min="1"
                        value={it.quantity}
                        onChange={(e) => updateItem(it.id, 'quantity', Math.max(1, parseInt(e.target.value, 10) || 1))}
                        className="w-16 text-center rounded border border-gray-200 dark:border-gray-700 bg-transparent py-1 text-xs sm:text-sm"
                      />
                    </td>
                    <td className="py-3 text-right">
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={it.rate}
                        onChange={(e) => updateItem(it.id, 'rate', Math.max(0, parseFloat(e.target.value) || 0))}
                        className="w-24 text-right rounded border border-gray-200 dark:border-gray-700 bg-transparent py-1 text-xs sm:text-sm"
                      />
                    </td>
                    <td className="py-3 text-right font-bold text-xs sm:text-sm font-mono">
                      {currencySymbol}{(it.quantity * it.rate).toFixed(2)}
                    </td>
                    <td className="py-3 text-center print:hidden">
                      {items.length > 1 && (
                        <button
                          onClick={() => removeItem(it.id)}
                          className="text-gray-400 hover:text-red-500 p-1"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 print:hidden">
            <button
              onClick={addItem}
              className="inline-flex items-center gap-1.5 rounded-lg border border-dashed border-gray-300 dark:border-gray-700 px-3 py-1.5 text-xs font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/20"
            >
              <Plus className="h-3.5 w-3.5" /> Add Line Item
            </button>
          </div>
        </div>

        {/* Invoice Summary and Total */}
        <div className="flex flex-col sm:flex-row justify-between gap-6 pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="sm:w-1/2">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
              Payment Terms & Notes:
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full text-xs text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none"
            />
          </div>

          <div className="sm:w-64 space-y-2 text-right">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Subtotal:</span>
              <span className="font-mono font-bold">{currencySymbol}{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                Tax rate (%):
                <input
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value) || 0)}
                  className="w-12 text-center rounded border border-gray-200 dark:border-gray-700 bg-transparent py-0.5 text-xs"
                />
              </span>
              <span className="font-mono font-bold">{currencySymbol}{taxAmount.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="flex items-center gap-1">
                Discount ({currencySymbol}):
                <input
                  type="number"
                  value={discount}
                  onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                  className="w-14 text-center rounded border border-gray-200 dark:border-gray-700 bg-transparent py-0.5 text-xs"
                />
              </span>
              <span className="font-mono font-bold">-{currencySymbol}{discount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-800 text-base font-black text-gray-900 dark:text-white">
              <span>Grand Total:</span>
              <span className="font-mono text-blue-600 dark:text-blue-400">{currencySymbol}{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Currency selection print-hidden */}
        <div className="mt-8 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-2 print:hidden text-xs text-gray-500">
          <span>Currency:</span>
          {['$', '€', '£', 'CA$', '₹', '₨', '¥'].map((sym) => (
            <button
              key={sym}
              onClick={() => setCurrencySymbol(sym)}
              className={`px-2 py-0.5 rounded border text-xs font-bold ${
                currencySymbol === sym
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800'
              }`}
            >
              {sym}
            </button>
          ))}
          <span className="ml-auto flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-3.5 w-3.5" /> 100% Private Client-Side Document
          </span>
        </div>
      </div>
    </div>
  );
}
