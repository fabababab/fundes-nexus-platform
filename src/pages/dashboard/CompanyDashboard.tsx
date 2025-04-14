import React from "react";
import { BarChart4, Building2, CircleDot, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CompanyFeed from "@/components/feed/CompanyFeed";

interface CompanyDashboardProps {
  activeRole: "company" | "startup" | "investor";
  onRoleChange: (role: "company" | "startup" | "investor") => void;
}

const CompanyDashboard: React.FC<CompanyDashboardProps> = ({ activeRole, onRoleChange }) => {
  return (
    <div className="space-y-6">
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
            <CardTitle className="text-sm font-medium">Goal Completion</CardTitle>
            <CircleDot className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">+4% from last month</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-6">
        <h2 className="text-2xl font-semibold mb-4">Your Feed</h2>
        <CompanyFeed />
      </div>
    </div>
  );
};

export default CompanyDashboard;
