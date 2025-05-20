
import React from 'react';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface QuickNavCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  iconBgClass?: string;
  iconClass?: string;
}

export const QuickNavCard: React.FC<QuickNavCardProps> = ({
  title,
  description,
  icon: Icon,
  path,
  iconBgClass = "bg-purple-100",
  iconClass = "text-purple-600"
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" 
          onClick={() => navigate(path)}>
      <CardHeader className="pb-2">
        <div className={`${iconBgClass} rounded-full w-10 h-10 flex items-center justify-center`}>
          <Icon className={`h-5 w-5 ${iconClass}`} />
        </div>
        <CardTitle className="text-xl mt-2">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="pt-0 pb-4">
        <Link to={path} className="text-sm text-purple-600 font-medium flex items-center hover:underline">
          View {title} 
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
};
