
import React from "react";
import FeedItem, { FeedItemType } from "./FeedItem";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockCompanyFeed: FeedItemType[] = [
  {
    id: "1",
    title: "We're excited to announce our new sustainability initiative",
    content: "Today marks a significant milestone in our journey towards a greener future. Our company has committed to achieving carbon neutrality by 2030, with an ambitious roadmap that includes investments in renewable energy and sustainable operations across our global footprint.",
    type: "Announcement",
    category: "Sustainability",
    date: "3h ago",
    author: {
      name: "Jennifer Miller",
      title: "Chief Sustainability Officer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    likes: 245,
    comments: 48
  },
  {
    id: "2",
    title: "Innovation Partnership Opportunity",
    content: "5 new startups in your industry are looking for corporate partners. Match rate: 85% based on your criteria.",
    type: "Partnership",
    category: "Innovation",
    date: "1h ago"
  },
  {
    id: "3",
    title: "ESG Impact Report Available",
    content: "Your Q1 2025 ESG impact report is ready. Notable improvement in carbon reduction metrics.",
    type: "Report",
    category: "ESG",
    date: "4h ago"
  },
  {
    id: "4",
    title: "Quarterly Innovation Showcase",
    content: "Join us for our quarterly showcase featuring demos from our innovation lab and selected startup partners. Connect with potential collaborators and see the future of our industry.",
    type: "Event",
    category: "Innovation",
    date: "1w ago",
    image: "https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "5",
    title: "Startup Integration Success Story",
    content: "Case study: How Microsoft successfully integrated an AI startup into their value chain.",
    type: "Case Study",
    category: "Success Story",
    date: "1d ago"
  },
  {
    id: "6",
    title: "Reflecting on our first year of corporate-startup collaborations",
    content: "When we started our open innovation program last year, we had big ambitions but many unknowns. Here's what we've learned from partnering with 12 startups, the challenges we overcame, and how these collaborations have transformed our approach to innovation...",
    type: "Article",
    category: "Innovation",
    date: "3d ago",
    author: {
      name: "David Park",
      title: "Head of Open Innovation",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    likes: 172,
    comments: 29
  }
];

const CompanyFeed = () => {
  return (
    <ScrollArea className="h-[600px] pr-4">
      {mockCompanyFeed.map((item) => (
        <FeedItem key={item.id} item={item} />
      ))}
    </ScrollArea>
  );
};

export default CompanyFeed;
