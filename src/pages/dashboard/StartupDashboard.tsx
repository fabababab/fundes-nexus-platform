
import React from "react";
import { Briefcase, GraduationCap, Lightbulb, MessageSquare, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StartupDashboardProps {
  activeRole: "company" | "startup" | "investor";
  onRoleChange: (role: "company" | "startup" | "investor") => void;
}

const StartupDashboard: React.FC<StartupDashboardProps> = ({ activeRole, onRoleChange }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Funding Progress</CardTitle>
          <Lightbulb className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$120,000</div>
          <p className="text-xs text-muted-foreground">$200,000 goal</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
          <GraduationCap className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">65%</div>
          <p className="text-xs text-muted-foreground">2 courses in progress</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Community Engagement</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">28</div>
          <p className="text-xs text-muted-foreground">Active discussions</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StartupDashboard;
