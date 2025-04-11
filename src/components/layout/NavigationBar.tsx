
import React from "react";
import { Search, MessageSquare, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";

interface NavigationBarProps {
  activeRole: "company" | "startup" | "investor";
}

const NavigationBar: React.FC<NavigationBarProps> = () => {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex-1"></div>
        <div className="relative flex w-full max-w-md items-center">
          <Search className="absolute left-3 h-5 w-5 text-gray-400" />
          <Input 
            type="search" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 h-10 rounded-full bg-gray-100 border-none"
          />
        </div>
        <div className="flex items-center space-x-4">
          <button className="relative rounded-full p-2 hover:bg-gray-100">
            <MessageSquare className="h-5 w-5 text-gray-500" />
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              2
            </span>
          </button>
          <button className="relative rounded-full p-2 hover:bg-gray-100">
            <Bell className="h-5 w-5 text-gray-500" />
            <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              3
            </span>
          </button>
          <button className="rounded-full p-2 hover:bg-gray-100">
            <User className="h-5 w-5 text-gray-500" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
