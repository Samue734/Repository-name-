// ============================================================
// AssetFlow ERP — Comprehensive Mock Data
// Screens 8 (Audit), 9 (Reports), 10 (Notifications)
// ============================================================

import type {
  User, Department, Asset, AuditCycle, AuditItem,
  KpiMetric, Notification, ActivityLog,
  UtilizationChartData, DepartmentAllocationData,
  MaintenanceFrequencyData, AssetLifecycleData,
  CostTrendData, TopAssetData, UpcomingMaintenanceItem,
} from '@/types';

// ======== Users ========
export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Alex Chen', email: 'alex.chen@assetflow.io', role: 'admin', department: 'd1' },
  { id: 'u2', name: 'Sarah Johnson', email: 'sarah.j@assetflow.io', role: 'asset_manager', department: 'd2' },
  { id: 'u3', name: 'Mike Ross', email: 'mike.r@assetflow.io', role: 'department_head', department: 'd3' },
  { id: 'u4', name: 'Priya Shah', email: 'priya.s@assetflow.io', role: 'employee', department: 'd3' },
  { id: 'u5', name: 'James Wilson', email: 'james.w@assetflow.io', role: 'asset_manager', department: 'd4' },
  { id: 'u6', name: 'Emily Zhang', email: 'emily.z@assetflow.io', role: 'department_head', department: 'd5' },
  { id: 'u7', name: 'David Kim', email: 'david.k@assetflow.io', role: 'employee', department: 'd2' },
  { id: 'u8', name: 'Lisa Brown', email: 'lisa.b@assetflow.io', role: 'employee', department: 'd6' },
  { id: 'u9', name: 'Robert Taylor', email: 'robert.t@assetflow.io', role: 'asset_manager', department: 'd1' },
  { id: 'u10', name: 'Anna Martinez', email: 'anna.m@assetflow.io', role: 'employee', department: 'd5' },
];

export const CURRENT_USER: User = MOCK_USERS[0]; // Admin

// ======== Departments ========
export const MOCK_DEPARTMENTS: Department[] = [
  { id: 'd1', name: 'Engineering', head: 'Alex Chen', status: 'active' },
  { id: 'd2', name: 'Facilities', head: 'Sarah Johnson', status: 'active' },
  { id: 'd3', name: 'Human Resources', head: 'Mike Ross', status: 'active' },
  { id: 'd4', name: 'Finance', head: 'James Wilson', status: 'active' },
  { id: 'd5', name: 'Marketing', head: 'Emily Zhang', status: 'active' },
  { id: 'd6', name: 'Operations', head: 'Lisa Brown', status: 'active' },
];

// ======== Locations ========
export const MOCK_LOCATIONS = [
  'HQ Floor 1', 'HQ Floor 2', 'HQ Floor 3',
  'East Wing A', 'East Wing B', 'West Wing',
  'Warehouse', 'Data Center', 'Remote',
];

// ======== Asset Categories ========
export const MOCK_CATEGORIES = [
  'Electronics', 'Furniture', 'Vehicles', 'IT Equipment',
  'Office Supplies', 'Machinery', 'Tools', 'Networking',
];

