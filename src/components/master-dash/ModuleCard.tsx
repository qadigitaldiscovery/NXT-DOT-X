
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface Feature {
  name: string;
  path: string;
}

interface ModuleCardProps {
  title: string;
  path?: string;
  variant?: 'default' | 'primary' | 'secondary';
  features?: Feature[];
  className?: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ 
  title, 
  path, 
  variant = 'default', 
  features = [],
  className
}) => {
  const cardVariants = {
    default: "bg-gray-800 hover:bg-gray-700 border-gray-700",
    primary: "bg-blue-900 hover:bg-blue-800 border-blue-800",
    secondary: "bg-purple-900 hover:bg-purple-800 border-purple-800"
  };

  return (
    <Card className={cn(cardVariants[variant], "overflow-hidden shadow-md", className)}>
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-lg font-medium text-white text-center">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-2">
        {features.map((feature, index) => (
          <Button 
            key={index}
            variant="outline" 
            className="w-full border-gray-600 bg-gray-900/50 hover:bg-gray-900 text-white justify-center mb-1"
            asChild
          >
            <Link to={feature.path}>
              {feature.name}
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
