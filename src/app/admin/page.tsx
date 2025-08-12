'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'

interface GovernanceProposal {
  id: string
  title: string
  description: string
  proposer: string
  status: 'Active' | 'Passed' | 'Failed' | 'Executed'
  startTime: string
  endTime: string
  forVotes: number
  againstVotes: number
  quorum: number
  type: 'Treasury' | 'Protocol' | 'Emergency'
  executed: boolean
}

interface TreasuryTransaction {
  id: string
  type: 'Inflow' | 'Outflow'
  amount: number
  token: string
  description: string
  timestamp: string
  txHash: string
}

const mockProposals: GovernanceProposal[] = [
  {
    id: '1',
    title: 'Increase Project Funding Cap to 50,000 USDC',
    description: 'Proposal to increase the maximum funding cap for individual projects from 25,000 to 50,000 USDC to support larger-scale Web3 project resurrections.',
    proposer: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6',
    status: 'Active',
    startTime: '2024-01-20 00:00',
    endTime: '2024-01-27 00:00',
    forVotes: 1250,
    againstVotes: 320,
    quorum: 1000,
    type: 'Treasury',
    executed: false
  },
  {
    id: '2',
    title: 'Add OKB Token Support for Funding',
    description: 'Proposal to add OKB token as a supported funding option alongside ETH and USDT for project crowdfunding.',
    proposer: '0x8ba1f109551bA432bdf5c3c92bEa6dBeD4Df7E4e',
    status: 'Passed',
    startTime: '2024-01-15 00:00',
    endTime: '2024-01-22 00:00',
    forVotes: 1800,
    againstVotes: 150,
    quorum: 1000,
    type: 'Protocol',
    executed: false
  },
  {
    id: '3',
    title: 'Emergency Pause for Security Audit',
    description: 'Emergency proposal to pause all project funding and voting activities for 48 hours while conducting a security audit of the smart contracts.',
    proposer: '0x1234567890123456789012345678901234567890',
    status: 'Active',
    startTime: '2024-01-21 12:00',
    endTime: '2024-01-23 12:00',
    forVotes: 890,
    againstVotes: 45,
    quorum: 500,
    type: 'Emergency',
    executed: false
  }
]

const mockTreasuryTransactions: TreasuryTransaction[] = [
  {
    id: '1',
    type: 'Inflow',
    amount: 50000,
    token: 'USDC',
    description: 'Project funding fees collected',
    timestamp: '2024-01-21 16:30',
    txHash: '0x1234...5678'
  },
  {
    id: '2',
    type: 'Outflow',
    amount: 25000,
    token: 'USDC',
    description: 'DeFi Yield Aggregator project funding',
    timestamp: '2024-01-20 14:15',
    txHash: '0x8765...4321'
  },
  {
    id: '3',
    type: 'Inflow',
    amount: 15.5,
    token: 'ETH',
    description: 'Voting fees collected',
    timestamp: '2024-01-19 09:45',
    txHash: '0xabcd...efgh'
  }
]

