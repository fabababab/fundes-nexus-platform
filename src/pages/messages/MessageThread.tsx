
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Paperclip, Smile, PhoneCall, VideoIcon, MoreHorizontal } from "lucide-react";
import { format } from "date-fns";

interface MessageThreadProps {
  contactId: string;
}

const MessageThread: React.FC<MessageThreadProps> = ({ contactId }) => {
  const [messageText, setMessageText] = useState("");
  
  // Mock data - in a real app this would come from an API
  const contact = {
    name: "Sarah Chen",
    organization: "EcoTech Solutions",
    type: "startup",
    isOnline: true
  };

  const messages = [
    {
      id: "1",
      senderId: "user",
      text: "Hi Sarah, I've reviewed your latest pitch deck.",
      time: new Date(2025, 3, 11, 10, 0),
      isRead: true
    },
    {
      id: "2",
      senderId: contactId,
      text: "Hi there! Thanks for taking the time. Did you have any specific feedback?",
      time: new Date(2025, 3, 11, 10, 15),
      isRead: true
    }
  ];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    // In a real app this would send to an API
    console.log("Sending message:", messageText);
    setMessageText("");
  };

  return (
    <div className="flex-1 flex flex-col bg-muted/10">
      {/* Chat header */}
      <div className="flex items-center justify-between p-4 border-b bg-background">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarFallback>
              {contact.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-medium">{contact.name}</h2>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground flex items-center">
                {contact.isOnline ? (
                  <>
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-1" />
                    Online
                  </>
                ) : 'Offline'}
              </p>
              <Badge variant="outline" className="text-xs capitalize">
                {contact.type}
              </Badge>
            </div>
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

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {messages.map(message => (
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
                <p className="text-xs opacity-70 text-right">
                  {format(message.time, 'h:mm a')}
                  {message.senderId === 'user' && (
                    <span className="ml-1">✓{message.isRead ? '✓' : ''}</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message input */}
      <div className="p-4 border-t bg-background">
        <div className="flex gap-2 items-end">
          <Button size="icon" variant="ghost" className="shrink-0">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
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
  );
};

export default MessageThread;
