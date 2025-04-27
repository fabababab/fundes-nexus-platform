
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Search, Heart, FilterX, DollarSign, Users, Target, Globe } from "lucide-react";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";

const CompanySocialImpact = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor" | "fundes">("company");
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleRoleChange = (role: "company" | "startup" | "investor" | "fundes") => {
    setActiveRole(role);
  };

  // Mock data for initiatives
  const initiatives = [
    {
      id: "init1",
      title: "Clean Water Access",
      description: "Providing clean water infrastructure to rural communities",
      category: "Community",
      location: "Chiapas",
      funding: 75000,
      fundingGoal: 120000,
      impact: "20,000 people will gain access to clean water",
      alignment: 94,
      image: "/placeholder.svg"
    },
    {
      id: "init2",
      title: "Sustainable Agriculture Training",
      description: "Training farmers in sustainable agricultural practices",
      category: "Education",
      location: "Oaxaca",
      funding: 45000,
      fundingGoal: 60000,
      impact: "500 farmers trained in sustainable methods",
      alignment: 88,
      image: "/placeholder.svg"
    },
    {
      id: "init3",
      title: "Recycling Infrastructure",
      description: "Building recycling centers in underserved communities",
      category: "Environment",
      location: "Veracruz",
      funding: 30000,
      fundingGoal: 100000,
      impact: "Reduce landfill waste by 40% in target areas",
      alignment: 96,
      image: "/placeholder.svg"
    },
    {
      id: "init4",
      title: "Women's Entrepreneurship",
      description: "Supporting women-led small businesses with training and microloans",
      category: "Economic Development",
      location: "Multiple Regions",
      funding: 85000,
      fundingGoal: 150000,
      impact: "Support 300 women entrepreneurs",
      alignment: 85,
      image: "/placeholder.svg"
    },
  ];

  const fundedInitiatives = [
    {
      id: "funded1",
      title: "Youth Digital Skills",
      description: "Teaching coding and digital skills to underserved youth",
      category: "Education",
      location: "Mexico City",
      fundingProvided: 80000,
      progress: 65,
      impact: "1,200 students trained in programming",
      alignment: 92,
      image: "/placeholder.svg"
    },
    {
      id: "funded2",
      title: "Green Energy Transition",
      description: "Solar panel installation for small businesses",
      category: "Environment",
      location: "Jalisco",
      fundingProvided: 120000,
      progress: 78,
      impact: "50 businesses converted to solar energy",
      alignment: 94,
      image: "/placeholder.svg"
    },
  ];

  const filteredInitiatives = initiatives.filter(initiative => 
    initiative.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    initiative.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    initiative.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    initiative.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout activeRole={activeRole} onRoleChange={handleRoleChange} pageTitle="Social Impact Initiatives">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <h2 className="text-2xl font-bold">Social Impact Initiatives</h2>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search initiatives..."
                className="pl-8 min-w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <FilterX className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Tabs defaultValue="discover">
          <TabsList>
            <TabsTrigger value="discover" className="flex gap-1">
              <Search className="h-4 w-4" /> Discover
            </TabsTrigger>
            <TabsTrigger value="funded" className="flex gap-1">
              <Heart className="h-4 w-4" /> Funded
            </TabsTrigger>
            <TabsTrigger value="impact" className="flex gap-1">
              <Target className="h-4 w-4" /> Impact Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredInitiatives.length === 0 ? (
                <div className="col-span-full p-8 text-center text-muted-foreground">
                  No initiatives found matching your search.
                </div>
              ) : (
                filteredInitiatives.map((initiative) => (
                  <Card key={initiative.id} className="overflow-hidden">
                    <div className="h-40 overflow-hidden bg-muted">
                      <img 
                        src={initiative.image} 
                        alt={initiative.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start mb-1">
                        <div>
                          <CardTitle>{initiative.title}</CardTitle>
                          <CardDescription>{initiative.category} | {initiative.location}</CardDescription>
                        </div>
                        <div className="bg-primary/10 text-primary text-xs font-semibold rounded-full px-2 py-1 flex items-center gap-1">
                          <Target className="h-3.5 w-3.5" />
                          {initiative.alignment}% Match
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">
                        {initiative.description}
                      </p>
                      
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Funding Progress</span>
                          <span className="font-semibold">${initiative.funding.toLocaleString()} / ${initiative.fundingGoal.toLocaleString()}</span>
                        </div>
                        <Progress value={(initiative.funding / initiative.fundingGoal) * 100} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Globe className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Expected Impact:</span>
                          <span>{initiative.impact}</span>
                        </div>
                      </div>
                      
                      <div className="pt-2 grid grid-cols-2 gap-3">
                        <Button variant="outline" className="w-full">Learn More</Button>
                        <Button className="w-full">Fund Initiative</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="funded" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fundedInitiatives.map((initiative) => (
                <Card key={initiative.id} className="overflow-hidden">
                  <div className="h-40 overflow-hidden bg-muted">
                    <img 
                      src={initiative.image} 
                      alt={initiative.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start mb-1">
                      <div>
                        <CardTitle>{initiative.title}</CardTitle>
                        <CardDescription>{initiative.category} | {initiative.location}</CardDescription>
                      </div>
                      <div className="bg-primary/10 text-primary text-xs font-semibold rounded-full px-2 py-1">
                        Funded: ${initiative.fundingProvided.toLocaleString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {initiative.description}
                    </p>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Implementation Progress</span>
                        <span className="font-semibold">{initiative.progress}%</span>
                      </div>
                      <Progress value={initiative.progress} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Current Impact:</span>
                        <span>{initiative.impact}</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <Button className="w-full">View Progress Report</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="impact" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Social Impact Overview</CardTitle>
                <CardDescription>
                  Cumulative impact of your funded initiatives
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Total Funding Provided</p>
                          <h3 className="text-2xl font-bold">$325,000</h3>
                        </div>
                        <div className="bg-green-100 p-2 rounded-full">
                          <DollarSign className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">People Impacted</p>
                          <h3 className="text-2xl font-bold">24,500</h3>
                        </div>
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Users className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Active Initiatives</p>
                          <h3 className="text-2xl font-bold">7</h3>
                        </div>
                        <div className="bg-purple-100 p-2 rounded-full">
                          <Heart className="h-5 w-5 text-purple-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">ESG Impact Categories</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Environmental</span>
                        <span>40%</span>
                      </div>
                      <Progress value={40} className="h-2 bg-muted" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Social</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2 bg-muted" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Governance</span>
                        <span>15%</span>
                      </div>
                      <Progress value={15} className="h-2 bg-muted" />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-2">Key Achievements</h3>
                  <ul className="space-y-2 list-disc pl-5">
                    <li>Reduced carbon emissions by 15% across partner supply chain</li>
                    <li>1,200 youth trained in digital skills</li>
                    <li>50 small businesses converted to renewable energy</li>
                    <li>Diverted 75 tons of waste from landfills through recycling initiatives</li>
                    <li>Provided clean water access to 20,000 people in rural areas</li>
                  </ul>
                </div>
                
                <div className="flex justify-end">
                  <Button>Download Full Impact Report</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CompanySocialImpact;
