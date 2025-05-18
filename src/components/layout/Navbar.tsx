import React, { useState } from "react";
import { Link } from "react-router-dom";
import { UserRole } from "@/types/common";
import { MessageSquare, Rss, Calendar, User, Database, BarChart4, Menu, Grid3X3 } from "lucide-react";
import { AppsMenu } from "./AppsMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/contexts/ThemeContext";

interface NavbarProps {
  activeRole: UserRole;
  pageTitle: string;
  onRoleChange: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activeRole, 
  pageTitle,
  onRoleChange
}) => {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { updateThemeFromRole } = useTheme();
  
  // Update theme when role changes
  React.useEffect(() => {
    updateThemeFromRole(activeRole);
  }, [activeRole, updateThemeFromRole]);
  
  // Helper function to get role-specific routes
  const getRoleSpecificRoute = (baseRoute: string): string => {
    if (activeRole === "msme") {
      return `/msme${baseRoute}`;
    } else if (activeRole === "fundes") {
      return `/fundes${baseRoute}`;
    }
    return baseRoute;
  };

  // Define nav items to avoid repetition
  const navItems = [
    {
      icon: <Rss className="h-5 w-5 text-navy-blue" />,
      route: getRoleSpecificRoute("/feed"),
      badge: 4,
      badgeColor: "bg-green-500",
      label: "Feed"
    },
    {
      icon: <MessageSquare className="h-5 w-5 text-navy-blue" />,
      route: getRoleSpecificRoute("/messages"),
      badge: 2,
      badgeColor: "bg-red-500",
      label: "Messages"
    },
    {
      icon: <Calendar className="h-5 w-5 text-navy-blue" />,
      route: getRoleSpecificRoute("/events"),
      badge: 3,
      badgeColor: "bg-red-500",
      label: "Events"
    }
  ];

  // Fundes specific nav items
  const fundesItems = activeRole === "fundes" ? [
    {
      icon: <BarChart4 className="h-5 w-5 text-navy-blue" />,
      route: "/fundes/user-statistics",
      label: "User Stats"
    },
    {
      icon: <Database className="h-5 w-5 text-navy-blue" />,
      route: "/fundes/msme-database",
      label: "MSME DB"
    }
  ] : [];

  // Combine all items
  const allNavItems = [...navItems, ...fundesItems];

  // Render desktop nav item
  const renderNavItem = (item: typeof navItems[0], index: number) => (
    <Link to={item.route} className="relative p-2 hover:bg-gray-100 rounded-full" key={index}>
      {item.icon}
      {item.badge && (
        <span className={`absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full ${item.badgeColor} text-xs text-white`}>
          {item.badge}
        </span>
      )}
    </Link>
  );

  // Render mobile nav item with labels
  const renderMobileNavItem = (item: typeof navItems[0], index: number) => (
    <Link to={item.route} className="flex items-center p-3 hover:bg-gray-100 rounded-md" key={index}>
      <div className="relative mr-3">
        {item.icon}
        {item.badge && (
          <span className={`absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full ${item.badgeColor} text-xs text-white`}>
            {item.badge}
          </span>
        )}
      </div>
      <span className="text-navy-blue">{item.label}</span>
    </Link>
  );

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="flex items-center">
          <h1 className="navbar-brand">{pageTitle}</h1>
        </div>
        
        {/* Mobile view - hamburger menu and apps grid button */}
        {isMobile ? (
          <div className="flex items-center space-x-2">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Menu className="h-5 w-5 text-navy-blue" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[80%] pt-10">
                <div className="flex flex-col space-y-1">
                  {allNavItems.map(renderMobileNavItem)}
                </div>
                <div className="mt-6">
                  <AppsMenu activeRole={activeRole} onRoleChange={(role) => {
                    onRoleChange(role);
                    updateThemeFromRole(role);
                  }} isMobileSidebar={true} />
                </div>
              </SheetContent>
            </Sheet>
            
            {/* App grid menu button */}
            <button className="p-2 hover:bg-gray-100 rounded-full" onClick={() => setSidebarOpen(true)}>
              <Grid3X3 className="h-5 w-5 text-navy-blue" />
            </button>
            
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="h-5 w-5 text-navy-blue" />
            </button>
          </div>
        ) : (
          /* Desktop view - full navbar */
          <div className="navbar-items">
            {allNavItems.map(renderNavItem)}
            
            <div className="flex items-center ml-2">
              <AppsMenu activeRole={activeRole} onRoleChange={(role) => {
                onRoleChange(role);
                updateThemeFromRole(role);
              }} />
              
              <button className="ml-2 p-2 hover:bg-gray-100 rounded-full">
                <User className="h-5 w-5 text-navy-blue" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
