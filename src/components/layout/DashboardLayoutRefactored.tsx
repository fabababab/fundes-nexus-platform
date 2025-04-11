
import React from "react";

interface DashboardLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  menuItems?: any[];
  activeRole: "company" | "startup" | "investor";
  onRoleChange: (role: "company" | "startup" | "investor") => void;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children,
  className = '',
  ...props
}: DashboardLayoutProps) => {
  // Simply render the children without any navigation elements
  return (
    <div className="flex min-h-screen w-full">
      <div className={`flex flex-col flex-1 w-full ${className}`} {...props}>
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
