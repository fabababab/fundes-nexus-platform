
import React from "react";
import FeedItem, { FeedItemType } from "./FeedItem";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockCompanyFeed: FeedItemType[] = [
  {
    id: "1",
    title: "Innovation Partnership Opportunity",
    content: "5 new startups in your industry are looking for corporate partners. Match rate: 85% based on your criteria.",
    type: "Partnership",
    category: "Innovation",
    date: "1h ago"
  },
  {
    id: "2",
    title: "ESG Impact Report Available",
    content: "Your Q1 2025 ESG impact report is ready. Notable improvement in carbon reduction metrics.",
    type: "Report",
    category: "ESG",
    date: "4h ago"
  },
  {
    id: "3",
    title: "Startup Integration Success Story",
    content: "Case study: How Microsoft successfully integrated an AI startup into their value chain.",
    type: "Case Study",
    category: "Success Story",
    date: "1d ago"
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
