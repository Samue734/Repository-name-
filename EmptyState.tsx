// ============================================
// ASSETFLOW ERP - EMPTY STATE COMPONENT
// ============================================

import React from 'react';
import { Search, FolderOpen, Inbox, Calendar, Wrench } from 'lucide-react';

interface EmptyStateProps {
  type?: 'search' | 'data' | 'notifications' | 'calendar' | 'maintenance' | 'custom';
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const iconMap = {
  search: Search,
  data: FolderOpen,
  notifications: Inbox,
  calendar: Calendar,
  maintenance: Wrench,
  custom: FolderOpen,
};

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'data',
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className = '',
}) => {
  const Icon = iconMap[type];
  const defaultTitles = {
    search: 'No results found',
    data: 'No data available',
    notifications: 'No notifications',
    calendar: 'No bookings scheduled',
    maintenance: 'No maintenance requests',
    custom: 'Nothing to show',
  };
  const defaultDescriptions = {
    search: 'Try adjusting your search or filters to find what you\'re looking for.',
    data: 'There are no items to display at the moment.',
    notifications: 'You\'re all caught up! No new notifications.',
    calendar: 'No bookings for this time period. Create a new booking to get started.',
    maintenance: 'No maintenance requests found. Assets are in good condition!',
    custom: 'Nothing to display here yet.',
  };

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
        {icon || <Icon className="w-8 h-8 text-gray-400" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {title || defaultTitles[type]}
      </h3>
      <p className="text-sm text-gray-500 max-w-sm mb-4">
        {description || defaultDescriptions[type]}
      </p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default React.memo(EmptyState);
