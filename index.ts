// ============================================
// ASSETFLOW ERP - TYPES
// Screens 3, 6, 7 + Shared Types
// ============================================

// --- User & Role Types ---
export type UserRole = 'admin' | 'asset_manager' | 'department_head' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  departmentId: string | null;
  status: 'active' | 'inactive';
  avatar?: string;
  createdAt: string;
}

// --- Department Types (Screen 3) ---
export interface Department {
  id: string;
  name: string;
  headId: string | null;
  headName?: string;
  parentId: string | null;
  parentName?: string;
  status: 'active' | 'inactive';
  employeeCount?: number;
  assetCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentFormData {
  name: string;
  headId: string | null;
  parentId: string | null;
  status: 'active' | 'inactive';
}

// --- Asset Category Types (Screen 3) ---
export interface CustomField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean';
  required: boolean;
}

export interface AssetCategory {
  id: string;
  name: string;
  customFields: CustomField[];
  assetCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface AssetCategoryFormData {
  name: string;
  customFields: CustomField[];
}

// --- Employee Directory Types (Screen 3) ---
export interface Employee extends User {
  departmentName?: string;
  assetsHeld?: number;
  lastActive?: string;
}

export interface RolePromotionData {
  userId: string;
  role: 'department_head' | 'asset_manager';
  departmentId: string | null;
}

// --- Asset Types (Referenced) ---
export type AssetStatus = 'available' | 'allocated' | 'reserved' | 'under_maintenance' | 'lost' | 'retired' | 'disposed';
export type AssetCondition = 'excellent' | 'good' | 'fair' | 'poor' | 'damaged';

export interface Asset {
  id: string;
  name: string;
  assetTag: string;
  serialNumber?: string;
  categoryId: string;
  categoryName?: string;
  departmentId: string | null;
  departmentName?: string;
  status: AssetStatus;
  condition: AssetCondition;
  location: string;
  isBookable: boolean;
  acquisitionDate: string;
  acquisitionCost: number;
  assignedToId: string | null;
  assignedToName?: string;
  expectedReturnDate?: string;
  photos: string[];
  documents: string[];
  createdAt: string;
  updatedAt: string;
}

// --- Booking Types (Screen 6) ---
export type BookingStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  resourceId: string;
  resourceName: string;
  resourceCategory?: string;
  resourceLocation?: string;
  userId: string;
  userName: string;
  userDepartment?: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: BookingStatus;
  createdAt: string;
  cancelledAt?: string;
  cancelledReason?: string;
}

export interface BookingFormData {
  resourceId: string;
  startTime: string;
  endTime: string;
  purpose: string;
}

export interface BookingFilters {
  resourceId?: string;
  status?: BookingStatus[];
  dateFrom?: string;
  dateTo?: string;
  userId?: string;
}

export interface ResourceAvailability {
  resourceId: string;
  resourceName: string;
  location: string;
  category: string;
  existingBookings: {
    startTime: string;
    endTime: string;
    status: BookingStatus;
  }[];
}

// --- Maintenance Types (Screen 7) ---
export type MaintenanceStatus = 'pending' | 'approved' | 'rejected' | 'technician_assigned' | 'in_progress' | 'resolved';
export type MaintenancePriority = 'low' | 'medium' | 'high';

export interface MaintenanceRequest {
  id: string;
  assetId: string;
  assetName: string;
  assetTag: string;
  assetCategory?: string;
  assetLocation?: string;
  requestedBy: string;
  requestedByName: string;
  requestedByDepartment?: string;
  issueDescription: string;
  priority: MaintenancePriority;
  photos: string[];
  status: MaintenanceStatus;
  approvedBy: string | null;
  approvedByName?: string;
  approvedAt: string | null;
  technicianId: string | null;
  technicianName?: string;
  assignedAt: string | null;
  startedAt: string | null;
  resolvedAt: string | null;
  resolutionNotes: string | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface MaintenanceFormData {
  assetId: string;
  issueDescription: string;
  priority: MaintenancePriority;
  photos: string[];
}

export interface MaintenanceApprovalData {
  status: 'approved' | 'rejected';
  rejectionReason?: string;
}

export interface MaintenanceAssignData {
  technicianId: string;
}

export interface MaintenanceResolveData {
  resolutionNotes: string;
}

export interface MaintenanceFilters {
  status?: MaintenanceStatus[];
  priority?: MaintenancePriority[];
  assetId?: string;
  requestedBy?: string;
  dateFrom?: string;
  dateTo?: string;
}

// --- Notification Types (Referenced from Screen 10) ---
export type NotificationType = 
  | 'asset_assigned' 
  | 'booking_approved' 
  | 'booking_cancelled' 
  | 'booking_reminder'
  | 'maintenance_approved' 
  | 'maintenance_rejected'
  | 'transfer_approved' 
  | 'transfer_rejected'
  | 'audit_discrepancy'
  | 'overdue_return';

export type NotificationPriority = 'high' | 'medium' | 'low';
export type NotificationStatus = 'unread' | 'read' | 'archived';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  priority: NotificationPriority;
  status: NotificationStatus;
  entityId: string | null;
  entityType: string | null;
  createdAt: string;
  readAt: string | null;
  archivedAt: string | null;
}

// --- Activity Log Types (Referenced from Screen 10) ---
export type LogSeverity = 'critical' | 'warning' | 'info' | 'debug';

export interface ActivityLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: string;
  action: string;
  entityType: string;
  entityId: string | null;
  module: string;
  ipAddress: string | null;
  description: string;
  severity: LogSeverity;
  metadata: Record<string, unknown>;
}

// --- Screen-Specific State Types ---
export type OrganizationTab = 'departments' | 'categories' | 'employees';

export interface OrganizationFilters {
  search?: string;
  status?: 'active' | 'inactive' | 'all';
  departmentId?: string;
  role?: UserRole | 'all';
}

export type CalendarView = 'day' | 'week' | 'month';

// --- KPI Types ---
export interface DashboardKPI {
  title: string;
  value: number | string;
  trend?: number;
  trendLabel?: string;
  icon: string;
  color: string;
}

// --- API Response Types ---
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, string[]>;
}
