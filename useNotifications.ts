// ============================================================
// AssetFlow ERP — Notifications & Activity Logs Hook
// ============================================================

import { useState, useCallback, useMemo } from 'react';
import type { Notification, ActivityLog, NotificationFilters, ActivityLogFilters, NotificationStatus } from '@/types';
import {
  MOCK_NOTIFICATIONS,
  MOCK_ACTIVITY_LOGS,
  MOCK_USERS,
} from '@/lib/mockData';

export interface UseNotificationsReturn {
  // Notifications
  notifications: Notification[];
  notificationFilters: NotificationFilters;
  unreadCount: number;
  setNotificationFilters: (filters: Partial<NotificationFilters>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  archiveNotification: (id: string) => void;
  deleteNotification: (id: string) => void;
  filteredNotifications: Notification[];
  
  // Activity Logs
  activityLogs: ActivityLog[];
  activityFilters: ActivityLogFilters;
  setActivityFilters: (filters: Partial<ActivityLogFilters>) => void;
  filteredLogs: ActivityLog[];
  exportLogs: () => Promise<void>;
  isExporting: boolean;
  
  // Common
  isLoading: boolean;
  activeTab: 'notifications' | 'activity';
  setActiveTab: (tab: 'notifications' | 'activity') => void;
  
  // Users for filtering
  users: typeof MOCK_USERS;
  modules: string[];
  actions: string[];
}

const DEFAULT_NOTIFICATION_FILTERS: NotificationFilters = {
  search: '',
  priority: 'all',
  status: 'all',
  type: '',
};

const DEFAULT_ACTIVITY_FILTERS: ActivityLogFilters = {
  search: '',
  users: [],
  actions: [],
  modules: [],
  severity: 'all',
};

const LOG_MODULES = ['audit', 'assets', 'allocation', 'booking', 'maintenance', 'organization', 'reports'];
const LOG_ACTIONS = ['CREATE_AUDIT', 'VERIFY_ASSET', 'FLAG_DISCREPANCY', 'CLOSE_AUDIT', 'ASSIGN_ROLE', 'REGISTER_ASSET', 'UPDATE_ASSET', 'APPROVE_TRANSFER', 'REJECT_MAINTENANCE', 'CANCEL_BOOKING', 'CREATE_BOOKING', 'SUBMIT_MAINTENANCE', 'APPROVE_MAINTENANCE'];

export function useNotifications(): UseNotificationsReturn {
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activityLogs] = useState<ActivityLog[]>(MOCK_ACTIVITY_LOGS);
  const [notificationFilters, setNotificationFiltersState] = useState<NotificationFilters>(DEFAULT_NOTIFICATION_FILTERS);
  const [activityFilters, setActivityFiltersState] = useState<ActivityLogFilters>(DEFAULT_ACTIVITY_FILTERS);
  const [activeTab, setActiveTab] = useState<'notifications' | 'activity'>('notifications');
  const [isLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const setNotificationFilters = useCallback((partial: Partial<NotificationFilters>) => {
    setNotificationFiltersState(prev => ({ ...prev, ...partial }));
  }, []);

  const setActivityFilters = useCallback((partial: Partial<ActivityLogFilters>) => {
    setActivityFiltersState(prev => ({ ...prev, ...partial }));
  }, []);

  const unreadCount = useMemo(() => notifications.filter(n => n.status === 'unread').length, [notifications]);

  const filteredNotifications = useMemo(() => {
    return notifications.filter(n => {
      if (notificationFilters.search) {
        const s = notificationFilters.search.toLowerCase();
        if (!n.title.toLowerCase().includes(s) && !n.message.toLowerCase().includes(s)) return false;
      }
      if (notificationFilters.priority !== 'all' && n.priority !== notificationFilters.priority) return false;
      if (notificationFilters.status !== 'all' && n.status !== notificationFilters.status) return false;
      if (notificationFilters.type && n.type !== notificationFilters.type) return false;
      if (notificationFilters.dateFrom && n.createdAt < notificationFilters.dateFrom) return false;
      if (notificationFilters.dateTo && n.createdAt > notificationFilters.dateTo) return false;
      return true;
    });
  }, [notifications, notificationFilters]);

  const filteredLogs = useMemo(() => {
    return activityLogs.filter(log => {
      if (activityFilters.search) {
        const s = activityFilters.search.toLowerCase();
        if (!log.description.toLowerCase().includes(s) && 
            !log.userName.toLowerCase().includes(s) &&
            !log.action.toLowerCase().includes(s)) return false;
      }
      if (activityFilters.severity !== 'all' && log.severity !== activityFilters.severity) return false;
      if (activityFilters.users.length > 0 && !activityFilters.users.includes(log.userId)) return false;
      if (activityFilters.actions.length > 0 && !activityFilters.actions.includes(log.action)) return false;
      if (activityFilters.modules.length > 0 && !activityFilters.modules.includes(log.module)) return false;
      if (activityFilters.dateFrom && log.timestamp < activityFilters.dateFrom) return false;
      if (activityFilters.dateTo && log.timestamp > activityFilters.dateTo) return false;
      return true;
    });
  }, [activityLogs, activityFilters]);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, status: 'read' as NotificationStatus, readAt: new Date().toISOString() } : n
    ));
  }, []);

  const markAllAsRead = useCallback(() => {
    const now = new Date().toISOString();
    setNotifications(prev => prev.map(n => 
      n.status === 'unread' ? { ...n, status: 'read' as NotificationStatus, readAt: now } : n
    ));
  }, []);

  const archiveNotification = useCallback((id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, status: 'archived' as NotificationStatus, archivedAt: new Date().toISOString() } : n
    ));
  }, []);

  const deleteNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const exportLogs = useCallback(async () => {
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 1000));
    setIsExporting(false);
  }, []);

  return {
    notifications,
    notificationFilters,
    unreadCount,
    setNotificationFilters,
    markAsRead,
    markAllAsRead,
    archiveNotification,
    deleteNotification,
    filteredNotifications,
    activityLogs,
    activityFilters,
    setActivityFilters,
    filteredLogs,
    exportLogs,
    isExporting,
    isLoading,
    activeTab,
    setActiveTab,
    users: MOCK_USERS,
    modules: LOG_MODULES,
    actions: LOG_ACTIONS,
  };
}
