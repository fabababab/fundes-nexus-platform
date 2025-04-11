
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Building2, Briefcase, PiggyBank, ChevronDown } from "lucide-react";

interface UserSwitcherProps {
  activeRole: "company" | "startup" | "investor";
  onRoleChange: (role: "company" | "startup" | "investor") => void;
}

const UserSwitcher = ({ activeRole, onRoleChange }: UserSwitcherProps) => {
  const roles = [
    {
      id: "company",
      name: "Company",
      icon: <Building2 className="mr-2 h-4 w-4" />,
    },
    {
      id: "startup",
      name: "Startup",
      icon: <Briefcase className="mr-2 h-4 w-4" />,
    },
    {
      id: "investor",
      name: "Investor",
      icon: <PiggyBank className="mr-2 h-4 w-4" />,
    },
  ];

  const activeRoleData = roles.find((role) => role.id === activeRole);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="w-full justify-between"
        >
          <div className="flex items-center">
            {activeRoleData?.icon}
            <span>{activeRoleData?.name} View</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Switch perspective</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {roles.map((role) => (
          <DropdownMenuItem
            key={role.id}
            onClick={() => onRoleChange(role.id as "company" | "startup" | "investor")}
            className={activeRole === role.id ? "bg-accent" : ""}
          >
            <div className="flex items-center">
              {role.icon}
              {role.name}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserSwitcher;
