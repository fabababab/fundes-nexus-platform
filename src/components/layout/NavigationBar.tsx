
import React from "react";

interface NavigationBarProps {
  activeRole: "company" | "startup" | "investor";
}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  // Return empty div - effectively removing the navbar
  return null;
};

export default NavigationBar;
