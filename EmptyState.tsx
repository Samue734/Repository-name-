// ============================================================
// AssetFlow ERP — Empty State Illustration
// ============================================================

import { cn } from '@/lib/utils';
import { Search, ClipboardCheck, BarChart3, Bell, Inbox } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  search: Search,
  clipboard: ClipboardCheck,
  chart: BarChart3,
  bell: Bell,
  inbox: Inbox,
};

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon = 'inbox', title, description, children, className }: EmptyStateProps) {
  const Icon = ICON_MAP[icon] || Inbox;

  return (
    <div className={cn('flex flex-col items-center justify-center py-16 px-4 text-center', className)}>
      <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-slate-300" />
      </div>
      <h3 className="text-[15px] font-semibold text-slate-700 mb-1">{title}</h3>
      <p className="text-[13px] text-slate-400 max-w-sm mb-4">{description}</p>
      {children}
    </div>
  );
}
