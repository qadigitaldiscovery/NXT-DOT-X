
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarRange, Edit3, BarChart3, Users } from "lucide-react";

interface OverviewCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: { value: number; isPositive: boolean };
}

function OverviewCard({ title, value, description, icon, trend }: OverviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
        <div className="h-6 w-6 text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between">
          <CardDescription>{description}</CardDescription>
          {trend && (
            <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

const engagementData = [
  { name: 'Sun', value: 420 },
  { name: 'Mon', value: 380 },
  { name: 'Tue', value: 510 },
  { name: 'Wed', value: 470 },
  { name: 'Thu', value: 620 },
  { name: 'Fri', value: 580 },
  { name: 'Sat', value: 650 },
];

const followerData = [
  { name: 'Jan', value: 3200 },
  { name: 'Feb', value: 3700 },
  { name: 'Mar', value: 4300 },
  { name: 'Apr', value: 4800 },
  { name: 'May', value: 5200 },
  { name: 'Jun', value: 5900 },
  { name: 'Jul', value: 6400 },
];

export function SocialDashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          title="Total Engagements"
          value="3,752"
          description="Last 7 days"
          icon={<BarChart3 />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <OverviewCard
          title="Total Followers"
          value="84,770"
          description="Across all platforms"
          icon={<Users />}
          trend={{ value: 3.2, isPositive: true }}
        />
        <OverviewCard
          title="Scheduled Posts"
          value="12"
          description="Next 7 days"
          icon={<CalendarRange />}
        />
        <OverviewCard
          title="Content Created"
          value="37"
          description="Last 30 days"
          icon={<Edit3 />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Engagement</CardTitle>
            <CardDescription>Total engagements across all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={engagementData}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `${value}`} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Follower Growth</CardTitle>
            <CardDescription>Monthly follower count across all platforms</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={followerData}>
                <XAxis dataKey="name" tickLine={false} axisLine={false} />
                <YAxis tickFormatter={(value) => `${value}`} tickLine={false} axisLine={false} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
