
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/dashboard/Dashboard";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/portfolio/Portfolio";
import DiscoverProjects from "./pages/projects/DiscoverProjects";
import ProjectOverview from "./pages/msme/ProjectOverview";
import LearningModules from "./pages/msme/LearningModules";
import FundesCommunications from "./pages/fundes/FundesCommunications";
import FundesEvents from "./pages/fundes/FundesEvents";
import FundesTasks from "./pages/fundes/FundesTasks";
import FundesFeed from "./pages/fundes/FundesFeed";
import FundesMessages from "./pages/fundes/FundesMessages";

// Import MSME-specific pages
import MSMEFeed from "./pages/msme/MSMEFeed";
import MSMEChatBot from "./pages/msme/MSMEChatBot";
import MSMEEvents from "./pages/msme/MSMEEvents";
import MSMEMessages from "./pages/msme/MSMEMessages";
import MSMECommunityPage from "./pages/msme/MSMECommunity";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Default Dashboard - redirects based on role preference */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Investor routes */}
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/discover-projects" element={<DiscoverProjects />} />
          
          {/* MSME routes */}
          <Route path="/msme" element={<Dashboard activeRole="msme" />} />
          <Route path="/msme/feed" element={<MSMEFeed />} />
          <Route path="/msme/chatbot" element={<MSMEChatBot />} />
          <Route path="/msme/events" element={<MSMEEvents />} />
          <Route path="/msme/messages" element={<MSMEMessages />} />
          <Route path="/msme/community" element={<MSMECommunityPage />} />
          <Route path="/msme/project-overview" element={<ProjectOverview />} />
          <Route path="/msme/learning-modules" element={<LearningModules />} />
          
          {/* Fundes routes */}
          <Route path="/fundes" element={<Dashboard activeRole="fundes" />} />
          <Route path="/fundes/communications" element={<FundesCommunications />} />
          <Route path="/fundes/events" element={<FundesEvents />} />
          <Route path="/fundes/tasks" element={<FundesTasks />} />
          <Route path="/fundes/feed" element={<FundesFeed />} />
          <Route path="/fundes/messages" element={<FundesMessages />} />
          
          {/* Redirect old shared paths to role-specific paths */}
          <Route path="/feed" element={<Navigate to="/msme/feed" replace />} />
          <Route path="/chatbot" element={<Navigate to="/msme/chatbot" replace />} />
          <Route path="/events" element={<Navigate to="/msme/events" replace />} />
          <Route path="/messages" element={<Navigate to="/msme/messages" replace />} />
          <Route path="/community" element={<Navigate to="/msme/community" replace />} />
          
          {/* Redirect unassigned routes to appropriate role sections */}
          <Route path="/analytics" element={<Navigate to="/fundes" replace />} />
          <Route path="/network" element={<Navigate to="/fundes" replace />} />
          <Route path="/documents" element={<Navigate to="/msme" replace />} />
          <Route path="/investments" element={<Navigate to="/fundes" replace />} />
          <Route path="/database" element={<Navigate to="/fundes" replace />} />
          <Route path="/settings" element={<Navigate to="/msme" replace />} />
          <Route path="/learning-journey" element={<Navigate to="/msme/learning-modules" replace />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
