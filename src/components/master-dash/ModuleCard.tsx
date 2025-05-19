
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
  path: string;
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
    default: "bg-gradient-to-br from-redmetal-600 to-black border-blue-800/40 backdrop-blur-sm",
    primary: "bg-gradient-to-br from-blue-800/90 to-blue-900 border-blue-600/60 backdrop-blur-sm",
    secondary: "bg-gradient-to-br from-purple-800/90 to-purple-900 border-purple-600/60 backdrop-blur-sm"
  };

  return (
    <Card className={cn(cardVariants[variant], "overflow-hidden", className)}>
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{ 
          backgroundImage: "url('/lovable-uploads/f591cd6e-de49-44cf-bfb9-207fcd31b3ce.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      
      {/* Neon splash */}
      <div 
        className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-xl"
        style={{
          background: variant === 'default' 
            ? "radial-gradient(circle at center, rgba(56,189,248,0.6) 0%, rgba(59,130,246,0.3) 40%, transparent 70%)"
            : variant === 'primary'
              ? "radial-gradient(circle at center, rgba(96,165,250,0.6) 0%, rgba(37,99,235,0.3) 40%, transparent 70%)"
              : "radial-gradient(circle at center, rgba(167,139,250,0.6) 0%, rgba(126,34,206,0.3) 40%, transparent 70%)",
          zIndex: 0
        }}
      />
      
      <CardHeader className="relative z-10 pb-2 pt-4">
        <CardTitle className="text-lg font-medium text-white text-center">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="relative z-10 space-y-2">
        {features.map((feature, index) => (
          <Button 
            key={index}
            variant="outline" 
            className="w-full border-gray-600 bg-black/30 hover:bg-black/50 text-white justify-center mb-1"
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
