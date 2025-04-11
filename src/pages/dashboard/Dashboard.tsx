
import React, { useState } from "react";
import CompanyDashboard from "./CompanyDashboard";
import StartupDashboard from "./StartupDashboard";
import InvestorDashboard from "./InvestorDashboard";

const Dashboard = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor">("company");

  const handleRoleChange = (role: "company" | "startup" | "investor") => {
    setActiveRole(role);
  };

  return (
    <>
      {activeRole === "company" && (
        <CompanyDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />
      )}
      {activeRole === "startup" && (
        <StartupDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />
      )}
      {activeRole === "investor" && (
        <InvestorDashboard activeRole={activeRole} onRoleChange={handleRoleChange} />
      )}
    </>
  );
};

export default Dashboard;
