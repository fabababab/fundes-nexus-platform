
import React, { useState } from "react";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import { UserRole } from "@/types/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface MSME {
  id: string;
  name: string;
  industry: string;
  location: string;
  size: string;
  projects: string[];
  joinDate: string;
}

const MSMEDatabase: React.FC = () => {
  const [activeRole] = useState<UserRole>("fundes");
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleRoleChange = (role: UserRole) => {
    // In a real app, this might navigate or change global state
    console.log("Role change attempt to:", role);
  };

  // Mock data for MSMEs
  const msmes: MSME[] = [
    {
      id: "1",
      name: "EcoFresh Produce",
      industry: "Agriculture",
      location: "Mexico City, Mexico",
      size: "Medium (25-50)",
      projects: ["Sustainable Supply Chain", "Digital Transformation"],
      joinDate: "2023-01-15"
    },
    {
      id: "2",
      name: "TextiMex Crafts",
      industry: "Textiles",
      location: "Oaxaca, Mexico",
      size: "Small (5-10)",
      projects: ["Coca-Cola Project"],
      joinDate: "2023-03-22"
    },
    {
      id: "3",
      name: "Tech Solutions MX",
      industry: "Technology",
      location: "Guadalajara, Mexico",
      size: "Medium (20-30)",
      projects: ["Digital Transformation"],
      joinDate: "2023-02-08"
    },
    {
      id: "4",
      name: "Green Construction SA",
      industry: "Construction",
      location: "Monterrey, Mexico",
      size: "Medium (30-50)",
      projects: ["Sustainable Supply Chain"],
      joinDate: "2023-04-05"
    },
    {
      id: "5",
      name: "Artisanal Foods",
      industry: "Food & Beverage",
      location: "Puebla, Mexico",
      size: "Small (10-15)",
      projects: ["Coca-Cola Project", "Digital Transformation"],
      joinDate: "2023-02-19"
    },
    {
      id: "6",
      name: "MexiWear Apparel",
      industry: "Retail",
      location: "Mexico City, Mexico",
      size: "Small (5-15)",
      projects: ["Digital Transformation"],
      joinDate: "2023-05-12"
    },
    {
      id: "7",
      name: "Eco Tourism Adventures",
      industry: "Tourism",
      location: "Cancún, Mexico",
      size: "Small (10-20)",
      projects: ["Sustainable Supply Chain"],
      joinDate: "2023-03-30"
    }
  ];

  // Filter MSMEs based on search term
  const filteredMSMEs = msmes.filter(msme => 
    msme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msme.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msme.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get industry distribution
  const industryStats = msmes.reduce((acc: Record<string, number>, msme) => {
    acc[msme.industry] = (acc[msme.industry] || 0) + 1;
    return acc;
  }, {});

  // Get project enrollment stats
  const projectStats = msmes.reduce((acc: Record<string, number>, msme) => {
    msme.projects.forEach(project => {
      acc[project] = (acc[project] || 0) + 1;
    });
    return acc;
  }, {});

  return (
    <SimpleDashboardLayout 
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="MSME Database"
    >
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 max-w-md">
            <Input
              placeholder="Search MSMEs by name, industry, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">Export Data</Button>
            <Button>Add MSME</Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total MSMEs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{msmes.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Industries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Object.entries(industryStats).map(([industry, count]) => (
                  <Badge key={industry} variant="secondary">
                    {industry}: {count}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Project Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {Object.entries(projectStats).map(([project, count]) => (
                  <Badge key={project} variant="outline">
                    {project}: {count}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>MSME Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Projects</TableHead>
                  <TableHead>Join Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMSMEs.map((msme) => (
                  <TableRow key={msme.id}>
                    <TableCell className="font-medium">{msme.name}</TableCell>
                    <TableCell>{msme.industry}</TableCell>
                    <TableCell>{msme.location}</TableCell>
                    <TableCell>{msme.size}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {msme.projects.map((project) => (
                          <Badge key={project} variant="outline" className="text-xs">{project}</Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{new Date(msme.joinDate).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </SimpleDashboardLayout>
  );
};

export default MSMEDatabase;
