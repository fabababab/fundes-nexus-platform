
import React, { useState, useEffect } from "react";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserRole } from "@/types/common";
import { Send, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  isHumanSupport?: boolean;
  timestamp: Date;
}

const MSMEChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your MSME Advisory Assistant. I can help with financial literacy, operational improvements, and sustainability practices. How can I assist your business today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isWaitingForHuman, setIsWaitingForHuman] = useState(false);
  // MSME role is fixed for this page
  const [activeRole] = useState<UserRole>("msme");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    // Simulate bot response with MSME-specific guidance
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand your question about small business operations. As an MSME, you can benefit from our training modules on financial management and sustainable practices. Would you like me to recommend specific resources?",
        isBot: true,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const handleRoleChange = (newRole: UserRole) => {
    // In a real app, this might navigate or change global state
    console.log("Role change attempt to:", newRole);
  };

  const handleHumanSupportRequest = () => {
    if (isWaitingForHuman) return;
    
    setIsWaitingForHuman(true);
    const supportMessage: Message = {
      id: Date.now().toString(),
      text: "Connecting you with a FUNDES consultant. Please wait while we process your request.",
      isBot: true,
      isHumanSupport: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, supportMessage]);

    // Simulate consultant connection
    setTimeout(() => {
      toast({
        title: "Support Request Sent",
        description: "A FUNDES consultant will contact you shortly via email.",
      });
    }, 2000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <SimpleDashboardLayout 
      pageTitle="MSME Advisory Assistant" 
      activeRole={activeRole} 
      onRoleChange={handleRoleChange}
    >
      <div className="container mx-auto max-w-4xl p-4">
        <Card className="h-[calc(100vh-180px)] flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="font-semibold">AI Assistant</h2>
            {!isWaitingForHuman && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleHumanSupportRequest}
                className="flex gap-2"
              >
                <MessageSquare className="h-4 w-4" />
                Speak to Consultant
              </Button>
            )}
          </div>
          <ScrollArea ref={scrollRef} className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isBot ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.isBot
                        ? message.isHumanSupport
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-secondary-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="border-t p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about business operations, financial literacy, or sustainability practices..."
                className="flex-1"
                disabled={isWaitingForHuman}
              />
              <Button type="submit" size="icon" disabled={isWaitingForHuman}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </SimpleDashboardLayout>
  );
};

export default MSMEChatBot;
