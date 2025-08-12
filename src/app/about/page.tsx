'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-black text-black mb-6">
            🚀 About EchoDAO
          </h1>
          <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            We're on a mission to resurrect abandoned Web3 projects and give them a second chance at life through decentralized community governance and funding.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-8 mb-12">
          <h2 className="text-4xl font-black text-black mb-6 text-center">
            🎯 Our Mission
          </h2>
          <p className="text-xl text-gray-700 text-center leading-relaxed">
            EchoDAO transforms the Web3 graveyard into a thriving ecosystem of resurrected projects, 
            powered by community wisdom and sustainable funding mechanisms.
          </p>
        </div>

        {/* Problem & Solution */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Problem */}
          <div className="bg-red-100 border-4 border-black shadow-[8px_8px_0px_black] p-8">
            <h3 className="text-3xl font-black text-red-800 mb-4">
              ❌ The Problem
            </h3>
            <ul className="text-lg text-red-700 space-y-3">
              <li>• 90% of Web3 projects are abandoned within 6 months</li>
              <li>• Valuable code and ideas lost forever</li>
              <li>• No mechanism to identify and revive promising projects</li>
              <li>• Developers lack incentive to continue abandoned work</li>
              <li>• Community has no voice in project resurrection</li>
            </ul>
          </div>

          {/* Solution */}
          <div className="bg-green-100 border-4 border-black shadow-[8px_8px_0px_black] p-8">
            <h3 className="text-3xl font-black text-green-800 mb-4">
              ✅ Our Solution
            </h3>
            <ul className="text-lg text-green-700 space-y-3">
              <li>• Community-driven project discovery and voting</li>
              <li>• Quadratic voting ensures fair representation</li>
              <li>• Multi-token crowdfunding with OKX DEX integration</li>
              <li>• NFT-based contribution rewards and revenue sharing</li>
              <li>• Decentralized governance for project decisions</li>
            </ul>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-8 mb-16">
          <h2 className="text-4xl font-black text-black mb-8 text-center">
            🔄 How EchoDAO Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-purple-300 w-20 h-20 rounded-full border-4 border-black shadow-[4px_4px_0px_black] flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-black">1</span>
              </div>
              <h4 className="text-xl font-black text-black mb-2">Project Discovery</h4>
              <p className="text-gray-600">
                Community submits abandoned projects to the EchoDAO graveyard
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-300 w-20 h-20 rounded-full border-4 border-black shadow-[4px_4px_0px_black] flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-black">2</span>
              </div>
              <h4 className="text-xl font-black text-black mb-2">Community Voting</h4>
              <p className="text-gray-600">
                Quadratic voting determines which projects deserve resurrection
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-green-300 w-20 h-20 rounded-full border-4 border-black shadow-[4px_4px_0px_black] flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-black">3</span>
              </div>
              <h4 className="text-xl font-black text-black mb-2">Crowdfunding</h4>
              <p className="text-gray-600">
                Multi-token funding with OKX DEX integration
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="bg-yellow-300 w-20 h-20 rounded-full border-4 border-black shadow-[4px_4px_0px_black] flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-black">4</span>
              </div>
              <h4 className="text-xl font-black text-black mb-2">Project Revival</h4>
              <p className="text-gray-600">
                Contributors earn NFTs and revenue sharing from revived projects
              </p>
            </div>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="bg-gradient-to-r from-purple-100 to-blue-100 border-4 border-black shadow-[8px_8px_0px_black] p-8 mb-16">
          <h2 className="text-4xl font-black text-black mb-8 text-center">
            📊 Project Flow Diagram
          </h2>
          
          <div className="bg-white border-4 border-black shadow-[4px_4px_0px_black] p-6">
            <div className="text-center text-lg font-bold text-gray-700 mb-4">
              [Abandoned Project] → [EchoDAO Graveyard] → [Community Voting] → [Funding Phase] → [Active Development] → [Revenue Generation] → [NFT Rewards]
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-xl font-black text-purple-800 mb-3">Voting Phase</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• 7-day voting period</li>
                  <li>• Quadratic voting (cost = votes² × base cost)</li>
                  <li>• Minimum votes required to proceed</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-black text-blue-800 mb-3">Funding Phase</h4>
                <ul className="text-gray-700 space-y-2">
                  <li>• 30-day crowdfunding period</li>
                  <li>• Multi-token support (ETH, USDT, OKB)</li>
                  <li>• OKX DEX integration for swaps</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-8 mb-16">
          <h2 className="text-4xl font-black text-black mb-8 text-center">
            👥 Our Team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-200 w-32 h-32 rounded-full border-4 border-black shadow-[4px_4px_0px_black] mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍💻</span>
              </div>
              <h4 className="text-xl font-black text-black mb-2">Alex Chen</h4>
              <p className="text-gray-600 mb-2">Founder & Smart Contract Developer</p>
              <p className="text-sm text-gray-500">Former DeFi protocol architect</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-200 w-32 h-32 rounded-full border-4 border-black shadow-[4px_4px_0px_black] mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩‍🎨</span>
              </div>
              <h4 className="text-xl font-black text-black mb-2">Sarah Kim</h4>
              <p className="text-gray-600 mb-2">Head of Design & UX</p>
              <p className="text-sm text-gray-500">Web3 design veteran</p>
            </div>
            
            <div className="text-center">
              <div className="bg-gray-200 w-32 h-32 rounded-full border-4 border-black shadow-[4px_4px_0px_black] mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨‍🔬</span>
              </div>
              <h4 className="text-xl font-black text-black mb-2">Dr. Marcus Rodriguez</h4>
              <p className="text-gray-600 mb-2">Research & Governance</p>
              <p className="text-sm text-gray-500">DAO governance expert</p>
            </div>
          </div>
        </div>

        {/* Sponsor Credits */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-4 border-black shadow-[8px_8px_0px_black] p-8 mb-16">
          <h2 className="text-4xl font-black text-black mb-8 text-center">
            🏆 Sponsor Credits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-white w-24 h-24 rounded-full border-4 border-black shadow-[4px_4px_0px_black] mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🔗</span>
              </div>
              <h4 className="text-xl font-black text-black mb-2">OKX</h4>
              <p className="text-gray-700">
                Providing DEX infrastructure and multi-token support for seamless funding
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-white w-24 h-24 rounded-full border-4 border-black shadow-[4px_4px_0px_black] mx-auto mb-4 flex items-center justify-center">
                <span className="text-3xl">🌐</span>
              </div>
              <h4 className="text-xl font-black text-black mb-2">Ethereum Foundation</h4>
              <p className="text-gray-700">
                Supporting decentralized governance and smart contract innovation
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-black text-black mb-6">
            Ready to Join the Resurrection?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/projects"
              className="inline-block bg-purple-300 text-black font-extrabold py-4 px-8 border-4 border-black shadow-[8px_8px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_black] transition-all duration-200"
            >
              Browse Projects
            </Link>
            <Link
              href="/post-project"
              className="inline-block bg-yellow-300 text-black font-extrabold py-4 px-8 border-4 border-black shadow-[8px_8px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[6px_6px_0px_black] transition-all duration-200"
            >
              Submit Project
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
