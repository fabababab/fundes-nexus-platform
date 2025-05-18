
import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MoreHorizontal, Clock, MapPin, Users, PlusCircle, Search, Filter, CheckCircle2, X } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addDays, addMonths, startOfDay, isSameDay } from "date-fns";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import { UserRole } from "@/types/common";

interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  startTime: string;
  endTime: string;
  location: string;
  type: "workshop" | "networking" | "strategy" | "presentation" | "other";
  attendees: number;
  capacity: number;
  organizer: string;
}

const FundesEvents = () => {
  const [activeRole, setActiveRole] = useState<UserRole>("fundes");
  const [date, setDate] = useState<Date>(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEventType, setSelectedEventType] = useState<string | null>(null);
  
  const eventsData: Event[] = [
    {
      id: 1,
      title: "Impact Investment Workshop",
      description: "A workshop focusing on impact investment strategies and best practices in the green energy sector.",
      date: new Date(),
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      location: "Main Conference Room",
      type: "workshop",
      attendees: 18,
      capacity: 25,
      organizer: "Investment Team"
    },
    {
      id: 2,
      title: "Startup Pitch Day",
      description: "Selected startups will present their innovative solutions to potential investors and corporate partners.",
      date: addDays(new Date(), 1),
      startTime: "2:00 PM",
      endTime: "5:00 PM",
      location: "Innovation Hub",
      type: "presentation",
      attendees: 32,
      capacity: 50,
      organizer: "Startup Relations"
    },
    {
      id: 3,
      title: "Quarterly Strategy Meeting",
      description: "Review of Q1 performance and planning for Q2 initiatives across all stakeholder groups.",
      date: addDays(new Date(), 2),
      startTime: "9:00 AM",
      endTime: "11:30 AM",
      location: "Executive Boardroom",
      type: "strategy",
      attendees: 12,
      capacity: 15,
      organizer: "Executive Team"
    },
    {
      id: 4,
      title: "Healthcare Innovation Networking",
      description: "Networking event for healthcare startups, investors, and industry experts to foster collaboration.",
      date: addDays(new Date(), 3),
      startTime: "6:00 PM",
      endTime: "8:00 PM",
      location: "Rooftop Garden",
      type: "networking",
      attendees: 45,
      capacity: 60,
      organizer: "Community Team"
    },
    {
      id: 5,
      title: "Sustainable Finance Workshop",
      description: "Expert-led session on integrating ESG metrics into investment decisions and financial reporting.",
      date: addDays(new Date(), 5),
      startTime: "1:00 PM",
      endTime: "3:30 PM",
      location: "Training Room B",
      type: "workshop",
      attendees: 22,
      capacity: 30,
      organizer: "Finance Team"
    },
    {
      id: 6,
      title: "Corporate-Startup Partnership Forum",
      description: "Discussion on best practices for effective corporate-startup collaborations and case studies.",
      date: addDays(new Date(), 7),
      startTime: "11:00 AM",
      endTime: "1:30 PM",
      location: "Main Conference Room",
      type: "strategy",
      attendees: 28,
      capacity: 35,
      organizer: "Partnership Team"
    },
    {
      id: 7,
      title: "EdTech Showcase",
      description: "Educational technology startups demonstrate their latest solutions to potential partners and investors.",
      date: addMonths(new Date(), 1),
      startTime: "3:00 PM",
      endTime: "6:00 PM",
      location: "Innovation Hub",
      type: "presentation",
      attendees: 0,
      capacity: 40,
      organizer: "Education Sector Team"
    }
  ];

  const handleRoleChange = (role: UserRole) => {
    setActiveRole(role);
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "workshop":
        return "bg-blue-500";
      case "networking":
        return "bg-green-500";
      case "strategy":
        return "bg-purple-500";
      case "presentation":
        return "bg-amber-500";
      default:
        return "bg-gray-500";
    }
  };

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case "workshop":
        return "bg-blue-100 text-blue-800";
      case "networking":
        return "bg-green-100 text-green-800";
      case "strategy":
        return "bg-purple-100 text-purple-800";
      case "presentation":
        return "bg-amber-100 text-amber-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEvents = eventsData
    .filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedEventType ? event.type === selectedEventType : true;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const todaysEvents = filteredEvents.filter(event => 
    isSameDay(event.date, date)
  );

  const upcomingEvents = filteredEvents.filter(event => 
    event.date >= startOfDay(new Date())
  ).slice(0, 5);

  return (
    <SimpleDashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="Event & Workshop Scheduler"
    >
      <div className="h-[calc(100vh-9rem)]">
        <Tabs defaultValue="calendar" className="h-full">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <div className="flex items-center gap-2">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" /> Create Event
              </Button>
            </div>
          </div>

          <TabsContent value="calendar" className="h-[calc(100%-3rem)]">
            <div className="grid grid-cols-3 gap-6 h-full">
              <div className="col-span-2 flex flex-col h-full">
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Events Calendar</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon">
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="font-medium">{format(date, 'MMMM yyyy')}</span>
                        <Button variant="outline" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 p-0">
                    <div className="p-3 h-full">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => date && setDate(date)}
                        className="h-full"
                        modifiersStyles={{
                          today: {
                            fontWeight: 'bold'
                          }
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Events for {format(date, 'MMMM d, yyyy')}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {todaysEvents.length > 0 ? (
                      <div className="space-y-4">
                        {todaysEvents.map(event => (
                          <div key={event.id} className="flex items-start gap-4 p-3 border rounded-lg">
                            <div className={`${getEventTypeColor(event.type)} w-1 h-full rounded-full self-stretch`}></div>
                            <div className="flex-1">
                              <div className="flex items-start justify-between">
                                <div>
                                  <h3 className="font-medium text-lg">{event.title}</h3>
                                  <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" /> {event.startTime} - {event.endTime}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <MapPin className="h-4 w-4" /> {event.location}
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Users className="h-4 w-4" /> {event.attendees}/{event.capacity}
                                    </span>
                                  </div>
                                </div>
                                <div>
                                  <Badge className={getEventBadgeColor(event.type)}>{event.type}</Badge>
                                </div>
                              </div>
                              <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                              <div className="mt-3 flex items-center justify-between">
                                <div className="text-sm">Organized by: <span className="font-medium">{event.organizer}</span></div>
                                <div className="flex items-center gap-2">
                                  <Button variant="outline" size="sm">View Details</Button>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="icon">
                                        <MoreHorizontal className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem>Edit Event</DropdownMenuItem>
                                      <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                                      <DropdownMenuItem>Export Details</DropdownMenuItem>
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem className="text-red-500">Cancel Event</DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <CalendarIcon className="mx-auto h-12 w-12 opacity-20 mb-3" />
                        <p>No events scheduled for this day</p>
                        <Button variant="outline" className="mt-4">
                          <PlusCircle className="mr-2 h-4 w-4" /> Add Event
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="h-full">
                <Card className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    <div className="mb-4 space-y-2">
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-muted-foreground" />
                        <Input 
                          placeholder="Search events..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="flex-1"
                        />
                      </div>
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="flex-1 justify-start">
                              {selectedEventType ? `Filter: ${selectedEventType}` : "Filter by type"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-60 p-0">
                            <div className="p-2">
                              <div 
                                className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between"
                                onClick={() => setSelectedEventType(null)}
                              >
                                <span>All Events</span>
                                {!selectedEventType && <CheckCircle2 className="h-4 w-4 text-primary" />}
                              </div>
                              <div 
                                className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between"
                                onClick={() => setSelectedEventType("workshop")}
                              >
                                <span>Workshops</span>
                                {selectedEventType === "workshop" && <CheckCircle2 className="h-4 w-4 text-primary" />}
                              </div>
                              <div 
                                className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between"
                                onClick={() => setSelectedEventType("networking")}
                              >
                                <span>Networking</span>
                                {selectedEventType === "networking" && <CheckCircle2 className="h-4 w-4 text-primary" />}
                              </div>
                              <div 
                                className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between"
                                onClick={() => setSelectedEventType("strategy")}
                              >
                                <span>Strategy Meetings</span>
                                {selectedEventType === "strategy" && <CheckCircle2 className="h-4 w-4 text-primary" />}
                              </div>
                              <div 
                                className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center justify-between"
                                onClick={() => setSelectedEventType("presentation")}
                              >
                                <span>Presentations</span>
                                {selectedEventType === "presentation" && <CheckCircle2 className="h-4 w-4 text-primary" />}
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </div>
                      {selectedEventType && (
                        <div className="flex items-center">
                          <Badge className="flex items-center gap-1">
                            {selectedEventType}
                            <button onClick={() => setSelectedEventType(null)}>
                              <X className="h-3 w-3 ml-1" />
                            </button>
                          </Badge>
                        </div>
                      )}
                    </div>
                    <ScrollArea className="flex-1">
                      <div className="space-y-4">
                        {upcomingEvents.length > 0 ? (
                          upcomingEvents.map(event => (
                            <Card key={event.id} className="overflow-hidden">
                              <div className={`h-1 ${getEventTypeColor(event.type)}`}></div>
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                  <h3 className="font-medium">{event.title}</h3>
                                  <Badge className={getEventBadgeColor(event.type)}>{event.type}</Badge>
                                </div>
                                <div className="mt-2 flex flex-col space-y-1 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4" /> 
                                    <span>{format(event.date, 'MMM d, yyyy')}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4" />
                                    <span>{event.startTime} - {event.endTime}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4" />
                                    <span>{event.location}</span>
                                  </div>
                                </div>
                              </CardContent>
                              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                                <div className="flex items-center text-sm">
                                  <Users className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span>{event.attendees}/{event.capacity}</span>
                                </div>
                                <Button variant="outline" size="sm">View</Button>
                              </CardFooter>
                            </Card>
                          ))
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <CalendarIcon className="mx-auto h-10 w-10 opacity-20 mb-2" />
                            <p>No upcoming events found</p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="list" className="h-[calc(100%-3rem)]">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>All Events</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input 
                        placeholder="Search events..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 w-64"
                      />
                    </div>
                    <Select value={selectedEventType || ""} onValueChange={(value) => setSelectedEventType(value || null)}>
                      <SelectTrigger className="w-36">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="">All types</SelectItem>
                          <SelectItem value="workshop">Workshop</SelectItem>
                          <SelectItem value="networking">Networking</SelectItem>
                          <SelectItem value="strategy">Strategy</SelectItem>
                          <SelectItem value="presentation">Presentation</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[calc(100vh-16rem)]">
                  <div className="space-y-4">
                    {filteredEvents.length > 0 ? (
                      filteredEvents.map(event => (
                        <div key={event.id} className="flex items-start gap-4 p-4 border rounded-lg">
                          <div className={`${getEventTypeColor(event.type)} w-1 h-full rounded-full self-stretch`}></div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-lg">{event.title}</h3>
                                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-sm text-muted-foreground">
                                  <span className="flex items-center gap-1">
                                    <CalendarIcon className="h-4 w-4" /> {format(event.date, 'MMM d, yyyy')}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" /> {event.startTime} - {event.endTime}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" /> {event.location}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Users className="h-4 w-4" /> {event.attendees}/{event.capacity}
                                  </span>
                                </div>
                              </div>
                              <div>
                                <Badge className={getEventBadgeColor(event.type)}>{event.type}</Badge>
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                            <div className="mt-3 flex items-center justify-between">
                              <div className="text-sm">Organized by: <span className="font-medium">{event.organizer}</span></div>
                              <div className="flex items-center gap-2">
                                <Button variant="outline" size="sm">View Details</Button>
                                <Button variant="outline" size="sm">Edit</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <CalendarIcon className="mx-auto h-12 w-12 opacity-20 mb-3" />
                        <p>No events found matching your criteria</p>
                        <Button variant="outline" className="mt-4" onClick={() => {
                          setSearchQuery("");
                          setSelectedEventType(null);
                        }}>
                          Clear filters
                        </Button>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SimpleDashboardLayout>
  );
};

export default FundesEvents;
