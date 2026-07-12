// ============================================================
// AssetFlow ERP — Reports & Analytics Hook
// ============================================================

import { useState, useCallback, useMemo } from 'react';
import type { ReportFilters, KpiMetric } from '@/types';
import {
  MOCK_KPI_DATA,
  MOCK_UTILIZATION_DATA,
  MOCK_DEPARTMENT_ALLOCATION,
  MOCK_MAINTENANCE_FREQUENCY,
  MOCK_LIFECYCLE_DATA,
  MOCK_COST_TREND,
  MOCK_TOP_ASSETS,
  MOCK_LEAST_USED_ASSETS,
  MOCK_UPCOMING_MAINTENANCE,
  MOCK_NEAR_RETIREMENT,
  MOCK_BOOKING_HEATMAP,
  MOCK_DEPARTMENTS,
  MOCK_CATEGORIES,
  MOCK_LOCATIONS,
} from '@/lib/mockData';

export interface UseReportsReturn {
  // Data
  kpiData: KpiMetric[];
  utilizationData: typeof MOCK_UTILIZATION_DATA;
  departmentAllocation: typeof MOCK_DEPARTMENT_ALLOCATION;
  maintenanceFrequency: typeof MOCK_MAINTENANCE_FREQUENCY;
  lifecycleData: typeof MOCK_LIFECYCLE_DATA;
  costTrend: typeof MOCK_COST_TREND;
  topAssets: typeof MOCK_TOP_ASSETS;
  leastUsedAssets: typeof MOCK_LEAST_USED_ASSETS;
  upcomingMaintenance: typeof MOCK_UPCOMING_MAINTENANCE;
  nearRetirement: typeof MOCK_NEAR_RETIREMENT;
  bookingHeatmap: typeof MOCK_BOOKING_HEATMAP;
  
  // Filters
  filters: ReportFilters;
  departments: typeof MOCK_DEPARTMENTS;
  categories: typeof MOCK_CATEGORIES;
  locations: typeof MOCK_LOCATIONS;
  
  // Actions
  setFilters: (filters: Partial<ReportFilters>) => void;
  resetFilters: () => void;
  exportReport: (format: 'pdf' | 'excel' | 'csv') => Promise<void>;
  
  // Loading
  isExporting: boolean;
  
  // Availability
  assetStatuses: string[];
}

const DEFAULT_FILTERS: ReportFilters = {
  dateRange: null,
  departments: [],
  categories: [],
  locations: [],
  assetStatus: [],
};

const ASSET_STATUSES = [
  'available', 'allocated', 'reserved', 'under_maintenance', 'lost', 'retired', 'disposed',
];

export function useReports(): UseReportsReturn {
  const [filters, setFiltersState] = useState<ReportFilters>(DEFAULT_FILTERS);
  const [isExporting, setIsExporting] = useState(false);

  const setFilters = useCallback((partial: Partial<ReportFilters>) => {
    setFiltersState(prev => ({ ...prev, ...partial }));
  }, []);

  const resetFilters = useCallback(() => {
    setFiltersState(DEFAULT_FILTERS);
  }, []);

  const exportReport = useCallback(async (_format: 'pdf' | 'excel' | 'csv') => {
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsExporting(false);
  }, []);

  // Simulated filtered data - in real app would filter based on selections
  const filteredKpiData = useMemo(() => {
    return MOCK_KPI_DATA;
  }, []);

  return {
    kpiData: filteredKpiData,
    utilizationData: MOCK_UTILIZATION_DATA,
    departmentAllocation: MOCK_DEPARTMENT_ALLOCATION,
    maintenanceFrequency: MOCK_MAINTENANCE_FREQUENCY,
    lifecycleData: MOCK_LIFECYCLE_DATA,
    costTrend: MOCK_COST_TREND,
    topAssets: MOCK_TOP_ASSETS,
    leastUsedAssets: MOCK_LEAST_USED_ASSETS,
    upcomingMaintenance: MOCK_UPCOMING_MAINTENANCE,
    nearRetirement: MOCK_NEAR_RETIREMENT,
    bookingHeatmap: MOCK_BOOKING_HEATMAP,
    filters,
    departments: MOCK_DEPARTMENTS,
    categories: MOCK_CATEGORIES,
    locations: MOCK_LOCATIONS,
    setFilters,
    resetFilters,
    exportReport,
    isExporting,
    assetStatuses: ASSET_STATUSES,
  };
}
