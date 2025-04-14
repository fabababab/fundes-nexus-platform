
import React from "react";
import FeedItem, { FeedItemType } from "./FeedItem";
import { ScrollArea } from "@/components/ui/scroll-area";

const mockStartupFeed: FeedItemType[] = [
  {
    id: "1",
    title: "Open Call: Join Tesla's EV Supply Chain",
    content: "Tesla is looking for innovative startups in the EV battery technology space. Applications open until May 15th.",
    type: "Opportunity",
    category: "Value Chain",
    date: "3h ago"
  },
  {
    id: "2",
    title: "Startup Accelerator Program - Summer 2025",
    content: "YCombinator announces their summer 2025 batch. Early applications now open with focus on AI and Climate Tech.",
    type: "Program",
    category: "Accelerator",
    date: "1d ago"
  },
  {
    id: "3",
    title: "Grant Alert: Climate Innovation Fund",
    content: "€500K grants available for early-stage climate tech startups. Deadline approaching in 2 weeks.",
    type: "Funding",
    category: "Grants",
    date: "2d ago"
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
