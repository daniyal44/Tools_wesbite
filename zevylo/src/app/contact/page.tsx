import { Metadata } from 'next';
import { ContactFormClient } from './contact-client';
import { MessageSquare, Lightbulb, Bug } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact & Tool Request — Zevylo',
  description:
    'Send feedback, report a bug, or request a new online tool to be added to the Zevylo platform.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 sm:py-16 space-y-12">
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
          Get in Touch
        </h1>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
          Have an idea for a new tool? Found a bug? We build new tools based directly on user feedback.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-2 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2">
            <Lightbulb className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100">Tool Requests</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Tell us which calculator, converter, or generator you need most.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-2 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center mb-2">
            <Bug className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100">Bug Reports</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Spot an calculation edge case or display bug? We patch it promptly.
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 space-y-2 text-center flex flex-col items-center">
          <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/40 text-green-600 dark:text-green-400 flex items-center justify-center mb-2">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-gray-900 dark:text-gray-100">General Feedback</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
            Share UX feedback, workflow tips, or collaboration ideas.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 sm:p-10 shadow-sm max-w-2xl mx-auto">
        <ContactFormClient />
      </div>
    </div>
  );
}
