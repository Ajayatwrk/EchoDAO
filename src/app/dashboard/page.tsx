'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { mockUserActivity } from '@/lib/mockData'

export default function DashboardPage() {
  const { isConnected, address } = useAccount()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('overview')

  // Redirect if not connected
  if (!isConnected) {
    router.push('/')
    return null
  }

  const dashboardCards = [
    {
      title: '🗳️ Voting',
      description: 'Vote for projects in resurrection week',
      link: '/voting',
      color: 'bg-blue-400',
      icon: '🗳️'
    },
    {
      title: '💰 Funding',
      description: 'Contribute to approved projects',
      link: '/funding',
      color: 'bg-green-400',
      icon: '💰'
    },
    {
      title: '📋 Projects',
      description: 'Browse all projects',
      link: '/projects',
      color: 'bg-purple-400',
      icon: '📋'
    },
    {
      title: '🎨 NFTs',
      description: 'View your contribution NFTs',
      link: '/nfts',
      color: 'bg-yellow-400',
      icon: '🎨'
    },
    {
      title: '➕ Post Project',
      description: 'Submit a new project',
      link: '/post-project',
      color: 'bg-red-400',
      icon: '➕'
    },
    {
      title: '👤 Profile',
      description: 'Manage your profile and settings',
      link: '/profile',
      color: 'bg-indigo-400',
      icon: '👤'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-4">
            🚀 Welcome to EchoDAO
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Your central hub for Web3 project discovery, voting, and funding
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6 text-center">
            <div className="text-3xl font-extrabold text-blue-600 mb-2">
              {mockUserActivity.votes.length}
            </div>
            <div className="text-lg font-bold text-black">Projects Voted</div>
          </div>
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6 text-center">
            <div className="text-3xl font-extrabold text-green-600 mb-2">
              {mockUserActivity.fundings.length}
            </div>
            <div className="text-lg font-bold text-black">Projects Funded</div>
          </div>
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6 text-center">
            <div className="text-3xl font-extrabold text-purple-600 mb-2">
              {mockUserActivity.postedProjects.length}
            </div>
            <div className="text-lg font-bold text-black">Projects Posted</div>
          </div>
        </div>

        {/* Dashboard Navigation */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-black mb-6">🎯 Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardCards.map((card, index) => (
              <Link
                key={index}
                href={card.link}
                className="block bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_black] transition-all duration-200"
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">{card.icon}</div>
                  <h3 className="text-xl font-extrabold text-black mb-2">{card.title}</h3>
                  <p className="text-gray-700">{card.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Votes */}
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6">
            <h3 className="text-2xl font-extrabold text-black mb-4">🗳️ Recent Votes</h3>
            <div className="space-y-3">
              {mockUserActivity.votes.map((vote, index) => (
                <div key={index} className="p-3 bg-blue-50 border-2 border-black">
                  <div className="font-bold text-black">{vote.project}</div>
                  <div className="text-sm text-gray-600">
                    {vote.votes} votes • {vote.date}
                  </div>
                </div>
              ))}
              {mockUserActivity.votes.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No voting history yet
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/voting"
                className="inline-block bg-blue-400 text-black font-extrabold py-2 px-4 border-2 border-black shadow-[3px_3px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_black] transition-all duration-200"
              >
                View All Voting
              </Link>
            </div>
          </div>

          {/* Recent Fundings */}
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6">
            <h3 className="text-2xl font-extrabold text-black mb-4">💰 Recent Fundings</h3>
            <div className="space-y-3">
              {mockUserActivity.fundings.map((funding, index) => (
                <div key={index} className="p-3 bg-green-50 border-2 border-black">
                  <div className="font-bold text-black">{funding.project}</div>
                  <div className="text-sm text-gray-600">
                    {funding.amount} {funding.token} • {funding.date}
                  </div>
                </div>
              ))}
              {mockUserActivity.fundings.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  No funding history yet
                </div>
              )}
            </div>
            <div className="mt-4 text-center">
              <Link
                href="/funding"
                className="inline-block bg-green-400 text-black font-extrabold py-2 px-4 border-2 border-black shadow-[3px_3px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_black] transition-all duration-200"
              >
                View All Funding
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
