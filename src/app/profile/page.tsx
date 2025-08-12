'use client'

import { useState, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

interface Vote {
  id: string
  projectName: string
  projectId: string
  votes: number
  cost: number
  timestamp: string
}

interface Funding {
  id: string
  projectName: string
  projectId: string
  amount: number
  token: string
  timestamp: string
}

interface PostedProject {
  id: string
  name: string
  stage: 'Voting' | 'Funding' | 'Active'
  votes: number
  fundingPercentage: number
  createdAt: string
}

interface ContributionNFT {
  id: string
  projectName: string
  projectId: string
  role: string
  shareWeight: number
  mintedAt: string
}

const mockVotes: Vote[] = [
  {
    id: '1',
    projectName: 'DeFi Yield Aggregator',
    projectId: '1',
    votes: 5,
    cost: 0.025,
    timestamp: '2024-01-20 14:30'
  },
  {
    id: '2',
    projectName: 'NFT Marketplace',
    projectId: '2',
    votes: 3,
    cost: 0.009,
    timestamp: '2024-01-18 09:15'
  }
]

const mockFundings: Funding[] = [
  {
    id: '1',
    projectName: 'DeFi Yield Aggregator',
    projectId: '1',
    amount: 1000,
    token: 'USDT',
    timestamp: '2024-01-21 16:45'
  },
  {
    id: '2',
    projectName: 'Cross-chain Bridge',
    projectId: '3',
    amount: 0.5,
    token: 'ETH',
    timestamp: '2024-01-19 11:20'
  }
]

const mockPostedProjects: PostedProject[] = [
  {
    id: '1',
    name: 'DeFi Yield Aggregator',
    stage: 'Voting',
    votes: 127,
    fundingPercentage: 0,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'NFT Marketplace',
    stage: 'Funding',
    votes: 89,
    fundingPercentage: 45,
    createdAt: '2024-01-10'
  }
]

const mockNFTs: ContributionNFT[] = [
  {
    id: '1',
    projectName: 'DeFi Yield Aggregator',
    projectId: '1',
    role: 'Smart Contract Developer',
    shareWeight: 35,
    mintedAt: '2024-01-20'
  },
  {
    id: '2',
    projectName: 'NFT Marketplace',
    projectId: '2',
    role: 'UI/UX Designer',
    shareWeight: 20,
    mintedAt: '2024-01-18'
  }
]

export default function ProfilePage() {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  if (!isConnected) {
    router.push('/')
    return null
  }

  const totalVoteCost = mockVotes.reduce((sum, vote) => sum + vote.cost, 0)
  const totalFunding = mockFundings.reduce((sum, funding) => sum + funding.amount, 0)
  const totalShareWeight = mockNFTs.reduce((sum, nft) => sum + nft.shareWeight, 0)

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'votes', label: 'My Votes', icon: '🗳️' },
    { id: 'fundings', label: 'My Fundings', icon: '💰' },
    { id: 'projects', label: 'My Projects', icon: '🚀' },
    { id: 'nfts', label: 'My NFTs', icon: '🎭' }
  ]

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Wallet Info */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-8">
        <h3 className="text-2xl font-black text-black mb-6">💳 Wallet Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-bold text-gray-600 mb-2">Wallet Address</div>
            <div className="font-mono text-lg bg-gray-100 p-3 border-2 border-black break-all">
              {address}
            </div>
          </div>
          <div>
            <div className="text-sm font-bold text-gray-600 mb-2">Network</div>
            <div className="text-lg font-bold text-green-600">Ethereum Mainnet</div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-purple-100 border-4 border-black shadow-[8px_8px_0px_black] p-6 text-center">
          <div className="text-3xl font-black text-purple-600 mb-2">
            {mockVotes.length}
          </div>
          <div className="text-lg font-bold text-gray-700">Total Votes</div>
        </div>
        <div className="bg-blue-100 border-4 border-black shadow-[8px_8px_0px_black] p-6 text-center">
          <div className="text-3xl font-black text-blue-600 mb-2">
            {mockFundings.length}
          </div>
          <div className="text-lg font-bold text-gray-700">Funded Projects</div>
        </div>
        <div className="bg-green-100 border-4 border-black shadow-[8px_8px_0px_black] p-6 text-center">
          <div className="text-3xl font-black text-green-600 mb-2">
            {mockPostedProjects.length}
          </div>
          <div className="text-lg font-bold text-gray-700">Posted Projects</div>
        </div>
        <div className="bg-yellow-100 border-4 border-black shadow-[8px_8px_0px_black] p-6 text-center">
          <div className="text-3xl font-black text-yellow-600 mb-2">
            {mockNFTs.length}
          </div>
          <div className="text-lg font-bold text-gray-700">Contribution NFTs</div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-8">
        <h3 className="text-2xl font-black text-black mb-6">📈 Recent Activity</h3>
        <div className="space-y-4">
          {mockVotes.slice(0, 3).map((vote) => (
            <div key={vote.id} className="flex items-center justify-between p-4 bg-gray-50 border-2 border-black">
              <div>
                <div className="font-bold">Voted for {vote.projectName}</div>
                <div className="text-sm text-gray-600">{vote.timestamp}</div>
              </div>
              <div className="text-right">
                <div className="font-bold">{vote.votes} votes</div>
                <div className="text-sm text-gray-600">{vote.cost} ETH</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderVotes = () => (
    <div className="space-y-6">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-black text-black">🗳️ Voting History</h3>
          <div className="text-lg font-bold text-purple-600">
            Total Spent: {totalVoteCost.toFixed(3)} ETH
          </div>
        </div>
        
        <div className="space-y-4">
          {mockVotes.map((vote) => (
            <div key={vote.id} className="flex items-center justify-between p-4 bg-gray-50 border-2 border-black">
              <div className="flex-1">
                <div className="font-bold text-lg">{vote.projectName}</div>
                <div className="text-sm text-gray-600">{vote.timestamp}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-purple-600">{vote.votes} votes</div>
                <div className="text-lg font-bold text-gray-700">{vote.cost} ETH</div>
              </div>
              <Link
                href={`/project/${vote.projectId}`}
                className="ml-4 bg-blue-300 text-black font-extrabold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
              >
                View Project
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderFundings = () => (
    <div className="space-y-6">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-black text-black">💰 Funding History</h3>
          <div className="text-lg font-bold text-green-600">
            Total Funded: {totalFunding.toLocaleString()} USDC
          </div>
        </div>
        
        <div className="space-y-4">
          {mockFundings.map((funding) => (
            <div key={funding.id} className="flex items-center justify-between p-4 bg-gray-50 border-2 border-black">
              <div className="flex-1">
                <div className="font-bold text-lg">{funding.projectName}</div>
                <div className="text-sm text-gray-600">{funding.timestamp}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black text-green-600">
                  {funding.amount} {funding.token}
                </div>
              </div>
              <Link
                href={`/project/${funding.projectId}`}
                className="ml-4 bg-blue-300 text-black font-extrabold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
              >
                View Project
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-black text-black">🚀 My Posted Projects</h3>
          <Link
            href="/post-project"
            className="bg-yellow-300 text-black font-extrabold py-3 px-6 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
          >
            Post New Project
          </Link>
        </div>
        
        <div className="space-y-4">
          {mockPostedProjects.map((project) => (
            <div key={project.id} className="flex items-center justify-between p-4 bg-gray-50 border-2 border-black">
              <div className="flex-1">
                <div className="font-bold text-lg">{project.name}</div>
                <div className="text-sm text-gray-600">Created: {project.createdAt}</div>
              </div>
              <div className="text-center mx-4">
                <div className="text-sm font-bold text-gray-600">Stage</div>
                <div className={`text-lg font-bold px-3 py-1 rounded ${
                  project.stage === 'Voting' ? 'bg-purple-300' :
                  project.stage === 'Funding' ? 'bg-blue-300' : 'bg-green-300'
                }`}>
                  {project.stage}
                </div>
              </div>
              <div className="text-center mx-4">
                <div className="text-sm font-bold text-gray-600">Votes</div>
                <div className="text-lg font-bold text-purple-600">{project.votes}</div>
              </div>
              <div className="text-center mx-4">
                <div className="text-sm font-bold text-gray-600">Funding</div>
                <div className="text-lg font-bold text-green-600">{project.fundingPercentage}%</div>
              </div>
              <Link
                href={`/project/${project.id}`}
                className="bg-blue-300 text-black font-extrabold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderNFTs = () => (
    <div className="space-y-6">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-black text-black">🎭 My Contribution NFTs</h3>
          <div className="text-lg font-bold text-purple-600">
            Total Share Weight: {totalShareWeight}%
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockNFTs.map((nft) => (
            <div key={nft.id} className="bg-gray-50 border-2 border-black p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-bold text-lg">{nft.projectName}</h4>
                <div className="text-sm text-gray-600">{nft.mintedAt}</div>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{nft.shareWeight}%</div>
                  <div className="text-xs text-gray-600">Share Weight</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-gray-700">{nft.role}</div>
                  <div className="text-xs text-gray-600">Role</div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/project/${nft.projectId}`}
                  className="flex-1 bg-blue-300 text-black font-extrabold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200 text-center"
                >
                  View Project
                </Link>
                <Link
                  href="/nfts"
                  className="flex-1 bg-purple-300 text-black font-extrabold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200 text-center"
                >
                  NFT Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview()
      case 'votes':
        return renderVotes()
      case 'fundings':
        return renderFundings()
      case 'projects':
        return renderProjects()
      case 'nfts':
        return renderNFTs()
      default:
        return renderOverview()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-black mb-4">
            👤 My Profile
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Your personal EchoDAO dashboard - track your contributions, votes, and project involvement
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-2 mb-8">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 font-extrabold border-2 border-black transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-yellow-300 text-black shadow-[4px_4px_0px_black] translate-x-[2px] translate-y-[2px]'
                    : 'bg-gray-200 text-gray-700 shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black]'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {renderContent()}
      </main>
    </div>
  )
}
