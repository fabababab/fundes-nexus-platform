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
  
  useEffect(() => {
    if (initialRole !== activeRole) {
      setActiveRole(initialRole);
    }
  }, [initialRole, activeRole]);

  const renderDashboardContent = () => {
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

  const getPageTitle = () => {
    if (location.pathname === "/learning-journey") {
      return "Learning Journey";
    }
    
    switch (activeRole) {
      case "company":
        return "Company Dashboard";
      case "startup":
        return "Startup Dashboard";
      case "investor":
      default:
        return "Investor Dashboard";
    }
  };

  return (
    <DashboardLayout 
      activeRole={activeRole} 
      onRoleChange={setActiveRole}
      pageTitle={getPageTitle()}
    >
      {renderDashboardContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
