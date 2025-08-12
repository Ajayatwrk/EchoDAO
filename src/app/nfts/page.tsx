'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Link from 'next/link'
import { mockNFTs } from '@/lib/mockData'

export default function NFTsPage() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [showListingModal, setShowListingModal] = useState(false)
  const [selectedNFT, setSelectedNFT] = useState<typeof mockNFTs[0] | null>(null)
  const [listPrice, setListPrice] = useState('')

  // Redirect if not connected
  if (!isConnected) {
    router.push('/')
    return null
  }

  const handleListNFT = (nft: typeof mockNFTs[0]) => {
    setSelectedNFT(nft)
    setShowListingModal(true)
  }

  const handleUnlistNFT = (nftId: string) => {
    console.log(`Unlisting NFT ${nftId} from marketplace`)
    alert('NFT unlisted from marketplace!')
  }

  const totalShareWeight = mockNFTs.reduce((sum, nft) => sum + nft.shareWeight, 0)
  const totalRevenueShare = mockNFTs.reduce((sum, nft) => sum + nft.revenueShare, 0)
  const estimatedValue = totalShareWeight * 0.1 // Mock calculation

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
            🎨 My Contribution NFTs
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl">
            View and manage your contribution NFTs that represent your stake in revived projects.
          </p>
        </div>

        {/* Overview Stats */}
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6 mb-8">
          <h2 className="text-2xl font-extrabold text-black mb-4">Portfolio Overview</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-extrabold text-purple-600">{mockNFTs.length}</div>
              <div className="text-sm text-gray-600">Total NFTs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-blue-600">{totalShareWeight}%</div>
              <div className="text-sm text-gray-600">Total Share Weight</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-green-600">{totalRevenueShare}%</div>
              <div className="text-sm text-gray-600">Revenue Share</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-extrabold text-yellow-600">~{estimatedValue.toFixed(2)} ETH</div>
              <div className="text-sm text-gray-600">Est. Market Value</div>
            </div>
          </div>
        </div>

        {/* NFTs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNFTs.map((nft) => (
            <div key={nft.id} className="bg-white border-4 border-black shadow-[6px_6px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_black] transition-all duration-200">
              {/* NFT Image */}
              <div className="p-6 border-b-4 border-black">
                <div className="w-full h-48 bg-gradient-to-br from-purple-300 to-blue-300 border-2 border-black shadow-[4px_4px_0px_black] flex items-center justify-center">
                  <div className="text-6xl">🎨</div>
                </div>
              </div>

              {/* NFT Details */}
              <div className="p-6">
                <h3 className="text-xl font-extrabold text-black mb-2">{nft.projectName}</h3>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Role:</span>
                    <span className="font-bold text-black">{nft.role}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Share Weight:</span>
                    <span className="font-bold text-black">{nft.shareWeight}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Revenue Share:</span>
                    <span className="font-bold text-black">{nft.revenueShare}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Minted:</span>
                    <span className="font-bold text-black">{new Date(nft.mintedAt).toLocaleDateString()}</span>
                  </div>
                  {nft.isListed && (
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Listed for:</span>
                      <span className="font-bold text-green-600">{nft.listPrice} ETH</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Link
                    href={`/project/${nft.projectId}`}
                    className="block w-full text-center bg-blue-300 text-black font-extrabold py-3 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
                  >
                    View Project
                  </Link>
                  
                  {nft.isListed ? (
                    <div className="space-y-2">
                      <div className="text-center text-sm">
                        <span className="font-bold">Listed for {nft.listPrice} ETH</span>
                      </div>
                      <button
                        onClick={() => handleUnlistNFT(nft.id)}
                        className="w-full bg-red-300 text-black font-extrabold py-2 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
                      >
                        Unlist from Market
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleListNFT(nft)}
                      className="w-full bg-yellow-300 text-black font-extrabold py-3 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
                    >
                      List on Marketplace
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {mockNFTs.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No NFTs yet</h3>
            <p className="text-gray-500 mb-4">
              Start contributing to projects to earn your first Contribution NFT!
            </p>
            <Link
              href="/projects"
              className="inline-block bg-yellow-300 text-black font-extrabold py-3 px-6 border-4 border-black shadow-[6px_6px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_black] transition-all duration-200"
            >
              🚀 Browse Projects
            </Link>
          </div>
        )}
      </main>

      {/* Marketplace Modal */}
      {showListingModal && selectedNFT && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_black] p-8 max-w-md w-full">
            <h3 className="text-2xl font-extrabold text-black mb-4">
              List NFT on Marketplace
            </h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">
                <strong>{selectedNFT.projectName}</strong> - {selectedNFT.role}
              </p>
              <p className="text-sm text-gray-600">
                Share Weight: {selectedNFT.shareWeight}%
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-bold text-black mb-2">
                Listing Price (ETH)
              </label>
              <input
                type="number"
                value={listPrice}
                onChange={(e) => setListPrice(e.target.value)}
                placeholder="0.5"
                step="0.01"
                min="0"
                className="w-full p-3 border-2 border-black shadow-[3px_3px_0px_black] bg-white text-black font-bold focus:outline-none focus:ring-2 focus:ring-yellow-300"
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowListingModal(false)}
                className="flex-1 bg-gray-300 text-black font-extrabold py-3 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  console.log(`Listing NFT ${selectedNFT.id} on marketplace`)
                  alert('NFT listed on marketplace!')
                  setShowListingModal(false)
                }}
                className="flex-1 bg-green-300 text-black font-extrabold py-3 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
              >
                List NFT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
