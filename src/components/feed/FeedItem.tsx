
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, MessageSquare, Share2 } from "lucide-react";

export type FeedItemType = {
  id: string;
  title: string;
  content: string;
  type: string;
  date: string;
  category: string;
};

const FeedItem = ({ item }: { item: FeedItemType }) => {
  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
          <div className="flex gap-2 mt-1">
            <Badge variant="outline">{item.type}</Badge>
            <Badge variant="outline" className="bg-primary/10">
              {item.category}
            </Badge>
          </div>
        </div>
        <span className="text-sm text-muted-foreground">{item.date}</span>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{item.content}</p>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <MessageSquare className="h-4 w-4 mr-1" />
              Comment
            </Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Share2 className="h-4 w-4 mr-1" />
              Share
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <BookmarkPlus className="h-4 w-4 mr-1" />
            Save
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedItem;
