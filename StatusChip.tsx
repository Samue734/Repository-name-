// ============================================
// ASSETFLOW ERP - STATUS CHIP COMPONENT
// Reusable colored status badge
// ============================================

import React from 'react';
import { STATUS_COLORS } from '../../lib/constants';

interface StatusChipProps {
  status: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'outline' | 'dot';
  className?: string;
}

export const StatusChip: React.FC<StatusChipProps> = ({ 
  status, 
  label,
  size = 'md',
  variant = 'default',
  className = '' 
}) => {
  const colors = STATUS_COLORS[status.toLowerCase()] || STATUS_COLORS['info'];
  const displayLabel = label || status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5',
  };

  if (variant === 'dot') {
    return (
      <span className={`inline-flex items-center gap-1.5 ${className}`}>
        <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
        <span className={`${colors.text} font-medium ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
          {displayLabel}
        </span>
      </span>
    );
  }

  if (variant === 'outline') {
    return (
      <span className={`
        inline-flex items-center rounded-full border font-medium
        ${colors.border} ${colors.text} ${colors.bg}
        ${sizeClasses[size]}
        ${className}
      `}>
        {displayLabel}
      </span>
    );
  }

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium
      ${colors.bg} ${colors.text}
      ${sizeClasses[size]}
      ${className}
    `}>
      {variant === 'default' && (
        <span className={`w-1.5 h-1.5 rounded-full ${colors.dot} mr-1.5`} />
      )}
      {displayLabel}
    </span>
  );
};

export default React.memo(StatusChip);
