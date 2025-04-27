
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, FileText, Users, BookOpen, Mail, Download, PlusCircle } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";

const CompanyIntranet = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor" | "fundes">("company");
  const [searchTerm, setSearchTerm] = useState("");

  const handleRoleChange = (role: "company" | "startup" | "investor" | "fundes") => {
    setActiveRole(role);
  };

  const suppliers = [
    { id: "sup1", name: "EcoPackaging Solutions", type: "Supplier", location: "Mexico City", status: "Active", lastActivity: "2 hours ago" },
    { id: "sup2", name: "GreenTech Materials", type: "Supplier", location: "Monterrey", status: "Active", lastActivity: "Yesterday" },
    { id: "sup3", name: "Sustainable Logistics Co.", type: "Supplier", location: "Guadalajara", status: "Pending Review", lastActivity: "3 days ago" },
  ];

  const distributors = [
    { id: "dis1", name: "Regional Markets Inc.", type: "Distributor", location: "Mexico City", status: "Active", lastActivity: "1 day ago" },
    { id: "dis2", name: "LocalGoods Distribution", type: "Distributor", location: "Puebla", status: "Active", lastActivity: "5 hours ago" },
    { id: "dis3", name: "EcoFriendly Outlets", type: "Distributor", location: "Cancun", status: "Onboarding", lastActivity: "1 week ago" },
  ];

  const documents = [
    { id: "doc1", title: "Sustainability Guidelines", type: "PDF", size: "2.4 MB", updatedAt: "2025-04-15", author: "ESG Team" },
    { id: "doc2", title: "Supplier Code of Conduct", type: "DOCX", size: "1.8 MB", updatedAt: "2025-03-22", author: "Legal Department" },
    { id: "doc3", title: "Circular Economy Training", type: "PPTX", size: "5.2 MB", updatedAt: "2025-04-20", author: "Training Department" },
    { id: "doc4", title: "Packaging Specifications", type: "PDF", size: "3.7 MB", updatedAt: "2025-04-01", author: "Product Development" },
  ];

  const courses = [
    { id: "course1", title: "Sustainable Business Practices", enrolled: 128, completion: "78%", duration: "2 hours", published: "2025-03-15" },
    { id: "course2", title: "Circular Economy Fundamentals", enrolled: 95, completion: "65%", duration: "1.5 hours", published: "2025-02-28" },
    { id: "course3", title: "ESG Reporting Standards", enrolled: 72, completion: "45%", duration: "3 hours", published: "2025-04-10" },
  ];

  const filteredPartners = [...suppliers, ...distributors].filter(partner => 
    partner.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    partner.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    partner.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout activeRole={activeRole} onRoleChange={handleRoleChange} pageTitle="Company Intranet">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Partner Network & Resources</h2>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search partners or resources..."
                className="pl-8 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Tabs defaultValue="partners">
          <TabsList>
            <TabsTrigger value="partners" className="flex gap-1">
              <Users className="h-4 w-4" /> Partners
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex gap-1">
              <FileText className="h-4 w-4" /> Documents
            </TabsTrigger>
            <TabsTrigger value="education" className="flex gap-1">
              <BookOpen className="h-4 w-4" /> Education
            </TabsTrigger>
            <TabsTrigger value="communication" className="flex gap-1">
              <Mail className="h-4 w-4" /> Communication
            </TabsTrigger>
          </TabsList>

          <TabsContent value="partners" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Partners Directory</CardTitle>
                    <CardDescription>Manage your suppliers and distributors network</CardDescription>
                  </div>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Partner
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Activity</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPartners.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No partners found matching your search.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredPartners.map((partner) => (
                        <TableRow key={partner.id}>
                          <TableCell className="font-medium">{partner.name}</TableCell>
                          <TableCell>{partner.type}</TableCell>
                          <TableCell>{partner.location}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${
                              partner.status === "Active" 
                                ? "bg-green-100 text-green-800" 
                                : partner.status === "Onboarding" 
                                ? "bg-blue-100 text-blue-800" 
                                : "bg-amber-100 text-amber-800"
                            }`}>
                              {partner.status}
                            </span>
                          </TableCell>
                          <TableCell>{partner.lastActivity}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Document Library</CardTitle>
                    <CardDescription>Shared resources for partners and team members</CardDescription>
                  </div>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Last Updated</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {documents.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.title}</TableCell>
                        <TableCell>{doc.type}</TableCell>
                        <TableCell>{doc.size}</TableCell>
                        <TableCell>{doc.updatedAt}</TableCell>
                        <TableCell>{doc.author}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="space-y-4 pt-4">
            <Card>
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>Educational Content</CardTitle>
                    <CardDescription>Training materials for partners and distributors</CardDescription>
                  </div>
                  <Button size="sm">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Enrolled</TableHead>
                      <TableHead>Completion Rate</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Published</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell className="font-medium">{course.title}</TableCell>
                        <TableCell>{course.enrolled} users</TableCell>
                        <TableCell>{course.completion}</TableCell>
                        <TableCell>{course.duration}</TableCell>
                        <TableCell>{course.published}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="communication" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Communication Hub</CardTitle>
                <CardDescription>Announcements and communication with partners</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Communication tools and announcements will be displayed here. This section will include
                    messaging capabilities, broadcast announcements, and notification settings.
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

export default CompanyIntranet;
