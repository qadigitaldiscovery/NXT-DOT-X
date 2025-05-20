
import { DashboardHeader } from "@/components/beta2/dashboard/DashboardHeader";
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
          <a 
            href="/social-media/calendar"
            onClick={(e) => {
              e.preventDefault();
              navigate("/social-media/calendar");
            }}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium border border-input py-2 px-4 hover:bg-accent hover:text-accent-foreground"
            aria-label="View social media calendar"
          >
            <Calendar size={16} className="mr-2" aria-hidden="true" />
            View Calendar
          </a>
          <a 
            href="/social-media/create-post"
            onClick={(e) => {
              e.preventDefault();
              navigate("/social-media/create-post");
            }}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4"
            aria-label="Create new social media post"
          >
            <Plus size={16} className="mr-2" aria-hidden="true" />
            Create Post
          </a>
        </div>
      </div>
      
      <SocialMediaDashboardTabs />
    </div>
  );
}
