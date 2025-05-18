
import React from "react";
import { Book, CheckCircle, Clock } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { UserRole } from "@/types/common";

interface LearningJourneyProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const LearningJourney: React.FC<LearningJourneyProps> = ({ activeRole, onRoleChange }) => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: Book,
      url: "#dashboard",
    },
    {
      title: "My Courses",
      icon: Book,
      url: "#courses",
    },
    {
      title: "Community",
      icon: Book,
      url: "#community",
    },
    {
      title: "Resources",
      icon: Book,
      url: "#resources",
    },
    {
      title: "Settings",
      icon: Book,
      url: "#settings",
    },
  ];

  const courses = [
    {
      title: "Impact Measurement for Startups",
      description: "Learn how to measure the impact of your startup and attract investors.",
      progress: 75,
      completed: true,
    },
    {
      title: "Sustainable Business Models",
      description: "Develop a sustainable business model that aligns with your values.",
      progress: 50,
      completed: false,
    },
    {
      title: "Fundraising for Impact Startups",
      description: "Master the art of fundraising and secure funding for your impact startup.",
      progress: 25,
      completed: false,
    },
  ];

  return (
    <DashboardLayout 
      menuItems={menuItems} 
      activeRole={activeRole} 
      onRoleChange={onRoleChange}
      pageTitle="Learning Journey"
    >
      <div className="container mx-auto py-8">
        <h1 className="text-2xl font-bold mb-4">Your Learning Journey</h1>
        <p className="text-gray-600 mb-8">
          Continue your journey towards building a successful and impactful startup.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
              <p className="text-gray-700 mb-4">{course.description}</p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Progress: {course.progress}%</span>
                {course.completed ? (
                  <CheckCircle className="text-green-500" />
                ) : (
                  <Clock className="text-gray-500" />
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                {course.completed ? "Review" : "Continue"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default LearningJourney;
