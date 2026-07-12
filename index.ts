export type UserRole = 'admin' | 'asset_manager' | 'department_head' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  department?: string;
}

export interface NavItem {
  label: string;
  icon: string;
  href: string;
  roles?: UserRole[];
}

export interface KPIData {
  title: string;
  value: string | number;
  icon: string;
  status: 'positive' | 'active' | 'warning' | 'pending' | 'upcoming' | 'neutral';
  sparklineData: number[];
}

export interface OverdueReturn {
  assetTag: string;
  assetName: string;
  employee: string;
  expectedReturn: string;
  daysOverdue: number;
}

export interface UpcomingReturn {
  employee: string;
  avatar: string;
  asset: string;
  returnDate: string;
}

export interface ActivityItem {
  id: string;
  text: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  icon: string;
  read: boolean;
  time: string;
}

export interface AssetStatus {
  name: string;
  value: number;
  color: string;
}

export interface MonthlyTrend {
  month: string;
  added: number;
  disposed: number;
}
