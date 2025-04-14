
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommunityPost } from "./CommunityPost";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowUp, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Star, 
  Send, 
  FileImage, 
  Link as LinkIcon
} from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader 
} from "@/components/ui/card";

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

export const StartupCommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      title: "Need advice on SaaS pricing strategy for enterprise clients",
      content: "We're preparing to launch our B2B SaaS product targeting enterprise customers. How do you structure pricing tiers effectively? Should we go with per-seat pricing or usage-based?",
      author: "TechFounder",
      authorAvatar: "",
      category: "SaaS",
      upvotes: 24,
      commentCount: 8,
      timestamp: "2h ago",
      isUpvoted: false,
      isBookmarked: false,
      tags: ["SaaS", "Pricing", "Enterprise"]
    },
    {
      id: "2",
      title: "Has anyone used Stripe Connect for a marketplace startup?",
      content: "Looking for experiences implementing Stripe Connect for our two-sided marketplace. Any gotchas or tips for handling international payments and compliance?",
      author: "MarketplaceGuru",
      authorAvatar: "",
      category: "FinTech",
      upvotes: 31,
      commentCount: 12,
      timestamp: "5h ago",
      isUpvoted: true,
      isBookmarked: true,
      tags: ["Stripe", "Payments", "Marketplace"]
    },
    {
      id: "3",
      title: "Best approaches for early user acquisition in healthcare apps",
      content: "We've built an app for patient monitoring and getting initial traction is challenging due to regulations. What channels worked best for your healthtech startup?",
      author: "HealthTechInnovator",
      authorAvatar: "",
      category: "HealthTech",
      upvotes: 18,
      commentCount: 6,
      timestamp: "1d ago",
      isUpvoted: false,
      isBookmarked: false,
      tags: ["Healthcare", "User Acquisition", "Regulations"]
    },
    {
      id: "4",
      title: "Experiences with Y Combinator vs Techstars?",
      content: "We're considering accelerator programs for our AI startup. Anyone been through both or can compare the value, network, and mentorship quality?",
      author: "AccelerateMe",
      authorAvatar: "",
      category: "Funding",
      upvotes: 42,
      commentCount: 15,
      timestamp: "2d ago",
      isUpvoted: false,
      isBookmarked: true,
      tags: ["Accelerators", "YC", "Techstars", "Funding"]
    },
    {
      id: "5",
      title: "Hardware prototype manufacturing partners in Asia?",
      content: "We're ready to move from 3D printed prototypes to small batch manufacturing for our IoT device. Looking for reliable partners in Taiwan or China with reasonable MOQs.",
      author: "HardwareHacker",
      authorAvatar: "",
      category: "Hardware",
      upvotes: 15,
      commentCount: 7,
      timestamp: "3d ago",
      isUpvoted: false,
      isBookmarked: false,
      tags: ["Hardware", "Manufacturing", "IoT"]
    }
  ]);
  
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "General"
  });

  const categories = [
    "All",
    "SaaS",
    "FinTech",
    "HealthTech",
    "Hardware",
    "AI/ML",
    "Marketplace",
    "Funding",
    "General"
  ];

  const handleUpvote = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const newUpvoteCount = post.isUpvoted ? post.upvotes - 1 : post.upvotes + 1;
        return {
          ...post,
          upvotes: newUpvoteCount,
          isUpvoted: !post.isUpvoted
        };
      }
      return post;
    }));
  };

  const handleBookmark = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPost.title || !newPost.content) return;
    
    const newPostItem: Post = {
      id: Math.random().toString(36).substring(2, 9),
      title: newPost.title,
      content: newPost.content,
      author: "CurrentUser",
      authorAvatar: "",
      category: newPost.category,
      upvotes: 0,
      commentCount: 0,
      timestamp: "Just now",
      isUpvoted: false,
      isBookmarked: false,
      tags: [newPost.category]
    };
    
    setPosts([newPostItem, ...posts]);
    setNewPost({
      title: "",
      content: "",
      category: "General"
    });
  };

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg p-4 border">
        <h3 className="text-lg font-semibold mb-2">Create Post</h3>
        <form onSubmit={handleCreatePost} className="space-y-4">
          <Input 
            placeholder="Post title"
            value={newPost.title}
            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
          />
          <Textarea 
            placeholder="What's on your mind?"
            className="min-h-[100px]"
            value={newPost.content}
            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button type="button" size="sm" variant="outline">
                <FileImage className="h-4 w-4 mr-1" />
                Image
              </Button>
              <Button type="button" size="sm" variant="outline">
                <LinkIcon className="h-4 w-4 mr-1" />
                Link
              </Button>
              <select 
                className="bg-background border rounded px-2 text-sm h-9"
                value={newPost.category}
                onChange={(e) => setNewPost({...newPost, category: e.target.value})}
              >
                {categories.slice(1).map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <Button type="submit">
              <Send className="h-4 w-4 mr-1" />
              Post
            </Button>
          </div>
        </form>
      </div>

      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All Posts</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="bookmarked">Bookmarked</TabsTrigger>
          </TabsList>
          <select className="bg-background border rounded px-2 py-1 text-sm">
            {categories.map(category => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <TabsContent value="all" className="space-y-4 mt-4">
          {posts.map(post => (
            <CommunityPost 
              key={post.id}
              post={post}
              onUpvote={handleUpvote}
              onBookmark={handleBookmark}
            />
          ))}
        </TabsContent>
        
        <TabsContent value="trending" className="space-y-4 mt-4">
          {posts
            .sort((a, b) => b.upvotes - a.upvotes)
            .map(post => (
              <CommunityPost 
                key={post.id}
                post={post}
                onUpvote={handleUpvote}
                onBookmark={handleBookmark}
              />
            ))
          }
        </TabsContent>
        
        <TabsContent value="new" className="space-y-4 mt-4">
          {posts
            .sort((a, b) => {
              if (a.timestamp.includes("Just now")) return -1;
              if (b.timestamp.includes("Just now")) return 1;
              
              const aTime = a.timestamp.includes("h") ? 
                parseInt(a.timestamp.split("h")[0]) : 
                parseInt(a.timestamp.split("d")[0]) * 24;
                
              const bTime = b.timestamp.includes("h") ? 
                parseInt(b.timestamp.split("h")[0]) : 
                parseInt(b.timestamp.split("d")[0]) * 24;
                
              return aTime - bTime;
            })
            .map(post => (
              <CommunityPost 
                key={post.id}
                post={post}
                onUpvote={handleUpvote}
                onBookmark={handleBookmark}
              />
            ))
          }
        </TabsContent>
        
        <TabsContent value="bookmarked" className="space-y-4 mt-4">
          {posts
            .filter(post => post.isBookmarked)
            .map(post => (
              <CommunityPost 
                key={post.id}
                post={post}
                onUpvote={handleUpvote}
                onBookmark={handleBookmark}
              />
            ))
          }
        </TabsContent>
      </Tabs>
    </div>
  );
};
