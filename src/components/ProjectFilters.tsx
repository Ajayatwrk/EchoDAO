'use client'

interface ProjectFiltersProps {
  activeFilter: string
  onFilterChange: (filter: string) => void
  sortBy: string
  onSortChange: (sort: string) => void
  showMyProjects?: boolean
}

export default function ProjectFilters({ activeFilter, onFilterChange, sortBy, onSortChange, showMyProjects = false }: ProjectFiltersProps) {
  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'voting', label: 'Needs Votes' },
    { key: 'funding', label: 'Funding' },
    { key: 'active', label: 'Active' }
  ]

  // Add My Projects filter if user is connected
  if (showMyProjects) {
    filters.push({ key: 'my-projects', label: 'My Projects' })
  }

  const sortOptions = [
    { value: 'most-voted', label: 'Most Voted' },
    { value: 'newest', label: 'Newest' },
    { value: 'near-goal', label: 'Near Funding Goal' }
  ]

  return (
    <div className="bg-white border-4 border-black shadow-[6px_6px_0px_black] p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => onFilterChange(filter.key)}
              className={`px-4 py-2 font-bold border-2 border-black shadow-[3px_3px_0px_black] transition-all duration-200 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_black] ${
                activeFilter === filter.key
                  ? 'bg-yellow-300 text-black'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-3">
          <label className="text-sm font-bold text-black">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="px-3 py-2 font-bold border-2 border-black shadow-[3px_3px_0px_black] bg-white text-black focus:outline-none focus:ring-2 focus:ring-yellow-300"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
