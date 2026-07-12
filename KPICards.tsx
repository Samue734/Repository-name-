import { Package, Monitor, Wrench, Calendar, ArrowLeftRight, Clock } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { kpiData } from '@/data/dashboardData';

const iconMap: Record<string, React.ElementType> = {
  Package,
  Monitor,
  Wrench,
  Calendar,
  ArrowLeftRight,
  Clock,
};

const statusColors: Record<string, { bg: string; text: string }> = {
  positive: { bg: 'bg-success/10', text: 'text-success' },
  active: { bg: 'bg-royal/10', text: 'text-royal' },
  warning: { bg: 'bg-warning/10', text: 'text-warning' },
  pending: { bg: 'bg-warning/10', text: 'text-warning' },
  upcoming: { bg: 'bg-navy-600/10', text: 'text-navy-600' },
  neutral: { bg: 'bg-navy-600/10', text: 'text-navy-600' },
};

export default function KPICards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6 gap-6">
      {kpiData.map((kpi) => {
        const Icon = iconMap[kpi.icon] || Package;
        const colors = statusColors[kpi.status];
        const sparklinePoints = kpi.sparklineData.map((value, index) => ({ index, value }));

        return (
          <div
            key={kpi.title}
            className="bg-white rounded-2xl border border-border-light p-6 hover:shadow-card-hover transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <span className="text-caption text-navy-600 uppercase tracking-wide">{kpi.title}</span>
              <div className={`w-8 h-8 rounded-lg ${colors.bg} flex items-center justify-center`}>
                <Icon size={18} className={colors.text} />
              </div>
            </div>
            
            <div className="flex items-end justify-between">
              <span className="text-h1 text-navy-900">{kpi.value.toLocaleString()}</span>
              <div className="w-[60px] h-[30px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sparklinePoints}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={kpi.status === 'positive' ? '#10B981' : kpi.status === 'warning' ? '#F59E0B' : '#1E6AF8'}
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
