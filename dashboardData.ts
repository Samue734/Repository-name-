import type { KPIData, OverdueReturn, UpcomingReturn, ActivityItem, NotificationItem, AssetStatus, MonthlyTrend } from '@/types';

export const kpiData: KPIData[] = [
  {
    title: 'Assets Available',
    value: 1248,
    icon: 'Package',
    status: 'positive',
    sparklineData: [1200, 1180, 1220, 1210, 1240, 1235, 1248],
  },
  {
    title: 'Assets Allocated',
    value: 842,
    icon: 'Monitor',
    status: 'active',
    sparklineData: [800, 810, 820, 830, 835, 840, 842],
  },
  {
    title: 'Maintenance Today',
    value: 17,
    icon: 'Wrench',
    status: 'warning',
    sparklineData: [12, 15, 10, 18, 14, 16, 17],
  },
  {
    title: 'Active Bookings',
    value: 36,
    icon: 'Calendar',
    status: 'active',
    sparklineData: [30, 32, 28, 35, 34, 33, 36],
  },
  {
    title: 'Pending Transfers',
    value: 11,
    icon: 'ArrowLeftRight',
    status: 'pending',
    sparklineData: [8, 10, 12, 9, 11, 10, 11],
  },
  {
    title: 'Upcoming Returns',
    value: 23,
    icon: 'Clock',
    status: 'upcoming',
    sparklineData: [20, 22, 25, 21, 24, 22, 23],
  },
];

export const overdueReturns: OverdueReturn[] = [
  {
    assetTag: '#AST-2041',
    assetName: 'Dell XPS 15',
    employee: 'Sarah Chen',
    expectedReturn: 'Jun 24, 2026',
    daysOverdue: 18,
  },
  {
    assetTag: '#AST-1892',
    assetName: 'Logitech Webcam',
    employee: 'Mike Ross',
    expectedReturn: 'Jun 28, 2026',
    daysOverdue: 14,
  },
  {
    assetTag: '#AST-2156',
    assetName: 'MacBook Air M2',
    employee: 'Lisa Park',
    expectedReturn: 'Jun 30, 2026',
    daysOverdue: 12,
  },
  {
    assetTag: '#AST-1783',
    assetName: 'Samsung Monitor 27"',
    employee: 'Tom Bradley',
    expectedReturn: 'Jul 2, 2026',
    daysOverdue: 10,
  },
];

export const upcomingReturns: UpcomingReturn[] = [
  {
    employee: 'James Wilson',
    avatar: 'JW',
    asset: 'MacBook Pro M3',
    returnDate: 'Jul 18, 2026',
  },
  {
    employee: 'Emily Zhang',
    avatar: 'EZ',
    asset: 'iPad Air',
    returnDate: 'Jul 20, 2026',
  },
  {
    employee: 'David Kim',
    avatar: 'DK',
    asset: 'Standing Desk',
    returnDate: 'Jul 22, 2026',
  },
  {
    employee: 'Anna Lopez',
    avatar: 'AL',
    asset: 'Dell UltraSharp',
    returnDate: 'Jul 24, 2026',
  },
];

export const recentActivity: ActivityItem[] = [
  {
    id: '1',
    text: 'MacBook Pro assigned to Sarah Chen',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    text: 'Asset transfer #4821 approved by Dept Head',
    timestamp: '5 hours ago',
  },
  {
    id: '3',
    text: 'Maintenance request #129 completed',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    text: 'New asset Dell XPS 17 registered',
    timestamp: '1 day ago',
  },
  {
    id: '5',
    text: 'Conference Room B booking confirmed',
    timestamp: '2 days ago',
  },
];

export const notifications: NotificationItem[] = [
  {
    id: '1',
    title: 'Asset Assigned',
    message: 'Dell Monitor has been assigned to you.',
    icon: 'Package',
    read: false,
    time: '10 min ago',
  },
  {
    id: '2',
    title: 'Booking Reminder',
    message: 'Conference Room A booking starts in 15 mins.',
    icon: 'Calendar',
    read: false,
    time: '15 min ago',
  },
  {
    id: '3',
    title: 'Transfer Pending',
    message: 'Approval needed for asset transfer #4821.',
    icon: 'ArrowLeftRight',
    read: true,
    time: '1 hour ago',
  },
  {
    id: '4',
    title: 'Maintenance Complete',
    message: 'Your laptop maintenance has been completed.',
    icon: 'Wrench',
    read: true,
    time: '3 hours ago',
  },
];

export const assetStatusData: AssetStatus[] = [
  { name: 'Available', value: 1248, color: '#10B981' },
  { name: 'Allocated', value: 842, color: '#1E6AF8' },
  { name: 'Reserved', value: 156, color: '#4B5563' },
  { name: 'Under Maintenance', value: 89, color: '#F59E0B' },
  { name: 'Lost', value: 12, color: '#EF4444' },
  { name: 'Retired', value: 234, color: '#E2E8F0' },
  { name: 'Disposed', value: 178, color: '#0C111D' },
];

export const lifecycleTrends: MonthlyTrend[] = [
  { month: 'Jan', added: 145, disposed: 32 },
  { month: 'Feb', added: 132, disposed: 28 },
  { month: 'Mar', added: 178, disposed: 45 },
  { month: 'Apr', added: 156, disposed: 38 },
  { month: 'May', added: 189, disposed: 52 },
  { month: 'Jun', added: 167, disposed: 41 },
  { month: 'Jul', added: 198, disposed: 48 },
  { month: 'Aug', added: 175, disposed: 55 },
  { month: 'Sep', added: 210, disposed: 62 },
  { month: 'Oct', added: 188, disposed: 49 },
  { month: 'Nov', added: 156, disposed: 38 },
  { month: 'Dec', added: 142, disposed: 35 },
];
