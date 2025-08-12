'use client'

import { useState, useMemo } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { mockVotingProjects, mockUserActivity } from '@/lib/mockData'

export default function VotingPage() {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [selectedVotes, setSelectedVotes] = useState(1)
  const [availableVotes] = useState(5) // User has 5 votes to spend
  const [votingHistory] = useState(mockUserActivity.votes)

  // Redirect if not connected
  if (!isConnected) {
    router.push('/')
    return null
  }

  const handleVote = async (projectId: string, projectName: string) => {
    if (selectedVotes > availableVotes) {
      alert(`You only have ${availableVotes} votes available!`)
      return
    }
    
    console.log(`Voting ${selectedVotes} votes for ${projectName}`)
    
    // TODO: Integrate with smart contract
    alert(`Vote submitted! ${selectedVotes} votes for ${projectName}`)
  }

  const totalVotes = mockVotingProjects.reduce((sum, project) => sum + project.currentVotes, 0)
  const totalRequired = mockVotingProjects.reduce((sum, project) => sum + project.requiredVotes, 0)
  const resurrectionProgress = (totalVotes / totalRequired) * 100

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-4">
            🗳️ Resurrection Week
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Vote for the abandoned Web3 projects you want to see resurrected. 
            You have 5 votes to spend - use them wisely to determine which projects move to the funding phase.
          </p>
        </div>

        {/* Resurrection Progress */}
        <div className="mb-8 bg-white border-4 border-black shadow-[8px_8px_0px_black] p-6">
          <h2 className="text-2xl font-extrabold text-black mb-4">🏗️ Resurrection Progress</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total Votes: {totalVotes.toLocaleString()}</span>
              <span>Required: {totalRequired.toLocaleString()}</span>
            </div>
            <div className="w-full bg-gray-200 border-4 border-black h-6">
              <div
                className="bg-blue-400 h-full border-r-4 border-black transition-all duration-500"
                style={{ width: `${Math.min(resurrectionProgress, 100)}%` }}
              ></div>
            </div>
            <div className="text-center text-lg font-bold text-blue-600">
              {resurrectionProgress.toFixed(1)}% Complete
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Voting Projects Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-extrabold text-black mb-6">📋 Projects Up for Resurrection</h2>
            <div className="space-y-6">
              {mockVotingProjects.map((project) => {
                const isOwner = address && project.owner.toLowerCase() === address.toLowerCase()
                const progress = (project.currentVotes / project.requiredVotes) * 100
                
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

                    {/* Voting Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm font-bold text-black mb-2">
                        <span>Votes: {project.currentVotes.toLocaleString()}</span>
                        <span>Required: {project.requiredVotes.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 border-2 border-black h-4">
                        <div
                          className="bg-blue-400 h-full border-r-2 border-black transition-all duration-300"
                          style={{ width: `${Math.min(progress, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-center text-sm text-gray-600 mt-1">
                        {progress.toFixed(1)}% Complete
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

                    {/* Voting Action */}
                    {isOwner ? (
                      <div className="text-center p-4 bg-gray-100 border-2 border-black">
                        <div className="text-lg font-bold text-purple-600 mb-2">
                          🎯 You can't vote on your own project
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          Wait for community votes to proceed to funding
                        </div>
                        <Link
                          href={`/project/${project.id}`}
                          className="inline-block bg-gray-300 text-gray-600 font-extrabold py-2 px-4 border-2 border-black shadow-[3px_3px_0px_black]"
                        >
                          View Details
                        </Link>
                      </div>
                    ) : (
                      <div className="text-center p-4 bg-blue-50 border-2 border-black">
                        <div className="text-lg font-bold text-black mb-3">Cast Your Vote</div>
                        <div className="flex justify-center space-x-2 mb-4">
                          {[1, 2, 3, 5].map((voteCount) => (
                            <button
                              key={voteCount}
                              onClick={() => setSelectedVotes(voteCount)}
                              disabled={voteCount > availableVotes}
                              className={`px-4 py-2 border-2 border-black font-bold transition-all duration-200 ${
                                selectedVotes === voteCount
                                  ? 'bg-blue-400 text-black shadow-[3px_3px_0px_black]'
                                  : voteCount > availableVotes
                                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                  : 'bg-white text-black hover:bg-blue-100 shadow-[2px_2px_0px_black] hover:shadow-[3px_3px_0px_black]'
                              }`}
                            >
                              {voteCount}
                            </button>
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 mb-3">
                          Available Votes: {availableVotes}
                        </div>
                        <button
                          onClick={() => handleVote(project.id, project.name)}
                          disabled={availableVotes === 0}
                          className={`font-extrabold py-3 px-6 border-2 border-black transition-all duration-200 ${
                            availableVotes === 0
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed shadow-[2px_2px_0px_black]'
                              : 'bg-blue-400 text-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black]'
                          }`}
                        >
                          {availableVotes === 0 ? '❌ No Votes Left' : '🗳️ Vote Now'}
                        </button>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Vote Balance Info */}
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6">
              <h3 className="text-xl font-extrabold text-black mb-4">🗳️ Vote Balance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-bold">Available Votes:</span>
                  <span className="text-blue-600 font-bold">{availableVotes}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Address:</span>
                  <span className="text-sm text-gray-600 font-mono">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </span>
                </div>
              </div>
            </div>

            {/* Vote Selector */}
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6">
              <h3 className="text-xl font-extrabold text-black mb-4">🗳️ Vote Selector</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-bold text-black mb-2">Number of Votes:</label>
                  <input
                    type="number"
                    min="1"
                    max={availableVotes}
                    value={selectedVotes}
                    onChange={(e) => setSelectedVotes(Number(e.target.value))}
                    className="w-full p-2 border-2 border-black text-center font-bold"
                  />
                </div>
                <div className="text-center p-3 bg-blue-100 border-2 border-black">
                  <div className="text-lg font-bold text-black">
                    Votes to Cast: {selectedVotes}
                  </div>
                  <div className="text-sm text-gray-600">
                    Remaining: {availableVotes - selectedVotes} votes
                  </div>
                </div>
              </div>
            </div>

            {/* Voting History */}
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6">
              <h3 className="text-xl font-extrabold text-black mb-4">📊 Voting History</h3>
              <div className="space-y-3">
                {votingHistory.map((vote, index) => (
                  <div key={index} className="p-3 bg-gray-100 border-2 border-black">
                    <div className="font-bold text-black">{vote.project}</div>
                    <div className="text-sm text-gray-600">
                      {vote.votes} votes • {vote.date}
                    </div>
                  </div>
                ))}
                {votingHistory.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    No voting history yet
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
