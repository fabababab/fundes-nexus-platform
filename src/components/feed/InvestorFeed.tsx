
import React from "react";
import FeedItem, { FeedItemType } from "./FeedItem";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockInvestorFeed: FeedItemType[] = [
  {
    id: "1",
    title: "Just closed a $10M seed round for an exciting new AI healthcare startup",
    content: "Thrilled to announce our latest investment in MedTech AI. Their breakthrough technology in early disease detection shows tremendous promise. Looking forward to supporting their journey!",
    type: "Update",
    category: "Investment",
    date: "1h ago",
    author: {
      name: "Sarah Johnson",
      title: "Partner at Horizon Ventures",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 128,
    comments: 32
  },
  {
    id: "2",
    title: "EcoTech Solutions - Series A Investment Opportunity",
    content: "Clean energy startup looking for Series A funding. Current valuation at $15M with strong growth metrics in the renewable sector.",
    type: "Opportunity",
    category: "CleanTech",
    date: "2h ago"
  },
  {
    id: "3",
    title: "Q1 Performance Report: Healthcare Portfolio",
    content: "Your healthcare investments showed a 15% increase in value this quarter. Click to view detailed analytics.",
    type: "Performance Update",
    category: "Healthcare",
    date: "5h ago"
  },
  {
    id: "4",
    title: "Startup Pitch Event - Summer 2025",
    content: "Don't miss our exclusive pitch event featuring 10 pre-selected startups across AI, CleanTech, and FinTech sectors. Virtual attendance available.",
    type: "Event",
    category: "Networking",
    date: "1d ago",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    title: "New Startup Analysis: AI Drug Discovery",
    content: "Deep analysis of emerging startups in the AI drug discovery space. Three promising candidates identified.",
    type: "Market Research",
    category: "BioTech",
    date: "1d ago"
  },
  {
    id: "6",
    title: "Thoughts on the future of sustainable investing",
    content: "After attending the Climate Finance Summit, I'm more convinced than ever that sustainable investing is not just good for the planet but also delivers superior returns. Here are three key insights from the event that will inform our investment strategy going forward...",
    type: "Article",
    category: "ESG",
    date: "2d ago",
    author: {
      name: "Michael Chen",
      title: "ESG Investment Analyst",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    likes: 85,
    comments: 17
  }
];

const InvestorFeed = () => {
  return (
    <ScrollArea className="h-[600px] pr-4">
      {mockInvestorFeed.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}
    </ScrollArea>
  );
};

export default InvestorFeed;
