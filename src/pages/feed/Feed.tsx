
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CompanyFeed from "../../components/feed/CompanyFeed";
import StartupFeed from "../../components/feed/StartupFeed";
import InvestorFeed from "../../components/feed/InvestorFeed";
import DashboardLayout from "../../components/layout/DashboardLayoutRefactored";
import { UserRole } from "@/types/common";

const Feed = () => {
  const [activeRole, setActiveRole] = useState<UserRole>("investor");

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
  };

  return (
    <DashboardLayout activeRole={activeRole} onRoleChange={handleRoleChange} pageTitle="Feed">
      <Tabs defaultValue="for-you" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="for-you">For You</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="for-you">
          {activeRole === "company" ? (
            <CompanyFeed />
          ) : activeRole === "startup" ? (
            <StartupFeed />
          ) : (
            <InvestorFeed />
          )}
        </TabsContent>
        
        <TabsContent value="following">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 p-3">
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17 6.1H3" />
                <path d="M21 12.1H3" />
                <path d="M15.1 18H3" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium">Your Following Feed</h3>
            <p className="mt-2 text-center text-gray-500">
              Content from accounts you follow will appear here.
            </p>
          </div>
        </TabsContent>
        
        <TabsContent value="trending">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 p-3">
              <svg
                className="h-6 w-6 text-gray-500"
                fill="none"
                height="24"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-medium">Trending Content</h3>
            <p className="mt-2 text-center text-gray-500">
              Popular discussions and trending topics will appear here.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default Feed;
