
import React from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Notification, useNotifications } from '@/hooks/useNotifications';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const NotificationsPopover: React.FC = () => {
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification 
  } = useNotifications();

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const getNotificationTypeStyles = (type: Notification['type']) => {
    switch (type) {
      case 'error':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'warning':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-300';
      case 'success':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
    }
  };

  const getNotificationIconClass = (type: Notification['type']) => {
    switch (type) {
      case 'error':
        return 'bg-red-200 dark:bg-red-800';
      case 'warning':
        return 'bg-amber-200 dark:bg-amber-800';
      case 'success':
        return 'bg-green-200 dark:bg-green-800';
      default:
        return 'bg-blue-200 dark:bg-blue-800';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h4 className="font-medium">Notifications</h4>
          {unreadCount > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={handleMarkAllAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[calc(80vh-12rem)] max-h-[400px]">
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No notifications
            </div>
          ) : (
            <div>
              {notifications.map((notification, index) => (
                <div key={notification.id}>
                  <div 
                    className={`p-4 ${!notification.is_read ? 'bg-muted/50' : ''}`}
                  >
                    <div className="flex gap-3">
                      <div className={`flex h-8 w-8 rounded-full items-center justify-center ${getNotificationIconClass(notification.type)}`}>
                        {notification.type === 'error' && '❌'}
                        {notification.type === 'warning' && '⚠️'}
                        {notification.type === 'success' && '✅'}
                        {notification.type === 'info' && 'ℹ️'}
                      </div>
                      <div className="flex flex-col gap-1 flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <Badge variant="outline" className="ml-auto">
                            {formatDistanceToNow(new Date(notification.created_at), { 
                              addSuffix: true 
                            })}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {notification.content}
                        </p>
                        {!notification.is_read && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="text-xs self-start mt-1 h-7 px-2"
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                  {index < notifications.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        <div className="p-4 border-t">
          <Button variant="outline" size="sm" className="w-full">
            View all
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationsPopover;
