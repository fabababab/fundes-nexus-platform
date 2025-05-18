
import React, { useState } from "react";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import ContactsList from "@/pages/messages/ContactsList";
import MessageThread from "@/pages/messages/MessageThread";
import { UserRole } from "@/types/common";

const FundesMessages: React.FC = () => {
  // Fundes role is fixed for this page
  const [activeRole] = useState<UserRole>("fundes");
  const [selectedContact, setSelectedContact] = useState<string | null>("1");
  
  const handleRoleChange = (role: UserRole) => {
    // In a real app, this might navigate or change global state
    console.log("Role change attempt to:", role);
  };

  return (
    <SimpleDashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="Fundes Messages"
    >
      <div className="h-[calc(100vh-10rem)] flex border rounded-lg overflow-hidden bg-white">
        <div className="w-1/3 border-r">
          <ContactsList 
            filter="all"
            search=""
            onSelectContact={setSelectedContact}
            selectedContactId={selectedContact || ""}
            showUnreadOnly={false}
            onContactInfoClick={() => {}}
          />
        </div>
        <div className="w-2/3">
          <MessageThread contactId={selectedContact} />
        </div>
      </div>
    </SimpleDashboardLayout>
  );
};

export default FundesMessages;
