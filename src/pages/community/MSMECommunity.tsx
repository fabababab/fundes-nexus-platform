
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // Note: Tabs are imported but not used. Consider removing if not planned.
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Note: CardHeader, CardTitle imported but not used.
import { Input } from "@/components/ui/input"; // Note: Input imported but not used.
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Send, Plus } from "lucide-react"; // Changed FileImage to Plus

interface Project {
  id: string;
  name: string;
  unreadMessages: number;
}

interface Message {
  id: string;
  projectId: string;
  author: string;
  content: string;
  timestamp: string;
}

const MSMECommunity: React.FC = () => {
  // Mock projects the MSME is part of
  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "Sustainable Supply Chain Initiative", unreadMessages: 3 },
    { id: "2", name: "Digital Transformation Program", unreadMessages: 0 },
    { id: "3", name: "Circular Economy Workshop", unreadMessages: 2 }
  ]);

  // Mock messages for each project
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: "1-1", 
      projectId: "1", 
      author: "Global Foods Ltd", 
      content: "Has anyone implemented the sustainable packaging solutions yet? We're looking at biodegradable options but concerned about shelf life impact.", 
      timestamp: "2 hours ago" 
    },
    { 
      id: "1-2", 
      projectId: "1", 
      author: "EcoPackaging", 
      content: "We've been testing compostable packaging for dry goods with good results. Happy to share our supplier details if anyone's interested.", 
      timestamp: "1 hour ago" 
    },
    { 
      id: "1-3", 
      projectId: "1", 
      author: "FreshProduce Co", 
      content: "We're interested in the comparative costs. Has anyone done an analysis between traditional vs sustainable packaging?", 
      timestamp: "45 minutes ago" 
    },
    { 
      id: "2-1", 
      projectId: "2", 
      author: "Tech Solutions", 
      content: "The new inventory management system demo is scheduled for next Tuesday. Who's planning to attend?", 
      timestamp: "5 hours ago" 
    },
    { 
      id: "2-2", 
      projectId: "2", 
      author: "Retail Group", 
      content: "We'll be there. Particularly interested in the POS integration capabilities.", 
      timestamp: "4 hours ago" 
    },
    { 
      id: "3-1", 
      projectId: "3", 
      author: "RecycleNow", 
      content: "Looking forward to next week's workshop. I'm bringing samples of our reclaimed material products.", 
      timestamp: "yesterday" 
    },
    { 
      id: "3-2", 
      projectId: "3", 
      author: "GreenManufacturing", 
      content: "Has the agenda been finalized yet? I'd like to prepare some specific questions for the session on material testing.", 
      timestamp: "2 days ago" 
    }
  ]);

  const [activeProject, setActiveProject] = useState<string>("1");
  const [newMessage, setNewMessage] = useState<string>("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newMessage.trim() === "") return;
    
    const newMsg: Message = {
      id: `${activeProject}-${Date.now()}`,
      projectId: activeProject,
      author: "Your Company",
      content: newMessage,
      timestamp: "Just now"
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleProjectClick = (projectId: string) => {
    setActiveProject(projectId);
    
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, unreadMessages: 0 }
        : project
    ));
  };

  const activeProjectMessages = messages.filter(message => message.projectId === activeProject);
  const currentProject = projects.find(project => project.id === activeProject);

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-9rem)] max-h-[calc(100vh-9rem)]">
      {/* Project sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 p-4 border-b md:border-b-0 md:border-r overflow-y-auto h-1/3 md:h-full flex-shrink-0">
        <h2 className="text-xl font-bold mb-4">Your Projects</h2>
        <div className="space-y-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`p-3 rounded-md cursor-pointer flex justify-between items-center ${
                activeProject === project.id ? "bg-muted" : "hover:bg-muted/50"
              }`}
              onClick={() => handleProjectClick(project.id)}
            >
              <span className="font-medium">{project.name}</span>
              {project.unreadMessages > 0 && (
                <Badge variant="destructive" className="ml-2">
                  {project.unreadMessages}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Messages area */}
      <div className="w-full md:flex-1 flex flex-col overflow-hidden h-2/3 md:h-full">
        {/* Project header */}
        <div className="p-4 border-b flex-shrink-0">
          <h3 className="text-lg font-bold">{currentProject?.name}</h3>
          <p className="text-sm text-muted-foreground">
            Community discussion for project participants
          </p>
        </div>

        {/* Messages list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeProjectMessages.map((message) => (
            <Card key={message.id} className={message.author === "Your Company" ? "ml-4 sm:ml-12" : ""}>
              <CardContent className="p-3">
                <div className="flex items-start mb-2">
                  <Avatar className="h-6 w-6 mr-2 flex-shrink-0">
                    <div className="bg-primary text-xs text-white flex items-center justify-center h-full w-full rounded-full">
                      {message.author.charAt(0)}
                    </div>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm block truncate">{message.author}</span> {/* Ensure author name can wrap or truncate */}
                  </div>
                  <div className="text-xs text-muted-foreground ml-auto pl-2 flex-shrink-0">{message.timestamp}</div>
                </div>
                <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p> {/* Allow content to wrap */}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Message input */}
        <div className="border-t p-4 flex-shrink-0">
          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <Textarea 
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="min-h-[60px]"
              rows={2} // Suggest a smaller initial size for mobile
            />
            <div className="flex flex-col justify-end space-y-2">
              <Button type="button" size="icon" variant="outline">
                <Plus className="h-4 w-4" /> {/* Replaced FileImage with Plus */}
              </Button>
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MSMECommunity;

