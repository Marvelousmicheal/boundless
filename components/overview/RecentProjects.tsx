import React from "react";
import { RecentProjectsProps } from "@/types/project";
import { ChevronRight, Plus } from "lucide-react";
import ProjectCard from "../project-card";
import EmptyState from "../EmptyState";
import { BoundlessButton } from "../buttons";

const RecentProjects = ({ projects }: { projects: RecentProjectsProps[] }) => {
  return (
    <div className="bg-[#1C1C1C] p-4 sm:p-6 rounded-[12px] flex flex-col gap-6 sm:gap-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg sm:text-xl font-medium leading-[120%] tracking-[-0.4px]">
          Recent Projects
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols- xl:grid-cols-3 gap-4 sm:gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} showEllipsisMenu={true} />
          ))
        ) : (
          <div className="col-span-full">
            <div className="w-full max-w-md mx-auto">
              <EmptyState
                title="No projects yet"
                description="Start by sharing your first project idea with the Boundless community. Once submitted, your projects will appear here for easy tracking."
                type="default"
                action={
                  <BoundlessButton
                    variant="default"
                    size="lg"
                    icon={<Plus className="w-5 h-5" />}
                    iconPosition="right"
                  >
                    New Project
                  </BoundlessButton>
                }
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentProjects;
