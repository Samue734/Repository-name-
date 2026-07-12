import { useLocation, useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import type { UserRole } from '@/types';
import {
  LayoutDashboard,
  Building2,
  Package,
  ArrowLeftRight,
  CalendarDays,
  Wrench,
  ClipboardCheck,
  BarChart3,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ElementType;
  href: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard', roles: ['admin', 'asset_manager', 'department_head', 'employee'] },
  { label: 'Organization Setup', icon: Building2, href: '/organization', roles: ['admin'] },
  { label: 'Assets', icon: Package, href: '/assets', roles: ['admin', 'asset_manager', 'department_head'] },
  { label: 'Allocation & Transfer', icon: ArrowLeftRight, href: '/allocation', roles: ['admin', 'asset_manager', 'department_head'] },
  { label: 'Resource Booking', icon: CalendarDays, href: '/booking', roles: ['admin', 'asset_manager', 'department_head', 'employee'] },
  { label: 'Maintenance', icon: Wrench, href: '/maintenance', roles: ['admin', 'asset_manager', 'department_head', 'employee'] },
  { label: 'Audit', icon: ClipboardCheck, href: '/audit', roles: ['admin', 'asset_manager'] },
  { label: 'Reports & Analytics', icon: BarChart3, href: '/reports', roles: ['admin', 'asset_manager', 'department_head'] },
  { label: 'Notifications', icon: Bell, href: '/notifications', roles: ['admin', 'asset_manager', 'department_head', 'employee'] },
  { label: 'Settings', icon: Settings, href: '/settings', roles: ['admin', 'asset_manager', 'department_head', 'employee'] },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const filteredNavItems = navItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  return (
    <aside className="fixed left-0 top-0 h-screen w-[280px] bg-navy-800 flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 pt-6 pb-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-royal flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="2" width="9" height="9" rx="2" stroke="white" strokeWidth="2" fill="none"/>
            <rect x="13" y="2" width="9" height="9" rx="2" stroke="white" strokeWidth="2" fill="none"/>
            <rect x="2" y="13" width="9" height="9" rx="2" stroke="white" strokeWidth="2" fill="none"/>
            <rect x="13" y="13" width="9" height="9" rx="2" stroke="white" strokeWidth="2" fill="rgba(255,255,255,0.3)"/>
          </svg>
        </div>
        <span className="text-white font-semibold text-lg tracking-tight">AssetFlow</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <ul className="space-y-1">
          {filteredNavItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            
            return (
              <li key={item.href}>
                <button
                  onClick={() => navigate(item.href)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-[rgba(30,106,248,0.15)] text-royal' 
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                    }
                  `}
                >
                  <Icon size={20} className={isActive ? 'text-royal' : 'text-white/40'} />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Section */}
      <div className="px-3 py-4 border-t border-white/10">
        {user && (
          <div className="flex items-center gap-3 px-3 py-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-royal/20 border border-royal/30 flex items-center justify-center text-royal text-sm font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{user.name}</p>
              <p className="text-white/40 text-xs capitalize">{user.role.replace('_', ' ')}</p>
            </div>
          </div>
        )}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <LogOut size={20} className="text-white/40" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
