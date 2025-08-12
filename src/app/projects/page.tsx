'use client'

import { useState, useMemo } from 'react'
import { useAccount } from 'wagmi'
import Navbar from '@/components/Navbar'
import ProjectCard, { Project } from '@/components/ProjectCard'
import ProjectFilters from '@/components/ProjectFilters'
import { mockProjects } from '@/lib/mockData'

export default function ProjectsPage() {
  const { isConnected, address } = useAccount()
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('most-voted')

  // Filter and sort projects
  const filteredAndSortedProjects = useMemo(() => {
    let filtered = mockProjects

    // Apply filters
    if (activeFilter !== 'all') {
      filtered = mockProjects.filter(project => {
        switch (activeFilter) {
          case 'voting':
            return project.stage === 'Voting'
          case 'funding':
            return project.stage === 'Funding'
          case 'active':
            return project.stage === 'Active'
          case 'my-projects':
            return isConnected && address && project.owner.toLowerCase() === address.toLowerCase()
          default:
            return true
        }
      })
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'most-voted':
          return (b.votes || 0) - (a.votes || 0)
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'near-goal':
          if (a.stage === 'Funding' && b.stage === 'Funding') {
            return (b.fundingPercentage || 0) - (a.fundingPercentage || 0)
          }
          return 0
        default:
          return 0
      }
    })

    return filtered
  }, [activeFilter, sortBy, isConnected, address])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-4">
            Project Graveyard
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl">
            Discover abandoned Web3 projects that need your votes and funding to come back to life.
            {isConnected && (
              <span className="block mt-2 text-lg font-bold text-blue-600">
                👋 Welcome back! You can vote on projects and fund the ones you believe in.
              </span>
            )}
          </p>
        </div>

        {/* Quick Stats for Connected Users */}
        {isConnected && (
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6 mb-8">
            <h2 className="text-2xl font-extrabold text-black mb-4">Your Activity</h2>
            <div className="grid gap-4 md:grid-cols-4 mb-6">
              <div className="text-center">
                <div className="text-3xl font-extrabold text-blue-600">
                  {mockProjects.filter(p => p.stage === 'Voting').length}
                </div>
                <div className="text-sm text-gray-600">Projects to Vote</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-yellow-600">
                  {mockProjects.filter(p => p.stage === 'Funding').length}
                </div>
                <div className="text-sm text-gray-600">Projects to Fund</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-green-600">
                  {mockProjects.filter(p => p.stage === 'Active').length}
                </div>
                <div className="text-sm text-gray-600">Active Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-extrabold text-purple-600">
                  {mockProjects.filter(p => isConnected && address && p.owner.toLowerCase() === address.toLowerCase()).length}
                </div>
                <div className="text-sm text-gray-600">Your Projects</div>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-4 justify-center">
              <a 
                href="/post-project"
                className="inline-block bg-yellow-300 text-black font-extrabold py-3 px-6 border-4 border-black shadow-[6px_6px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_black] transition-all duration-200"
              >
                🚀 Post New Project
              </a>
              <a 
                href="/voting"
                className="inline-block bg-blue-300 text-black font-extrabold py-3 px-6 border-4 border-black shadow-[6px_6px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_black] transition-all duration-200"
              >
                🗳️ View Voting Projects
              </a>
              <a 
                href="/funding"
                className="inline-block bg-green-300 text-black font-extrabold py-3 px-6 border-4 border-black shadow-[6px_6px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_black] transition-all duration-200"
              >
                💰 View Funding Projects
              </a>
            </div>
          </div>
        )}

        {/* Filters */}
        <ProjectFilters
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showMyProjects={isConnected}
        />

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isOwner={isConnected && address && project.owner.toLowerCase() === address.toLowerCase()}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🏚️</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-2">No projects found</h3>
            <p className="text-gray-500">
              {activeFilter === 'my-projects' 
                ? "You haven't submitted any projects yet. Start by posting your abandoned project!"
                : "Try adjusting your filters or check back later for new projects."
              }
            </p>
            {activeFilter === 'my-projects' && (
              <a 
                href="/post-project"
                className="inline-block mt-4 bg-yellow-300 text-black font-extrabold py-3 px-6 border-4 border-black shadow-[6px_6px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_black] transition-all duration-200"
              >
                🚀 Post Your Project
              </a>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
