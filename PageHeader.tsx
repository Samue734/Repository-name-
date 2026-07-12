// ============================================================
// AssetFlow ERP — Page Header with Breadcrumbs
// ============================================================

import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  label: string;
  active?: boolean;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  children?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, breadcrumbs, children, className }: PageHeaderProps) {
  return (
    <div className={cn('mb-6', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1.5 mb-2">
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3.5 h-3.5 text-slate-300" />}
              <span className={cn(
                'text-[12px] font-medium',
                crumb.active ? 'text-[#2563eb]' : 'text-slate-400'
              )}>
                {crumb.label}
              </span>
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-[22px] font-bold text-slate-800 leading-tight">{title}</h2>
          {subtitle && <p className="text-[13px] text-slate-400 mt-1">{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