// ======== Assets ========
export const MOCK_ASSETS: Asset[] = [
  { id: 'a1', tag: 'AF-0012', name: 'Dell Laptop XPS 15', category: 'IT Equipment', department: 'd1', location: 'HQ Floor 2', status: 'allocated', condition: 'good', serialNumber: 'SN123456' },
  { id: 'a2', tag: 'AF-0034', name: 'Office Chair Ergonomic', category: 'Furniture', department: 'd3', location: 'HQ Floor 1', status: 'allocated', condition: 'excellent', serialNumber: 'SN789012' },
  { id: 'a3', tag: 'AF-0045', name: 'Projector HD 4K', category: 'Electronics', department: 'd2', location: 'East Wing A', status: 'available', condition: 'good', serialNumber: 'SN345678' },
  { id: 'a4', tag: 'AF-0056', name: 'Server Rack 42U', category: 'IT Equipment', department: 'd1', location: 'Data Center', status: 'allocated', condition: 'excellent', serialNumber: 'SN901234' },
  { id: 'a5', tag: 'AF-0067', name: 'Ford Transit Van', category: 'Vehicles', department: 'd6', location: 'Warehouse', status: 'under_maintenance', condition: 'fair', serialNumber: 'SN567890' },
  { id: 'a6', tag: 'AF-0078', name: 'Standing Desk', category: 'Furniture', department: 'd5', location: 'HQ Floor 3', status: 'allocated', condition: 'good', serialNumber: 'SN234567' },
  { id: 'a7', tag: 'AF-0089', name: 'MacBook Pro 16"', category: 'IT Equipment', department: 'd4', location: 'HQ Floor 2', status: 'allocated', condition: 'excellent', serialNumber: 'SN890123' },
  { id: 'a8', tag: 'AF-0090', name: 'Cisco Switch 48-port', category: 'Networking', department: 'd1', location: 'Data Center', status: 'allocated', condition: 'good', serialNumber: 'SN456789' },
  { id: 'a9', tag: 'AF-0101', name: 'HVAC Unit 5-ton', category: 'Machinery', department: 'd2', location: 'East Wing B', status: 'available', condition: 'good', serialNumber: 'SN012345' },
  { id: 'a10', tag: 'AF-0112', name: 'Conference Table 10-seat', category: 'Furniture', department: 'd5', location: 'HQ Floor 3', status: 'reserved', condition: 'excellent', serialNumber: 'SN678901' },
  { id: 'a11', tag: 'AF-0123', name: 'Laser Printer Color', category: 'Electronics', department: 'd3', location: 'HQ Floor 1', status: 'allocated', condition: 'fair', serialNumber: 'SN135790' },
  { id: 'a12', tag: 'AF-0134', name: 'Tool Kit Complete', category: 'Tools', department: 'd6', location: 'Warehouse', status: 'available', condition: 'good', serialNumber: 'SN246801' },
  { id: 'a13', tag: 'AF-0145', name: 'Wireless Access Point', category: 'Networking', department: 'd1', location: 'HQ Floor 2', status: 'allocated', condition: 'good', serialNumber: 'SN357924' },
  { id: 'a14', tag: 'AF-0156', name: 'UPS 3000VA', category: 'IT Equipment', department: 'd1', location: 'Data Center', status: 'allocated', condition: 'excellent', serialNumber: 'SN468135' },
  { id: 'a15', tag: 'AF-0167', name: 'Delivery Truck', category: 'Vehicles', department: 'd6', location: 'Warehouse', status: 'allocated', condition: 'good', serialNumber: 'SN579246' },
  { id: 'a16', tag: 'AF-0178', name: 'Monitor 27" 4K', category: 'Electronics', department: 'd4', location: 'HQ Floor 2', status: 'allocated', condition: 'excellent', serialNumber: 'SN680357' },
  { id: 'a17', tag: 'AF-0189', name: 'Filing Cabinet', category: 'Furniture', department: 'd3', location: 'HQ Floor 1', status: 'available', condition: 'good', serialNumber: 'SN791468' },
  { id: 'a18', tag: 'AF-0200', name: 'Drill Press', category: 'Machinery', department: 'd6', location: 'West Wing', status: 'allocated', condition: 'fair', serialNumber: 'SN802579' },
  { id: 'a19', tag: 'AF-0211', name: 'Smartboard 86"', category: 'Electronics', department: 'd5', location: 'HQ Floor 3', status: 'available', condition: 'good', serialNumber: 'SN913680' },
  { id: 'a20', tag: 'AF-0222', name: 'Generator 50kW', category: 'Machinery', department: 'd2', location: 'East Wing B', status: 'allocated', condition: 'good', serialNumber: 'SN024791' },
];

// ======== Audit Cycles ========
export const MOCK_AUDIT_CYCLES: AuditCycle[] = [
  {
    id: 'ac1', name: 'Q3 2025 Engineering Dept Audit', departments: ['d1'], locations: ['HQ Floor 2', 'Data Center'],
    startDate: '2025-07-01', endDate: '2025-07-15', status: 'active',
    assignedAuditors: ['u2', 'u9'], createdBy: 'u1', createdAt: '2025-07-01T08:00:00Z',
    totalAssets: 6, verifiedCount: 4, missingCount: 1, damagedCount: 1, pendingCount: 0,
    notes: 'Regular quarterly audit for Engineering department',
  },
  {
    id: 'ac2', name: 'Annual Facilities Review', departments: ['d2'], locations: ['East Wing A', 'East Wing B'],
    startDate: '2025-06-15', endDate: '2025-06-30', status: 'completed',
    assignedAuditors: ['u5'], createdBy: 'u1', createdAt: '2025-06-10T10:00:00Z',
    completedAt: '2025-06-28T16:30:00Z',
    totalAssets: 3, verifiedCount: 2, missingCount: 0, damagedCount: 1, pendingCount: 0,
    notes: 'Annual comprehensive facilities audit',
  },
  {
    id: 'ac3', name: 'HR Department Spot Check', departments: ['d3'], locations: ['HQ Floor 1'],
    startDate: '2025-07-10', endDate: '2025-07-12', status: 'draft',
    assignedAuditors: ['u2'], createdBy: 'u1', createdAt: '2025-07-08T09:00:00Z',
    totalAssets: 3, verifiedCount: 0, missingCount: 0, damagedCount: 0, pendingCount: 3,
  },
  {
    id: 'ac4', name: 'Q2 2025 Organization-wide Audit', departments: ['d1', 'd2', 'd3', 'd4', 'd5', 'd6'],
    locations: ['HQ Floor 1', 'HQ Floor 2', 'HQ Floor 3', 'East Wing A', 'East Wing B', 'West Wing', 'Warehouse', 'Data Center'],
    startDate: '2025-04-01', endDate: '2025-04-30', status: 'locked',
    assignedAuditors: ['u2', 'u5', 'u9'], createdBy: 'u1', createdAt: '2025-03-25T08:00:00Z',
    completedAt: '2025-04-29T14:00:00Z',
    totalAssets: 20, verifiedCount: 17, missingCount: 2, damagedCount: 1, pendingCount: 0,
    notes: 'Comprehensive organization-wide audit completed successfully',
  },
  {
    id: 'ac5', name: 'Finance Assets Verification', departments: ['d4'], locations: ['HQ Floor 2'],
    startDate: '2025-07-12', endDate: '2025-07-18', status: 'active',
    assignedAuditors: ['u5'], createdBy: 'u1', createdAt: '2025-07-11T11:00:00Z',
    totalAssets: 2, verifiedCount: 1, missingCount: 0, damagedCount: 0, pendingCount: 1,
  },
];

