
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Video } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: "In Person" | "Virtual";
  category: string;
  description: string;
  attendees: number;
  isRegistered: boolean;
}

interface EventCardProps {
  event: Event;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 bg-muted p-4 flex flex-col justify-center items-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground uppercase tracking-wider">{event.date.split(' ')[0]}</p>
            <p className="text-3xl font-bold">{event.date.split(' ')[1].replace(',', '')}</p>
            <p className="text-sm font-medium uppercase">{event.date.split(' ')[2]}</p>
          </div>
        </div>
        
        <CardContent className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2">
                <Badge variant={event.type === "Virtual" ? "outline" : "default"} className="rounded-sm">
                  {event.category}
                </Badge>
                <Badge variant="secondary" className="rounded-sm">
                  {event.type === "Virtual" ? <Video className="mr-1 h-3 w-3" /> : <MapPin className="mr-1 h-3 w-3" />}
                  {event.type}
                </Badge>
              </div>
              
              <h3 className="text-lg font-bold">{event.title}</h3>
              
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-muted-foreground">
                <div className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-1 h-3 w-3" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="mr-1 h-3 w-3" />
                  {event.attendees} Attendees
                </div>
              </div>
              
              <p className="text-sm mt-2 text-muted-foreground">{event.description}</p>
            </div>
            
            <div className="flex flex-col gap-2 mt-4 md:mt-0 w-full md:w-auto">
              {event.isRegistered ? (
                <>
                  <Badge variant="secondary">Registered</Badge>
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="ghost" size="sm">Cancel Registration</Button>
                </>
              ) : (
                <>
                  <Button size="sm">Register</Button>
                  <Button variant="outline" size="sm">View Details</Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default EventCard;
