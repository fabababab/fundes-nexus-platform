
import React, { useState, useEffect } from "react";
import StartupDashboard from "./StartupDashboard";
import InvestorDashboard from "./InvestorDashboard";
import LearningJourney from "../learning/LearningJourney";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayoutRefactored";
import FundesDashboard from "../fundes/FundesDashboard";
import MSMEDashboard from "./MSMEDashboard";

interface DashboardProps {
  activeRole?: "startup" | "msme" | "investor" | "fundes";
}

const Dashboard = ({ activeRole: propActiveRole = "investor" }: DashboardProps) => {
  const location = useLocation();
  const [activeRole, setActiveRole] = useState<"startup" | "msme" | "investor" | "fundes">(
    location.state?.initialRole || propActiveRole
  );
  
  useEffect(() => {
    if (propActiveRole !== activeRole && !location.state?.initialRole) {
      console.log("Initial role changed:", propActiveRole);
      setActiveRole(propActiveRole);
    }
  }, [propActiveRole]);

  const handleRoleChange = (newRole: "company" | "startup" | "investor" | "fundes") => {
    console.log("Role changing in Dashboard from", activeRole, "to", newRole);
    setActiveRole(newRole);
  };

  const renderDashboardContent = () => {
    if (location.pathname === "/learning-journey") {
      return <LearningJourney activeRole={activeRole as "startup" | "msme" | "investor"} onRoleChange={handleRoleChange} />;
    }
    
    switch (activeRole) {
      case "startup":
        return <MSMEDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />;
      case "msme":
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
      case "startup":
        return "MSME Dashboard";
      case "msme":
        return "Startup Dashboard";
      case "investor":
        return "Donor Dashboard";
      case "fundes":
        return "Fundes Dashboard";
      default:
        return "Donor Dashboard";
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