// ======== Audit Items ========
export const MOCK_AUDIT_ITEMS: AuditItem[] = [
  // Q3 Engineering (ac1) — Active
  { id: 'ai1', auditCycleId: 'ac1', assetId: 'a1', assetTag: 'AF-0012', assetName: 'Dell Laptop XPS 15', category: 'IT Equipment', department: 'Engineering', expectedLocation: 'HQ Floor 2', currentLocation: 'HQ Floor 2', condition: 'good', verificationStatus: 'verified', verifiedBy: 'Sarah Johnson', verifiedAt: '2025-07-02T10:30:00Z', notes: 'Asset in good condition' },
  { id: 'ai2', auditCycleId: 'ac1', assetId: 'a4', assetTag: 'AF-0056', assetName: 'Server Rack 42U', category: 'IT Equipment', department: 'Engineering', expectedLocation: 'Data Center', currentLocation: 'Data Center', condition: 'excellent', verificationStatus: 'verified', verifiedBy: 'Sarah Johnson', verifiedAt: '2025-07-02T11:00:00Z' },
  { id: 'ai3', auditCycleId: 'ac1', assetId: 'a8', assetTag: 'AF-0090', assetName: 'Cisco Switch 48-port', category: 'Networking', department: 'Engineering', expectedLocation: 'Data Center', currentLocation: 'Data Center', condition: 'good', verificationStatus: 'verified', verifiedBy: 'Robert Taylor', verifiedAt: '2025-07-03T09:15:00Z' },
  { id: 'ai4', auditCycleId: 'ac1', assetId: 'a13', assetTag: 'AF-0145', assetName: 'Wireless Access Point', category: 'Networking', department: 'Engineering', expectedLocation: 'HQ Floor 2', currentLocation: 'HQ Floor 3', condition: 'good', verificationStatus: 'missing', verifiedBy: 'Sarah Johnson', verifiedAt: '2025-07-03T14:00:00Z', notes: 'Asset not found at expected location, moved without record' },
  { id: 'ai5', auditCycleId: 'ac1', assetId: 'a14', assetTag: 'AF-0156', assetName: 'UPS 3000VA', category: 'IT Equipment', department: 'Engineering', expectedLocation: 'Data Center', currentLocation: 'Data Center', condition: 'excellent', verificationStatus: 'verified', verifiedBy: 'Robert Taylor', verifiedAt: '2025-07-04T10:00:00Z' },
  { id: 'ai6', auditCycleId: 'ac1', assetId: 'a20', assetTag: 'AF-0222', assetName: 'Generator 50kW', category: 'Machinery', department: 'Facilities', expectedLocation: 'East Wing B', currentLocation: 'East Wing B', condition: 'good', verificationStatus: 'damaged', verifiedBy: 'Sarah Johnson', verifiedAt: '2025-07-05T11:30:00Z', notes: 'Oil leak detected, maintenance required' },

  // Facilities (ac2) — Completed
  { id: 'ai7', auditCycleId: 'ac2', assetId: 'a3', assetTag: 'AF-0045', assetName: 'Projector HD 4K', category: 'Electronics', department: 'Facilities', expectedLocation: 'East Wing A', currentLocation: 'East Wing A', condition: 'good', verificationStatus: 'verified', verifiedBy: 'James Wilson', verifiedAt: '2025-06-20T09:00:00Z' },
  { id: 'ai8', auditCycleId: 'ac2', assetId: 'a10', assetTag: 'AF-0112', assetName: 'Conference Table 10-seat', category: 'Furniture', department: 'Marketing', expectedLocation: 'HQ Floor 3', currentLocation: 'HQ Floor 3', condition: 'excellent', verificationStatus: 'verified', verifiedBy: 'James Wilson', verifiedAt: '2025-06-21T10:00:00Z' },
  { id: 'ai9', auditCycleId: 'ac2', assetId: 'a9', assetTag: 'AF-0101', assetName: 'HVAC Unit 5-ton', category: 'Machinery', department: 'Facilities', expectedLocation: 'East Wing B', currentLocation: 'East Wing B', condition: 'good', verificationStatus: 'damaged', verifiedBy: 'James Wilson', verifiedAt: '2025-06-22T14:00:00Z', notes: 'Filter clogged, reduced airflow' },

  // HR Spot Check (ac3) — Draft
  { id: 'ai10', auditCycleId: 'ac3', assetId: 'a2', assetTag: 'AF-0034', assetName: 'Office Chair Ergonomic', category: 'Furniture', department: 'Human Resources', expectedLocation: 'HQ Floor 1', currentLocation: 'HQ Floor 1', condition: 'excellent', verificationStatus: 'pending' },
  { id: 'ai11', auditCycleId: 'ac3', assetId: 'a11', assetTag: 'AF-0123', assetName: 'Laser Printer Color', category: 'Electronics', department: 'Human Resources', expectedLocation: 'HQ Floor 1', currentLocation: 'HQ Floor 1', condition: 'fair', verificationStatus: 'pending' },
  { id: 'ai12', auditCycleId: 'ac3', assetId: 'a18', assetTag: 'AF-0200', assetName: 'Drill Press', category: 'Machinery', department: 'Operations', expectedLocation: 'West Wing', currentLocation: 'West Wing', condition: 'fair', verificationStatus: 'pending' },

  // Finance (ac5) — Active
  { id: 'ai13', auditCycleId: 'ac5', assetId: 'a7', assetTag: 'AF-0089', assetName: 'MacBook Pro 16"', category: 'IT Equipment', department: 'Finance', expectedLocation: 'HQ Floor 2', currentLocation: 'HQ Floor 2', condition: 'excellent', verificationStatus: 'verified', verifiedBy: 'James Wilson', verifiedAt: '2025-07-12T10:00:00Z' },
  { id: 'ai14', auditCycleId: 'ac5', assetId: 'a16', assetTag: 'AF-0178', assetName: 'Monitor 27" 4K', category: 'Electronics', department: 'Finance', expectedLocation: 'HQ Floor 2', currentLocation: 'HQ Floor 2', condition: 'excellent', verificationStatus: 'pending' },
];

