
import React, { useState } from "react";
import { SimpleDashboardLayout } from "@/components/layout/SimpleDashboardLayout";
import EventCard from "@/components/events/EventCard";
import { UserRole } from "@/types/common";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  ChevronDown,
  MapPin, 
  Users, 
  Clock
} from "lucide-react";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Form schema
const eventRegistrationSchema = z.object({
  name: z.string().min(2, { message: "Name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  organization: z.string().min(2, { message: "Organization name is required" }),
  position: z.string().optional(),
  expectations: z.string().optional(),
});

type EventRegistrationForm = z.infer<typeof eventRegistrationSchema>;

const MSMEEvents: React.FC = () => {
  // MSME role is fixed for this page
  const [activeRole] = useState<UserRole>("msme");
  const [openEvent, setOpenEvent] = useState<string | null>(null);
  const [eventToRegister, setEventToRegister] = useState<any | null>(null);
  
  const form = useForm<EventRegistrationForm>({
    resolver: zodResolver(eventRegistrationSchema),
    defaultValues: {
      name: "",
      email: "",
      organization: "",
      position: "",
      expectations: "",
    },
  });
  
  const handleRoleChange = (role: UserRole) => {
    // In a real app, this might navigate or change global state
    console.log("Role change attempt to:", role);
  };

  const toggleEventDetails = (eventId: string) => {
    setOpenEvent(openEvent === eventId ? null : eventId);
  };

  const openRegistrationForm = (event: any) => {
    setEventToRegister(event);
  };

  const onSubmit = (data: EventRegistrationForm) => {
    console.log("Registration data:", data);
    console.log("For event:", eventToRegister?.title);
    toast.success("Registration successful! You will receive a confirmation email shortly.", {
      description: `You've registered for: ${eventToRegister?.title}`
    });
    setEventToRegister(null);
    form.reset();
  };

  const msmeEvents = [
    {
      id: "1",
      title: "Financial Literacy Workshop",
      description: "Learn essential financial skills for small business success.",
      longDescription: "This comprehensive workshop will cover fundamental financial concepts every small business owner should know. Topics include bookkeeping basics, cash flow management, understanding financial statements, tax planning strategies, and tools for financial forecasting. Led by experienced financial advisors who specialize in working with MSMEs, this workshop offers practical, actionable advice that you can implement immediately to improve your business's financial health.",
      date: "Jun 15, 2025",
      time: "10:00 AM - 12:00 PM",
      location: "Virtual",
      attendees: 42,
      category: "Training",
      type: "Virtual" as const,
      isRegistered: false,
      speakers: ["Maria Rodriguez, CPA", "John Okafor, Financial Advisor"],
      prerequisites: "Basic understanding of business operations. Bring your laptop and recent financial statements for practical exercises."
    },
    {
      id: "2",
      title: "Sustainable Business Practices Summit",
      description: "Discover how to implement eco-friendly practices in your operations.",
      longDescription: "Join industry leaders and sustainability experts for a full-day summit exploring how MSMEs can adopt environmentally responsible business practices while improving profitability. Sessions will cover sustainable supply chain management, energy efficiency strategies, waste reduction techniques, eco-friendly packaging options, and marketing your sustainability efforts. You'll leave with a practical roadmap for transforming your business operations to be more sustainable and appealing to eco-conscious consumers.",
      date: "Jun 22, 2025",
      time: "9:00 AM - 4:00 PM",
      location: "Regional Conference Center",
      attendees: 78,
      category: "Conference",
      type: "In Person" as const,
      isRegistered: true,
      speakers: ["Dr. Elena Chen, Sustainability Expert", "Michael Osei, Green Business Consultant"],
      prerequisites: "None. All materials will be provided."
    },
    {
      id: "3",
      title: "MSME Networking Mixer",
      description: "Connect with other small business owners in your region.",
      longDescription: "This casual networking event brings together small business owners, entrepreneurs, and industry partners for an evening of meaningful connections. The format includes structured networking activities designed to facilitate introductions based on compatible business interests, followed by open networking time. Light refreshments will be served. This is your opportunity to expand your professional network, find potential collaborators, and share experiences with peers who understand the unique challenges of running a small business.",
      date: "Jun 28, 2025",
      time: "6:00 PM - 8:00 PM",
      location: "Community Business Hub",
      attendees: 35,
      category: "Networking",
      type: "In Person" as const,
      isRegistered: false,
      speakers: [],
      prerequisites: "Bring business cards and be prepared to give a 30-second introduction of your business."
    },
    {
      id: "4",
      title: "Supply Chain Optimization Workshop",
      description: "Learn techniques to improve your supply chain efficiency.",
      longDescription: "This interactive workshop will help you identify and address inefficiencies in your supply chain. Expert consultants will guide you through practical exercises to map your current supply chain, identify bottlenecks, evaluate supplier relationships, implement inventory optimization techniques, and leverage technology for better supply chain visibility. Participants will develop a customized action plan to reduce costs, minimize delays, and improve overall operational efficiency. Limited to 30 participants to ensure personalized attention.",
      date: "Jul 5, 2025",
      time: "1:00 PM - 3:00 PM",
      location: "Virtual",
      attendees: 28,
      category: "Training",
      type: "Virtual" as const,
      isRegistered: false,
      speakers: ["Samantha Lee, Supply Chain Consultant", "David Nkosi, Operations Management Specialist"],
      prerequisites: "Please complete the pre-workshop survey that will be emailed to you after registration."
    }
  ];
  
  return (
    <SimpleDashboardLayout
      activeRole={activeRole}
      onRoleChange={handleRoleChange}
      pageTitle="MSME Events"
    >
      <div className="py-responsive">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-h2 mb-2">Upcoming MSME Events</h1>
            <p className="text-body text-neutral-gray">
              Workshops, networking opportunities, and training sessions tailored for MSMEs.
            </p>
          </div>
          <Button 
            className="mt-4 sm:mt-0 flex items-center gap-2"
            variant="default"
          >
            <Calendar className="h-4 w-4" />
            <span>Sync Calendar</span>
          </Button>
        </div>
        
        <div className="grid gap-responsive grid-cols-1">
          {msmeEvents.map((event) => (
            <div key={event.id} className="border rounded-lg shadow-sm overflow-hidden bg-white">
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-gray-500 mt-1">{event.description}</p>
                  </div>
                  <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                    {event.category}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} attendees</span>
                  </div>
                </div>
                
                {/* Registration/Status button */}
                <div className="mt-5">
                  {event.isRegistered ? (
                    <Button variant="secondary" className="w-full sm:w-auto">
                      You're Registered
                    </Button>
                  ) : (
                    <DialogTrigger asChild onClick={() => openRegistrationForm(event)}>
                      <Button variant="default" className="w-full sm:w-auto">
                        Register Now
                      </Button>
                    </DialogTrigger>
                  )}
                </div>
                
                {/* Collapsible section for additional details */}
                <Collapsible 
                  open={openEvent === event.id} 
                  onOpenChange={() => toggleEventDetails(event.id)}
                  className="mt-4"
                >
                  <CollapsibleTrigger className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800">
                    <span>View details</span>
                    <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${openEvent === event.id ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-3 space-y-3 text-gray-700">
                    <div className="p-4 bg-gray-50 rounded-md">
                      <p className="text-sm">{event.longDescription}</p>
                      
                      {event.speakers.length > 0 && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900">Speakers</h4>
                          <ul className="list-disc list-inside text-sm mt-1">
                            {event.speakers.map((speaker, index) => (
                              <li key={index}>{speaker}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {event.prerequisites && (
                        <div className="mt-4">
                          <h4 className="font-medium text-gray-900">What to Prepare</h4>
                          <p className="text-sm mt-1">{event.prerequisites}</p>
                        </div>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          ))}
        </div>
        
        {/* Registration Dialog */}
        <Dialog open={!!eventToRegister} onOpenChange={(open) => !open && setEventToRegister(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Register for Event</DialogTitle>
            </DialogHeader>
            
            {eventToRegister && (
              <div className="mb-5 p-3 bg-blue-50 rounded-md">
                <h3 className="font-medium text-blue-800">{eventToRegister.title}</h3>
                <div className="text-sm text-blue-600 mt-1">
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{eventToRegister.date}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{eventToRegister.time}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    <span>{eventToRegister.location}</span>
                  </div>
                </div>
              </div>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Organization/Business Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your business name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Position/Title (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your role in the organization" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="expectations"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What do you hope to learn? (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Your expectations for this event" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="submit" className="w-full sm:w-auto">
                    Complete Registration
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </SimpleDashboardLayout>
  );
};

export default MSMEEvents;
