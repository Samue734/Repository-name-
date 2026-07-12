// ============================================================
// AssetFlow ERP — Main Application
// Screens 8 (Audit), 9 (Reports), 10 (Notifications)
// ============================================================

import { useState, useCallback } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { AuditScreen } from '@/screens/AuditScreen';
import { ReportsScreen } from '@/screens/ReportsScreen';
import { NotificationsScreen } from '@/screens/NotificationsScreen';
import { useNotifications } from '@/hooks/useNotifications';
import type { AppScreen } from '@/types';
import './App.css';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('audit');
  const notifications = useNotifications();

  const handleScreenChange = useCallback((screen: AppScreen) => {
    setCurrentScreen(screen);
    if (screen === 'notifications') {
      notifications.setActiveTab('notifications');
    }
  }, [notifications]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'audit':
        return <AuditScreen />;
      case 'reports':
        return <ReportsScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      default:
        return <AuditScreen />;
    }
  };

  return (
    <AppLayout
      currentScreen={currentScreen}
      onScreenChange={handleScreenChange}
      unreadCount={notifications.unreadCount}
    >
      {renderScreen()}
    </AppLayout>
  );
}
