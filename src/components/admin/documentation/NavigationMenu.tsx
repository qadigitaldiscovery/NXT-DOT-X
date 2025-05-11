
import React from 'react';
import {
  NavigationMenu as NavMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { FileText, BookOpen, HelpCircle, Settings, FileUp } from 'lucide-react';

export const NavigationMenu = () => {
  return (
    <NavMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-80 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
              <ListItem 
                title="Documentation Overview" 
                href="#overview" 
                icon={<FileText className="h-4 w-4 mr-2" />}
              >
                Introduction to the documentation area
              </ListItem>
              <ListItem 
                title="User Guides" 
                href="#user-guides" 
                icon={<BookOpen className="h-4 w-4 mr-2" />}
              >
                Step-by-step guides for common tasks
              </ListItem>
              <ListItem 
                title="Quick Tips" 
                href="#quick-tips" 
                icon={<HelpCircle className="h-4 w-4 mr-2" />}
              >
                Helpful tips for efficient usage
              </ListItem>
              <ListItem 
                title="Tutorials" 
                href="#tutorials" 
                icon={<FileText className="h-4 w-4 mr-2" />}
              >
                Detailed tutorials for advanced features
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Manage Documents</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-80 md:w-[400px]">
              <ListItem 
                title="Upload Document" 
                href="#upload" 
                icon={<FileUp className="h-4 w-4 mr-2" />}
              >
                Upload new documentation files
              </ListItem>
              <ListItem 
                title="Organize Categories" 
                href="#categories" 
                icon={<Settings className="h-4 w-4 mr-2" />}
              >
                Manage document categories and structure
              </ListItem>
              <ListItem 
                title="Document Settings" 
                href="#settings" 
                icon={<Settings className="h-4 w-4 mr-2" />}
              >
                Configure documentation preferences
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink 
            href="#help"
            className={navigationMenuTriggerStyle()}
          >
            Help & Support
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavMenu>
  );
};

// Reusable list item component for navigation menu content
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { 
    icon?: React.ReactNode 
  }
>(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center text-sm font-medium leading-none">
            {icon}
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
