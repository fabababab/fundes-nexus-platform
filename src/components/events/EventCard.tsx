
import React from "react";
import { Card } from "@/components/ui/card";
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
  const dateParts = event.date.split(' ');
  const month = dateParts[0].toUpperCase();
  const day = dateParts[1].replace(',', '');
  const year = dateParts[2];
  
  return (
    <Card className="overflow-hidden transition-all duration-normal hover:shadow-md">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-[80px] bg-light-blue p-4 flex flex-col justify-center items-center text-center">
          <p className="text-xs font-semibold text-navy-blue uppercase">{month}</p>
          <p className="text-3xl font-bold text-navy-blue">{day}</p>
          <p className="text-xs text-navy-blue">{year}</p>
        </div>
        
        <div className="p-responsive flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap gap-2">
                <Badge variant="default" className="bg-primary text-primary-foreground">
                  {event.category}
                </Badge>
                <Badge variant="outline" className="border-primary text-primary flex items-center gap-1">
                  {event.type === "Virtual" ? <Video className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                  {event.type}
                </Badge>
              </div>
              
              <h3 className="text-h4 text-primary">{event.title}</h3>
              
              <div className="flex flex-col sm:flex-row gap-3 text-sm text-neutral-gray">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-accent" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-accent" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-accent" />
                  {event.attendees} Attendees
                </div>
              </div>
              
              <p className="text-body text-neutral-gray">{event.description}</p>
            </div>
            
            <div className="flex flex-col gap-2 min-w-[140px]">
              {event.isRegistered ? (
                <>
                  <Badge className="bg-pale-blue border-none text-primary justify-center py-1">
                    Registered
                  </Badge>
                  <Button variant="outline" className="border-primary text-primary">
                    View Details
                  </Button>
                  <Button variant="ghost" className="text-neutral-gray hover:text-accent">
                    Cancel Registration
                  </Button>
                </>
              ) : (
                <>
                  <Button className="bg-accent hover:bg-primary">
                    Register
                  </Button>
                  <Button variant="outline" className="border-primary text-primary">
                    View Details
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