// ======== KPI Data (Screen 9) ========
export const MOCK_KPI_DATA: KpiMetric[] = [
  { id: 'kpi1', title: 'Total Assets', value: 248, trend: 5.2, trendDirection: 'up', icon: 'Package', color: 'blue', format: 'number' },
  { id: 'kpi2', title: 'Available Assets', value: 89, trend: -2.1, trendDirection: 'down', icon: 'CheckCircle2', color: 'emerald', format: 'number' },
  { id: 'kpi3', title: 'Allocated Assets', value: 134, trend: 8.4, trendDirection: 'up', icon: 'Users', color: 'blue', format: 'number' },
  { id: 'kpi4', title: 'Maintenance Requests', value: 12, trend: -15.0, trendDirection: 'down', icon: 'Wrench', color: 'amber', format: 'number' },
  { id: 'kpi5', title: 'Under Maintenance', value: 18, trend: 12.5, trendDirection: 'up', icon: 'AlertTriangle', color: 'orange', format: 'number' },
  { id: 'kpi6', title: 'Retired Assets', value: 7, trend: 0, trendDirection: 'neutral', icon: 'Archive', color: 'slate', format: 'number' },
  { id: 'kpi7', title: 'Resource Utilization', value: 78.5, trend: 4.3, trendDirection: 'up', icon: 'BarChart3', color: 'purple', format: 'percentage' },
  { id: 'kpi8', title: 'Avg Asset Life', value: 4.2, trend: -0.3, trendDirection: 'down', icon: 'Clock', color: 'cyan', format: 'days' },
];

// ======== Chart Data ========
export const MOCK_UTILIZATION_DATA: UtilizationChartData[] = [
  { month: 'Jan', allocated: 120, available: 85, maintenance: 15 },
  { month: 'Feb', allocated: 125, available: 80, maintenance: 18 },
  { month: 'Mar', allocated: 118, available: 90, maintenance: 12 },
  { month: 'Apr', allocated: 130, available: 78, maintenance: 20 },
  { month: 'May', allocated: 128, available: 82, maintenance: 16 },
  { month: 'Jun', allocated: 134, available: 75, maintenance: 22 },
  { month: 'Jul', allocated: 140, available: 70, maintenance: 18 },
];

export const MOCK_DEPARTMENT_ALLOCATION: DepartmentAllocationData[] = [
  { department: 'Engineering', total: 52, allocated: 48, utilizationRate: 92.3 },
  { department: 'Facilities', total: 38, allocated: 28, utilizationRate: 73.7 },
  { department: 'HR', total: 25, allocated: 20, utilizationRate: 80.0 },
  { department: 'Finance', total: 30, allocated: 24, utilizationRate: 80.0 },
  { department: 'Marketing', total: 45, allocated: 38, utilizationRate: 84.4 },
  { department: 'Operations', total: 58, allocated: 42, utilizationRate: 72.4 },
];

export const MOCK_MAINTENANCE_FREQUENCY: MaintenanceFrequencyData[] = [
  { category: 'Vehicles', count: 24, cost: 18500 },
  { category: 'IT Equipment', count: 42, cost: 22100 },
  { category: 'Machinery', count: 18, cost: 45600 },
  { category: 'Electronics', count: 35, cost: 12800 },
  { category: 'Networking', count: 15, cost: 9400 },
  { category: 'Furniture', count: 8, cost: 3200 },
];

