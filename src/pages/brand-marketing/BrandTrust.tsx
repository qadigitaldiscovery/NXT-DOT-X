
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandMarketingLayout } from '@/components/layout/BrandMarketingLayout';
import { BadgePercent, Shield, ThumbsUp, Heart } from 'lucide-react';

const BrandTrust = () => {
  // Sample trust metrics
  const trustMetrics = [
    { name: "Overall Trust Score", value: "8.2/10", trend: "up", change: "+0.5" },
    { name: "Customer Loyalty", value: "76%", trend: "up", change: "+3%" },
    { name: "Brand Reliability", value: "9.1/10", trend: "up", change: "+0.2" },
    { name: "Transparency Rating", value: "8.7/10", trend: "stable" }
  ];

  return (
    <BrandMarketingLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trust Analysis</h1>
          <p className="text-muted-foreground mt-2">
            Comprehensive analysis of brand trust metrics and improvement strategies
          </p>
        </div>
        
        {/* Trust Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {trustMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                {index === 0 ? <BadgePercent className="h-4 w-4 text-muted-foreground" /> :
                 index === 1 ? <Heart className="h-4 w-4 text-muted-foreground" /> :
                 index === 2 ? <Shield className="h-4 w-4 text-muted-foreground" /> :
                 <ThumbsUp className="h-4 w-4 text-muted-foreground" />}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                {metric.change && (
                  <div className="flex items-center text-xs text-green-500">
                    <span>{metric.change} from last quarter</span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Trust Analysis Content */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Trust Factors Analysis</CardTitle>
              <CardDescription>Key drivers of brand trust</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Analysis of the factors that most significantly impact your brand's trust score, 
                including product quality, customer service, transparency, and corporate social responsibility.
              </p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Product Quality</div>
                    <div className="text-sm font-medium">9.2/10</div>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Customer Service</div>
                    <div className="text-sm font-medium">8.7/10</div>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Transparency</div>
                    <div className="text-sm font-medium">8.5/10</div>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">Social Responsibility</div>
                    <div className="text-sm font-medium">7.8/10</div>
                  </div>
                  <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Trust Improvement Strategies</CardTitle>
              <CardDescription>Recommended actions to enhance brand trust</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium">Enhance Transparency Initiatives</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Increase communication about sourcing, manufacturing processes, and company values
                    through website content and social media campaigns.
                  </p>
                </li>
                
                <li className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium">Strengthen Customer Service</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Implement additional training for support staff and expand service hours
                    to improve response times and resolution rates.
                  </p>
                </li>
                
                <li className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium">Expand Social Responsibility Programs</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Develop and publicize new community initiatives and sustainability practices
                    to strengthen your brand's ethical positioning.
                  </p>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </BrandMarketingLayout>
  );
};

export default BrandTrust;
