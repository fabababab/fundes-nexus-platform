
import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { UserRole } from "@/types/common";
import { useTheme } from "@/contexts/ThemeContext";

interface SimpleDashboardLayoutProps {
  children: ReactNode;
  activeRole: UserRole;
  pageTitle?: string;
  onRoleChange: (role: UserRole) => void;
}

export const SimpleDashboardLayout: React.FC<SimpleDashboardLayoutProps> = ({
  children,
  activeRole,
  pageTitle = "Dashboard",
  onRoleChange,
}) => {
  const { updateThemeFromRole } = useTheme();
  
  // Update theme when role changes
  React.useEffect(() => {
    updateThemeFromRole(activeRole);
  }, [activeRole, updateThemeFromRole]);

  return (
    <div className="min-h-screen">
      <Navbar
        activeRole={activeRole}
        pageTitle={pageTitle}
        onRoleChange={onRoleChange}
      />
      <main className="app-container py-4">
        {children}
      </main>
    </div>
  );
};
