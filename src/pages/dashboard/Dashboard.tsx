
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";
import InvestorDashboard from "./InvestorDashboard";
// import StartupDashboard from "./StartupDashboard"; // "startup" role is not in UserRole
import MSMEDashboard from "./MSMEDashboard";
import FundesDashboard from "../fundes/FundesDashboard";
import { UserRole } from "@/types/common";
// import StartupDashboardProps from './StartupDashboard'; // Assuming StartupDashboardProps type is not needed

interface DashboardProps {
  activeRole?: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ activeRole: initialActiveRole = "msme" }) => {
  const [activeRole, setActiveRole] = useState<UserRole>(initialActiveRole);

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
  };

  const getPageTitle = (role: UserRole): string => {
    switch (role) {
      case "investor":
        return "Investor Dashboard";
      case "msme":
        return "MSME Dashboard";
      case "fundes":
        return "Fundes Dashboard";
      // case "company": // Removed as company role is removed
      //   return "Company Dashboard";
      // case "startup": // Removed as startup role is not in UserRole
      // return "Startup Dashboard"; 
      default: {
        // Fallback for any unexpected role, though UserRole type should prevent this.
        const exhaustiveCheck: never = role;
        return "Dashboard";
      }
    }
  };

  return (
    <DashboardLayout 
      activeRole={activeRole} 
      onRoleChange={handleRoleChange}
      pageTitle={getPageTitle(activeRole)}
    >
      <div className="container mx-auto py-6">
        {activeRole === "investor" && <InvestorDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />}
        {/* {activeRole === "startup" && <StartupDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />} "startup" role is not valid */}
        {activeRole === "msme" && <MSMEDashboard />}
        {activeRole === "fundes" && <FundesDashboard />}
        
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
