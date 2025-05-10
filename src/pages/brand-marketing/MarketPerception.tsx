
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandMarketingLayout } from '@/components/layout/BrandMarketingLayout';
import { Globe, MessageSquare, TrendingUp } from 'lucide-react';

const MarketPerception = () => {
  // Sample sentiment data
  const sentimentData = {
    positive: 68,
    neutral: 22,
    negative: 10
  };
  
  // Sample channel data
  const channelData = [
    { name: "Social Media", sentiment: "Mostly Positive", volume: "High" },
    { name: "Review Sites", sentiment: "Positive", volume: "Medium" },
    { name: "News Media", sentiment: "Neutral", volume: "Low" },
    { name: "Industry Forums", sentiment: "Very Positive", volume: "Medium" }
  ];
  
  // Sample top keywords
  const keywords = [
    { text: "Quality", count: 342, sentiment: "positive" },
    { text: "Reliable", count: 285, sentiment: "positive" },
    { text: "Expensive", count: 178, sentiment: "negative" },
    { text: "Innovative", count: 156, sentiment: "positive" },
    { text: "Customer Service", count: 142, sentiment: "mixed" }
  ];

  return (
    <BrandMarketingLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Market Perception</h1>
          <p className="text-muted-foreground mt-2">
            Analysis of how your brand is perceived in the market across different channels
          </p>
        </div>
        
        {/* Overall Sentiment */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Brand Sentiment</CardTitle>
            <CardDescription>Aggregate sentiment analysis across all channels</CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex items-center mb-6">
              <div className="text-2xl font-bold mr-2">
                {sentimentData.positive}% Positive
              </div>
              <span className="text-green-500 flex items-center text-sm">
                <TrendingUp className="h-4 w-4 mr-1" /> +5% from last quarter
              </span>
            </div>
            
            <div className="w-full h-4 bg-gray-200 rounded-full mb-6">
              <div className="flex h-full rounded-full overflow-hidden">
                <div 
                  className="bg-green-500" 
                  style={{ width: `${sentimentData.positive}%` }}
                ></div>
                <div 
                  className="bg-gray-400" 
                  style={{ width: `${sentimentData.neutral}%` }}
                ></div>
                <div 
                  className="bg-red-500" 
                  style={{ width: `${sentimentData.negative}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Positive ({sentimentData.positive}%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                <span>Neutral ({sentimentData.neutral}%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span>Negative ({sentimentData.negative}%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Channel Analysis */}
        <Card>
          <CardHeader>
            <CardTitle>Channel Perception Analysis</CardTitle>
            <CardDescription>How your brand is perceived across different channels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Channel</th>
                    <th className="px-4 py-2 text-left">Sentiment</th>
                    <th className="px-4 py-2 text-left">Volume</th>
                    <th className="px-4 py-2 text-left">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {channelData.map((channel, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-2">{channel.name}</td>
                      <td className="px-4 py-2">
                        <span className={
                          channel.sentiment.includes("Positive") ? "text-green-500 font-medium" : 
                          channel.sentiment.includes("Negative") ? "text-red-500 font-medium" : 
                          "text-gray-500 font-medium"
                        }>
                          {channel.sentiment}
                        </span>
                      </td>
                      <td className="px-4 py-2">{channel.volume}</td>
                      <td className="px-4 py-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Key Topics and Keywords */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top Brand Keywords</CardTitle>
              <CardDescription>Most frequently associated terms</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {keywords.map((keyword, index) => (
                  <li key={index} className="flex justify-between items-center">
                    <span className="font-medium">{keyword.text}</span>
                    <div className="flex items-center">
                      <span className={
                        keyword.sentiment === "positive" ? "text-green-500 mr-2" : 
                        keyword.sentiment === "negative" ? "text-red-500 mr-2" : 
                        "text-yellow-500 mr-2"
                      }>
                        {keyword.sentiment}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {keyword.count} mentions
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Brand Mentions</CardTitle>
              <CardDescription>Latest references across platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Twitter</span>
                    <span className="text-green-500 text-sm">Positive</span>
                  </div>
                  <p className="text-sm">"The customer service from this brand is exceptional! Quick response and went above and beyond to solve my issue."</p>
                  <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Product Review</span>
                    <span className="text-green-500 text-sm">Positive</span>
                  </div>
                  <p className="text-sm">"High quality product that delivers on all promises. Would highly recommend to others looking for reliability."</p>
                  <p className="text-xs text-gray-500 mt-1">1 day ago</p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Industry Blog</span>
                    <span className="text-gray-500 text-sm">Neutral</span>
                  </div>
                  <p className="text-sm">"The brand continues to maintain its market position, though faces increasing competition from newer entrants."</p>
                  <p className="text-xs text-gray-500 mt-1">3 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </BrandMarketingLayout>
  );
};

export default MarketPerception;
