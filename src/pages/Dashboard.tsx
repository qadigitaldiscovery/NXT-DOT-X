
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  ArrowUp, 
  ArrowDown, 
  BarChart3, 
  LineChart, 
  FileUp, 
  ArrowDownUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

// Mock data
const summaryData = [
  { title: "Total Products", value: "2,543", trend: "up", percent: "12%" },
  { title: "Price Updates", value: "185", trend: "up", percent: "8%" },
  { title: "Margin Health", value: "76%", trend: "down", percent: "3%" },
  { title: "Pending Exports", value: "12", trend: "none", percent: "" }
];

const recentUpdates = [
  { supplier: "AudioTech Pro", date: "2025-05-02", products: 450, change: "+2.3%" },
  { supplier: "VisualEdge", date: "2025-05-01", products: 320, change: "-1.5%" },
  { supplier: "SoundVision", date: "2025-04-30", products: 215, change: "+4.2%" },
  { supplier: "MediaMax", date: "2025-04-28", products: 510, change: "-0.8%" },
];

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Log to help with debugging
  console.log("Dashboard component rendering");
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <Button onClick={() => navigate('/export-data')}>
          Export Data
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {item.title}
              </CardTitle>
              {item.trend === "up" && <ArrowUp className="h-4 w-4 text-emerald-500" />}
              {item.trend === "down" && <ArrowDown className="h-4 w-4 text-rose-500" />}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              {item.percent && (
                <p className={`text-xs ${item.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}>
                  {item.trend === "up" ? "+" : ""}{item.percent} from last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Recent Cost Updates</CardTitle>
            <CardDescription>
              Most recent supplier data uploads
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUpdates.map((update, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2">
                  <div>
                    <p className="font-medium">{update.supplier}</p>
                    <p className="text-sm text-muted-foreground">{update.date}</p>
                  </div>
                  <div className="text-right">
                    <p>{update.products} items</p>
                    <p className={`text-sm ${update.change.startsWith("+") ? "text-emerald-500" : "text-rose-500"}`}>
                      {update.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Access key dashboard functions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/supplier-costing')}
              >
                <FileUp className="h-6 w-6" />
                <span>Upload Supplier Data</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/cost-analysis')}
              >
                <BarChart3 className="h-6 w-6" />
                <span>Cost Analysis</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/competitor-pricing')}
              >
                <LineChart className="h-6 w-6" />
                <span>Competitor Pricing</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-24 flex flex-col items-center justify-center gap-2"
                onClick={() => navigate('/price-management')}
              >
                <ArrowDownUp className="h-6 w-6" />
                <span>Price Management</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
