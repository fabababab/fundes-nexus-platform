
import React, { useState } from "react";
import { Bell, MessageSquare, User, X, Send, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useToast } from "@/hooks/use-toast";

interface NavigationBarProps {
  activeRole: "company" | "startup" | "investor";
}

interface Message {
  id: number;
  sender: string;
  avatar: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const NavigationBar: React.FC<NavigationBarProps> = ({ activeRole }) => {
  const [isMessengerOpen, setIsMessengerOpen] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "Jane Cooper",
      avatar: "",
      content: "Hey, do you have a minute to discuss the project?",
      timestamp: "10:30 AM",
      read: false
    },
    {
      id: 2,
      sender: "Alex Morgan",
      avatar: "",
      content: "I've shared the funding documents with you.",
      timestamp: "Yesterday",
      read: false
    },
    {
      id: 3,
      sender: "Robert Chen",
      avatar: "",
      content: "The investors are interested in your pitch.",
      timestamp: "Yesterday",
      read: true
    },
    {
      id: 4,
      sender: "Sarah Williams",
      avatar: "",
      content: "Let's schedule a meeting for next week.",
      timestamp: "Monday",
      read: true
    }
  ]);
  
  const { toast } = useToast();
  
  const unreadMessages = messages.filter(msg => !msg.read).length;
  
  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    
    // Add the new message
    const newMessage = {
      id: messages.length + 1,
      sender: "You",
      avatar: "",
      content: messageInput,
      timestamp: "Just now",
      read: true
    };
    
    setMessages([newMessage, ...messages]);
    setMessageInput("");
    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
  };
  
  const markAsRead = (id: number) => {
    setMessages(messages.map(msg => 
      msg.id === id ? { ...msg, read: true } : msg
    ));
  };
  
  return (
    <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-20">
      <div className="flex h-14 items-center px-4 sm:justify-between sm:space-x-0">
        <div className="flex items-center space-x-3">
          {/* You can add anything on the left side of the navbar if needed */}
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex">
            <Input 
              className="w-64 rounded-full bg-muted px-3 py-2 text-sm"
              placeholder="Search..." 
              startIcon={<Search className="h-4 w-4 opacity-50" />}
            />
          </div>
          
          {/* Messenger Button */}
          <Sheet open={isMessengerOpen} onOpenChange={setIsMessengerOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <MessageSquare className="h-5 w-5" />
                {unreadMessages > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {unreadMessages}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md flex flex-col">
              <SheetHeader>
                <SheetTitle>Messages</SheetTitle>
              </SheetHeader>
              
              <ScrollArea className="flex-1 mb-4">
                <div className="space-y-4 pr-4 mt-4">
                  {messages.map((message) => (
                    <div 
                      key={message.id}
                      onClick={() => markAsRead(message.id)}
                      className={`flex gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer ${!message.read ? 'bg-muted/50' : ''}`}
                    >
                      <Avatar>
                        <AvatarFallback>{message.sender[0]}</AvatarFallback>
                        {message.avatar && <AvatarImage src={message.avatar} alt={message.sender} />}
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-medium">{message.sender}</h4>
                          <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{message.content}</p>
                      </div>
                      {!message.read && (
                        <div className="h-2 w-2 rounded-full bg-primary self-center mr-1"></div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              
              <div className="flex gap-2 pt-2 border-t">
                <Input
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="flex-1"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                />
                <Button onClick={handleSendMessage} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Profile Button */}
          <Button variant="ghost" size="icon" className="relative">
            <User className="h-5 w-5" />
          </Button>
          
          {/* Notifications Button */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              3
            </Badge>
          </Button>
          
          {/* User Avatar */}
          <Avatar className="h-8 w-8">
            <AvatarFallback>
              {activeRole === "startup" ? "S" : activeRole === "investor" ? "I" : "C"}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};

export default NavigationBar;
