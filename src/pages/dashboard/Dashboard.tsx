
import React, { useState, useEffect } from "react";
import CompanyDashboard from "./CompanyDashboard";
import StartupDashboard from "./StartupDashboard";
import InvestorDashboard from "./InvestorDashboard";
import LearningJourney from "../learning/LearningJourney";
import { useLocation } from "react-router-dom";

interface DashboardProps {
  activeRole?: "company" | "startup" | "investor";
}

const Dashboard = ({ activeRole: initialRole = "investor" }: DashboardProps) => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor">(initialRole);
  const location = useLocation();
  
  // Update activeRole when initialRole changes (e.g. when routing directly to learning journey)
  useEffect(() => {
    if (initialRole !== activeRole) {
      setActiveRole(initialRole);
    }
  }, [initialRole]);

  const renderContent = () => {
    // Check if we're on the learning journey route
    if (location.pathname === "/learning-journey") {
      return <LearningJourney activeRole={activeRole} onRoleChange={setActiveRole} />;
    }
    
    switch (activeRole) {
      case "company":
        return <CompanyDashboard activeRole={activeRole} onRoleChange={setActiveRole} />;
      case "startup":
        return <StartupDashboard activeRole={activeRole} onRoleChange={setActiveRole} />;
      case "investor":
      default:
        return <InvestorDashboard activeRole={activeRole} onRoleChange={setActiveRole} />;
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-background">
      {renderContent()}
    </div>
  );
};

export default Dashboard;
