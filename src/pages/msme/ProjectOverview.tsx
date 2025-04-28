
import React from "react";
import { ProjectCard } from "@/components/msme/ProjectCard";
import { Card } from "@/components/ui/card";

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
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Project Overview</h1>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        {mockProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default ProjectOverview;
