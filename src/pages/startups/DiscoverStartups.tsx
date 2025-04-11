
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Filter, Search, ArrowUpDown, Star, MapPin } from "lucide-react";

interface Startup {
  id: string;
  name: string;
  logo: string;
  description: string;
  category: string;
  location: string;
  fundingStage: string;
  raised: string;
  valuation: string;
  trending: boolean;
  isWatchlisted: boolean;
}

const DiscoverStartups = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor">("investor");
  const [searchQuery, setSearchQuery] = useState("");

  const startups: Startup[] = [
    {
      id: "1",
      name: "EcoTech Solutions",
      logo: "/placeholder.svg",
      description: "Developing sustainable energy solutions for commercial buildings.",
      category: "CleanTech",
      location: "San Francisco, CA",
      fundingStage: "Series A",
      raised: "$3.2M",
      valuation: "$15M",
      trending: true,
      isWatchlisted: true
    },
    {
      id: "2",
      name: "MedAI Health",
      logo: "/placeholder.svg",
      description: "AI-powered diagnostic platform for early disease detection.",
      category: "HealthTech",
      location: "Boston, MA",
      fundingStage: "Seed",
      raised: "$1.5M",
      valuation: "$8M",
      trending: true,
      isWatchlisted: false
    },
    {
      id: "3",
      name: "FinSwift",
      logo: "/placeholder.svg",
      description: "Next-generation payment processing for emerging markets.",
      category: "FinTech",
      location: "New York, NY",
      fundingStage: "Pre-seed",
      raised: "$750K",
      valuation: "$4M",
      trending: false,
      isWatchlisted: false
    },
    {
      id: "4",
      name: "Urban Farming Co.",
      logo: "/placeholder.svg",
      description: "Vertical farming solutions for urban environments.",
      category: "AgTech",
      location: "Chicago, IL",
      fundingStage: "Series A",
      raised: "$4.5M",
      valuation: "$22M",
      trending: false,
      isWatchlisted: true
    },
    {
      id: "5",
      name: "NanoLearn",
      logo: "/placeholder.svg",
      description: "Microlearning platform for corporate training.",
      category: "EdTech",
      location: "Austin, TX",
      fundingStage: "Seed",
      raised: "$2.1M",
      valuation: "$9M",
      trending: true,
      isWatchlisted: false
    }
  ];

  return (
    <DashboardLayout 
      activeRole={activeRole} 
      onRoleChange={setActiveRole}
      pageTitle="Discover Startups"
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search startups by name, industry, location..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ArrowUpDown className="h-4 w-4" />
            </Button>
            <Button>Advanced Search</Button>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Startups</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="watchlist">Watchlist</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {startups.map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="trending" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {startups.filter(s => s.trending).map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="recommended" className="space-y-4 mt-4">
            <div className="flex items-center justify-center h-40 border border-dashed rounded-lg">
              <p className="text-sm text-muted-foreground">Recommended startups will appear based on your investment criteria</p>
            </div>
          </TabsContent>
          
          <TabsContent value="watchlist" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {startups.filter(s => s.isWatchlisted).map((startup) => (
                <StartupCard key={startup.id} startup={startup} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

const StartupCard = ({ startup }: { startup: Startup }) => {
  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center text-lg font-bold">
            {startup.name.charAt(0)}
          </div>
          <div>
            <CardTitle className="text-lg">{startup.name}</CardTitle>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {startup.location}
            </div>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Star className={`h-4 w-4 ${startup.isWatchlisted ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`} />
        </Button>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{startup.description}</p>
        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="outline">{startup.category}</Badge>
          <Badge variant="outline">{startup.fundingStage}</Badge>
        </div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Raised</p>
            <p className="font-medium">{startup.raised}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Valuation</p>
            <p className="font-medium">{startup.valuation}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiscoverStartups;
