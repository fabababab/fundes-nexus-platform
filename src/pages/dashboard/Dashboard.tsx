
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayoutRefactored";
import MSMEDashboard from "./MSMEDashboard";
import InvestorDashboard from "./InvestorDashboard";
import LearningJourney from "../learning/LearningJourney";
import CompanyDashboard from "./MSMEDashboard"; // We're temporarily reusing MSMEDashboard for Company view
import FundesDashboard from "../fundes/FundesDashboard";
import { UserRole } from "@/types/common";

interface DashboardProps {
  activeRole?: UserRole;
}

const Dashboard = ({ activeRole: propActiveRole = "investor" }: DashboardProps) => {
  const location = useLocation();
  const [activeRole, setActiveRole] = useState<UserRole>(
    location.state?.initialRole || propActiveRole
  );
  
  useEffect(() => {
    if (propActiveRole !== activeRole && !location.state?.initialRole) {
      console.log("Initial role changed:", propActiveRole);
      setActiveRole(propActiveRole);
    }
  }, [propActiveRole]);

  const handleRoleChange = (newRole: UserRole) => {
    console.log("Role changing in Dashboard from", activeRole, "to", newRole);
    setActiveRole(newRole);
  };

  const renderDashboardContent = () => {
    if (location.pathname === "/learning-journey") {
      return <LearningJourney activeRole={activeRole} onRoleChange={handleRoleChange} />;
    }
    
    switch (activeRole) {
      case "msme":
        return <MSMEDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />;
      case "company":
        return <CompanyDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />;
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
      case "msme":
        return "MSME Dashboard";
      case "company":
        return "Companies Dashboard";
      case "investor":
        return "Donors Dashboard";
      case "fundes":
        return "Fundes Dashboard";
      default:
        return "Donors Dashboard";
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
