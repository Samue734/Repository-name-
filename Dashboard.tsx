import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import KPICards from '@/sections/KPICards';
import ReturnsSection from '@/sections/ReturnsSection';
import QuickActions from '@/sections/QuickActions';
import AssetAnalytics from '@/sections/AssetAnalytics';
import ActivityNotifications from '@/sections/ActivityNotifications';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-surface-grey">
      <Sidebar />
      <TopBar />
      
      {/* Main Content */}
      <main className="ml-[280px] pt-[72px] min-h-screen">
        <div className="p-8 space-y-6">
          {/* KPI Cards */}
          <KPICards />
          
          {/* Overdue & Upcoming Returns */}
          <ReturnsSection />
          
          {/* Quick Actions */}
          <QuickActions />
          
          {/* Asset Analytics */}
          <AssetAnalytics />
          
          {/* Activity & Notifications */}
          <ActivityNotifications />
        </div>
      </main>
    </div>
  );
}
