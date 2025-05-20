
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
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
  return <Card className={cn(cardVariants[variant], "overflow-hidden shadow-md", className)}>
      <CardHeader className="pb-1 pt-2 bg-zinc-500 py-[2px]">
        <CardTitle className="font-medium text-white text-center text-sm">
          {title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-1 bg-dashboard-muted my-[6px] py-[4px]">
        {features.map((feature, index) => (
          <div key={index} className="w-full border-gray-600 bg-gray-900/50 hover:bg-gray-900 text-white rounded-md mb-1 px-3 py-2 text-center">
            <Link to={feature.path} className="text-white hover:text-blue-200 w-full block">
              {feature.name}
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>;
};
