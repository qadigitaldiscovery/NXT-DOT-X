
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Beta2Dashboard = () => {
  const navigate = useNavigate();
  
  // Sample data for the dashboard
  const stats = [
    { title: "Total Revenue", value: "$23,450", change: "+12%", trend: "up" },
    { title: "Products", value: "1,543", change: "+8%", trend: "up" },
    { title: "Market Share", value: "24%", change: "+5%", trend: "up" },
    { title: "Competitors", value: "8", change: "0", trend: "none" },
  ];
  
  const recentActivity = [
    { id: 1, event: "Price Update", details: "Product XYZ-123 increased by 5%", time: "2 hours ago" },
    { id: 2, event: "Competitor Alert", details: "CompA reduced prices on 35 items", time: "5 hours ago" },
    { id: 3, event: "Market Analysis", details: "Monthly report generated", time: "Yesterday" },
    { id: 4, event: "System Alert", details: "Database synchronization complete", time: "2 days ago" },
  ];
  
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Beta 2 Overview</h1>
          <p className="text-muted-foreground">Welcome to the enhanced pricing analytics prototype.</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => navigate('/prototypes')}>
            Back to Selector
          </Button>
          <Button onClick={() => navigate('/beta2/analytics')}>
            View Analytics
          </Button>
        </div>
      </div>
      
      {/* Stats cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {stat.change && (
                <p className={`text-xs ${
                  stat.trend === "up" ? "text-green-500" : 
                  stat.trend === "down" ? "text-rose-500" : "text-gray-500"
                }`}>
                  {stat.trend === "up" ? "+" : stat.trend === "down" ? "-" : ""}{stat.change} from last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start justify-between border-b pb-3 last:border-0">
                <div>
                  <p className="font-medium">{activity.event}</p>
                  <p className="text-sm text-muted-foreground">{activity.details}</p>
                </div>
                <div className="text-sm text-muted-foreground">
                  {activity.time}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Feature highlights */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Enhanced Analytics</CardTitle>
            <CardDescription>
              New visualization options for better insights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Beta 2 introduces advanced analytics capabilities with interactive charts and 
              customizable dashboards for deeper data analysis.
            </p>
            <div className="h-40 bg-slate-200 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Analytics Preview</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Competitor Insights</CardTitle>
            <CardDescription>
              Track competitor pricing in real-time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Monitor market shifts and competitor pricing strategies with 
              automated alerts and detailed comparison reports.
            </p>
            <div className="h-40 bg-slate-200 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Competitor Tracking Preview</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Beta2Dashboard;
