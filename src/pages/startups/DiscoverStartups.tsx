import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";
import { UserRole } from "@/types/common";

interface Startup {
  id: number;
  name: string;
  logo: string;
  description: string;
  industry: string;
  location: string;
  stage: string;
  raised: number;
  goal: number;
  investors: number;
  trend: "up" | "down" | "stable";
  tags: string[];
}

const DiscoverStartups = () => {
  const [activeRole, setActiveRole] = useState<UserRole>("investor");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [selectedStage, setSelectedStage] = useState("");

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
  };

  const startups: Startup[] = [
    {
      id: 1,
      name: "GreenTech Solutions",
      logo: "/placeholder.svg",
      description: "Developing sustainable energy solutions using innovative solar technology.",
      industry: "CleanTech",
      location: "San Francisco, CA",
      stage: "Series A",
      raised: 2500000,
      goal: 4000000,
      investors: 12,
      trend: "up",
      tags: ["Sustainability", "Solar", "Energy"]
    },
    {
      id: 2,
      name: "MediHealth AI",
      logo: "/placeholder.svg",
      description: "AI-powered diagnostics platform for early disease detection.",
      industry: "Healthcare",
      location: "Boston, MA",
      stage: "Seed",
      raised: 750000,
      goal: 1500000,
      investors: 5,
      trend: "up",
      tags: ["AI", "Healthcare", "Diagnostics"]
    },
    {
      id: 3,
      name: "FinSecure",
      logo: "/placeholder.svg",
      description: "Blockchain-based security solutions for financial institutions.",
      industry: "Fintech",
      location: "New York, NY",
      stage: "Series B",
      raised: 8000000,
      goal: 10000000,
      investors: 15,
      trend: "stable",
      tags: ["Blockchain", "Security", "Finance"]
    },
    {
      id: 4,
      name: "EduLearn Platform",
      logo: "/placeholder.svg",
      description: "Personalized learning platform for K-12 students using adaptive technology.",
      industry: "EdTech",
      location: "Chicago, IL",
      stage: "Seed",
      raised: 500000,
      goal: 1000000,
      investors: 3,
      trend: "down",
      tags: ["Education", "Software", "AI"]
    },
    {
      id: 5,
      name: "UrbanFarm",
      logo: "/placeholder.svg",
      description: "Indoor vertical farming solutions for urban environments.",
      industry: "AgTech",
      location: "Portland, OR",
      stage: "Pre-seed",
      raised: 300000,
      goal: 500000,
      investors: 2,
      trend: "up",
      tags: ["Agriculture", "Sustainability", "Food"]
    },
    {
      id: 6,
      name: "Quantum Computing Labs",
      logo: "/placeholder.svg",
      description: "Developing practical quantum computing solutions for businesses.",
      industry: "DeepTech",
      location: "Seattle, WA",
      stage: "Series A",
      raised: 3500000,
      goal: 5000000,
      investors: 8,
      trend: "stable",
      tags: ["Quantum", "Computing", "Research"]
    }
  ];

  const filteredStartups = startups.filter(startup => {
    const matchesSearch = startup.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         startup.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "" || startup.industry === selectedIndustry;
    const matchesStage = selectedStage === "" || startup.stage === selectedStage;
    return matchesSearch && matchesIndustry && matchesStage;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const industries = Array.from(new Set(startups.map(startup => startup.industry)));
  const stages = Array.from(new Set(startups.map(startup => startup.stage)));

  return (
    <DashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="Discover Startups"
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search startups..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Industry" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-industries">All Industries</SelectItem>
                {industries.map(industry => (
                  <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Funding Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-stages">All Stages</SelectItem>
                {stages.map(stage => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Startups</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredStartups.map((startup) => (
                <Card key={startup.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold">
                          {startup.name.charAt(0)}
                        </div>
                        <div>
                          <CardTitle>{startup.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{startup.location}</p>
                        </div>
                      </div>
                      <Badge variant={
                        startup.trend === "up" ? "default" : 
                        startup.trend === "down" ? "destructive" : "outline"
                      }>
                        {startup.stage}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{startup.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {startup.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">{tag}</Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Funding Progress</span>
                          <span>
                            {formatCurrency(startup.raised)} / {formatCurrency(startup.goal)}
                          </span>
                        </div>
                        <Progress value={(startup.raised / startup.goal) * 100} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm">
                          <span className="text-muted-foreground">Industry:</span> {startup.industry}
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Investors:</span> {startup.investors}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline">Company Profile</Button>
                    <Button>Connect</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredStartups.length === 0 && (
              <div className="text-center py-12">
                <div className="rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">No startups found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedIndustry("");
                    setSelectedStage("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="trending">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-gray-100 p-3">
                <ChevronDown className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Trending Startups</h3>
              <p className="mt-2 text-center text-gray-500 max-w-md">
                Explore the most popular startups getting attention from investors this week.
              </p>
              <Button variant="outline" className="mt-4">Coming Soon</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="recommended">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-gray-100 p-3">
                <ChevronDown className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Personalized Recommendations</h3>
              <p className="mt-2 text-center text-gray-500 max-w-md">
                We'll recommend startups based on your interests and investment history.
              </p>
              <Button variant="outline" className="mt-4">Set Up Preferences</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="recent">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="rounded-full bg-gray-100 p-3">
                <ChevronDown className="h-6 w-6 text-gray-500" />
              </div>
              <h3 className="mt-4 text-lg font-medium">Recently Added</h3>
              <p className="mt-2 text-center text-gray-500 max-w-md">
                Discover the newest startups that have joined our platform.
              </p>
              <Button variant="outline" className="mt-4">Coming Soon</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DiscoverStartups;
