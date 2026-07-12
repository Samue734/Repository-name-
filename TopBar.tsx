import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Search, Bell, Settings } from 'lucide-react';

export default function TopBar() {
  const { user } = useAuth();
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="fixed top-0 left-[280px] right-0 h-[72px] bg-white border-b border-border-light z-40 flex items-center justify-between px-8">
      {/* Left: Page Title */}
      <div>
        <h1 className="text-h2 text-navy-900">Dashboard</h1>
        <p className="text-caption text-navy-600 mt-0.5">Real-time operational overview</p>
      </div>

      {/* Center: Search */}
      <div className="relative w-[400px]">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-600" />
        <input
          type="text"
          placeholder="Search assets, employees, bookings..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full h-11 pl-10 pr-4 bg-surface-grey rounded-lg border border-transparent text-sm text-navy-900 placeholder:text-navy-600 focus:outline-none focus:border-royal focus:ring-3 focus:ring-royal/10 transition-all duration-200"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        <button className="relative p-2 rounded-lg hover:bg-surface-grey transition-colors">
          <Bell size={20} className="text-navy-700" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-danger rounded-full" />
        </button>
        
        <button className="p-2 rounded-lg hover:bg-surface-grey transition-colors">
          <Settings size={20} className="text-navy-700" />
        </button>

        {user && (
          <div className="flex items-center gap-3 pl-4 border-l border-border-light">
            <div className="w-9 h-9 rounded-full bg-royal/10 border border-royal/20 flex items-center justify-center text-royal text-sm font-semibold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-navy-900">{user.name}</p>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-royal capitalize">
                {user.role.replace('_', ' ')}
              </span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
