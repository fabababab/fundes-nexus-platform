
import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bot, MessageSquare, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  isHumanSupport?: boolean;
  timestamp: Date;
}

const MSMEChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you with your MSME needs today?",
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isWaitingForHuman, setIsWaitingForHuman] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
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

    // Simulate bot response
    setTimeout(() => {
      if (input.toLowerCase().includes("speak") || 
          input.toLowerCase().includes("human") || 
          input.toLowerCase().includes("consultant")) {
        handleHumanSupportRequest();
      } else {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm a demo AI assistant. For complex inquiries, you can request to speak with a FUNDES consultant.",
          isBot: true,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      }
    }, 1000);
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
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">MSME Support</h2>
        </div>
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

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
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
            placeholder="Type your message..."
            className="flex-1"
            disabled={isWaitingForHuman}
          />
          <Button type="submit" size="icon" disabled={isWaitingForHuman}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default MSMEChatbot;
