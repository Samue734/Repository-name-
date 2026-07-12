// ============================================================
// AssetFlow ERP — Navigation Sidebar
// ============================================================

import { cn } from '@/lib/utils';
import { SIDEBAR_ITEMS } from '@/lib/constants';
import {
  LayoutDashboard, Building2, Package, ArrowLeftRight,
  CalendarClock, Wrench, ClipboardCheck, BarChart3, Bell,
  ChevronLeft, ChevronRight, Hexagon,
} from 'lucide-react';
import type { AppScreen } from '@/types';
import { motion } from 'framer-motion';

const ICON_MAP: Record<string, React.ElementType> = {
  LayoutDashboard, Building2, Package, ArrowLeftRight,
  CalendarClock, Wrench, ClipboardCheck, BarChart3, Bell,
};

interface SidebarProps {
  currentScreen: AppScreen;
  onScreenChange: (screen: AppScreen) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export function Sidebar({ currentScreen, onScreenChange, collapsed, onToggleCollapse }: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 68 : 256 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={cn(
        'h-full bg-white border-r border-slate-200/80 flex flex-col relative',
        'shadow-[0_0_20px_rgba(0,0,0,0.04)] z-20'
      )}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-slate-100 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-[#2563eb] flex items-center justify-center shrink-0 shadow-sm">
            <Hexagon className="w-5 h-5 text-white" strokeWidth={2.2} />
          </div>
          <motion.span
            initial={false}
            animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
            transition={{ duration: 0.2 }}
            className="font-semibold text-[15px] text-slate-800 whitespace-nowrap overflow-hidden"
          >
            AssetFlow
          </motion.span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto overflow-x-hidden scrollbar-thin">
        <div className="space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const Icon = ICON_MAP[item.icon];
            const isActive = item.id === currentScreen;
            const isClickable = item.active;
            
            return (
              <button
                key={item.id}
                onClick={() => isClickable && onScreenChange(item.id as AppScreen)}
                disabled={!isClickable}
                className={cn(
                  'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium',
                  'transition-all duration-200 relative group',
                  isActive && isClickable
                    ? 'bg-[#2563eb]/10 text-[#2563eb]'
                    : isClickable
                    ? 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                    : 'text-slate-300 cursor-not-allowed'
                )}
                title={collapsed ? item.label : undefined}
              >
                {isActive && isClickable && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-[#2563eb] rounded-r-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className={cn('w-[18px] h-[18px] shrink-0', isActive && isClickable && 'stroke-[2.5]')} />
                <motion.span
                  initial={false}
                  animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
                  transition={{ duration: 0.2 }}
                  className="whitespace-nowrap overflow-hidden text-left"
                >
                  {item.label}
                </motion.span>
                {isActive && isClickable && !collapsed && (
                  <motion.div
                    layoutId="sidebar-dot"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-[#2563eb]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Collapse Toggle */}
      <div className="px-3 py-3 border-t border-slate-100 shrink-0">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-[12px] text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          <motion.span
            initial={false}
            animate={{ opacity: collapsed ? 0 : 1, width: collapsed ? 0 : 'auto' }}
            transition={{ duration: 0.2 }}
            className="whitespace-nowrap overflow-hidden"
          >
            Collapse
          </motion.span>
        </button>
      </div>
    </motion.aside>
  );
}
