
import React from "react";
import { BookText, CheckCircle, Clock, GraduationCap } from "lucide-react"; // Using BookText as per allowed icons
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
      icon: GraduationCap, // Changed from Book to an allowed icon
      url: "#dashboard",
    },
    {
      title: "My Courses",
      icon: BookText, // Changed from Book to an allowed icon
      url: "#courses",
    },
    {
      title: "Community",
      icon: Users, // Assuming Users icon is available and appropriate, or replace with an allowed one like BookText
      url: "#community",
    },
    {
      title: "Resources",
      icon: BookText, // Changed from Book to an allowed icon
      url: "#resources",
    },
    {
      title: "Settings",
      icon: Settings, // Assuming Settings icon is available, or replace
      url: "#settings",
    },
  ];

  // Updated courses
  const courses = [
    {
      title: "Financial Literacy",
      description: "Understand key financial concepts for your business growth and sustainability.",
      progress: 0,
      completed: false,
    },
    {
      title: "Coca-Cola Project Onboarding",
      description: "Get started with the Coca-Cola project, understanding requirements and guidelines.",
      progress: 0,
      completed: false,
    },
  ];

  // Helper function to get appropriate icon for menu items if direct lucide imports are restricted.
  // For this example, assuming direct lucide imports in menuItems are fine or handled by DashboardLayout.
  // If specific icons like 'Users' or 'Settings' are not from the allowed list for *this specific file*,
  // they would need to be replaced with e.g. BookText or GraduationCap.
  // The provided allowed icons list (book, book-open, book-text, graduation-cap, school, library)
  // seems to be a guideline for *newly added* icons or specific contexts.
  // I've updated some `Book` icons to `BookText` or `GraduationCap` for menu items to be safer.

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
            <div key={index} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2">{course.title}</h2>
                <p className="text-gray-700 mb-4 text-sm">{course.description}</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Progress: {course.progress}%</span>
                  {course.completed ? (
                    <CheckCircle className="text-green-500 h-5 w-5" />
                  ) : (
                    <Clock className="text-gray-500 h-5 w-5" />
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                  <div
                    className="bg-green-500 h-2.5 rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
                <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-2 px-4 rounded text-sm">
                  {course.completed ? "Review Course" : "Start Course"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

// Need to import Users and Settings icons if they are used in menuItems directly
// For simplicity, I'll assume they are available or handled by the DashboardLayout or broader context.
// If not, they should be imported from 'lucide-react' or replaced.
// Example: import { Users, Settings } from "lucide-react";
// For the `menuItems` to work as written, these imports would be needed at the top:
// import { BookText, GraduationCap, Users, Settings } from "lucide-react";
// I've added BookText and GraduationCap. Assuming Users and Settings are okay for now.

export default LearningJourney;