export default function AdminPage() {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('proposals')
  const [selectedProposal, setSelectedProposal] = useState<GovernanceProposal | null>(null)
  const [showVoteModal, setShowVoteModal] = useState(false)
  const [voteChoice, setVoteChoice] = useState<'for' | 'against'>('for')
  const [voteAmount, setVoteAmount] = useState('')

  if (!isConnected) {
    router.push('/')
    return null
  }

  // Mock admin check - in real app, check if user has admin privileges
  const isAdmin = address === '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="text-center py-16">
            <div className="text-8xl mb-6">🚫</div>
            <h1 className="text-4xl font-black text-black mb-4">
              Access Denied
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              You don't have permission to access the admin panel.
            </p>
            <Link
              href="/dashboard"
              className="inline-block bg-blue-300 text-black font-extrabold py-4 px-8 border-4 border-black shadow-[8px_8px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_black] transition-all duration-200"
            >
              Back to Dashboard
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const handleVote = (proposal: GovernanceProposal) => {
    setSelectedProposal(proposal)
    setShowVoteModal(true)
  }

  const submitVote = () => {
    if (!selectedProposal || !voteAmount) return
    
    console.log(`Voting ${voteChoice} on proposal ${selectedProposal.id} with ${voteAmount} tokens`)
    alert(`Vote submitted! ${voteChoice === 'for' ? 'For' : 'Against'} proposal: ${selectedProposal.title}`)
    setShowVoteModal(false)
    setVoteAmount('')
  }

  const executeProposal = (proposalId: string) => {
    console.log(`Executing proposal ${proposalId}`)
    alert('Proposal executed successfully!')
  }

  const totalTreasury = mockTreasuryTransactions.reduce((sum, tx) => {
    if (tx.type === 'Inflow') return sum + tx.amount
    return sum - tx.amount
  }, 0)

  const tabs = [
    { id: 'proposals', label: 'Governance Proposals', icon: '🗳️' },
    { id: 'treasury', label: 'Treasury Dashboard', icon: '💰' },
    { id: 'settings', label: 'Protocol Settings', icon: '⚙️' }
  ]

  const renderProposals = () => (
    <div className="space-y-6">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-black text-black">🗳️ Active Proposals</h3>
          <button className="bg-green-300 text-black font-extrabold py-3 px-6 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200">
            Create Proposal
          </button>
        </div>
        
        <div className="space-y-6">
          {mockProposals.map((proposal) => (
            <div key={proposal.id} className="bg-gray-50 border-2 border-black p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h4 className="text-xl font-black text-black mb-2">{proposal.title}</h4>
                  <p className="text-gray-700 mb-3">{proposal.description}</p>
                  <div className="flex items-center space-x-6 text-sm text-gray-600">
                    <span>Proposer: {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-4)}</span>
                    <span>Type: {proposal.type}</span>
                    <span>Ends: {proposal.endTime}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded font-bold ${
                  proposal.status === 'Active' ? 'bg-yellow-300' :
                  proposal.status === 'Passed' ? 'bg-green-300' :
                  proposal.status === 'Failed' ? 'bg-red-300' : 'bg-blue-300'
                }`}>
                  {proposal.status}
                </div>
              </div>
              
              {/* Voting Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span>For: {proposal.forVotes}</span>
                  <span>Against: {proposal.againstVotes}</span>
                  <span>Quorum: {proposal.quorum}</span>
                </div>
                <div className="w-full bg-gray-200 border-2 border-black">
                  <div 
                    className="bg-green-500 h-4"
                    style={{ width: `${(proposal.forVotes / (proposal.forVotes + proposal.againstVotes)) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex space-x-4">
                {proposal.status === 'Active' && (
                  <button
                    onClick={() => handleVote(proposal)}
                    className="bg-purple-300 text-black font-extrabold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
                  >
                    Vote
                  </button>
                )}
                {proposal.status === 'Passed' && !proposal.executed && (
                  <button
                    onClick={() => executeProposal(proposal.id)}
                    className="bg-green-300 text-black font-extrabold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
                  >
                    Execute
                  </button>
                )}
                <button className="bg-blue-300 text-black font-extrabold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderTreasury = () => (
    <div className="space-y-6">
      {/* Treasury Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-6 text-center">
          <div className="text-3xl font-black text-green-600 mb-2">
            {totalTreasury.toLocaleString()}
          </div>
          <div className="text-lg font-bold text-gray-700">Total Treasury (USDC)</div>
        </div>
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-6 text-center">
          <div className="text-3xl font-black text-blue-600 mb-2">
            {mockTreasuryTransactions.filter(tx => tx.type === 'Inflow').length}
          </div>
          <div className="text-lg font-bold text-gray-700">Inflow Transactions</div>
        </div>
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-6 text-center">
          <div className="text-3xl font-black text-purple-600 mb-2">
            {mockTreasuryTransactions.filter(tx => tx.type === 'Outflow').length}
          </div>
          <div className="text-lg font-bold text-gray-700">Outflow Transactions</div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-6">
        <h3 className="text-2xl font-black text-black mb-6">💰 Transaction History</h3>
        <div className="space-y-4">
          {mockTreasuryTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-50 border-2 border-black">
              <div className="flex-1">
                <div className="font-bold">{tx.description}</div>
                <div className="text-sm text-gray-600">{tx.timestamp}</div>
                <div className="text-xs text-gray-500 font-mono">{tx.txHash}</div>
              </div>
              <div className={`text-right ${
                tx.type === 'Inflow' ? 'text-green-600' : 'text-red-600'
              }`}>
                <div className="text-lg font-bold">
                  {tx.type === 'Inflow' ? '+' : '-'}{tx.amount} {tx.token}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-6">
        <h3 className="text-2xl font-black text-black mb-6">⚙️ Protocol Settings</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-lg font-bold text-black mb-4">Voting Parameters</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 border-2 border-black">
                <span className="font-bold">Voting Period</span>
                <span>7 days</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 border-2 border-black">
                <span className="font-bold">Quorum Threshold</span>
                <span>1,000 tokens</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 border-2 border-black">
                <span className="font-bold">Execution Delay</span>
                <span>24 hours</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold text-black mb-4">Funding Parameters</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-gray-50 border-2 border-black">
                <span className="font-bold">Max Project Funding</span>
                <span>25,000 USDC</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 border-2 border-black">
                <span className="font-bold">Funding Period</span>
                <span>30 days</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 border-2 border-black">
                <span className="font-bold">Platform Fee</span>
                <span>2.5%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <button className="bg-yellow-300 text-black font-extrabold py-3 px-6 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200">
            Update Settings
          </button>
        </div>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'proposals':
        return renderProposals()
      case 'treasury':
        return renderTreasury()
      case 'settings':
        return renderSettings()
      default:
        return renderProposals()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black text-black mb-4">
            🛡️ DAO Governance
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Admin panel for EchoDAO governance, treasury management, and protocol settings
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

        {/* Vote Modal */}
        {showVoteModal && selectedProposal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white border-4 border-black shadow-[12px_12px_0px_black] p-8 max-w-md w-full">
              <h3 className="text-2xl font-black text-black mb-4">
                Vote on Proposal
              </h3>
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">
                  {selectedProposal.title}
                </div>
              </div>
              
              <div className="mb-6">
                <div className="mb-4">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Vote Choice
                  </label>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => setVoteChoice('for')}
                      className={`flex-1 py-2 px-4 border-2 border-black font-bold ${
                        voteChoice === 'for' 
                          ? 'bg-green-300 text-black shadow-[4px_4px_0px_black] translate-x-[2px] translate-y-[2px]'
                          : 'bg-gray-200 text-gray-700 shadow-[4px_4px_0px_black]'
                      }`}
                    >
                      For
                    </button>
                    <button
                      onClick={() => setVoteChoice('against')}
                      className={`flex-1 py-2 px-4 border-2 border-black font-bold ${
                        voteChoice === 'against' 
                          ? 'bg-red-300 text-black shadow-[4px_4px_0px_black] translate-x-[2px] translate-y-[2px]'
                          : 'bg-gray-200 text-gray-700 shadow-[4px_4px_0px_black]'
                      }`}
                    >
                      Against
                    </button>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Voting Power (tokens)
                  </label>
                  <input
                    type="number"
                    value={voteAmount}
                    onChange={(e) => setVoteAmount(e.target.value)}
                    placeholder="100"
                    className="w-full p-3 border-4 border-black shadow-[4px_4px_0px_black] font-bold"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={() => setShowVoteModal(false)}
                  className="flex-1 bg-gray-300 text-black font-extrabold py-3 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={submitVote}
                  className="flex-1 bg-green-300 text-black font-extrabold py-3 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
                >
                  Submit Vote
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
