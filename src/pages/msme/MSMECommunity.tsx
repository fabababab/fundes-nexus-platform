
import React, { useState } from "react";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import { UserRole } from "@/types/common";

// We'll reuse the existing MSMECommunity component content
import MSMECommunityContent from "@/pages/community/MSMECommunity";

const MSMECommunityPage: React.FC = () => {
  // MSME role is fixed for this page
  const [activeRole] = useState<UserRole>("msme");
  const handleRoleChange = (role: UserRole) => {
    // In a real app, this might navigate or change global state
    console.log("Role change attempt to:", role);
  };

  return (
    <SimpleDashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="MSME Community"
    >
      <MSMECommunityContent />
    </SimpleDashboardLayout>
  );
};

export default MSMECommunityPage;
