// ============================================================
// AssetFlow ERP — Constants & Configuration
// ============================================================

// ======== Status Color Maps ========
export const AUDIT_STATUS_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  draft:     { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400' },
  active:    { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  completed: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  locked:    { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
};

export const VERIFICATION_STATUS_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  pending:  { bg: 'bg-slate-100', text: 'text-slate-700', border: 'border-slate-200', dot: 'bg-slate-400' },
  verified: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-500' },
  missing:  { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  damaged:  { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
};

export const PRIORITY_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  high:   { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  low:    { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
};

export const NOTIFICATION_STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  unread:   { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  read:     { bg: 'bg-slate-50', text: 'text-slate-600', border: 'border-slate-200' },
  archived: { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
};

export const SEVERITY_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  warning:  { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  info:     { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  debug:    { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200', dot: 'bg-gray-400' },
};

export const ASSET_STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  available:         { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  allocated:         { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  reserved:          { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  under_maintenance: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  lost:              { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' },
  retired:           { bg: 'bg-gray-50', text: 'text-gray-600', border: 'border-gray-200' },
  disposed:          { bg: 'bg-gray-50', text: 'text-gray-500', border: 'border-gray-200' },
};

// ======== Status Labels ========
export const AUDIT_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  active: 'Active',
  completed: 'Completed',
  locked: 'Locked',
};

export const VERIFICATION_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  verified: 'Verified',
  missing: 'Missing',
  damaged: 'Damaged',
};

export const NOTIFICATION_TYPE_LABELS: Record<string, string> = {
  asset_assigned: 'Asset Assigned',
  booking_approved: 'Booking Approved',
  booking_cancelled: 'Booking Cancelled',
  booking_reminder: 'Booking Reminder',
  maintenance_approved: 'Maintenance Approved',
  maintenance_rejected: 'Maintenance Rejected',
  transfer_approved: 'Transfer Approved',
  transfer_rejected: 'Transfer Rejected',
  audit_discrepancy: 'Audit Discrepancy',
  overdue_return: 'Overdue Return',
};

export const SEVERITY_LABELS: Record<string, string> = {
  critical: 'Critical',
  warning: 'Warning',
  info: 'Info',
  debug: 'Debug',
};

// ======== Navigation ========
export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', shortcut: 'd' },
  { id: 'organization', label: 'Organization Setup', icon: 'Building2', shortcut: 'o' },
  { id: 'assets', label: 'Assets', icon: 'Package', shortcut: 'a' },
  { id: 'allocation', label: 'Allocation & Transfer', icon: 'ArrowLeftRight', shortcut: 't' },
  { id: 'booking', label: 'Resource Booking', icon: 'CalendarClock', shortcut: 'b' },
  { id: 'maintenance', label: 'Maintenance', icon: 'Wrench', shortcut: 'm' },
  { id: 'audit', label: 'Audit', icon: 'ClipboardCheck', shortcut: 'u', active: true },
  { id: 'reports', label: 'Reports & Analytics', icon: 'BarChart3', shortcut: 'r', active: true },
  { id: 'notifications', label: 'Notifications', icon: 'Bell', shortcut: 'n', active: true },
];

// ======== Chart Colors ========
export const CHART_COLORS = {
  primary: '#3b82f6',
  primaryLight: '#93bbfd',
  secondary: '#10b981',
  secondaryLight: '#86efac',
  warning: '#f59e0b',
  danger: '#ef4444',
  purple: '#8b5cf6',
  pink: '#ec4899',
  cyan: '#06b6d4',
  orange: '#f97316',
  gray: '#94a3b8',
  slate: '#64748b',
  chartPalette: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316', '#14b8a6', '#a855f7'],
};

// ======== Pagination ========
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// ======== Debounce ========
export const SEARCH_DEBOUNCE_MS = 300;

// ======== Date Formats ========
export const DATE_FORMAT = 'MMM d, yyyy';
export const DATETIME_FORMAT = 'MMM d, yyyy h:mm a';
export const SHORT_DATE_FORMAT = 'MMM d';