export const MOCK_LIFECYCLE_DATA: AssetLifecycleData[] = [
  { ageRange: '0-1 years', count: 45, value: 180000 },
  { ageRange: '1-2 years', count: 62, value: 248000 },
  { ageRange: '2-3 years', count: 58, value: 203000 },
  { ageRange: '3-5 years', count: 48, value: 144000 },
  { ageRange: '5-7 years', count: 24, value: 72000 },
  { ageRange: '7+ years', count: 11, value: 22000 },
];

export const MOCK_COST_TREND: CostTrendData[] = [
  { month: 'Jan', maintenance: 4500, repair: 3200, replacement: 8000 },
  { month: 'Feb', maintenance: 5200, repair: 2800, replacement: 12000 },
  { month: 'Mar', maintenance: 4800, repair: 4100, replacement: 6000 },
  { month: 'Apr', maintenance: 6100, repair: 3500, replacement: 9500 },
  { month: 'May', maintenance: 5500, repair: 2900, replacement: 15000 },
  { month: 'Jun', maintenance: 7200, repair: 4800, replacement: 11000 },
];

export const MOCK_TOP_ASSETS: TopAssetData[] = [
  { name: 'Conference Room B2', tag: 'AF-0102', bookings: 142, utilization: 94.7 },
  { name: 'Ford Transit Van', tag: 'AF-0067', bookings: 98, utilization: 87.3 },
  { name: 'Dell Laptop XPS 15', tag: 'AF-0012', bookings: 87, utilization: 82.1 },
  { name: 'Projector HD 4K', tag: 'AF-0045', bookings: 76, utilization: 78.5 },
  { name: 'MacBook Pro 16"', tag: 'AF-0089', bookings: 72, utilization: 75.2 },
];

export const MOCK_LEAST_USED_ASSETS: TopAssetData[] = [
  { name: 'Generator 50kW', tag: 'AF-0222', bookings: 4, utilization: 5.2 },
  { name: 'Drill Press', tag: 'AF-0200', bookings: 8, utilization: 8.7 },
  { name: 'Filing Cabinet', tag: 'AF-0189', bookings: 2, utilization: 3.1 },
  { name: 'Tool Kit Complete', tag: 'AF-0134', bookings: 12, utilization: 14.3 },
  { name: 'Smartboard 86"', tag: 'AF-0211', bookings: 15, utilization: 18.5 },
];

export const MOCK_UPCOMING_MAINTENANCE: UpcomingMaintenanceItem[] = [
  { id: 'm1', assetTag: 'AF-0067', assetName: 'Ford Transit Van', dueDate: '2025-07-15', type: 'Oil Change & Inspection', priority: 'medium' },
  { id: 'm2', assetTag: 'AF-0056', assetName: 'Server Rack 42U', dueDate: '2025-07-18', type: 'Cooling System Service', priority: 'high' },
  { id: 'm3', assetTag: 'AF-0101', assetName: 'HVAC Unit 5-ton', dueDate: '2025-07-20', type: 'Filter Replacement', priority: 'low' },
  { id: 'm4', assetTag: 'AF-0167', assetName: 'Delivery Truck', dueDate: '2025-07-22', type: 'Brake Inspection', priority: 'high' },
  { id: 'm5', assetTag: 'AF-0012', assetName: 'Dell Laptop XPS 15', dueDate: '2025-07-25', type: 'Warranty Check', priority: 'medium' },
];

export const MOCK_NEAR_RETIREMENT: Asset[] = [
  { id: 'a5', tag: 'AF-0067', name: 'Ford Transit Van', category: 'Vehicles', department: 'd6', location: 'Warehouse', status: 'under_maintenance', condition: 'fair', serialNumber: 'SN567890' },
  { id: 'a20', tag: 'AF-0222', name: 'Generator 50kW', category: 'Machinery', department: 'd2', location: 'East Wing B', status: 'allocated', condition: 'good', serialNumber: 'SN024791' },
  { id: 'a18', tag: 'AF-0200', name: 'Drill Press', category: 'Machinery', department: 'd6', location: 'West Wing', status: 'allocated', condition: 'fair', serialNumber: 'SN802579' },
  { id: 'a9', tag: 'AF-0101', name: 'HVAC Unit 5-ton', category: 'Machinery', department: 'd2', location: 'East Wing B', status: 'available', condition: 'good', serialNumber: 'SN012345' },
];

