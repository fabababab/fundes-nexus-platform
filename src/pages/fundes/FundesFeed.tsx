
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { UserRole } from "@/types/common";
import FeedItem from "@/components/feed/FeedItem";

const FundesFeed: React.FC = () => {
  // Fundes role is fixed for this page
  const [activeRole] = useState<UserRole>("fundes");
  const handleRoleChange = (role: UserRole) => {
    // In a real app, this might navigate or change global state
    console.log("Role change attempt to:", role);
  };

  const fundesFeedItems = [
    {
      id: "1",
      title: "New MSME Partner Onboarded",
      content: "Green Solutions Inc. has successfully joined our sustainability initiative program.",
      type: "Update",
      date: "3 hours ago",
      category: "Partnerships",
      author: {
        name: "Partnership Team",
        title: "Program Coordinator",
        avatar: "/placeholder.svg"
      },
      likes: 12,
      comments: 3
    },
    {
      id: "2",
      title: "Impact Assessment Results",
      content: "The Q2 impact assessment shows a 27% increase in sustainability adoption among MSMEs in the program.",
      type: "Report",
      date: "Yesterday",
      category: "Impact",
      author: {
        name: "Analytics Department",
        title: "Impact Analyst",
        avatar: "/placeholder.svg"
      },
      likes: 31,
      comments: 8
    },
    {
      id: "3",
      title: "New Funding Opportunity",
      content: "The Global Sustainability Fund has opened applications for the next round of green initiative funding.",
      type: "Opportunity",
      date: "2 days ago",
      category: "Funding",
      author: {
        name: "Finance Team",
        title: "Grant Specialist",
        avatar: "/placeholder.svg"
      },
      likes: 45,
      comments: 11
    },
    {
      id: "4",
      title: "Stakeholder Meeting Summary",
      content: "Key takeaways from yesterday's stakeholder alignment meeting on the regional expansion strategy.",
      type: "Meeting",
      date: "3 days ago",
      category: "Internal",
      author: {
        name: "Executive Office",
        title: "Chief Strategy Officer",
        avatar: "/placeholder.svg"
      },
      likes: 27,
      comments: 15
    }
  ];

  return (
    <DashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="Fundes Feed"
    >
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-dark-purple">Fundes Organization Feed</h1>
        <p className="text-lg text-neutral-gray mb-8">
          Stay updated with the latest initiatives, impact reports, and program developments.
        </p>
        
        <div className="space-y-6">
          {fundesFeedItems.map((item) => (
            <FeedItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FundesFeed;
