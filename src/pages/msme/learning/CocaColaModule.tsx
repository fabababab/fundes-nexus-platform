
import React, { useState } from "react";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import { UserRole } from "@/types/common";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, Lightbulb, Map, Users, LineChart, Award, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { LearningChatbot } from "@/components/learning/LearningChatbot";

const CocaColaModule: React.FC = () => {
  const [activeRole] = useState<UserRole>("msme");
  const [activeLesson, setActiveLesson] = useState("overview");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const handleRoleChange = (role: UserRole) => {
    console.log("Role change attempt to:", role);
  };

  const lessons = [
    {
      id: "overview",
      title: "Project Overview",
      completed: false,
      icon: Lightbulb,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Coca-Cola Project Overview</h2>
          <p>Welcome to the Coca-Cola Project Onboarding module. This project aims to integrate MSMEs into Coca-Cola's supply chain, providing you with opportunities to grow your business.</p>
          
          <div className="bg-soft-green p-4 rounded-md mb-4">
            <h3 className="font-semibold mb-2">Project Objectives</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>Create sustainable business opportunities for local MSMEs</li>
              <li>Strengthen local supply chains for Coca-Cola products</li>
              <li>Provide training and resources for MSME development</li>
              <li>Promote financial inclusion for participating businesses</li>
              <li>Establish long-term business partnerships</li>
            </ul>
          </div>
          
          <p>As a participant in this project, you'll gain access to Coca-Cola's extensive distribution network and support systems designed to help small businesses succeed.</p>
          
          <div className="mt-6">
            <Button onClick={() => setActiveLesson("requirements")}>Continue to Next Lesson</Button>
          </div>
        </div>
      )
    },
    {
      id: "requirements",
      title: "Project Requirements",
      completed: false,
      icon: Map,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Project Requirements</h2>
          <p>To successfully participate in the Coca-Cola Project, MSMEs need to meet certain requirements and standards.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Business Registration</h3>
                <p>Your business must be formally registered with relevant local authorities and have all necessary permits.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Financial Records</h3>
                <p>Maintain basic financial records demonstrating at least 6 months of business operations.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Quality Standards</h3>
                <p>Ability to meet Coca-Cola's quality standards for products or services provided.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Banking Relationship</h3>
                <p>Have or be willing to open a business banking account for transparent transactions.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-soft-purple p-4 rounded-md mb-4">
            <h3 className="font-semibold mb-2">Documentation Required</h3>
            <p>You'll need to prepare the following documents: business registration certificate, tax identification, proof of address, and bank account details.</p>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveLesson("overview")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={() => setActiveLesson("opportunities")}>Continue</Button>
          </div>
        </div>
      )
    },
    {
      id: "opportunities",
      title: "Business Opportunities",
      completed: false,
      icon: Users,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Business Opportunities</h2>
          <p>The Coca-Cola Project offers several pathways for MSMEs to engage with the Coca-Cola ecosystem.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Opportunity Areas</h3>
          <div className="space-y-4">
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">Distribution Partners</h4>
              <p>Become part of the local distribution network, delivering Coca-Cola products to retail outlets in your area.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">Retail Partnerships</h4>
              <p>Enhance your retail business with Coca-Cola merchandising, coolers, and promotional support.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">Supplier Opportunities</h4>
              <p>Supply raw materials, packaging, or services to the Coca-Cola production and distribution chain.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">Marketing Collaborations</h4>
              <p>Partner on local marketing initiatives to drive sales and brand awareness in your community.</p>
            </div>
          </div>
          
          <div className="bg-soft-blue p-4 rounded-md my-4">
            <h3 className="font-semibold mb-2">Benefits</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>Access to established distribution channels</li>
              <li>Association with a globally recognized brand</li>
              <li>Business development training and support</li>
              <li>Potential for increased revenue and business growth</li>
              <li>Networking opportunities with other MSMEs</li>
            </ul>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveLesson("requirements")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={() => setActiveLesson("financials")}>Continue</Button>
          </div>
        </div>
      )
    },
    {
      id: "financials",
      title: "Financial Considerations",
      completed: false,
      icon: LineChart,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Financial Considerations</h2>
          <p>Understanding the financial aspects of participating in the Coca-Cola Project is crucial for making informed decisions.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Key Financial Aspects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Investment Requirements</h4>
                <p>Depending on your role in the project, initial investments may include inventory, equipment, or infrastructure improvements.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Revenue Models</h4>
                <p>Clear commission structures or pricing models ensure transparent and predictable revenue streams.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Financial Support</h4>
                <p>Access to microfinance options, equipment leasing, or inventory financing specifically for project participants.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Payment Terms</h4>
                <p>Clear payment schedules and methods ensure reliable cash flow for your business operations.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-soft-green p-4 rounded-md my-4">
            <h3 className="font-semibold mb-2">Financial Planning</h3>
            <p>We recommend creating a detailed business plan that incorporates your participation in the Coca-Cola Project, projecting costs, revenue, and cash flow for at least the first year.</p>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveLesson("opportunities")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={() => setActiveLesson("next-steps")}>Continue</Button>
          </div>
        </div>
      )
    },
    {
      id: "next-steps",
      title: "Next Steps",
      completed: false,
      icon: Award,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Next Steps to Join the Project</h2>
          <p>Now that you understand the Coca-Cola Project, here's how to proceed with your application and onboarding.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Application Process</h3>
          <div className="space-y-4">
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">1. Complete Your Profile</h4>
              <p>Ensure your business profile is complete with all required information and documentation.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">2. Submit Application</h4>
              <p>Apply through the FUNDES portal, specifying which opportunity area interests you most.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">3. Assessment</h4>
              <p>Your application will be reviewed, and a FUNDES representative may contact you for additional information or a site visit.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">4. Onboarding</h4>
              <p>If approved, you'll receive onboarding information, including training schedules and next steps.</p>
            </div>
          </div>
          
          <div className="bg-soft-blue p-4 rounded-md my-4">
            <h3 className="font-semibold mb-2">Support Available</h3>
            <p>Throughout the application process, FUNDES consultants are available to assist you. Use the AI Assistant feature to get quick answers or request a consultation with a FUNDES representative for more detailed guidance.</p>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveLesson("financials")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={() => console.log("Module complete")}>Complete Module</Button>
          </div>
        </div>
      )
    }
  ];
  
  const currentLesson = lessons.find(lesson => lesson.id === activeLesson) || lessons[0];
  const currentIndex = lessons.findIndex(lesson => lesson.id === activeLesson);
  const progress = ((currentIndex + 1) / lessons.length) * 100;
  
  return (
    <SimpleDashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="Coca-Cola Project Onboarding"
    >
      <div className="py-4 md:py-6">
        <div className="mb-6 relative">
          <Link to="/msme/learning-modules" className="flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Learning Modules
          </Link>
          <h1 className="text-3xl font-bold mb-2">Coca-Cola Project Onboarding</h1>
          <p className="text-muted-foreground">Learn how to participate and grow your business with the Coca-Cola Project.</p>
          
          {/* Chatbot toggle button in top right */}
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-0 right-0 flex items-center gap-2"
            onClick={() => setIsChatbotOpen(!isChatbotOpen)}
          >
            <MessageSquare className="h-4 w-4" />
            AI Assistant
          </Button>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <div className="bg-card rounded-lg shadow p-4 sticky top-6">
              <h3 className="font-medium mb-3">Module Lessons</h3>
              <div className="space-y-1">
                {lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson.id)}
                    className={`flex items-center w-full p-2 rounded-md text-left ${
                      lesson.id === activeLesson ? "bg-primary/10 text-primary" : "hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/20 text-primary mr-3 flex-shrink-0">
                      {index + 1}
                    </div>
                    <span className="text-sm">{lesson.title}</span>
                    {lesson.completed && (
                      <CheckCircle className="ml-auto h-4 w-4 text-success" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <Card>
              <CardContent className="pt-6">
                {currentLesson.content}
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Chatbot component */}
        {isChatbotOpen && (
          <div className="fixed bottom-4 right-4 w-80 h-96 bg-background border rounded-lg shadow-lg overflow-hidden z-50">
            <LearningChatbot 
              moduleTitle="Coca-Cola Project"
              onClose={() => setIsChatbotOpen(false)} 
            />
          </div>
        )}
      </div>
    </SimpleDashboardLayout>
  );
};

export default CocaColaModule;
