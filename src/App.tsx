
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/dashboard/Dashboard";
import Events from "./pages/events/Events";
import NotFound from "./pages/NotFound";
import DiscoverStartups from "./pages/startups/DiscoverStartups";
import Portfolio from "./pages/portfolio/Portfolio";
import Messages from "./pages/messages/Messages";
import Feed from "./pages/feed/Feed";
import ChatBot from "./pages/chatbot/ChatBot";
import Community from "./pages/community/Community";
import Fundes from "./pages/fundes/Fundes";
import FundesCommunications from "./pages/fundes/FundesCommunications";
import FundesEvents from "./pages/fundes/FundesEvents";
import FundesTasks from "./pages/fundes/FundesTasks";
import CompanyESGDashboard from "./pages/company/CompanyESGDashboard";
import CompanyIntranet from "./pages/company/CompanyIntranet";
import CompanyPartnerDiscovery from "./pages/company/CompanyPartnerDiscovery";
import CompanySocialImpact from "./pages/company/CompanySocialImpact";
import CompanyProjectRoom from "./pages/company/CompanyProjectRoom";
import MSMEDashboard from "./pages/dashboard/MSMEDashboard";
import ProjectOverview from "./pages/msme/ProjectOverview";
import DiscoverProjects from "./pages/projects/DiscoverProjects";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/discover-projects" element={<DiscoverProjects />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/events" element={<Events />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/community" element={<Community />} />
          <Route path="/fundes" element={<Dashboard activeRole="fundes" />} />
          <Route path="/fundes/communications" element={<FundesCommunications />} />
          <Route path="/fundes/events" element={<FundesEvents />} />
          <Route path="/fundes/tasks" element={<FundesTasks />} />
          
          {/* Company routes */}
          <Route path="/company/esg" element={<CompanyESGDashboard />} />
          <Route path="/company/intranet" element={<CompanyIntranet />} />
          <Route path="/company/partners" element={<CompanyPartnerDiscovery />} />
          <Route path="/company/impact" element={<CompanySocialImpact />} />
          <Route path="/company/projects" element={<CompanyProjectRoom />} />
          
          {/* MSME routes */}
          {/* <Route path="/msme/esg" element={<CompanyESGDashboard />} />  // This line is removed */}
          <Route path="/msme/intranet" element={<CompanyIntranet />} />
          <Route path="/msme/partners" element={<CompanyPartnerDiscovery />} />
          <Route path="/msme/impact" element={<CompanySocialImpact />} />
          <Route path="/msme/projects" element={<CompanyProjectRoom />} />
          
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/network" element={<Dashboard />} />
          <Route path="/documents" element={<Dashboard />} />
          <Route path="/investments" element={<Dashboard />} />
          <Route path="/database" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="/learning-journey" element={<Dashboard activeRole="msme" />} />
          <Route path="/msme/project-overview" element={<ProjectOverview />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

