
import React from "react";
import { Project } from "@/types/project";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ProjectApplicationForm } from "./ProjectApplicationForm";
import { ProjectRecommendForm } from "./ProjectRecommendForm";

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard = ({ project }: ProjectCardProps) => {
  const { toast } = useToast();

  const handleApplicationSubmit = (data: any) => {
    console.log("Application submitted:", data);
    toast({
      title: "Application Submitted",
      description: "Your application has been sent to FUNDES.",
    });
  };

  const handleRecommendationSubmit = (data: any) => {
    console.log("Recommendation submitted:", data);
    toast({
      title: "Recommendation Sent",
      description: "Thank you for recommending another MSME.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{project.name}</h3>
          <Badge variant={project.status === "recruiting" ? "default" : "secondary"}>
            {project.status === "recruiting" ? "Recruiting MSMEs" : "Active"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-sm text-muted-foreground">{project.description}</p>
      </CardContent>
      
      <CardFooter className="flex gap-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex-1">Apply for Project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Apply for {project.name}</DialogTitle>
            </DialogHeader>
            <ProjectApplicationForm projectId={project.id} onSubmit={handleApplicationSubmit} />
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex-1">Recommend MSME</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Recommend an MSME</DialogTitle>
            </DialogHeader>
            <ProjectRecommendForm projectId={project.id} onSubmit={handleRecommendationSubmit} />
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};
