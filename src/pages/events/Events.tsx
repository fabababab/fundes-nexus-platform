
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Users, Video, MapPin, Clock, Filter, Calendar as CalendarIcon, Home, BarChart3, MessageSquare, FileText, Briefcase, Database } from "lucide-react";
import EventCard from "@/components/events/EventCard";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface EventsProps {
  activeRole?: "company" | "startup" | "investor";
}

const Events = ({ activeRole = "investor" }: EventsProps) => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<"company" | "startup" | "investor">(activeRole);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const menuItems = [
    { title: "Dashboard", icon: Home, url: "/dashboard" },
    { title: "Events", icon: Calendar, url: "/events", notifications: 3 },
    { title: "Analytics", icon: BarChart3, url: "/analytics" },
    { title: "Network", icon: Users, url: "/network", notifications: 2 },
    { title: "Messages", icon: MessageSquare, url: "/messages", notifications: 5 },
    { title: "Documents", icon: FileText, url: "/documents" },
    { title: "Investments", icon: Briefcase, url: "/investments" },
    { title: "Database", icon: Database, url: "/database" },
  ];

  const upcomingEvents = [
    {
      id: "1",
      title: "Sustainability Innovation Summit",
      date: "April 25, 2025",
      time: "10:00 AM - 5:00 PM",
      location: "San Francisco, CA",
      type: "In Person" as const,
      category: "Conference",
      description: "Connect with leaders in sustainable innovation and explore partnership opportunities.",
      attendees: 120,
      isRegistered: true,
    },
    {
      id: "2",
      title: "CleanTech Pitch Competition",
      date: "May 10, 2025",
      time: "2:00 PM - 6:00 PM",
      location: "Online",
      type: "Virtual" as const,
      category: "Competition",
      description: "Watch innovative startups pitch their cleantech solutions to a panel of investors.",
      attendees: 85,
      isRegistered: false,
    },
    {
      id: "3",
      title: "Impact Investor Networking",
      date: "May 18, 2025",
      time: "6:00 PM - 9:00 PM",
      location: "New York, NY",
      type: "In Person" as const,
      category: "Networking",
      description: "Exclusive networking event for impact investors and sustainability-focused startups.",
      attendees: 50,
      isRegistered: true,
    }
  ];

  const recommendedEvents = [
    {
      id: "4",
      title: "Circular Economy Workshop",
      date: "June 5, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Boston, MA",
      type: "In Person" as const,
      category: "Workshop",
      description: "Learn practical strategies for implementing circular economy principles in your business.",
      attendees: 30,
      isRegistered: false,
    },
    {
      id: "5",
      title: "Renewable Energy Funding Forum",
      date: "June 15, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Online",
      type: "Virtual" as const,
      category: "Forum",
      description: "Discover funding opportunities for renewable energy projects and connect with potential investors.",
      attendees: 200,
      isRegistered: false,
    }
  ];

  return (
    <DashboardLayout 
      menuItems={menuItems} 
      activeRole={selectedRole} 
      onRoleChange={setSelectedRole}
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Events</h1>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Create Event
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1 space-y-6">
            <Tabs defaultValue="upcoming">
              <div className="flex items-center justify-between mb-4">
                <TabsList>
                  <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                  <TabsTrigger value="recommended">Recommended</TabsTrigger>
                  <TabsTrigger value="past">Past</TabsTrigger>
                </TabsList>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                </Button>
              </div>
              
              <TabsContent value="upcoming" className="space-y-4">
                {upcomingEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </TabsContent>
              
              <TabsContent value="recommended" className="space-y-4">
                {recommendedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </TabsContent>
              
              <TabsContent value="past" className="space-y-4">
                <div className="flex items-center justify-center p-12 border rounded-md">
                  <p className="text-muted-foreground">No past events to display</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="md:w-80 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Calendar</CardTitle>
                <CardDescription>View and select event dates</CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <CalendarComponent
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-md border"
                />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Your Events</CardTitle>
                <CardDescription>Events you're registered for</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sustainability Summit</p>
                      <p className="text-xs text-muted-foreground">Apr 25, 2025</p>
                    </div>
                    <Badge className="ml-auto">Registered</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Investor Networking</p>
                      <p className="text-xs text-muted-foreground">May 18, 2025</p>
                    </div>
                    <Badge className="ml-auto">Registered</Badge>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">View All</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Events;
