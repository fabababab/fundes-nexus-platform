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
  PiggyBank,
  Calendar,
  Rss,
  Bot,
  MessageSquareText,
  CalendarDays,
  ListTodo
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
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
  menuItems: inheritedMenuItems,
  ...props
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
  
  const fundesNavItems = [
    { title: "Dashboard", icon: Target, href: "/fundes", badge: "" },
    { title: "Ecosystem Insights", icon: BarChart4, href: "/analytics", badge: "2" },
    { title: "Stakeholder Network", icon: Users, href: "/network", badge: "" },
    { title: "Strategic Initiatives", icon: Lightbulb, href: "/investments", badge: "" },
    { title: "Communications Hub", icon: MessageSquareText, href: "/fundes/communications", badge: "3" },
    { title: "Events Calendar", icon: CalendarDays, href: "/fundes/events", badge: "2" },
    { title: "Task Management", icon: ListTodo, href: "/fundes/tasks", badge: "4" },
    { title: "Feed", icon: Rss, href: "/fundes/feed", badge: "3" },
    { title: "Messages", icon: MessageSquare, href: "/fundes/messages", badge: "2" }
  ];

  const investorNavItems = [
    { title: "Dashboard", icon: PiggyBank, href: "/dashboard", badge: "" },
    { title: "Discover Projects", icon: Search, href: "/discover-projects", badge: "" },
    { title: "Portfolio", icon: Briefcase, href: "/portfolio", badge: "1" },
    { title: "Performance", icon: BarChart4, href: "/analytics", badge: "" },
  ];

  // Updated MSME nav items to use MSME-specific routes
  const msmeNavItems = [
    { title: "Dashboard", icon: Target, href: "/msme", badge: "" },
    { title: "Learning Modules", icon: GraduationCap, href: "/msme/learning-modules", badge: "2" },
    { title: "Community Hub", icon: MessageSquare, href: "/msme/community", badge: "5" },
    { title: "Project Overview", icon: FileText, href: "/msme/project-overview", badge: "" },
    { title: "AI Assistant", icon: Bot, href: "/msme/chatbot", badge: "" },
    { title: "Feed", icon: Rss, href: "/msme/feed", badge: "3" },
    { title: "Events", icon: Calendar, href: "/msme/events", badge: "4" },
    { title: "Messages", icon: MessageSquareText, href: "/msme/messages", badge: "2" },
  ];

  const getNavItems = () => {
    switch (activeRole) {
      case "investor":
        return investorNavItems;
      case "msme":
        return msmeNavItems;
      case "fundes":
        return fundesNavItems;
      default:
        return investorNavItems; 
    }
  };

  const handleRoleChange = (newRole: UserRole) => {
    onRoleChange(newRole);
    
    // Navigate to the appropriate dashboard when role changes
    switch (newRole) {
      case "msme":
        navigate("/msme");
        break;
      case "fundes":
        navigate("/fundes");
        break;
      case "investor":
        navigate("/dashboard");
        break;
      default:
        navigate("/dashboard");
    }
  };

  const getRoleAccentColor = () => {
    switch (activeRole) {
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

  const currentNavItems = inheritedMenuItems && inheritedMenuItems.length > 0 ? inheritedMenuItems : getNavItems();

  // Helper function to get role-specific routes for header icons
  const getRoleSpecificRoute = (baseRoute: string): string => {
    if (activeRole === "msme") {
      return `/msme${baseRoute}`;
    } else if (activeRole === "fundes") {
      return `/fundes${baseRoute}`;
    }
    return baseRoute;
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
                  {currentNavItems.map((item: any) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <Link to={item.href || '#'} className="relative flex items-center">
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
              
              <Link to={getRoleSpecificRoute("/messages")} className="relative rounded-full p-2 hover:bg-gray-100">
                <MessageSquare className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  2
                </span>
              </Link>
              <Link to={getRoleSpecificRoute("/feed")} className="relative rounded-full p-2 hover:bg-gray-100">
                <Rss className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-xs text-white">
                  4
                </span>
              </Link>
              <Link to={getRoleSpecificRoute("/events")} className="relative rounded-full p-2 hover:bg-gray-100">
                <Calendar className="h-5 w-5 text-gray-500" />
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  3
                </span>
              </Link>
              <RoleSwitcherModal activeRole={activeRole} onRoleChange={handleRoleChange} />
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
