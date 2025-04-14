
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
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/6 bg-slate-50 p-4 flex flex-col justify-center items-center">
          <div className="text-center">
            <p className="text-sm text-gray-500 uppercase">{month}</p>
            <p className="text-4xl font-bold">{day}</p>
            <p className="text-sm text-gray-500">{year}</p>
          </div>
        </div>
        
        <CardContent className="flex-1 p-6">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="bg-slate-900 text-white rounded-md px-4 py-1 hover:bg-slate-800">
                  {event.category}
                </Badge>
                <Badge variant="outline" className="bg-white text-slate-900 rounded-md px-3 py-1 border border-slate-200">
                  {event.type === "Virtual" ? <Video className="mr-1 h-4 w-4" /> : <MapPin className="mr-1 h-4 w-4" />}
                  {event.type}
                </Badge>
              </div>
              
              <h3 className="text-2xl font-semibold">{event.title}</h3>
              
              <div className="flex flex-col sm:flex-row gap-6 text-gray-500">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4" />
                  {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="mr-2 h-4 w-4" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="mr-2 h-4 w-4" />
                  {event.attendees} Attendees
                </div>
              </div>
              
              <p className="text-gray-500">{event.description}</p>
            </div>
            
            <div className="flex flex-col gap-4 mt-4 md:mt-0">
              {event.isRegistered ? (
                <>
                  <Badge variant="outline" className="bg-gray-100 text-slate-900 px-4 py-1 text-center rounded-md">
                    Registered
                  </Badge>
                  <Button variant="outline" className="rounded-full border-2 border-slate-900 px-6 py-2 h-auto font-medium">
                    View Details
                  </Button>
                  <Button variant="ghost" className="px-6 py-2 h-auto font-medium">
                    Cancel Registration
                  </Button>
                </>
              ) : (
                <>
                  <Button className="rounded-full bg-slate-900 px-6 py-2 h-auto font-medium">
                    Register
                  </Button>
                  <Button variant="outline" className="rounded-full border-2 border-slate-900 px-6 py-2 h-auto font-medium">
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
