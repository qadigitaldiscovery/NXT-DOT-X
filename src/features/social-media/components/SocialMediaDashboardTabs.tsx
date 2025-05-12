
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountsOverview } from "./AccountsOverview";
import { SocialDashboardOverview } from "./SocialDashboardOverview";
import { PostsSchedule } from "./PostsSchedule";

export function SocialMediaDashboardTabs() {
  return (
    <Tabs defaultValue="overview" className="space-y-6">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="accounts">Accounts</TabsTrigger>
        <TabsTrigger value="calendar">Calendar</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-6">
        <SocialDashboardOverview />
      </TabsContent>
      <TabsContent value="accounts" className="space-y-6">
        <AccountsOverview />
      </TabsContent>
      <TabsContent value="calendar" className="space-y-6">
        <PostsSchedule />
      </TabsContent>
    </Tabs>
  );
}
