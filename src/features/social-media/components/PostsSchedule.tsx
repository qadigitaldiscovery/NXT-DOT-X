
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { SocialMediaPost } from "../api/types";
import { mockPosts } from "../api/mockData";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export function PostsSchedule() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [posts] = useState<SocialMediaPost[]>(mockPosts);
  
  // Filter posts for the selected date if any is selected
  const filteredPosts = selectedDate 
    ? posts.filter(post => {
        const postDate = post.scheduledFor 
          ? new Date(post.scheduledFor) 
          : post.publishedAt 
            ? new Date(post.publishedAt) 
            : null;
        
        return postDate && 
          postDate.getDate() === selectedDate.getDate() &&
          postDate.getMonth() === selectedDate.getMonth() &&
          postDate.getFullYear() === selectedDate.getFullYear();
      })
    : [];

  // Function to get platform color and abbreviation
  const getPlatformDetails = (platform: string) => {
    switch (platform) {
      case 'twitter':
        return { color: 'bg-blue-500', abbr: 'TW' };
      case 'facebook':
        return { color: 'bg-blue-700', abbr: 'FB' };
      case 'instagram':
        return { color: 'bg-pink-600', abbr: 'IG' };
      case 'linkedin':
        return { color: 'bg-blue-800', abbr: 'LI' };
      case 'tiktok':
        return { color: 'bg-black', abbr: 'TK' };
      default:
        return { color: 'bg-gray-500', abbr: 'SM' };
    }
  };

  // Function to get badge variant based on post status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Published</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Scheduled</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Calendar</CardTitle>
          <CardDescription>Select a date to view scheduled posts</CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="border rounded-md p-3 pointer-events-auto"
          />
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>
            Posts for {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : 'Today'}
          </CardTitle>
          <CardDescription>
            {filteredPosts.length} posts {filteredPosts.length === 1 ? 'is' : 'are'} scheduled or published on this date
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredPosts.length > 0 ? (
            <div className="space-y-4">
              {filteredPosts.map((post) => {
                const { color, abbr } = getPlatformDetails(post.platform);
                const postTime = post.scheduledFor || post.publishedAt;
                
                return (
                  <div 
                    key={post.id}
                    className="flex items-start space-x-4 p-4 border rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Avatar className={`h-10 w-10 ${color}`}>
                      <AvatarFallback className="text-white">{abbr}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {post.content.text?.substring(0, 50)}
                          {post.content.text && post.content.text.length > 50 ? '...' : ''}
                        </p>
                        {getStatusBadge(post.status)}
                      </div>
                      <div className="mt-1">
                        <p className="text-xs text-gray-500">
                          {postTime && format(new Date(postTime), 'h:mm a')}
                        </p>
                      </div>
                      {post.content.mediaUrls && post.content.mediaUrls.length > 0 && (
                        <div className="mt-2 flex items-center space-x-1">
                          <span className="text-xs text-gray-500">
                            {post.content.mediaUrls.length} media {post.content.mediaUrls.length === 1 ? 'file' : 'files'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <p>No posts scheduled for this date.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
