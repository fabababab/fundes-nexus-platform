import React from "react";
import { 
  SidebarProvider,
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger
} from "@/components/ui/sidebar";
import RoleSwitcherModal from "../common/RoleSwitcherModal";
import {
  Search,
  Briefcase,
  BarChart4,
  Star,
  Calendar,
  Settings,
  GraduationCap,
  Users,
  MessageSquare,
  Lightbulb,
  Target,
  FileText,
  Building2,
  BarChartHorizontal,
  CircleDot,
  PiggyBank,
} from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  menuItems?: any[];
  activeRole: "company" | "startup" | "investor";
  onRoleChange: (role: "company" | "startup" | "investor") => void;
  pageTitle: string;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  className = '',
  activeRole,
  onRoleChange,
  pageTitle,
  ...props
}: DashboardLayoutProps) => {
  
  const investorNavItems = [
    { title: "Dashboard", icon: PiggyBank, href: "/dashboard", badge: "" },
    { title: "Discover Startups", icon: Search, href: "/discover-startups", badge: "" },
    { title: "Portfolio", icon: Briefcase, href: "/portfolio", badge: "1" },
    { title: "Performance", icon: BarChart4, href: "/analytics", badge: "" },
    { title: "Watchlist", icon: Star, href: "/database", badge: "" },
    { title: "Events", icon: Calendar, href: "/events", badge: "2" },
    { title: "Settings", icon: Settings, href: "/settings", badge: "" },
  ];

  const startupNavItems = [
    { title: "Dashboard", icon: Briefcase, href: "/dashboard", badge: "" },
    { title: "Learning Journey", icon: GraduationCap, href: "/learning-journey", badge: "2" },
    { title: "Mentoring", icon: Users, href: "/network", badge: "" },
    { title: "Community", icon: MessageSquare, href: "/messages", badge: "5" },
    { title: "Funding", icon: Lightbulb, href: "/investments", badge: "" },
    { title: "Goals", icon: Target, href: "/documents", badge: "" },
    { title: "Resources", icon: FileText, href: "/database", badge: "" },
    { title: "Settings", icon: Settings, href: "/settings", badge: "" },
  ];

  const companyNavItems = [
    { title: "Dashboard", icon: Building2, href: "/dashboard", badge: "" },
    { title: "Impact Analytics", icon: BarChartHorizontal, href: "/analytics", badge: "2" },
    { title: "Partnerships", icon: Users, href: "/network", badge: "" },
    { title: "CSR Goals", icon: CircleDot, href: "/documents", badge: "" },
    { title: "Events", icon: Calendar, href: "/events", badge: "1" },
    { title: "Startups", icon: Briefcase, href: "/discover-startups", badge: "" },
    { title: "Settings", icon: Settings, href: "/settings", badge: "" },
  ];

  const getNavItems = () => {
    switch (activeRole) {
      case "investor":
        return investorNavItems;
      case "startup":
        return startupNavItems;
      case "company":
        return companyNavItems;
      default:
        return investorNavItems;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-gray-500 text-sm">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {getNavItems().map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <Link to={item.href} className="relative flex items-center">
                          <item.icon className="h-5 w-5 mr-2 text-gray-600" />
                          <span>{item.title}</span>
                          {item.badge && (
                            <span className="absolute right-0 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                              {item.badge}
                            </span>
                          )}
                          {item.title === "Learning Journey" && activeRole === "startup" && item.badge === "" && (
                            <span className="absolute right-0 bg-gray-100 text-gray-800 text-xs px-2 py-0.5 rounded">
                              New
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="h-16 border-b border-gray-200 bg-white flex items-center px-6">
            <div className="flex items-center mr-4">
              <SidebarTrigger />
            </div>
            <div className="flex-1 ml-4">
              <h1 className="text-xl font-semibold">{pageTitle}</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Link to="/messages" className="relative rounded-full p-2 hover:bg-gray-100">
                <MessageSquare className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  2
                </span>
              </Link>
              <Link to="/events" className="relative rounded-full p-2 hover:bg-gray-100">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </span>
              </Link>
              <RoleSwitcherModal activeRole={activeRole} onRoleChange={onRoleChange} />
            </div>
          </header>
          
          <main className={`flex-1 p-6 ${className}`} {...props}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
