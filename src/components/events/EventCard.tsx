
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
    <Card className="event-card">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/6 event-card-date">
          <div className="text-center">
            <p className="event-card-date-month">{month}</p>
            <p className="event-card-date-day">{day}</p>
            <p className="event-card-date-year">{year}</p>
          </div>
        </div>
        
        <div className="event-card-content flex-1">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            <div className="space-y-4 flex-1">
              <div className="event-card-badges">
                <Badge className="event-card-category-badge">
                  {event.category}
                </Badge>
                <Badge variant="outline" className="event-card-type-badge">
                  {event.type === "Virtual" ? <Video className="mr-1 h-4 w-4" /> : <MapPin className="mr-1 h-4 w-4" />}
                  {event.type}
                </Badge>
              </div>
              
              <h3 className="event-card-title">{event.title}</h3>
              
              <div className="event-card-details">
                <div className="event-card-detail">
                  <Clock className="event-card-detail-icon" />
                  {event.time}
                </div>
                <div className="event-card-detail">
                  <MapPin className="event-card-detail-icon" />
                  {event.location}
                </div>
                <div className="event-card-detail">
                  <Users className="event-card-detail-icon" />
                  {event.attendees} Attendees
                </div>
              </div>
              
              <p className="event-card-description">{event.description}</p>
            </div>
            
            <div className="event-card-actions">
              {event.isRegistered ? (
                <>
                  <Badge className="event-registered-badge">
                    Registered
                  </Badge>
                  <Button variant="outline" className="event-details-button">
                    View Details
                  </Button>
                  <Button variant="ghost" className="event-cancel-button">
                    Cancel Registration
                  </Button>
                </>
              ) : (
                <>
                  <Button className="event-register-button">
                    Register
                  </Button>
                  <Button variant="outline" className="event-details-button">
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
