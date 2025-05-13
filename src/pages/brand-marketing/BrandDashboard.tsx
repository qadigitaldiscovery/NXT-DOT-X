
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, TrendingUp, BarChart3, Globe, Heart, BadgePercent, Search, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const BrandDashboard = () => {
  const navigate = useNavigate();
  
  // Sample brand metrics
  const brandMetrics = [
    { name: "Brand Recognition", value: "76%", trend: "up", change: "+4%" },
    { name: "Trust Score", value: "8.2/10", trend: "up", change: "+0.5" },
    { name: "Market Perception", value: "Positive", trend: "stable" },
    { name: "Brand Exposure", value: "2.1M", trend: "up", change: "+12%" }
  ];

  const analyticsData = {
    sentimentDistribution: [
      { sentiment: "Positive", percentage: 65 },
      { sentiment: "Neutral", percentage: 25 },
      { sentiment: "Negative", percentage: 10 }
    ],
    topMentionSources: [
      { source: "Twitter", count: 450 },
      { source: "Reddit", count: 320 },
      { source: "News", count: 225 },
      { source: "Reviews", count: 189 }
    ]
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Brand Marketing Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Monitor and analyze your brand's performance, trust metrics, and market perception
        </p>
      </div>
      
      {/* Key Brand Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Brand Recognition</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">76%</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+4% from last quarter</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
            <BadgePercent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.2/10</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+0.5 from last quarter</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Market Perception</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Positive</div>
            <p className="text-xs text-muted-foreground">Steady sentiment across channels</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Brand Exposure</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1M</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Brand Analysis Tools */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Trust Analysis</CardTitle>
            <CardDescription>Track and improve brand trust metrics</CardDescription>
          </CardHeader>
          <CardContent className="h-[150px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <BadgePercent className="h-12 w-12 mx-auto mb-2" />
              <p>Trust metrics visualization</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/brand-marketing/trust-analysis')}
            >
              View Trust Analysis
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Market Perception</CardTitle>
            <CardDescription>Monitor public sentiment and feedback</CardDescription>
          </CardHeader>
          <CardContent className="h-[150px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Heart className="h-12 w-12 mx-auto mb-2" />
              <p>Market perception trends</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/brand-marketing/market-perception')}
            >
              View Market Perception
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>SEO & Keywords</CardTitle>
            <CardDescription>Optimize your brand's search visibility</CardDescription>
          </CardHeader>
          <CardContent className="h-[150px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Search className="h-12 w-12 mx-auto mb-2" />
              <p>Keyword performance data</p>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => navigate('/brand-marketing/seo')}
            >
              View SEO Analytics
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* AI Insight and Latest Activity */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              AI Brand Insights
            </CardTitle>
            <CardDescription>Requesty AI-powered brand analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="text-sm font-medium">Trust Recommendation</p>
                <p className="text-sm text-muted-foreground">Increase customer testimonials on product pages to improve trust metrics by an estimated 7-9%</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4 py-2">
                <p className="text-sm font-medium">Sentiment Alert</p>
                <p className="text-sm text-muted-foreground">Positive sentiment spike (+23%) following recent product announcement</p>
              </div>
              <div className="border-l-4 border-amber-500 pl-4 py-2">
                <p className="text-sm font-medium">SEO Opportunity</p>
                <p className="text-sm text-muted-foreground">Low competition for "enterprise AI solutions" keyword cluster - consider content series</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full"
              onClick={() => navigate('/brand-marketing/requesty')}
            >
              Ask Requesty AI
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recent Brand Activities</CardTitle>
            <CardDescription>Latest brand marketing campaigns and efforts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center border-b pb-4">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Summer Marketing Campaign</p>
                  <p className="text-sm text-muted-foreground">Campaign launched across digital channels</p>
                  <p className="text-xs text-muted-foreground">3 days ago</p>
                </div>
              </div>
              <div className="flex items-center border-b pb-4">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Brand Trust Survey</p>
                  <p className="text-sm text-muted-foreground">Annual customer trust survey completed</p>
                  <p className="text-xs text-muted-foreground">1 week ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Brand Guidelines Update</p>
                  <p className="text-sm text-muted-foreground">Updated visual identity guidelines published</p>
                  <p className="text-xs text-muted-foreground">2 weeks ago</p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={() => navigate('/brand-marketing/analytics')}>
              View All Brand Activities
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default BrandDashboard;
