
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Send, PhoneCall, VideoIcon, MoreHorizontal, Paperclip, Smile } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

interface Contact {
  id: string;
  name: string;
  company: string;
  avatar: string | null;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isOnline: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  time: Date;
  isRead: boolean;
}

const Messages = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor">("investor");
  const [selectedContactId, setSelectedContactId] = useState<string>("1");
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const contacts: Contact[] = [
    {
      id: "1",
      name: "Sarah Chen",
      company: "EcoTech Solutions",
      avatar: null,
      lastMessage: "Looking forward to our meeting tomorrow!",
      lastMessageTime: new Date(2025, 3, 11, 14, 30), // April 11, 2025, 2:30 PM
      unreadCount: 2,
      isOnline: true
    },
    {
      id: "2",
      name: "Michael Rodriguez",
      company: "MedAI Health",
      avatar: null,
      lastMessage: "Thanks for reviewing our pitch deck. Let me know your thoughts.",
      lastMessageTime: new Date(2025, 3, 10, 11, 15), // April 10, 2025, 11:15 AM
      unreadCount: 0,
      isOnline: false
    },
    {
      id: "3",
      name: "Jennifer Park",
      company: "FinSwift",
      avatar: null,
      lastMessage: "Could you share more details about your investment criteria?",
      lastMessageTime: new Date(2025, 3, 9, 16, 45), // April 9, 2025, 4:45 PM
      unreadCount: 0,
      isOnline: true
    },
    {
      id: "4",
      name: "David Wong",
      company: "Urban Farming Co.",
      avatar: null,
      lastMessage: "The prototype is ready for review.",
      lastMessageTime: new Date(2025, 3, 8, 9, 20), // April 8, 2025, 9:20 AM
      unreadCount: 1,
      isOnline: false
    },
    {
      id: "5",
      name: "Lisa Johnson",
      company: "NanoLearn",
      avatar: null,
      lastMessage: "I've attached our latest financial projections.",
      lastMessageTime: new Date(2025, 3, 7, 13, 10), // April 7, 2025, 1:10 PM
      unreadCount: 0,
      isOnline: true
    }
  ];

  // Let's create example messages for the selected contact
  const getMessages = (contactId: string): Message[] => {
    switch (contactId) {
      case "1":
        return [
          {
            id: "m1",
            senderId: "user",
            text: "Hi Sarah, I've reviewed your latest pitch deck.",
            time: new Date(2025, 3, 11, 10, 0), // April 11, 2025, 10:00 AM
            isRead: true
          },
          {
            id: "m2",
            senderId: "1",
            text: "Hi there! Thanks for taking the time. Did you have any specific feedback?",
            time: new Date(2025, 3, 11, 10, 15), // April 11, 2025, 10:15 AM
            isRead: true
          },
          {
            id: "m3",
            senderId: "user",
            text: "I was particularly impressed with your sustainable approach. The market analysis was thorough.",
            time: new Date(2025, 3, 11, 10, 20), // April 11, 2025, 10:20 AM
            isRead: true
          },
          {
            id: "m4",
            senderId: "1",
            text: "That's great to hear! We've put a lot of effort into our market research.",
            time: new Date(2025, 3, 11, 10, 25), // April 11, 2025, 10:25 AM
            isRead: true
          },
          {
            id: "m5",
            senderId: "1",
            text: "I'd love to discuss more about potential partnership opportunities. Would you be available for a meeting tomorrow?",
            time: new Date(2025, 3, 11, 14, 0), // April 11, 2025, 2:00 PM
            isRead: true
          },
          {
            id: "m6",
            senderId: "user",
            text: "Absolutely, I can do 10 AM EST. Does that work for you?",
            time: new Date(2025, 3, 11, 14, 15), // April 11, 2025, 2:15 PM
            isRead: true
          },
          {
            id: "m7",
            senderId: "1",
            text: "Perfect! 10 AM EST works for me. I'll send a calendar invite shortly.",
            time: new Date(2025, 3, 11, 14, 20), // April 11, 2025, 2:20 PM
            isRead: true
          },
          {
            id: "m8",
            senderId: "1",
            text: "Looking forward to our meeting tomorrow!",
            time: new Date(2025, 3, 11, 14, 30), // April 11, 2025, 2:30 PM
            isRead: false
          }
        ];
      default:
        return [];
    }
  };

  const selectedContact = contacts.find(contact => contact.id === selectedContactId);
  const messages = getMessages(selectedContactId);
  
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    // In a real app, this would send to an API
    console.log(`Sending message to ${selectedContactId}: ${messageText}`);
    
    // Clear the input after sending
    setMessageText("");
  };

  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    contact.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout 
      activeRole={activeRole} 
      onRoleChange={setActiveRole}
      pageTitle="Messages"
    >
      <div className="flex h-[calc(100vh-120px)] overflow-hidden rounded-md border">
        {/* Contacts sidebar */}
        <div className="w-full max-w-xs border-r flex flex-col bg-background">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search contacts..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="flex flex-col">
              {filteredContacts.map(contact => (
                <div 
                  key={contact.id}
                  className={`p-3 border-b cursor-pointer hover:bg-accent ${selectedContactId === contact.id ? 'bg-accent' : ''}`}
                  onClick={() => setSelectedContactId(contact.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar>
                        {contact.avatar ? (
                          <AvatarImage src={contact.avatar} alt={contact.name} />
                        ) : (
                          <AvatarFallback className="bg-primary/10">
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      {contact.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                      )}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm truncate">{contact.name}</h3>
                        <p className="text-xs text-muted-foreground ml-1">
                          {format(contact.lastMessageTime, 'h:mm a')}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">{contact.company}</p>
                      <p className="text-xs truncate mt-1">{contact.lastMessage}</p>
                    </div>
                    {contact.unreadCount > 0 && (
                      <Badge className="ml-auto shrink-0 self-center">
                        {contact.unreadCount}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        
        {/* Main chat area */}
        {selectedContact ? (
          <div className="flex-1 flex flex-col bg-muted/10">
            {/* Chat header */}
            <div className="flex items-center justify-between p-4 border-b bg-background">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  {selectedContact.avatar ? (
                    <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
                  ) : (
                    <AvatarFallback className="bg-primary/10">
                      {selectedContact.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <h2 className="font-medium">{selectedContact.name}</h2>
                  <p className="text-xs text-muted-foreground flex items-center">
                    {selectedContact.isOnline ? (
                      <>
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-1" />
                        Online
                      </>
                    ) : (
                      'Offline'
                    )}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <PhoneCall className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <VideoIcon className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Chat messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="flex flex-col gap-4">
                {messages.length > 0 ? (
                  messages.map(message => (
                    <div 
                      key={message.id}
                      className={`flex ${message.senderId === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${
                        message.senderId === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tl-md rounded-tr-md rounded-bl-md' 
                          : 'bg-muted rounded-tl-md rounded-tr-md rounded-br-md'
                      } px-4 py-2`}>
                        <p className="text-sm">{message.text}</p>
                        <p className="text-xs opacity-70 mt-1 text-right">
                          {format(message.time, 'h:mm a')}
                          {message.senderId === 'user' && (
                            <span className="ml-1">✓{message.isRead ? '✓' : ''}</span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">No messages yet.</p>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Message input */}
            <div className="p-4 border-t bg-background">
              <div className="flex gap-2 items-end">
                <Button size="icon" variant="ghost" className="shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Textarea 
                  placeholder="Type a message..." 
                  className="min-h-10 resize-none"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <Button size="icon" variant="ghost" className="shrink-0">
                  <Smile className="h-4 w-4" />
                </Button>
                <Button size="icon" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Select a contact to start chatting</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Messages;
