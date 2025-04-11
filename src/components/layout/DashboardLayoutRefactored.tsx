
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
  Bell,
  User
} from "lucide-react";

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
                      <SidebarMenuButton asChild tooltip={item.title}>
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
            
            {/* User actions */}
            <div className="mt-auto p-4 flex flex-col gap-2">
              <div className="flex items-center space-x-3 mb-4">
                <button className="relative rounded-full p-2 hover:bg-gray-100">
                  <MessageSquare className="h-5 w-5 text-gray-500" />
                  <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    2
                  </span>
                </button>
                <button className="relative rounded-full p-2 hover:bg-gray-100">
                  <Bell className="h-5 w-5 text-gray-500" />
                  <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                    3
                  </span>
                </button>
                <button className="rounded-full p-2 hover:bg-gray-100">
                  <User className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>

        <div className="flex flex-col flex-1">
          <main className={`flex-1 p-6 ${className}`} {...props}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
