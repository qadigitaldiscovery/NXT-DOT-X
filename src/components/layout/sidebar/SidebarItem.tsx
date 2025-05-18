import { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// Define props for sidebar items
interface SidebarItemProps {
  href?: string;
  icon: React.ElementType;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  showLabel?: boolean;
  collapsible?: boolean;
  tooltip?: boolean;
  textColor?: string;
  activeBgColor?: string;
  activeTextColor?: string;
  hoverBgColor?: string;
  isCollapsed?: boolean;
}

export const SidebarItem = ({
  href,
  icon: Icon,
  label,
  active,
  disabled,
  onClick,
  showLabel = true,
  collapsible = true,
  tooltip = true,
  textColor = "text-gray-200",
  activeBgColor = "bg-indigo-900",
  activeTextColor = "text-white",
  hoverBgColor = "hover:bg-indigo-800/60",
  isCollapsed = false
}: SidebarItemProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine if the item is active based on current location
  const isActive = active !== undefined 
    ? active 
    : href && location.pathname.startsWith(href);
  
  // Handle click - navigate or call custom onClick
  const handleClick = useCallback(() => {
    // Don't do anything if disabled
    if (disabled) return;
    
    // Custom click handler takes precedence
    if (onClick) {
      onClick();
      return;
    }
    
    // Navigate if href is provided
    if (href) {
      navigate(href);
    }
  }, [disabled, onClick, href, navigate]);

  // The item content
  const itemContent = (
    <div
      className={cn(
        "flex items-center rounded-md px-3 py-2 cursor-pointer",
        "transition-colors duration-200 ease-in-out",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
        disabled ? "opacity-50 cursor-not-allowed" : hoverBgColor,
        isActive ? cn(activeBgColor, activeTextColor) : textColor,
        isCollapsed && "justify-center"
      )}
      onClick={handleClick}
    >
      {Icon && <Icon className={cn("h-5 w-5", !showLabel && !isCollapsed && "mr-0")} />}
      
      {showLabel && !isCollapsed && (
        <span className={cn("ml-3 flex-1 truncate")}>{label}</span>
      )}
    </div>
  );
  
  // If collapsed and tooltip is enabled, wrap in tooltip
  if (isCollapsed && tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          {itemContent}
        </TooltipTrigger>
        <TooltipContent side="right" className="bg-gray-800 text-white border-gray-700">
          {label}
        </TooltipContent>
      </Tooltip>
    );
  }
  
  // Otherwise just return the content
  return itemContent;
};
