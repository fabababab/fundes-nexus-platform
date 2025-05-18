
import React from "react";
import { UserRole } from "@/types/common";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import Navbar from "./Navbar";

interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  pageTitle: string;
}

export const SimpleDashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  className = '',
  activeRole,
  onRoleChange,
  pageTitle,
  ...props
}: DashboardLayoutProps) => {
  const navigate = useNavigate();
  
  const handleRoleChange = (newRole: UserRole) => {
    onRoleChange(newRole);
    
    // Navigate to the appropriate page when role changes
    switch (newRole) {
      case "msme":
        navigate("/msme/feed");
        break;
      case "fundes":
        navigate("/fundes/feed");
        break;
      case "investor":
        navigate("/dashboard");
        break;
      default:
        navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <Navbar 
        activeRole={activeRole}
        pageTitle={pageTitle}
        onRoleChange={handleRoleChange}
      />
      
      <main className={cn("flex-1 p-6 app-container", className)} {...props}>
        {children}
      </main>
    </div>
  );
};

export default SimpleDashboardLayout;
