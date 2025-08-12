'use client'

import { useState, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { mockFundingProjects, tokenOptions } from '@/lib/mockData'

export default function FundingPage() {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [selectedToken, setSelectedToken] = useState(tokenOptions[0])
  const [fundingAmount, setFundingAmount] = useState('')
  const [isFunding, setIsFunding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  // Redirect if not connected
  if (!isConnected) {
    router.push('/')
    return null
  }

  const handleFund = async (projectId: string, projectName: string) => {
    if (!fundingAmount || parseFloat(fundingAmount) <= 0) {
      alert('Please enter a valid funding amount')
      return
    }

    setIsFunding(true)
    
    try {
      // Simulate OKX DEX swap and smart contract funding
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log(`Funding ${fundingAmount} ${selectedToken.symbol} for ${projectName}`)
      console.log('Triggering OKX DEX swap...')
      console.log('Calling smart contract...')
      
      setShowSuccess(true)
      setFundingAmount('')
      
      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (error) {
      console.error('Funding failed:', error)
      alert('Funding failed. Please try again.')
    } finally {
      setIsFunding(false)
    }
  }

  const totalFunding = mockFundingProjects.reduce((sum, project) => sum + project.currentFunding, 0)
  const totalGoal = mockFundingProjects.reduce((sum, project) => sum + project.fundingGoal, 0)
  const overallProgress = (totalFunding / totalGoal) * 100

  const getDaysLeftColor = (days: number) => {
    if (days <= 3) return 'text-red-600'
    if (days <= 7) return 'text-orange-600'
    return 'text-green-600'
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-4">
            💰 Funding Phase
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Support the projects that made it through voting! Fund with multiple tokens 
            and help bring abandoned Web3 projects back to life.
          </p>
        </div>

        {/* Overall Funding Progress */}
        <div className="mb-8 bg-white border-4 border-black shadow-[8px_8px_0px_black] p-6">
          <h2 className="text-2xl font-extrabold text-black mb-4">🏗️ Overall Funding Progress</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Raised: ${totalFunding.toLocaleString()}</span>
              <span>Total Goal: ${totalGoal.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 border-4 border-black h-6">
              <div
                className="bg-yellow-400 h-full border-r-4 border-black transition-all duration-500"
                style={{ width: `${Math.min(overallProgress, 100)}%` }}
              ></div>
            </div>
            <div className="text-center text-lg font-bold text-yellow-600">
              {overallProgress.toFixed(1)}% Complete
            </div>
          </div>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 bg-green-300 border-4 border-black shadow-[6px_6px_0px_black] p-6 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-2xl font-extrabold text-black mb-2">
              Funding Successful!
            </h3>
            <p className="text-lg text-black">
              Your contribution has been processed through OKX DEX and added to the project funding.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Funding Projects Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold text-black mb-6">🚀 Projects Seeking Funding</h2>
            <div className="space-y-6">
              {mockFundingProjects.map((project) => {
                const isOwner = address && project.owner.toLowerCase() === address.toLowerCase()
                
                return (
                  <div key={project.id} className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6">
                    {/* Project Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-2xl font-extrabold text-black mb-2">{project.name}</h3>
                        {isOwner && (
                          <span className="inline-block bg-purple-300 text-black text-xs font-extrabold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_black] mb-2">
                            👑 Your Project
                          </span>
                        )}
                        <p className="text-gray-700 mb-3">{project.description}</p>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tags.map((tag, index) => (
                            <span key={index} className="bg-gray-200 px-2 py-1 border-2 border-black text-xs font-bold text-black">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Funding Progress */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm font-bold text-black mb-2">
                        <span>Raised: ${project.currentFunding.toLocaleString()}</span>
                        <span>Goal: ${project.fundingGoal.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 border-2 border-black h-4 mb-2">
                        <div
                          className="bg-yellow-400 h-full border-r-2 border-black transition-all duration-300"
                          style={{ width: `${Math.min(project.fundingPercentage, 100)}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>{project.fundingPercentage.toFixed(1)}% Complete</span>
                        <span className={getDaysLeftColor(project.daysLeft)}>
                          ⏰ {project.daysLeft} days left
                        </span>
                      </div>
                    </div>

                    {/* Project Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-blue-100 border-2 border-black">
                        <div className="text-2xl font-extrabold text-blue-600">{project.contributors}</div>
                        <div className="text-sm text-gray-600 font-bold">Contributors</div>
                      </div>
                      <div className="text-center p-3 bg-green-100 border-2 border-black">
                        <div className="text-2xl font-extrabold text-green-600">${project.fundingGoal.toLocaleString()}</div>
                        <div className="text-sm text-gray-600 font-bold">Funding Goal</div>
                      </div>
                    </div>

                    {/* GitHub Link */}
                    <div className="mb-4">
                      <a
                        href={project.githubRepo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold"
                      >
                        📂 View on GitHub
                      </a>
                    </div>

                    {/* Funding Action */}
                    {isOwner ? (
                      <div className="text-center p-4 bg-gray-100 border-2 border-black">
                        <div className="text-lg font-bold text-purple-600 mb-2">
                          🎯 This is your project
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          Share this page to get more funding!
                        </div>
                        <Link
                          href={`/project/${project.id}`}
                          className="inline-block bg-gray-300 text-gray-600 font-extrabold py-2 px-4 border-2 border-black shadow-[3px_3px_0px_black]"
                        >
                          View Details
                        </Link>
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-yellow-50 border-2 border-black">
                        <div className="text-lg font-bold text-black mb-3">Fund This Project</div>
                        <button
                          onClick={() => setSelectedProject(project.id)}
                          className="bg-yellow-400 text-black font-extrabold py-3 px-6 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
                        >
                          💰 Fund Now
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Funding Sidebar */}
          <div className="space-y-6">
            {/* Multi-Token Funding Form */}
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6">
              <h3 className="text-xl font-extrabold text-black mb-4">💸 Fund a Project</h3>
              
              {selectedProject ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Token:</label>
                    <select
                      value={selectedToken.symbol}
                      onChange={(e) => setSelectedToken(tokenOptions.find(t => t.symbol === e.target.value) || tokenOptions[0])}
                      className="w-full p-3 border-2 border-black font-bold bg-white"
                    >
                      {tokenOptions.map((token) => (
                        <option key={token.symbol} value={token.symbol}>
                          {token.icon} {token.symbol} - Balance: {token.balance}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-black mb-2">Amount:</label>
                    <input
                      type="number"
                      value={fundingAmount}
                      onChange={(e) => setFundingAmount(e.target.value)}
                      placeholder="0.0"
                      min="0.01"
                      step="0.01"
                      className="w-full p-3 border-2 border-black font-bold text-center"
                    />
                    <div className="text-xs text-gray-600 mt-1 text-center">
                      ≈ ${(parseFloat(fundingAmount) * (selectedToken.price || 1)).toFixed(2)} USD
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleFund(selectedProject, mockFundingProjects.find(p => p.id === selectedProject)?.name || '')}
                    disabled={isFunding || !fundingAmount || parseFloat(fundingAmount) <= 0}
                    className={`w-full py-3 px-4 font-extrabold border-2 border-black shadow-[4px_4px_0px_black] transition-all duration-200 ${
                      isFunding || !fundingAmount || parseFloat(fundingAmount) <= 0
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-400 text-black hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black]'
                    }`}
                  >
                    {isFunding ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      '🚀 Fund Project'
                    )}
                  </button>
                  
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="w-full py-2 px-4 bg-gray-200 text-gray-600 font-bold border-2 border-black shadow-[2px_2px_0px_black] hover:bg-gray-300 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <div className="text-4xl mb-2">💸</div>
                  <p>Select a project to fund</p>
                </div>
              )}
            </div>

            {/* Token Balances */}
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6">
              <h3 className="text-xl font-extrabold text-black mb-4">💳 Token Balances</h3>
              <div className="space-y-3">
                {tokenOptions.map((token) => (
                  <div key={token.symbol} className="flex justify-between items-center p-2 bg-gray-100 border-2 border-black">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{token.icon}</span>
                      <span className="font-bold">{token.symbol}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-black">{token.balance}</div>
                      <div className="text-xs text-gray-600">≈ ${(token.balance * token.price).toFixed(2)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Funding Stats */}
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6">
              <h3 className="text-xl font-extrabold text-black mb-4">📊 Funding Stats</h3>
              <div className="space-y-3">
                <div className="text-center p-3 bg-blue-100 border-2 border-black">
                  <div className="text-2xl font-extrabold text-blue-600">{mockFundingProjects.length}</div>
                  <div className="text-sm text-gray-600 font-bold">Active Projects</div>
                </div>
                <div className="text-center p-3 bg-green-100 border-2 border-black">
                  <div className="text-2xl font-extrabold text-green-600">${totalFunding.toLocaleString()}</div>
                  <div className="text-sm text-gray-600 font-bold">Total Raised</div>
                </div>
                <div className="text-center p-3 bg-yellow-100 border-2 border-black">
                  <div className="text-2xl font-extrabold text-yellow-600">{overallProgress.toFixed(1)}%</div>
                  <div className="text-sm text-gray-600 font-bold">Overall Progress</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
