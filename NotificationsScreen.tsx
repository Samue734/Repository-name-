// ============================================================
// AssetFlow ERP — Screen 10: Activity Logs & Notifications
// ============================================================

import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { NotificationList } from '@/components/notifications/NotificationList';
import { ActivityLogTable } from '@/components/notifications/ActivityLogTable';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useNotifications } from '@/hooks/useNotifications';
import {
  Bell, ClipboardList, MailOpen, Shield,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function NotificationsScreen() {
  const notifications = useNotifications();

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Activity Logs & Notifications"
        subtitle="Stay informed with real-time notifications and complete audit trail"
      >
        {notifications.activeTab === 'notifications' && notifications.notifications.filter(n => n.status === 'unread').length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={notifications.markAllAsRead}
            className="gap-2 text-[12px] font-medium border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <MailOpen className="w-3.5 h-3.5" />
            Mark All Read
          </Button>
        )}
      </PageHeader>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0 }}
          className="bg-white rounded-xl border border-slate-200/80 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Bell className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-[20px] font-bold text-slate-800">{notifications.notifications.length}</p>
          <p className="text-[11px] text-slate-400 font-medium">Total Notifications</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="bg-white rounded-xl border border-slate-200/80 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center">
              <Bell className="w-4 h-4 text-red-500" />
            </div>
          </div>
          <p className="text-[20px] font-bold text-red-600">{notifications.notifications.filter(n => n.status === 'unread').length}</p>
          <p className="text-[11px] text-slate-400 font-medium">Unread</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl border border-slate-200/80 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <ClipboardList className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <p className="text-[20px] font-bold text-slate-800">{notifications.activityLogs.length}</p>
          <p className="text-[11px] text-slate-400 font-medium">Activity Logs</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="bg-white rounded-xl border border-slate-200/80 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center">
              <Shield className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <p className="text-[20px] font-bold text-slate-800">
            {notifications.activityLogs.filter(l => l.severity === 'critical' || l.severity === 'warning').length}
          </p>
          <p className="text-[11px] text-slate-400 font-medium">Alerts & Warnings</p>
        </motion.div>
      </div>

      {/* Tabs */}
      <Tabs value={notifications.activeTab} onValueChange={(v) => notifications.setActiveTab(v as 'notifications' | 'activity')}>
        <TabsList className="bg-white border border-slate-200/80 p-1 h-10">
          <TabsTrigger
            value="notifications"
            className={cn(
              'text-[12px] font-medium px-4 py-2 rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none',
              'flex items-center gap-2'
            )}
          >
            <Bell className="w-3.5 h-3.5" />
            Notifications
            {notifications.unreadCount > 0 && (
              <span className="ml-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {notifications.unreadCount}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="activity"
            className={cn(
              'text-[12px] font-medium px-4 py-2 rounded-lg data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-none',
              'flex items-center gap-2'
            )}
          >
            <ClipboardList className="w-3.5 h-3.5" />
            Activity Logs
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <div className="mt-4">
          {notifications.activeTab === 'notifications' ? (
            <NotificationList
              notifications={notifications.filteredNotifications}
              filters={notifications.notificationFilters as { search: string; priority: string; status: string; type: string }}
              onFilterChange={notifications.setNotificationFilters as (filters: Record<string, string>) => void}
              onMarkRead={notifications.markAsRead}
              onMarkAllRead={notifications.markAllAsRead}
              onArchive={notifications.archiveNotification}
              onDelete={notifications.deleteNotification}
            />
          ) : (
            <ActivityLogTable
              logs={notifications.filteredLogs}
              filters={notifications.activityFilters}
              onFilterChange={notifications.setActivityFilters}
              modules={notifications.modules}
              onExport={notifications.exportLogs}
              isExporting={notifications.isExporting}
            />
          )}
        </div>
      </Tabs>
    </div>
  );
}
