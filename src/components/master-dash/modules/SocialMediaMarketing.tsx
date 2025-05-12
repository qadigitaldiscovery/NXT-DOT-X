import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
export default function SocialMediaMarketing() {
  const navigate = useNavigate();
  return <Card className="col-span-1 bg-gray-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center space-x-2">
          <Share2 className="w-5 h-5 text-blue-600" />
          <span>Social Media</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-500">
          Manage social accounts, schedule posts, and track engagement metrics.
        </p>
        <div className="mt-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">Account management</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">Content calendar</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm">Analytics dashboard</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={() => navigate('/social-media')} className="w-full">
          Open Social Media
        </Button>
      </CardFooter>
    </Card>;
}