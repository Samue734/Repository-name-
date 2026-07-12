// ============================================================
// AssetFlow ERP — Status Chip / Badge
// ============================================================

import { cn } from '@/lib/utils';
import {
  AUDIT_STATUS_COLORS, VERIFICATION_STATUS_COLORS, PRIORITY_COLORS,
  NOTIFICATION_STATUS_COLORS, SEVERITY_COLORS, ASSET_STATUS_COLORS,
  AUDIT_STATUS_LABELS, VERIFICATION_STATUS_LABELS, NOTIFICATION_TYPE_LABELS, SEVERITY_LABELS,
} from '@/lib/constants';

type ChipVariant = 'audit' | 'verification' | 'priority' | 'notification' | 'severity' | 'asset';

interface StatusChipProps {
  status: string;
  variant: ChipVariant;
  size?: 'sm' | 'md';
  label?: string;
  className?: string;
}

const COLOR_MAPS: Record<ChipVariant, Record<string, { bg: string; text: string; border: string; dot?: string }>> = {
  audit: AUDIT_STATUS_COLORS,
  verification: VERIFICATION_STATUS_COLORS,
  priority: PRIORITY_COLORS,
  notification: NOTIFICATION_STATUS_COLORS,
  severity: SEVERITY_COLORS,
  asset: ASSET_STATUS_COLORS,
};

const LABEL_MAPS: Record<string, Record<string, string>> = {
  audit: AUDIT_STATUS_LABELS,
  verification: VERIFICATION_STATUS_LABELS,
  notification: NOTIFICATION_TYPE_LABELS,
  severity: SEVERITY_LABELS,
};

export function StatusChip({ status, variant, size = 'sm', label, className }: StatusChipProps) {
  const colors = COLOR_MAPS[variant]?.[status] || { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400' };
  const labels = LABEL_MAPS[variant];
  const displayLabel = label || (labels?.[status] || status.charAt(0).toUpperCase() + status.slice(1));

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 font-medium rounded-full border',
      size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-[12px]',
      colors.bg, colors.text, colors.border,
      className
    )}>
      {colors.dot && (
        <span className={cn('rounded-full', size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2', colors.dot)} />
      )}
      {displayLabel}
    </span>
  );
}
