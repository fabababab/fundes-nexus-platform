
import React, { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayoutRefactored";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarRange, Filter, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import EventCard from "@/components/events/EventCard";
import { useNavigate } from "react-router-dom";

interface EventsProps {
  activeRole?: "company" | "startup" | "investor";
}

const Events = ({ activeRole = "investor" }: EventsProps) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"company" | "startup" | "investor">(activeRole);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const menuItems = [
    { title: "All Events", icon: CalendarRange, url: "/events" },
    { title: "Upcoming", icon: CalendarRange, url: "/events/upcoming", notifications: 2 },
    { title: "Past", icon: CalendarRange, url: "/events/past" },
    { title: "My Events", icon: CalendarRange, url: "/events/mine", notifications: 1 },
  ];

  type EventType = "In Person" | "Virtual";
  
  interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    type: EventType;
    category: string;
    description: string;
    attendees: number;
    isRegistered: boolean;
  }

  const upcomingEvents: Event[] = [
    {
      id: "1",
      title: "Impact Investment Summit",
      date: "April 15, 2025",
      time: "9:00 AM - 5:00 PM",
      location: "San Francisco Convention Center",
      type: "In Person" as const,
      category: "Conference",
      description: "Join the largest gathering of impact investors and sustainable startups.",
      attendees: 342,
      isRegistered: true,
    },
    {
      id: "2",
      title: "Sustainable Tech Pitch Night",
      date: "April 20, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "Online",
      type: "Virtual" as const,
      category: "Pitch Event",
      description: "Watch innovative startups pitch their sustainable technology solutions.",
      attendees: 156,
      isRegistered: false,
    },
    {
      id: "3",
      title: "ESG Metrics Workshop",
      date: "April 22, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Online",
      type: "Virtual" as const,
      category: "Workshop",
      description: "Learn how to measure and report on environmental, social, and governance metrics.",
      attendees: 89,
      isRegistered: false,
    },
  ];

  return (
    <DashboardLayout 
      menuItems={menuItems} 
      activeRole={selectedRole} 
      onRoleChange={setSelectedRole}
      pageTitle="Events"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Events</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <Tabs defaultValue="upcoming">
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="mine">My Events</TabsTrigger>
              </TabsList>
              <TabsContent value="upcoming" className="space-y-4 mt-4">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </TabsContent>
              <TabsContent value="trending" className="space-y-4 mt-4">
                <div className="flex items-center justify-center h-40 border border-dashed rounded-lg">
                  <p className="text-sm text-muted-foreground">Trending events will appear here</p>
                </div>
              </TabsContent>
              <TabsContent value="recommended" className="space-y-4 mt-4">
                <div className="flex items-center justify-center h-40 border border-dashed rounded-lg">
                  <p className="text-sm text-muted-foreground">Recommended events will appear here</p>
                </div>
              </TabsContent>
              <TabsContent value="mine" className="space-y-4 mt-4">
                <div className="flex items-center justify-center h-40 border border-dashed rounded-lg">
                  <p className="text-sm text-muted-foreground">Your registered events will appear here</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>
                  Browse events by date
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
                <div className="mt-4">
                  <h3 className="font-medium">{selectedDate?.toDateString()}</h3>
                  <div className="mt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="bg-primary/10">Impact Investment Summit</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">1 event on this date</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>
                  Filter events by type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Conference</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Workshop</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Pitch Event</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Networking</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Webinar</Badge>
                  <Badge variant="outline" className="cursor-pointer hover:bg-primary/10">Hackathon</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Events;
