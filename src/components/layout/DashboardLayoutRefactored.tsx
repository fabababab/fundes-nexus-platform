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
  Calendar,
  Rss,
  Bot,
  MessageSquareText,
  CalendarDays,
  ListTodo,
  Feed
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { UserRole } from "@/types/common";

interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  menuItems?: any[];
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
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
  
  const fundesNavItems = [
    { title: "Dashboard", icon: Target, href: "/fundes", badge: "" },
    { title: "Ecosystem Insights", icon: BarChart4, href: "/analytics", badge: "2" },
    { title: "Stakeholder Network", icon: Users, href: "/network", badge: "" },
    { title: "Strategic Initiatives", icon: Lightbulb, href: "/investments", badge: "" },
    { title: "Community", icon: MessageSquare, href: "/community", badge: "5" },
    { title: "Communications Hub", icon: MessageSquareText, href: "/fundes/communications", badge: "3" },
    { title: "Events Calendar", icon: CalendarDays, href: "/fundes/events", badge: "2" },
    { title: "Task Management", icon: ListTodo, href: "/fundes/tasks", badge: "4" }
  ];

  const investorNavItems = [
    { title: "Dashboard", icon: PiggyBank, href: "/dashboard", badge: "" },
    { title: "Discover Startups", icon: Search, href: "/discover-startups", badge: "" },
    { title: "Portfolio", icon: Briefcase, href: "/portfolio", badge: "1" },
    { title: "Performance", icon: BarChart4, href: "/analytics", badge: "" },
    { title: "AI Assistant", icon: Bot, href: "/chatbot", badge: "" },
  ];

  const msmeNavItems = [
    { title: "News Feed", icon: Feed, href: "/feed", badge: "" },
    { title: "Learning Modules", icon: GraduationCap, href: "/learning-journey", badge: "2" },
    { title: "Community Hub", icon: MessageSquare, href: "/community", badge: "5" },
    { title: "Project Overview", icon: FileText, href: "/msme/project-overview", badge: "" },
    { title: "AI Assistant", icon: Bot, href: "/chatbot", badge: "" },
  ];

  const companyNavItems = [
    { title: "Dashboard", icon: Building2, href: "/dashboard", badge: "" },
    { title: "Impact Analytics", icon: BarChartHorizontal, href: "/analytics", badge: "2" },
    { title: "Partnerships", icon: Users, href: "/network", badge: "" },
    { title: "CSR Goals", icon: CircleDot, href: "/documents", badge: "" },
    { title: "MSMEs", icon: Briefcase, href: "/discover-startups", badge: "" },
  ];

  const getNavItems = () => {
    switch (activeRole) {
      case "investor":
        return investorNavItems;
      case "msme":
        return msmeNavItems;
      case "company":
        return companyNavItems;
      case "fundes":
        return fundesNavItems;
      default:
        return investorNavItems;
    }
  };

  const getRoleAccentColor = () => {
    switch (activeRole) {
      case "company":
        return "border-b-[#0EA5E9]";
      case "msme":
        return "border-b-[#F2FCE2]";
      case "investor":
        return "border-b-[#9b87f5]";
      case "fundes":
        return "border-b-[#10b981]";
      default:
        return "";
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              {activeRole === "msme" ? (
                <Link to="/feed" className="block px-4 py-3">
                  {/* Placeholder Fundeo Logo - consider uploading a proper logo asset */}
                  <img 
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
                    alt="Fundeo Logo" 
                    className="h-10 w-auto" 
                  />
                </Link>
              ) : (
                <SidebarGroupLabel className="px-4 text-gray-500 text-sm">Navigation</SidebarGroupLabel>
              )}
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

        <div className="flex flex-1 flex-col">
          <header className={cn(
            "h-16 border-b border-gray-200 bg-white flex items-center px-6",
            "border-b-4",
            getRoleAccentColor()
          )}>
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
              <Link to="/feed" className="relative rounded-full p-2 hover:bg-gray-100">
                <Rss className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  4
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
