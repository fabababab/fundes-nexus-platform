
import React, { useState } from "react";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import { UserRole } from "@/types/common";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, Coins, ArrowLeft, HandCoins, BookOpen, WalletCards, BadgeDollarSign, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LearningChatbot } from "@/components/learning/LearningChatbot";

const FinancialInclusionModule: React.FC = () => {
  const [activeRole] = useState<UserRole>("msme");
  const [activeLesson, setActiveLesson] = useState("overview");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const handleRoleChange = (role: UserRole) => {
    console.log("Role change attempt to:", role);
  };

  const lessons = [
    {
      id: "overview",
      title: "Overview",
      completed: false,
      icon: Coins,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Financial Inclusion Overview</h2>
          <p>Financial inclusion refers to the availability and accessibility of useful and affordable financial products and services that meet your business needs. These include banking, credit, insurance, and financial education.</p>
          
          <div className="bg-soft-green p-4 rounded-md mb-4">
            <h3 className="font-semibold mb-2">Why Financial Inclusion Matters for MSMEs</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>Access to credit for business expansion</li>
              <li>Secure ways to save and manage business income</li>
              <li>Protection against financial risks</li>
              <li>Formal financial records to establish creditworthiness</li>
              <li>Digital payment options to reach more customers</li>
            </ul>
          </div>
          
          <p>In this module, you'll learn the fundamentals of financial inclusion, how to access various financial services, and practical steps to improve your business's financial health.</p>
          
          <div className="mt-6">
            <Button onClick={() => setActiveLesson("basics")}>Continue to Next Lesson</Button>
          </div>
        </div>
      )
    },
    {
      id: "basics",
      title: "Financial Services Basics",
      completed: false,
      icon: HandCoins,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Financial Services Basics</h2>
          <p>Financial services are the economic services provided by the finance industry, which encompasses a broad range of organizations that manage money.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Banking Services</h3>
                <p>Basic accounts for transactions, savings accounts to grow funds, and business accounts with specialized features.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Credit Services</h3>
                <p>Loans, credit lines, and microfinance options specifically designed for small businesses.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Insurance Services</h3>
                <p>Protection for your business against risks like property damage, liability, and business interruption.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Digital Finance</h3>
                <p>Mobile money, digital wallets, and online banking tools to manage your finances remotely.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-soft-purple p-4 rounded-md mb-4">
            <h3 className="font-semibold mb-2">Benefits for Your Business</h3>
            <p>Using formal financial services helps establish your business's financial history, which is crucial for accessing larger loans and investment opportunities in the future.</p>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveLesson("overview")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={() => setActiveLesson("access")}>Continue</Button>
          </div>
        </div>
      )
    },
    {
      id: "access",
      title: "Accessing Financial Services",
      completed: false,
      icon: BookOpen,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Accessing Financial Services</h2>
          <p>Many MSMEs face barriers to accessing financial services. This lesson will guide you through practical steps to overcome these challenges.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Common Barriers</h3>
          <ul className="list-disc ml-5 space-y-2">
            <li>Lack of formal documentation</li>
            <li>Limited financial literacy</li>
            <li>Inadequate collateral for loans</li>
            <li>Poor or no credit history</li>
            <li>High transaction costs</li>
          </ul>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Steps to Improve Access</h3>
          <div className="space-y-4">
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">1. Formalize Your Business</h4>
              <p>Register your business, obtain necessary licenses, and keep proper financial records.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">2. Build Financial Records</h4>
              <p>Maintain separate personal and business accounts, record all transactions, and create financial statements.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">3. Start Small</h4>
              <p>Begin with basic services like a savings account before applying for credit products.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">4. Explore Alternative Finance</h4>
              <p>Consider microfinance institutions, credit unions, or digital lending platforms.</p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveLesson("basics")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={() => setActiveLesson("digital")}>Continue</Button>
          </div>
        </div>
      )
    },
    {
      id: "digital",
      title: "Digital Financial Services",
      completed: false,
      icon: WalletCards,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Digital Financial Services</h2>
          <p>Digital financial services are transforming how MSMEs access and use financial products. They offer convenience, lower costs, and greater reach.</p>
          
          <div className="bg-soft-blue p-4 rounded-md my-4">
            <h3 className="font-semibold mb-2">Benefits of Digital Finance</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>Reduced transaction costs</li>
              <li>Convenient access 24/7</li>
              <li>Faster processing of transactions</li>
              <li>Better record-keeping</li>
              <li>Access to a wider range of services</li>
              <li>Reduced need for physical cash handling</li>
            </ul>
          </div>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Types of Digital Financial Services</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Mobile Money</h4>
                <p>Services that allow you to store, send, and receive money using your mobile phone.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Digital Banking</h4>
                <p>Online banking services accessible via internet or mobile applications.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Digital Credit</h4>
                <p>Loans that can be applied for, disbursed, and repaid electronically.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Payment Platforms</h4>
                <p>Services that facilitate payments between businesses and customers.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveLesson("access")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={() => setActiveLesson("growth")}>Continue</Button>
          </div>
        </div>
      )
    },
    {
      id: "growth",
      title: "Financial Growth Strategies",
      completed: false,
      icon: BadgeDollarSign,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Financial Growth Strategies</h2>
          <p>Effective financial management and strategic use of financial services can help your MSME grow sustainably.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Key Strategies</h3>
          <div className="space-y-4">
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">1. Build Credit Step by Step</h4>
              <p>Start with small loans, repay them on time, and gradually build your credit history to access larger financing.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">2. Separate Personal and Business Finances</h4>
              <p>Maintain separate accounts and clear records to demonstrate your business's financial health.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">3. Diversify Financial Services</h4>
              <p>Don't rely on just one financial service or provider. Use a mix of services to meet different needs.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">4. Plan for Emergencies</h4>
              <p>Build an emergency fund and consider insurance to protect against unexpected challenges.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">5. Invest in Financial Education</h4>
              <p>Continuously improve your financial literacy to make better decisions for your business.</p>
            </div>
          </div>
          
          <div className="bg-soft-green p-4 rounded-md my-4">
            <h3 className="font-semibold mb-2">Success Story</h3>
            <p>Maria's local bakery struggled with cash flow issues until she opened a business account and started accepting digital payments. Within a year, she increased her customer base by 30% and secured a small loan to purchase new equipment, growing her business revenue by 45%.</p>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveLesson("digital")}>
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
      pageTitle="Financial Inclusion Module"
    >
      <div className="py-4 md:py-6">
        <div className="mb-6 relative">
          <Link to="/msme/learning-modules" className="flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Learning Modules
          </Link>
          <h1 className="text-3xl font-bold mb-2">Financial Inclusion</h1>
          <p className="text-muted-foreground">Learn how to access and utilize financial services to grow your business.</p>
          
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
              moduleTitle="Financial Inclusion"
              onClose={() => setIsChatbotOpen(false)} 
            />
          </div>
        )}
      </div>
    </SimpleDashboardLayout>
  );
};

export default FinancialInclusionModule;
