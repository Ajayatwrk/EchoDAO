// Shared mock data for EchoDAO dApp

export interface Project {
  id: string
  name: string
  description: string
  stage: 'Voting' | 'Funding' | 'Active'
  votes?: number
  tags: string[]
  createdAt: string
  owner: string
  fundingGoal?: number
  currentFunding?: number
  fundingPercentage?: number
  githubRepo?: string
  contributors?: number
  daysLeft?: number
  requiredVotes?: number
}

export interface VotingProject {
  id: string
  name: string
  description: string
  tags: string[]
  currentVotes: number
  requiredVotes: number
  owner: string
  createdAt: string
  githubRepo: string
}

export interface FundingProject {
  id: string
  name: string
  description: string
  tags: string[]
  fundingGoal: number
  currentFunding: number
  fundingPercentage: number
  daysLeft: number
  owner: string
  createdAt: string
  githubRepo: string
  contributors: number
}

export interface NFT {
  id: string
  projectName: string
  projectId: string
  role: string
  shareWeight: number
  revenueShare: number
  mintedAt: string
  isListed: boolean
  listPrice?: number
  marketplaceUrl?: string
}

export interface GovernanceProposal {
  id: string
  title: string
  description: string
  status: 'Active' | 'Passed' | 'Failed' | 'Executed'
  forVotes: number
  againstVotes: number
  quorum: number
  endTime: string
  proposer: string
  actions: string[]
}

export interface TreasuryTransaction {
  id: string
  type: 'Income' | 'Expense' | 'Transfer'
  amount: number
  description: string
  date: string
  txHash: string
}

export interface TokenOption {
  symbol: string
  name: string
  icon: string
  balance: number
  price: number
}

// Main projects data
export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'DeFi Yield Aggregator',
    description: 'A smart contract that automatically finds and invests in the highest-yielding DeFi protocols while managing risk through diversification strategies.',
    stage: 'Voting',
    votes: 127,
    tags: ['DeFi', 'Yield Farming', 'Smart Contracts'],
    createdAt: '2024-01-15',
    owner: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    fundingGoal: 15000,
    currentFunding: 0,
    fundingPercentage: 0,
    githubRepo: 'https://github.com/user/defi-yield-aggregator',
    requiredVotes: 500
  },
  {
    id: '2',
    name: 'NFT Marketplace for Artists',
    description: 'Decentralized marketplace where artists can mint, sell, and earn royalties from their digital artwork with built-in copyright protection.',
    stage: 'Funding',
    votes: 89,
    fundingPercentage: 67,
    fundingGoal: 5000,
    currentFunding: 3350,
    tags: ['NFT', 'Art', 'Marketplace'],
    createdAt: '2024-01-10',
    owner: '0x8ba1f109551bD432803012645Hac136c772c7c8A',
    githubRepo: 'https://github.com/user/nft-marketplace',
    contributors: 23,
    daysLeft: 12
  },
  {
    id: '3',
    name: 'DAO Governance Dashboard',
    description: 'Comprehensive dashboard for DAO members to view proposals, vote, and track governance metrics with real-time analytics.',
    stage: 'Active',
    tags: ['DAO', 'Governance', 'Analytics'],
    createdAt: '2024-01-05',
    owner: '0x1234567890123456789012345678901234567890',
    githubRepo: 'https://github.com/user/dao-governance'
  },
  {
    id: '4',
    name: 'Cross-Chain Bridge',
    description: 'Secure bridge protocol enabling seamless asset transfers between Ethereum, Polygon, and BSC with minimal fees and fast finality.',
    stage: 'Voting',
    votes: 203,
    tags: ['Bridge', 'Cross-Chain', 'Interoperability'],
    createdAt: '2024-01-12',
    owner: '0xabcdef1234567890abcdef1234567890abcdef12',
    fundingGoal: 25000,
    currentFunding: 0,
    fundingPercentage: 0,
    githubRepo: 'https://github.com/user/cross-chain-bridge',
    requiredVotes: 500
  },
  {
    id: '5',
    name: 'Social Trading Platform',
    description: 'Platform where users can follow and copy successful traders, with transparent performance tracking and risk management tools.',
    stage: 'Funding',
    votes: 156,
    fundingPercentage: 89,
    fundingGoal: 8000,
    currentFunding: 7120,
    tags: ['Social', 'Trading', 'Copy Trading'],
    createdAt: '2024-01-08',
    owner: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    githubRepo: 'https://github.com/user/social-trading',
    contributors: 45,
    daysLeft: 5
  },
  {
    id: '6',
    name: 'Decentralized Identity System',
    description: 'Self-sovereign identity solution using zero-knowledge proofs for privacy-preserving authentication and credential verification.',
    stage: 'Voting',
    votes: 78,
    tags: ['Identity', 'Privacy', 'ZK Proofs'],
    createdAt: '2024-01-14',
    owner: '0x8ba1f109551bD432803012645Hac136c772c7c8A',
    fundingGoal: 12000,
    currentFunding: 0,
    fundingPercentage: 0,
    githubRepo: 'https://github.com/user/decentralized-identity',
    requiredVotes: 500
  },
  {
    id: '7',
    name: 'Gaming NFT Marketplace',
    description: 'Specialized marketplace for gaming assets, skins, and collectibles with integration support for popular blockchain games.',
    stage: 'Active',
    tags: ['Gaming', 'NFT', 'Marketplace'],
    createdAt: '2024-01-03',
    owner: '0x1234567890123456789012345678901234567890',
    githubRepo: 'https://github.com/user/gaming-nft-marketplace'
  },
  {
    id: '8',
    name: 'DeFi Insurance Protocol',
    description: 'Decentralized insurance coverage for DeFi protocols, protecting users against smart contract risks and protocol failures.',
    stage: 'Funding',
    votes: 234,
    fundingPercentage: 45,
    fundingGoal: 12000,
    currentFunding: 5400,
    tags: ['DeFi', 'Insurance', 'Risk Management'],
    createdAt: '2024-01-06',
    owner: '0xabcdef1234567890abcdef1234567890abcdef12',
    githubRepo: 'https://github.com/user/defi-insurance',
    contributors: 31,
    daysLeft: 18
  }
]

