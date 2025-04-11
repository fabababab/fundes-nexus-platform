
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart4, TrendingUp, TrendingDown, BarChart2, PieChart, Filter } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Investment {
  id: string;
  companyName: string;
  investmentDate: string;
  investmentAmount: number;
  currentValue: number;
  equity: number;
  performancePercent: number;
  isPositive: boolean;
}

const Portfolio = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor">("investor");

  const portfolioSummary = {
    totalInvested: "$1.45M",
    currentValue: "$2.12M",
    totalReturn: "+46.2%",
    numberOfStartups: 8,
  };

  const investments: Investment[] = [
    {
      id: "1",
      companyName: "EcoTech Solutions",
      investmentDate: "Mar 2024",
      investmentAmount: 250000,
      currentValue: 375000,
      equity: 5.2,
      performancePercent: 50,
      isPositive: true
    },
    {
      id: "2",
      companyName: "MedAI Health",
      investmentDate: "Jan 2024",
      investmentAmount: 180000,
      currentValue: 225000,
      equity: 3.8,
      performancePercent: 25,
      isPositive: true
    },
    {
      id: "3",
      companyName: "Urban Farming Co.",
      investmentDate: "Nov 2023",
      investmentAmount: 320000,
      currentValue: 448000,
      equity: 6.5,
      performancePercent: 40,
      isPositive: true
    },
    {
      id: "4",
      companyName: "DataSync",
      investmentDate: "Aug 2023",
      investmentAmount: 200000,
      currentValue: 160000,
      equity: 4.2,
      performancePercent: 20,
      isPositive: false
    },
    {
      id: "5",
      companyName: "GreenCommute",
      investmentDate: "May 2023",
      investmentAmount: 150000,
      currentValue: 195000,
      equity: 3.0,
      performancePercent: 30,
      isPositive: true
    }
  ];

  const performanceData = [
    { month: 'Apr', value: 1450000 },
    { month: 'May', value: 1520000 },
    { month: 'Jun', value: 1485000 },
    { month: 'Jul', value: 1560000 },
    { month: 'Aug', value: 1645000 },
    { month: 'Sep', value: 1730000 },
    { month: 'Oct', value: 1795000 },
    { month: 'Nov', value: 1860000 },
    { month: 'Dec', value: 1980000 },
    { month: 'Jan', value: 2050000 },
    { month: 'Feb', value: 2120000 },
    { month: 'Mar', value: 2120000 }
  ];

  return (
    <DashboardLayout 
      activeRole={activeRole} 
      onRoleChange={setActiveRole}
      pageTitle="Portfolio"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invested</CardTitle>
              <BarChart4 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioSummary.totalInvested}</div>
              <p className="text-xs text-muted-foreground">Across {portfolioSummary.numberOfStartups} startups</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Value</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{portfolioSummary.currentValue}</div>
              <p className="text-xs text-muted-foreground">Updated today</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Return</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">{portfolioSummary.totalReturn}</div>
              <p className="text-xs text-muted-foreground">Since first investment</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">IRR</CardTitle>
              <BarChart2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.5%</div>
              <p className="text-xs text-muted-foreground">Annual return rate</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>12-month portfolio value</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis 
                  tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`} 
                />
                <Tooltip 
                  formatter={(value) => [`$${(Number(value) / 1000).toFixed(1)}K`, 'Value']}
                  labelFormatter={(label) => `${label} 2024`}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">My Investments</h2>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {investments.map((investment) => (
              <InvestmentCard key={investment.id} investment={investment} />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const InvestmentCard = ({ investment }: { investment: Investment }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">{investment.companyName}</CardTitle>
          <Badge variant={investment.isPositive ? "default" : "destructive"} className="ml-2">
            {investment.isPositive ? "+" : "-"}{investment.performancePercent}%
          </Badge>
        </div>
        <CardDescription>Invested {investment.investmentDate}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Invested</p>
            <p className="font-medium">${(investment.investmentAmount / 1000).toFixed(1)}K</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Current Value</p>
            <p className="font-medium">${(investment.currentValue / 1000).toFixed(1)}K</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Equity</p>
            <p className="font-medium">{investment.equity}%</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Return</p>
            <p className={`font-medium ${investment.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {investment.isPositive ? "+" : "-"}${Math.abs((investment.currentValue - investment.investmentAmount)/1000).toFixed(1)}K
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Portfolio;
