
import React, { useState } from "react";
import { StartupCommunityFeed } from "@/components/community/StartupCommunityFeed";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";
import MSMECommunity from "./MSMECommunity";
import { UserRole } from "@/types/common";

const Community: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>("startup");

  const handleRoleChange = (newRole: UserRole) => {
    setActiveRole(newRole);
  };

  return (
    <DashboardLayout 
      activeRole={activeRole} 
      onRoleChange={handleRoleChange}
      pageTitle={activeRole === "msme" ? "MSME Community" : "Startup Community"}
    >
      {activeRole === "msme" ? (
        <MSMECommunity />
      ) : (
        <div className="space-y-6">
          <h1 className="text-2xl font-bold">Community</h1>
          <p className="text-muted-foreground">
            Connect with fellow founders, share your experiences, and learn from others in the startup ecosystem.
          </p>
          <StartupCommunityFeed />
        </div>
      )}
    </DashboardLayout>
  );
};

export default Community;
