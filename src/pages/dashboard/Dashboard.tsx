
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import CompanyDashboard from "./CompanyDashboard";
import StartupDashboard from "./StartupDashboard";
import InvestorDashboard from "./InvestorDashboard";
import { Home, Calendar, BarChart3, Users, MessageSquare, FileText, Briefcase, Database } from "lucide-react";

interface DashboardProps {
  activeRole?: "company" | "startup" | "investor";
}

const Dashboard = ({ activeRole: initialRole = "investor" }: DashboardProps) => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor">(initialRole);

  const menuItems = [
    { title: "Dashboard", icon: Home, url: "/dashboard" },
    { title: "Events", icon: Calendar, url: "/events", notifications: 3 },
    { title: "Analytics", icon: BarChart3, url: "/analytics" },
    { title: "Network", icon: Users, url: "/network", notifications: 2 },
    { title: "Messages", icon: MessageSquare, url: "/messages", notifications: 5 },
    { title: "Documents", icon: FileText, url: "/documents" },
    { title: "Investments", icon: Briefcase, url: "/investments" },
    { title: "Database", icon: Database, url: "/database" },
  ];

  const renderDashboard = () => {
    switch (activeRole) {
      case "company":
        return <CompanyDashboard activeRole={activeRole} onRoleChange={setActiveRole} />;
      case "startup":
        return <StartupDashboard activeRole={activeRole} onRoleChange={setActiveRole} />;
      case "investor":
      default:
        return <InvestorDashboard activeRole={activeRole} onRoleChange={setActiveRole} />;
    }
  };

  return (
    <DashboardLayout 
      menuItems={menuItems} 
      activeRole={activeRole} 
      onRoleChange={setActiveRole}
    >
      {renderDashboard()}
    </DashboardLayout>
  );
};

export default Dashboard;
