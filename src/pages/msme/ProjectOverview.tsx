
import React, { useState } from "react";
import { ProjectCard } from "@/components/msme/ProjectCard";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
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
    <SimpleDashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="Project Overview"
    >
      <div className="py-4 md:py-8">
        <p className="text-body text-neutral-gray mb-6">
          Explore available projects and manage your ongoing initiatives.
        </p>
        
        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
          {mockProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </SimpleDashboardLayout>
  );
};

export default ProjectOverview;
