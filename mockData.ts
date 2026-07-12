// ============================================
// ASSETFLOW ERP - MOCK DATA
// Screens 3, 6, 7 + Supporting Data
// ============================================

import type {
  User,
  Department,
  AssetCategory,
  Employee,
  Asset,
  Booking,
  MaintenanceRequest,
  Notification,
  ActivityLog,
} from '../types';

// --- Users ---
export const mockUsers: User[] = [
  { id: 'usr-001', name: 'Sarah Chen', email: 'sarah.chen@assetflow.io', role: 'admin', departmentId: 'dept-001', status: 'active', createdAt: '2024-01-15T08:00:00Z' },
  { id: 'usr-002', name: 'Marcus Johnson', email: 'marcus.j@assetflow.io', role: 'asset_manager', departmentId: 'dept-002', status: 'active', createdAt: '2024-01-20T08:00:00Z' },
  { id: 'usr-003', name: 'Priya Sharma', email: 'priya.s@assetflow.io', role: 'department_head', departmentId: 'dept-002', status: 'active', createdAt: '2024-02-01T08:00:00Z' },
  { id: 'usr-004', name: 'James Wilson', email: 'james.w@assetflow.io', role: 'department_head', departmentId: 'dept-003', status: 'active', createdAt: '2024-02-05T08:00:00Z' },
  { id: 'usr-005', name: 'Raj Patel', email: 'raj.p@assetflow.io', role: 'employee', departmentId: 'dept-002', status: 'active', createdAt: '2024-03-01T08:00:00Z' },
  { id: 'usr-006', name: 'Emily Davis', email: 'emily.d@assetflow.io', role: 'employee', departmentId: 'dept-003', status: 'active', createdAt: '2024-03-10T08:00:00Z' },
  { id: 'usr-007', name: 'David Kim', email: 'david.k@assetflow.io', role: 'employee', departmentId: 'dept-002', status: 'active', createdAt: '2024-03-15T08:00:00Z' },
  { id: 'usr-008', name: 'Lisa Wong', email: 'lisa.w@assetflow.io', role: 'employee', departmentId: 'dept-004', status: 'active', createdAt: '2024-04-01T08:00:00Z' },
  { id: 'usr-009', name: 'Tom Bradley', email: 'tom.b@assetflow.io', role: 'employee', departmentId: 'dept-003', status: 'inactive', createdAt: '2024-04-10T08:00:00Z' },
  { id: 'usr-010', name: 'Nina Rodriguez', email: 'nina.r@assetflow.io', role: 'asset_manager', departmentId: 'dept-004', status: 'active', createdAt: '2024-05-01T08:00:00Z' },
];

