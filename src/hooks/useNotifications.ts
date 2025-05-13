
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type Notification = {
  id: string;
  title: string;
  content: string;
  type: 'info' | 'warning' | 'error' | 'success';
  is_read: boolean;
  created_at: string;
  entity_id?: string;
  entity_type?: string;
};

export function useNotifications(limit: number = 10) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    // For now, we're returning mock data
    const mockNotifications: Notification[] = [
      {
        id: '1',
        title: 'Module status changed',
        content: 'Authentication module changed from "green" to "orange"',
        type: 'warning',
        is_read: false,
        created_at: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        entity_id: '1',
        entity_type: 'module'
      },
      {
        id: '2',
        title: 'New alert detected',
        content: 'High CPU usage detected on Database module',
        type: 'error',
        is_read: false,
        created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        entity_id: '2',
        entity_type: 'alert'
      },
      {
        id: '3',
        title: 'Alert resolved',
        content: 'Memory leak issue has been resolved',
        type: 'success',
        is_read: true,
        created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        entity_id: '3',
        entity_type: 'alert'
      },
      {
        id: '4',
        title: 'Threshold rule added',
        content: 'New monitoring rule added for network latency',
        type: 'info',
        is_read: true,
        created_at: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
        entity_id: '1',
        entity_type: 'rule'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.is_read).length);
    setLoading(false);
  }, [limit]);

  const markAsRead = async (id: string) => {
    // In a real implementation, this would update the database
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, is_read: true } 
          : notification
      )
    );

    setUnreadCount(prev => Math.max(0, prev - 1));
    
    return { success: true, error: null };
  };

  const markAllAsRead = async () => {
    // In a real implementation, this would update the database
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, is_read: true }))
    );

    setUnreadCount(0);
    
    return { success: true, error: null };
  };

  const deleteNotification = async (id: string) => {
    // In a real implementation, this would update the database
    const notificationToDelete = notifications.find(n => n.id === id);
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    
    if (notificationToDelete && !notificationToDelete.is_read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
    
    return { success: true, error: null };
  };

  return { 
    notifications, 
    loading, 
    error, 
    unreadCount, 
    markAsRead,
    markAllAsRead,
    deleteNotification
  };
}
