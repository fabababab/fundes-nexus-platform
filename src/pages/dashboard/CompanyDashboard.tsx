
import React from "react";
import { Building2, LineChart, Users, Target, Calendar, MessageSquare, Briefcase, Settings } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CompanyDashboardProps {
  activeRole: "company" | "startup" | "investor";
  onRoleChange: (role: "company" | "startup" | "investor") => void;
}

const CompanyDashboard = ({ activeRole, onRoleChange }: CompanyDashboardProps) => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: Building2,
      url: "#dashboard",
    },
    {
      title: "Impact Analytics",
      icon: LineChart,
      url: "#analytics",
      notifications: 2,
    },
    {
      title: "Partnerships",
      icon: Users,
      url: "#partnerships",
    },
    {
      title: "CSR Goals",
      icon: Target,
      url: "#goals",
    },
    {
      title: "Events",
      icon: Calendar,
      url: "#events",
      notifications: 1,
    },
    {
      title: "Messages",
      icon: MessageSquare,
      url: "#messages",
      notifications: 3,
    },
    {
      title: "Startups",
      icon: Briefcase,
      url: "#startups",
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
          <h1 className="text-3xl font-bold">Company Dashboard</h1>
          <Button>Generate Report</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Impact Score</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">86.5</div>
              <p className="text-xs text-muted-foreground">+2.5% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Partnerships</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 new this quarter</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">CSR Budget Used</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$342,500</div>
              <p className="text-xs text-muted-foreground">68% of annual budget</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Next: Innovation Summit</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="impact">
          <TabsList>
            <TabsTrigger value="impact">Impact Metrics</TabsTrigger>
            <TabsTrigger value="partners">Partner Startups</TabsTrigger>
            <TabsTrigger value="reports">CSR Reports</TabsTrigger>
          </TabsList>
          <TabsContent value="impact">
            <Card>
              <CardHeader>
                <CardTitle>Impact Metrics</CardTitle>
                <CardDescription>
                  Track and visualize your company's environmental and social impact.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {/* Placeholder for impact metrics visualization */}
                <div className="h-[300px] rounded-md border border-dashed flex items-center justify-center">
                  <p className="text-sm text-muted-foreground">Impact analytics visualization</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Download Report</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="partners">
            <Card>
              <CardHeader>
                <CardTitle>Partner Startups</CardTitle>
                <CardDescription>
                  Your current startup partnerships and their progress.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Startup</TableHead>
                      <TableHead>Focus Area</TableHead>
                      <TableHead>Partnership Stage</TableHead>
                      <TableHead>Impact Score</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">EcoTech Solutions</TableCell>
                      <TableCell>Renewable Energy</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                      </TableCell>
                      <TableCell>92</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SocialImpact AI</TableCell>
                      <TableCell>Education</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">Onboarding</span>
                      </TableCell>
                      <TableCell>78</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">CleanWater Tech</TableCell>
                      <TableCell>Water Conservation</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Active</span>
                      </TableCell>
                      <TableCell>85</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">View</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <Button>Find New Startups</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>CSR Reports</CardTitle>
                <CardDescription>
                  Corporate Social Responsibility reports and documentation.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Q2 2025 Impact Report</p>
                      <p className="text-sm text-muted-foreground">Published Apr 8, 2025</p>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">2024 Annual Sustainability Report</p>
                      <p className="text-sm text-muted-foreground">Published Jan 15, 2025</p>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </li>
                  <li className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Community Engagement Summary</p>
                      <p className="text-sm text-muted-foreground">Published Dec 1, 2024</p>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </li>
                </ul>
              </CardContent>
              <CardFooter>
                <Button>Create New Report</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CompanyDashboard;
