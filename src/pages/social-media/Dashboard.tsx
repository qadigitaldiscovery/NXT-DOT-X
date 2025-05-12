
import { DashboardHeader } from "@/components/beta2/dashboard/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Calendar, Plus } from "lucide-react";
import { SocialMediaDashboardTabs } from "@/features/social-media/components/SocialMediaDashboardTabs";
import { useNavigate } from "react-router-dom";

export default function SocialMediaDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <DashboardHeader 
          title="Social Media Dashboard" 
          description="Manage your social media accounts, posts, and campaigns"
        />
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={() => navigate("/social-media/calendar")}
          >
            <Calendar size={16} />
            View Calendar
          </Button>
          <Button 
            className="flex items-center gap-2"
            onClick={() => navigate("/social-media/create-post")}
          >
            <Plus size={16} />
            Create Post
          </Button>
        </div>
      </div>
      
      <SocialMediaDashboardTabs />
    </div>
  );
}
