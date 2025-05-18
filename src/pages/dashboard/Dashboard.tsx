
import React, { useState } from "react";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import InvestorDashboard from "./InvestorDashboard";
import FundesDashboard from "../fundes/FundesDashboard";
import { UserRole } from "@/types/common";
import { Navigate } from "react-router-dom";

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
        return "MSME Feed";  // Updated title
      case "fundes":
        return "Fundes Dashboard";
      default: {
        // Fallback for any unexpected role, though UserRole type should prevent this.
        const exhaustiveCheck: never = role;
        return "Dashboard";
      }
    }
  };

  // If MSME role is active, redirect to the feed page
  if (activeRole === "msme") {
    return <Navigate to="/msme/feed" replace />;
  }

  // For other roles, show their respective dashboards
  return (
    <SimpleDashboardLayout 
      activeRole={activeRole} 
      onRoleChange={handleRoleChange}
      pageTitle={getPageTitle(activeRole)}
    >
      <div className="py-6">
        {activeRole === "investor" && <InvestorDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />}
        {activeRole === "fundes" && <FundesDashboard />}
      </div>
    </SimpleDashboardLayout>
  );
};

export default Dashboard;
