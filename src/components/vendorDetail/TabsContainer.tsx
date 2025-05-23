
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { TabItem } from '@/types/vendor';

interface TabsContainerProps {
  tabs: TabItem[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const TabsContainer: React.FC<TabsContainerProps> = ({ 
  tabs, 
  defaultTab, 
  onTabChange 
}) => {
  return (
    <Tabs defaultValue={defaultTab || tabs[0]?.id} onValueChange={onTabChange} className="w-full">
      <TabsList className="mb-4">
        {tabs.map((tab) => (
          <TabsTrigger key={tab.id} value={tab.id}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      
      {tabs.map((tab) => (
        <TabsContent key={tab.id} value={tab.id}>
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsContainer;
