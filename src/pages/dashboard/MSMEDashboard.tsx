
import React from "react";
import { 
  BarChart4, 
  Users, 
  Target,
  // BookOpen, // Icon for Partner Intranet (removed)
  // Globe, // Icon for Social Impact (removed)
  // FileCheck, // Not used
  // Search, // Icon for Partner Discovery (removed)
  Bot,
  MessageSquare,
  Folder
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MSMEChatbot from "./components/MSMEChatbot";
// import { UserRole } from "@/types/common"; // UserRole no longer needed here

// Props are no longer needed as this dashboard is now MSME-specific
// interface MSMEDashboardProps {
//   activeRole: UserRole;
//   onRoleChange: (role: UserRole) => void;
// }

const MSMEDashboard: React.FC = () => {
  const dashboardTitle = "MSME Dashboard";
  // const baseRoute = "/msme"; // No longer needed for complex routing, direct links used

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{dashboardTitle}</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="default" className="flex gap-2">
              <Bot className="h-5 w-5" />
              Get Support
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] h-[600px]">
            <MSMEChatbot />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
            <BarChart4 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85/100</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Partnerships</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 partnerships this quarter</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">ESG Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">On track for Q2 targets</p>
          </CardContent>
        </Card>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">MSME Features</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Project Overview</CardTitle>
            <Folder className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              View active FUNDES projects, apply to participate, or recommend other MSMEs.
            </p>
            <Button asChild className="w-full mt-2">
              <Link to="/msme/project-overview">View Projects</Link>
            </Button>
          </CardContent>
        </Card>

        {/* ESG Goals Dashboard card for Company role was here, removed as Company pages are deleted */}

        {/* Partner Intranet card removed as CompanyIntranet.tsx is deleted */}
        {/* 
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Partner Intranet</CardTitle>
            <BookOpen className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Share information and educational content with your suppliers and distributors.
            </p>
            <Button asChild className="w-full mt-2">
              <Link to="/msme/intranet">Access Intranet</Link>
            </Button>
          </CardContent>
        </Card> 
        */}

        {/* Partner Discovery card removed as CompanyPartnerDiscovery.tsx is deleted */}
        {/*
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Partner Discovery</CardTitle>
            <Search className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Browse and vet potential suppliers or distributors aligned with your ESG goals.
            </p>
            <Button asChild className="w-full mt-2">
              <Link to="/msme/partners">Discover Partners</Link>
            </Button>
          </CardContent>
        </Card>
        */}

        {/* Social Impact card removed as CompanySocialImpact.tsx is deleted */}
        {/*
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Social Impact</CardTitle>
            <Globe className="h-5 w-5 text-amber-600" />
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Discover and fund social impact initiatives aligned with your corporate values.
            </p>
            <Button asChild className="w-full mt-2">
              <Link to="/msme/impact">View Initiatives</Link>
            </Button>
          </CardContent>
        </Card>
        */}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium">Project Community</CardTitle>
            <MessageSquare className="h-5 w-5 text-cyan-600" />
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Connect and collaborate with other MSMEs on shared projects and initiatives.
            </p>
            <Button asChild className="w-full mt-2">
              <Link to="/community">Join Community</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MSMEDashboard;