export const MOCK_BOOKING_HEATMAP = [
  { day: 'Mon', hour: '9AM', value: 45 }, { day: 'Mon', hour: '10AM', value: 62 }, { day: 'Mon', hour: '11AM', value: 58 },
  { day: 'Mon', hour: '12PM', value: 35 }, { day: 'Mon', hour: '1PM', value: 48 }, { day: 'Mon', hour: '2PM', value: 72 },
  { day: 'Mon', hour: '3PM', value: 68 }, { day: 'Mon', hour: '4PM', value: 55 }, { day: 'Mon', hour: '5PM', value: 30 },
  { day: 'Tue', hour: '9AM', value: 52 }, { day: 'Tue', hour: '10AM', value: 70 }, { day: 'Tue', hour: '11AM', value: 65 },
  { day: 'Tue', hour: '12PM', value: 40 }, { day: 'Tue', hour: '1PM', value: 55 }, { day: 'Tue', hour: '2PM', value: 78 },
  { day: 'Tue', hour: '3PM', value: 75 }, { day: 'Tue', hour: '4PM', value: 60 }, { day: 'Tue', hour: '5PM', value: 35 },
  { day: 'Wed', hour: '9AM', value: 48 }, { day: 'Wed', hour: '10AM', value: 68 }, { day: 'Wed', hour: '11AM', value: 72 },
  { day: 'Wed', hour: '12PM', value: 42 }, { day: 'Wed', hour: '1PM', value: 58 }, { day: 'Wed', hour: '2PM', value: 80 },
  { day: 'Wed', hour: '3PM', value: 70 }, { day: 'Wed', hour: '4PM', value: 62 }, { day: 'Wed', hour: '5PM', value: 38 },
  { day: 'Thu', hour: '9AM', value: 55 }, { day: 'Thu', hour: '10AM', value: 75 }, { day: 'Thu', hour: '11AM', value: 68 },
  { day: 'Thu', hour: '12PM', value: 38 }, { day: 'Thu', hour: '1PM', value: 52 }, { day: 'Thu', hour: '2PM', value: 74 },
  { day: 'Thu', hour: '3PM', value: 72 }, { day: 'Thu', hour: '4PM', value: 58 }, { day: 'Thu', hour: '5PM', value: 32 },
  { day: 'Fri', hour: '9AM', value: 42 }, { day: 'Fri', hour: '10AM', value: 58 }, { day: 'Fri', hour: '11AM', value: 55 },
  { day: 'Fri', hour: '12PM', value: 30 }, { day: 'Fri', hour: '1PM', value: 45 }, { day: 'Fri', hour: '2PM', value: 60 },
  { day: 'Fri', hour: '3PM', value: 50 }, { day: 'Fri', hour: '4PM', value: 40 }, { day: 'Fri', hour: '5PM', value: 25 },
];

// ======== Notifications (Screen 10) ========
export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'n1', type: 'audit_discrepancy', title: 'Audit Discrepancy Found', message: 'Asset AF-0145 (Wireless Access Point) was not found at expected location HQ Floor 2 during Q3 Engineering audit.', priority: 'high', status: 'unread', entityId: 'ai4', entityType: 'audit_item', createdAt: '2025-07-12T10:30:00Z' },
  { id: 'n2', type: 'overdue_return', title: 'Overdue Return Alert', message: 'Laptop AF-0012 assigned to Priya Shah was due for return on July 8, 2025.', priority: 'high', status: 'unread', entityId: 'a1', entityType: 'asset', createdAt: '2025-07-12T09:00:00Z' },
  { id: 'n3', type: 'maintenance_rejected', title: 'Maintenance Request Rejected', message: 'Your maintenance request for Printer AF-0123 has been rejected. Reason: Under warranty period.', priority: 'high', status: 'read', entityId: 'a11', entityType: 'asset', createdAt: '2025-07-11T14:20:00Z', readAt: '2025-07-11T15:00:00Z' },
  { id: 'n4', type: 'asset_assigned', title: 'New Asset Assigned', message: 'MacBook Pro AF-0089 has been assigned to you. Please acknowledge receipt.', priority: 'medium', status: 'unread', entityId: 'a7', entityType: 'asset', createdAt: '2025-07-12T08:00:00Z' },
  { id: 'n5', type: 'transfer_approved', title: 'Transfer Request Approved', message: 'Your request to transfer Monitor AF-0178 to Finance department has been approved.', priority: 'medium', status: 'read', entityId: 'a16', entityType: 'asset', createdAt: '2025-07-10T16:00:00Z', readAt: '2025-07-10T17:00:00Z' },
  { id: 'n6', type: 'booking_approved', title: 'Room Booking Confirmed', message: 'Your booking for Conference Room B2 on July 15, 2:00 PM - 3:30 PM has been confirmed.', priority: 'low', status: 'read', entityId: 'a10', entityType: 'asset', createdAt: '2025-07-09T11:00:00Z', readAt: '2025-07-09T11:30:00Z' },
  { id: 'n7', type: 'booking_reminder', title: 'Upcoming Booking Reminder', message: 'Reminder: You have Conference Room B2 booked tomorrow at 10:00 AM.', priority: 'medium', status: 'unread', entityId: 'a10', entityType: 'asset', createdAt: '2025-07-12T07:00:00Z' },
  { id: 'n8', type: 'maintenance_approved', title: 'Maintenance Request Approved', message: 'Maintenance request for Server Rack AF-0056 has been approved. Technician will arrive on July 18.', priority: 'low', status: 'archived', entityId: 'a4', entityType: 'asset', createdAt: '2025-07-08T09:00:00Z', readAt: '2025-07-08T10:00:00Z', archivedAt: '2025-07-10T00:00:00Z' },
  { id: 'n9', type: 'booking_cancelled', title: 'Booking Cancelled', message: 'Your booking for Vehicle AF-0067 on July 14 has been cancelled by the administrator.', priority: 'medium', status: 'read', entityId: 'a5', entityType: 'asset', createdAt: '2025-07-11T10:00:00Z', readAt: '2025-07-11T10:30:00Z' },
  { id: 'n10', type: 'transfer_rejected', title: 'Transfer Request Rejected', message: 'Your transfer request for Laptop AF-0012 was rejected. Currently in active audit cycle.', priority: 'medium', status: 'unread', entityId: 'a1', entityType: 'asset', createdAt: '2025-07-12T06:00:00Z' },
  { id: 'n11', type: 'audit_discrepancy', title: 'Damaged Asset Reported', message: 'Generator AF-0222 has been flagged as damaged during facilities audit. Oil leak detected.', priority: 'high', status: 'unread', entityId: 'a20', entityType: 'asset', createdAt: '2025-07-11T18:00:00Z' },
  { id: 'n12', type: 'overdue_return', title: 'Projector Return Overdue', message: 'Projector AF-0045 borrowed by Marketing team was due on July 10.', priority: 'high', status: 'unread', entityId: 'a3', entityType: 'asset', createdAt: '2025-07-11T20:00:00Z' },
];

