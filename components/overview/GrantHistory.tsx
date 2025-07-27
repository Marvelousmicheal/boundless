import React from "react";
import { RecentProjectsProps } from "@/types/project";
import { ChevronRight, Plus } from "lucide-react";
import ProjectCard from "../project-card";
import EmptyState from "../EmptyState";
import { BoundlessButton } from "../buttons";

const GrantHistory = ({ projects }: { projects: RecentProjectsProps[] }) => {
  return (
    <div className="bg-[#1C1C1C] p-4 sm:p-6 rounded-[12px] flex flex-col gap-6 sm:gap-8 w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-white text-lg sm:text-xl font-medium leading-[120%] tracking-[-0.4px]">
          Grant History
        </h2>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))
        ) : (
          <div className="col-span-full">
            <div className="w-full max-w-md mx-auto">
              <EmptyState
                title="No grants activity yet"
                description="Grants you apply for or create will appear here. Browse open opportunities or launch a new grant program to get started."
                type="default"
                action={
                  <BoundlessButton
                    variant="secondary"
                    size="lg"
                  >
                    Explore Grants
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

export default GrantHistory;
