
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardFooter,
  CardHeader 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowUp, 
  MessageSquare, 
  Star, 
  Send,
  MoreHorizontal,
  Share2
} from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  category: string;
  upvotes: number;
  commentCount: number;
  timestamp: string;
  isUpvoted: boolean;
  isBookmarked: boolean;
  tags: string[];
}

interface Comment {
  id: string;
  author: string;
  authorAvatar: string;
  content: string;
  timestamp: string;
}

interface CommunityPostProps {
  post: Post;
  onUpvote: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

export const CommunityPost: React.FC<CommunityPostProps> = ({
  post,
  onUpvote,
  onBookmark
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "c1",
      author: "StartupMentor",
      authorAvatar: "",
      content: "Have you considered a freemium model? It worked well for us to get enterprise clients to try before buying.",
      timestamp: "1h ago"
    },
    {
      id: "c2",
      author: "VCInsider",
      authorAvatar: "",
      content: "We typically see successful SaaS companies in this space start with per-seat pricing but include usage tiers for enterprise.",
      timestamp: "45m ago"
    }
  ]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Math.random().toString(36).substring(2, 9),
      author: "CurrentUser",
      authorAvatar: "",
      content: newComment,
      timestamp: "Just now"
    };
    
    setComments([...comments, comment]);
    setNewComment("");
  };

  return (
    <Card className="overflow-hidden hover:shadow-sm transition-shadow">
      <CardHeader className="p-4 pb-2 flex flex-row items-start gap-3">
        <div className="flex flex-col items-center mr-1">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`px-2 ${post.isUpvoted ? "text-orange-500" : ""}`}
            onClick={() => onUpvote(post.id)}
          >
            <ArrowUp className={`h-5 w-5 ${post.isUpvoted ? "fill-orange-500" : ""}`} />
          </Button>
          <span className="text-sm font-medium">{post.upvotes}</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Avatar className="h-6 w-6">
              <div className="bg-primary/10 h-full w-full flex items-center justify-center text-xs font-bold">
                {post.author.charAt(0)}
              </div>
            </Avatar>
            <span className="text-sm font-medium">{post.author}</span>
            <span className="text-xs text-muted-foreground">• {post.timestamp}</span>
            <Badge variant="outline" className="ml-auto">{post.category}</Badge>
          </div>
          <h3 className="font-semibold text-lg">{post.title}</h3>
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-2">
        <p className="text-sm text-muted-foreground">{post.content}</p>
        
        <div className="flex flex-wrap gap-2 mt-3">
          {post.tags.map(tag => (
            <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-2 border-t flex justify-between">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          {post.commentCount} Comments
        </Button>
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onBookmark(post.id)}
          >
            <Star className={`h-4 w-4 ${post.isBookmarked ? "fill-yellow-500 text-yellow-500" : ""}`} />
          </Button>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>

      {isExpanded && (
        <div className="p-4 border-t bg-secondary/10">
          <form onSubmit={handleSubmitComment} className="mb-4 flex gap-2">
            <Textarea
              placeholder="Add a comment..."
              className="min-h-[80px] flex-1"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <Button type="submit" className="self-end">
              <Send className="h-4 w-4" />
            </Button>
          </form>
          
          <div className="space-y-4">
            {comments.map(comment => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-6 w-6">
                  <div className="bg-primary/10 h-full w-full flex items-center justify-center text-xs font-bold">
                    {comment.author.charAt(0)}
                  </div>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">• {comment.timestamp}</span>
                  </div>
                  <p className="text-sm mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
