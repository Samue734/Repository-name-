// ============================================================
// AssetFlow ERP — Notification List
// ============================================================

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { Notification } from '@/types';
import { StatusChip } from '@/components/shared/StatusChip';
import {
  Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Search, Archive, Trash2, MailOpen, Mail,
  AlertTriangle, Info, CheckCircle2, Clock,
} from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';

interface NotificationListProps {
  notifications: Notification[];
  filters: { search: string; priority: string; status: string; type: string };
  onFilterChange: (filters: Record<string, string>) => void;
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

function getNotificationIcon(type: string) {
  if (type.includes('discrepancy') || type.includes('overdue') || type.includes('rejected')) {
    return <AlertTriangle className="w-4 h-4 text-amber-500" />;
  }
  if (type.includes('approved') || type.includes('assigned')) {
    return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
  }
  return <Info className="w-4 h-4 text-blue-500" />;
}

function timeAgo(date: string): string {
  const now = new Date();
  const d = new Date(date);
  const diff = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function NotificationList({
  notifications, filters, onFilterChange,
  onMarkRead, onMarkAllRead, onArchive, onDelete,
}: NotificationListProps) {
  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              placeholder="Search notifications..."
              className="pl-9 text-[12px] h-9"
            />
          </div>
          <Select value={filters.priority} onValueChange={(v) => onFilterChange({ priority: v })}>
            <SelectTrigger className="w-[100px] h-9 text-[12px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.status} onValueChange={(v) => onFilterChange({ status: v })}>
            <SelectTrigger className="w-[100px] h-9 text-[12px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="unread">Unread</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onMarkAllRead}
          className="gap-1.5 text-[11px] font-medium border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          <MailOpen className="w-3.5 h-3.5" />
          Mark All Read
        </Button>
      </div>

      {/* Notification Items */}
      {notifications.length === 0 ? (
        <EmptyState
          icon="bell"
          title="No Notifications"
          description="You're all caught up! No notifications match your filters."
        />
      ) : (
        <div className="space-y-2">
          {notifications.map((n, i) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: i * 0.03 }}
              className={cn(
                'group flex items-start gap-3 p-4 rounded-xl border transition-all duration-200',
                n.status === 'unread'
                  ? 'bg-blue-50/40 border-blue-100 hover:bg-blue-50/60'
                  : n.status === 'archived'
                  ? 'bg-slate-50/40 border-slate-100 opacity-70'
                  : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
              )}
            >
              {/* Icon */}
              <div className="w-9 h-9 rounded-lg bg-white border border-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                {getNotificationIcon(n.type)}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className={cn(
                    'text-[13px] leading-snug',
                    n.status === 'unread' ? 'font-semibold text-slate-800' : 'font-medium text-slate-600'
                  )}>
                    {n.title}
                  </h4>
                  <StatusChip status={n.priority} variant="priority" size="sm" />
                  {n.status === 'unread' && (
                    <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                  )}
                </div>
                <p className="text-[12px] text-slate-500 leading-relaxed">{n.message}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-[11px] text-slate-400">
                    <Clock className="w-3 h-3" />
                    {timeAgo(n.createdAt)}
                  </span>
                  <StatusChip status={n.type} variant="notification" size="sm" label={n.type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                {n.status === 'unread' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onMarkRead(n.id)}
                    className="h-7 w-7 p-0 text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                    title="Mark as read"
                  >
                    <Mail className="w-3.5 h-3.5" />
                  </Button>
                )}
                {n.status !== 'archived' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onArchive(n.id)}
                    className="h-7 w-7 p-0 text-slate-400 hover:text-amber-600 hover:bg-amber-50"
                    title="Archive"
                  >
                    <Archive className="w-3.5 h-3.5" />
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(n.id)}
                  className="h-7 w-7 p-0 text-slate-400 hover:text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
