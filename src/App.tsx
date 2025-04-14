
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
import Feed from "./pages/feed/Feed";  // New Feed page

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
          <Route path="/discover-startups" element={<DiscoverStartups />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/events" element={<Events />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/feed" element={<Feed />} />  {/* New Feed route */}
          <Route path="/analytics" element={<Dashboard />} />
          <Route path="/network" element={<Dashboard />} />
          <Route path="/documents" element={<Dashboard />} />
          <Route path="/investments" element={<Dashboard />} />
          <Route path="/database" element={<Dashboard />} />
          <Route path="/settings" element={<Dashboard />} />
          <Route path="/learning-journey" element={<Dashboard activeRole="startup" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
