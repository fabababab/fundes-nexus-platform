
import React, { useState, useEffect } from "react";
import CompanyDashboard from "./CompanyDashboard";
import StartupDashboard from "./StartupDashboard";
import InvestorDashboard from "./InvestorDashboard";
import LearningJourney from "../learning/LearningJourney";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayoutRefactored";

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

  const renderDashboardContent = () => {
    // Check if we're on the learning journey route
    if (location.pathname === "/learning-journey") {
      return <LearningJourney />;
    }
    
    switch (activeRole) {
      case "company":
        return <CompanyDashboard />;
      case "startup":
        return <StartupDashboard />;
      case "investor":
      default:
        return <InvestorDashboard />;
    }
  };

  return (
    <DashboardLayout activeRole={activeRole} onRoleChange={setActiveRole}>
      {renderDashboardContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
