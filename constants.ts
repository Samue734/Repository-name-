// ============================================
// ASSETFLOW ERP - CONSTANTS
// ============================================

// --- Role Labels ---
export const ROLE_LABELS: Record<string, string> = {
  admin: 'Admin',
  asset_manager: 'Asset Manager',
  department_head: 'Department Head',
  employee: 'Employee',
};

export const ROLE_OPTIONS = [
  { value: 'employee', label: 'Employee' },
  { value: 'department_head', label: 'Department Head' },
  { value: 'asset_manager', label: 'Asset Manager' },
  { value: 'admin', label: 'Admin' },
] as const;

// --- Status Configurations ---
export const DEPARTMENT_STATUS_OPTIONS = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'inactive', label: 'Inactive', color: 'gray' },
] as const;

export const USER_STATUS_OPTIONS = [
  { value: 'active', label: 'Active', color: 'green' },
  { value: 'inactive', label: 'Inactive', color: 'gray' },
] as const;

export const ASSET_STATUS_OPTIONS = [
  { value: 'available', label: 'Available', color: 'green' },
  { value: 'allocated', label: 'Allocated', color: 'blue' },
  { value: 'reserved', label: 'Reserved', color: 'purple' },
  { value: 'under_maintenance', label: 'Under Maintenance', color: 'amber' },
  { value: 'lost', label: 'Lost', color: 'red' },
  { value: 'retired', label: 'Retired', color: 'gray' },
  { value: 'disposed', label: 'Disposed', color: 'gray' },
] as const;

export const BOOKING_STATUS_OPTIONS = [
  { value: 'upcoming', label: 'Upcoming', color: 'blue' },
  { value: 'ongoing', label: 'Ongoing', color: 'green' },
  { value: 'completed', label: 'Completed', color: 'gray' },
  { value: 'cancelled', label: 'Cancelled', color: 'red' },
] as const;

export const MAINTENANCE_STATUS_OPTIONS = [
  { value: 'pending', label: 'Pending', color: 'amber' },
  { value: 'approved', label: 'Approved', color: 'blue' },
  { value: 'rejected', label: 'Rejected', color: 'red' },
  { value: 'technician_assigned', label: 'Technician Assigned', color: 'purple' },
  { value: 'in_progress', label: 'In Progress', color: 'orange' },
  { value: 'resolved', label: 'Resolved', color: 'green' },
] as const;

export const MAINTENANCE_PRIORITY_OPTIONS = [
  { value: 'low', label: 'Low', color: 'blue' },
  { value: 'medium', label: 'Medium', color: 'amber' },
  { value: 'high', label: 'High', color: 'red' },
] as const;

export const NOTIFICATION_PRIORITY_OPTIONS = [
  { value: 'high', label: 'High', color: 'red' },
  { value: 'medium', label: 'Medium', color: 'amber' },
  { value: 'low', label: 'Low', color: 'blue' },
] as const;

export const LOG_SEVERITY_OPTIONS = [
  { value: 'critical', label: 'Critical', color: 'red' },
  { value: 'warning', label: 'Warning', color: 'amber' },
  { value: 'info', label: 'Info', color: 'blue' },
  { value: 'debug', label: 'Debug', color: 'gray' },
] as const;

// --- Kanban Column Config (Screen 7) ---
export const MAINTENANCE_KANBAN_COLUMNS = [
  { id: 'pending', label: 'Pending', description: 'Awaiting approval' },
  { id: 'approved', label: 'Approved', description: 'Awaiting technician' },
  { id: 'technician_assigned', label: 'Technician Assigned', description: 'Ready to start' },
  { id: 'in_progress', label: 'In Progress', description: 'Repair underway' },
  { id: 'resolved', label: 'Resolved', description: 'Completed' },
] as const;

// --- Color Maps for UI ---
export const STATUS_COLORS: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  active: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
  inactive: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-500' },
  available: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
  allocated: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  reserved: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-500' },
  under_maintenance: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  lost: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  retired: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-500' },
  disposed: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-500' },
  upcoming: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  ongoing: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
  completed: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-500' },
  cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  approved: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  rejected: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  technician_assigned: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', dot: 'bg-purple-500' },
  in_progress: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', dot: 'bg-orange-500' },
  resolved: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
  low: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  medium: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  high: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  critical: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' },
  warning: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', dot: 'bg-amber-500' },
  info: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', dot: 'bg-blue-500' },
  debug: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', dot: 'bg-gray-500' },
};

// --- Screen Metadata ---
export const SCREEN_TITLES = {
  organization: 'Organization Setup',
  booking: 'Resource Booking',
  maintenance: 'Maintenance Management',
  audit: 'Asset Audit',
  reports: 'Reports & Analytics',
  notifications: 'Activity Logs & Notifications',
  dashboard: 'Dashboard',
  assets: 'Asset Registration',
  allocation: 'Asset Allocation & Transfer',
};

// --- Sidebar Navigation ---
export const SIDEBAR_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', path: '/dashboard' },
  { id: 'organization', label: 'Organization Setup', icon: 'Building2', path: '/organization', adminOnly: true },
  { id: 'assets', label: 'Assets', icon: 'Package', path: '/assets' },
  { id: 'allocation', label: 'Allocation & Transfer', icon: 'ArrowLeftRight', path: '/allocation' },
  { id: 'booking', label: 'Resource Booking', icon: 'Calendar', path: '/booking' },
  { id: 'maintenance', label: 'Maintenance', icon: 'Wrench', path: '/maintenance' },
  { id: 'audit', label: 'Audit', icon: 'ClipboardCheck', path: '/audit' },
  { id: 'reports', label: 'Reports', icon: 'BarChart3', path: '/reports' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell', path: '/notifications' },
];

// --- Pagination ---
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

// --- Date Formats ---
export const DATE_FORMAT = 'MMM dd, yyyy';
export const DATE_TIME_FORMAT = 'MMM dd, yyyy HH:mm';
export const TIME_FORMAT = 'HH:mm';

// --- Booking ---
export const BOOKING_REMINDER_MINUTES = 15;
export const MIN_BOOKING_DURATION_MINUTES = 30;
export const MAX_BOOKING_DURATION_HOURS = 8;

// --- Maintenance ---
export const MAINTENANCE_AUTO_APPROVE_ROLES = ['admin', 'asset_manager'];

// --- Asset Tag Prefix ---
export const ASSET_TAG_PREFIX = 'AF-';
