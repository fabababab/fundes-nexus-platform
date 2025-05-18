
import React, { useState } from "react";
import { ProjectCard } from "@/components/msme/ProjectCard";
// Card import is not used directly in this file anymore as ProjectCard handles its own card styling.
// We will use DashboardLayout for the page structure.
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { UserRole } from "@/types/common";

const mockProjects = [
  {
    id: "1",
    name: "Sustainable Supply Chain Initiative",
    description: "Join our program to optimize your supply chain for sustainability and efficiency. We help MSMEs implement eco-friendly practices while reducing operational costs.",
    status: "recruiting",
  },
  {
    id: "2",
    name: "Digital Transformation Program",
    description: "Get support in digitizing your business operations. Learn to leverage technology for better market reach and operational efficiency.",
    status: "active",
  },
] as const;

const ProjectOverview = () => {
  // MSME role is assumed for this page
  const [activeRole] = useState<UserRole>("msme");
  const handleRoleChange = (role: UserRole) => {
    // In a real app, this might navigate or change global state
    console.log("Role change attempt to:", role);
  };

  return (
    <DashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="Project Overview"
    >
      <div className="container mx-auto py-8 space-y-6">
        <div className="flex justify-between items-center">
          {/* Page title is now handled by DashboardLayout, so we can remove this h1 if desired, 
              or keep it as a secondary title if the design benefits from it. 
              For consistency with LearningModules, we'll rely on DashboardLayout's title. */}
          {/* <h1 className="text-3xl font-bold">Project Overview</h1> */}
        </div>
        <p className="text-lg text-neutral-gray mb-8">
          Explore available projects and manage your ongoing initiatives.
        </p>
        
        <div className="grid gap-6 md:grid-cols-2">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectOverview;
