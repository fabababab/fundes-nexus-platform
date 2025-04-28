
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Building2, Briefcase, PiggyBank, Target } from "lucide-react";
import { UserRole } from "@/types/common";

interface RoleSwitcherModalProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const RoleSwitcherModal = ({ activeRole, onRoleChange }: RoleSwitcherModalProps) => {
  const roles = [
    {
      id: "company",
      name: "Companies View",
      icon: <Building2 className="h-4 w-4" />,
      description: "Access corporate partnership and innovation tools"
    },
    {
      id: "msme",
      name: "MSME View",
      icon: <Briefcase className="h-4 w-4" />,
      description: "Manage your MSME journey and connections"
    },
    {
      id: "investor",
      name: "Donors View",
      icon: <PiggyBank className="h-4 w-4" />,
      description: "Track donations and discover opportunities"
    },
    {
      id: "fundes",
      name: "Fundes View",
      icon: <Target className="h-4 w-4" />,
      description: "Comprehensive ecosystem management and insights"
    }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="rounded-full p-2 hover:bg-gray-100">
          <User className="h-5 w-5 text-gray-500" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Switch Perspective</DialogTitle>
          <DialogDescription>
            Select a view to change your dashboard perspective
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">
          {roles.map((role) => (
            <Button
              key={role.id}
              variant={activeRole === role.id ? "default" : "outline"}
              className="flex items-center justify-start gap-3 p-4 h-auto"
              onClick={() => {
                console.log("Role changed to:", role.id);
                onRoleChange(role.id as UserRole);
              }}
            >
              {role.icon}
              <div className="text-left flex-1">
                <div className="font-semibold text-sm">{role.name}</div>
                <div className="text-xs text-muted-foreground">{role.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSwitcherModal;
