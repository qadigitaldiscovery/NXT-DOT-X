
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface BetaFeature {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

const BetaFeatureManagement: React.FC = () => {
  const [features, setFeatures] = useState<BetaFeature[]>([
    {
      id: 'beta-dashboard',
      name: 'Beta Dashboard',
      description: 'Enhanced dashboard with advanced analytics',
      enabled: false
    },
    {
      id: 'ai-assistant',
      name: 'AI Assistant',
      description: 'Intelligent assistant for data analysis',
      enabled: false
    },
    {
      id: 'advanced-reporting',
      name: 'Advanced Reporting',
      description: 'Complex reporting and data visualization',
      enabled: false
    }
  ]);

  const handleToggleFeature = (featureId: string) => {
    setFeatures(prev => prev.map(feature => 
      feature.id === featureId 
        ? { ...feature, enabled: !feature.enabled }
        : feature
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Beta Feature Management</h1>
        <p className="text-gray-600">Manage beta features and user access (Security Disabled)</p>
      </div>

      <div className="grid gap-4">
        {features.map((feature) => (
          <Card key={feature.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {feature.name}
                    <Badge variant="secondary">Beta</Badge>
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </div>
                <Switch
                  checked={feature.enabled}
                  onCheckedChange={() => handleToggleFeature(feature.id)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-gray-600">
                Status: {feature.enabled ? 'Enabled' : 'Disabled'}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Notice</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-amber-600">
              ⚠️ Security restrictions have been disabled. All users have access to all features.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BetaFeatureManagement;
