
import React, { useState } from "react";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import { UserRole } from "@/types/common";
import { BookText, CheckCircle, Clock } from "lucide-react"; 
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const LearningModules: React.FC = () => {
  // MSME role is assumed for this page, onRoleChange can be a dummy
  const [activeRole] = useState<UserRole>("msme");
  const handleRoleChange = (role: UserRole) => {
    // In a real app, this might navigate or change global state
    console.log("Role change attempt to:", role);
  };

  const learningJourneys = [
    {
      title: "Financial Literacy",
      description: "Overcome tax fears, open your first bank account, and discover how formal finance helps your business grow.",
      progress: 35, // Example progress
      completed: false,
      icon: BookText,
    },
    {
      title: "Coca-Cola Project Onboarding",
      description: "Get onboarded to the Coca-Cola project with this guided AI learning experience.",
      progress: 20, // Example progress
      completed: false,
      icon: BookText,
    },
  ];

  return (
    <SimpleDashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="Learning Modules"
    >
      <div className="py-responsive">
        <h1 className="text-h2 mb-2">AI-Powered Learning Modules</h1>
        <p className="text-body mb-6">
          Embark on specialized learning journeys to boost your skills and knowledge.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-responsive">
          {learningJourneys.map((journey, index) => (
            <Card key={index} className="hover-scale transition-shadow duration-normal">
              <CardContent className="p-responsive">
                <div className="flex items-center mb-4">
                  <journey.icon className="h-6 w-6 md:h-8 md:w-8 text-primary mr-3" />
                  <h2 className="text-h4">{journey.title}</h2>
                </div>
                
                <p className="text-body mb-6">{journey.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-caption">Progress: {journey.progress}%</span>
                  {journey.completed ? (
                    <CheckCircle size={18} className="text-success" />
                  ) : (
                    <Clock size={18} className="text-secondary" />
                  )}
                </div>
                
                <Progress 
                  value={journey.progress} 
                  className="h-2.5 mb-6 bg-muted"
                />
                
                <Button 
                  className={cn(
                    "w-full",
                    journey.completed ? "bg-secondary hover:bg-secondary/90" : "bg-primary hover:bg-primary/90"
                  )}
                >
                  {journey.completed ? "Review Journey" : "Continue Journey"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SimpleDashboardLayout>
  );
};

export default LearningModules;
