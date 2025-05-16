
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';

export interface NotificationsPopoverProps {}

const NotificationsPopover: React.FC<NotificationsPopoverProps> = () => {
  const { 
    notifications, 
    loading, 
    unreadCount, 
    markAsRead,
    markAllAsRead,
    refreshNotifications
  } = useNotifications();

  const handleNotificationClick = async (id: string) => {
    await markAsRead(id);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleRefresh = async () => {
    await refreshNotifications();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center p-0 text-[0.7rem]"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between pb-2">
          <h4 className="font-medium text-sm">Notifications</h4>
          <div className="flex gap-1">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 px-2 text-xs"
              onClick={handleMarkAllAsRead}
              disabled={loading || unreadCount === 0}
            >
              Mark all as read
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2 text-xs"
              onClick={handleRefresh}
              disabled={loading}
            >
              Refresh
            </Button>
          </div>
        </div>
        <Separator />
        <ScrollArea className="h-80">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">Loading notifications...</p>
            </div>
          ) : notifications.length > 0 ? (
            <div className="space-y-1 py-1">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors cursor-pointer ${
                    !notification.isRead ? "bg-muted/50" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getNotificationTypeColor(notification.type)}`} />
                    <span className="text-sm font-medium">{notification.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground ml-4 mt-1">{notification.content}</p>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-muted-foreground ml-4">
                      {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
                    </span>
                    {!notification.isRead && (
                      <Badge variant="secondary" className="text-xs">New</Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">No notifications</p>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

function getNotificationTypeColor(type: string): string {
  switch (type) {
    case 'error':
      return 'bg-red-500';
    case 'warning':
      return 'bg-amber-500';
    case 'success':
      return 'bg-green-500';
    case 'info':
    default:
      return 'bg-blue-500';
  }
}

export default NotificationsPopover;
