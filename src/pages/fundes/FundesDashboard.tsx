
import React, { useState } from "react";
import { 
  BarChart4, 
  Users, 
  Building2, 
  Briefcase, 
  Bell, 
  TrendingUp, 
  Target, 
  AlertCircle,
  Calendar,
  MessageSquare
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";

interface FundesDashboardProps {
  activeRole?: "company" | "startup" | "investor" | "fundes";
}

const FundesDashboard: React.FC<FundesDashboardProps> = ({ activeRole = "fundes" }) => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: "funding", message: "TechInnovate startup reached 75% of funding goal", time: "10 min ago", urgent: true },
    { id: 2, type: "meeting", message: "Strategic meeting with GreenTech investors tomorrow", time: "1 hour ago", urgent: false },
    { id: 3, type: "data", message: "Impact data discrepancy in Project Blue Ocean", time: "2 hours ago", urgent: true },
    { id: 4, type: "milestone", message: "EcoSolutions has completed Phase 1 development", time: "Yesterday", urgent: false },
    { id: 5, type: "funding", message: "New investor interested in healthcare portfolio", time: "Yesterday", urgent: false }
  ]);

  const [currentRole, setCurrentRole] = useState<"company" | "startup" | "investor" | "fundes">("fundes");
  
  const handleRoleChange = (role: "company" | "startup" | "investor" | "fundes") => {
    setCurrentRole(role);
  };

  // Sample data for charts
  const investmentData = [
    { name: "Clean Energy", value: 35 },
    { name: "Healthcare", value: 25 },
    { name: "Education", value: 15 },
    { name: "Agriculture", value: 15 },
    { name: "Fintech", value: 10 }
  ];

  const progressData = [
    { name: "Q1", company: 65, startup: 45, investor: 80 },
    { name: "Q2", company: 75, startup: 60, investor: 70 },
    { name: "Q3", company: 85, startup: 75, investor: 90 },
    { name: "Q4", company: 80, startup: 85, investor: 85 }
  ];

  const upcomingMeetings = [
    { id: 1, title: "Portfolio Review", date: "Today, 2:00 PM", participants: "Investors, Startups" },
    { id: 2, title: "Impact Assessment", date: "Tomorrow, 10:00 AM", participants: "All Stakeholders" },
    { id: 3, title: "Funding Strategy", date: "Apr 17, 11:30 AM", participants: "Investment Committee" }
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "funding": return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case "meeting": return <Calendar className="h-5 w-5 text-green-500" />;
      case "data": return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "milestone": return <Target className="h-5 w-5 text-purple-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  const chartConfig = {
    company: { label: "Company", theme: { light: "#0ea5e9" } },
    startup: { label: "Startup", theme: { light: "#10b981" } },
    investor: { label: "Investor", theme: { light: "#8b5cf6" } }
  };

  return (
    <DashboardLayout
      activeRole={currentRole as "company" | "startup" | "investor"}
      onRoleChange={handleRoleChange as (role: "company" | "startup" | "investor") => void}
      pageTitle="Fundes Dashboard"
    >
      <div className="space-y-6">
        {/* Global Overview */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Global Overview</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">42</div>
                <p className="text-xs text-muted-foreground">+8 from last quarter</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Investment</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12.4M</div>
                <p className="text-xs text-muted-foreground">+18% year over year</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87/100</div>
                <p className="text-xs text-muted-foreground">+5 from baseline</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Partnerships</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">68</div>
                <p className="text-xs text-muted-foreground">Across 12 industries</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Investment Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={investmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {investmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quarterly Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-full"
                  >
                    <BarChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip 
                        content={<ChartTooltipContent />} 
                      />
                      <Bar dataKey="company" fill="var(--color-company)" name="company" />
                      <Bar dataKey="startup" fill="var(--color-startup)" name="startup" />
                      <Bar dataKey="investor" fill="var(--color-investor)" name="investor" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Stakeholder Snapshots */}
        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="bg-[#0EA5E9]/10 border-b border-[#0EA5E9]/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-md font-semibold flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-[#0EA5E9]" /> 
                  Companies
                </CardTitle>
                <span className="bg-[#0EA5E9]/20 text-[#0EA5E9] text-xs px-2 py-1 rounded-full">12 Active</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>CSR Goal Progress</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Startup Collaborations</span>
                    <span className="font-medium">8/10</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Top Performer</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      EC
                    </div>
                    <div>
                      <p className="font-medium">EcoTech Solutions</p>
                      <p className="text-xs text-muted-foreground">5 active projects</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-[#10b981]/10 border-b border-[#10b981]/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-md font-semibold flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-[#10b981]" /> 
                  Startups
                </CardTitle>
                <span className="bg-[#10b981]/20 text-[#10b981] text-xs px-2 py-1 rounded-full">24 Active</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Funding Progress</span>
                    <span className="font-medium">62%</span>
                  </div>
                  <Progress value={62} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Mentorship Engagement</span>
                    <span className="font-medium">88%</span>
                  </div>
                  <Progress value={88} className="h-2" />
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Rising Star</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                      BI
                    </div>
                    <div>
                      <p className="font-medium">BioInnovate</p>
                      <p className="text-xs text-muted-foreground">215% growth this quarter</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-[#8b5cf6]/10 border-b border-[#8b5cf6]/20">
              <div className="flex items-center justify-between">
                <CardTitle className="text-md font-semibold flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-[#8b5cf6]" /> 
                  Investors
                </CardTitle>
                <span className="bg-[#8b5cf6]/20 text-[#8b5cf6] text-xs px-2 py-1 rounded-full">18 Active</span>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Deployment Rate</span>
                    <span className="font-medium">84%</span>
                  </div>
                  <Progress value={84} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Portfolio Performance</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Most Active</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                      GV
                    </div>
                    <div>
                      <p className="font-medium">Green Ventures</p>
                      <p className="text-xs text-muted-foreground">8 new investments</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Notifications and Meetings */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Real-time Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" /> Notifications
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`flex items-start gap-3 p-3 rounded-lg ${notification.urgent ? 'bg-red-50 border border-red-100' : 'bg-gray-50 border border-gray-100'}`}
                    >
                      <div className="mt-0.5">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => dismissNotification(notification.id)}
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Dismiss</span>
                        <span className="text-xs">✕</span>
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground">
                    <Bell className="h-10 w-10 mb-2 opacity-20" />
                    <p>No new notifications</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Meetings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" /> Upcoming Meetings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Meeting</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Participants</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingMeetings.map((meeting) => (
                    <TableRow key={meeting.id}>
                      <TableCell className="font-medium">{meeting.title}</TableCell>
                      <TableCell>{meeting.date}</TableCell>
                      <TableCell>{meeting.participants}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm" className="w-full">
                  <Calendar className="mr-2 h-4 w-4" /> View All Meetings
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FundesDashboard;
