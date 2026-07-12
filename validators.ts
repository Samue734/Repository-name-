// ============================================
// ASSETFLOW ERP - ZOD VALIDATORS
// Screens 3, 6, 7
// ============================================

import { z } from 'zod';

// --- Screen 3: Organization Validators ---

export const departmentSchema = z.object({
  name: z.string().min(2, "Department name must be at least 2 characters").max(200, "Max 200 characters"),
  headId: z.string().uuid().nullable().optional(),
  parentId: z.string().uuid().nullable().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export type DepartmentFormSchema = z.infer<typeof departmentSchema>;

export const assetCategorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters").max(200, "Max 200 characters"),
  customFields: z.array(
    z.object({
      id: z.string().uuid().optional(),
      name: z.string().min(1, "Field name required").max(100),
      type: z.enum(['text', 'number', 'date', 'boolean']),
      required: z.boolean().default(false),
    })
  ).max(10, "Max 10 custom fields").default([]),
});

export type AssetCategoryFormSchema = z.infer<typeof assetCategorySchema>;

export const rolePromotionSchema = z.object({
  userId: z.string().uuid("Invalid user"),
  role: z.enum(['department_head', 'asset_manager'], {
    required_error: "Select a role to promote to",
  }),
  departmentId: z.string().uuid().nullable().optional(),
}).refine((data) => {
  if (data.role === 'department_head' && !data.departmentId) {
    return false;
  }
  return true;
}, {
  message: "Department Head requires a department assignment",
  path: ["departmentId"],
});

export type RolePromotionSchema = z.infer<typeof rolePromotionSchema>;

export const employeeUpdateSchema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email("Invalid email address"),
  departmentId: z.string().uuid().nullable().optional(),
  status: z.enum(['active', 'inactive']).default('active'),
});

export type EmployeeUpdateSchema = z.infer<typeof employeeUpdateSchema>;

// --- Screen 6: Booking Validators ---

export const bookingSchema = z.object({
  resourceId: z.string().uuid("Please select a resource"),
  startTime: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && date > new Date();
  }, { message: "Start time must be in the future" }),
  endTime: z.string().refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime());
  }, { message: "Invalid end time" }),
  purpose: z.string().max(500, "Max 500 characters").optional(),
}).refine((data) => {
  const start = new Date(data.startTime);
  const end = new Date(data.endTime);
  return end > start;
}, {
  message: "End time must be after start time",
  path: ["endTime"],
}).refine((data) => {
  const start = new Date(data.startTime);
  const end = new Date(data.endTime);
  const diffMs = end.getTime() - start.getTime();
  const diffMinutes = diffMs / (1000 * 60);
  return diffMinutes >= 30;
}, {
  message: "Booking must be at least 30 minutes",
  path: ["endTime"],
}).refine((data) => {
  const start = new Date(data.startTime);
  const end = new Date(data.endTime);
  const diffMs = end.getTime() - start.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);
  return diffHours <= 8;
}, {
  message: "Booking cannot exceed 8 hours",
  path: ["endTime"],
});

export type BookingFormSchema = z.infer<typeof bookingSchema>;

export const bookingRescheduleSchema = z.object({
  startTime: z.string(),
  endTime: z.string(),
}).refine((data) => {
  return new Date(data.endTime) > new Date(data.startTime);
}, {
  message: "End time must be after start time",
  path: ["endTime"],
});

export type BookingRescheduleSchema = z.infer<typeof bookingRescheduleSchema>;

export const bookingCancelSchema = z.object({
  reason: z.string().min(5, "Please provide a reason (min 5 chars)").max(500),
});

export type BookingCancelSchema = z.infer<typeof bookingCancelSchema>;

// --- Screen 7: Maintenance Validators ---

export const maintenanceRequestSchema = z.object({
  assetId: z.string().uuid("Please select an asset"),
  issueDescription: z.string().min(10, "Description must be at least 10 characters").max(2000, "Max 2000 characters"),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  photos: z.array(z.string().url()).max(5, "Max 5 photos").default([]),
});

export type MaintenanceRequestSchema = z.infer<typeof maintenanceRequestSchema>;

export const maintenanceApprovalSchema = z.object({
  status: z.enum(['approved', 'rejected']),
  rejectionReason: z.string().max(500).optional(),
}).refine((data) => {
  if (data.status === 'rejected') {
    return !!data.rejectionReason && data.rejectionReason.length >= 5;
  }
  return true;
}, {
  message: "Rejection reason required (min 5 chars) when rejecting",
  path: ["rejectionReason"],
});

export type MaintenanceApprovalSchema = z.infer<typeof maintenanceApprovalSchema>;

export const maintenanceAssignSchema = z.object({
  technicianId: z.string().uuid("Please select a technician"),
});

export type MaintenanceAssignSchema = z.infer<typeof maintenanceAssignSchema>;

export const maintenanceResolveSchema = z.object({
  resolutionNotes: z.string().min(10, "Resolution notes must be at least 10 characters").max(2000),
});

export type MaintenanceResolveSchema = z.infer<typeof maintenanceResolveSchema>;

// --- Report Filters (Screen 9 reference) ---

export const reportFilterSchema = z.object({
  dateRange: z.object({
    from: z.date().optional(),
    to: z.date().optional(),
  }).optional(),
  departments: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
  status: z.array(z.string()).optional(),
});

export type ReportFilterSchema = z.infer<typeof reportFilterSchema>;

// --- Notification Filters (Screen 10 reference) ---

export const notificationFilterSchema = z.object({
  priority: z.enum(['high', 'medium', 'low']).optional(),
  status: z.enum(['unread', 'read', 'archived']).optional(),
  type: z.string().optional(),
  dateFrom: z.date().optional(),
  dateTo: z.date().optional(),
});

export type NotificationFilterSchema = z.infer<typeof notificationFilterSchema>;
