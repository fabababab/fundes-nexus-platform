
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface Contact {
  id: string;
  name: string;
  organization: string;
  type: "investor" | "company" | "startup" | "funder";
  avatar: string | null;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount?: number;
  isOnline: boolean;
}

interface ContactsListProps {
  filter: "all" | "investor" | "company" | "startup" | "funder";
  search: string;
  onSelectContact: (id: string) => void;
  selectedContactId: string;
  showUnreadOnly: boolean;
}

const mockContacts: Contact[] = [
  {
    id: "1",
    name: "Sarah Chen",
    organization: "EcoTech Solutions",
    type: "startup",
    avatar: null,
    lastMessage: "Looking forward to our meeting tomorrow!",
    lastMessageTime: new Date(2025, 3, 11, 14, 30),
    unreadCount: 2,
    isOnline: true
  },
  {
    id: "2",
    name: "Michael Rodriguez",
    organization: "Global Ventures",
    type: "investor",
    avatar: null,
    lastMessage: "Thanks for the pitch deck",
    lastMessageTime: new Date(2025, 3, 11, 12, 0),
    unreadCount: 0,
    isOnline: false
  },
  {
    id: "3",
    name: "Emma Watson",
    organization: "Green Energy Corp",
    type: "company",
    avatar: null,
    isOnline: true
  },
  {
    id: "4",
    name: "James Wilson",
    organization: "Impact Fund",
    type: "funder",
    avatar: null,
    lastMessage: "Let's schedule a call",
    lastMessageTime: new Date(2025, 3, 10, 15, 45),
    unreadCount: 1,
    isOnline: true
  }
];

const ContactsList = ({ filter, search, onSelectContact, selectedContactId, showUnreadOnly }: ContactsListProps) => {
  const filteredContacts = mockContacts.filter(contact => {
    const matchesFilter = filter === "all" || contact.type === filter;
    const matchesSearch = 
      contact.name.toLowerCase().includes(search.toLowerCase()) ||
      contact.organization.toLowerCase().includes(search.toLowerCase());
    const matchesUnread = !showUnreadOnly || (contact.unreadCount && contact.unreadCount > 0);
    
    return matchesFilter && matchesSearch && matchesUnread;
  });

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col">
        {filteredContacts.map(contact => (
          <div
            key={contact.id}
            className={`p-3 border-b cursor-pointer hover:bg-accent transition-colors ${
              selectedContactId === contact.id ? 'bg-accent' : ''
            }`}
            onClick={() => onSelectContact(contact.id)}
          >
            <div className="flex items-start gap-3">
              <div className="relative">
                <Avatar>
                  <AvatarFallback>
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {contact.isOnline && (
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                )}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                  {contact.lastMessageTime && (
                    <p className="text-xs text-muted-foreground">
                      {format(contact.lastMessageTime, 'h:mm a')}
                    </p>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{contact.organization}</p>
                <Badge 
                  variant="outline" 
                  className="w-fit mt-1 text-xs capitalize"
                >
                  {contact.type}
                </Badge>
                {contact.lastMessage && (
                  <p className="text-xs truncate mt-1">{contact.lastMessage}</p>
                )}
              </div>
              {contact.unreadCount ? (
                <Badge className="ml-auto shrink-0 self-center">
                  {contact.unreadCount}
                </Badge>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default ContactsList;
