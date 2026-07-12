// ============================================================
// AssetFlow ERP — Report Charts Collection
// ============================================================

import { motion } from 'framer-motion';
import {
  AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { CHART_COLORS } from '@/lib/constants';

// --- Asset Utilization Chart ---
interface UtilizationChartProps {
  data: { month: string; allocated: number; available: number; maintenance: number }[];
}

export function UtilizationChart({ data }: UtilizationChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="bg-white rounded-xl border border-slate-200/80 p-5"
    >
      <h4 className="text-[13px] font-semibold text-slate-700 mb-1">Asset Utilization Trend</h4>
      <p className="text-[11px] text-slate-400 mb-4">Monthly allocation vs availability</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="allocGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.15} />
                <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="availGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.secondary} stopOpacity={0.15} />
                <stop offset="95%" stopColor={CHART_COLORS.secondary} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
            />
            <Legend iconType="circle" iconSize={8} formatter={(v: string) => <span className="text-[11px] text-slate-600 ml-1">{v}</span>} />
            <Area type="monotone" dataKey="allocated" name="Allocated" stroke={CHART_COLORS.primary} fill="url(#allocGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="available" name="Available" stroke={CHART_COLORS.secondary} fill="url(#availGrad)" strokeWidth={2} />
            <Area type="monotone" dataKey="maintenance" name="Maintenance" stroke={CHART_COLORS.warning} fill="transparent" strokeWidth={2} strokeDasharray="4 4" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// --- Department Allocation Chart ---
interface DeptAllocChartProps {
  data: { department: string; total: number; allocated: number; utilizationRate: number }[];
}

export function DepartmentAllocationChart({ data }: DeptAllocChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.15 }}
      className="bg-white rounded-xl border border-slate-200/80 p-5"
    >
      <h4 className="text-[13px] font-semibold text-slate-700 mb-1">Department Allocation</h4>
      <p className="text-[11px] text-slate-400 mb-4">Assets allocated per department</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
            <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis type="category" dataKey="department" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={80} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            <Legend iconType="circle" iconSize={8} formatter={(v: string) => <span className="text-[11px] text-slate-600 ml-1">{v}</span>} />
            <Bar dataKey="allocated" name="Allocated" fill={CHART_COLORS.primary} radius={[0, 4, 4, 0]} barSize={16} />
            <Bar dataKey="total" name="Total" fill={CHART_COLORS.gray} radius={[0, 4, 4, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// --- Maintenance Frequency Chart ---
interface MaintFreqChartProps {
  data: { category: string; count: number; cost: number }[];
}

export function MaintenanceFrequencyChart({ data }: MaintFreqChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="bg-white rounded-xl border border-slate-200/80 p-5"
    >
      <h4 className="text-[13px] font-semibold text-slate-700 mb-1">Maintenance Frequency</h4>
      <p className="text-[11px] text-slate-400 mb-4">Requests by category</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            <Legend iconType="circle" iconSize={8} formatter={(v: string) => <span className="text-[11px] text-slate-600 ml-1">{v}</span>} />
            <Bar dataKey="count" name="Requests" fill={CHART_COLORS.warning} radius={[4, 4, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// --- Asset Lifecycle Chart ---
interface LifecycleChartProps {
  data: { ageRange: string; count: number; value: number }[];
}

export function LifecycleChart({ data }: LifecycleChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.25 }}
      className="bg-white rounded-xl border border-slate-200/80 p-5"
    >
      <h4 className="text-[13px] font-semibold text-slate-700 mb-1">Asset Age Distribution</h4>
      <p className="text-[11px] text-slate-400 mb-4">Assets by age range</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="ageRange" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} />
            <Bar dataKey="count" name="Asset Count" fill={CHART_COLORS.purple} radius={[4, 4, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// --- Cost Trend Chart ---
interface CostTrendChartProps {
  data: { month: string; maintenance: number; repair: number; replacement: number }[];
}

export function CostTrendChart({ data }: CostTrendChartProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="bg-white rounded-xl border border-slate-200/80 p-5"
    >
      <h4 className="text-[13px] font-semibold text-slate-700 mb-1">Maintenance Cost Trend</h4>
      <p className="text-[11px] text-slate-400 mb-4">Monthly costs by type ($)</p>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '1px solid #e2e8f0' }} formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
            <Legend iconType="circle" iconSize={8} formatter={(v: string) => <span className="text-[11px] text-slate-600 ml-1">{v}</span>} />
            <Area type="monotone" dataKey="maintenance" name="Preventive" stackId="1" stroke={CHART_COLORS.primary} fill={CHART_COLORS.primaryLight} fillOpacity={0.6} strokeWidth={2} />
            <Area type="monotone" dataKey="repair" name="Repair" stackId="1" stroke={CHART_COLORS.danger} fill="#fca5a5" fillOpacity={0.6} strokeWidth={2} />
            <Area type="monotone" dataKey="replacement" name="Replacement" stackId="1" stroke={CHART_COLORS.warning} fill={CHART_COLORS.warning} fillOpacity={0.4} strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

// --- Booking Heatmap ---
interface BookingHeatmapProps {
  data: { day: string; hour: string; value: number }[];
}

export function BookingHeatmap({ data }: BookingHeatmapProps) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const hours = ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM'];
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="bg-white rounded-xl border border-slate-200/80 p-5"
    >
      <h4 className="text-[13px] font-semibold text-slate-700 mb-1">Resource Booking Heatmap</h4>
      <p className="text-[11px] text-slate-400 mb-4">Peak usage windows (bookings/hour)</p>
      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          {/* Header */}
          <div className="grid grid-cols-[60px_repeat(9,1fr)] gap-1 mb-1">
            <div></div>
            {hours.map(h => (
              <div key={h} className="text-[10px] text-center text-slate-400 font-medium">{h}</div>
            ))}
          </div>
          {/* Rows */}
          {days.map(day => (
            <div key={day} className="grid grid-cols-[60px_repeat(9,1fr)] gap-1 mb-1">
              <div className="text-[11px] text-slate-500 font-medium flex items-center">{day}</div>
              {hours.map(hour => {
                const cell = data.find(d => d.day === day && d.hour === hour);
                const value = cell?.value || 0;
                const intensity = maxValue > 0 ? value / maxValue : 0;
                const bgColor = intensity === 0 ? '#f8fafc' : `rgba(37, 99, 235, ${0.1 + intensity * 0.85})`;
                return (
                  <div
                    key={hour}
                    className="h-8 rounded flex items-center justify-center text-[10px] font-medium transition-colors hover:ring-2 hover:ring-blue-300"
                    style={{ backgroundColor: bgColor, color: intensity > 0.5 ? 'white' : '#64748b' }}
                    title={`${day} ${hour}: ${value} bookings`}
                  >
                    {value > 0 ? value : ''}
                  </div>
                );
              })}
            </div>
          ))}
          {/* Legend */}
          <div className="flex items-center gap-2 mt-3 justify-end">
            <span className="text-[10px] text-slate-400">Low</span>
            <div className="flex gap-0.5">
              {[0.2, 0.4, 0.6, 0.8, 1].map(i => (
                <div key={i} className="w-4 h-3 rounded-sm" style={{ backgroundColor: `rgba(37, 99, 235, ${0.1 + i * 0.85})` }} />
              ))}
            </div>
            <span className="text-[10px] text-slate-400">High</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// --- Top Assets List ---
interface TopAssetsProps {
  title: string;
  subtitle: string;
  data: { name: string; tag: string; bookings: number; utilization: number }[];
  color: string;
}

export function TopAssetsList({ title, subtitle, data, color }: TopAssetsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="bg-white rounded-xl border border-slate-200/80 p-5"
    >
      <h4 className="text-[13px] font-semibold text-slate-700 mb-0.5">{title}</h4>
      <p className="text-[11px] text-slate-400 mb-4">{subtitle}</p>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={item.tag} className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-slate-300 w-5">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-slate-700 truncate">{item.name}</p>
              <p className="text-[11px] text-slate-400 font-mono">{item.tag}</p>
            </div>
            <div className="text-right">
              <p className="text-[12px] font-semibold" style={{ color }}>{item.utilization}%</p>
              <p className="text-[10px] text-slate-400">{item.bookings} bookings</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// --- Upcoming Maintenance List ---
interface UpcomingMaintProps {
  data: { id: string; assetTag: string; assetName: string; dueDate: string; type: string; priority: 'high' | 'medium' | 'low' }[];
}

export function UpcomingMaintenanceList({ data }: UpcomingMaintProps) {
  const priorityColors = { high: 'text-red-600 bg-red-50', medium: 'text-amber-600 bg-amber-50', low: 'text-blue-600 bg-blue-50' };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.45 }}
      className="bg-white rounded-xl border border-slate-200/80 p-5"
    >
      <h4 className="text-[13px] font-semibold text-slate-700 mb-0.5">Upcoming Maintenance</h4>
      <p className="text-[11px] text-slate-400 mb-4">Assets due for service</p>
      <div className="space-y-3">
        {data.map(item => (
          <div key={item.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-slate-700 truncate">{item.assetName}</p>
              <p className="text-[11px] text-slate-400 font-mono">{item.assetTag} · {item.type}</p>
            </div>
            <div className="text-right shrink-0">
              <span className={cn('text-[10px] font-medium px-2 py-0.5 rounded-full', priorityColors[item.priority])}>
                {item.priority}
              </span>
              <p className="text-[10px] text-slate-400 mt-1">Due {item.dueDate}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

import { cn } from '@/lib/utils';