// ======== Activity Logs ========
export const MOCK_ACTIVITY_LOGS: ActivityLog[] = [
  { id: 'l1', timestamp: '2025-07-12T10:30:00Z', userId: 'u2', userName: 'Sarah Johnson', role: 'asset_manager', action: 'VERIFY_ASSET', entityType: 'audit_item', entityId: 'ai4', module: 'audit', ipAddress: '192.168.1.45', browser: 'Chrome 126.0', description: 'Marked asset AF-0145 as Missing during Q3 Engineering audit', severity: 'warning' },
  { id: 'l2', timestamp: '2025-07-12T10:00:00Z', userId: 'u5', userName: 'James Wilson', role: 'asset_manager', action: 'VERIFY_ASSET', entityType: 'audit_item', entityId: 'ai13', module: 'audit', ipAddress: '192.168.1.62', browser: 'Firefox 128.0', description: 'Verified asset AF-0089 as present in Finance department', severity: 'info' },
  { id: 'l3', timestamp: '2025-07-12T09:00:00Z', userId: 'u1', userName: 'Alex Chen', role: 'admin', action: 'CREATE_AUDIT', entityType: 'audit_cycle', entityId: 'ac5', module: 'audit', ipAddress: '192.168.1.10', browser: 'Chrome 126.0', description: 'Created new audit cycle: Finance Assets Verification', severity: 'info' },
  { id: 'l4', timestamp: '2025-07-11T16:00:00Z', userId: 'u1', userName: 'Alex Chen', role: 'admin', action: 'APPROVE_TRANSFER', entityType: 'asset', entityId: 'a16', module: 'allocation', ipAddress: '192.168.1.10', browser: 'Chrome 126.0', description: 'Approved transfer of Monitor AF-0178 to Finance department', severity: 'info' },
  { id: 'l5', timestamp: '2025-07-11T14:20:00Z', userId: 'u2', userName: 'Sarah Johnson', role: 'asset_manager', action: 'REJECT_MAINTENANCE', entityType: 'asset', entityId: 'a11', module: 'maintenance', ipAddress: '192.168.1.45', browser: 'Chrome 126.0', description: 'Rejected maintenance request for Printer AF-0123 - under warranty', severity: 'warning' },
  { id: 'l6', timestamp: '2025-07-11T10:00:00Z', userId: 'u1', userName: 'Alex Chen', role: 'admin', action: 'CANCEL_BOOKING', entityType: 'booking', entityId: 'bk1', module: 'booking', ipAddress: '192.168.1.10', browser: 'Chrome 126.0', description: 'Cancelled vehicle booking AF-0067 for July 14', severity: 'info' },
  { id: 'l7', timestamp: '2025-07-10T18:00:00Z', userId: 'u5', userName: 'James Wilson', role: 'asset_manager', action: 'FLAG_DISCREPANCY', entityType: 'audit_item', entityId: 'ai9', module: 'audit', ipAddress: '192.168.1.62', browser: 'Firefox 128.0', description: 'Flagged asset AF-0222 as damaged during facilities audit', severity: 'warning' },
  { id: 'l8', timestamp: '2025-07-10T09:00:00Z', userId: 'u1', userName: 'Alex Chen', role: 'admin', action: 'ASSIGN_ROLE', entityType: 'user', entityId: 'u10', module: 'organization', ipAddress: '192.168.1.10', browser: 'Chrome 126.0', description: 'Promoted Anna Martinez to Asset Manager role', severity: 'critical' },
  { id: 'l9', timestamp: '2025-07-09T11:00:00Z', userId: 'u3', userName: 'Mike Ross', role: 'department_head', action: 'CREATE_BOOKING', entityType: 'booking', entityId: 'bk2', module: 'booking', ipAddress: '192.168.1.33', browser: 'Safari 17.5', description: 'Booked Conference Room B2 for July 15, 2:00 PM - 3:30 PM', severity: 'info' },
  { id: 'l10', timestamp: '2025-07-08T14:00:00Z', userId: 'u4', userName: 'Priya Shah', role: 'employee', action: 'SUBMIT_MAINTENANCE', entityType: 'asset', entityId: 'a11', module: 'maintenance', ipAddress: '192.168.1.48', browser: 'Chrome 126.0', description: 'Submitted maintenance request for Printer AF-0123', severity: 'info' },
  { id: 'l11', timestamp: '2025-07-08T09:00:00Z', userId: 'u2', userName: 'Sarah Johnson', role: 'asset_manager', action: 'APPROVE_MAINTENANCE', entityType: 'asset', entityId: 'a4', module: 'maintenance', ipAddress: '192.168.1.45', browser: 'Chrome 126.0', description: 'Approved maintenance for Server Rack AF-0056', severity: 'info' },
  { id: 'l12', timestamp: '2025-07-07T11:00:00Z', userId: 'u1', userName: 'Alex Chen', role: 'admin', action: 'REGISTER_ASSET', entityType: 'asset', entityId: 'a20', module: 'assets', ipAddress: '192.168.1.10', browser: 'Chrome 126.0', description: 'Registered new asset: Generator 50kW (AF-0222)', severity: 'info' },
  { id: 'l13', timestamp: '2025-07-06T16:00:00Z', userId: 'u1', userName: 'Alex Chen', role: 'admin', action: 'CLOSE_AUDIT', entityType: 'audit_cycle', entityId: 'ac2', module: 'audit', ipAddress: '192.168.1.10', browser: 'Chrome 126.0', description: 'Closed Annual Facilities Review audit cycle', severity: 'critical' },
  { id: 'l14', timestamp: '2025-07-05T11:30:00Z', userId: 'u2', userName: 'Sarah Johnson', role: 'asset_manager', action: 'VERIFY_ASSET', entityType: 'audit_item', entityId: 'ai6', module: 'audit', ipAddress: '192.168.1.45', browser: 'Chrome 126.0', description: 'Marked Generator AF-0222 as Damaged - oil leak detected', severity: 'warning' },
  { id: 'l15', timestamp: '2025-07-04T10:00:00Z', userId: 'u9', userName: 'Robert Taylor', role: 'asset_manager', action: 'VERIFY_ASSET', entityType: 'audit_item', entityId: 'ai5', module: 'audit', ipAddress: '192.168.1.91', browser: 'Edge 126.0', description: 'Verified UPS AF-0156 as present and in excellent condition', severity: 'info' },
  { id: 'l16', timestamp: '2025-07-03T14:00:00Z', userId: 'u2', userName: 'Sarah Johnson', role: 'asset_manager', action: 'FLAG_DISCREPANCY', entityType: 'audit_item', entityId: 'ai4', module: 'audit', ipAddress: '192.168.1.45', browser: 'Chrome 126.0', description: 'Asset AF-0145 not found at expected location HQ Floor 2', severity: 'warning' },
  { id: 'l17', timestamp: '2025-07-02T10:30:00Z', userId: 'u2', userName: 'Sarah Johnson', role: 'asset_manager', action: 'VERIFY_ASSET', entityType: 'audit_item', entityId: 'ai1', module: 'audit', ipAddress: '192.168.1.45', browser: 'Chrome 126.0', description: 'Verified Dell Laptop AF-0012 at HQ Floor 2', severity: 'info' },
  { id: 'l18', timestamp: '2025-07-01T08:00:00Z', userId: 'u1', userName: 'Alex Chen', role: 'admin', action: 'CREATE_AUDIT', entityType: 'audit_cycle', entityId: 'ac1', module: 'audit', ipAddress: '192.168.1.10', browser: 'Chrome 126.0', description: 'Created Q3 2025 Engineering Dept Audit cycle', severity: 'info' },
  { id: 'l19', timestamp: '2025-06-28T16:30:00Z', userId: 'u5', userName: 'James Wilson', role: 'asset_manager', action: 'CLOSE_AUDIT', entityType: 'audit_cycle', entityId: 'ac2', module: 'audit', ipAddress: '192.168.1.62', browser: 'Firefox 128.0', description: 'Closed Annual Facilities Review - 1 discrepancy found', severity: 'critical' },
  { id: 'l20', timestamp: '2025-06-25T09:00:00Z', userId: 'u1', userName: 'Alex Chen', role: 'admin', action: 'UPDATE_ASSET', entityType: 'asset', entityId: 'a5', module: 'assets', ipAddress: '192.168.1.10', browser: 'Chrome 126.0', description: 'Updated Ford Transit Van status to Under Maintenance', severity: 'info' },
];
