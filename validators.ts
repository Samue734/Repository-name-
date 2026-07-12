// ============================================================
// AssetFlow ERP — Zod Validation Schemas
// ============================================================

import { z } from 'zod';

// ======== Audit Cycle Form ========
export const auditCycleSchema = z.object({
  name: z.string()
    .min(3, 'Audit name must be at least 3 characters')
    .max(200, 'Audit name must not exceed 200 characters'),
  departments: z.array(z.string())
    .min(1, 'Select at least one department'),
  locations: z.array(z.string())
    .min(1, 'Select at least one location'),
  startDate: z.string()
    .min(1, 'Start date is required'),
  endDate: z.string()
    .min(1, 'End date is required'),
  auditors: z.array(z.string())
    .min(1, 'Assign at least one auditor'),
  notes: z.string()
    .max(1000, 'Notes must not exceed 1000 characters')
    .optional(),
}).refine(
  (data) => {
    if (!data.startDate || !data.endDate) return true;
    return new Date(data.endDate) > new Date(data.startDate);
  },
  { message: 'End date must be after start date', path: ['endDate'] }
);

export type AuditCycleFormData = z.infer<typeof auditCycleSchema>;

// ======== Verification Update ========
export const verificationSchema = z.object({
  status: z.enum(['verified', 'missing', 'damaged']),
  notes: z.string().max(500, 'Notes must not exceed 500 characters').optional(),
});

export type VerificationFormData = z.infer<typeof verificationSchema>;

// ======== Report Filters ========
export const reportFilterSchema = z.object({
  dateRange: z.object({
    from: z.string().optional(),
    to: z.string().optional(),
  }).optional(),
  departments: z.array(z.string()).optional(),
  categories: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
  assetStatus: z.array(z.string()).optional(),
});

export type ReportFilterFormData = z.infer<typeof reportFilterSchema>;

// ======== Notification Filters ========
export const notificationFilterSchema = z.object({
  priority: z.enum(['high', 'medium', 'low', 'all']).optional(),
  status: z.enum(['unread', 'read', 'archived', 'all']).optional(),
  type: z.string().optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export type NotificationFilterFormData = z.infer<typeof notificationFilterSchema>;

// ======== Activity Log Filters ========
export const activityLogFilterSchema = z.object({
  search: z.string().optional(),
  users: z.array(z.string()).optional(),
  actions: z.array(z.string()).optional(),
  modules: z.array(z.string()).optional(),
  severity: z.enum(['critical', 'warning', 'info', 'debug', 'all']).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
});

export type ActivityLogFilterFormData = z.infer<typeof activityLogFilterSchema>;
