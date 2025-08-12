import Link from 'next/link'

export interface Project {
  id: string
  name: string
  description: string
  stage: 'Voting' | 'Funding' | 'Active'
  votes?: number
  tags: string[]
  createdAt: string
  owner: string
  fundingGoal?: number
  currentFunding?: number
  fundingPercentage?: number
}

interface ProjectCardProps {
  project: Project
  isOwner?: boolean
}

export default function ProjectCard({ project, isOwner = false }: ProjectCardProps) {
  const getStageColor = (stage: string) => {
    switch (stage) {
      case 'Voting':
        return 'bg-blue-300'
      case 'Funding':
        return 'bg-yellow-300'
      case 'Active':
        return 'bg-green-300'
      default:
        return 'bg-gray-300'
    }
  }

  const getStageIcon = (stage: string) => {
    switch (stage) {
      case 'Voting':
        return '🗳️'
      case 'Funding':
        return '💰'
      case 'Active':
        return '🚀'
      default:
        return '📋'
    }
  }

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_black] transition-all duration-200">
      {/* Header */}
      <div className="p-6 border-b-4 border-black">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-2xl font-extrabold text-black leading-tight">
            {project.name}
          </h3>
          <div className={`${getStageColor(project.stage)} px-3 py-2 border-2 border-black text-black font-extrabold text-sm flex items-center space-x-2 shadow-[3px_3px_0px_black]`}>
            <span>{getStageIcon(project.stage)}</span>
            <span>{project.stage}</span>
          </div>
        </div>

        {/* Owner Badge */}
        {isOwner && (
          <div className="mb-3">
            <span className="inline-block bg-purple-300 text-black text-xs font-extrabold px-3 py-1 border-2 border-black shadow-[2px_2px_0px_black]">
              👑 Your Project
            </span>
          </div>
        )}

        <p className="text-gray-700 text-base leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag, index) => (
            <span key={index} className="bg-gray-200 px-2 py-1 border-2 border-black text-xs font-bold text-black">
              {tag}
            </span>
          ))}
        </div>

        {/* Project Stats */}
        <div className="space-y-3">
          {project.stage === 'Voting' && (
            <div className="text-center p-3 bg-blue-100 border-2 border-black">
              <div className="text-2xl font-extrabold text-blue-600">{project.votes || 0}</div>
              <div className="text-sm text-gray-600 font-bold">Total Votes</div>
            </div>
          )}
          
          {project.stage === 'Funding' && (
            <div>
              <div className="flex justify-between text-sm font-bold text-black mb-2">
                <span>Funding Progress</span>
                <span>{project.fundingPercentage || 0}%</span>
              </div>
              <div className="w-full bg-gray-200 border-2 border-black h-4 mb-2">
                <div
                  className="bg-yellow-400 h-full border-r-2 border-black"
                  style={{ width: `${Math.min(project.fundingPercentage || 0, 100)}%` }}
                ></div>
              </div>
              <div className="text-sm text-gray-600 text-center">
                {project.currentFunding || 0} / {project.fundingGoal || 0} USDC
              </div>
            </div>
          )}
          
          {project.stage === 'Active' && (
            <div className="text-center p-3 bg-green-100 border-2 border-black">
              <div className="text-lg font-bold text-green-600">
                🚀 Project is live!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Section */}
      <div className="p-6">
        {isOwner ? (
          // Owner view - can only see details, no actions
          <div className="text-center">
            <div className="text-lg font-bold text-purple-600 mb-3">
              🎯 You can't vote on your own project
            </div>
            <div className="text-sm text-gray-600 mb-4">
              {project.stage === 'Voting' && 'Wait for community votes to proceed to funding'}
              {project.stage === 'Funding' && 'Your project is in funding phase - spread the word!'}
              {project.stage === 'Active' && 'Congratulations! Your project is now live'}
            </div>
            <Link
              href={`/project/${project.id}`}
              className="inline-block w-full text-center bg-gray-300 text-gray-600 font-extrabold py-3 px-4 border-2 border-black shadow-[4px_4px_0px_black] cursor-not-allowed"
            >
              View Details
            </Link>
          </div>
        ) : (
          // Other users - can vote/fund
          <Link
            href={`/project/${project.id}`}
            className="inline-block w-full text-center bg-yellow-300 text-black font-extrabold py-3 px-4 border-2 border-black shadow-[4px_4px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_black] transition-all duration-200"
          >
            {project.stage === 'Voting' ? 'Vote Now' : 
             project.stage === 'Funding' ? 'Fund Project' : 'View Details'}
          </Link>
        )}
      </div>
    </div>
  )
}
