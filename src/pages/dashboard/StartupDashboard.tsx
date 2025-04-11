
import React from "react";
import { Briefcase, GraduationCap, Lightbulb, MessageSquare, Settings, Target, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";

interface StartupDashboardProps {
  activeRole: "company" | "startup" | "investor";
  onRoleChange: (role: "company" | "startup" | "investor") => void;
}

const StartupDashboard: React.FC<StartupDashboardProps> = ({ activeRole, onRoleChange }) => {
  const menuItems = [
    { title: "Dashboard", icon: Briefcase, url: "/dashboard" },
    { title: "Learning Journey", icon: GraduationCap, url: "/learning-journey", notifications: "2" },
    { title: "Mentoring", icon: Users, url: "#" },
    { title: "Community", icon: MessageSquare, url: "#", notifications: "5" },
    { title: "Funding", icon: Lightbulb, url: "#" },
    { title: "Goals", icon: Target, url: "#" },
    { title: "Settings", icon: Settings, url: "#" },
  ];

  return (
    <DashboardLayout 
      menuItems={menuItems} 
      activeRole={activeRole} 
      onRoleChange={onRoleChange}
      pageTitle="Startup Dashboard"
    >
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
    </DashboardLayout>
  );
};

export default StartupDashboard;
