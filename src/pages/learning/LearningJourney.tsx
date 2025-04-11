
import React from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Play, BookOpen, Star, Clock, GraduationCap, Award, Home, Calendar, BarChart3, Users, MessageSquare, FileText, Briefcase, Database } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LearningJourneyProps {
  activeRole: "company" | "startup" | "investor";
  onRoleChange: (role: "company" | "startup" | "investor") => void;
}

const LearningJourney: React.FC<LearningJourneyProps> = ({ activeRole, onRoleChange }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { title: "Dashboard", icon: Home, url: "/dashboard" },
    { title: "Events", icon: Calendar, url: "/events", notifications: 3 },
    { title: "Analytics", icon: BarChart3, url: "/analytics" },
    { title: "Network", icon: Users, url: "/network", notifications: 2 },
    { title: "Messages", icon: MessageSquare, url: "/messages", notifications: 5 },
    { title: "Documents", icon: FileText, url: "/documents" },
    { title: "Investments", icon: Briefcase, url: "/investments" },
    { title: "Database", icon: Database, url: "/database" },
  ];
  
  const modules = [
    {
      id: 1,
      title: "Business Foundations",
      description: "Essential concepts for startup development",
      progress: 100,
      status: "completed",
      lessons: 5,
      lessonsCompleted: 5,
      score: 92,
      estimatedTime: "3 hours",
      icon: BookOpen,
    },
    {
      id: 2,
      title: "Market Research",
      description: "Understanding your target market and competitors",
      progress: 100,
      status: "completed",
      lessons: 4,
      lessonsCompleted: 4,
      score: 88,
      estimatedTime: "2 hours",
      icon: GraduationCap,
    },
    {
      id: 3,
      title: "Sustainable Growth Strategies",
      description: "Creating sustainable business models and growth plans",
      progress: 100,
      status: "completed",
      lessons: 6,
      lessonsCompleted: 6,
      score: 95,
      estimatedTime: "4 hours",
      icon: Award,
    },
    {
      id: 4,
      title: "Impact Business Model",
      description: "Integrating social and environmental impact into your business model",
      progress: 30,
      status: "in-progress",
      lessons: 5,
      lessonsCompleted: 2,
      score: null,
      estimatedTime: "3.5 hours",
      icon: Star,
    },
    {
      id: 5,
      title: "Investor Relations",
      description: "Best practices for engaging with investors",
      progress: 0,
      status: "locked",
      lessons: 4,
      lessonsCompleted: 0,
      score: null,
      estimatedTime: "2.5 hours",
      icon: Briefcase,
    },
    {
      id: 6,
      title: "Advanced Fundraising",
      description: "Strategies for Series A and beyond",
      progress: 0,
      status: "locked",
      lessons: 6,
      lessonsCompleted: 0,
      score: null,
      estimatedTime: "5 hours",
      icon: Clock,
    },
  ];

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="secondary" className="ml-auto"><Check className="h-3 w-3 mr-1" /> Completed</Badge>;
      case "in-progress":
        return <Badge className="ml-auto bg-blue-500">In Progress</Badge>;
      case "locked":
        return <Badge variant="outline" className="ml-auto">Locked</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout menuItems={menuItems} activeRole={activeRole} onRoleChange={onRoleChange}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Learning Journey</h1>
            <p className="text-muted-foreground">Build your skills and knowledge through structured learning paths</p>
          </div>
          <Button onClick={() => navigate("/dashboard")}>Back to Dashboard</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Progress</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">57%</div>
              <Progress value={57} className="h-2 mt-2" />
              <p className="text-xs text-muted-foreground mt-1">3 of 6 modules completed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Level</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Intermediate</div>
              <p className="text-xs text-muted-foreground">Next level: Advanced</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">91%</div>
              <p className="text-xs text-muted-foreground">Across all completed modules</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Time Invested</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">9 hours</div>
              <p className="text-xs text-muted-foreground">Estimated 20 hours total</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Modules</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((module) => (
                <Card key={module.id} className={module.status === "locked" ? "opacity-70" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <module.icon className="h-5 w-5" />
                      </div>
                      {renderStatusBadge(module.status)}
                    </div>
                    <CardTitle className="mt-2">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={module.progress} className="h-2" />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        Lesson {module.lessonsCompleted} of {module.lessons}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {module.progress}% completed
                      </span>
                    </div>
                    {module.score && (
                      <div className="mt-2 text-sm">
                        Score: <span className="font-medium">{module.score}%</span>
                      </div>
                    )}
                    <div className="mt-1 text-sm flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{module.estimatedTime}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {module.status === "completed" ? (
                      <Button variant="outline" className="w-full">
                        <BookOpen className="h-4 w-4 mr-2" /> Review
                      </Button>
                    ) : module.status === "in-progress" ? (
                      <Button className="w-full">
                        <Play className="h-4 w-4 mr-2" /> Continue
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full" disabled>
                        Locked
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="in-progress" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {modules.filter(m => m.status === "in-progress").map((module) => (
                <Card key={module.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <module.icon className="h-5 w-5" />
                      </div>
                      {renderStatusBadge(module.status)}
                    </div>
                    <CardTitle className="mt-2">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={module.progress} className="h-2" />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        Lesson {module.lessonsCompleted} of {module.lessons}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {module.progress}% completed
                      </span>
                    </div>
                    <div className="mt-1 text-sm flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{module.estimatedTime}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full">
                      <Play className="h-4 w-4 mr-2" /> Continue
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="space-y-4 mt-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {modules.filter(m => m.status === "completed").map((module) => (
                <Card key={module.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <module.icon className="h-5 w-5" />
                      </div>
                      {renderStatusBadge(module.status)}
                    </div>
                    <CardTitle className="mt-2">{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={module.progress} className="h-2" />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {module.lessons} lessons completed
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Score: {module.score}%
                      </span>
                    </div>
                    <div className="mt-1 text-sm flex items-center text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{module.estimatedTime}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" /> Review
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default LearningJourney;
