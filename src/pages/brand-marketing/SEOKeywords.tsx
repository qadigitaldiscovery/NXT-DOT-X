
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, TrendingUp, LineChart, BarChart3 } from 'lucide-react';

const SEOKeywords = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">SEO & Keywords</h1>
        <p className="text-muted-foreground mt-2">
          Analyze and optimize your brand's search engine performance and keyword rankings
        </p>
      </div>
      
      {/* SEO Performance Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Organic Traffic</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32.5K</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Position</CardTitle>
            <Search className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+0.8 positions</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indexed Pages</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">842</div>
            <div className="flex items-center text-xs text-green-500">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+24 from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* SEO Analytics Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Keyword Performance</CardTitle>
            <CardDescription>Top performing keywords</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <LineChart className="h-16 w-16 mx-auto mb-2" />
              <p>Keyword performance chart</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>SEO Opportunities</CardTitle>
            <CardDescription>Potential keyword targets</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
            <div className="text-center">
              <Search className="h-16 w-16 mx-auto mb-2" />
              <p>SEO opportunities chart</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Keyword Rankings Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Keywords</CardTitle>
          <CardDescription>Keywords with highest traffic and position</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 font-medium text-sm">
              <div>Keyword</div>
              <div>Position</div>
              <div>Monthly Searches</div>
            </div>
            <div className="space-y-2">
              {[
                { keyword: "brand marketing strategies", position: "2", searches: "4,800" },
                { keyword: "digital brand marketing", position: "3", searches: "3,200" },
                { keyword: "brand analytics tools", position: "5", searches: "2,100" },
                { keyword: "market perception analysis", position: "4", searches: "1,700" },
                { keyword: "brand trust metrics", position: "1", searches: "950" }
              ].map((item, i) => (
                <div key={i} className="grid grid-cols-3 text-sm border-b pb-2">
                  <div className="font-medium">{item.keyword}</div>
                  <div>{item.position}</div>
                  <div>{item.searches}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEOKeywords;
