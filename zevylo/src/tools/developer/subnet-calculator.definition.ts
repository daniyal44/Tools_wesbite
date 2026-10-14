import { ToolDefinition } from '@/lib/tools/types';

export const subnetCalculatorDefinition: ToolDefinition = {
  id: 'subnet-calculator',
  slug: 'subnet-calculator',
  name: 'IPv4 CIDR Subnet Calculator',
  shortDescription: 'Calculate network ranges, broadcast IP, netmask, wildcard, and usable host capacity from any CIDR.',
  longDescription: 'Comprehensive networking subnet calculator. Input any IPv4 address with CIDR prefix notation (/8 to /32) or standard netmask to instantly compute Network Address, Broadcast Address, Usable Host Range, Total Usable IPs, Wildcard Mask, Binary IP breakdown, and Network Class (A, B, C) with zero server reliance.',
  category: 'developer',
  icon: 'network',
  keywords: ['subnet calculator', 'cidr calculator', 'ipv4 subnetting', 'netmask calculator', 'ip range calculator'],
  searchableText: 'subnet calculator cidr ipv4 netmask broadcast usable host range wildcard ip address networking client side',
  version: '1.0.0',
  executionMode: 'client',
  requiresAuth: false,
  requiresUpload: false,
  supportsBatch: false,
  supportsDownload: false,
  supportsShare: false,
  supportsCopy: true,
  seo: {
    title: 'IPv4 CIDR Subnet Calculator — Free Network Tool | Zevylo',
    description: 'Calculate IP subnets, netmask, broadcast address, and usable host ranges with CIDR notation. Fast, offline-ready network calculator.',
    keywords: ['subnet calculator', 'cidr calculator free', 'ipv4 subnet tool', 'network address calculator'],
  },
  faq: [
    {
      question: 'What is CIDR notation?',
      answer: 'Classless Inter-Domain Routing (CIDR) uses a slash followed by a number (like /24) to represent the number of consecutive leading bits in the subnet mask.',
    },
    {
      question: 'How many usable hosts are in a /24 subnet?',
      answer: 'A /24 subnet contains 256 total IP addresses, with 254 usable hosts (subtracting the network and broadcast addresses).',
    },
  ],
  relatedTools: ['number-base-converter', 'json-formatter', 'base64'],
  status: 'active',
  visibility: 'public',
  sortOrder: 25,
  component: 'subnet-calculator',
};
