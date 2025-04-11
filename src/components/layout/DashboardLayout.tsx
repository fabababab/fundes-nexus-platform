
import React, { useState } from "react";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarRail,
  SidebarTrigger,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { UserCircle, Bell, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserSwitcher from "../common/UserSwitcher";

interface DashboardLayoutProps {
  children: React.ReactNode;
  menuItems: {
    title: string;
    icon: React.ComponentType;
    url: string;
    notifications?: number;
  }[];
  activeRole: "company" | "startup" | "investor";
  onRoleChange: (role: "company" | "startup" | "investor") => void;
}

export function DashboardLayout({ 
  children, 
  menuItems, 
  activeRole,
  onRoleChange 
}: DashboardLayoutProps) {
  const [notifications] = useState(5);

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center justify-between px-4 py-2">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-primary">Fundes</h1>
              </div>
              <SidebarTrigger />
            </div>
            <UserSwitcher activeRole={activeRole} onRoleChange={onRoleChange} />
          </SidebarHeader>
          
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild tooltip={item.title}>
                        <a href={item.url} className="flex justify-between w-full">
                          <div className="flex items-center gap-2">
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                          </div>
                          {item.notifications && item.notifications > 0 && (
                            <Badge variant="destructive" className="ml-auto">
                              {item.notifications}
                            </Badge>
                          )}
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          
          <SidebarSeparator />
          
          <SidebarFooter>
            <div className="px-4 py-2">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon">
                    <UserCircle className="h-5 w-5" />
                  </Button>
                  <div className="hidden group-data-[state=expanded]/sidebar-wrapper:block">
                    <p className="text-sm font-medium">User Profile</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                  {notifications > 0 && (
                    <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-destructive" />
                  )}
                </Button>
              </div>
              
              <Button variant="outline" className="w-full flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </Button>
            </div>
          </SidebarFooter>
          <SidebarRail />
        </Sidebar>
        
        {/* Changed from SidebarInset to div with appropriate classes */}
        <div className="relative flex min-h-svh flex-1 flex-col bg-background peer-data-[variant=inset]:min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}
