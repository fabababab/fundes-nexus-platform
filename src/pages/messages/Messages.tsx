
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Send, Paperclip, Smile } from "lucide-react";
import ContactsList from "./ContactsList";
import MessageThread from "./MessageThread";

type ContactType = "investor" | "company" | "startup" | "funder";

const Messages = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor">("investor");
  const [selectedContactId, setSelectedContactId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<ContactType | "all">("all");

  return (
    <DashboardLayout 
      activeRole={activeRole} 
      onRoleChange={setActiveRole}
      pageTitle="Messages"
    >
      <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-md border">
        <Tabs defaultValue="messages" className="w-full max-w-xs border-r flex flex-col bg-background">
          <div className="p-4 border-b space-y-4">
            <TabsList className="w-full">
              <TabsTrigger value="messages" className="flex-1">Messages</TabsTrigger>
              <TabsTrigger value="contacts" className="flex-1">Contacts</TabsTrigger>
            </TabsList>
            <div className="space-y-2">
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
              <Select
                value={filterType}
                onValueChange={(value) => setFilterType(value as ContactType | "all")}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Contacts</SelectItem>
                  <SelectItem value="investor">Investors</SelectItem>
                  <SelectItem value="company">Companies</SelectItem>
                  <SelectItem value="startup">Startups</SelectItem>
                  <SelectItem value="funder">Funders</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="messages" className="flex-1 m-0">
            <ContactsList 
              filter={filterType}
              search={searchQuery}
              onSelectContact={setSelectedContactId}
              selectedContactId={selectedContactId}
              showUnreadOnly
            />
          </TabsContent>

          <TabsContent value="contacts" className="flex-1 m-0">
            <ContactsList 
              filter={filterType}
              search={searchQuery}
              onSelectContact={setSelectedContactId}
              selectedContactId={selectedContactId}
              showUnreadOnly={false}
            />
          </TabsContent>
        </Tabs>

        <MessageThread contactId={selectedContactId} />
      </div>
    </DashboardLayout>
  );
};

export default Messages;
