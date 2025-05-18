
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { UserRole } from "@/types/common";
import FeedItem from "@/components/feed/FeedItem";

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
      title: "New Training Opportunity",
      content: "New sustainable supply chain training starting next month! MSMEs can apply now.",
      type: "Event",
      date: "2 hours ago",
      category: "Training",
      author: {
        name: "FUNDES Organization",
        title: "Program Manager",
        avatar: "/placeholder.svg"
      },
      likes: 24,
      comments: 5
    },
    {
      id: "2",
      title: "Financial Literacy Program",
      content: "Learn how to overcome tax fears and open your first business bank account with our new module.",
      type: "Opportunity",
      date: "5 hours ago",
      category: "Education",
      author: {
        name: "Financial Literacy Team",
        title: "Workshop Leader",
        avatar: "/placeholder.svg"
      },
      likes: 18,
      comments: 3
    },
    {
      id: "3",
      title: "Sustainability Initiative",
      content: "MSMEs participating in our sustainability initiative have reduced plastic waste by 35% collectively.",
      type: "Article",
      date: "1 day ago",
      category: "Sustainability",
      author: {
        name: "Coca-Cola Project",
        title: "Project Lead",
        avatar: "/placeholder.svg"
      },
      likes: 42,
      comments: 12
    },
    {
      id: "4",
      title: "Community Spotlight",
      content: "Congratulations to Green Ventures for completing their sustainability certification!",
      type: "Network",
      date: "2 days ago",
      category: "Community",
      author: {
        name: "MSME Spotlight Team",
        title: "Community Manager",
        avatar: "/placeholder.svg"
      },
      likes: 36,
      comments: 8
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
