
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
          title="SEO & Organic Search"
          description="Configure keyword tracking and SEO monitoring"
          defaultOpen={true}
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
