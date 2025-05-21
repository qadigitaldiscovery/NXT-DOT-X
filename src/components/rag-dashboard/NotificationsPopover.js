import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
const NotificationsPopover = () => {
    const { notifications, loading, unreadCount, markAsRead, markAllAsRead, refreshNotifications } = useNotifications();
    const handleNotificationClick = async (id) => {
        await markAsRead(id);
    };
    const handleMarkAllAsRead = async () => {
        await markAllAsRead();
    };
    const handleRefresh = async () => {
        await refreshNotifications();
    };
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "icon", className: "relative", children: [_jsx(Bell, { className: "h-[1.2rem] w-[1.2rem]" }), unreadCount > 0 && (_jsx(Badge, { variant: "destructive", className: "absolute -top-2 -right-2 min-w-[1.1rem] h-[1.1rem] flex items-center justify-center p-0 text-[0.7rem]", children: unreadCount }))] }) }), _jsxs(PopoverContent, { className: "w-80", align: "end", children: [_jsxs("div", { className: "flex items-center justify-between pb-2", children: [_jsx("h4", { className: "font-medium text-sm", children: "Notifications" }), _jsxs("div", { className: "flex gap-1", children: [_jsx(Button, { variant: "ghost", size: "sm", className: "h-8 px-2 text-xs", onClick: handleMarkAllAsRead, disabled: loading || unreadCount === 0, children: "Mark all as read" }), _jsx(Button, { variant: "ghost", size: "sm", className: "h-8 px-2 text-xs", onClick: handleRefresh, disabled: loading, children: "Refresh" })] })] }), _jsx(Separator, {}), _jsx(ScrollArea, { className: "h-80", children: loading ? (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx("p", { className: "text-sm text-muted-foreground", children: "Loading notifications..." }) })) : notifications.length > 0 ? (_jsx("div", { className: "space-y-1 py-1", children: notifications.map((notification) => (_jsxs("div", { className: `p-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors cursor-pointer ${!notification.isRead ? "bg-muted/50" : ""}`, onClick: () => handleNotificationClick(notification.id), children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: `w-2 h-2 rounded-full ${getNotificationTypeColor(notification.type)}` }), _jsx("span", { className: "text-sm font-medium", children: notification.title })] }), _jsx("p", { className: "text-xs text-muted-foreground ml-4 mt-1", children: notification.content }), _jsxs("div", { className: "flex justify-between items-center mt-1", children: [_jsx("span", { className: "text-xs text-muted-foreground ml-4", children: formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true }) }), !notification.isRead && (_jsx(Badge, { variant: "secondary", className: "text-xs", children: "New" }))] })] }, notification.id))) })) : (_jsx("div", { className: "flex items-center justify-center h-full", children: _jsx("p", { className: "text-sm text-muted-foreground", children: "No notifications" }) })) })] })] }));
};
function getNotificationTypeColor(type) {
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
