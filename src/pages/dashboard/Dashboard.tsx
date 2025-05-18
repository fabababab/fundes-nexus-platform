import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";
import InvestorDashboard from "./InvestorDashboard";
import StartupDashboard from "./StartupDashboard";
import MSMEDashboard from "./MSMEDashboard";
import FundesDashboard from "../fundes/FundesDashboard";
import { UserRole } from "@/types/common";

interface DashboardProps {
  activeRole?: UserRole;
}

const Dashboard: React.FC<DashboardProps> = ({ activeRole: initialActiveRole = "msme" }) => {
  const [activeRole, setActiveRole] = useState<UserRole>(initialActiveRole);

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
    // Potentially navigate or clear state based on role change
    // For example, if navigating to a different base path for each role:
    // navigate(`/${role}/dashboard`); 
    // However, current setup uses one Dashboard component rendering role-specific views.
  };

  // If UserSwitcher is used within DashboardLayout and calls onRoleChange,
  // this component will still try to switch.
  // If "company" is removed from UserRole type (which is read-only), then it's fine.
  // Otherwise, UserSwitcher might still allow selecting "company".

  return (
    <DashboardLayout activeRole={activeRole} onRoleChange={handleRoleChange}>
      <div className="container mx-auto py-6">
        {/* Consider moving UserSwitcher or role-based title logic here if needed */}
        {/* Example: <h1 className="text-2xl font-bold mb-4">Welcome to your {activeRole} dashboard!</h1> */}
        
        {activeRole === "investor" && <InvestorDashboard />}
        {activeRole === "startup" && <StartupDashboard />}
        {activeRole === "msme" && <MSMEDashboard />} {/* MSMEDashboard no longer needs activeRole/onRoleChange */}
        {/* {activeRole === "company" && <MSMEDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />} Removed company case */}
        {activeRole === "fundes" && <FundesDashboard />}
        
        {/* Fallback or placeholder if no specific dashboard matches activeRole, though UserRole type should ensure a match */}
        {/* {!["investor", "startup", "msme", "fundes"].includes(activeRole) && (
          <div>Please select a role to view the dashboard.</div>
        )} */}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
