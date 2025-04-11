
import React from "react";

interface NavigationBarProps {
  activeRole: "company" | "startup" | "investor";
}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  // This component is now empty as navigation is handled in the DashboardLayout
  return null;
};

export default NavigationBar;
