
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, ChevronDown, Bookmark, Heart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Project {
  id: number;
  name: string;
  logo: string;
  description: string;
  sector: string;
  location: string;
  size: "Small" | "Medium" | "Large";
  raised: number;
  goal: number;
  donors: number;
  sdgGoals: string[];
  impact: string[];
  expertiseNeeded: string[];
  timeline: string;
  region: string;
}

const DiscoverProjects = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor" | "fundes">("investor");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSector, setSelectedSector] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedImpactArea, setSelectedImpactArea] = useState("");
  const [favoriteProjects, setFavoriteProjects] = useState<number[]>([]);
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);

  const handleRoleChange = (role: "company" | "startup" | "investor" | "fundes") => {
    setActiveRole(role);
  };

  const toggleFavorite = (projectId: number) => {
    setFavoriteProjects(prev => 
      prev.includes(projectId) ? prev.filter(id => id !== projectId) : [...prev, projectId]
    );
  };

  const toggleSelected = (projectId: number) => {
    setSelectedProjects(prev => 
      prev.includes(projectId) ? prev.filter(id => id !== projectId) : [...prev, projectId]
    );
  };

  const projects: Project[] = [
    {
      id: 1,
      name: "Clean Water Initiative",
      logo: "/placeholder.svg",
      description: "Providing clean water access to rural communities using innovative filtration technology.",
      sector: "Water & Sanitation",
      location: "East Africa",
      size: "Medium",
      raised: 120000,
      goal: 350000,
      donors: 8,
      sdgGoals: ["Clean Water & Sanitation", "Good Health"],
      impact: ["15,000 people served", "30% reduction in waterborne diseases"],
      expertiseNeeded: ["Water Engineering", "Community Engagement"],
      timeline: "18 months",
      region: "Africa"
    },
    {
      id: 2,
      name: "Solar for Schools",
      logo: "/placeholder.svg",
      description: "Installing solar panels in underfunded schools to provide reliable electricity and reduce carbon footprint.",
      sector: "Renewable Energy",
      location: "Southeast Asia",
      size: "Small",
      raised: 75000,
      goal: 200000,
      donors: 12,
      sdgGoals: ["Quality Education", "Affordable Clean Energy"],
      impact: ["50 schools powered", "200 tons CO2 reduction yearly"],
      expertiseNeeded: ["Solar Engineering", "Education"],
      timeline: "12 months",
      region: "Asia"
    },
    {
      id: 3,
      name: "Agricultural Training Hub",
      logo: "/placeholder.svg",
      description: "Establishing a training center for sustainable farming techniques and providing microloans for small-scale farmers.",
      sector: "Agriculture",
      location: "South America",
      size: "Large",
      raised: 450000,
      goal: 800000,
      donors: 15,
      sdgGoals: ["Zero Hunger", "No Poverty"],
      impact: ["500 farmers trained", "35% income increase"],
      expertiseNeeded: ["Agricultural Science", "Microfinance"],
      timeline: "24 months",
      region: "Americas"
    },
    {
      id: 4,
      name: "Women's Healthcare Mobile Clinic",
      logo: "/placeholder.svg",
      description: "Mobile clinics bringing essential healthcare services to women in remote areas.",
      sector: "Healthcare",
      location: "South Asia",
      size: "Medium",
      raised: 280000,
      goal: 500000,
      donors: 9,
      sdgGoals: ["Good Health", "Gender Equality"],
      impact: ["10,000 women served", "40% reduction in maternal mortality"],
      expertiseNeeded: ["Healthcare", "Logistics"],
      timeline: "18 months",
      region: "Asia"
    },
    {
      id: 5,
      name: "Digital Literacy for Youth",
      logo: "/placeholder.svg",
      description: "Providing digital skills training to underprivileged youth to improve employment opportunities.",
      sector: "Education",
      location: "Urban Centers Globally",
      size: "Small",
      raised: 95000,
      goal: 150000,
      donors: 7,
      sdgGoals: ["Quality Education", "Decent Work"],
      impact: ["2,000 youth trained", "75% secured employment"],
      expertiseNeeded: ["IT Education", "Career Development"],
      timeline: "12 months",
      region: "Global"
    },
    {
      id: 6,
      name: "Reforestation & Community Development",
      logo: "/placeholder.svg",
      description: "Combining reforestation efforts with sustainable livelihoods for indigenous communities.",
      sector: "Environment",
      location: "Central America",
      size: "Large",
      raised: 580000,
      goal: 1200000,
      donors: 18,
      sdgGoals: ["Climate Action", "Life on Land", "No Poverty"],
      impact: ["250,000 trees planted", "10 communities supported"],
      expertiseNeeded: ["Forestry", "Indigenous Relations"],
      timeline: "36 months",
      region: "Americas"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSector = selectedSector === "" || project.sector === selectedSector;
    const matchesSize = selectedSize === "" || project.size === selectedSize;
    const matchesRegion = selectedRegion === "" || project.region === selectedRegion;
    const matchesImpactArea = selectedImpactArea === "" || project.sdgGoals.some(goal => goal.includes(selectedImpactArea));
    return matchesSearch && matchesSector && matchesSize && matchesRegion && matchesImpactArea;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  // Get unique values for filters
  const sectors = Array.from(new Set(projects.map(project => project.sector)));
  const sizes = ["Small", "Medium", "Large"];
  const regions = Array.from(new Set(projects.map(project => project.region)));
  const impactAreas = Array.from(new Set(projects.flatMap(project => project.sdgGoals)));

  return (
    <DashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="Discover Projects"
    >
      <div className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search projects..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={selectedSector} onValueChange={setSelectedSector}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Sectors</SelectItem>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Project Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Sizes</SelectItem>
                {sizes.map(size => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Regions</SelectItem>
                {regions.map(region => (
                  <SelectItem key={region} value={region}>{region}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedImpactArea} onValueChange={setSelectedImpactArea}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Impact Area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Impact Areas</SelectItem>
                {impactAreas.map(area => (
                  <SelectItem key={area} value={area}>{area}</SelectItem>
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
            <TabsTrigger value="all">All Projects</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="favorites">My Favorites</TabsTrigger>
            {selectedProjects.length > 0 && (
              <TabsTrigger value="compare">Compare ({selectedProjects.length})</TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="all" className="mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project) => (
                <Card key={project.id} className="relative">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold">
                          {project.name.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{project.location}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{project.size}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.sdgGoals.map((goal, index) => (
                        <Badge key={index} variant="secondary">{goal}</Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Funding Progress</span>
                          <span>
                            {formatCurrency(project.raised)} / {formatCurrency(project.goal)}
                          </span>
                        </div>
                        <Progress value={(project.raised / project.goal) * 100} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between items-center text-sm">
                        <span><strong>Timeline:</strong> {project.timeline}</span>
                        <span><strong>Donors:</strong> {project.donors}</span>
                      </div>
                      
                      <div className="mt-2">
                        <p className="text-sm font-medium">Key Impact Metrics:</p>
                        <ul className="text-sm text-muted-foreground list-disc pl-5 mt-1">
                          {project.impact.map((impact, idx) => (
                            <li key={idx}>{impact}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {project.expertiseNeeded.length > 0 && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Expertise Needed:</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {project.expertiseNeeded.map((skill, idx) => (
                              <Badge key={idx} variant="outline">{skill}</Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => toggleFavorite(project.id)}
                        className={favoriteProjects.includes(project.id) ? "text-red-500" : ""}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={() => toggleSelected(project.id)}
                        className={selectedProjects.includes(project.id) ? "bg-blue-100" : ""}
                      >
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">Project Details</Button>
                      <Button>Express Interest</Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {filteredProjects.length === 0 && (
              <div className="text-center py-12">
                <div className="rounded-full bg-gray-100 p-4 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedSector("");
                    setSelectedSize("");
                    setSelectedRegion("");
                    setSelectedImpactArea("");
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recommended">
            <div className="py-6">
              <h3 className="text-lg font-medium mb-4">Recommended Projects Based on Your Profile</h3>
              <p className="text-muted-foreground mb-6">
                These projects match your interests in education, sustainability, and community development.
              </p>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {projects.slice(1, 4).map((project) => (
                  <Card key={project.id} className="relative border-l-4 border-l-primary">
                    <div className="absolute top-3 right-3">
                      <Badge>98% Match</Badge>
                    </div>
                    <CardHeader>
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold">
                          {project.name.charAt(0)}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{project.location}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                      <p className="text-sm font-medium mb-2">Why we recommend this:</p>
                      <ul className="text-sm text-muted-foreground list-disc pl-5 mb-4">
                        <li>Aligns with your interest in {project.sector}</li>
                        <li>Similar to projects you've previously supported</li>
                        <li>Matches your preferred impact metrics</li>
                      </ul>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.sdgGoals.map((goal, index) => (
                          <Badge key={index} variant="secondary">{goal}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">
                        <Heart className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                      <Button>View Details</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline">
                  Update Recommendation Preferences
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <div className="py-6">
              {favoriteProjects.length > 0 ? (
                <>
                  <h3 className="text-lg font-medium mb-4">Your Saved Projects</h3>
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {projects
                      .filter(project => favoriteProjects.includes(project.id))
                      .map(project => (
                        <Card key={project.id}>
                          <CardHeader>
                            <CardTitle>{project.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{project.location}</p>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Funding Progress</span>
                              <span>{formatCurrency(project.raised)} / {formatCurrency(project.goal)}</span>
                            </div>
                            <Progress value={(project.raised / project.goal) * 100} className="h-2" />
                          </CardContent>
                          <CardFooter className="flex justify-between">
                            <Button 
                              variant="outline"
                              onClick={() => toggleFavorite(project.id)}
                            >
                              Remove
                            </Button>
                            <Button>View Details</Button>
                          </CardFooter>
                        </Card>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="rounded-full bg-gray-100 p-3">
                    <Heart className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="mt-4 text-lg font-medium">No favorites yet</h3>
                  <p className="mt-2 text-center text-gray-500 max-w-md">
                    Save projects to your favorites to easily find them later.
                  </p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      document.querySelector('[data-value="all"]')?.click();
                    }}
                  >
                    Browse Projects
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="compare">
            <div className="py-6">
              <h3 className="text-lg font-medium mb-4">Compare Selected Projects</h3>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Project Details</TableHead>
                      {projects
                        .filter(project => selectedProjects.includes(project.id))
                        .map(project => (
                          <TableHead key={project.id}>{project.name}</TableHead>
                        ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Sector</TableCell>
                      {projects
                        .filter(project => selectedProjects.includes(project.id))
                        .map(project => (
                          <TableCell key={project.id}>{project.sector}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Location</TableCell>
                      {projects
                        .filter(project => selectedProjects.includes(project.id))
                        .map(project => (
                          <TableCell key={project.id}>{project.location}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Budget</TableCell>
                      {projects
                        .filter(project => selectedProjects.includes(project.id))
                        .map(project => (
                          <TableCell key={project.id}>{formatCurrency(project.goal)}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Timeline</TableCell>
                      {projects
                        .filter(project => selectedProjects.includes(project.id))
                        .map(project => (
                          <TableCell key={project.id}>{project.timeline}</TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">SDG Goals</TableCell>
                      {projects
                        .filter(project => selectedProjects.includes(project.id))
                        .map(project => (
                          <TableCell key={project.id}>
                            {project.sdgGoals.join(", ")}
                          </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Expected Impact</TableCell>
                      {projects
                        .filter(project => selectedProjects.includes(project.id))
                        .map(project => (
                          <TableCell key={project.id}>
                            <ul className="list-disc pl-5">
                              {project.impact.map((impact, idx) => (
                                <li key={idx} className="text-sm">{impact}</li>
                              ))}
                            </ul>
                          </TableCell>
                        ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Actions</TableCell>
                      {projects
                        .filter(project => selectedProjects.includes(project.id))
                        .map(project => (
                          <TableCell key={project.id}>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => toggleSelected(project.id)}
                              >
                                Remove
                              </Button>
                              <Button size="sm">Details</Button>
                            </div>
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="mt-6 flex justify-end">
                <Button 
                  variant="outline" 
                  className="mr-2"
                  onClick={() => setSelectedProjects([])}
                >
                  Clear Selection
                </Button>
                <Button>Generate Report</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DiscoverProjects;
