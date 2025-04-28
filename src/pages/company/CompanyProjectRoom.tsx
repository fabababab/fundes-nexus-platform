
import React, { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";
import { UserRole } from "@/types/common";

const CompanyProjectRoom = () => {
  const [activeRole, setActiveRole] = useState<UserRole>("company");
  
  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
  };

  return (
    <DashboardLayout activeRole={activeRole} onRoleChange={handleRoleChange} pageTitle="Project Room">
      <div>Project Room Content</div>
    </DashboardLayout>
  );
};

export default CompanyProjectRoom;
