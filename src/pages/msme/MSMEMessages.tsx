
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import ContactsList from "@/pages/messages/ContactsList";
import MessageThread from "@/pages/messages/MessageThread";
import { UserRole } from "@/types/common";

// Define the Contact type based on what ContactsList expects
interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  role?: string;
}

const MSMEMessages: React.FC = () => {
  // MSME role is fixed for this page
  const [activeRole] = useState<UserRole>("msme");
  const [selectedContact, setSelectedContact] = useState<string | null>("1");
  
  const handleRoleChange = (role: UserRole) => {
    // In a real app, this might navigate or change global state
    console.log("Role change attempt to:", role);
  };

  // MSME-specific contacts
  const msmeContacts: Contact[] = [
    {
      id: "1",
      name: "FUNDES Support",
      avatar: "/placeholder.svg",
      status: "online",
      lastMessage: "We've reviewed your application and have good news!",
      timestamp: "10:23 AM",
      unread: 2,
      role: "support",
    },
    {
      id: "2",
      name: "Financial Literacy Coach",
      avatar: "/placeholder.svg",
      status: "offline",
      lastMessage: "Your progress in the modules is impressive. Let me know if you have questions.",
      timestamp: "Yesterday",
      unread: 0,
      role: "mentor",
    },
    {
      id: "3",
      name: "Coca-Cola Project Team",
      avatar: "/placeholder.svg",
      status: "online",
      lastMessage: "The next project meeting is scheduled for Friday at 2 PM.",
      timestamp: "Monday",
      unread: 1,
      role: "project",
    },
    {
      id: "4",
      name: "Community Support Group",
      avatar: "/placeholder.svg",
      status: "online",
      lastMessage: "5 MSMEs in your area have joined the sustainability initiative.",
      timestamp: "Last week",
      unread: 0,
      role: "group",
    },
  ];

  return (
    <DashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="MSME Messages"
    >
      <div className="h-[calc(100vh-10rem)] flex border rounded-lg overflow-hidden bg-white">
        <div className="w-1/3 border-r">
          <ContactsList 
            selectedId={selectedContact}
            onSelect={(id) => setSelectedContact(id)}
          />
        </div>
        <div className="w-2/3">
          <MessageThread contactId={selectedContact} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MSMEMessages;
