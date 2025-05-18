
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import InvestorFeed from "@/components/feed/InvestorFeed";
import StartupFeed from "@/components/feed/StartupFeed"; // Assuming this is for MSME or general startup content
// import CompanyFeed from "@/components/feed/CompanyFeed"; // CompanyFeed is no longer used
import { UserRole } from "@/types/common";
import { useLocation } from "react-router-dom";

// Mock data for feeds (replace with actual data fetching)
const mockFeedItems = {
  investor: [
    { id: "1", type: "New Startup", content: "EcoPower Inc. just launched their seed round.", timestamp: "2 hours ago" },
    { id: "2", type: "Market Update", content: "Renewable energy sector sees 15% growth.", timestamp: "5 hours ago" },
  ],
  msme: [
    { id: "1", type: "Funding Opportunity", content: "GreenTech Fund is open for applications.", timestamp: "1 day ago" },
    { id: "2", type: "Partnership", content: "Connect with SustainCorp for supply chain improvements.", timestamp: "3 days ago" },
  ],
  fundes: [
    { id: "1", type: "Ecosystem Update", content: "New cohort of MSMEs onboarded.", timestamp: "Yesterday" },
    { id: "2", type: "Impact Report", content: "Q1 Impact Report published for Fundes initiatives.", timestamp: "4 days ago"},
  ],
};

const Feed: React.FC = () => {
  const location = useLocation();
  const initialRole = location.state?.initialRole || "msme";
  const [activeRole, setActiveRole] = useState<UserRole>(initialRole as UserRole);

  const handleRoleChange = (newRole: UserRole) => {
    setActiveRole(newRole);
  };

  const getPageTitle = (role: UserRole): string => {
    switch (role) {
      case "investor":
        return "Investor Feed";
      case "msme":
        return "MSME Feed";
      case "fundes":
        return "Fundes Feed";
      default:
        return "Activity Feed";
    }
  };
  
  const renderFeedContent = () => {
    switch (activeRole) {
      case "investor":
        return <InvestorFeed items={mockFeedItems.investor} />;
      case "msme":
        return <StartupFeed items={mockFeedItems.msme} />; // Assuming StartupFeed is general enough for MSME
      // case "company": // Removed as "company" role no longer exists
      //   return <CompanyFeed items={mockFeedItems.company} />;
      case "fundes":
        // For now, let's reuse StartupFeed or make a placeholder for Fundes feed.
        // If a specific FundesFeed component exists, use that.
        // For simplicity, reusing StartupFeed with Fundes data.
        return <StartupFeed items={mockFeedItems.fundes} />; 
      default: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = activeRole;
        return <p>No feed available for this role.</p>;
      }
    }
  };

  return (
    <DashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle={getPageTitle(activeRole)}
    >
      <div className="container mx-auto py-8">
        {renderFeedContent()}
      </div>
    </DashboardLayout>
  );
};

export default Feed;
