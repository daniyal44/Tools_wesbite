'use client';

import * as React from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui';

export function ContactFormClient() {
  const [topic, setTopic] = React.useState('request');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    // Simulate instantaneous local processing / acknowledgment
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  if (submitted) {
    return (
      <div className="py-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Message Received!
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Thank you for reaching out. We review all tool requests and community feedback continuously as we expand Zevylo.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setMessage('');
          }}
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-2"
        >
          Send another note
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          What is your message about?
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'request', label: 'Tool Request' },
            { id: 'bug', label: 'Bug Report' },
            { id: 'other', label: 'Feedback' },
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setTopic(item.id)}
              className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                topic === item.id
                  ? 'bg-blue-50 border-blue-600 text-blue-700 dark:bg-blue-950/50 dark:border-blue-500 dark:text-blue-300'
                  : 'border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Name (Optional)
          </label>
          <Input
            type="text"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address (Optional)
          </label>
          <Input
            type="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {topic === 'request'
            ? 'Which tool would you like us to build?'
            : topic === 'bug'
            ? 'Describe the issue or unexpected behavior'
            : 'Your message'}
        </label>
        <Textarea
          required
          rows={5}
          placeholder={
            topic === 'request'
              ? 'e.g. Please build an Epoch timestamp to human readable date converter with milliseconds support...'
              : 'Provide details...'
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting || !message.trim()}
        className="w-full flex items-center justify-center gap-2 py-3"
      >
        <Send className="w-4 h-4" />
        {isSubmitting ? 'Sending...' : 'Submit Message'}
      </Button>
    </form>
  );
}