// Voting projects (filtered from main projects)
export const mockVotingProjects: VotingProject[] = mockProjects
  .filter(p => p.stage === 'Voting')
  .map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    tags: p.tags,
    currentVotes: p.votes || 0,
    requiredVotes: p.requiredVotes || 500,
    owner: p.owner,
    createdAt: p.createdAt,
    githubRepo: p.githubRepo || ''
  }))

// Funding projects (filtered from main projects)
export const mockFundingProjects: FundingProject[] = mockProjects
  .filter(p => p.stage === 'Funding')
  .map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    tags: p.tags,
    fundingGoal: p.fundingGoal || 0,
    currentFunding: p.currentFunding || 0,
    fundingPercentage: p.fundingPercentage || 0,
    daysLeft: p.daysLeft || 0,
    owner: p.owner,
    createdAt: p.createdAt,
    githubRepo: p.githubRepo || '',
    contributors: p.contributors || 0
  }))

// Mock NFTs data
export const mockNFTs: NFT[] = [
  {
    id: '1',
    projectName: 'DeFi Yield Aggregator',
    projectId: '1',
    role: 'Smart Contract Developer',
    shareWeight: 25,
    revenueShare: 0.25,
    mintedAt: '2024-01-20',
    isListed: false
  },
  {
    id: '2',
    projectName: 'NFT Marketplace for Artists',
    projectId: '2',
    role: 'Frontend Developer',
    shareWeight: 20,
    revenueShare: 0.20,
    mintedAt: '2024-01-18',
    isListed: true,
    listPrice: 0.5,
    marketplaceUrl: 'https://opensea.io/collection/echodao-contributions'
  },
  {
    id: '3',
    projectName: 'Social Trading Platform',
    projectId: '5',
    role: 'UI/UX Designer',
    shareWeight: 15,
    revenueShare: 0.15,
    mintedAt: '2024-01-15',
    isListed: false
  }
]

// Mock governance proposals
export const mockGovernanceProposals: GovernanceProposal[] = [
  {
    id: '1',
    title: 'Increase Platform Fee to 2.5%',
    description: 'Proposal to increase the platform fee from 2% to 2.5% to fund additional development and marketing efforts.',
    status: 'Active',
    forVotes: 1250,
    againstVotes: 320,
    quorum: 2000,
    endTime: '2024-02-15',
    proposer: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    actions: ['Update fee parameter', 'Distribute additional revenue']
  },
  {
    id: '2',
    title: 'Add Support for Polygon Network',
    description: 'Extend EchoDAO to support projects on Polygon network for lower gas fees and faster transactions.',
    status: 'Passed',
    forVotes: 2100,
    againstVotes: 150,
    quorum: 2000,
    endTime: '2024-01-30',
    proposer: '0x8ba1f109551bD432803012645Hac136c772c7c8A',
    actions: ['Deploy contracts on Polygon', 'Update frontend', 'Add network selector']
  }
]

// Mock treasury transactions
export const mockTreasuryTransactions: TreasuryTransaction[] = [
  {
    id: '1',
    type: 'Income',
    amount: 5000,
    description: 'Platform fees from successful projects',
    date: '2024-01-20',
    txHash: '0x1234...5678'
  },
  {
    id: '2',
    type: 'Expense',
    amount: -1500,
    description: 'Development team payment',
    date: '2024-01-19',
    txHash: '0x8765...4321'
  }
]

// Mock token options
export const tokenOptions: TokenOption[] = [
  { symbol: 'ETH', name: 'Ethereum', icon: '🔷', balance: 2.5, price: 2500 },
  { symbol: 'USDT', name: 'Tether', icon: '💚', balance: 5000, price: 1 },
  { symbol: 'OKB', name: 'OKB Token', icon: '🟡', balance: 100, price: 45 },
  { symbol: 'USDC', name: 'USD Coin', icon: '🔵', balance: 3000, price: 1 },
  { symbol: 'MATIC', name: 'Polygon', icon: '🟣', balance: 500, price: 0.8 }
]

// Mock user activity data
export const mockUserActivity = {
  votes: [
    { project: 'DeFi Yield Aggregator', votes: 3, date: '2024-01-20' },
    { project: 'Cross-Chain Bridge', votes: 2, date: '2024-01-19' }
  ],
  fundings: [
    { project: 'NFT Marketplace for Artists', amount: 500, token: 'USDC', date: '2024-01-18' },
    { project: 'Social Trading Platform', amount: 1000, token: 'ETH', date: '2024-01-15' }
  ],
  postedProjects: mockProjects.filter(p => p.owner === '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6')
}
