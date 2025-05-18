
import React, { useState } from "react";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import { UserRole } from "@/types/common";
import { BookText, CheckCircle, Clock } from "lucide-react"; 

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
      <div className="py-4 md:py-8">
        <h1 className="text-h2 text-dark-purple mb-2">AI-Powered Learning Modules</h1>
        <p className="text-body text-neutral-gray mb-6 md:mb-8">
          Embark on specialized learning journeys to boost your skills and knowledge.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {learningJourneys.map((journey, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-4 md:p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <journey.icon className="h-6 w-6 md:h-8 md:w-8 text-primary-purple mr-3" />
                <h2 className="text-lg md:text-xl font-semibold text-dark-purple">{journey.title}</h2>
              </div>
              <p className="text-gray-600 mb-6 text-sm">{journey.description}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-gray-500">Progress: {journey.progress}%</span>
                {journey.completed ? (
                  <CheckCircle size={18} className="text-green-500" />
                ) : (
                  <Clock size={18} className="text-gray-400" />
                )}
              </div>
              <div className="w-full bg-soft-gray rounded-full h-2.5 mb-6">
                <div
                  className="bg-primary-purple h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${journey.progress}%` }}
                ></div>
              </div>
              <button className="w-full bg-primary-purple hover:bg-secondary-purple text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300">
                {journey.completed ? "Review Journey" : "Continue Journey"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </SimpleDashboardLayout>
  );
};

export default LearningModules;
