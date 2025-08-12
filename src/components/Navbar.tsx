'use client'

import Link from 'next/link'
import { useAccount } from 'wagmi'
import WalletButton from './WalletButton';

export default function Navbar() {
  const { address, isConnected } = useAccount()

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-4 border-black shadow-[4px_4px_0px_black] px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: App name/logo */}
        <Link href="/" className="text-2xl font-extrabold text-black hover:text-gray-700 transition-colors">
          🚀 EchoDAO
        </Link>

        {/* Center: Navigation links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/dashboard" className="text-black font-bold hover:text-gray-700 transition-colors">
            Dashboard
          </Link>
          <Link href="/post-project" className="text-black font-bold hover:text-gray-700 transition-colors">
            Post Project
          </Link>
          <Link href="/nfts" className="text-black font-bold hover:text-gray-700 transition-colors">
            Contribution NFTs
          </Link>
          <Link href="/about" className="text-black font-bold hover:text-gray-700 transition-colors">
            About
          </Link>
        </div>

        {/* Right: Wallet info */}
        <div className="flex items-center space-x-4">
          {isConnected ? (
            <div className="flex items-center space-x-3">
              <span className="text-sm font-bold text-black">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </span>
              <div className="w-3 h-3 bg-green-500 border-2 border-black shadow-[2px_2px_0px_black]"></div>
            </div>
          ) : (
            <WalletButton />
          )}
        </div>
      </div>
    </nav>
  )
}
