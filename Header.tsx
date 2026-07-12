// ============================================================
// AssetFlow ERP — Top Header Bar
// ============================================================

import { cn } from '@/lib/utils';
import { Bell, Search, Menu, Sun, Moon, User } from 'lucide-react';
import { useState } from 'react';
import type { AppScreen } from '@/types';

interface HeaderProps {
  onToggleSidebar: () => void;
  sidebarCollapsed: boolean;
  unreadCount: number;
  onNavigateNotifications: () => void;
  currentScreen: AppScreen;
}

const SCREEN_TITLES: Record<AppScreen, string> = {
  audit: 'Asset Audit Management',
  reports: 'Reports & Analytics',
  notifications: 'Activity Logs & Notifications',
};

const SCREEN_SUBTITLES: Record<AppScreen, string> = {
  audit: 'Run structured audit cycles and verify assets',
  reports: 'Operational insights and analytics dashboard',
  notifications: 'Notification center and audit trail',
};

export function Header({ onToggleSidebar, unreadCount, onNavigateNotifications, currentScreen }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/80 flex items-center justify-between px-4 lg:px-6 shrink-0 z-10">
      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-[15px] font-semibold text-slate-800 leading-tight">
            {SCREEN_TITLES[currentScreen]}
          </h1>
          <p className="text-[12px] text-slate-400 hidden sm:block">
            {SCREEN_SUBTITLES[currentScreen]}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-2 gap-2 w-64">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-[13px] text-slate-600 placeholder:text-slate-400 w-full"
          />
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
          title="Toggle theme"
        >
          {darkMode ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
        </button>

        {/* Notification Bell */}
        <button
          onClick={onNavigateNotifications}
          className={cn(
            'relative p-2 rounded-lg transition-colors',
            currentScreen === 'notifications' ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-100 text-slate-500'
          )}
          title="Notifications"
        >
          <Bell className="w-[18px] h-[18px]" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* User Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-[#2563eb]/10 flex items-center justify-center">
            <User className="w-4 h-4 text-[#2563eb]" />
          </div>
          <div className="hidden lg:block">
            <p className="text-[12px] font-medium text-slate-700 leading-tight">Alex Chen</p>
            <p className="text-[11px] text-slate-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
