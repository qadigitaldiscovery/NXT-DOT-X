import { useState, useEffect, useCallback } from 'react';
export const useNotifications = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [unreadCount, setUnreadCount] = useState(0);
    // Fetch notifications
    const fetchNotifications = useCallback(async () => {
        setLoading(true);
        try {
            // For demonstration purposes, we're using mock data
            // In a real application, this would be a call to an API
            const mockNotifications = [
                {
                    id: '1',
                    title: 'System Alert',
                    content: 'Authentication module showing degraded performance.',
                    type: 'warning',
                    createdAt: new Date(Date.now() - 3600000).toISOString(),
                    isRead: false
                },
                {
                    id: '2',
                    title: 'Maintenance Notice',
                    content: 'Scheduled maintenance tonight at 2:00 AM UTC.',
                    type: 'info',
                    createdAt: new Date(Date.now() - 86400000).toISOString(),
                    isRead: true
                }
            ];
            setNotifications(mockNotifications);
            setUnreadCount(mockNotifications.filter(n => !n.isRead).length);
        }
        catch (error) {
            console.error('Error fetching notifications:', error);
        }
        finally {
            setLoading(false);
        }
    }, []);
    // Mark notification as read
    const markAsRead = useCallback(async (id) => {
        setNotifications(prevNotifications => prevNotifications.map(notification => notification.id === id ? { ...notification, isRead: true } : notification));
        setUnreadCount(prev => Math.max(0, prev - 1));
        // In a real app, we would call an API to update the notification status
    }, []);
    // Mark all notifications as read
    const markAllAsRead = useCallback(async () => {
        setNotifications(prevNotifications => prevNotifications.map(notification => ({ ...notification, isRead: true })));
        setUnreadCount(0);
        // In a real app, we would call an API to update all notifications
    }, []);
    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);
    return {
        notifications,
        loading,
        unreadCount,
        markAsRead,
        markAllAsRead,
        refreshNotifications: fetchNotifications
    };
};
