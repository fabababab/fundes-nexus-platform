
import React from "react";
import NavigationBar from "./NavigationBar";
import { 
  SidebarProvider,
  Sidebar, 
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import UserSwitcher from "../common/UserSwitcher";
import {
  PiggyBank,
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
  File
} from "lucide-react";

interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  menuItems?: any[];
  activeRole: "company" | "startup" | "investor";
  onRoleChange: (role: "company" | "startup" | "investor") => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  className = '',
  activeRole,
  onRoleChange,
  ...props
}: DashboardLayoutProps) => {
  
  // Role-specific navigation items
  const investorNavItems = [
    { title: "Dashboard", icon: PiggyBank, href: "/dashboard", badge: "" },
    { title: "Discover Startups", icon: Search, href: "#", badge: "" },
    { title: "Portfolio", icon: Briefcase, href: "#", badge: "1" },
    { title: "Performance", icon: BarChart4, href: "#", badge: "" },
    { title: "Watchlist", icon: Star, href: "#", badge: "" },
    { title: "Events", icon: Calendar, href: "/events", badge: "2" },
    { title: "Settings", icon: Settings, href: "#", badge: "" },
  ];

  const startupNavItems = [
    { title: "Dashboard", icon: Briefcase, href: "/dashboard", badge: "" },
    { title: "Learning Journey", icon: GraduationCap, href: "/learning-journey", badge: "2" },
    { title: "Mentoring", icon: Users, href: "#", badge: "" },
    { title: "Community", icon: MessageSquare, href: "#", badge: "5" },
    { title: "Funding", icon: Lightbulb, href: "#", badge: "" },
    { title: "Goals", icon: Target, href: "#", badge: "" },
    { title: "Resources", icon: FileText, href: "#", badge: "" },
    { title: "Settings", icon: Settings, href: "#", badge: "" },
  ];

  const companyNavItems = [
    { title: "Dashboard", icon: Building2, href: "/dashboard", badge: "" },
    { title: "Impact Analytics", icon: BarChartHorizontal, href: "#", badge: "2" },
    { title: "Partnerships", icon: Users, href: "#", badge: "" },
    { title: "CSR Goals", icon: CircleDot, href: "#", badge: "" },
    { title: "Events", icon: Calendar, href: "/events", badge: "1" },
    { title: "Startups", icon: Briefcase, href: "#", badge: "" },
    { title: "Settings", icon: Settings, href: "#", badge: "" },
  ];

  // Get the appropriate navigation items based on active role
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

  const getRoleIcon = () => {
    switch (activeRole) {
      case "investor":
        return <PiggyBank className="h-5 w-5 mr-2" />;
      case "startup":
        return <Briefcase className="h-5 w-5 mr-2" />;
      case "company":
        return <Building2 className="h-5 w-5 mr-2" />;
      default:
        return <PiggyBank className="h-5 w-5 mr-2" />;
    }
  };
  
  const getRoleLabel = () => {
    switch (activeRole) {
      case "investor":
        return "Investor View";
      case "startup":
        return "Startup View";
      case "company":
        return "Company View";
      default:
        return "Investor View";
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <div className="p-4">
              <UserSwitcher activeRole={activeRole} onRoleChange={onRoleChange} />
            </div>
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 text-gray-500 text-sm">Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {getNavItems().map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a href={item.href} className="relative flex items-center">
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
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <NavigationBar activeRole={activeRole} />
          <main className={`flex-1 p-6 ${className}`} {...props}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
