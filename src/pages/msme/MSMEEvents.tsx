
import React, { useState } from "react";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import EventCard from "@/components/events/EventCard";
import { UserRole } from "@/types/common";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const MSMEEvents: React.FC = () => {
  // MSME role is fixed for this page
  const [activeRole] = useState<UserRole>("msme");
  const handleRoleChange = (role: UserRole) => {
    // In a real app, this might navigate or change global state
    console.log("Role change attempt to:", role);
  };

  const msmeEvents = [
    {
      id: "1",
      title: "Financial Literacy Workshop",
      description: "Learn essential financial skills for small business success.",
      date: "Jun 15, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Virtual",
      attendees: 42,
      category: "Training",
      type: "Virtual" as const,
      isRegistered: false
    },
    {
      id: "2",
      title: "Sustainable Business Practices Summit",
      description: "Discover how to implement eco-friendly practices in your operations.",
      date: "Jun 22, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Regional Conference Center",
      attendees: 78,
      category: "Conference",
      type: "In Person" as const,
      isRegistered: true
    },
    {
      id: "3",
      title: "MSME Networking Mixer",
      description: "Connect with other small business owners in your region.",
      date: "Jun 28, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Community Business Hub",
      attendees: 35,
      category: "Networking",
      type: "In Person" as const,
      isRegistered: false
    },
    {
      id: "4",
      title: "Supply Chain Optimization Workshop",
      description: "Learn techniques to improve your supply chain efficiency.",
      date: "Jul 5, 2025",
      time: "1:00 PM - 3:00 PM",
      location: "Virtual",
      attendees: 28,
      category: "Training",
      type: "Virtual" as const,
      isRegistered: false
    }
  ];
  
  return (
    <SimpleDashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="MSME Events"
    >
      <div className="py-4 md:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 md:mb-8">
          <div>
            <h1 className="page-title">Upcoming MSME Events</h1>
            <p className="page-subtitle">
              Workshops, networking opportunities, and training sessions tailored for MSMEs.
            </p>
          </div>
          <Button className="mt-4 sm:mt-0 flex items-center gap-2 bg-navy-blue hover:bg-dark-navy">
            <Calendar className="h-4 w-4 md:h-5 md:w-5" />
            <span>Sync Calendar</span>
          </Button>
        </div>
        
        <div className="grid gap-4 md:gap-6 md:grid-cols-2">
          {msmeEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </SimpleDashboardLayout>
  );
};

export default MSMEEvents;
