import { ToolDefinition } from '@/lib/tools/types';

export const cryptoProfitCalculatorDefinition: ToolDefinition = {
  id: 'crypto-profit-calculator',
  slug: 'crypto-profit-calculator',
  name: 'Crypto Profit & Loss Calculator',
  shortDescription: 'Calculate cryptocurrency returns, net profit/loss, ROI %, and exchange fees.',
  longDescription: 'Accurately determine investment gains and losses for Bitcoin, Ethereum, and altcoin trades. Input initial investment amount or coin units, buy price, sell target, and exchange maker/taker fees to see net dollar payout, percentage ROI, total fees, and exact breakeven exit prices.',
  category: 'calculators',
  icon: 'trending-up',
  keywords: ['crypto profit calculator', 'bitcoin profit calculator', 'crypto roi calculator', 'crypto fee calculator', 'cryptocurrency exit price', 'breakeven calculator'],
  searchableText: 'crypto profit calculator bitcoin ethereum solana investment return roi trading fees maker taker breakeven sell target payout net profit loss',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: false,
  seo: {
    title: 'Crypto Profit & Loss Calculator — Calculate ROI & Trading Fees | Zevylo',
    description: 'Free crypto profit calculator. Determine your net gains, return on investment (ROI), exchange buy/sell fees, and total payout accurately.',
    keywords: ['crypto profit calculator', 'bitcoin return calculator', 'crypto roi calculator online', 'crypto trading fee profit calculator'],
  },
  faq: [
    {
      question: 'Does this calculator connect to my crypto wallet or exchange?',
      answer: 'No. All calculations are 100% mathematical and execute client-side in your browser. No wallet connections, logins, or API keys are required.',
    },
    {
      question: 'How are exchange fees factored in?',
      answer: 'Buy fees are subtracted from your initial investment before purchasing coins, and sell fees are deducted from gross proceeds, providing your true net profit and accurate breakeven price.',
    },
  ],
  relatedTools: ['roi-calculator', 'percentage-calculator', 'profit-loss-calculator', 'inflation-calculator'],
  status: 'active',
  visibility: 'public',
  sortOrder: 22,
  component: 'crypto-profit-calculator',
};
