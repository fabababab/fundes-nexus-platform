
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/types/common";

const Index = () => {
  const navigate = useNavigate();
  const handleNavigate = (role: UserRole) => {
    navigate("/dashboard", {
      state: {
        initialRole: role
      }
    });
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 text-primary">Welcome to Fundes</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect MSMEs with impactful companies and donors to drive sustainable innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> {/* Updated lg:grid-cols-4 to lg:grid-cols-3 */}
          <Card className="border-t-4 border-t-blue-500">
            <CardHeader>
              <CardTitle>For MSMEs</CardTitle>
              <CardDescription>
                Find innovative solutions aligned with your goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500 text-sm">
                Discover partnerships, track your collaborations, and measure your impact on sustainability goals.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleNavigate("msme")}>
                MSME Dashboard
              </Button>
            </CardFooter>
          </Card>

          {/* Removed "For Companies" Card */}
          {/* 
          <Card className="border-t-4 border-t-green-500">
            <CardHeader>
              <CardTitle>For Companies</CardTitle>
              <CardDescription>
                Connect with MSMEs and donors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Access resources, mentorship, funding opportunities, and MSME partnerships to scale your impact.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleNavigate("company")}>Companies Dashboard</Button>
            </CardFooter>
          </Card> 
          */}

          <Card className="border-t-4 border-t-amber-500">
            <CardHeader>
              <CardTitle>For Donors</CardTitle>
              <CardDescription>
                Discover sustainable investment opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Find promising initiatives aligned with your donation criteria and track portfolio impact.
              </p>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-gray-300 hover:bg-gray-300 text-gray-500 cursor-not-allowed" 
                disabled
              >
                Coming Soon
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-t-4 border-t-emerald-500">
            <CardHeader>
              <CardTitle>For Fundes</CardTitle>
              <CardDescription>
                Manage ecosystem and initiatives
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">
                Oversee the entire ecosystem, manage projects, and track impact across all stakeholders.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleNavigate("fundes")}>
                Fundes Dashboard
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 mb-4">
            Fundes connects MSMEs with impactful companies and donors to drive sustainable innovation.
          </p>
          <Button variant="outline" size="sm" onClick={() => handleNavigate("investor")}>
            Explore All Features
          </Button>
        </div>
      </div>
    </div>;
};
export default Index;
