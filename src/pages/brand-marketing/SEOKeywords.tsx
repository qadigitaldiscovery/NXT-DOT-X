
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandMarketingLayout } from '@/components/layout/BrandMarketingLayout';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, TrendingDown, Minus, LineChart, BarChart3, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SEOKeywords = () => {
  // Sample keyword data
  const keywordData = [
    { keyword: "brand management", position: 3, change: 2, volume: "4.8K", difficulty: "Medium" },
    { keyword: "customer trust solutions", position: 5, change: -1, volume: "2.1K", difficulty: "Medium" },
    { keyword: "brand analytics platform", position: 8, change: 4, volume: "1.5K", difficulty: "High" },
    { keyword: "market perception tools", position: 12, change: 0, volume: "890", difficulty: "Low" },
    { keyword: "trust measurement metrics", position: 15, change: -2, volume: "720", difficulty: "High" }
  ];

  // Sample organic search data
  const organicData = {
    totalVisits: "12,483",
    growth: "+18%",
    avgPosition: 6.8,
    clickThrough: "4.2%"
  };

  return (
    <BrandMarketingLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">SEO & Keywords</h1>
          <p className="text-muted-foreground mt-2">
            Monitor your organic search performance and keyword rankings
          </p>
        </div>
        
        {/* Organic Search Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Organic Visits</CardTitle>
              <Search className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organicData.totalVisits}</div>
              <div className="flex items-center text-xs text-green-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>{organicData.growth} from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Position</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organicData.avgPosition}</div>
              <p className="text-xs text-muted-foreground">Across all tracked keywords</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Click-Through Rate</CardTitle>
              <ArrowRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{organicData.clickThrough}</div>
              <div className="flex items-center text-xs text-green-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+0.5% from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Indexed Pages</CardTitle>
              <LineChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <div className="flex items-center text-xs text-green-500">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+12 from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Keyword Rankings */}
        <Card>
          <CardHeader>
            <CardTitle>Keyword Rankings</CardTitle>
            <CardDescription>Tracking performance of your target keywords</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Keyword</th>
                    <th className="px-4 py-2 text-left">Position</th>
                    <th className="px-4 py-2 text-left">Change</th>
                    <th className="px-4 py-2 text-left">Monthly Volume</th>
                    <th className="px-4 py-2 text-left">Difficulty</th>
                  </tr>
                </thead>
                <tbody>
                  {keywordData.map((keyword, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-4 font-medium">{keyword.keyword}</td>
                      <td className="px-4 py-4">{keyword.position}</td>
                      <td className="px-4 py-4">
                        {keyword.change > 0 ? (
                          <span className="flex items-center text-green-500">
                            <TrendingUp className="mr-1 h-4 w-4" />
                            +{keyword.change}
                          </span>
                        ) : keyword.change < 0 ? (
                          <span className="flex items-center text-red-500">
                            <TrendingDown className="mr-1 h-4 w-4" />
                            {keyword.change}
                          </span>
                        ) : (
                          <span className="flex items-center text-gray-500">
                            <Minus className="mr-1 h-4 w-4" />
                            0
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-4">{keyword.volume}</td>
                      <td className="px-4 py-4">
                        <Badge variant={
                          keyword.difficulty === "Low" ? "outline" : 
                          keyword.difficulty === "Medium" ? "secondary" : 
                          "destructive"
                        }>
                          {keyword.difficulty}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline">View All Keywords</Button>
            </div>
          </CardContent>
        </Card>
        
        {/* SEO Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Recommendations</CardTitle>
            <CardDescription>Actions to improve organic search performance</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Badge variant="outline" className="mr-2 bg-amber-50 text-amber-700 border-amber-300 p-1">Medium</Badge>
                <div>
                  <p className="font-medium">Improve meta descriptions on product pages</p>
                  <p className="text-sm text-muted-foreground">8 pages have missing or duplicate meta descriptions</p>
                </div>
              </li>
              <li className="flex items-start">
                <Badge variant="outline" className="mr-2 bg-red-50 text-red-700 border-red-300 p-1">High</Badge>
                <div>
                  <p className="font-medium">Optimize page speed on mobile devices</p>
                  <p className="text-sm text-muted-foreground">Mobile page speed is below industry average</p>
                </div>
              </li>
              <li className="flex items-start">
                <Badge variant="outline" className="mr-2 bg-green-50 text-green-700 border-green-300 p-1">Low</Badge>
                <div>
                  <p className="font-medium">Add schema markup to review pages</p>
                  <p className="text-sm text-muted-foreground">Missing structured data for customer reviews</p>
                </div>
              </li>
              <li className="flex items-start">
                <Badge variant="outline" className="mr-2 bg-amber-50 text-amber-700 border-amber-300 p-1">Medium</Badge>
                <div>
                  <p className="font-medium">Build more backlinks from industry publications</p>
                  <p className="text-sm text-muted-foreground">Competitor analysis shows opportunity for more quality backlinks</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </BrandMarketingLayout>
  );
};

export default SEOKeywords;
