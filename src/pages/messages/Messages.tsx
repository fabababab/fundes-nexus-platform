
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
import { Filter, Search } from "lucide-react";
import ContactsList from "./ContactsList";
import MessageThread from "./MessageThread";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ContactInfoModal from "./ContactInfoModal";

type ContactType = "investor" | "company" | "startup" | "funder";

const Messages = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor">("investor");
  const [selectedContactId, setSelectedContactId] = useState<string>("1");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<ContactType | "all">("all");
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <DashboardLayout 
      activeRole={activeRole} 
      onRoleChange={setActiveRole}
      pageTitle="Messages"
    >
      <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-md border">
        <div className="w-full max-w-xs border-r flex flex-col bg-background">
          <div className="p-4 border-b space-y-4">
            <div className="space-y-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8"
                />
              </div>
              <Select
                value={filterType}
                onValueChange={(value) => setFilterType(value as ContactType | "all")}
              >
                <SelectTrigger className="w-full">
                  <div className="flex items-center">
                    <Filter className="mr-2 h-4 w-4" />
                    <SelectValue placeholder="Filter by type" />
                  </div>
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

          <ContactsList 
            filter={filterType}
            search={searchQuery}
            onSelectContact={setSelectedContactId}
            selectedContactId={selectedContactId}
            showUnreadOnly={false}
            onContactInfoClick={() => setIsContactModalOpen(true)}
          />
        </div>

        <div className="flex-1">
          <MessageThread contactId={selectedContactId} />
        </div>
      </div>

      <ContactInfoModal 
        open={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)}
        contactId={selectedContactId}
      />
    </DashboardLayout>
  );
};

export default Messages;
