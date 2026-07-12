import { overdueReturns, upcomingReturns } from '@/data/dashboardData';

export default function ReturnsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Overdue Returns */}
      <div className="lg:col-span-3 bg-white rounded-2xl border border-border-light overflow-hidden">
        <div className="border-l-4 border-danger">
          <div className="p-6 border-b border-border-light">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-h3 text-navy-900">Overdue Returns</h2>
                <span className="w-2 h-2 rounded-full bg-danger" />
              </div>
              <div className="flex gap-3">
                <button className="text-caption text-navy-600 hover:text-navy-900 font-medium transition-colors">
                  Send Reminder
                </button>
                <button className="text-caption text-navy-600 hover:text-navy-900 font-medium transition-colors">
                  Escalate
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border-light">
                  <th className="text-left text-caption text-navy-600 font-medium px-6 py-3">Asset Tag</th>
                  <th className="text-left text-caption text-navy-600 font-medium px-6 py-3">Asset Name</th>
                  <th className="text-left text-caption text-navy-600 font-medium px-6 py-3">Employee</th>
                  <th className="text-left text-caption text-navy-600 font-medium px-6 py-3">Expected Return</th>
                  <th className="text-left text-caption text-navy-600 font-medium px-6 py-3">Days Overdue</th>
                  <th className="text-left text-caption text-navy-600 font-medium px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {overdueReturns.map((item) => (
                  <tr key={item.assetTag} className="border-b border-border-light last:border-b-0 hover:bg-surface-grey/50 transition-colors">
                    <td className="px-6 py-3">
                      <span className="font-mono text-sm text-navy-900">{item.assetTag}</span>
                    </td>
                    <td className="px-6 py-3 text-sm text-navy-900">{item.assetName}</td>
                    <td className="px-6 py-3 text-sm text-navy-700">{item.employee}</td>
                    <td className="px-6 py-3 text-sm text-navy-600">{item.expectedReturn}</td>
                    <td className="px-6 py-3">
                      <span className="text-sm font-medium text-danger">{item.daysOverdue} days</span>
                    </td>
                    <td className="px-6 py-3">
                      <button className="text-sm text-royal hover:text-royal-dark font-medium transition-colors">
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Upcoming Returns */}
      <div className="lg:col-span-2 bg-white rounded-2xl border border-border-light p-6">
        <h2 className="text-h3 text-navy-900 mb-5">Upcoming Returns (14 Days)</h2>
        
        <div className="space-y-3">
          {upcomingReturns.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 p-3 rounded-lg bg-surface-grey hover:bg-surface-grey/80 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-royal/10 flex items-center justify-center text-royal text-sm font-semibold flex-shrink-0">
                {item.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy-900 truncate">{item.employee}</p>
                <p className="text-caption text-navy-600 truncate">{item.asset}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-caption text-navy-600">{item.returnDate}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
