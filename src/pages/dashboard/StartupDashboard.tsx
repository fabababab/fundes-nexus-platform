
import React from "react";
import { Briefcase, GraduationCap, Users, MessageSquare, Lightbulb, Target, FileText, Settings } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface StartupDashboardProps {
  activeRole: "company" | "startup" | "investor";
  onRoleChange: (role: "company" | "startup" | "investor") => void;
}

const StartupDashboard = ({ activeRole, onRoleChange }: StartupDashboardProps) => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: Briefcase,
      url: "#dashboard",
    },
    {
      title: "Learning Journey",
      icon: GraduationCap,
      url: "#learning",
      notifications: 2,
    },
    {
      title: "Mentoring",
      icon: Users,
      url: "#mentoring",
    },
    {
      title: "Community",
      icon: MessageSquare,
      url: "#community",
      notifications: 5,
    },
    {
      title: "Funding",
      icon: Lightbulb,
      url: "#funding",
    },
    {
      title: "Goals",
      icon: Target,
      url: "#goals",
    },
    {
      title: "Resources",
      icon: FileText,
      url: "#resources",
    },
    {
      title: "Settings",
      icon: Settings,
      url: "#settings",
    },
  ];

  return (
    <DashboardLayout menuItems={menuItems} activeRole={activeRole} onRoleChange={onRoleChange}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Startup Dashboard</h1>
          <Button>Complete Profile</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Journey Progress</CardTitle>
              <GraduationCap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Level 4</div>
              <div className="flex items-center space-x-2 mt-2">
                <Progress value={65} className="h-2" />
                <span className="text-xs text-muted-foreground">65%</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">4 modules completed</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mentor Sessions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3/5</div>
              <p className="text-xs text-muted-foreground">Next session in 2 days</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Funding Status</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$125,000</div>
              <p className="text-xs text-muted-foreground">50% of target raised</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Milestones</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">Investor pitch due in 5 days</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="journey">
          <TabsList>
            <TabsTrigger value="journey">Learning Journey</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="funding">Funding Opportunities</TabsTrigger>
          </TabsList>
          <TabsContent value="journey">
            <Card>
              <CardHeader>
                <CardTitle>Your Learning Journey</CardTitle>
                <CardDescription>
                  Track your progress through training modules and skills development.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">Impact Business Model</h3>
                        <p className="text-sm text-muted-foreground">Module 4 of 10</p>
                      </div>
                      <Badge>In Progress</Badge>
                    </div>
                    <Progress value={30} className="h-2" />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">Lesson 2 of 5</span>
                      <span className="text-xs text-muted-foreground">30% completed</span>
                    </div>
                    <Button size="sm" className="mt-3">Continue Learning</Button>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">Investor Relations</h3>
                        <p className="text-sm text-muted-foreground">Module 5 of 10</p>
                      </div>
                      <Badge variant="outline">Locked</Badge>
                    </div>
                    <Progress value={0} className="h-2" />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">Complete Module 4 to unlock</span>
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-md">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium">Sustainable Growth Strategies</h3>
                        <p className="text-sm text-muted-foreground">Module 3 of 10</p>
                      </div>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <Progress value={100} className="h-2" />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">All lessons completed</span>
                      <span className="text-xs text-muted-foreground">Score: 92%</span>
                    </div>
                    <Button size="sm" variant="outline" className="mt-3">Review</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="community">
            <Card>
              <CardHeader>
                <CardTitle>Startup Community</CardTitle>
                <CardDescription>
                  Connect with other startups, mentors, and partners.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Sustainable Technology Forum</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Join 48 other founders discussing the latest in sustainable tech innovation
                        </p>
                        <div className="mt-2">
                          <Button size="sm">Join Discussion</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <MessageSquare className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Mentor Office Hours</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Book a 1:1 session with experts in your field
                        </p>
                        <div className="mt-2">
                          <Button size="sm">Schedule Session</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-start space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Lightbulb className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">Pitch Practice</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Practice your pitch with fellow entrepreneurs and get feedback
                        </p>
                        <div className="mt-2">
                          <Button size="sm">Sign Up</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="funding">
            <Card>
              <CardHeader>
                <CardTitle>Funding Opportunities</CardTitle>
                <CardDescription>
                  Explore available funding and track your applications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">GreenTech Innovation Fund</h3>
                      <Badge className="bg-green-100 text-green-800">Matched</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      For startups focused on sustainable technology solutions
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">$50K - $200K</span>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Impact Accelerator Program</h3>
                      <Badge variant="outline">Deadline: 2 weeks</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      3-month accelerator with mentorship and $75K investment
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">$75K for 5% equity</span>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">Corporate Partnership Grant</h3>
                      <Badge variant="secondary">Application In Progress</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Non-dilutive funding for startups aligned with partner goals
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Up to $100K</span>
                      <Button size="sm" variant="outline">Continue Application</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Find More Opportunities</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StartupDashboard;
