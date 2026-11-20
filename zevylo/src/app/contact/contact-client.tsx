'use client';

import * as React from 'react';
import { Send, CheckCircle2, AlertCircle, Mail } from 'lucide-react';
import { Button, Input, Textarea } from '@/components/ui';

const CONTACT_EMAIL = 'm.daniyalkhan490@gmail.com';

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function ContactFormClient() {
  const [topic, setTopic] = React.useState('request');
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState<Status>('idle');
  const [errorMessage, setErrorMessage] = React.useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 10) {
      setStatus('error');
      setErrorMessage('Please add a little more detail (at least 10 characters).');
      return;
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus('error');
      setErrorMessage('That email address does not look valid. Leave it blank if you prefer not to share one.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const body = new URLSearchParams({
        'form-name': 'contact',
        topic,
        name: name.trim(),
        email: email.trim(),
        message: trimmedMessage,
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });

      if (!response.ok) {
        throw new Error(`Submission failed with status ${response.status}`);
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setErrorMessage(
        `The form could not be delivered right now. Please email ${CONTACT_EMAIL} directly instead.`
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="py-8 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Message sent
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 max-w-md mx-auto">
          Your message has been submitted. If you included an email address, we may reply there.
          Tool requests and bug reports are reviewed as capacity allows.
        </p>
        <button
          onClick={() => {
            setStatus('idle');
            setMessage('');
            setName('');
            setEmail('');
          }}
          className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline pt-2"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <input type="hidden" name="form-name" value="contact" />
      <p className="hidden" aria-hidden="true">
        <label>
          Do not fill this out if you are human: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="space-y-2">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          What is your message about?
        </span>
        <div className="grid grid-cols-3 gap-2" role="group" aria-label="Message topic">
          {[
            { id: 'request', label: 'Tool Request' },
            { id: 'bug', label: 'Bug Report' },
            { id: 'other', label: 'Feedback' },
          ].map((item) => (
            <button
              type="button"
              key={item.id}
              aria-pressed={topic === item.id}
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
        <input type="hidden" name="topic" value={topic} />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Your Name (optional)
          </label>
          <Input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address (optional)
          </label>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {topic === 'request'
            ? 'Which tool would you like us to build?'
            : topic === 'bug'
            ? 'Describe the issue or unexpected behavior'
            : 'Your message'}
        </label>
        <Textarea
          id="contact-message"
          name="message"
          required
          rows={5}
          minLength={10}
          placeholder={
            topic === 'request'
              ? 'e.g. A timestamp to readable date converter with millisecond support...'
              : 'Include the tool name, browser, and what you expected to happen.'
          }
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {status === 'error' && (
        <div
          role="alert"
          className="flex items-start gap-2 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 p-3 text-xs text-red-800 dark:text-red-300"
        >
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <Button
        type="submit"
        disabled={status === 'submitting' || message.trim().length < 10}
        className="w-full flex items-center justify-center gap-2 py-3"
      >
        <Send className="w-4 h-4" />
        {status === 'submitting' ? 'Sending...' : 'Submit Message'}
      </Button>

      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed flex items-start gap-2">
        <Mail className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <span>
          Prefer email? Write to{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 dark:text-blue-400 underline">
            {CONTACT_EMAIL}
          </a>
          . Messages are processed by Netlify Forms; see the{' '}
          <a href="/privacy" className="text-blue-600 dark:text-blue-400 underline">Privacy Policy</a>.
        </span>
      </p>
    </form>
  );
}
