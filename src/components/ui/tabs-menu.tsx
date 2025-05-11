
import React from 'react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LucideIcon } from 'lucide-react';

export interface TabItem {
  value: string;
  label: string;
  icon?: LucideIcon;
}

interface TabsMenuProps {
  items: TabItem[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const TabsMenu: React.FC<TabsMenuProps> = ({
  items,
  value,
  onChange,
  className
}) => {
  return (
    <Tabs value={value} onValueChange={onChange} className={cn("w-full", className)}>
      <TabsList className="mb-4">
        {items.map((item) => (
          <TabsTrigger key={item.value} value={item.value}>
            {item.icon && <item.icon className="h-4 w-4 mr-1" />}
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};

export default TabsMenu;
