import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";

const allocations = [
  { name: "Technology", value: 35 },
  { name: "Healthcare", value: 25 },
  { name: "Sustainability", value: 20 },
  { name: "Fintech", value: 15 },
  { name: "Others", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

const performanceData = [
  {
    month: "Jan",
    portfolio: 12,
    benchmark: 10,
  },
  {
    month: "Feb",
    portfolio: 18,
    benchmark: 12,
  },
  {
    month: "Mar",
    portfolio: 14,
    benchmark: 13,
  },
  {
    month: "Apr",
    portfolio: 22,
    benchmark: 15,
  },
  {
    month: "May",
    portfolio: 25,
    benchmark: 18,
  },
  {
    month: "Jun",
    portfolio: 32,
    benchmark: 20,
  },
];

const investments = [
  {
    id: 1,
    name: "Green Energy Solutions",
    invested: 250000,
    currentValue: 320000,
    roi: 28,
    sector: "Sustainability",
    stage: "Series A",
    trend: "up",
    riskRating: "Medium",
  },
  {
    id: 2,
    name: "HealthTech Innovations",
    invested: 500000,
    currentValue: 580000,
    roi: 16,
    sector: "Healthcare",
    stage: "Series B",
    trend: "up",
    riskRating: "Low",
  },
  {
    id: 3,
    name: "FinSecure",
    invested: 350000,
    currentValue: 280000,
    roi: -20,
    sector: "Fintech",
    stage: "Seed",
    trend: "down",
    riskRating: "High",
  },
  {
    id: 4,
    name: "AI Analytics Platform",
    invested: 400000,
    currentValue: 520000,
    roi: 30,
    sector: "Technology",
    stage: "Series A",
    trend: "up",
    riskRating: "Medium",
  },
  {
    id: 5,
    name: "Smart Manufacturing",
    invested: 300000,
    currentValue: 330000,
    roi: 10,
    sector: "Technology",
    stage: "Seed",
    trend: "up",
    riskRating: "Medium",
  },
];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
};

const Portfolio = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor" | "fundes">("investor");

  const handleRoleChange = (role: "company" | "startup" | "investor" | "fundes") => {
    setActiveRole(role);
  };

  const totalInvested = investments.reduce((acc, curr) => acc + curr.invested, 0);
  const currentValue = investments.reduce((acc, curr) => acc + curr.currentValue, 0);
  const overallReturn = ((currentValue - totalInvested) / totalInvested) * 100;

  return (
    <DashboardLayout activeRole={activeRole} onRoleChange={handleRoleChange} pageTitle="Impact Portfolio">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Impact Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(totalInvested)}</div>
              <p className="text-xs text-muted-foreground">
                Across {investments.length} impact projects
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Current Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(currentValue)}</div>
              <p className="text-xs text-muted-foreground">
                {overallReturn >= 0 ? "+" : ""}{overallReturn.toFixed(2)}% social return
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available for Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatCurrency(750000)}</div>
              <p className="text-xs text-muted-foreground">
                Ready to deploy for social impact
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Allocation</CardTitle>
              <CardDescription>
                Distribution by sector
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocations}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {allocations.map((entry, index) => (
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
              <CardTitle>Performance</CardTitle>
              <CardDescription>
                Portfolio vs Benchmark
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={performanceData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="portfolio"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="benchmark" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Investments</CardTitle>
            <CardDescription>
              Your active startup investments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Investments</TabsTrigger>
                <TabsTrigger value="performing">Top Performing</TabsTrigger>
                <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-6">
                  {investments.map((investment) => (
                    <Card key={investment.id}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle>{investment.name}</CardTitle>
                          <Badge variant={investment.trend === "up" ? "default" : "destructive"}>
                            {investment.roi >= 0 ? "+" : ""}{investment.roi}% ROI
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{investment.sector}</Badge>
                          <Badge variant="outline">{investment.stage}</Badge>
                          <Badge variant="outline" className={
                            investment.riskRating === "Low" ? "bg-green-100 text-green-800" :
                            investment.riskRating === "Medium" ? "bg-yellow-100 text-yellow-800" :
                            "bg-red-100 text-red-800"
                          }>
                            {investment.riskRating} Risk
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm font-medium">Invested</p>
                            <p className="text-lg">{formatCurrency(investment.invested)}</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">Current Value</p>
                            <p className="text-lg">{formatCurrency(investment.currentValue)}</p>
                          </div>
                        </div>
                        <div className="mt-4">
                          <p className="text-sm mb-1">Performance</p>
                          <Progress value={investment.roi + 40} className="h-2" />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="performing">
                <div className="space-y-6">
                  {investments
                    .filter((i) => i.roi > 15)
                    .map((investment) => (
                      <Card key={investment.id}>
                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between">
                            <CardTitle>{investment.name}</CardTitle>
                            <Badge variant="default">
                              +{investment.roi}% ROI
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{investment.sector}</Badge>
                            <Badge variant="outline">{investment.stage}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm font-medium">Invested</p>
                              <p className="text-lg">{formatCurrency(investment.invested)}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Current Value</p>
                              <p className="text-lg">{formatCurrency(investment.currentValue)}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <p className="text-sm mb-1">Performance</p>
                            <Progress value={investment.roi + 40} className="h-2" />
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">View Details</Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="watchlist">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-gray-100 p-3">
                    <svg
                      className="h-6 w-6 text-gray-500"
                      fill="none"
                      height="24"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      width="24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </div>
                  <h3 className="mt-4 text-lg font-medium">Your watchlist is empty</h3>
                  <p className="mt-2 text-center text-gray-500">
                    Add startups to your watchlist to track them before investing.
                  </p>
                  <Button className="mt-4">Browse Startups</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Portfolio;
