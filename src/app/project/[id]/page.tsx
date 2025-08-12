'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { useAccount } from 'wagmi'
import Navbar from '@/components/Navbar'

// Mock data for demonstration
const mockProject = {
  id: '1',
  name: 'DeFi Yield Aggregator',
  description: 'A smart contract that automatically finds and invests in the highest-yielding DeFi protocols while managing risk through diversification strategies. This project aims to simplify yield farming by automatically rebalancing portfolios across multiple protocols based on real-time APY data and risk metrics.',
  stage: 'Voting' as 'Voting' | 'Funding' | 'Active',
  votes: 127,
  fundingPercentage: 0,
  fundingGoal: 15000,
  currentFunding: 0,
  tags: ['DeFi', 'Yield Farming', 'Smart Contracts', 'Automation'],
  createdAt: '2024-01-15',
  githubRepo: 'https://github.com/example/defi-yield-aggregator',
  requiredVotes: 500,
  contributors: [
    {
      id: '1',
      address: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
      role: 'Smart Contract Developer',
      shareWeight: 35,
      nftId: 'nft-001'
    },
    {
      id: '2',
      address: '0x8ba1f109551bD432803012645Hac136c772c7c8A',
      role: 'Frontend Developer',
      shareWeight: 25,
      nftId: 'nft-002'
    },
    {
      id: '3',
      address: '0x1234567890123456789012345678901234567890',
      role: 'UI/UX Designer',
      shareWeight: 20,
      nftId: 'nft-003'
    },
    {
      id: '4',
      address: '0xabcdef1234567890abcdef1234567890abcdef12',
      role: 'Backend Developer',
      shareWeight: 20,
      nftId: 'nft-004'
    }
  ]
}

const voteOptions = [1, 2, 3, 5]
const tokenOptions = [
  { symbol: 'ETH', name: 'Ethereum', icon: '🔷' },
  { symbol: 'USDT', name: 'Tether USD', icon: '💚' },
  { symbol: 'OKB', name: 'OKB Token', icon: '🟡' },
  { symbol: 'USDC', name: 'USD Coin', icon: '🔵' }
]