// --- Departments (Screen 3) ---
export const mockDepartments: Department[] = [
  { id: 'dept-001', name: 'Executive', headId: 'usr-001', headName: 'Sarah Chen', parentId: null, parentName: null, status: 'active', employeeCount: 1, assetCount: 5, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'dept-002', name: 'Engineering', headId: 'usr-003', headName: 'Priya Sharma', parentId: null, parentName: null, status: 'active', employeeCount: 3, assetCount: 24, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'dept-003', name: 'Marketing', headId: 'usr-004', headName: 'James Wilson', parentId: null, parentName: null, status: 'active', employeeCount: 2, assetCount: 12, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'dept-004', name: 'Facilities', headId: null, headName: null, parentId: null, parentName: null, status: 'active', employeeCount: 1, assetCount: 18, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'dept-005', name: 'Field Ops (East)', headId: null, headName: null, parentId: 'dept-004', parentName: 'Facilities', status: 'active', employeeCount: 0, assetCount: 8, createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'dept-006', name: 'Field Ops (West)', headId: null, headName: null, parentId: 'dept-004', parentName: 'Facilities', status: 'inactive', employeeCount: 0, assetCount: 3, createdAt: '2024-02-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
];

// --- Asset Categories (Screen 3) ---
export const mockCategories: AssetCategory[] = [
  { id: 'cat-001', name: 'Electronics', customFields: [
    { id: 'cf-001', name: 'Warranty Period (months)', type: 'number', required: true },
    { id: 'cf-002', name: 'Power Rating', type: 'text', required: false },
  ], assetCount: 18, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'cat-002', name: 'Furniture', customFields: [
    { id: 'cf-003', name: 'Material', type: 'text', required: false },
    { id: 'cf-004', name: 'Weight Capacity (kg)', type: 'number', required: false },
  ], assetCount: 15, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'cat-003', name: 'Vehicles', customFields: [
    { id: 'cf-005', name: 'License Plate', type: 'text', required: true },
    { id: 'cf-006', name: 'Fuel Type', type: 'text', required: true },
    { id: 'cf-007', name: 'Last Service Date', type: 'date', required: false },
  ], assetCount: 4, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'cat-004', name: 'Office Equipment', customFields: [
    { id: 'cf-008', name: 'Brand', type: 'text', required: false },
  ], assetCount: 12, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'cat-005', name: 'Networking', customFields: [
    { id: 'cf-009', name: 'IP Address', type: 'text', required: false },
    { id: 'cf-010', name: 'MAC Address', type: 'text', required: false },
  ], assetCount: 8, createdAt: '2024-01-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
];

// --- Employees with derived data (Screen 3) ---
export const mockEmployees: Employee[] = mockUsers.map(u => {
  const dept = mockDepartments.find(d => d.id === u.departmentId);
  return {
    ...u,
    departmentName: dept?.name || 'Unassigned',
    assetsHeld: u.role === 'employee' ? Math.floor(Math.random() * 3) : 0,
    lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
  };
});

// --- Assets (Supporting Screen 6 & 7) ---
export const mockAssets: Asset[] = [
  // Bookable Resources (Screen 6)
  { id: 'ast-001', name: 'Conference Room B2', assetTag: 'AF-0001', serialNumber: null, categoryId: 'cat-004', categoryName: 'Office Equipment', departmentId: 'dept-004', departmentName: 'Facilities', status: 'available', condition: 'excellent', location: 'Building B, 2nd Floor', isBookable: true, acquisitionDate: '2023-01-15', acquisitionCost: 0, assignedToId: null, assignedToName: null, photos: [], documents: [], createdAt: '2023-01-15T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'ast-002', name: 'Projector 4K', assetTag: 'AF-0002', serialNumber: 'SN-PROJ-001', categoryId: 'cat-001', categoryName: 'Electronics', departmentId: 'dept-004', departmentName: 'Facilities', status: 'available', condition: 'good', location: 'Storage Room A', isBookable: true, acquisitionDate: '2023-03-10', acquisitionCost: 1200, assignedToId: null, assignedToName: null, photos: [], documents: [], createdAt: '2023-03-10T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'ast-003', name: 'Company Van - Ford Transit', assetTag: 'AF-0003', serialNumber: 'SN-VAN-001', categoryId: 'cat-003', categoryName: 'Vehicles', departmentId: 'dept-004', departmentName: 'Facilities', status: 'available', condition: 'good', location: 'Parking Lot B', isBookable: true, acquisitionDate: '2022-06-01', acquisitionCost: 35000, assignedToId: null, assignedToName: null, photos: [], documents: [], createdAt: '2022-06-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'ast-004', name: 'Meeting Pod - Glass', assetTag: 'AF-0004', serialNumber: null, categoryId: 'cat-004', categoryName: 'Office Equipment', departmentId: 'dept-004', departmentName: 'Facilities', status: 'available', condition: 'excellent', location: 'Building A, 1st Floor', isBookable: true, acquisitionDate: '2024-01-10', acquisitionCost: 0, assignedToId: null, assignedToName: null, photos: [], documents: [], createdAt: '2024-01-10T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'ast-005', name: 'Test Lab - Station 1', assetTag: 'AF-0005', serialNumber: null, categoryId: 'cat-001', categoryName: 'Electronics', departmentId: 'dept-002', departmentName: 'Engineering', status: 'available', condition: 'good', location: 'Lab Building, Room 101', isBookable: true, acquisitionDate: '2023-08-20', acquisitionCost: 8000, assignedToId: null, assignedToName: null, photos: [], documents: [], createdAt: '2023-08-20T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },

  // Allocated Assets (Screen 7 maintenance)
  { id: 'ast-011', name: 'Dell Laptop XPS 15', assetTag: 'AF-0011', serialNumber: 'SN-DELL-001', categoryId: 'cat-001', categoryName: 'Electronics', departmentId: 'dept-002', departmentName: 'Engineering', status: 'allocated', condition: 'good', location: 'Desk 412', isBookable: false, acquisitionDate: '2023-05-15', acquisitionCost: 1800, assignedToId: 'usr-005', assignedToName: 'Raj Patel', expectedReturnDate: '2025-05-15', photos: [], documents: [], createdAt: '2023-05-15T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'ast-012', name: 'MacBook Pro 16"', assetTag: 'AF-0012', serialNumber: 'SN-MAC-001', categoryId: 'cat-001', categoryName: 'Electronics', departmentId: 'dept-002', departmentName: 'Engineering', status: 'allocated', condition: 'excellent', location: 'Desk 415', isBookable: false, acquisitionDate: '2024-01-20', acquisitionCost: 2500, assignedToId: 'usr-003', assignedToName: 'Priya Sharma', expectedReturnDate: '2026-01-20', photos: [], documents: [], createdAt: '2024-01-20T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'ast-013', name: 'Canon DSLR Camera', assetTag: 'AF-0013', serialNumber: 'SN-CANON-001', categoryId: 'cat-001', categoryName: 'Electronics', departmentId: 'dept-003', departmentName: 'Marketing', status: 'allocated', condition: 'good', location: 'Creative Studio', isBookable: false, acquisitionDate: '2023-09-01', acquisitionCost: 2200, assignedToId: 'usr-006', assignedToName: 'Emily Davis', expectedReturnDate: '2025-09-01', photos: [], documents: [], createdAt: '2023-09-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'ast-014', name: 'Standing Desk', assetTag: 'AF-0014', serialNumber: null, categoryId: 'cat-002', categoryName: 'Furniture', departmentId: 'dept-002', departmentName: 'Engineering', status: 'allocated', condition: 'fair', location: 'Desk 418', isBookable: false, acquisitionDate: '2022-11-10', acquisitionCost: 600, assignedToId: 'usr-007', assignedToName: 'David Kim', expectedReturnDate: null, photos: [], documents: [], createdAt: '2022-11-10T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'ast-015', name: 'HP LaserJet Printer', assetTag: 'AF-0015', serialNumber: 'SN-HP-001', categoryId: 'cat-004', categoryName: 'Office Equipment', departmentId: 'dept-003', departmentName: 'Marketing', status: 'under_maintenance', condition: 'poor', location: 'Print Room A', isBookable: false, acquisitionDate: '2021-03-15', acquisitionCost: 450, assignedToId: null, assignedToName: null, expectedReturnDate: null, photos: [], documents: [], createdAt: '2021-03-15T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'ast-016', name: 'Cisco Switch 48-port', assetTag: 'AF-0016', serialNumber: 'SN-CISCO-001', categoryId: 'cat-005', categoryName: 'Networking', departmentId: 'dept-002', departmentName: 'Engineering', status: 'available', condition: 'good', location: 'Server Room', isBookable: false, acquisitionDate: '2023-02-01', acquisitionCost: 3000, assignedToId: null, assignedToName: null, expectedReturnDate: null, photos: [], documents: [], createdAt: '2023-02-01T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
  { id: 'ast-017', name: 'Office Chair - Ergonomic', assetTag: 'AF-0017', serialNumber: null, categoryId: 'cat-002', categoryName: 'Furniture', departmentId: 'dept-003', departmentName: 'Marketing', status: 'allocated', condition: 'good', location: 'Desk 302', isBookable: false, acquisitionDate: '2023-04-20', acquisitionCost: 350, assignedToId: 'usr-004', assignedToName: 'James Wilson', expectedReturnDate: null, photos: [], documents: [], createdAt: '2023-04-20T00:00:00Z', updatedAt: '2024-06-01T00:00:00Z' },
];

// --- Bookings (Screen 6) ---
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const tomorrow = new Date(today); tomorrow.setDate(tomorrow.getDate() + 1);
const yesterday = new Date(today); yesterday.setDate(yesterday.getDate() - 1);
const nextWeek = new Date(today); nextWeek.setDate(nextWeek.getDate() + 7);

export const mockBookings: Booking[] = [
  {
    id: 'bkg-001',
    resourceId: 'ast-001',
    resourceName: 'Conference Room B2',
    resourceCategory: 'Office Equipment',
    resourceLocation: 'Building B, 2nd Floor',
    userId: 'usr-003',
    userName: 'Priya Sharma',
    userDepartment: 'Engineering',
    startTime: new Date(today.getTime() + 9 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(today.getTime() + 10 * 60 * 60 * 1000).toISOString(),
    purpose: 'Sprint Planning - Engineering Team',
    status: 'upcoming',
    createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'bkg-002',
    resourceId: 'ast-001',
    resourceName: 'Conference Room B2',
    resourceCategory: 'Office Equipment',
    resourceLocation: 'Building B, 2nd Floor',
    userId: 'usr-004',
    userName: 'James Wilson',
    userDepartment: 'Marketing',
    startTime: new Date(today.getTime() + 14 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(today.getTime() + 15 * 60 * 60 * 1000).toISOString(),
    purpose: 'Campaign Review Meeting',
    status: 'upcoming',
    createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'bkg-003',
    resourceId: 'ast-002',
    resourceName: 'Projector 4K',
    resourceCategory: 'Electronics',
    resourceLocation: 'Storage Room A',
    userId: 'usr-005',
    userName: 'Raj Patel',
    userDepartment: 'Engineering',
    startTime: new Date(tomorrow.getTime() + 10 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(tomorrow.getTime() + 12 * 60 * 60 * 1000).toISOString(),
    purpose: 'Client Presentation - Q3 Roadmap',
    status: 'upcoming',
    createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'bkg-004',
    resourceId: 'ast-003',
    resourceName: 'Company Van - Ford Transit',
    resourceCategory: 'Vehicles',
    resourceLocation: 'Parking Lot B',
    userId: 'usr-006',
    userName: 'Emily Davis',
    userDepartment: 'Marketing',
    startTime: new Date(tomorrow.getTime() + 8 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(tomorrow.getTime() + 16 * 60 * 60 * 1000).toISOString(),
    purpose: 'Off-site Photo Shoot - Downtown',
    status: 'upcoming',
    createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'bkg-005',
    resourceId: 'ast-001',
    resourceName: 'Conference Room B2',
    resourceCategory: 'Office Equipment',
    resourceLocation: 'Building B, 2nd Floor',
    userId: 'usr-007',
    userName: 'David Kim',
    userDepartment: 'Engineering',
    startTime: new Date(yesterday.getTime() + 13 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(yesterday.getTime() + 14 * 60 * 60 * 1000).toISOString(),
    purpose: 'Code Review Session',
    status: 'completed',
    createdAt: new Date(yesterday.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'bkg-006',
    resourceId: 'ast-004',
    resourceName: 'Meeting Pod - Glass',
    resourceCategory: 'Office Equipment',
    resourceLocation: 'Building A, 1st Floor',
    userId: 'usr-003',
    userName: 'Priya Sharma',
    userDepartment: 'Engineering',
    startTime: new Date(today.getTime() + 16 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(today.getTime() + 17 * 60 * 60 * 1000).toISOString(),
    purpose: '1:1 with Raj - Performance Review',
    status: 'upcoming',
    createdAt: new Date(today.getTime() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'bkg-007',
    resourceId: 'ast-002',
    resourceName: 'Projector 4K',
    resourceCategory: 'Electronics',
    resourceLocation: 'Storage Room A',
    userId: 'usr-004',
    userName: 'James Wilson',
    userDepartment: 'Marketing',
    startTime: new Date(nextWeek.getTime() + 9 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(nextWeek.getTime() + 11 * 60 * 60 * 1000).toISOString(),
    purpose: 'All-hands Presentation',
    status: 'upcoming',
    createdAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'bkg-008',
    resourceId: 'ast-005',
    resourceName: 'Test Lab - Station 1',
    resourceCategory: 'Electronics',
    resourceLocation: 'Lab Building, Room 101',
    userId: 'usr-005',
    userName: 'Raj Patel',
    userDepartment: 'Engineering',
    startTime: new Date(today.getTime() + 11 * 60 * 60 * 1000).toISOString(),
    endTime: new Date(today.getTime() + 13 * 60 * 60 * 1000).toISOString(),
    purpose: 'Hardware Testing - New Sensor Module',
    status: 'cancelled',
    createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    cancelledAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    cancelledReason: 'Equipment delayed, rescheduled for next week',
  },
];

// --- Maintenance Requests (Screen 7) ---
export const mockMaintenanceRequests: MaintenanceRequest[] = [
  {
    id: 'mnt-001',
    assetId: 'ast-015',
    assetName: 'HP LaserJet Printer',
    assetTag: 'AF-0015',
    assetCategory: 'Office Equipment',
    assetLocation: 'Print Room A',
    requestedBy: 'usr-006',
    requestedByName: 'Emily Davis',
    requestedByDepartment: 'Marketing',
    issueDescription: 'Paper jam error persists even after clearing. Display shows error code 13.20.00. Tried replacing toner but issue remains. Prints are coming out with streaks.',
    priority: 'medium',
    photos: ['https://picsum.photos/400/300?random=1', 'https://picsum.photos/400/300?random=2'],
    status: 'pending',
    approvedBy: null,
    approvedByName: null,
    approvedAt: null,
    technicianId: null,
    technicianName: null,
    assignedAt: null,
    startedAt: null,
    resolvedAt: null,
    resolutionNotes: null,
    rejectionReason: null,
    createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mnt-002',
    assetId: 'ast-011',
    assetName: 'Dell Laptop XPS 15',
    assetTag: 'AF-0011',
    assetCategory: 'Electronics',
    assetLocation: 'Desk 412',
    requestedBy: 'usr-005',
    requestedByName: 'Raj Patel',
    requestedByDepartment: 'Engineering',
    issueDescription: 'Battery not holding charge. Drops from 100% to 20% within 30 minutes. Also experiencing random shutdowns when not plugged in. Needs battery replacement.',
    priority: 'high',
    photos: ['https://picsum.photos/400/300?random=3'],
    status: 'approved',
    approvedBy: 'usr-002',
    approvedByName: 'Marcus Johnson',
    approvedAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    technicianId: null,
    technicianName: null,
    assignedAt: null,
    startedAt: null,
    resolvedAt: null,
    resolutionNotes: null,
    rejectionReason: null,
    createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mnt-003',
    assetId: 'ast-014',
    assetName: 'Standing Desk',
    assetTag: 'AF-0014',
    assetCategory: 'Furniture',
    assetLocation: 'Desk 418',
    requestedBy: 'usr-007',
    requestedByName: 'David Kim',
    requestedByDepartment: 'Engineering',
    issueDescription: 'Motor for height adjustment making grinding noise. Desk gets stuck at lowest position intermittently. Control panel buttons unresponsive sometimes.',
    priority: 'low',
    photos: [],
    status: 'technician_assigned',
    approvedBy: 'usr-002',
    approvedByName: 'Marcus Johnson',
    approvedAt: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    technicianId: 'usr-010',
    technicianName: 'Nina Rodriguez',
    assignedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    startedAt: null,
    resolvedAt: null,
    resolutionNotes: null,
    rejectionReason: null,
    createdAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mnt-004',
    assetId: 'ast-013',
    assetName: 'Canon DSLR Camera',
    assetTag: 'AF-0013',
    assetCategory: 'Electronics',
    assetLocation: 'Creative Studio',
    requestedBy: 'usr-006',
    requestedByName: 'Emily Davis',
    requestedByDepartment: 'Marketing',
    issueDescription: 'Auto-focus not working in low light. Lens mount feels loose. SD card slot door broken - won\'t stay closed. Needs professional repair.',
    priority: 'high',
    photos: ['https://picsum.photos/400/300?random=4', 'https://picsum.photos/400/300?random=5'],
    status: 'in_progress',
    approvedBy: 'usr-002',
    approvedByName: 'Marcus Johnson',
    approvedAt: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    technicianId: 'usr-010',
    technicianName: 'Nina Rodriguez',
    assignedAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    startedAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    resolvedAt: null,
    resolutionNotes: null,
    rejectionReason: null,
    createdAt: new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mnt-005',
    assetId: 'ast-012',
    assetName: 'MacBook Pro 16"',
    assetTag: 'AF-0012',
    assetCategory: 'Electronics',
    assetLocation: 'Desk 415',
    requestedBy: 'usr-003',
    requestedByName: 'Priya Sharma',
    requestedByDepartment: 'Engineering',
    issueDescription: 'Screen flickering intermittently. External monitor works fine so likely display panel issue. Also one USB-C port not detecting devices.',
    priority: 'medium',
    photos: ['https://picsum.photos/400/300?random=6'],
    status: 'resolved',
    approvedBy: 'usr-002',
    approvedByName: 'Marcus Johnson',
    approvedAt: new Date(today.getTime() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    technicianId: 'usr-010',
    technicianName: 'Nina Rodriguez',
    assignedAt: new Date(today.getTime() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    startedAt: new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    resolvedAt: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    resolutionNotes: 'Replaced display panel (part #LP160WQ1-SPA1) and USB-C I/O board. Tested all ports and display at various brightness levels. Working normally now.',
    rejectionReason: null,
    createdAt: new Date(today.getTime() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'mnt-006',
    assetId: 'ast-016',
    assetName: 'Cisco Switch 48-port',
    assetTag: 'AF-0016',
    assetCategory: 'Networking',
    assetLocation: 'Server Room',
    requestedBy: 'usr-007',
    requestedByName: 'David Kim',
    requestedByDepartment: 'Engineering',
    issueDescription: 'Ports 25-32 not responding. Link lights off. Tried different cables - same issue. Suspect hardware failure on that bank. Need replacement or repair.',
    priority: 'high',
    photos: ['https://picsum.photos/400/300?random=7'],
    status: 'rejected',
    approvedBy: 'usr-002',
    approvedByName: 'Marcus Johnson',
    approvedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    technicianId: null,
    technicianName: null,
    assignedAt: null,
    startedAt: null,
    resolvedAt: null,
    resolutionNotes: null,
    rejectionReason: 'Asset is still under vendor warranty. Please contact Cisco TAC directly for RMA. Reference case number will be provided by IT. Do not attempt repair in-house.',
    createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// --- Notifications (Supporting) ---
export const mockNotifications: Notification[] = [
  { id: 'notif-001', userId: 'usr-001', type: 'maintenance_approved', title: 'Maintenance Approved', message: 'Request for HP LaserJet Printer (AF-0015) has been approved by Marcus Johnson', priority: 'medium', status: 'unread', entityId: 'mnt-001', entityType: 'maintenance', createdAt: new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), readAt: null, archivedAt: null },
  { id: 'notif-002', userId: 'usr-005', type: 'booking_reminder', title: 'Booking Reminder', message: 'Your booking for Conference Room B2 starts in 15 minutes (9:00 AM)', priority: 'medium', status: 'unread', entityId: 'bkg-001', entityType: 'booking', createdAt: new Date(today.getTime() - 15 * 60 * 1000).toISOString(), readAt: null, archivedAt: null },
  { id: 'notif-003', userId: 'usr-006', type: 'overdue_return', title: 'Overdue Return Alert', message: 'Canon DSLR Camera (AF-0013) expected return was 3 days ago', priority: 'high', status: 'unread', entityId: 'ast-013', entityType: 'asset', createdAt: new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), readAt: null, archivedAt: null },
  { id: 'notif-004', userId: 'usr-003', type: 'audit_discrepancy', title: 'Audit Discrepancy Flagged', message: 'Asset AF-0088 marked as Damaged in Q2 Audit Cycle', priority: 'high', status: 'read', entityId: 'ast-088', entityType: 'asset', createdAt: new Date(today.getTime() - 5 * 24 * 60 * 60 * 1000).toISOString(), readAt: new Date(today.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(), archivedAt: null },
  { id: 'notif-005', userId: 'usr-002', type: 'maintenance_rejected', title: 'Maintenance Request Rejected', message: 'Cisco Switch repair rejected - vendor warranty case opened instead', priority: 'medium', status: 'unread', entityId: 'mnt-006', entityType: 'maintenance', createdAt: new Date(today.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), readAt: null, archivedAt: null },
];

// --- Activity Logs (Supporting) ---
export const mockActivityLogs: ActivityLog[] = [
  { id: 'log-001', timestamp: new Date(today.getTime() - 1 * 60 * 60 * 1000).toISOString(), userId: 'usr-001', userName: 'Sarah Chen', role: 'admin', action: 'department_updated', entityType: 'department', entityId: 'dept-002', module: 'organization', ipAddress: '192.168.1.100', description: 'Updated Engineering department head to Priya Sharma', severity: 'info', metadata: { previousHeadId: null, newHeadId: 'usr-003' } },
  { id: 'log-002', timestamp: new Date(today.getTime() - 2 * 60 * 60 * 1000).toISOString(), userId: 'usr-001', userName: 'Sarah Chen', role: 'admin', action: 'role_promoted', entityType: 'user', entityId: 'usr-003', module: 'organization', ipAddress: '192.168.1.100', description: 'Promoted Priya Sharma to Department Head of Engineering', severity: 'critical', metadata: { previousRole: 'employee', newRole: 'department_head' } },
  { id: 'log-003', timestamp: new Date(today.getTime() - 3 * 60 * 60 * 1000).toISOString(), userId: 'usr-002', userName: 'Marcus Johnson', role: 'asset_manager', action: 'maintenance_approved', entityType: 'maintenance', entityId: 'mnt-002', module: 'maintenance', ipAddress: '192.168.1.101', description: 'Approved maintenance request for Dell Laptop XPS 15 (AF-0011)', severity: 'info', metadata: { priority: 'high', assetId: 'ast-011' } },
  { id: 'log-004', timestamp: new Date(today.getTime() - 4 * 60 * 60 * 1000).toISOString(), userId: 'usr-005', userName: 'Raj Patel', role: 'employee', action: 'booking_created', entityType: 'booking', entityId: 'bkg-003', module: 'booking', ipAddress: '192.168.1.102', description: 'Created booking for Projector 4K (AF-0002) tomorrow 10:00-12:00', severity: 'info', metadata: { resourceId: 'ast-002', startTime: new Date(tomorrow.getTime() + 10 * 60 * 60 * 1000).toISOString() } },
  { id: 'log-005', timestamp: new Date(today.getTime() - 5 * 60 * 60 * 1000).toISOString(), userId: 'usr-010', userName: 'Nina Rodriguez', role: 'asset_manager', action: 'maintenance_resolved', entityType: 'maintenance', entityId: 'mnt-005', module: 'maintenance', ipAddress: '192.168.1.103', description: 'Resolved maintenance for MacBook Pro 16" (AF-0012) - replaced display panel', severity: 'info', metadata: { resolutionNotes: 'Replaced display panel and USB-C I/O board' } },
  { id: 'log-006', timestamp: new Date(today.getTime() - 6 * 60 * 60 * 1000).toISOString(), userId: 'usr-001', userName: 'Sarah Chen', role: 'admin', action: 'category_created', entityType: 'asset_category', entityId: 'cat-005', module: 'organization', ipAddress: '192.168.1.100', description: 'Created new asset category: Networking', severity: 'info', metadata: { customFields: 2 } },
];

// --- Helper: Get bookable resources ---
export const getBookableResources = () => mockAssets.filter(a => a.isBookable && a.status === 'available');

// --- Helper: Get assets for maintenance ---
export const getMaintenanceEligibleAssets = () => mockAssets.filter(a => 
  ['available', 'allocated', 'under_maintenance'].includes(a.status)
);

// --- Helper: Get technicians ---
export const getTechnicians = () => mockUsers.filter(u => 
  ['asset_manager', 'admin'].includes(u.role) && u.status === 'active'
);
