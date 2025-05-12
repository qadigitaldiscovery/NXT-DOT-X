
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Link as LinkIcon, Users, BarChart3 } from "lucide-react";
import { SocialMediaAccount, SocialMediaPlatform } from "../api/types";

interface SocialAccountCardProps {
  account: SocialMediaAccount;
  onEdit: (accountId: string) => void;
  onDelete: (accountId: string) => void;
  onDisconnect: (accountId: string) => void;
}

export function SocialAccountCard({ 
  account, 
  onEdit, 
  onDelete, 
  onDisconnect 
}: SocialAccountCardProps) {
  // Helper function to get color and icon based on platform
  const getPlatformDetails = (platform: SocialMediaPlatform) => {
    switch (platform) {
      case 'twitter':
        return { color: 'bg-blue-500', textColor: 'text-blue-500' };
      case 'facebook':
        return { color: 'bg-blue-700', textColor: 'text-blue-700' };
      case 'instagram':
        return { color: 'bg-pink-600', textColor: 'text-pink-600' };
      case 'linkedin':
        return { color: 'bg-blue-800', textColor: 'text-blue-800' };
      case 'tiktok':
        return { color: 'bg-black', textColor: 'text-black' };
      case 'pinterest':
        return { color: 'bg-red-600', textColor: 'text-red-600' };
      case 'youtube':
        return { color: 'bg-red-700', textColor: 'text-red-700' };
      default:
        return { color: 'bg-gray-500', textColor: 'text-gray-500' };
    }
  };

  const { color, textColor } = getPlatformDetails(account.platform);

  const capitalizedPlatform = account.platform.charAt(0).toUpperCase() + account.platform.slice(1);
  
  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className={`h-8 w-8 ${color}`}>
              <AvatarImage src={account.profileImageUrl} alt={account.username} />
              <AvatarFallback className="text-white">
                {capitalizedPlatform.slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">
                {account.username}
              </CardTitle>
              <CardDescription className="text-xs capitalize">
                {capitalizedPlatform}
              </CardDescription>
            </div>
          </div>
          <Badge variant={account.connected ? "outline" : "secondary"}>
            {account.connected ? "Connected" : "Not Connected"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-2 pb-3">
        {account.stats && (
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center">
              <Users size={16} className={`mr-1 ${textColor}`} />
              <span className="text-sm font-medium">
                {account.stats.followers.toLocaleString()}
              </span>
            </div>
            {account.stats.engagement && (
              <div className="flex items-center">
                <BarChart3 size={16} className={`mr-1 ${textColor}`} />
                <span className="text-sm font-medium">
                  {account.stats.engagement}%
                </span>
              </div>
            )}
          </div>
        )}
        <div className="flex items-center space-x-2 pt-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onEdit(account.id)}
            className="flex-1 h-8"
          >
            <Pencil size={14} className="mr-1" />
            Edit
          </Button>
          {account.connected ? (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDisconnect(account.id)}
              className="flex-1 h-8"
            >
              <LinkIcon size={14} className="mr-1" />
              Disconnect
            </Button>
          ) : (
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => onDelete(account.id)}
              className="flex-1 h-8"
            >
              <Trash2 size={14} className="mr-1" />
              Remove
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