export default function ProjectDetailPage() {
  const params = useParams()
  const { isConnected, address } = useAccount()
  const [selectedVotes, setSelectedVotes] = useState(1)
  const [selectedToken, setSelectedToken] = useState(tokenOptions[0])
  const [fundingAmount, setFundingAmount] = useState('')
  const [availableVotes] = useState(5) // User has 5 votes to spend

  const project = mockProject // In real app, fetch by params.id
  
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Voting':
        return 'bg-blue-300'
      case 'Funding':
        return 'bg-yellow-300'
      case 'Active':
        return 'bg-green-300'
      default:
        return 'bg-gray-300'
    }
  }

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'Voting':
        return '🗳️'
      case 'Funding':
        return '💰'
      case 'Active':
        return '🚀'
      default:
        return '📋'
    }
  }

  const handleVote = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    alert(`Voting with ${selectedVotes} votes`)
  }

  const handleFund = () => {
    if (!isConnected) {
      alert('Please connect your wallet first')
      return
    }
    if (!fundingAmount || parseFloat(fundingAmount) <= 0) {
      alert('Please enter a valid amount')
      return
    }
    alert(`Funding ${fundingAmount} ${selectedToken.symbol}`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Project Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl md:text-6xl font-extrabold text-black">
              {project.name}
            </h1>
            <div className={`${getStageColor(project.stage)} px-4 py-2 border-4 border-black text-black font-extrabold text-lg flex items-center space-x-2 shadow-[4px_4px_0px_black]`}>
              <span>{getStageIcon(project.stage)}</span>
              <span>{project.stage}</span>
            </div>
          </div>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, index) => (
              <span key={index} className="bg-gray-200 px-3 py-1 border-2 border-black text-sm font-bold text-black">
                {tag}
              </span>
            ))}
          </div>

          {/* GitHub Link */}
          <a 
            href={project.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_white] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_white] transition-all duration-200"
          >
            📁 View on GitHub
          </a>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Left Column: Project Details */}
          <div className="lg:col-span-2">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-8">
              <h2 className="text-2xl font-extrabold text-black mb-4">Project Description</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {project.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-100 border-2 border-black">
                  <div className="text-2xl font-extrabold text-black">{project.votes}</div>
                  <div className="text-sm text-gray-600">Total Votes</div>
                </div>
                <div className="text-center p-4 bg-gray-100 border-2 border-black">
                  <div className="text-2xl font-extrabold text-black">{project.createdAt}</div>
                  <div className="text-sm text-gray-600">Created</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interaction Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-6">
              {project.stage === 'Voting' && (
                <div>
                  <h3 className="text-xl font-extrabold text-black mb-4">Cast Your Vote</h3>
                  
                  {/* Vote Options */}
                  <div className="space-y-3 mb-6">
                    {voteOptions.map((votes) => (
                      <button
                        key={votes}
                        onClick={() => setSelectedVotes(votes)}
                        className={`w-full p-3 border-2 border-black font-bold transition-all duration-200 ${
                          selectedVotes === votes
                            ? 'bg-yellow-300 text-black shadow-[4px_4px_0px_black]'
                            : 'bg-white text-black shadow-[2px_2px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_black]'
                        }`}
                      >
                        {votes} Vote{votes > 1 ? 's' : ''}
                      </button>
                    ))}
                  </div>

                  {/* Available Votes */}
                  <div className="mb-4 p-3 bg-gray-100 border-2 border-black">
                    <div className="text-sm text-gray-600">Available Votes</div>
                    <div className="text-lg font-bold text-black">{availableVotes} votes</div>
                  </div>

                  {/* Cast Vote Button */}
                  <button
                    onClick={handleVote}
                    className="w-full bg-yellow-300 text-black font-extrabold py-4 px-6 border-4 border-black shadow-[6px_6px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_black] transition-all duration-200"
                  >
                    CAST VOTE
                  </button>
                </div>
              )}

              {project.stage === 'Funding' && (
                <div>
                  <h3 className="text-xl font-extrabold text-black mb-4">Fund This Project</h3>
                  
                  {/* Funding Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm font-bold text-black mb-2">
                      <span>Progress</span>
                      <span>{project.fundingPercentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 border-2 border-black h-4">
                      <div 
                        className="bg-yellow-400 h-full border-r-2 border-black" 
                        style={{ width: `${Math.min(project.fundingPercentage || 0, 100)}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {project.currentFunding} / {project.fundingGoal} USDC
                    </div>
                  </div>

                  {/* Token Selector */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-black mb-2">Select Token</label>
                    <select
                      value={selectedToken.symbol}
                      onChange={(e) => setSelectedToken(tokenOptions.find(t => t.symbol === e.target.value) || tokenOptions[0])}
                      className="w-full p-3 border-2 border-black bg-white text-black font-bold focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    >
                      {tokenOptions.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.icon} {token.name} ({token.symbol})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount Input */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-black mb-2">Amount</label>
                    <input
                      type="number"
                      value={fundingAmount}
                      onChange={(e) => setFundingAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full p-3 border-2 border-black bg-white text-black font-bold focus:outline-none focus:ring-2 focus:ring-yellow-300"
                    />
                  </div>

                  {/* Fund Button */}
                  <button
                    onClick={handleFund}
                    className="w-full bg-yellow-300 text-black font-extrabold py-4 px-6 border-4 border-black shadow-[6px_6px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_black] transition-all duration-200"
                  >
                    FUND NOW
                  </button>
                </div>
              )}

              {project.stage === 'Active' && (
                <div>
                  <h3 className="text-xl font-extrabold text-black mb-4">Project Status</h3>
                  <div className="text-center p-6 bg-green-100 border-2 border-black">
                    <div className="text-4xl mb-2">🚀</div>
                    <div className="text-lg font-bold text-black">Project is Live!</div>
                    <div className="text-sm text-gray-600">Contributors are actively working</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Contributors Section */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-8">
          <h2 className="text-3xl font-extrabold text-black mb-6">Contributors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.contributors.map((contributor) => (
              <div key={contributor.id} className="border-4 border-black bg-gray-50 p-4 shadow-[4px_4px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_black] transition-all duration-200">
                <div className="text-center">
                  <div className="w-16 h-16 bg-yellow-300 border-2 border-black mx-auto mb-3 flex items-center justify-center text-2xl">
                    👤
                  </div>
                  <div className="text-sm font-bold text-black mb-1">
                    {contributor.address.slice(0, 6)}...{contributor.address.slice(-4)}
                  </div>
                  <div className="text-xs text-gray-600 mb-2">{contributor.role}</div>
                  <div className="text-lg font-extrabold text-black mb-2">
                    {contributor.shareWeight}%
                  </div>
                  <a 
                    href={`/nft/${contributor.nftId}`}
                    className="inline-block bg-blue-300 text-black text-xs font-bold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_black] transition-all duration-200"
                  >
                    View NFT
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
