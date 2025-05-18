
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRole } from "@/types/common";

const Index = () => {
  const navigate = useNavigate();
  const handleNavigate = (role: UserRole) => {
    if (role === "fundes") {
      // Direct routing to fundes dashboard
      navigate("/fundes/feed");
    } else {
      navigate("/dashboard", {
        state: {
          initialRole: role
        }
      });
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/d76beacc-bb0e-4b16-8ed4-118efe6683df.png" 
              alt="Fundeo Logo" 
              className="h-16 md:h-20" 
            />
          </div>
          <h1 className="text-display text-primary mb-4">Welcome to Fundeo</h1>
          <p className="text-body text-gray-600 max-w-2xl mx-auto">
            Connect MSMEs with impactful companies and donors to drive sustainable innovation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <Card className="border-t-4 border-t-blue-500 flex flex-col">
            <CardHeader>
              <CardTitle>For MSMEs</CardTitle>
              <CardDescription>
                Find innovative solutions aligned with your goals
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-caption">
                Discover partnerships, track your collaborations, and measure your impact on sustainability goals.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleNavigate("msme")}>
                MSME Dashboard
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-t-4 border-t-emerald-500 flex flex-col">
            <CardHeader>
              <CardTitle>For Fundes</CardTitle>
              <CardDescription>
                Manage ecosystem and initiatives
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-caption">
                Oversee the entire ecosystem, manage projects, and track impact across all stakeholders.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleNavigate("fundes")}>
                Fundes Dashboard
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-t-4 border-t-amber-500 flex flex-col">
            <CardHeader>
              <CardTitle>For Donors</CardTitle>
              <CardDescription>
                Discover sustainable investment opportunities
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-caption">
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
        </div>

        <div className="text-center mt-8 md:mt-12">
          <p className="text-caption mb-4">
            Fundeo connects MSMEs with impactful companies and donors to drive sustainable innovation.
          </p>
          <Button variant="outline" size="sm" onClick={() => handleNavigate("investor")}>
            Explore All Features
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Index;
