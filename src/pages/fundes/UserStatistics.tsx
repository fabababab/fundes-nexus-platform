
import React, { useState } from "react";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import { UserRole } from "@/types/common";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const UserStatistics: React.FC = () => {
  const [activeRole] = useState<UserRole>("fundes");
  
  const handleRoleChange = (role: UserRole) => {
    // In a real app, this might navigate or change global state
    console.log("Role change attempt to:", role);
  };

  // Mock data for frequently asked questions by topic
  const faqData = [
    { topic: 'Financial Literacy', count: 156, percentage: 35 },
    { topic: 'Coca-Cola Project', count: 98, percentage: 22 },
    { topic: 'Sustainable Practices', count: 87, percentage: 19 },
    { topic: 'Business Operations', count: 67, percentage: 15 },
    { topic: 'Digital Transformation', count: 42, percentage: 9 },
  ];

  // Mock data for user engagement
  const userEngagementData = [
    { month: 'Jan', messages: 120, users: 45 },
    { month: 'Feb', messages: 180, users: 53 },
    { month: 'Mar', messages: 200, users: 60 },
    { month: 'Apr', messages: 270, users: 75 },
    { month: 'May', messages: 350, users: 90 },
  ];

  // Mock data for AI vs Human consultant requests
  const supportTypeData = [
    { name: 'AI Assistance', value: 78 },
    { name: 'Human Consultant', value: 22 },
  ];

  const COLORS = ['#9b87f5', '#7E69AB', '#6E59A5', '#1A1F2C', '#D6BCFA'];
  const RADIAN = Math.PI / 180;
  
  // Custom label for the pie chart
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <SimpleDashboardLayout 
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="User Statistics"
    >
      <div className="container mx-auto py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total MSMEs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">487</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Users (30d)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">70% of total MSMEs</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">AI Assistant Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,258</div>
              <p className="text-xs text-muted-foreground">Queries this month</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>FAQ Topics Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={faqData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={renderCustomizedLabel}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="percentage"
                    >
                      {faqData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>User Engagement (Last 5 Months)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={userEngagementData}
                    margin={{
                      top: 20,
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
                    <Bar dataKey="messages" name="Messages" fill="#8884d8" />
                    <Bar dataKey="users" name="Active Users" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Topic</TableHead>
                    <TableHead>Queries</TableHead>
                    <TableHead>Distribution (%)</TableHead>
                    <TableHead>Top Question</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>Financial Literacy</TableCell>
                    <TableCell>156</TableCell>
                    <TableCell>35%</TableCell>
                    <TableCell>"How do I create a financial statement for my small business?"</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Coca-Cola Project</TableCell>
                    <TableCell>98</TableCell>
                    <TableCell>22%</TableCell>
                    <TableCell>"What are the eligibility criteria for the Coca-Cola sustainability program?"</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Sustainable Practices</TableCell>
                    <TableCell>87</TableCell>
                    <TableCell>19%</TableCell>
                    <TableCell>"How can I reduce packaging waste in my production process?"</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Business Operations</TableCell>
                    <TableCell>67</TableCell>
                    <TableCell>15%</TableCell>
                    <TableCell>"What are the best practices for inventory management for small retailers?"</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Digital Transformation</TableCell>
                    <TableCell>42</TableCell>
                    <TableCell>9%</TableCell>
                    <TableCell>"How do I create a digital presence for my local business?"</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </SimpleDashboardLayout>
  );
};

export default UserStatistics;
