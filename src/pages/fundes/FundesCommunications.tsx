
import React, { useState } from "react";
import {
  MessageSquare,
  Send,
  Phone,
  Video,
  User,
  Users,
  MessageSquareText,
  Pin,
  FileText,
  Plus,
  Search,
  MoreHorizontal,
  Star,
  X
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";

interface Message {
  id: number;
  sender: string;
  senderInitials: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
  hasAttachment?: boolean;
  attachmentName?: string;
}

interface Contact {
  id: number;
  name: string;
  initials: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  online: boolean;
  type: "individual" | "group";
  members?: string;
  starred?: boolean;
}

const FundesCommunications = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor" | "fundes">("fundes");
  const [activeContact, setActiveContact] = useState<Contact | null>(null);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "TechInnovate Team",
      senderInitials: "TI",
      content: "We've reviewed the impact report and have some questions about the methodology used.",
      timestamp: "10:32 AM",
      isCurrentUser: false
    },
    {
      id: 2,
      sender: "You",
      senderInitials: "FD",
      content: "Thanks for taking the time to review. What specific questions do you have about the methodology?",
      timestamp: "10:35 AM",
      isCurrentUser: true
    },
    {
      id: 3,
      sender: "TechInnovate Team",
      senderInitials: "TI",
      content: "Specifically, we're unsure about how the social impact score is calculated. Could you clarify?",
      timestamp: "10:40 AM",
      isCurrentUser: false
    },
    {
      id: 4,
      sender: "TechInnovate Team",
      senderInitials: "TI",
      content: "Also, we've attached our revised sustainability metrics for your review.",
      timestamp: "10:41 AM",
      isCurrentUser: false,
      hasAttachment: true,
      attachmentName: "Sustainability_Metrics_v2.pdf"
    },
    {
      id: 5,
      sender: "You",
      senderInitials: "FD",
      content: "The social impact score is calculated based on three key metrics: community engagement, educational outcomes, and economic opportunity creation. I'll review your revised metrics and get back to you.",
      timestamp: "10:45 AM",
      isCurrentUser: true
    }
  ]);

  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: 1,
      name: "TechInnovate Team",
      initials: "TI",
      lastMessage: "Also, we've attached our revised sustainability metrics for your review.",
      lastMessageTime: "10:41 AM",
      unreadCount: 0,
      online: true,
      type: "group",
      members: "5 members",
    },
    {
      id: 2,
      name: "Green Ventures",
      initials: "GV",
      lastMessage: "When can we schedule the next funding review?",
      lastMessageTime: "Yesterday",
      unreadCount: 2,
      online: true,
      type: "group",
      members: "3 members",
      starred: true
    },
    {
      id: 3,
      name: "Sarah Johnson",
      initials: "SJ",
      lastMessage: "I'll prepare the impact report by tomorrow.",
      lastMessageTime: "Yesterday",
      unreadCount: 0,
      online: false,
      type: "individual"
    },
    {
      id: 4,
      name: "Healthcare Initiative",
      initials: "HI",
      lastMessage: "The stakeholder meeting is confirmed for Friday.",
      lastMessageTime: "Apr 13",
      unreadCount: 0,
      online: false,
      type: "group",
      members: "8 members"
    },
    {
      id: 5,
      name: "Michael Chen",
      initials: "MC",
      lastMessage: "Thanks for connecting me with the investor group.",
      lastMessageTime: "Apr 12",
      unreadCount: 0,
      online: true,
      type: "individual",
      starred: true
    },
    {
      id: 6,
      name: "Education Taskforce",
      initials: "ET",
      lastMessage: "Let's finalize the partnership agreement next week.",
      lastMessageTime: "Apr 11",
      unreadCount: 0,
      online: false,
      type: "group",
      members: "6 members"
    }
  ]);

  const handleRoleChange = (role: "company" | "startup" | "investor" | "fundes") => {
    setActiveRole(role);
  };

  const handleContactSelect = (contact: Contact) => {
    setActiveContact(contact);
    // Mark messages as read when selecting contact
    setContacts(contacts.map(c => 
      c.id === contact.id ? { ...c, unreadCount: 0 } : c
    ));
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (messageText.trim() === "" || !activeContact) return;

    const newMessage: Message = {
      id: messages.length + 1,
      sender: "You",
      senderInitials: "FD",
      content: messageText,
      timestamp: "Just now",
      isCurrentUser: true
    };

    setMessages([...messages, newMessage]);
    setMessageText("");

    // Update last message in contacts
    setContacts(contacts.map(contact => 
      contact.id === activeContact.id 
        ? { ...contact, lastMessage: messageText, lastMessageTime: "Just now" } 
        : contact
    ));
  };

  const handleToggleStar = (contactId: number) => {
    setContacts(contacts.map(contact =>
      contact.id === contactId
        ? { ...contact, starred: !contact.starred }
        : contact
    ));
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="Communications Hub"
    >
      <div className="h-[calc(100vh-9rem)]">
        <Tabs defaultValue="messages" className="h-full">
          <div className="flex h-full">
            <div className="w-1/4 border-r h-full flex flex-col">
              <div className="p-4 border-b">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold">Communications</h2>
                  <Button variant="ghost" size="icon">
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search messages..." 
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="messages">Messages</TabsTrigger>
                <TabsTrigger value="channels">Channels</TabsTrigger>
              </TabsList>
              <ScrollArea className="flex-1">
                <TabsContent value="messages" className="m-0">
                  <div className="space-y-1 p-2">
                    {filteredContacts.map((contact) => (
                      <div 
                        key={contact.id}
                        className={`flex items-start p-3 rounded-md cursor-pointer hover:bg-gray-100 ${activeContact?.id === contact.id ? 'bg-gray-100' : ''}`}
                        onClick={() => handleContactSelect(contact)}
                      >
                        <div className="relative mr-3">
                          <Avatar>
                            <AvatarFallback className={`${contact.type === 'group' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                              {contact.initials}
                            </AvatarFallback>
                          </Avatar>
                          {contact.online && (
                            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <div className="font-medium truncate flex items-center gap-1">
                              {contact.name}
                              {contact.starred && <Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />}
                            </div>
                            <span className="text-xs text-muted-foreground">{contact.lastMessageTime}</span>
                          </div>
                          <div className="text-sm text-muted-foreground truncate">
                            {contact.lastMessage}
                          </div>
                          <div className="flex items-center justify-between mt-1">
                            {contact.type === 'group' && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Users className="h-3 w-3" /> {contact.members}
                              </span>
                            )}
                            {contact.unreadCount > 0 && (
                              <Badge variant="destructive" className="ml-auto text-xs py-1 px-2 rounded-full">{contact.unreadCount}</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="channels" className="m-0">
                  <div className="p-4">
                    <div className="space-y-2">
                      <div className="font-medium text-sm text-muted-foreground">ECOSYSTEM CHANNELS</div>
                      <div className="pl-2 space-y-2">
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                          <MessageSquareText className="h-4 w-4 text-blue-500" />
                          <span># general-announcements</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                          <MessageSquareText className="h-4 w-4 text-green-500" />
                          <span># startup-showcase</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                          <MessageSquareText className="h-4 w-4 text-purple-500" />
                          <span># investor-connect</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                          <MessageSquareText className="h-4 w-4 text-amber-500" />
                          <span># industry-insights</span>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <div className="font-medium text-sm text-muted-foreground">PROJECT CHANNELS</div>
                      <div className="pl-2 space-y-2">
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                          <MessageSquareText className="h-4 w-4 text-blue-500" />
                          <span># healthcare-initiative</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                          <MessageSquareText className="h-4 w-4 text-green-500" />
                          <span># clean-energy-fund</span>
                        </div>
                        <div className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
                          <MessageSquareText className="h-4 w-4 text-purple-500" />
                          <span># education-taskforce</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </div>

            <div className="w-3/4 h-full flex flex-col">
              {activeContact ? (
                <>
                  <div className="border-b p-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarFallback className={`${activeContact.type === 'group' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
                          {activeContact.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">{activeContact.name}</h3>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-5 w-5"
                            onClick={() => handleToggleStar(activeContact.id)}
                          >
                            <Star className={`h-4 w-4 ${activeContact.starred ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          {activeContact.online ? (
                            <span className="flex items-center gap-1">
                              <span className="h-2 w-2 rounded-full bg-green-500"></span> Online
                            </span>
                          ) : (
                            "Offline"
                          )}
                          {activeContact.type === 'group' && ` • ${activeContact.members}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Phone className="h-5 w-5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="rounded-full">
                        <Video className="h-5 w-5" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View contact info</DropdownMenuItem>
                          <DropdownMenuItem>Search in conversation</DropdownMenuItem>
                          <DropdownMenuItem>Mute notifications</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-500">Leave conversation</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-[80%] ${message.isCurrentUser ? 'order-2' : 'order-1'}`}>
                            {!message.isCurrentUser && (
                              <div className="flex items-center gap-2 mb-1">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                    {message.senderInitials}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-sm font-medium">{message.sender}</span>
                              </div>
                            )}
                            <div 
                              className={`rounded-lg p-3 ${
                                message.isCurrentUser 
                                  ? 'bg-primary text-primary-foreground' 
                                  : 'bg-muted'
                              }`}
                            >
                              <p className="text-sm">{message.content}</p>
                              {message.hasAttachment && (
                                <div className="mt-2 p-2 bg-white bg-opacity-10 rounded flex items-center gap-2">
                                  <FileText className="h-4 w-4" />
                                  <span className="text-sm">{message.attachmentName}</span>
                                </div>
                              )}
                            </div>
                            <div className={`text-xs text-muted-foreground mt-1 ${message.isCurrentUser ? 'text-right' : 'text-left'}`}>
                              {message.timestamp}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  
                  <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-1"
                      />
                      <Button type="submit" size="icon">
                        <Send className="h-5 w-5" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Select a conversation</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-2">
                      Choose a contact or channel from the sidebar to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FundesCommunications;
