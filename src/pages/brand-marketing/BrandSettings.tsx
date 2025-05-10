
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandMarketingLayout } from '@/components/layout/BrandMarketingLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CollapsibleSettingsSection } from '@/components/beta2/settings/CollapsibleSettingsSection';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const BrandSettings = () => {
  return (
    <BrandMarketingLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brand Settings</h1>
          <p className="text-muted-foreground mt-2">
            Configure your brand marketing module and analytics preferences
          </p>
        </div>
        
        <CollapsibleSettingsSection
          title="Brand Identity"
          description="Define your brand's core identity elements"
          defaultOpen={true}
          footerContent={<Button>Save Brand Identity</Button>}
        >
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="brand-name">Brand Name</Label>
              <Input id="brand-name" defaultValue="NXT Level Brand" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="brand-tagline">Brand Tagline</Label>
              <Input id="brand-tagline" defaultValue="Elevating Trust and Innovation" />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="brand-description">Brand Description</Label>
              <Textarea 
                id="brand-description" 
                rows={3} 
                defaultValue="NXT Level Brand delivers cutting-edge solutions with a commitment to quality, reliability, and customer satisfaction."
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="brand-values">Core Brand Values (comma separated)</Label>
              <Input id="brand-values" defaultValue="Trust, Innovation, Quality, Customer-Focus, Integrity" />
            </div>
          </form>
        </CollapsibleSettingsSection>
        
        <CollapsibleSettingsSection
          title="Consumer Trust Framework"
          description="Configure trust metrics tracking based on the Consumer Trust Framework"
          defaultOpen={true}
          footerContent={<Button>Save Trust Framework Settings</Button>}
        >
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-1">
              <Card className="bg-red-50 border-red-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Brand Health Metrics</CardTitle>
                  <CardDescription>Configure tracking for overall brand health indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Track</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Value of Organic Traffic</TableCell>
                        <TableCell>AHREFS</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Geographic Score</TableCell>
                        <TableCell>Internal</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Brand Mentions</TableCell>
                        <TableCell>BrandWatch</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Unique Authors</TableCell>
                        <TableCell>BrandWatch</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="bg-purple-50 border-purple-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Brand Growth & Sentiment</CardTitle>
                  <CardDescription>Configure tracking for growth and customer sentiment</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Track</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Overall Growth Rate</TableCell>
                        <TableCell>Multiple Sources</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>LinkedIn Growth Rate</TableCell>
                        <TableCell>LinkedIn</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>NPS Net Sentiment Score</TableCell>
                        <TableCell>BrandWatch</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>New User Registrations</TableCell>
                        <TableCell>SEO Tool</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="bg-amber-50 border-amber-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Social Media & Engagement</CardTitle>
                  <CardDescription>Configure tracking for social media performance and engagement</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Track</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Share of Voice - Volume</TableCell>
                        <TableCell>UNMETRIC + SOCIAL</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Share of Voice - Engagement</TableCell>
                        <TableCell>UNMETRIC + SOCIAL</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Twitter Followers</TableCell>
                        <TableCell>UNMETRIC</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>YouTube Subscribers Per Day</TableCell>
                        <TableCell>TUBEBUDDY</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>TikTok Followers</TableCell>
                        <TableCell>SPROUT</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Reddit Score</TableCell>
                        <TableCell>BrandWatch</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Unique Subreddits</TableCell>
                        <TableCell>BrandWatch</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="bg-orange-50 border-orange-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Site Engagement</CardTitle>
                  <CardDescription>Configure tracking for website engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Track</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Site Visits</TableCell>
                        <TableCell>SEMRUSH</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Unique Visitors</TableCell>
                        <TableCell>SEMRUSH</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Purchase Conversion</TableCell>
                        <TableCell>SEMRUSH</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Pages per Visit</TableCell>
                        <TableCell>SEMRUSH</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Average Visit Duration</TableCell>
                        <TableCell>SEMRUSH</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Stay Rate (1-Bounce Rate)</TableCell>
                        <TableCell>SEMRUSH</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Traffic Market Share %</TableCell>
                        <TableCell>SEMRUSH</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="bg-blue-50 border-blue-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Brand Awareness & Search</CardTitle>
                  <CardDescription>Configure tracking for brand awareness and search performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Track</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Domain Authority</TableCell>
                        <TableCell>AHREFS</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Backlinks</TableCell>
                        <TableCell>AHREFS</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Referring Domains</TableCell>
                        <TableCell>AHREFS</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Traffic Driving Brand Keywords</TableCell>
                        <TableCell>SEMRUSH</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Monthly Average Searches</TableCell>
                        <TableCell>Google Ads</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="bg-pink-50 border-pink-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Geographic Reach</CardTitle>
                  <CardDescription>Configure tracking for geographic distribution of brand reach</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Track</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Organic Traffic by Country</TableCell>
                        <TableCell>AHREFS</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>US Traffic Percentage</TableCell>
                        <TableCell>AHREFS</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>India Traffic Percentage</TableCell>
                        <TableCell>AHREFS</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>UK Traffic Percentage</TableCell>
                        <TableCell>AHREFS</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>South Africa Traffic Percentage</TableCell>
                        <TableCell>AHREFS</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="bg-green-50 border-green-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Competitive Position</CardTitle>
                  <CardDescription>Configure tracking for competitor analysis metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Track</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Share of Search</TableCell>
                        <TableCell>SEMRUSH</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Competitor Traffic Comparison</TableCell>
                        <TableCell>AHREFS</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Competitor Keyword Overlap</TableCell>
                        <TableCell>SEMRUSH</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Competitor Social Share</TableCell>
                        <TableCell>UNMETRIC</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Brand Positioning Score</TableCell>
                        <TableCell>Internal</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="bg-indigo-50 border-indigo-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Customer Trust Metrics</CardTitle>
                  <CardDescription>Configure tracking for brand trust and customer confidence</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Track</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Trust Score</TableCell>
                        <TableCell>Trustpilot</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Net Promoter Score</TableCell>
                        <TableCell>Internal Survey</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Customer Retention Rate</TableCell>
                        <TableCell>CRM</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Positive Reviews %</TableCell>
                        <TableCell>Google Reviews</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Customer Lifetime Value</TableCell>
                        <TableCell>Analytics</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="bg-cyan-50 border-cyan-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Organic Search Performance</CardTitle>
                  <CardDescription>Configure tracking for SEO and organic search metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Track</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Organic Traffic</TableCell>
                        <TableCell>Google Analytics</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Organic Keywords</TableCell>
                        <TableCell>SEMRUSH</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Brand SERP Features</TableCell>
                        <TableCell>AHREFS</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Average Keyword Position</TableCell>
                        <TableCell>Google Search Console</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Click-Through Rate</TableCell>
                        <TableCell>Google Search Console</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              <Card className="bg-teal-50 border-teal-100">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Content Marketing Impact</CardTitle>
                  <CardDescription>Configure tracking for content effectiveness metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Metric</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead className="text-right">Track</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Top Performing Content</TableCell>
                        <TableCell>Google Analytics</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Content Engagement Rate</TableCell>
                        <TableCell>Multiple Sources</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Content Conversion Rate</TableCell>
                        <TableCell>Marketing Platform</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Content Authority Score</TableCell>
                        <TableCell>Internal</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Content Sharing Metrics</TableCell>
                        <TableCell>Multiple Platforms</TableCell>
                        <TableCell className="text-right"><Switch defaultChecked={true} /></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </CollapsibleSettingsSection>
        
        <CollapsibleSettingsSection
          title="SEO & Organic Search"
          description="Configure keyword tracking and SEO monitoring"
          defaultOpen={false}
          footerContent={<Button>Save SEO Settings</Button>}
        >
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="target-keywords">Target Keywords (comma separated)</Label>
              <Textarea 
                id="target-keywords" 
                placeholder="e.g., brand management, customer trust, innovation"
                rows={2}
              />
              <p className="text-sm text-muted-foreground">Keywords to track across search engines and analytics</p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="competitor-domains">Competitor Domains (comma separated)</Label>
              <Textarea 
                id="competitor-domains" 
                placeholder="e.g., competitor1.com, competitor2.com"
                rows={2}
              />
              <p className="text-sm text-muted-foreground">Track keyword rankings against these competitors</p>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Weekly SEO Reports</h3>
                <p className="text-sm text-muted-foreground">Receive weekly reports on keyword rankings and organic traffic</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Keyword Position Alerts</h3>
                <p className="text-sm text-muted-foreground">Receive alerts when keyword positions change significantly</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Competitor Monitoring</h3>
                <p className="text-sm text-muted-foreground">Track competitor keyword performance</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          </div>
        </CollapsibleSettingsSection>
        
        <CollapsibleSettingsSection
          title="Analytics Settings"
          description="Configure how brand analytics are gathered and displayed"
          defaultOpen={false}
          footerContent={<Button>Save Analytics Preferences</Button>}
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Social Media Monitoring</h3>
                <p className="text-sm text-muted-foreground">Monitor brand mentions across social platforms</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Review Site Tracking</h3>
                <p className="text-sm text-muted-foreground">Track and analyze product/service reviews</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">News Media Monitoring</h3>
                <p className="text-sm text-muted-foreground">Track brand mentions in news publications</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Competitive Analysis</h3>
                <p className="text-sm text-muted-foreground">Compare brand metrics against competitors</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Automatic Reports</h3>
                <p className="text-sm text-muted-foreground">Generate weekly brand performance reports</p>
              </div>
              <Switch defaultChecked={false} />
            </div>
          </div>
        </CollapsibleSettingsSection>
      </div>
    </BrandMarketingLayout>
  );
};

export default BrandSettings;
