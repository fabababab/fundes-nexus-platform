import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChartHorizontal, Circle, Download, LineChart, Recycle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";
import { UserRole } from "@/types/common";

const CompanyESGDashboard = () => {
  const [activeRole, setActiveRole] = useState<UserRole>("msme");
  const [timeframe, setTimeframe] = useState<"quarterly" | "yearly" | "monthly">("quarterly");

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
  };

  const goals = [
    {
      id: 1,
      name: "Waste Reduction",
      description: "Circular packaging waste reduction",
      progress: 68,
      target: "100 tons",
      current: "68 tons",
      icon: Recycle,
      status: "On track",
    },
    {
      id: 2,
      name: "CO2 Emissions",
      description: "Reduce carbon footprint",
      progress: 42,
      target: "30% reduction",
      current: "12.6% reduction",
      icon: Target,
      status: "Needs attention",
    },
    {
      id: 3,
      name: "Distributor Education",
      description: "Business principles training completion",
      progress: 85,
      target: "1000 hours",
      current: "850 hours",
      icon: Circle,
      status: "On track",
    },
    {
      id: 4,
      name: "Water Conservation",
      description: "Reduce water usage in production",
      progress: 75,
      target: "25% reduction",
      current: "18.75% reduction",
      icon: Circle,
      status: "On track",
    },
  ];

  return (
    <DashboardLayout activeRole={activeRole} onRoleChange={handleRoleChange} pageTitle="ESG Goals Dashboard">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">ESG Performance</h2>
          <div className="flex gap-2">
            <Select value={timeframe} onValueChange={(value: "quarterly" | "yearly" | "monthly") => setTimeframe(value)}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="w-full max-w-md">
            <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
            <TabsTrigger value="environmental" className="flex-1">Environmental</TabsTrigger>
            <TabsTrigger value="social" className="flex-1">Social</TabsTrigger>
            <TabsTrigger value="governance" className="flex-1">Governance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              {goals.map((goal) => (
                <Card key={goal.id}>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div className="space-y-1">
                      <CardTitle className="text-sm font-medium">{goal.name}</CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                    <goal.icon className="h-5 w-5 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-muted-foreground flex justify-between mb-1">
                      <span>Progress: {goal.current}</span>
                      <span>Target: {goal.target}</span>
                    </div>
                    <Progress value={goal.progress} className="h-2" />
                    <div className="flex justify-between mt-2">
                      <span className="text-xs text-muted-foreground">{goal.progress}%</span>
                      <span 
                        className={`text-xs font-medium ${
                          goal.status === "On track" ? "text-green-600" : "text-amber-600"
                        }`}
                      >
                        {goal.status}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>ESG Overview</CardTitle>
                <CardDescription>
                  Your overall ESG performance for {timeframe === "quarterly" ? "Q2 2025" : timeframe === "yearly" ? "2025" : "May 2025"}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1 p-4 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-green-600" />
                    <h3 className="font-semibold">Environmental</h3>
                  </div>
                  <p className="text-3xl font-bold">78<span className="text-sm font-normal text-muted-foreground">/100</span></p>
                  <p className="text-sm text-muted-foreground">+5 from last period</p>
                </div>
                <div className="flex flex-col gap-1 p-4 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <BarChartHorizontal className="h-5 w-5 text-blue-600" />
                    <h3 className="font-semibold">Social</h3>
                  </div>
                  <p className="text-3xl font-bold">85<span className="text-sm font-normal text-muted-foreground">/100</span></p>
                  <p className="text-sm text-muted-foreground">+2 from last period</p>
                </div>
                <div className="flex flex-col gap-1 p-4 border rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-purple-600" />
                    <h3 className="font-semibold">Governance</h3>
                  </div>
                  <p className="text-3xl font-bold">91<span className="text-sm font-normal text-muted-foreground">/100</span></p>
                  <p className="text-sm text-muted-foreground">Same as last period</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environmental" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Performance</CardTitle>
                <CardDescription>Detailed metrics on environmental goals and initiatives</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Detailed environmental metrics will be displayed here, including carbon footprint, waste management, 
                    water usage, and energy consumption data with historical comparisons.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Impact</CardTitle>
                <CardDescription>Education, community involvement, and supplier relationships</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Detailed social metrics will be displayed here, including education hours provided,
                    community engagement metrics, supplier diversity, and labor practice assessments.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="governance" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Governance Standards</CardTitle>
                <CardDescription>Ethics, compliance, and corporate governance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Detailed governance metrics will be displayed here, including ethics policy compliance,
                    board diversity metrics, transparency indicators, and stakeholder engagement metrics.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CompanyESGDashboard;
