
import React from "react";
import FeedItem, { FeedItemType } from "./FeedItem";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockInvestorFeed: FeedItemType[] = [
  {
    id: "1",
    title: "EcoTech Solutions - Series A Investment Opportunity",
    content: "Clean energy startup looking for Series A funding. Current valuation at $15M with strong growth metrics in the renewable sector.",
    type: "Investment Opportunity",
    category: "CleanTech",
    date: "2h ago"
  },
  {
    id: "2",
    title: "Q1 Performance Report: Healthcare Portfolio",
    content: "Your healthcare investments showed a 15% increase in value this quarter. Click to view detailed analytics.",
    type: "Performance Update",
    category: "Healthcare",
    date: "5h ago"
  },
  {
    id: "3",
    title: "New Startup Analysis: AI Drug Discovery",
    content: "Deep analysis of emerging startups in the AI drug discovery space. Three promising candidates identified.",
    type: "Market Research",
    category: "BioTech",
    date: "1d ago"
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
