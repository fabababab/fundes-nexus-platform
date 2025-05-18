
import React, { useState } from "react";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import { UserRole } from "@/types/common";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowLeft, BookOpen, Calculator, Receipt, LineChart, PiggyBank, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { LearningChatbot } from "@/components/learning/LearningChatbot";

const FinancialLiteracyModule: React.FC = () => {
  const [activeRole] = useState<UserRole>("msme");
  const [activeLesson, setActiveLesson] = useState("overview");
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const handleRoleChange = (role: UserRole) => {
    console.log("Role change attempt to:", role);
  };

  const lessons = [
    {
      id: "overview",
      title: "Module Overview",
      completed: false,
      icon: BookOpen,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Financial Literacy Overview</h2>
          <p>Welcome to the Financial Literacy module designed for small business owners. This module will help you understand the basics of financial management for your business.</p>
          
          <div className="bg-soft-green p-4 rounded-md mb-4">
            <h3 className="font-semibold mb-2">Why Financial Literacy Matters</h3>
            <ul className="list-disc ml-5 space-y-2">
              <li>Make informed business decisions based on financial data</li>
              <li>Manage cash flow effectively to keep your business running</li>
              <li>Understand tax obligations and avoid compliance issues</li>
              <li>Build a financial foundation for growth and expansion</li>
              <li>Access financing options with confidence</li>
            </ul>
          </div>
          
          <p>Throughout this module, you'll learn practical financial skills that you can apply immediately to your business operations.</p>
          
          <div className="mt-6">
            <Button onClick={() => setActiveLesson("basics")}>Continue to Next Lesson</Button>
          </div>
        </div>
      )
    },
    {
      id: "basics",
      title: "Financial Basics",
      completed: false,
      icon: Calculator,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Financial Basics for MSMEs</h2>
          <p>Understanding the core financial concepts is essential for running a successful business, regardless of its size.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Revenue</h3>
                <p>The total income generated from sales of goods or services before any expenses are deducted.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Expenses</h3>
                <p>The costs incurred in running your business, including fixed and variable expenses.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Profit</h3>
                <p>The financial gain when your revenue exceeds your expenses.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h3 className="text-xl font-semibold mb-3">Cash Flow</h3>
                <p>The movement of money in and out of your business over a specific period.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-soft-blue p-4 rounded-md mb-4">
            <h3 className="font-semibold mb-2">Key Takeaway</h3>
            <p>A profitable business may still face cash flow problems if the timing of cash inflows and outflows is not managed properly.</p>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveLesson("overview")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={() => setActiveLesson("recordkeeping")}>Continue</Button>
          </div>
        </div>
      )
    },
    {
      id: "recordkeeping",
      title: "Financial Record Keeping",
      completed: false,
      icon: Receipt,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Financial Record Keeping</h2>
          <p>Proper financial record keeping is the foundation of good business financial management.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Essential Financial Records</h3>
          <div className="space-y-4">
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">Sales Records</h4>
              <p>Track all sales transactions, including dates, amounts, products/services sold, and customer information.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">Expense Records</h4>
              <p>Keep receipts and records of all business expenses, categorized by type.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">Inventory Records</h4>
              <p>Track inventory levels, costs, and value if your business sells physical products.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">Payroll Records</h4>
              <p>Document employee payments, benefits, and tax withholdings if you have employees.</p>
            </div>
          </div>
          
          <div className="bg-soft-purple p-4 rounded-md my-4">
            <h3 className="font-semibold mb-2">Benefits of Good Record Keeping</h3>
            <ul className="list-disc ml-5 space-y-1">
              <li>Accurate tax filing and compliance</li>
              <li>Easier access to financing</li>
              <li>Better business decision making</li>
              <li>Early problem detection</li>
              <li>Simplified financial statement preparation</li>
            </ul>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveLesson("basics")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={() => setActiveLesson("statements")}>Continue</Button>
          </div>
        </div>
      )
    },
    {
      id: "statements",
      title: "Financial Statements",
      completed: false,
      icon: LineChart,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Understanding Financial Statements</h2>
          <p>Financial statements provide a snapshot of your business's financial health and performance.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Key Financial Statements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Income Statement</h4>
                <p>Shows revenue, expenses, and profit over a specific period. Also called a profit and loss statement.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Balance Sheet</h4>
                <p>Lists assets, liabilities, and equity at a specific point in time.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Cash Flow Statement</h4>
                <p>Tracks the flow of cash in and out of your business during a period.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold mb-2">Statement of Changes in Equity</h4>
                <p>Shows changes in the ownership interest in the business over time.</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="bg-soft-green p-4 rounded-md my-4">
            <h3 className="font-semibold mb-2">Using Financial Statements</h3>
            <p>Regular review of your financial statements helps you identify trends, make informed decisions, and spot potential problems early.</p>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveLesson("recordkeeping")}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous
            </Button>
            <Button onClick={() => setActiveLesson("planning")}>Continue</Button>
          </div>
        </div>
      )
    },
    {
      id: "planning",
      title: "Financial Planning",
      completed: false,
      icon: PiggyBank,
      content: (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Financial Planning for MSMEs</h2>
          <p>Financial planning helps you set goals for your business and create a roadmap to achieve them.</p>
          
          <h3 className="text-xl font-semibold mt-6 mb-3">Key Components of Financial Planning</h3>
          <div className="space-y-4">
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">1. Budgeting</h4>
              <p>Create a budget that projects your revenue and expenses for the coming period, typically a month or quarter.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">2. Cash Flow Forecasting</h4>
              <p>Predict when cash will come in and go out of your business to avoid cash shortages.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">3. Financial Goals</h4>
              <p>Set specific, measurable financial goals for your business, such as revenue targets or cost reductions.</p>
            </div>
            
            <div className="border p-4 rounded-md">
              <h4 className="font-medium mb-2">4. Risk Management</h4>
              <p>Identify financial risks to your business and create plans to mitigate them.</p>
            </div>
          </div>
          
          <div className="bg-soft-blue p-4 rounded-md my-4">
            <h3 className="font-semibold mb-2">Success Story</h3>
            <p>A local restaurant owner created a detailed cash flow forecast that helped her identify seasonal fluctuations in revenue. By planning ahead, she was able to set aside extra cash during busy periods to cover expenses during slower months, avoiding the need for expensive short-term loans.</p>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={() => setActiveLesson("statements")}>
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
      pageTitle="Financial Literacy Module"
    >
      <div className="py-4 md:py-6">
        <div className="mb-6 relative">
          <Link to="/msme/learning-modules" className="flex items-center text-primary hover:underline mb-4">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to Learning Modules
          </Link>
          <h1 className="text-3xl font-bold mb-2">Financial Literacy</h1>
          <p className="text-muted-foreground">Master the fundamentals of financial management for your business.</p>
          
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
              moduleTitle="Financial Literacy"
              onClose={() => setIsChatbotOpen(false)} 
            />
          </div>
        )}
      </div>
    </SimpleDashboardLayout>
  );
};

export default FinancialLiteracyModule;
