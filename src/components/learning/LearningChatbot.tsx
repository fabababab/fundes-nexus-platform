
import React, { useState, useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface LearningChatbotProps {
  moduleTitle: string;
  onClose: () => void;
}

export const LearningChatbot: React.FC<LearningChatbotProps> = ({ moduleTitle, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: `Hello! I'm your AI learning assistant for the ${moduleTitle} module. How can I help you today?`,
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  
  const [input, setInput] = useState("");
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
      let botResponse = "";
      
      if (input.toLowerCase().includes("financial") || input.toLowerCase().includes("bank")) {
        botResponse = `Financial inclusion is essential for MSMEs. It provides access to banking services, credit opportunities, and helps build financial history. Would you like to know more about a specific aspect?`;
      } else if (input.toLowerCase().includes("credit") || input.toLowerCase().includes("loan")) {
        botResponse = `Building credit starts with formal financial records. Even small loans that are repaid on time can help establish your creditworthiness. Would you like tips on how to apply for your first business loan?`;
      } else if (input.toLowerCase().includes("digital") || input.toLowerCase().includes("mobile")) {
        botResponse = `Digital financial services can significantly reduce transaction costs and provide access to services 24/7. Mobile banking is particularly useful for MSMEs in remote areas.`;
      } else {
        botResponse = `That's an interesting question about ${moduleTitle}. To provide the most helpful information, could you specify which aspect you're interested in learning more about?`;
      }
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, response]);
    }, 1000);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-3 border-b bg-primary text-primary-foreground">
        <div className="flex items-center gap-2">
          <MessageSquare className="h-4 w-4" />
          <h3 className="font-medium text-sm">Learning Assistant</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-6 w-6 text-primary-foreground">
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-3" ref={scrollRef}>
        <div className="space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isBot ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[90%] rounded-lg p-2 ${
                  message.isBot
                    ? "bg-muted text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <span className="text-xs opacity-70 block text-right mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="border-t p-3">
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
            placeholder="Ask a question..."
            className="flex-1 text-sm"
          />
          <Button type="submit" size="icon" className="h-9 w-9">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};
