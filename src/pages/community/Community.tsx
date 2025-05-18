
import React, { useState } from "react";
import { StartupCommunityFeed } from "@/components/community/StartupCommunityFeed";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";
import MSMECommunity from "./MSMECommunity";
import { UserRole } from "@/types/common";
import { CalendarClock } from "lucide-react";

const Community: React.FC = () => {
  const [activeRole, setActiveRole] = useState<UserRole>("msme");

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
  };

  return (
    <DashboardLayout 
      activeRole={activeRole} 
      onRoleChange={handleRoleChange}
      pageTitle={activeRole === "msme" ? "MSME Community" : activeRole === "investor" ? "Donor Community" : "Startup Community"}
    >
      {activeRole === "msme" ? (
        <MSMECommunity />
      ) : activeRole === "investor" ? (
        <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
          <div className="rounded-full bg-soft-purple p-6 mb-6">
            <CalendarClock className="h-12 w-12 text-primary-purple" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-dark-purple">Donor Community Coming Soon</h2>
          <p className="text-lg text-neutral-gray max-w-2xl mx-auto mb-8">
            We're building a dedicated community platform for donors to connect, 
            collaborate, and share insights on impactful initiatives. Get ready for a 
            space where you can engage directly with other donors and supported organizations.
          </p>
          <div className="bg-soft-gray rounded-lg p-6 max-w-xl mx-auto">
            <h3 className="font-semibold mb-2 text-secondary-purple">Coming features:</h3>
            <ul className="list-disc list-inside text-left space-y-2 text-gray-700">
              <li>Direct messaging with other donors and funded organizations</li>
              <li>Donor-exclusive events and networking opportunities</li>
              <li>Impact showcases and success stories</li>
              <li>Collaborative funding initiatives</li>
            </ul>
          </div>
        </div>
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
