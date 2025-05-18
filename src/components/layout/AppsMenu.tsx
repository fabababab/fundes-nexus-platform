
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserRole } from "@/types/common";
import { 
  GraduationCap, 
  MessageSquare, 
  FileText, 
  Bot, 
  Calendar, 
  MessageSquareText, 
  Rss, 
  Target, 
  BarChart4,
  Users,
  Lightbulb,
  Search,
  PiggyBank,
  Briefcase,
  Grid3X3
} from "lucide-react";
import { Link } from "react-router-dom";

interface AppsMenuProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

interface AppIcon {
  name: string;
  icon: React.ElementType;
  path: string;
  color: string;
}

export const AppsMenu: React.FC<AppsMenuProps> = ({ 
  activeRole,
  onRoleChange
}) => {
  const msmeApps: AppIcon[] = [
    { name: "Feed", icon: Rss, path: "/msme/feed", color: "text-bright-blue" },
    { name: "Learning", icon: GraduationCap, path: "/msme/learning-modules", color: "text-green-500" },
    { name: "Community", icon: MessageSquare, path: "/msme/community", color: "text-purple-500" },
    { name: "Projects", icon: FileText, path: "/msme/project-overview", color: "text-orange-500" },
    { name: "Assistant", icon: Bot, path: "/msme/chatbot", color: "text-blue-400" },
    { name: "Events", icon: Calendar, path: "/msme/events", color: "text-red-500" },
    { name: "Messages", icon: MessageSquareText, path: "/msme/messages", color: "text-green-600" },
  ];
  
  const fundesApps: AppIcon[] = [
    { name: "Feed", icon: Rss, path: "/fundes/feed", color: "text-bright-blue" },
    { name: "Dashboard", icon: Target, path: "/fundes", color: "text-purple-600" },
    { name: "Analytics", icon: BarChart4, path: "/analytics", color: "text-green-600" },
    { name: "Network", icon: Users, path: "/network", color: "text-navy-blue" },
    { name: "Initiatives", icon: Lightbulb, path: "/investments", color: "text-yellow-600" },
    { name: "Communications", icon: MessageSquareText, path: "/fundes/communications", color: "text-indigo-500" },
    { name: "Events", icon: Calendar, path: "/fundes/events", color: "text-red-500" },
    { name: "Messages", icon: MessageSquare, path: "/fundes/messages", color: "text-blue-500" },
  ];
  
  const investorApps: AppIcon[] = [
    { name: "Dashboard", icon: PiggyBank, path: "/dashboard", color: "text-green-600" },
    { name: "Projects", icon: Search, path: "/discover-projects", color: "text-bright-blue" },
    { name: "Portfolio", icon: Briefcase, path: "/portfolio", color: "text-navy-blue" },
    { name: "Analytics", icon: BarChart4, path: "/analytics", color: "text-purple-600" },
  ];

  // Role switcher options
  const roleOptions = [
    { id: "msme" as UserRole, name: "MSME View", icon: Briefcase, color: "text-navy-blue bg-pale-blue" },
    { id: "fundes" as UserRole, name: "Fundes View", icon: Target, color: "text-green-700 bg-green-100" },
    { id: "investor" as UserRole, name: "Donor View", icon: PiggyBank, color: "text-purple-700 bg-purple-100" },
  ];
  
  const getApps = () => {
    switch (activeRole) {
      case "msme": return msmeApps;
      case "fundes": return fundesApps;
      case "investor": return investorApps;
      default: return msmeApps;
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Grid3X3 className="h-5 w-5 text-navy-blue" />
        </button>
      </DialogTrigger>
      <DialogContent className="apps-modal sm:max-w-[480px]">
        {/* Apps Grid */}
        <div className="apps-grid">
          {getApps().map((app) => (
            <Link key={app.name} to={app.path} className="app-icon">
              <div className={`app-icon-image rounded-full bg-gray-100 flex items-center justify-center`}>
                <app.icon className={`h-6 w-6 ${app.color}`} />
              </div>
              <span className="app-icon-label">{app.name}</span>
            </Link>
          ))}
        </div>
        
        {/* Divider */}
        <div className="my-6 border-t border-gray-200"></div>
        
        {/* View Switcher */}
        <div className="grid gap-3">
          <h3 className="text-sm font-medium text-gray-500">Switch View</h3>
          <div className="grid gap-2">
            {roleOptions.map((role) => (
              <button
                key={role.id}
                className={`flex items-center p-2 rounded-md ${activeRole === role.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                onClick={() => onRoleChange(role.id)}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${role.color}`}>
                  <role.icon className="h-4 w-4" />
                </div>
                <span className="ml-3 text-sm font-medium">{role.name}</span>
              </button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppsMenu;
