import { recentActivity, notifications } from '@/data/dashboardData';
import { Package, Calendar, ArrowLeftRight, Wrench } from 'lucide-react';

const notificationIcons: Record<string, React.ElementType> = {
  Package,
  Calendar,
  ArrowLeftRight,
  Wrench,
};

export default function ActivityNotifications() {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Recent Activity */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h3 text-navy-900">Recent Activity</h2>
          <button className="text-caption text-royal hover:text-royal-dark font-medium transition-colors">
            View All
          </button>
        </div>

        <div className="space-y-0">
          {recentActivity.map((item, index) => (
            <div
              key={item.id}
              className="relative pl-6 pb-6 last:pb-0"
            >
              {/* Timeline line */}
              {index < recentActivity.length - 1 && (
                <div className="absolute left-[3px] top-2 bottom-0 w-[2px] bg-border-light" />
              )}
              
              {/* Timeline dot */}
              <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-royal" />
              
              {/* Content */}
              <p className="text-sm text-navy-900">{item.text}</p>
              <p className="text-caption text-navy-600 mt-0.5">{item.timestamp}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <h2 className="text-h3 text-navy-900">Notifications</h2>
            {unreadCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-danger text-white text-xs font-medium">
                {unreadCount}
              </span>
            )}
          </div>
          <button className="text-caption text-royal hover:text-royal-dark font-medium transition-colors">
            Mark All Read
          </button>
        </div>

        <div className="space-y-0">
          {notifications.map((item) => {
            const Icon = notificationIcons[item.icon] || Package;
            return (
              <div
                key={item.id}
                className="flex items-start gap-3 py-3 border-b border-border-light last:border-b-0"
              >
                {/* Unread indicator */}
                {!item.read && (
                  <div className="w-1 h-1 rounded-full bg-royal mt-2.5 flex-shrink-0" />
                )}
                {item.read && <div className="w-1 h-1 rounded-full bg-transparent mt-2.5 flex-shrink-0" />}
                
                {/* Icon */}
                <div className="w-9 h-9 rounded-lg bg-surface-grey flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-navy-600" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${item.read ? 'text-navy-700' : 'text-navy-900 font-medium'}`}>
                    {item.title}
                  </p>
                  <p className="text-caption text-navy-600 mt-0.5">{item.message}</p>
                </div>
                
                {/* Time */}
                <span className="text-caption text-navy-500 flex-shrink-0">{item.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
