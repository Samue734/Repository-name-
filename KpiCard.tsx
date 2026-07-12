// ============================================================
// AssetFlow ERP — KPI Metric Card
// ============================================================

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import {
  Package, CheckCircle2, Users, Wrench, AlertTriangle,
  Archive, BarChart3, Clock, TrendingUp, TrendingDown, Minus,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Package, CheckCircle2, Users, Wrench, AlertTriangle,
  Archive, BarChart3, Clock,
};

const COLOR_MAP: Record<string, { bg: string; icon: string; ring: string }> = {
  blue:   { bg: 'bg-blue-50', icon: 'text-blue-600', ring: 'ring-blue-100' },
  emerald:{ bg: 'bg-emerald-50', icon: 'text-emerald-600', ring: 'ring-emerald-100' },
  amber:  { bg: 'bg-amber-50', icon: 'text-amber-600', ring: 'ring-amber-100' },
  orange: { bg: 'bg-orange-50', icon: 'text-orange-600', ring: 'ring-orange-100' },
  slate:  { bg: 'bg-slate-100', icon: 'text-slate-600', ring: 'ring-slate-100' },
  purple: { bg: 'bg-purple-50', icon: 'text-purple-600', ring: 'ring-purple-100' },
  cyan:   { bg: 'bg-cyan-50', icon: 'text-cyan-600', ring: 'ring-cyan-100' },
  red:    { bg: 'bg-red-50', icon: 'text-red-600', ring: 'ring-red-100' },
};

interface KpiCardProps {
  title: string;
  value: number | string;
  trend?: number;
  trendDirection?: 'up' | 'down' | 'neutral';
  icon: string;
  color: string;
  format?: 'number' | 'percentage' | 'currency' | 'days';
  index?: number;
}

function formatValue(value: number | string, format?: string): string {
  if (typeof value === 'string') return value;
  switch (format) {
    case 'currency': return `$${value.toLocaleString()}`;
    case 'percentage': return `${value}%`;
    case 'days': return `${value} yrs`;
    default: return value.toLocaleString();
  }
}

export function KpiCard({ title, value, trend, trendDirection, icon, color, format, index = 0 }: KpiCardProps) {
  const colors = COLOR_MAP[color] || COLOR_MAP.blue;
  const Icon = ICON_MAP[icon] || Package;
  const TrendIcon = trendDirection === 'up' ? TrendingUp : trendDirection === 'down' ? TrendingDown : Minus;
  const trendColor = trendDirection === 'up' ? 'text-emerald-600' : trendDirection === 'down' ? 'text-red-500' : 'text-slate-400';
  const trendBg = trendDirection === 'up' ? 'bg-emerald-50' : trendDirection === 'down' ? 'bg-red-50' : 'bg-slate-50';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
      className="relative bg-white rounded-xl border border-slate-200/80 p-5 hover:shadow-md hover:shadow-slate-200/50 transition-all duration-300 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center ring-1', colors.bg, colors.ring)}>
          <Icon className={cn('w-5 h-5', colors.icon)} />
        </div>
        {trend !== undefined && (
          <div className={cn('flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-medium', trendBg, trendColor)}>
            <TrendIcon className="w-3 h-3" />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <p className="text-[24px] font-bold text-slate-800 leading-tight mb-1">{formatValue(value, format)}</p>
      <p className="text-[12px] text-slate-400 font-medium">{title}</p>
    </motion.div>
  );
}
