
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { Shield, Database, Users, Settings, Cloud, Zap, Brain, BarChart3 } from 'lucide-react';

interface ModuleConfig {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  category: 'core' | 'beta' | 'experimental' | 'premium';
  icon: React.ComponentType<any>;
  dependencies?: string[];
}

const MODULES: ModuleConfig[] = [
  {
    id: 'auth',
    name: 'Authentication System',
    description: 'User authentication and authorization',
    enabled: true,
    category: 'core',
    icon: Shield
  },
  {
    id: 'database',
    name: 'Database Management',
    description: 'Core database operations and management',
    enabled: true,
    category: 'core',
    icon: Database
  },
  {
    id: 'user_management',
    name: 'User Management',
    description: 'User profiles and management system',
    enabled: true,
    category: 'core',
    icon: Users,
    dependencies: ['auth']
  },
  {
    id: 'rag_dashboard',
    name: 'RAG Dashboard',
    description: 'Real-time analytics and monitoring dashboard',
    enabled: false,
    category: 'beta',
    icon: BarChart3
  },
  {
    id: 'ai_assistant',
    name: 'AI Assistant',
    description: 'Intelligent assistant powered by OpenAI',
    enabled: false,
    category: 'beta',
    icon: Brain
  }
];

export const ModuleTogglePanel: React.FC = () => {
  const [modules, setModules] = useState<ModuleConfig[]>(MODULES);

  const toggleModule = (moduleId: string) => {
    setModules(prev => {
      const updated = prev.map(module => {
        if (module.id === moduleId) {
          const newEnabled = !module.enabled;
          
          if (newEnabled) {
            toast.success(`${module.name} has been enabled`);
          } else {
            toast.error(`${module.name} has been disabled`);
          }
          
          return { ...module, enabled: newEnabled };
        }
        return module;
      });
      
      return updated;
    });
  };

  const enableAll = (category: string) => {
    setModules(prev => {
      const updated = prev.map(module => 
        module.category === category ? { ...module, enabled: true } : module
      );
      
      const enabledCount = updated.filter(m => m.category === category && m.enabled).length;
      toast.success(`Enabled ${enabledCount} ${category} modules`);
      
      return updated;
    });
  };

  const disableAll = (category: string) => {
    setModules(prev => {
      const updated = prev.map(module => {
        if (module.category === category && module.category !== 'core') {
          return { ...module, enabled: false };
        }
        return module;
      });
      
      const disabledCount = prev.filter(m => m.category === category).length;
      if (category === 'core') {
        toast.error('Core modules cannot be disabled');
      } else {
        toast.success(`Disabled ${disabledCount} ${category} modules`);
      }
      
      return updated;
    });
  };

  const getModulesByCategory = (category: string) => 
    modules.filter(module => module.category === category);

  const getCategoryBadgeVariant = (category: string) => {
    switch (category) {
      case 'core': return 'default';
      case 'beta': return 'secondary';
      case 'experimental': return 'outline';
      case 'premium': return 'destructive';
      default: return 'default';
    }
  };

  const renderModuleCard = (module: ModuleConfig) => {
    const Icon = module.icon;
    
    return (
      <Card key={module.id} className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Icon className="h-5 w-5" />
            <div>
              <h4 className="font-medium">{module.name}</h4>
              <p className="text-sm text-muted-foreground">{module.description}</p>
              {module.dependencies && (
                <p className="text-xs text-muted-foreground mt-1">
                  Depends on: {module.dependencies.join(', ')}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={getCategoryBadgeVariant(module.category) as any}>
              {module.category}
            </Badge>
            <Switch
              checked={module.enabled}
              onCheckedChange={() => toggleModule(module.id)}
              disabled={module.category === 'core'}
            />
          </div>
        </div>
      </Card>
    );
  };

  const renderCategorySection = (category: string, title: string) => {
    const categoryModules = getModulesByCategory(category);
    
    if (categoryModules.length === 0) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <div className="space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => enableAll(category)}
              disabled={category === 'core'}
            >
              Enable All
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => disableAll(category)}
              disabled={category === 'core'}
            >
              Disable All
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          {categoryModules.map(renderModuleCard)}
        </div>
      </div>
    );
  };

  const resetToDefaults = () => {
    setModules(MODULES);
    toast.success('Module settings reset to defaults');
  };

  const saveConfiguration = () => {
    toast.success('Module configuration saved successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Module Management</CardTitle>
        <CardDescription>
          Enable or disable platform modules. Core modules cannot be disabled.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList>
            <TabsTrigger value="all">All Modules</TabsTrigger>
            <TabsTrigger value="core">Core</TabsTrigger>
            <TabsTrigger value="beta">Beta</TabsTrigger>
            <TabsTrigger value="experimental">Experimental</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            {renderCategorySection('core', 'Core Modules')}
            <Separator />
            {renderCategorySection('beta', 'Beta Modules')}
            <Separator />
            {renderCategorySection('experimental', 'Experimental Modules')}
            <Separator />
            {renderCategorySection('premium', 'Premium Modules')}
          </TabsContent>

          <TabsContent value="core">
            {renderCategorySection('core', 'Core Modules')}
          </TabsContent>

          <TabsContent value="beta">
            {renderCategorySection('beta', 'Beta Modules')}
          </TabsContent>

          <TabsContent value="experimental">
            {renderCategorySection('experimental', 'Experimental Modules')}
          </TabsContent>
        </Tabs>

        <div className="flex justify-between pt-6 border-t">
          <Button variant="outline" onClick={resetToDefaults}>
            Reset to Defaults
          </Button>
          <Button onClick={saveConfiguration}>
            Save Configuration
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModuleTogglePanel;
