
import React from "react";
import FeedItem, { FeedItemType } from "./FeedItem";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockStartupFeed: FeedItemType[] = [
  {
    id: "1",
    title: "We just hit 10,000 users!",
    content: "It's been an incredible journey since we launched our beta just three months ago. Today we're celebrating 10,000 active users and growing fast! Thanks to everyone who believed in us and continues to support our mission to revolutionize the healthcare data space.",
    type: "Milestone",
    category: "Growth",
    date: "5h ago",
    author: {
      name: "Alex Rivera",
      title: "Co-founder & CEO, HealthData AI",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 321,
    comments: 57
  },
  {
    id: "2",
    title: "Open Call: Join Tesla's EV Supply Chain",
    content: "Tesla is looking for innovative startups in the EV battery technology space. Applications open until May 15th.",
    type: "Opportunity",
    category: "Value Chain",
    date: "3h ago"
  },
  {
    id: "3",
    title: "Startup Accelerator Program - Summer 2025",
    content: "YCombinator announces their summer 2025 batch. Early applications now open with focus on AI and Climate Tech.",
    type: "Program",
    category: "Accelerator",
    date: "1d ago"
  },
  {
    id: "4",
    title: "Pitch Competition - CleanTech Innovations",
    content: "Present your cleantech solution to a panel of investors and industry experts. $50,000 in prizes and potential funding opportunities available.",
    type: "Event",
    category: "Funding",
    date: "2w ago",
    image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    title: "Grant Alert: Climate Innovation Fund",
    content: "€500K grants available for early-stage climate tech startups. Deadline approaching in 2 weeks.",
    type: "Funding",
    category: "Grants",
    date: "2d ago"
  },
  {
    id: "6",
    title: "Our journey from concept to seed funding",
    content: "Six months ago we were working out of a garage with just an idea. Today I'm proud to announce we've secured $2M in seed funding to bring our sustainable packaging solution to market. Here's what we learned about pitching, persistence, and finding the right investors who share your vision...",
    type: "Article",
    category: "Funding",
    date: "4d ago",
    author: {
      name: "Sophia Nguyen",
      title: "Founder, EcoPackage",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    likes: 208,
    comments: 43
  }
];

const StartupFeed = () => {
  return (
    <ScrollArea className="h-[600px] pr-4">
      {mockStartupFeed.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}
    </ScrollArea>
  );
};

export default StartupFeed;
