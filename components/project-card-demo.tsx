import React from 'react'
import ProjectCard from './project-card'
import { Project } from '@/types/project'

const ProjectCardDemo: React.FC = () => {
  const sampleProject: Project = {
    id: '1',
    name: 'Boundless',
    description: 'Boundless is a decentralized platform for crowdfunding and grant funding built on the Stellar blockchain. It enables transparent, milestone-based funding for ambitious projects and public innovation.',
    image: '/api/placeholder/400/200',
    link: '/projects/boundless',
    tags: ['blockchain', 'crowdfunding', 'grants'],
    category: 'web3',
    type: 'crowdfunding',
    amount: 123000,
    status: 'under_review',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z'
  }

  const handleVote = (projectId: string) => {
    console.log('Voted for project:', projectId)
  }

  const handleComment = (projectId: string) => {
    console.log('Comment on project:', projectId)
  }

  const handleView = (projectId: string) => {
    console.log('View project:', projectId)
  }

  return (
    <div className="p-6 bg-[#0F0F0F] min-h-screen">
      <div className="max-w-md mx-auto">
        <h2 className="text-white text-2xl font-bold mb-6">Project Card Demo</h2>
        <ProjectCard
          project={sampleProject}
          onVote={handleVote}
          onComment={handleComment}
          onView={handleView}
        />
      </div>
    </div>
  )
}

export default ProjectCardDemo 
