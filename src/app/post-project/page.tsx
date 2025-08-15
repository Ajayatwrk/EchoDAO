'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWalletClient, usePublicClient } from 'wagmi'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { getCoreFundDemoContract } from '@/lib/contracts'

interface ProjectFormData {
  title: string
  description: string
  vision: string
  tags: string
  receiverAddress: string
}

export default function PostProjectPage() {
  const { isConnected, address } = useAccount()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const router = useRouter()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    description: '',
    vision: '',
    tags: '',
    receiverAddress: ''
  })
  const [errors, setErrors] = useState<Partial<ProjectFormData>>({})

  // Contract address - update this after deployment
  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_COREFUND_DEMO_ADDRESS || '0x1d1A88f9C7eD7c6006820b24f7afEe279Ba96A49'

  // Handle redirect in useEffect to avoid hydration issues
  useEffect(() => {
    if (!isConnected && !isRedirecting) {
      setIsRedirecting(true)
      router.push('/')
    }
  }, [isConnected, router, isRedirecting])

  // Auto-fill receiver address with connected wallet
  useEffect(() => {
    if (address && !formData.receiverAddress) {
      setFormData(prev => ({ ...prev, receiverAddress: address }))
    }
  }, [address, formData.receiverAddress])

  // Don't render anything while redirecting
  if (isRedirecting) {
    return null
  }

  // Show loading while checking connection
  if (!isConnected) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="max-w-4xl mx-auto px-4 md:px-8 py-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-xl font-bold">Connecting to wallet...</p>
          </div>
        </main>
      </div>
    )
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ProjectFormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required'
    } else if (formData.description.length < 30) {
      newErrors.description = 'Description must be at least 30 characters'
    }

    if (!formData.receiverAddress.trim()) {
      newErrors.receiverAddress = 'Receiver wallet address is required'
    } else if (!formData.receiverAddress.startsWith('0x') || formData.receiverAddress.length !== 42) {
      newErrors.receiverAddress = 'Please enter a valid wallet address (0x... format)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field: keyof ProjectFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    if (!walletClient || !publicClient) {
      alert('Wallet not connected. Please connect your wallet first.')
      return
    }

    setIsSubmitting(true)
    setTransactionHash('')

    try {
      const contract = getCoreFundDemoContract(CONTRACT_ADDRESS)
      
      // Create project description combining all fields
      const fullDescription = `${formData.description}\n\n🎯 Vision: ${formData.vision}\n🏷️ Tags: ${formData.tags}\n💰 Receiver: ${formData.receiverAddress}`
      
      // Simulate the transaction
      const { request } = await contract.simulate.createProject([
        formData.title,
        fullDescription
      ])
      
      // Send the transaction (this opens the wallet)
      const hash = await walletClient.writeContract(request)
      setTransactionHash(hash)
      
      // Wait for confirmation
      await publicClient.waitForTransactionReceipt({ hash })
      
      setShowSuccess(true)
      setFormData({
        title: '',
        description: '',
        vision: '',
        tags: '',
        receiverAddress: address || ''
      })

      // Hide success message after 10 seconds
      setTimeout(() => setShowSuccess(false), 10000)
    } catch (error) {
      console.error('Error creating project:', error)
      alert('Failed to create project on blockchain. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-4">
            🪦 Post to Graveyard
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Submit your abandoned Web3 project to the EchoDAO community on Core Testnet2. 
            Projects are created directly on the blockchain and ready for funding!
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 bg-green-300 border-4 border-black shadow-[6px_6px_0px_black] p-6 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-2xl font-extrabold text-black mb-2">
              Project Created on Blockchain!
            </h3>
            <p className="text-lg text-black mb-4">
              Your project has been successfully created on Core Testnet2 and is now available for funding!
            </p>
            {transactionHash && (
              <div className="bg-white border-2 border-black p-3 mb-4">
                <p className="text-sm font-bold text-black mb-2">Transaction Hash:</p>
                <p className="text-xs font-mono break-all">{transactionHash}</p>
                <a
                  href={`https://scan.test2.btcs.network/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 bg-blue-500 text-white px-3 py-1 text-sm font-bold border-2 border-black shadow-[2px_2px_0px_black] hover:bg-blue-600 transition-all duration-200"
                >
                  View on Explorer
                </a>
              </div>
            )}
            <div className="text-center">
              <button
                onClick={() => router.push('/funding')}
                className="bg-blue-500 text-white px-6 py-2 font-bold border-2 border-black shadow-[2px_2px_0px_black] hover:bg-blue-600 transition-all duration-200"
              >
                🚀 Go to Funding Page
              </button>
            </div>
          </div>
        )}

        {/* Project Submission Form */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_black] p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Title */}
            <div>
              <label htmlFor="title" className="block text-xl font-extrabold text-black mb-3">
                🚀 Project Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter your project name..."
                className={`w-full p-4 text-lg font-bold border-4 border-black shadow-[4px_4px_0px_black] focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-200 ${
                  errors.title ? 'border-red-500 bg-red-50' : 'bg-white'
                }`}
              />
              {errors.title && (
                <p className="mt-2 text-red-600 font-bold text-sm">
                  ⚠️ {errors.title}
                </p>
              )}
            </div>

            {/* Project Description */}
            <div>
              <label htmlFor="description" className="block text-xl font-extrabold text-black mb-3">
                📝 Project Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe what your project does, its key features, and why it's valuable..."
                rows={4}
                className={`w-full p-4 text-lg font-bold border-4 border-black shadow-[4px_4px_0px_black] focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-200 resize-none ${
                  errors.description ? 'border-red-500 bg-red-50' : 'bg-white'
                }`}
              />
              {errors.description && (
                <p className="mt-2 text-red-600 font-bold text-sm">
                  ⚠️ {errors.description}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-600 font-bold">
                Minimum 30 characters ({formData.description.length}/30)
              </p>
            </div>

            {/* Original Vision */}
            <div>
              <label htmlFor="vision" className="block text-xl font-extrabold text-black mb-3">
                🎯 Original Vision & Goals
              </label>
              <textarea
                id="vision"
                value={formData.vision}
                onChange={(e) => handleInputChange('vision', e.target.value)}
                placeholder="What was your original vision? What problems were you trying to solve? What were your long-term goals?"
                rows={3}
                className="w-full p-4 text-lg font-bold border-4 border-black bg-white shadow-[4px_4px_0px_black] focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-200 resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" className="block text-xl font-extrabold text-black mb-3">
                🏷️ Project Tags
              </label>
              <input
                type="text"
                id="tags"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="DeFi, Smart Contracts, NFT, Gaming (comma-separated)"
                className="w-full p-4 text-lg font-bold border-4 border-black bg-white shadow-[4px_4px_0px_black] focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-200"
              />
              <p className="mt-2 text-sm text-gray-600 font-bold">
                Add relevant tags to help the community discover your project
              </p>
            </div>

            {/* Receiver Wallet Address */}
            <div>
              <label htmlFor="receiverAddress" className="block text-xl font-extrabold text-black mb-3">
                💰 Receiver Wallet Address
              </label>
              <input
                type="text"
                id="receiverAddress"
                value={formData.receiverAddress}
                onChange={(e) => handleInputChange('receiverAddress', e.target.value)}
                placeholder="0x..."
                className={`w-full p-4 text-lg font-bold border-4 border-black shadow-[4px_4px_0px_black] focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-200 ${
                  errors.receiverAddress ? 'border-red-500 bg-red-50' : 'bg-white'
                }`}
              />
              {errors.receiverAddress && (
                <p className="mt-2 text-red-600 font-bold text-sm">
                  ⚠️ {errors.receiverAddress}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-600 font-bold">
                This wallet will receive all funding for the project. Auto-filled with your connected wallet.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-6 px-8 text-2xl font-extrabold border-4 border-black shadow-[6px_6px_0px_black] transition-all duration-200 ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-yellow-300 text-black hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_black]'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
                    Creating on Blockchain...
                  </span>
                ) : (
                  '🚀 CREATE ON BLOCKCHAIN'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Blockchain Info */}
        <div className="mt-8 bg-blue-100 border-4 border-black shadow-[6px_6px_0px_black] p-6">
          <h3 className="text-xl font-extrabold text-black mb-3">🔗 Blockchain Integration</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="font-bold text-black">Instant Creation</div>
              <div className="text-gray-700">Projects created directly on Core Testnet2</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-bold text-black">Direct Funding</div>
              <div className="text-gray-700">Funds go straight to receiver wallet</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🔍</div>
              <div className="font-bold text-black">Verifiable</div>
              <div className="text-gray-700">All transactions on blockchain explorer</div>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            <strong>Contract Address:</strong> {CONTRACT_ADDRESS === '0x0000000000000000000000000000000000000000' ? 'Not deployed yet' : `${CONTRACT_ADDRESS.slice(0, 6)}...${CONTRACT_ADDRESS.slice(-4)}`}
          </div>
        </div>
      </main>
    </div>
  )
}
