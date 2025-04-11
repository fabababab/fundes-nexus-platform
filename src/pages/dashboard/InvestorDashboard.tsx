
import React from "react";
import { BarChart4, Briefcase, Calendar, PiggyBank, Search, Settings, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";

interface InvestorDashboardProps {
  activeRole: "company" | "startup" | "investor";
  onRoleChange: (role: "company" | "startup" | "investor") => void;
}

const InvestorDashboard: React.FC<InvestorDashboardProps> = ({ activeRole, onRoleChange }) => {
  const menuItems = [
    { title: "Dashboard", icon: PiggyBank, url: "/dashboard" },
    { title: "Discover Startups", icon: Search, url: "#" },
    { title: "Portfolio", icon: Briefcase, url: "#", notifications: "1" },
    { title: "Performance", icon: BarChart4, url: "#" },
    { title: "Watchlist", icon: Star, url: "#" },
    { title: "Events", icon: Calendar, url: "/events", notifications: "2" },
    { title: "Settings", icon: Settings, url: "#" },
  ];

  return (
    <DashboardLayout 
      menuItems={menuItems} 
      activeRole={activeRole} 
      onRoleChange={onRoleChange}
      pageTitle="Investor Dashboard"
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2.42M</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Investments</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">2 new this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Watchlist</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">8 high priority</p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default InvestorDashboard;
