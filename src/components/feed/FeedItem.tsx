
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookmarkPlus, Calendar, MessageSquare, Share2, Users, Link, Briefcase } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export type FeedItemType = {
  id: string;
  title: string;
  content: string;
  type: string;
  date: string;
  category: string;
  author?: {
    name: string;
    title?: string;
    avatar?: string;
  };
  image?: string;
  likes?: number;
  comments?: number;
};

const FeedItem = ({ item }: { item: FeedItemType }) => {
  // Determine icon based on content type
  const getTypeIcon = () => {
    switch(item.type.toLowerCase()) {
      case "event":
        return <Calendar className="h-4 w-4 mr-1" />;
      case "network":
      case "partnership":
        return <Users className="h-4 w-4 mr-1" />;
      case "opportunity":
        return <Briefcase className="h-4 w-4 mr-1" />;
      case "article":
        return <Link className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        {item.author && (
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={item.author.avatar} alt={item.author.name} />
              <AvatarFallback>{item.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{item.author.name}</p>
              {item.author.title && <p className="text-xs text-muted-foreground">{item.author.title}</p>}
            </div>
          </div>
        )}
        {!item.author && (
          <div>
            <CardTitle className="text-lg font-medium">{item.title}</CardTitle>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="flex items-center">
                {getTypeIcon()}
                {item.type}
              </Badge>
              <Badge variant="outline" className="bg-primary/10">
                {item.category}
              </Badge>
            </div>
          </div>
        )}
        <span className="text-sm text-muted-foreground">{item.date}</span>
      </CardHeader>
      <CardContent>
        {item.author && (
          <h3 className="text-lg font-medium mb-2">{item.title}</h3>
        )}
        <p className="text-sm text-muted-foreground mb-4">{item.content}</p>
        
        {item.image && (
          <div className="mb-4 rounded-md overflow-hidden">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-auto object-cover"
              style={{maxHeight: "350px"}}
            />
          </div>
        )}
        
        <div className="flex justify-between items-center pt-2 border-t">
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <MessageSquare className="h-4 w-4 mr-1" />
              {item.comments ? `${item.comments}` : "Comment"}
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
