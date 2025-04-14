
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import StartupFeed from "@/components/feed/StartupFeed";
import InvestorFeed from "@/components/feed/InvestorFeed";
import CompanyFeed from "@/components/feed/CompanyFeed";

const Feed = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor">("investor");

  return (
    <DashboardLayout 
      activeRole={activeRole} 
      onRoleChange={setActiveRole}
      pageTitle="Feeds"
    >
      <div className="h-[calc(100vh-120px)] overflow-hidden rounded-md border">
        <Tabs defaultValue="investor" className="w-full h-full flex flex-col">
          <TabsList className="w-full">
            <TabsTrigger value="investor" className="flex-1">Investor Feed</TabsTrigger>
            <TabsTrigger value="company" className="flex-1">Company Feed</TabsTrigger>
            <TabsTrigger value="startup" className="flex-1">Startup Feed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="investor" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <InvestorFeed />
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="company" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <CompanyFeed />
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="startup" className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <StartupFeed />
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Feed;
