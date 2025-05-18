
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { UserRole } from "@/types/common";
import { FeedItem } from "@/components/feed/FeedItem";

const MSMEFeed: React.FC = () => {
  // MSME role is fixed for this page
  const [activeRole] = useState<UserRole>("msme");
  const handleRoleChange = (role: UserRole) => {
    // In a real app, this might navigate or change global state
    console.log("Role change attempt to:", role);
  };

  const msmeFeedItems = [
    {
      id: "1",
      author: "FUNDES Organization",
      avatar: "/placeholder.svg",
      content: "New sustainable supply chain training starting next month! MSMEs can apply now.",
      timestamp: "2 hours ago",
      likes: 24,
      comments: 5,
      isVerified: true,
    },
    {
      id: "2",
      author: "Financial Literacy Program",
      avatar: "/placeholder.svg",
      content: "Learn how to overcome tax fears and open your first business bank account with our new module.",
      timestamp: "5 hours ago",
      likes: 18,
      comments: 3,
      isVerified: true,
    },
    {
      id: "3",
      author: "Coca-Cola Project",
      avatar: "/placeholder.svg",
      content: "MSMEs participating in our sustainability initiative have reduced plastic waste by 35% collectively.",
      timestamp: "1 day ago",
      likes: 42,
      comments: 12,
      isVerified: true,
    },
    {
      id: "4",
      author: "Community Spotlight",
      avatar: "/placeholder.svg",
      content: "Congratulations to Green Ventures for completing their sustainability certification!",
      timestamp: "2 days ago",
      likes: 36,
      comments: 8,
      isVerified: false,
    }
  ];

  return (
    <DashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="MSME Feed"
    >
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 text-dark-purple">MSME Community Feed</h1>
        <p className="text-lg text-neutral-gray mb-8">
          Stay updated with the latest news, opportunities, and achievements from the MSME community.
        </p>
        
        <div className="space-y-6">
          {msmeFeedItems.map((item) => (
            <FeedItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MSMEFeed;
