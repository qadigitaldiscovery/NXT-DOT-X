
import React from 'react';
import { cn } from '@/lib/utils';
import { NavCategory } from './types';
import { SidebarItem } from './SidebarItem';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

interface SidebarCategoryMenuProps {
  categories: NavCategory[];
  openCategories: string[];
  onCategoryToggle: (category: string) => void;
}

export const SidebarCategoryMenu = ({ 
  categories, 
  openCategories,
  onCategoryToggle
}: SidebarCategoryMenuProps) => {
  return (
    <Accordion 
      type="multiple" 
      value={openCategories}
      className="space-y-1"
    >
      {categories.map((category) => (
        <AccordionItem 
          key={category.name} 
          value={category.name}
          className="border-none"
        >
          <AccordionTrigger 
            className="py-2 px-3 rounded-md hover:bg-sidebar-accent hover:no-underline text-sidebar-foreground"
            onClick={() => onCategoryToggle(category.name)}
          >
            <span className="text-sm font-medium">{category.name}</span>
          </AccordionTrigger>
          <AccordionContent className="pb-0 pt-1">
            <ul className="space-y-1 pl-2">
              {category.items.map((item) => (
                <SidebarItem key={item.path} item={item} />
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
