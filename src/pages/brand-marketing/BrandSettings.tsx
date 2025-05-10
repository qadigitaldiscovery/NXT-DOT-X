
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BrandMarketingLayout } from '@/components/layout/BrandMarketingLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

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
        
        <Card>
          <CardHeader>
            <CardTitle>Brand Identity</CardTitle>
            <CardDescription>Define your brand's core identity elements</CardDescription>
          </CardHeader>
          <CardContent>
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
              
              <Button type="submit">Save Brand Identity</Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Analytics Settings</CardTitle>
            <CardDescription>Configure how brand analytics are gathered and displayed</CardDescription>
          </CardHeader>
          <CardContent>
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
              
              <Button>Save Analytics Preferences</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </BrandMarketingLayout>
  );
};

export default BrandSettings;
