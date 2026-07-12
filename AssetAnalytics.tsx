import { useState } from 'react';
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { assetStatusData, lifecycleTrends } from '@/data/dashboardData';
import { ChevronDown } from 'lucide-react';

const departmentOptions = ['All Departments', 'Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];

const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white rounded-lg shadow-card border border-border-light px-4 py-3">
        <p className="text-sm font-medium text-navy-900">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm text-navy-600 mt-1">
            {index === 0 ? 'Added' : 'Disposed'}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AssetAnalytics() {
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [showDeptDropdown, setShowDeptDropdown] = useState(false);

  const totalAssets = assetStatusData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Asset Status Distribution */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-h3 text-navy-900">Asset Status Distribution</h2>
          <div className="relative">
            <button
              onClick={() => setShowDeptDropdown(!showDeptDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-light text-sm text-navy-700 hover:bg-surface-grey transition-colors"
            >
              {selectedDept}
              <ChevronDown size={16} />
            </button>
            {showDeptDropdown && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg border border-border-light shadow-card z-10">
                {departmentOptions.map((dept) => (
                  <button
                    key={dept}
                    onClick={() => { setSelectedDept(dept); setShowDeptDropdown(false); }}
                    className="w-full text-left px-3 py-2 text-sm text-navy-700 hover:bg-surface-grey first:rounded-t-lg last:rounded-b-lg transition-colors"
                  >
                    {dept}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-8">
          {/* Donut Chart */}
          <div className="w-[200px] h-[200px] flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={assetStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {assetStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex-1 space-y-2.5">
            {assetStatusData.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-navy-600 flex-1">{item.name}</span>
                <span className="text-sm font-semibold text-navy-900">{item.value.toLocaleString()}</span>
                <span className="text-caption text-navy-600 w-12 text-right">
                  {((item.value / totalAssets) * 100).toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Lifecycle Trends */}
      <div className="bg-white rounded-2xl border border-border-light p-6">
        <h2 className="text-h3 text-navy-900 mb-6">Asset Lifecycle Trends</h2>
        
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lifecycleTrends} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" vertical={true} horizontal={true} />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#4B5563', fontSize: 12 }} 
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#4B5563', fontSize: 12 }} 
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="added"
                stroke="#1E6AF8"
                strokeWidth={2}
                fill="rgba(30, 106, 248, 0.1)"
              />
              <Area
                type="monotone"
                dataKey="disposed"
                stroke="#4B5563"
                strokeWidth={2}
                fill="none"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-royal rounded-full" />
            <span className="text-sm text-navy-600">Added</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-navy-600 rounded-full" />
            <span className="text-sm text-navy-600">Disposed</span>
          </div>
        </div>
      </div>
    </div>
  );
}
