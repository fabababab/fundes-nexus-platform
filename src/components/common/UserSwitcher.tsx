
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
import { Building2, Briefcase, PiggyBank, ChevronDown, Target } from "lucide-react";
import { UserRole } from "@/types/common";

interface UserSwitcherProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const UserSwitcher = ({ activeRole, onRoleChange }: UserSwitcherProps) => {
  const roles = [
    {
      id: "msme" as UserRole,
      name: "MSMEs",
      icon: <Briefcase className="mr-2 h-4 w-4" />,
    },
    {
      id: "company" as UserRole,
      name: "Companies",
      icon: <Building2 className="mr-2 h-4 w-4" />,
    },
    {
      id: "investor" as UserRole,
      name: "Donors",
      icon: <PiggyBank className="mr-2 h-4 w-4" />,
    },
    {
      id: "fundes" as UserRole,
      name: "Fundes",
      icon: <Target className="mr-2 h-4 w-4" />,
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
            onClick={() => onRoleChange(role.id)}
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
