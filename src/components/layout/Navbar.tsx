
import React from "react";
import { Link } from "react-router-dom";
import { UserRole } from "@/types/common";
import { MessageSquare, Rss, Calendar, User, Database, BarChart4 } from "lucide-react";
import { AppsMenu } from "./AppsMenu";

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
  // Helper function to get role-specific routes
  const getRoleSpecificRoute = (baseRoute: string): string => {
    if (activeRole === "msme") {
      return `/msme${baseRoute}`;
    } else if (activeRole === "fundes") {
      return `/fundes${baseRoute}`;
    }
    return baseRoute;
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <div className="flex items-center">
          <h1 className="navbar-brand">{pageTitle}</h1>
        </div>
        
        <div className="navbar-items">
          <Link to={getRoleSpecificRoute("/feed")} className="relative p-2 hover:bg-gray-100 rounded-full">
            <Rss className="h-5 w-5 text-navy-blue" />
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-green-500 text-xs text-white">
              4
            </span>
          </Link>
          
          <Link to={getRoleSpecificRoute("/messages")} className="relative p-2 hover:bg-gray-100 rounded-full">
            <MessageSquare className="h-5 w-5 text-navy-blue" />
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              2
            </span>
          </Link>
          
          <Link to={getRoleSpecificRoute("/events")} className="relative p-2 hover:bg-gray-100 rounded-full">
            <Calendar className="h-5 w-5 text-navy-blue" />
            <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
          </Link>

          {activeRole === "fundes" && (
            <>
              <Link to="/fundes/user-statistics" className="relative p-2 hover:bg-gray-100 rounded-full">
                <BarChart4 className="h-5 w-5 text-navy-blue" />
              </Link>
              
              <Link to="/fundes/msme-database" className="relative p-2 hover:bg-gray-100 rounded-full">
                <Database className="h-5 w-5 text-navy-blue" />
              </Link>
            </>
          )}
          
          <div className="flex items-center ml-2">
            <AppsMenu activeRole={activeRole} onRoleChange={onRoleChange} />
            
            <button className="ml-2 p-2 hover:bg-gray-100 rounded-full">
              <User className="h-5 w-5 text-navy-blue" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
