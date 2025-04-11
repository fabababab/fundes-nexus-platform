
import React from "react";
import { PiggyBank, Search, BarChart, Briefcase, Star, Calendar, MessageSquare, Settings } from "lucide-react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface InvestorDashboardProps {
  activeRole: "company" | "startup" | "investor";
  onRoleChange: (role: "company" | "startup" | "investor") => void;
}

const InvestorDashboard = ({ activeRole, onRoleChange }: InvestorDashboardProps) => {
  const menuItems = [
    {
      title: "Dashboard",
      icon: PiggyBank,
      url: "#dashboard",
    },
    {
      title: "Discover Startups",
      icon: Search,
      url: "#discover",
    },
    {
      title: "Portfolio",
      icon: Briefcase,
      url: "#portfolio",
      notifications: 1,
    },
    {
      title: "Performance",
      icon: BarChart,
      url: "#performance",
    },
    {
      title: "Watchlist",
      icon: Star,
      url: "#watchlist",
    },
    {
      title: "Events",
      icon: Calendar,
      url: "#events",
      notifications: 2,
    },
    {
      title: "Messages",
      icon: MessageSquare,
      url: "#messages",
      notifications: 3,
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
          <h1 className="text-3xl font-bold">Investor Dashboard</h1>
          <Button>View Investment Opportunities</Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$1.42M</div>
              <p className="text-xs text-muted-foreground">+12.5% from initial investment</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
              <PiggyBank className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Across 3 impact categories</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Impact Score</CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8.7/10</div>
              <p className="text-xs text-muted-foreground">Top 15% of investors</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Watchlist</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">5 with high match score</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Discover Startups</CardTitle>
              <CardDescription>
                Find promising startups aligned with your investment criteria.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2 mb-6">
                <Input 
                  placeholder="Search by name, sector, or impact area..." 
                  className="flex-1"
                />
                <Button variant="secondary">
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
                <Button>Filter</Button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border rounded-md p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">EcoTech Solutions</h3>
                      <p className="text-sm text-muted-foreground">Renewable Energy • Series A</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">92% Match</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Developing breakthrough solar panel technology with 40% greater efficiency.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm">
                      <span className="font-medium">Seeking:</span> $2.5M
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">Add to Watchlist</Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-md p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">CleanWater Tech</h3>
                      <p className="text-sm text-muted-foreground">Water Conservation • Seed</p>
                    </div>
                    <Badge className="bg-green-100 text-green-800">85% Match</Badge>
                  </div>
                  <p className="text-sm mt-2">
                    Portable water purification systems for underserved communities.
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm">
                      <span className="font-medium">Seeking:</span> $800K
                    </div>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">Add to Watchlist</Button>
                      <Button size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">View More Startups</Button>
            </CardFooter>
          </Card>

          <Tabs defaultValue="portfolio">
            <TabsList>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="upcoming">Upcoming Milestones</TabsTrigger>
            </TabsList>
            <TabsContent value="portfolio">
              <Card>
                <CardHeader>
                  <CardTitle>Your Investment Portfolio</CardTitle>
                  <CardDescription>
                    Track all your current startup investments.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Startup</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Investment</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">SolarInnovate</TableCell>
                        <TableCell>Clean Energy</TableCell>
                        <TableCell>$450,000</TableCell>
                        <TableCell>Oct 2024</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">On Track</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Edu-Tech Connect</TableCell>
                        <TableCell>Education</TableCell>
                        <TableCell>$300,000</TableCell>
                        <TableCell>May 2024</TableCell>
                        <TableCell>
                          <Badge className="bg-amber-100 text-amber-800">Needs Attention</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">AgriSmart</TableCell>
                        <TableCell>Sustainable Agriculture</TableCell>
                        <TableCell>$250,000</TableCell>
                        <TableCell>Jan 2024</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">On Track</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">View Details</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter>
                  <Button variant="outline">Export Portfolio Data</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="performance">
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio Performance</CardTitle>
                  <CardDescription>
                    Financial and impact metrics of your investments.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Placeholder for performance charts */}
                  <div className="h-[300px] rounded-md border border-dashed flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">Performance analytics visualization</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="upcoming">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Milestones</CardTitle>
                  <CardDescription>
                    Important dates and events for your portfolio companies.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">SolarInnovate Product Launch</p>
                        <p className="text-sm text-muted-foreground">April 20, 2025</p>
                      </div>
                      <Button size="sm">Add to Calendar</Button>
                    </li>
                    <li className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">Edu-Tech Connect Series B Round</p>
                        <p className="text-sm text-muted-foreground">May 15, 2025</p>
                      </div>
                      <Button size="sm">Add to Calendar</Button>
                    </li>
                    <li className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">AgriSmart Expansion Report</p>
                        <p className="text-sm text-muted-foreground">June 1, 2025</p>
                      </div>
                      <Button size="sm">Add to Calendar</Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InvestorDashboard;
