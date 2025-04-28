
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, MapPin, Building2, CheckCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";
import { UserRole } from "@/types/common";

const CompanyPartnerDiscovery = () => {
  const [activeRole, setActiveRole] = useState<UserRole>("company");
  const [searchTerm, setSearchTerm] = useState("");
  const [industry, setIndustry] = useState<string>("all");
  const [location, setLocation] = useState<string>("all");
  const [esgRating, setEsgRating] = useState<string>("all");
  
  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
  };

  // Mock data for potential partners
  const potentialPartners = [
    { 
      id: "pp1", 
      name: "EcoTech Solutions", 
      type: "Supplier", 
      industry: "Manufacturing",
      location: "Mexico City", 
      esgScore: 87, 
      compatibility: 92,
      verified: true,
      description: "Sustainable manufacturing solutions focusing on biodegradable packaging materials and renewable energy processes."
    },
    { 
      id: "pp2", 
      name: "AgriInnovate", 
      type: "Supplier", 
      industry: "Agriculture",
      location: "Guadalajara", 
      esgScore: 79, 
      compatibility: 85,
      verified: true,
      description: "Innovative agricultural practices with water conservation technologies and sustainable farming methods."
    },
    { 
      id: "pp3", 
      name: "CleanDistribution Network", 
      type: "Distributor", 
      industry: "Logistics",
      location: "Monterrey", 
      esgScore: 82, 
      compatibility: 78,
      verified: false,
      description: "Low-emission distribution network with optimized routing and carbon offset programs."
    },
    { 
      id: "pp4", 
      name: "GreenRetail Partners", 
      type: "Distributor", 
      industry: "Retail",
      location: "Puebla", 
      esgScore: 75, 
      compatibility: 81,
      verified: true,
      description: "Retail network with focus on sustainable product displays and minimal packaging waste."
    },
    { 
      id: "pp5", 
      name: "BioPackaging Innovations", 
      type: "Supplier", 
      industry: "Manufacturing",
      location: "Mexico City", 
      esgScore: 91, 
      compatibility: 94,
      verified: true,
      description: "Specialized in fully biodegradable and compostable packaging solutions made from agricultural waste."
    }
  ];

  const filtered = potentialPartners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         partner.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = industry === "all" || partner.industry === industry;
    const matchesLocation = location === "all" || partner.location === location;
    const matchesESG = esgRating === "all" || 
                     (esgRating === "high" && partner.esgScore >= 85) ||
                     (esgRating === "medium" && partner.esgScore >= 70 && partner.esgScore < 85) ||
                     (esgRating === "low" && partner.esgScore < 70);
    
    return matchesSearch && matchesIndustry && matchesLocation && matchesESG;
  });

  return (
    <DashboardLayout activeRole={activeRole} onRoleChange={handleRoleChange} pageTitle="Partner Discovery">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">Discover Potential Partners</h2>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[240px]">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or description..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Select value={industry} onValueChange={setIndustry}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Industries</SelectItem>
                  <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="Agriculture">Agriculture</SelectItem>
                  <SelectItem value="Logistics">Logistics</SelectItem>
                  <SelectItem value="Retail">Retail</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Mexico City">Mexico City</SelectItem>
                  <SelectItem value="Guadalajara">Guadalajara</SelectItem>
                  <SelectItem value="Monterrey">Monterrey</SelectItem>
                  <SelectItem value="Puebla">Puebla</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={esgRating} onValueChange={setEsgRating}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="ESG Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="high">High (85+)</SelectItem>
                  <SelectItem value="medium">Medium (70-84)</SelectItem>
                  <SelectItem value="low">Low (Below 70)</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
            <TabsTrigger value="distributors">Distributors</TabsTrigger>
            <TabsTrigger value="verified">Verified</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.length === 0 ? (
                <div className="col-span-full p-8 text-center text-muted-foreground">
                  No partners found matching your criteria.
                </div>
              ) : (
                filtered.map((partner) => (
                  <Card key={partner.id} className="overflow-hidden">
                    <div className={`h-2 ${partner.esgScore >= 85 ? "bg-green-500" : partner.esgScore >= 70 ? "bg-amber-500" : "bg-red-500"}`} />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base font-semibold">{partner.name}</CardTitle>
                        {partner.verified && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {partner.type} - {partner.industry}
                      </CardDescription>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {partner.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {partner.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">ESG Score</span>
                          <span className="font-semibold">{partner.esgScore}/100</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Compatibility</span>
                          <span className="font-semibold">{partner.compatibility}%</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button className="w-full">View Profile</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="suppliers" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.filter(p => p.type === "Supplier").length === 0 ? (
                <div className="col-span-full p-8 text-center text-muted-foreground">
                  No suppliers found matching your criteria.
                </div>
              ) : (
                filtered.filter(p => p.type === "Supplier").map((partner) => (
                  <Card key={partner.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <div className={`h-2 ${partner.esgScore >= 85 ? "bg-green-500" : partner.esgScore >= 70 ? "bg-amber-500" : "bg-red-500"}`} />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base font-semibold">{partner.name}</CardTitle>
                        {partner.verified && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {partner.type} - {partner.industry}
                      </CardDescription>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {partner.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {partner.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">ESG Score</span>
                          <span className="font-semibold">{partner.esgScore}/100</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Compatibility</span>
                          <span className="font-semibold">{partner.compatibility}%</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button className="w-full">View Profile</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="distributors" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.filter(p => p.type === "Distributor").length === 0 ? (
                <div className="col-span-full p-8 text-center text-muted-foreground">
                  No distributors found matching your criteria.
                </div>
              ) : (
                filtered.filter(p => p.type === "Distributor").map((partner) => (
                  <Card key={partner.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <div className={`h-2 ${partner.esgScore >= 85 ? "bg-green-500" : partner.esgScore >= 70 ? "bg-amber-500" : "bg-red-500"}`} />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base font-semibold">{partner.name}</CardTitle>
                        {partner.verified && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {partner.type} - {partner.industry}
                      </CardDescription>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {partner.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {partner.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">ESG Score</span>
                          <span className="font-semibold">{partner.esgScore}/100</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Compatibility</span>
                          <span className="font-semibold">{partner.compatibility}%</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button className="w-full">View Profile</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="verified" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.filter(p => p.verified).length === 0 ? (
                <div className="col-span-full p-8 text-center text-muted-foreground">
                  No verified partners found matching your criteria.
                </div>
              ) : (
                filtered.filter(p => p.verified).map((partner) => (
                  <Card key={partner.id} className="overflow-hidden">
                    {/* Same card content as above */}
                    <div className={`h-2 ${partner.esgScore >= 85 ? "bg-green-500" : partner.esgScore >= 70 ? "bg-amber-500" : "bg-red-500"}`} />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between">
                        <CardTitle className="text-base font-semibold">{partner.name}</CardTitle>
                        {partner.verified && <CheckCircle className="h-5 w-5 text-green-600" />}
                      </div>
                      <CardDescription className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {partner.type} - {partner.industry}
                      </CardDescription>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {partner.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {partner.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">ESG Score</span>
                          <span className="font-semibold">{partner.esgScore}/100</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-muted-foreground">Compatibility</span>
                          <span className="font-semibold">{partner.compatibility}%</span>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button className="w-full">View Profile</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default CompanyPartnerDiscovery;
