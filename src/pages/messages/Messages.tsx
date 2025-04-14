
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, PlusCircle } from "lucide-react";
import ContactsList from "./ContactsList";
import MessageThread from "./MessageThread";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
  attachments?: {
    type: 'image' | 'file';
    url: string;
    name?: string;
  }[];
}

const Messages = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor" | "fundes">("investor");
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  
  const handleRoleChange = (role: "company" | "startup" | "investor" | "fundes") => {
    setActiveRole(role);
  };

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Johnson',
      avatar: '/placeholder.svg',
      status: 'online',
      lastMessage: 'Looking forward to our meeting tomorrow',
      lastMessageTime: '10:42 AM',
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Michael Chen',
      avatar: '/placeholder.svg',
      status: 'offline',
      lastMessage: 'Thanks for the intro to that startup!',
      lastMessageTime: 'Yesterday',
      unreadCount: 0
    },
    {
      id: '3',
      name: 'Tech Innovators Group',
      avatar: '/placeholder.svg',
      status: 'online',
      lastMessage: "Maria: I'll share the pitch deck shortly",
      lastMessageTime: 'Yesterday',
      unreadCount: 4
    },
    {
      id: '4',
      name: 'Alex Rivera',
      avatar: '/placeholder.svg',
      status: 'away',
      lastMessage: 'How did the meeting with GreenTech go?',
      lastMessageTime: 'Mon',
      unreadCount: 0
    }
  ]);

  const [messages, setMessages] = useState<Record<string, Message[]>>({
    '1': [
      {
        id: 'm1',
        senderId: '1',
        text: 'Hi there! I wanted to follow up on our conversation about the healthcare investment opportunity.',
        timestamp: '10:30 AM',
        read: true
      },
      {
        id: 'm2',
        senderId: 'me',
        text: "Hello Sarah! Yes, I've reviewed the materials you sent. I have a few questions about the market projections.",
        timestamp: '10:35 AM',
        read: true
      },
      {
        id: 'm3',
        senderId: '1',
        text: 'Of course, happy to discuss. Would you like to schedule a call to go through them in detail?',
        timestamp: '10:40 AM',
        read: true
      },
      {
        id: 'm4',
        senderId: '1',
        text: 'Looking forward to our meeting tomorrow',
        timestamp: '10:42 AM',
        read: false
      }
    ],
    '2': [
      {
        id: 'm5',
        senderId: 'me',
        text: 'Michael, I wanted to introduce you to a promising fintech startup I met last week.',
        timestamp: '2:15 PM (Yesterday)',
        read: true
      },
      {
        id: 'm6',
        senderId: '2',
        text: 'Thanks for thinking of me! What do they do?',
        timestamp: '3:20 PM (Yesterday)',
        read: true
      },
      {
        id: 'm7',
        senderId: 'me',
        text: "They've developed an AI-powered financial planning tool for small businesses. Here's their website: finai.example.com",
        timestamp: '4:05 PM (Yesterday)',
        read: true
      },
      {
        id: 'm8',
        senderId: '2',
        text: 'Thanks for the intro to that startup!',
        timestamp: '5:30 PM (Yesterday)',
        read: true
      }
    ]
  });

  const handleSendMessage = (text: string) => {
    if (!activeContact) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: 'me',
      text,
      timestamp: 'Just now',
      read: true
    };

    // Update messages
    setMessages(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMessage]
    }));

    // Update last message in contacts
    setContacts(contacts.map(contact => 
      contact.id === activeContact.id 
        ? { ...contact, lastMessage: text, lastMessageTime: 'Just now', unreadCount: 0 } 
        : contact
    ));
  };

  const handleContactSelect = (contact: Contact) => {
    setActiveContact(contact);
    
    // Mark messages as read
    if (contact.unreadCount > 0) {
      setContacts(contacts.map(c => 
        c.id === contact.id ? { ...c, unreadCount: 0 } : c
      ));
      
      // Mark messages as read
      if (messages[contact.id]) {
        setMessages(prev => ({
          ...prev,
          [contact.id]: prev[contact.id].map(message => ({ ...message, read: true }))
        }));
      }
    }
  };

  return (
    <DashboardLayout activeRole={activeRole} onRoleChange={handleRoleChange} pageTitle="Messages">
      <div className="flex h-[calc(100vh-9rem)] overflow-hidden rounded-md border bg-background">
        {/* Contacts Sidebar */}
        <div className="w-1/4 border-r">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
              />
            </div>
          </div>
          
          <Tabs defaultValue="all">
            <div className="px-4 pt-4">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="unread">Unread</TabsTrigger>
                <TabsTrigger value="groups">Groups</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="m-0">
              <ContactsList 
                contacts={contacts}
                activeContactId={activeContact?.id}
                onSelect={handleContactSelect}
              />
            </TabsContent>
            
            <TabsContent value="unread" className="m-0">
              <ContactsList 
                contacts={contacts.filter(contact => contact.unreadCount > 0)}
                activeContactId={activeContact?.id}
                onSelect={handleContactSelect}
              />
            </TabsContent>
            
            <TabsContent value="groups" className="m-0">
              <ContactsList 
                contacts={contacts.filter(contact => contact.name.includes('Group'))}
                activeContactId={activeContact?.id}
                onSelect={handleContactSelect}
              />
            </TabsContent>
          </Tabs>
          
          <div className="absolute bottom-0 w-1/4 p-4 border-t border-r bg-background">
            <Button className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" />
              New Message
            </Button>
          </div>
        </div>
        
        {/* Message Thread */}
        <div className="flex-1">
          {activeContact ? (
            <MessageThread
              contact={activeContact}
              messages={messages[activeContact.id] || []}
              onSendMessage={handleSendMessage}
            />
          ) : (
            <div className="h-full flex flex-col items-center justify-center p-4 text-center">
              <div className="rounded-full bg-primary/10 p-4">
                <svg
                  className="h-10 w-10 text-primary"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M8 10h.01" />
                  <path d="M12 10h.01" />
                  <path d="M16 10h.01" />
                  <path d="M21 12c0 4.418-4.03 8-9 8a9.862 9.862 0 01-4.255-.949L3 20l1.395-3.72C3.512 14.821 3 13.448 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="mt-4 text-lg font-medium">Your Messages</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Select a conversation to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
