// ============================================================
// AssetFlow ERP — Application Layout
// ============================================================

import { useState, useCallback } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { motion, AnimatePresence } from 'framer-motion';
import type { AppScreen } from '@/types';
import type { LucideIcon } from 'lucide-react';

export type ScreenConfig = {
  id: AppScreen;
  label: string;
  icon: LucideIcon;
};

interface AppLayoutProps {
  currentScreen: AppScreen;
  onScreenChange: (screen: AppScreen) => void;
  unreadCount: number;
  children: React.ReactNode;
}

export function AppLayout({ currentScreen, onScreenChange, unreadCount, children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);

  return (
    <div className="flex h-screen w-full bg-[#f8f9fc] overflow-hidden">
      <Sidebar
        currentScreen={currentScreen}
        onScreenChange={onScreenChange}
        collapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          onToggleSidebar={toggleSidebar}
          sidebarCollapsed={sidebarCollapsed}
          unreadCount={unreadCount}
          onNavigateNotifications={() => onScreenChange('notifications')}
          currentScreen={currentScreen}
        />
        
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScreen}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="h-full"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
