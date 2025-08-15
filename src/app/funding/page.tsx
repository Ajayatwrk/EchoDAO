'use client'

import { useState, useEffect } from 'react'
import { useAccount, useWalletClient, usePublicClient } from 'wagmi'
import { useRouter } from 'next/navigation'
import { parseEther, formatEther } from 'viem'
import Navbar from '@/components/Navbar'
import { getCoreFundDemoContract } from '@/lib/contracts'

interface Project {
  id: number
  name: string
  description: string
  owner: string
  totalFunding: bigint
  exists: boolean
}

export default function FundingPage() {
  const { isConnected, address } = useAccount()
  const { data: walletClient } = useWalletClient()
  const publicClient = usePublicClient()
  const router = useRouter()

  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [fundingAmount, setFundingAmount] = useState('')
  const [isFunding, setIsFunding] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [transactionHash, setTransactionHash] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const CONTRACT_ADDRESS =
    process.env.NEXT_PUBLIC_COREFUND_DEMO_ADDRESS ||
    '0x1d1A88f9C7eD7c6006820b24f7afEe279Ba96A49'

  const totalFunding = projects.reduce((sum, p) => sum + p.totalFunding, BigInt(0))
  const totalFundingFormatted = formatEther(totalFunding)

  useEffect(() => {
    if (!isConnected && !isRedirecting) {
      setIsRedirecting(true)
      router.push('/')
    }
  }, [isConnected, router, isRedirecting])

  useEffect(() => {
    if (isConnected && publicClient) {
      loadProjects()
    }
  }, [isConnected, publicClient])

  // ✅ Auto-select first project after load
  useEffect(() => {
    if (projects.length > 0 && selectedProject === null) {
      setSelectedProject(projects[0].id)
    }
  }, [projects, selectedProject])

  const loadProjects = async () => {
    if (!isConnected || !publicClient) return
    try {
      setIsLoading(true)
      const contract = getCoreFundDemoContract(CONTRACT_ADDRESS)
      const projectCount = await contract.read.projectCount()

      if (projectCount > 0) {
        const validProjects: Project[] = []
        for (let i = 1; i <= Number(projectCount); i++) {
          try {
            const p = await contract.read.getProject([BigInt(i)])
            if (p && p[1] && p[2] && p[0]) {
              validProjects.push({
                id: i,
                name: p[1],
                description: p[2],
                owner: p[0],
                totalFunding: p[3],
                exists: true
              })
            }
          } catch {}
        }
        if (validProjects.length > 0) {
          setProjects(validProjects)
          return
        }
      }
      await createDemoProject()
    } catch {
      await createDemoProject()
    } finally {
      setIsLoading(false)
    }
  }

  const createDemoProject = async () => {
    if (!walletClient || !publicClient) return
    try {
      const contract = getCoreFundDemoContract(CONTRACT_ADDRESS)
      const { request } = await contract.simulate.createProject([
        'Abandoned Web3 Project',
        'A project from hackathon that needs funding to continue development'
      ])
      const hash = await walletClient.writeContract(request)
      await publicClient.waitForTransactionReceipt({ hash })
      await loadProjects()
    } catch {}
  }

  const handleFund = async (projectId: number) => {
    if (!fundingAmount || parseFloat(fundingAmount) <= 0 || !walletClient || !publicClient) {
      alert('Enter a valid amount and ensure wallet is connected')
      return
    }
    setIsFunding(true)
    try {
      const contract = getCoreFundDemoContract(CONTRACT_ADDRESS)
      const amountInWei = parseEther(fundingAmount)
      const { request } = await contract.simulate.fundProject([BigInt(projectId)], {
        value: amountInWei
      })
      const hash = await walletClient.writeContract(request)
      setTransactionHash(hash)
      await publicClient.waitForTransactionReceipt({ hash })
      setShowSuccess(true)
      setFundingAmount('')
      await loadProjects()
      setTimeout(() => setShowSuccess(false), 10000)
    } catch {
      alert('Funding failed. Try again.')
    } finally {
      setIsFunding(false)
    }
  }

  if (isRedirecting) return null
  if (!isConnected)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <p className="text-xl font-bold">Connecting wallet...</p>
      </div>
    )

  if (isLoading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Navbar />
        <p className="text-xl font-bold">Loading projects...</p>
      </div>
    )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <h1 className="text-4xl font-extrabold text-center mb-8">💰 Funding Phase</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {projects.map(project => {
              const fundingFormatted = formatEther(project.totalFunding)
              const isSelected = selectedProject === project.id
              return (
                <div
                  key={project.id}
                  className={`bg-white border-4 ${
                    isSelected ? 'border-green-500' : 'border-black'
                  } shadow-[6px_6px_0px_black] p-6`}
                >
                  <h3 className="text-2xl font-extrabold mb-2">{project.name}</h3>
                  <p className="mb-4">{project.description}</p>
                  <p className="text-sm mb-4">Raised: {parseFloat(fundingFormatted).toFixed(4)} tCORE2</p>
                  <button
                    onClick={() => setSelectedProject(project.id)}
                    className={`px-6 py-3 font-extrabold border-2 border-black shadow-[4px_4px_0px_black] ${
                      isSelected
                        ? 'bg-green-400 text-black'
                        : 'bg-yellow-400 text-black hover:bg-yellow-500'
                    }`}
                  >
                    {isSelected ? '✅ Selected' : '💰 Select to Fund'}
                  </button>
                </div>
              )
            })}
          </div>

          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6">
            <h3 className="text-xl font-extrabold mb-4">💸 Fund Project</h3>
            {selectedProject && (
              <>
                <p className="mb-2 font-bold">
                  Selected: {projects.find(p => p.id === selectedProject)?.name}
                </p>
                <input
                  type="number"
                  value={fundingAmount}
                  onChange={e => setFundingAmount(e.target.value)}
                  placeholder="0.0"
                  min="0.001"
                  step="0.001"
                  className="w-full p-3 border-2 border-black font-bold text-center mb-3"
                />
                <button
                  onClick={() => handleFund(selectedProject)}
                  disabled={isFunding}
                  className="w-full py-3 px-4 bg-green-400 border-2 border-black font-extrabold shadow-[4px_4px_0px_black]"
                >
                  {isFunding ? 'Processing...' : '🚀 Fund Project'}
                </button>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
