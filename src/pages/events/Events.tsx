
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from "date-fns";
import NavigationBar from "../../components/layout/NavigationBar";
import DashboardLayout from "@/components/layout/DashboardLayoutRefactored";

interface Event {
  id: number;
  title: string;
  date: Date;
  time: string;
  location: string;
  attendees: number;
  capacity: number;
  tags: string[];
  description: string;
  isRegistered: boolean;
}

const Events = () => {
  const [activeRole, setActiveRole] = useState<"company" | "startup" | "investor" | "fundes">("investor");
  
  const handleRoleChange = (role: "company" | "startup" | "investor" | "fundes") => {
    setActiveRole(role);
  };

  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Annual Investor Summit",
      date: addDays(new Date(), 7),
      time: "9:00 AM - 5:00 PM",
      location: "Grand Conference Center",
      attendees: 120,
      capacity: 150,
      tags: ["Investment", "Networking"],
      description: "Join us for our annual investor summit where leading industry experts share insights on market trends and investment opportunities.",
      isRegistered: true
    },
    {
      id: 2,
      title: "Startup Pitch Competition",
      date: addDays(new Date(), 14),
      time: "1:00 PM - 4:00 PM",
      location: "Innovation Hub",
      attendees: 45,
      capacity: 50,
      tags: ["Startups", "Pitch"],
      description: "Watch promising startups pitch their innovative solutions to a panel of investors and industry experts.",
      isRegistered: false
    },
    {
      id: 3,
      title: "ESG Investment Workshop",
      date: addDays(new Date(), 21),
      time: "10:00 AM - 12:00 PM",
      location: "Virtual Meeting",
      attendees: 78,
      capacity: 100,
      tags: ["ESG", "Workshop"],
      description: "Learn about environmental, social, and governance factors in investment decision-making.",
      isRegistered: false
    }
  ]);

  const handleRegister = (id: number) => {
    setEvents(events.map(event => 
      event.id === id 
        ? { ...event, isRegistered: !event.isRegistered, attendees: event.isRegistered ? event.attendees - 1 : event.attendees + 1 } 
        : event
    ));
  };

  return (
    <DashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="Events"
    >
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Upcoming Events</h1>
          <Button>Create Event</Button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <div className="h-2 bg-primary"></div>
              <CardHeader>
                <CardTitle>{event.title}</CardTitle>
                <div className="flex flex-wrap gap-2 mt-2">
                  {event.tags.map((tag) => (
                    <Badge key={tag} variant="outline">{tag}</Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-muted-foreground">{event.description}</p>
                  
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{format(event.date, 'MMMM d, yyyy')}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <Users className="mr-2 h-4 w-4" />
                    <span>{event.attendees} / {event.capacity} attendees</span>
                  </div>
                  
                  <Button 
                    variant={event.isRegistered ? "outline" : "default"} 
                    onClick={() => handleRegister(event.id)}
                    className="w-full"
                  >
                    {event.isRegistered ? "Cancel Registration" : "Register"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Events;
