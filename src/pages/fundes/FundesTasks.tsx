
import React, { useState } from "react";
import {
  Check,
  Circle,
  Clock,
  CalendarClock,
  Flag,
  DollarSign,
  User,
  CheckSquare,
  Plus,
  Trash2,
  MoreHorizontal,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  CalendarDays,
  ListTodo,
  Search,
  Filter,
  X,
  Tag
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { addDays, format, isAfter, isBefore, isPast } from "date-fns";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";

interface Task {
  id: number;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "in-review" | "completed";
  priority: "low" | "medium" | "high" | "urgent";
  dueDate?: Date;
  assignee?: string;
  assigneeAvatar?: string;
  tags: string[];
  subtasks?: { id: number; title: string; completed: boolean }[];
  project?: string;
  progress?: number;
  createdAt: Date;
  completedAt?: Date;
}

const FundesTasks = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor" | "fundes">("fundes");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Review Q1 impact reports from portfolio companies",
      description: "Analyze impact metrics, verify data accuracy, and prepare summary for stakeholders",
      status: "in-progress",
      priority: "high",
      dueDate: addDays(new Date(), 2),
      assignee: "Sarah Johnson",
      assigneeAvatar: "SJ",
      tags: ["reporting", "impact", "quarterly"],
      subtasks: [
        { id: 1, title: "Verify data accuracy", completed: true },
        { id: 2, title: "Compare with previous quarters", completed: true },
        { id: 3, title: "Identify outliers", completed: false },
        { id: 4, title: "Draft executive summary", completed: false }
      ],
      project: "Impact Measurement",
      progress: 50,
      createdAt: addDays(new Date(), -5)
    },
    {
      id: 2,
      title: "Schedule stakeholder meetings for Green Energy Initiative",
      description: "Coordinate with key stakeholders to discuss progress and next steps for the initiative",
      status: "todo",
      priority: "medium",
      dueDate: addDays(new Date(), 5),
      assignee: "Michael Chen",
      assigneeAvatar: "MC",
      tags: ["meetings", "coordination", "green-energy"],
      subtasks: [
        { id: 5, title: "Identify key stakeholders", completed: true },
        { id: 6, title: "Draft meeting agenda", completed: false },
        { id: 7, title: "Book meeting room", completed: false },
        { id: 8, title: "Send calendar invites", completed: false }
      ],
      project: "Green Energy Initiative",
      progress: 25,
      createdAt: addDays(new Date(), -3)
    },
    {
      id: 3,
      title: "Finalize funding allocation for Q2",
      description: "Review funding requests and allocate resources based on strategic priorities",
      status: "in-review",
      priority: "urgent",
      dueDate: addDays(new Date(), 1),
      assignee: "Jessica Lee",
      assigneeAvatar: "JL",
      tags: ["finance", "funding", "quarterly"],
      subtasks: [
        { id: 9, title: "Review all funding requests", completed: true },
        { id: 10, title: "Prioritize based on impact potential", completed: true },
        { id: 11, title: "Draft allocation proposal", completed: true },
        { id: 12, title: "Get executive approval", completed: false }
      ],
      project: "Budget Management",
      progress: 75,
      createdAt: addDays(new Date(), -7)
    },
    {
      id: 4,
      title: "Develop metrics for startup mentorship program",
      description: "Create KPIs to measure the effectiveness of the mentorship program",
      status: "todo",
      priority: "medium",
      dueDate: addDays(new Date(), 10),
      assignee: "David Wilson",
      assigneeAvatar: "DW",
      tags: ["mentorship", "metrics", "startups"],
      project: "Startup Support",
      progress: 0,
      createdAt: addDays(new Date(), -1)
    },
    {
      id: 5,
      title: "Onboard new corporate partner: TechGlobal",
      description: "Complete onboarding process for new corporate partner including orientation and goal-setting",
      status: "in-progress",
      priority: "high",
      dueDate: addDays(new Date(), 3),
      assignee: "Lisa Patel",
      assigneeAvatar: "LP",
      tags: ["onboarding", "corporate", "partnership"],
      subtasks: [
        { id: 13, title: "Schedule kick-off meeting", completed: true },
        { id: 14, title: "Complete paperwork", completed: true },
        { id: 15, title: "Set up accounts", completed: false },
        { id: 16, title: "Introduce key contacts", completed: false }
      ],
      project: "Corporate Partnerships",
      progress: 40,
      createdAt: addDays(new Date(), -2)
    },
    {
      id: 6,
      title: "Update impact assessment framework",
      description: "Revise framework to incorporate latest ESG standards and stakeholder feedback",
      status: "completed",
      priority: "low",
      dueDate: addDays(new Date(), -5),
      assignee: "Thomas Brown",
      assigneeAvatar: "TB",
      tags: ["impact", "assessment", "ESG"],
      project: "Impact Measurement",
      progress: 100,
      createdAt: addDays(new Date(), -10),
      completedAt: addDays(new Date(), -2)
    },
    {
      id: 7,
      title: "Organize innovation workshop for healthcare startups",
      description: "Plan and execute workshop to foster innovation in healthcare sector startups",
      status: "todo",
      priority: "medium",
      dueDate: addDays(new Date(), 14),
      assignee: "Sarah Johnson",
      assigneeAvatar: "SJ",
      tags: ["workshop", "healthcare", "innovation"],
      project: "Sector Development",
      progress: 10,
      createdAt: addDays(new Date(), -4)
    },
    {
      id: 8,
      title: "Complete due diligence for potential investment in EduTech",
      description: "Review business plan, financials, and market position for potential investment",
      status: "in-review",
      priority: "high",
      dueDate: addDays(new Date(), 2),
      assignee: "Michael Chen",
      assigneeAvatar: "MC",
      tags: ["investment", "due-diligence", "education"],
      subtasks: [
        { id: 17, title: "Financial analysis", completed: true },
        { id: 18, title: "Market assessment", completed: true },
        { id: 19, title: "Team evaluation", completed: true },
        { id: 20, title: "Final recommendation", completed: false }
      ],
      project: "Investment Pipeline",
      progress: 80,
      createdAt: addDays(new Date(), -8)
    }
  ]);

  const [newTask, setNewTask] = useState<Partial<Task>>({
    title: "",
    description: "",
    status: "todo",
    priority: "medium",
    tags: [],
    progress: 0
  });

  const handleRoleChange = (role: "company" | "startup" | "investor" | "fundes") => {
    setActiveRole(role);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-blue-100 text-blue-800";
      case "high":
        return "bg-amber-100 text-amber-800";
      case "urgent":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-100 text-gray-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      case "in-review":
        return "bg-purple-100 text-purple-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "todo":
        return <Circle className="h-4 w-4" />;
      case "in-progress":
        return <Clock className="h-4 w-4" />;
      case "in-review":
        return <AlertCircle className="h-4 w-4" />;
      case "completed":
        return <Check className="h-4 w-4" />;
      default:
        return <Circle className="h-4 w-4" />;
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "low":
        return <Flag className="h-4 w-4 text-green-600" />;
      case "medium":
        return <Flag className="h-4 w-4 text-blue-600" />;
      case "high":
        return <Flag className="h-4 w-4 text-amber-600" />;
      case "urgent":
        return <Flag className="h-4 w-4 text-red-600" />;
      default:
        return <Flag className="h-4 w-4 text-gray-600" />;
    }
  };

  const updateTaskStatus = (taskId: number, newStatus: "todo" | "in-progress" | "in-review" | "completed") => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const updatedTask = { 
          ...task, 
          status: newStatus,
          completedAt: newStatus === "completed" ? new Date() : undefined,
          progress: newStatus === "completed" ? 100 : task.progress
        };
        return updatedTask;
      }
      return task;
    }));
  };

  const toggleSubtask = (taskId: number, subtaskId: number) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId && task.subtasks) {
        const updatedSubtasks = task.subtasks.map(subtask => {
          if (subtask.id === subtaskId) {
            return { ...subtask, completed: !subtask.completed };
          }
          return subtask;
        });
        
        // Calculate new progress
        const completedSubtasks = updatedSubtasks.filter(st => st.completed).length;
        const totalSubtasks = updatedSubtasks.length;
        const newProgress = Math.round((completedSubtasks / totalSubtasks) * 100);
        
        return { 
          ...task, 
          subtasks: updatedSubtasks,
          progress: newProgress,
          status: newProgress === 100 ? "completed" : newProgress > 0 ? "in-progress" : "todo",
          completedAt: newProgress === 100 ? new Date() : undefined
        };
      }
      return task;
    }));
  };

  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const addNewTask = () => {
    if (newTask.title && newTask.title.trim() !== "") {
      const createdTask: Task = {
        id: Math.max(...tasks.map(t => t.id), 0) + 1,
        title: newTask.title,
        description: newTask.description || "",
        status: newTask.status as "todo" | "in-progress" | "in-review" | "completed",
        priority: newTask.priority as "low" | "medium" | "high" | "urgent",
        dueDate: newTask.dueDate,
        assignee: newTask.assignee,
        assigneeAvatar: newTask.assigneeAvatar,
        tags: newTask.tags || [],
        subtasks: newTask.subtasks,
        project: newTask.project,
        progress: newTask.progress || 0,
        createdAt: new Date()
      };
      
      setTasks([...tasks, createdTask]);
      setNewTask({
        title: "",
        description: "",
        status: "todo",
        priority: "medium",
        tags: [],
        progress: 0
      });
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = selectedStatus ? task.status === selectedStatus : true;
    const matchesPriority = selectedPriority ? task.priority === selectedPriority : true;
    const matchesTag = selectedTag ? task.tags.includes(selectedTag) : true;
    return matchesSearch && matchesStatus && matchesPriority && matchesTag;
  });

  const todoTasks = filteredTasks.filter(task => task.status === "todo");
  const inProgressTasks = filteredTasks.filter(task => task.status === "in-progress");
  const inReviewTasks = filteredTasks.filter(task => task.status === "in-review");
  const completedTasks = filteredTasks.filter(task => task.status === "completed");

  // Get all unique tags from tasks
  const allTags = Array.from(new Set(tasks.flatMap(task => task.tags)));

  const isTaskOverdue = (task: Task) => {
    return task.dueDate && isPast(task.dueDate) && task.status !== "completed";
  };

  return (
    <DashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="Task Management"
    >
      <div className="h-[calc(100vh-9rem)]">
        <Tabs defaultValue="board" className="h-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="board">Board View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search tasks..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-64"
                />
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> New Task
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                    <DialogDescription>
                      Add details for the new task below.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid">
                      <label htmlFor="title" className="text-sm font-medium mb-1">
                        Title
                      </label>
                      <Input
                        id="title"
                        placeholder="Enter task title"
                        value={newTask.title || ""}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                      />
                    </div>
                    <div className="grid">
                      <label htmlFor="description" className="text-sm font-medium mb-1">
                        Description
                      </label>
                      <Input
                        id="description"
                        placeholder="Enter task description"
                        value={newTask.description || ""}
                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="status" className="text-sm font-medium mb-1">
                          Status
                        </label>
                        <Select
                          value={newTask.status}
                          onValueChange={(value) => setNewTask({...newTask, status: value as "todo" | "in-progress" | "in-review" | "completed"})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="todo">To Do</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="in-review">In Review</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label htmlFor="priority" className="text-sm font-medium mb-1">
                          Priority
                        </label>
                        <Select
                          value={newTask.priority}
                          onValueChange={(value) => setNewTask({...newTask, priority: value as "low" | "medium" | "high" | "urgent"})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="dueDate" className="text-sm font-medium mb-1">
                        Due Date
                      </label>
                      <div className="flex">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal"
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              {newTask.dueDate ? format(newTask.dueDate, 'PPP') : "Select due date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={newTask.dueDate}
                              onSelect={(date) => setNewTask({...newTask, dueDate: date})}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="project" className="text-sm font-medium mb-1">
                        Project
                      </label>
                      <Input
                        id="project"
                        placeholder="Project name"
                        value={newTask.project || ""}
                        onChange={(e) => setNewTask({...newTask, project: e.target.value})}
                      />
                    </div>
                    <div>
                      <label htmlFor="assignee" className="text-sm font-medium mb-1">
                        Assignee
                      </label>
                      <Select
                        value={newTask.assignee}
                        onValueChange={(value) => {
                          const initials = value.split(' ').map(n => n[0]).join('');
                          setNewTask({...newTask, assignee: value, assigneeAvatar: initials});
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Assign to" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sarah Johnson">Sarah Johnson</SelectItem>
                          <SelectItem value="Michael Chen">Michael Chen</SelectItem>
                          <SelectItem value="Jessica Lee">Jessica Lee</SelectItem>
                          <SelectItem value="David Wilson">David Wilson</SelectItem>
                          <SelectItem value="Lisa Patel">Lisa Patel</SelectItem>
                          <SelectItem value="Thomas Brown">Thomas Brown</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={addNewTask}>Create Task</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <TabsContent value="board" className="h-[calc(100%-3rem)]">
            <div className="flex h-full gap-4">
              <div className="w-1/4">
                <Card className="h-full flex flex-col">
                  <CardHeader className="bg-gray-50 pb-2 pt-3 px-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center">
                        <Circle className="h-4 w-4 mr-2 text-gray-500" />
                        To Do ({todoTasks.length})
                      </CardTitle>
                      <Button variant="outline" size="icon" className="h-7 w-7">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <ScrollArea className="flex-1 p-2">
                    <div className="space-y-2">
                      {todoTasks.map((task) => (
                        <Card key={task.id} className={`${isTaskOverdue(task) ? 'border-red-300' : ''}`}>
                          <CardContent className="p-3">
                            <div>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h3 className="text-sm font-medium line-clamp-2">{task.title}</h3>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "in-progress")}>
                                      Mark In Progress
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "completed")}>
                                      Mark Complete
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600" onClick={() => deleteTask(task.id)}>
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              {task.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{task.description}</p>
                              )}
                              
                              <div className="flex flex-wrap gap-1 mb-2">
                                {task.tags.slice(0, 2).map((tag, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs py-0 px-1.5">{tag}</Badge>
                                ))}
                                {task.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs py-0 px-1.5">+{task.tags.length - 2}</Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center">
                                  {getPriorityIcon(task.priority)}
                                  <span className="ml-1 capitalize">{task.priority}</span>
                                </div>
                                {task.dueDate && (
                                  <div className={`flex items-center ${isTaskOverdue(task) ? 'text-red-500' : ''}`}>
                                    <CalendarClock className="h-3 w-3 mr-1" />
                                    <span>{format(task.dueDate, 'MMM d')}</span>
                                  </div>
                                )}
                              </div>
                              
                              {task.subtasks && (
                                <div className="mt-2">
                                  <div className="flex items-center justify-between text-xs mb-1">
                                    <span>{task.progress}% complete</span>
                                    <span>{task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}</span>
                                  </div>
                                  <Progress value={task.progress} className="h-1.5" />
                                </div>
                              )}
                              
                              {task.assignee && (
                                <div className="mt-2 pt-2 border-t flex items-center justify-between">
                                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                                    {task.assigneeAvatar}
                                  </div>
                                  {task.project && (
                                    <span className="text-xs text-muted-foreground">{task.project}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </div>

              <div className="w-1/4">
                <Card className="h-full flex flex-col">
                  <CardHeader className="bg-blue-50 pb-2 pt-3 px-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        In Progress ({inProgressTasks.length})
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <ScrollArea className="flex-1 p-2">
                    <div className="space-y-2">
                      {inProgressTasks.map((task) => (
                        <Card key={task.id} className={`${isTaskOverdue(task) ? 'border-red-300' : ''}`}>
                          <CardContent className="p-3">
                            <div>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h3 className="text-sm font-medium line-clamp-2">{task.title}</h3>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "todo")}>
                                      Move to Todo
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "in-review")}>
                                      Move to Review
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "completed")}>
                                      Mark Complete
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600" onClick={() => deleteTask(task.id)}>
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              
                              {task.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{task.description}</p>
                              )}
                              
                              <div className="flex flex-wrap gap-1 mb-2">
                                {task.tags.slice(0, 2).map((tag, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs py-0 px-1.5">{tag}</Badge>
                                ))}
                                {task.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs py-0 px-1.5">+{task.tags.length - 2}</Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center">
                                  {getPriorityIcon(task.priority)}
                                  <span className="ml-1 capitalize">{task.priority}</span>
                                </div>
                                {task.dueDate && (
                                  <div className={`flex items-center ${isTaskOverdue(task) ? 'text-red-500' : ''}`}>
                                    <CalendarClock className="h-3 w-3 mr-1" />
                                    <span>{format(task.dueDate, 'MMM d')}</span>
                                  </div>
                                )}
                              </div>
                              
                              {task.subtasks && (
                                <div className="mt-2">
                                  <div className="flex items-center justify-between text-xs mb-1">
                                    <span>{task.progress}% complete</span>
                                    <span>{task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}</span>
                                  </div>
                                  <Progress value={task.progress} className="h-1.5" />
                                </div>
                              )}
                              
                              {task.assignee && (
                                <div className="mt-2 pt-2 border-t flex items-center justify-between">
                                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                                    {task.assigneeAvatar}
                                  </div>
                                  {task.project && (
                                    <span className="text-xs text-muted-foreground">{task.project}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </div>

              <div className="w-1/4">
                <Card className="h-full flex flex-col">
                  <CardHeader className="bg-purple-50 pb-2 pt-3 px-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-2 text-purple-500" />
                        In Review ({inReviewTasks.length})
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <ScrollArea className="flex-1 p-2">
                    <div className="space-y-2">
                      {inReviewTasks.map((task) => (
                        <Card key={task.id} className={`${isTaskOverdue(task) ? 'border-red-300' : ''}`}>
                          <CardContent className="p-3">
                            <div>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h3 className="text-sm font-medium line-clamp-2">{task.title}</h3>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "in-progress")}>
                                      Move to In Progress
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "completed")}>
                                      Mark Complete
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600" onClick={() => deleteTask(task.id)}>
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              
                              {task.description && (
                                <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{task.description}</p>
                              )}
                              
                              <div className="flex flex-wrap gap-1 mb-2">
                                {task.tags.slice(0, 2).map((tag, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs py-0 px-1.5">{tag}</Badge>
                                ))}
                                {task.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs py-0 px-1.5">+{task.tags.length - 2}</Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <div className="flex items-center">
                                  {getPriorityIcon(task.priority)}
                                  <span className="ml-1 capitalize">{task.priority}</span>
                                </div>
                                {task.dueDate && (
                                  <div className={`flex items-center ${isTaskOverdue(task) ? 'text-red-500' : ''}`}>
                                    <CalendarClock className="h-3 w-3 mr-1" />
                                    <span>{format(task.dueDate, 'MMM d')}</span>
                                  </div>
                                )}
                              </div>
                              
                              {task.subtasks && (
                                <div className="mt-2">
                                  <div className="flex items-center justify-between text-xs mb-1">
                                    <span>{task.progress}% complete</span>
                                    <span>{task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}</span>
                                  </div>
                                  <Progress value={task.progress} className="h-1.5" />
                                </div>
                              )}
                              
                              {task.assignee && (
                                <div className="mt-2 pt-2 border-t flex items-center justify-between">
                                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                                    {task.assigneeAvatar}
                                  </div>
                                  {task.project && (
                                    <span className="text-xs text-muted-foreground">{task.project}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </div>

              <div className="w-1/4">
                <Card className="h-full flex flex-col">
                  <CardHeader className="bg-green-50 pb-2 pt-3 px-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        Completed ({completedTasks.length})
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <ScrollArea className="flex-1 p-2">
                    <div className="space-y-2">
                      {completedTasks.map((task) => (
                        <Card key={task.id} className="bg-gray-50">
                          <CardContent className="p-3">
                            <div>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h3 className="text-sm font-medium line-clamp-2 text-muted-foreground">{task.title}</h3>
                                </div>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-6 w-6">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "in-progress")}>
                                      Reopen as In Progress
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => updateTaskStatus(task.id, "todo")}>
                                      Reopen as Todo
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600" onClick={() => deleteTask(task.id)}>
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                              
                              <div className="flex flex-wrap gap-1 mb-2">
                                {task.tags.slice(0, 2).map((tag, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs py-0 px-1.5 opacity-60">{tag}</Badge>
                                ))}
                                {task.tags.length > 2 && (
                                  <Badge variant="outline" className="text-xs py-0 px-1.5 opacity-60">+{task.tags.length - 2}</Badge>
                                )}
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-muted-foreground">
                                {task.completedAt && (
                                  <div className="flex items-center">
                                    <Check className="h-3 w-3 mr-1 text-green-500" />
                                    <span>Completed {format(task.completedAt, 'MMM d')}</span>
                                  </div>
                                )}
                              </div>
                              
                              {task.assignee && (
                                <div className="mt-2 pt-2 border-t flex items-center justify-between text-muted-foreground">
                                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                                    {task.assigneeAvatar}
                                  </div>
                                  {task.project && (
                                    <span className="text-xs">{task.project}</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="h-[calc(100%-3rem)]">
            <Card className="h-full">
              <CardHeader className="py-4">
                <div className="flex items-center justify-between">
                  <CardTitle>All Tasks</CardTitle>
                  <div className="flex items-center gap-2">
                    <Select value={selectedStatus || ""} onValueChange={(value) => setSelectedStatus(value || null)}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All statuses</SelectItem>
                        <SelectItem value="todo">To Do</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="in-review">In Review</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={selectedPriority || ""} onValueChange={(value) => setSelectedPriority(value || null)}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All priorities</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="urgent">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Tag className="h-4 w-4" />
                          <span>{selectedTag || "Tags"}</span>
                          {selectedTag && <X className="h-3 w-3 ml-1" onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTag(null);
                          }} />}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56">
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-muted-foreground mb-2">Filter by tag</p>
                          {allTags.map((tag) => (
                            <div 
                              key={tag} 
                              className="flex items-center p-2 hover:bg-muted rounded-sm cursor-pointer"
                              onClick={() => setSelectedTag(tag)}
                            >
                              <div className="flex-1 text-sm">{tag}</div>
                              {selectedTag === tag && <Check className="h-4 w-4 text-primary" />}
                            </div>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <div className="space-y-2">
                    {filteredTasks.length > 0 ? (
                      filteredTasks.map((task) => (
                        <Card key={task.id} className={`border-l-4 ${
                          task.status === "completed" ? "border-l-green-500" : 
                          task.priority === "urgent" ? "border-l-red-500" : 
                          task.priority === "high" ? "border-l-amber-500" : 
                          "border-l-blue-500"
                        }`}>
                          <CardContent className="p-4">
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  <Checkbox 
                                    checked={task.status === "completed"}
                                    onCheckedChange={() => updateTaskStatus(
                                      task.id, 
                                      task.status === "completed" ? "todo" : "completed"
                                    )}
                                  />
                                  <h3 className={`font-medium ${
                                    task.status === "completed" ? "line-through text-muted-foreground" : ""
                                  }`}>
                                    {task.title}
                                  </h3>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Badge className={getStatusColor(task.status)}>
                                    {getStatusIcon(task.status)}
                                    <span className="ml-1 capitalize">{
                                      task.status === "in-progress" ? "In Progress" : 
                                      task.status === "in-review" ? "In Review" : 
                                      task.status.charAt(0).toUpperCase() + task.status.slice(1)
                                    }</span>
                                  </Badge>
                                  <Badge className={getPriorityColor(task.priority)}>
                                    <span className="capitalize">{task.priority}</span>
                                  </Badge>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Edit Task</DropdownMenuItem>
                                      <DropdownMenuItem>View Details</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-red-600" onClick={() => deleteTask(task.id)}>
                                        Delete Task
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                              
                              {task.description && (
                                <p className="text-sm text-muted-foreground ml-6 mb-3">{task.description}</p>
                              )}
                              
                              {task.subtasks && task.subtasks.length > 0 && (
                                <div className="ml-6 mb-3">
                                  <div className="flex items-center justify-between text-sm mb-2">
                                    <h4 className="font-medium">Subtasks</h4>
                                    <span className="text-xs text-muted-foreground">{task.subtasks.filter(st => st.completed).length}/{task.subtasks.length}</span>
                                  </div>
                                  <div className="space-y-1 ml-1">
                                    {task.subtasks.map((subtask) => (
                                      <div key={subtask.id} className="flex items-center gap-2">
                                        <Checkbox 
                                          checked={subtask.completed}
                                          onCheckedChange={() => toggleSubtask(task.id, subtask.id)}
                                        />
                                        <span className={`text-sm ${subtask.completed ? "line-through text-muted-foreground" : ""}`}>{subtask.title}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              
                              <div className="flex items-center ml-6 mt-4 gap-4 text-sm">
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4 text-muted-foreground" />
                                  {task.assignee || "Unassigned"}
                                </div>
                                {task.dueDate && (
                                  <div className={`flex items-center gap-1 ${isTaskOverdue(task) && task.status !== "completed" ? "text-red-500" : "text-muted-foreground"}`}>
                                    <CalendarClock className="h-4 w-4" />
                                    <span>Due {format(task.dueDate, 'MMM d')}</span>
                                  </div>
                                )}
                                {task.project && (
                                  <div className="flex items-center gap-1 text-muted-foreground">
                                    <ListTodo className="h-4 w-4" />
                                    <span>{task.project}</span>
                                  </div>
                                )}
                                <div className="flex items-center gap-1">
                                  {task.tags.map((tag, idx) => (
                                    <Badge key={idx} variant="outline" className="text-xs">{tag}</Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <ListTodo className="h-12 w-12 mx-auto mb-3 opacity-20" />
                        <h3 className="text-lg font-medium">No tasks found</h3>
                        <p className="text-sm">Try adjusting your filters or add a new task</p>
                        <Button variant="outline" onClick={() => {
                          setSearchQuery("");
                          setSelectedStatus(null);
                          setSelectedPriority(null);
                          setSelectedTag(null);
                        }} className="mt-4">
                          Clear all filters
                        </Button>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default FundesTasks;
