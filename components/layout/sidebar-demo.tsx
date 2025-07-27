import React, { useState } from 'react'
import Sidebar from './sidebar'

const SidebarDemo: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview')

  const handleSectionChange = (section: string) => {
    setActiveSection(section)
    console.log('Active section changed to:', section)
  }

  return (
    <div className="flex h-screen bg-[#0F0F0F]">
      <Sidebar 
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
      />
      <div className="flex-1 p-8">
        <div className="bg-[#1C1C1C] rounded-lg p-6">
          <h1 className="text-white text-2xl font-bold mb-4">
            {activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Section
          </h1>
          <p className="text-gray-400">
            This is the {activeSection} section content. The sidebar navigation is working correctly.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SidebarDemo 
