
import React, { useState, useEffect } from "react";
import CompanyDashboard from "./CompanyDashboard";
import StartupDashboard from "./StartupDashboard";
import InvestorDashboard from "./InvestorDashboard";
import LearningJourney from "../learning/LearningJourney";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayoutRefactored";
import FundesDashboard from "../fundes/FundesDashboard";

interface DashboardProps {
  activeRole?: "company" | "startup" | "investor" | "fundes";
}

const Dashboard = ({ activeRole: initialRole = "investor" }: DashboardProps) => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor" | "fundes">(initialRole);
  const location = useLocation();
  
  // Update activeRole when initialRole prop changes
  useEffect(() => {
    if (initialRole !== activeRole) {
      console.log("Initial role changed:", initialRole);
      setActiveRole(initialRole);
    }
  }, [initialRole]);

  const handleRoleChange = (newRole: "company" | "startup" | "investor" | "fundes") => {
    console.log("Role changing in Dashboard from", activeRole, "to", newRole);
    setActiveRole(newRole);
  };

  const renderDashboardContent = () => {
    if (location.pathname === "/learning-journey") {
      return <LearningJourney activeRole={activeRole as "company" | "startup" | "investor"} onRoleChange={handleRoleChange} />;
    }
    
    switch (activeRole) {
      case "company":
        return <CompanyDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />;
      case "startup":
        return <StartupDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />;
      case "investor":
        return <InvestorDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />;
      case "fundes":
        return <FundesDashboard activeRole={activeRole} />;
      default:
        return <InvestorDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />;
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
        return "Investor Dashboard";
      case "fundes":
        return "Fundes Dashboard";
      default:
        return "Investor Dashboard";
    }
  };

  return (
    <DashboardLayout 
      activeRole={activeRole} 
      onRoleChange={handleRoleChange}
      pageTitle={getPageTitle()}
    >
      {renderDashboardContent()}
    </DashboardLayout>
  );
};

export default Dashboard;
