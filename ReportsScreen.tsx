// ============================================================
// AssetFlow ERP — Screen 9: Reports & Analytics Dashboard
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { KpiCard } from '@/components/shared/KpiCard';
import { ExportButton } from '@/components/shared/ExportButton';
import { CHART_COLORS } from '@/lib/constants';
import { useReports } from '@/hooks/useReports';
import {
  UtilizationChart, DepartmentAllocationChart,
  MaintenanceFrequencyChart, LifecycleChart,
  CostTrendChart, BookingHeatmap, TopAssetsList,
  UpcomingMaintenanceList,
} from '@/components/reports/ReportCharts';
import { StatusChip } from '@/components/shared/StatusChip';
import {
  Filter, RotateCcw, Calendar, Building2, Package,
  MapPin, Activity,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function ReportsScreen() {
  const reports = useReports();
  const [showFilters, setShowFilters] = useState(false);

  const toggleDepartment = (id: string) => {
    const current = reports.filters.departments;
    reports.setFilters({
      departments: current.includes(id) ? current.filter(d => d !== id) : [...current, id],
    });
  };

  const toggleCategory = (cat: string) => {
    const current = reports.filters.categories;
    reports.setFilters({
      categories: current.includes(cat) ? current.filter(c => c !== cat) : [...current, cat],
    });
  };

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Comprehensive operational insights across your asset portfolio"
      >
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2 text-[12px] font-medium border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <Filter className="w-3.5 h-3.5" />
            Filters
            {(reports.filters.departments.length > 0 || reports.filters.categories.length > 0) && (
              <Badge variant="secondary" className="ml-1 h-4 min-w-4 px-1 text-[10px]">
                {reports.filters.departments.length + reports.filters.categories.length}
              </Badge>
            )}
          </Button>
          <ExportButton onExport={reports.exportReport} isExporting={reports.isExporting} />
          <Button
            variant="outline"
            size="sm"
            onClick={reports.resetFilters}
            className="gap-2 text-[12px] font-medium border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </Button>
        </div>
      </PageHeader>

      {/* Filter Panel */}
      {showFilters && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="bg-white rounded-xl border border-slate-200/80 p-4 space-y-3"
        >
          <div className="flex items-center gap-2 text-[12px] text-slate-500 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span className="font-medium">Date Range</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
                <Building2 className="w-3 h-3" /> Departments
              </label>
              <div className="flex flex-wrap gap-1">
                {reports.departments.map(d => (
                  <button
                    key={d.id}
                    onClick={() => toggleDepartment(d.id)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium border transition-all ${
                      reports.filters.departments.includes(d.id)
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {d.name}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
                <Package className="w-3 h-3" /> Categories
              </label>
              <div className="flex flex-wrap gap-1">
                {reports.categories.map(c => (
                  <button
                    key={c}
                    onClick={() => toggleCategory(c)}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium border transition-all ${
                      reports.filters.categories.includes(c)
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[11px] font-semibold text-slate-600 flex items-center gap-1.5">
                <MapPin className="w-3 h-3" /> Locations
              </label>
              <div className="flex flex-wrap gap-1">
                {reports.locations.slice(0, 6).map(l => (
                  <button
                    key={l}
                    onClick={() => {
                      const current = reports.filters.locations;
                      reports.setFilters({
                        locations: current.includes(l) ? current.filter(v => v !== l) : [...current, l],
                      });
                    }}
                    className={`px-2 py-1 rounded-md text-[11px] font-medium border transition-all ${
                      reports.filters.locations.includes(l)
                        ? 'bg-blue-50 border-blue-200 text-blue-700'
                        : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {reports.kpiData.map((kpi, i) => (
          <KpiCard
            key={kpi.id}
            title={kpi.title}
            value={kpi.value}
            trend={kpi.trend}
            trendDirection={kpi.trendDirection}
            icon={kpi.icon}
            color={kpi.color}
            format={kpi.format}
            index={i}
          />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <UtilizationChart data={reports.utilizationData} />
        <DepartmentAllocationChart data={reports.departmentAllocation} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <MaintenanceFrequencyChart data={reports.maintenanceFrequency} />
        <BookingHeatmap data={reports.bookingHeatmap} />
      </div>

      {/* Charts Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LifecycleChart data={reports.lifecycleData} />
        <CostTrendChart data={reports.costTrend} />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <TopAssetsList
          title="Most Used Assets"
          subtitle="Highest utilization rate"
          data={reports.topAssets}
          color={CHART_COLORS.secondary}
        />
        <TopAssetsList
          title="Least Used Assets"
          subtitle="Consider redeployment"
          data={reports.leastUsedAssets}
          color={CHART_COLORS.danger}
        />
        <UpcomingMaintenanceList data={reports.upcomingMaintenance} />
      </div>

      {/* Near Retirement */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="bg-white rounded-xl border border-slate-200/80 p-5"
      >
        <h4 className="text-[13px] font-semibold text-slate-700 mb-0.5">Assets Near Retirement</h4>
        <p className="text-[11px] text-slate-400 mb-4">Assets approaching end of useful life</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {reports.nearRetirement.map(asset => (
            <div key={asset.id} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 hover:border-slate-200 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                <Activity className="w-4 h-4 text-amber-500" />
              </div>
              <div className="min-w-0">
                <p className="text-[12px] font-medium text-slate-700 truncate">{asset.name}</p>
                <p className="text-[11px] text-slate-400 font-mono">{asset.tag}</p>
                <StatusChip status={asset.status} variant="asset" size="sm" />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
