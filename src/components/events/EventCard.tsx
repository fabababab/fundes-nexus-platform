
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
  const dateParts = event.date.split(' ');
  const month = dateParts[0].toUpperCase();
  const day = dateParts[1].replace(',', '');
  const year = dateParts[2];
  
  return (
    <Card className="overflow-hidden border-light-blue">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/6 bg-light-blue p-4 flex flex-col justify-center items-center">
          <div className="text-center">
            <p className="text-sm text-navy-blue uppercase font-semibold">{month}</p>
            <p className="text-4xl font-bold text-navy-blue">{day}</p>
            <p className="text-sm text-navy-blue">{year}</p>
          </div>
        </div>
        
        <CardContent className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-navy-blue text-white rounded-md px-4 py-1 hover:bg-dark-navy">
                  {event.category}
                </Badge>
                <Badge variant="outline" className="bg-white text-bright-blue rounded-md px-3 py-1 border border-light-blue">
                  {event.type === "Virtual" ? <Video className="mr-1 h-4 w-4" /> : <MapPin className="mr-1 h-4 w-4" />}
                  {event.type}
                </Badge>
              </div>
              
              <h3 className="text-2xl text-navy-blue font-medium">{event.title}</h3>
              
              <div className="flex flex-col sm:flex-row gap-6 text-neutral-gray">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-bright-blue" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4 text-bright-blue" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4 text-bright-blue" />
                  {event.attendees} Attendees
                </div>
              </div>
              
              <p className="text-neutral-gray">{event.description}</p>
            </div>
            
            <div className="flex flex-col gap-4 mt-4 md:mt-0">
              {event.isRegistered ? (
                <>
                  <Badge variant="outline" className="bg-pale-blue text-navy-blue px-4 py-1 text-center rounded-md">
                    Registered
                  </Badge>
                  <Button variant="outline" className="rounded-full border-2 border-navy-blue px-6 py-2 h-auto font-medium text-navy-blue hover:bg-light-blue/20">
                    View Details
                  </Button>
                  <Button variant="ghost" className="px-6 py-2 h-auto font-medium text-neutral-gray hover:text-bright-blue">
                    Cancel Registration
                  </Button>
                </>
              ) : (
                <>
                  <Button className="rounded-full bg-bright-blue hover:bg-navy-blue px-6 py-2 h-auto font-medium">
                    Register
                  </Button>
                  <Button variant="outline" className="rounded-full border-2 border-navy-blue px-6 py-2 h-auto font-medium text-navy-blue hover:bg-light-blue/20">
                    View Details
                  </Button>
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
