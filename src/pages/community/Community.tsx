
import React, { useState } from "react";
import { StartupCommunityFeed } from "@/components/community/StartupCommunityFeed";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";

const Community: React.FC = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor">("startup");

  const handleRoleChange = (newRole: "company" | "startup" | "investor") => {
    setActiveRole(newRole);
  };

  return (
    <DashboardLayout 
      activeRole={activeRole} 
      onRoleChange={handleRoleChange}
      pageTitle="Startup Community"
    >
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Community</h1>
        <p className="text-muted-foreground">
          Connect with fellow founders, share your experiences, and learn from others in the startup ecosystem.
        </p>
        <StartupCommunityFeed />
      </div>
    </DashboardLayout>
  );
};

export default Community;
