
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Calendar, CheckSquare, MessageSquare, UserPlus, Clock, FileCheck, Users } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";
import { Progress } from "@/components/ui/progress";

const CompanyProjectRoom = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor" | "fundes">("company");
  
  const handleRoleChange = (role: "company" | "startup" | "investor" | "fundes") => {
    setActiveRole(role);
  };

  const projects = [
    { 
      id: "proj1", 
      name: "Circular Packaging Initiative", 
      status: "In Progress",
      progress: 65,
      partners: [
        { name: "EcoPackaging Solutions", type: "Supplier" },
        { name: "Regional Markets Inc.", type: "Distributor" }
      ],
      startDate: "Feb 15, 2025",
      dueDate: "Jun 30, 2025",
      lastActivity: "2 hours ago",
      tasks: { completed: 18, total: 32 },
      description: "Developing and implementing fully recyclable packaging for consumer products across Mexico."
    },
    { 
      id: "proj2", 
      name: "Distributor Training Program", 
      status: "Planning",
      progress: 25,
      partners: [
        { name: "LocalGoods Distribution", type: "Distributor" },
        { name: "FUNDES Education Team", type: "FUNDES" }
      ],
      startDate: "Apr 1, 2025",
      dueDate: "Sep 15, 2025",
      lastActivity: "Yesterday",
      tasks: { completed: 4, total: 28 },
      description: "Creating a comprehensive business training program for our distribution partners."
    },
    { 
      id: "proj3", 
      name: "Supply Chain Carbon Reduction", 
      status: "In Progress",
      progress: 42,
      partners: [
        { name: "GreenTech Materials", type: "Supplier" },
        { name: "Sustainable Logistics Co.", type: "Supplier" }
      ],
      startDate: "Jan 10, 2025",
      dueDate: "Dec 31, 2025",
      lastActivity: "3 days ago",
      tasks: { completed: 12, total: 45 },
      description: "Working with suppliers to reduce carbon emissions throughout our supply chain."
    },
  ];

  const selectedProject = projects[0]; // Simulating a selected project for detailed view

  const tasks = [
    { id: "t1", title: "Finalize recycling process documentation", assignee: "María Rodriguez", dueDate: "May 15, 2025", status: "Completed", priority: "High" },
    { id: "t2", title: "Coordinate supplier material testing", assignee: "Carlos Vega", dueDate: "May 20, 2025", status: "In Progress", priority: "High" },
    { id: "t3", title: "Review draft packaging designs", assignee: "Luis Martínez", dueDate: "May 25, 2025", status: "Not Started", priority: "Medium" },
    { id: "t4", title: "Conduct consumer focus groups", assignee: "Ana Torres", dueDate: "Jun 5, 2025", status: "In Progress", priority: "Medium" },
    { id: "t5", title: "Prepare sustainability report", assignee: "Juan Menendez", dueDate: "Jun 15, 2025", status: "Not Started", priority: "Low" },
  ];

  const documents = [
    { id: "doc1", title: "Packaging Specifications v2", type: "PDF", uploadedBy: "María Rodriguez", date: "Apr 28, 2025", size: "3.2 MB" },
    { id: "doc2", title: "Material Sourcing Guidelines", type: "DOCX", uploadedBy: "Carlos Vega", date: "Apr 25, 2025", size: "1.4 MB" },
    { id: "doc3", title: "Recycling Process Flowchart", type: "PPTX", uploadedBy: "Luis Martínez", date: "Apr 22, 2025", size: "5.7 MB" },
    { id: "doc4", title: "Consumer Feedback Summary", type: "XLSX", uploadedBy: "Ana Torres", date: "Apr 15, 2025", size: "2.1 MB" },
  ];

  return (
    <DashboardLayout activeRole={activeRole} onRoleChange={handleRoleChange} pageTitle="Project Room">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Collaborative Projects</h2>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Active Projects</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 p-0">
                <div className="relative">
                  <Input
                    placeholder="Search projects..."
                    className="rounded-none border-x-0"
                  />
                </div>
                <div className="max-h-[400px] overflow-auto">
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      className={`p-3 border-l-4 cursor-pointer transition-colors ${
                        project.id === selectedProject.id 
                          ? "bg-muted border-l-primary" 
                          : "hover:bg-muted/50 border-l-transparent"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{project.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          project.status === "In Progress" 
                            ? "bg-blue-100 text-blue-800" 
                            : project.status === "Planning" 
                            ? "bg-purple-100 text-purple-800"
                            : "bg-green-100 text-green-800"
                        }`}>{project.status}</span>
                      </div>
                      <div className="mb-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-muted-foreground">Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1.5" />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span>Due {project.dueDate}</span>
                        </div>
                        <div>
                          <span>{project.tasks.completed}/{project.tasks.total} Tasks</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Project Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">{selectedProject.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedProject.description}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Start Date:</span>
                      <p className="font-medium">{selectedProject.startDate}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Due Date:</span>
                      <p className="font-medium">{selectedProject.dueDate}</p>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-sm">Project Partners:</span>
                    <div className="mt-1 space-y-1">
                      {selectedProject.partners.map((partner, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary mr-2">
                            {partner.name[0]}
                          </div>
                          <div className="text-sm">
                            {partner.name}
                            <span className="text-xs text-muted-foreground ml-1">({partner.type})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="pt-2 grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full text-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Meeting
                  </Button>
                  <Button className="w-full text-sm">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Message All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader className="pb-3 border-b">
                <div className="flex justify-between items-center">
                  <CardTitle>{selectedProject.name}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Users className="mr-2 h-4 w-4" />
                      Manage Team
                    </Button>
                    <Button size="sm">
                      <FileCheck className="mr-2 h-4 w-4" />
                      Add Task
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="tasks" className="h-full">
                  <div className="border-b">
                    <TabsList className="px-6">
                      <TabsTrigger value="tasks" className="flex gap-1">
                        <CheckSquare className="h-4 w-4" /> Tasks
                      </TabsTrigger>
                      <TabsTrigger value="documents" className="flex gap-1">
                        <FileText className="h-4 w-4" /> Documents
                      </TabsTrigger>
                      <TabsTrigger value="timeline" className="flex gap-1">
                        <Calendar className="h-4 w-4" /> Timeline
                      </TabsTrigger>
                      <TabsTrigger value="discussion" className="flex gap-1">
                        <MessageSquare className="h-4 w-4" /> Discussion
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="tasks" className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">Task</TableHead>
                          <TableHead>Assigned To</TableHead>
                          <TableHead>Due Date</TableHead>
                          <TableHead>Priority</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {tasks.map((task) => (
                          <TableRow key={task.id}>
                            <TableCell className="font-medium">{task.title}</TableCell>
                            <TableCell>{task.assignee}</TableCell>
                            <TableCell>{task.dueDate}</TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                task.priority === "High" 
                                  ? "bg-red-100 text-red-800" 
                                  : task.priority === "Medium" 
                                  ? "bg-amber-100 text-amber-800" 
                                  : "bg-green-100 text-green-800"
                              }`}>
                                {task.priority}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                task.status === "Completed" 
                                  ? "bg-green-100 text-green-800" 
                                  : task.status === "In Progress" 
                                  ? "bg-blue-100 text-blue-800" 
                                  : "bg-gray-100 text-gray-800"
                              }`}>
                                {task.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>
                  
                  <TabsContent value="documents" className="p-6">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[300px]">Document</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Uploaded By</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Size</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {documents.map((doc) => (
                          <TableRow key={doc.id}>
                            <TableCell className="font-medium">{doc.title}</TableCell>
                            <TableCell>{doc.type}</TableCell>
                            <TableCell>{doc.uploadedBy}</TableCell>
                            <TableCell>{doc.date}</TableCell>
                            <TableCell>{doc.size}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    
                    <div className="mt-4 flex justify-center">
                      <Button>
                        Upload Document
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="timeline" className="p-6">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Timeline view will display milestones, deadlines, and progress over time for this project.
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="discussion" className="p-6">
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        Project discussion board will be displayed here, allowing all stakeholders to communicate in one place.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyProjectRoom;
