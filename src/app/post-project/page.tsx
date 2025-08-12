'use client'

import { useState } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

interface ProjectFormData {
  title: string
  githubRepo: string
  description: string
  vision: string
  tags: string
  fundingGoal: string
}

export default function PostProjectPage() {
  const { isConnected } = useAccount()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState<ProjectFormData>({
    title: '',
    githubRepo: '',
    description: '',
    vision: '',
    tags: '',
    fundingGoal: ''
  })
  const [errors, setErrors] = useState<Partial<ProjectFormData>>({})

  // Redirect to home if not connected
  if (!isConnected) {
    router.push('/')
    return null
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<ProjectFormData> = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Project title is required'
    }

    if (!formData.githubRepo.trim()) {
      newErrors.githubRepo = 'GitHub repository link is required'
    } else if (!formData.githubRepo.includes('github.com')) {
      newErrors.githubRepo = 'Please enter a valid GitHub repository URL'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Project description is required'
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters'
    }

    if (!formData.fundingGoal.trim()) {
      newErrors.fundingGoal = 'Funding goal is required'
    } else if (isNaN(Number(formData.fundingGoal)) || Number(formData.fundingGoal) <= 0) {
      newErrors.fundingGoal = 'Please enter a valid funding amount'
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

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Log the submitted data
      console.log('Project submitted:', {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        fundingGoal: Number(formData.fundingGoal),
        submittedAt: new Date().toISOString(),
        walletAddress: '0x...' // In real app, get from useAccount
      })

      setShowSuccess(true)
      setFormData({
        title: '',
        githubRepo: '',
        description: '',
        vision: '',
        tags: '',
        fundingGoal: ''
      })

      // Hide success message after 5 seconds
      setTimeout(() => setShowSuccess(false), 5000)
    } catch (error) {
      console.error('Error submitting project:', error)
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
            Submit your abandoned Web3 project to the EchoDAO community. 
            Let us help resurrect your vision through collective voting and funding.
          </p>
        </div>

        {/* Success Message */}
        {showSuccess && (
          <div className="mb-8 bg-green-300 border-4 border-black shadow-[6px_6px_0px_black] p-6 text-center">
            <div className="text-4xl mb-2">🎉</div>
            <h3 className="text-2xl font-extrabold text-black mb-2">
              Project Submitted Successfully!
            </h3>
            <p className="text-lg text-black">
              Your project has been added to the EchoDAO Graveyard and is now available for community voting.
            </p>
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

            {/* GitHub Repository */}
            <div>
              <label htmlFor="githubRepo" className="block text-xl font-extrabold text-black mb-3">
                📂 GitHub Repository
              </label>
              <input
                type="url"
                id="githubRepo"
                value={formData.githubRepo}
                onChange={(e) => handleInputChange('githubRepo', e.target.value)}
                placeholder="https://github.com/username/repository"
                className={`w-full p-4 text-lg font-bold border-4 border-black shadow-[4px_4px_0px_black] focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-200 ${
                  errors.githubRepo ? 'border-red-500 bg-red-50' : 'bg-white'
                }`}
              />
              {errors.githubRepo && (
                <p className="mt-2 text-red-600 font-bold text-sm">
                  ⚠️ {errors.githubRepo}
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
                Minimum 50 characters ({formData.description.length}/50)
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
                rows={4}
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

            {/* Funding Goal */}
            <div>
              <label htmlFor="fundingGoal" className="block text-xl font-extrabold text-black mb-3">
                💰 Funding Goal (USDC)
              </label>
              <input
                type="number"
                id="fundingGoal"
                value={formData.fundingGoal}
                onChange={(e) => handleInputChange('fundingGoal', e.target.value)}
                placeholder="5000"
                min="1"
                step="0.01"
                className={`w-full p-4 text-lg font-bold border-4 border-black shadow-[4px_4px_0px_black] focus:outline-none focus:ring-2 focus:ring-yellow-300 transition-all duration-200 ${
                  errors.fundingGoal ? 'border-red-500 bg-red-50' : 'bg-white'
                }`}
              />
              {errors.fundingGoal && (
                <p className="mt-2 text-red-600 font-bold text-sm">
                  ⚠️ {errors.fundingGoal}
                </p>
              )}
              <p className="mt-2 text-sm text-gray-600 font-bold">
                Set your funding target in USDC for the project revival
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
                    Submitting to Graveyard...
                  </span>
                ) : (
                  '🚀 SUBMIT TO GRAVEYARD'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Information Box */}
        <div className="mt-8 bg-blue-100 border-4 border-black shadow-[6px_6px_0px_black] p-6">
          <h3 className="text-xl font-extrabold text-black mb-3">ℹ️ What Happens Next?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl mb-2">🗳️</div>
              <div className="font-bold text-black">Community Voting</div>
              <div className="text-gray-700">Users vote with quadratic voting system</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">💰</div>
              <div className="font-bold text-black">Funding Phase</div>
              <div className="text-gray-700">Multi-token crowdfunding begins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl mb-2">🚀</div>
              <div className="font-bold text-black">Project Revival</div>
              <div className="text-gray-700">Contributors get NFT rewards</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
