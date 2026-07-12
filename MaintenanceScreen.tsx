import React, { useState } from 'react';
import { Plus, Wrench, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useMaintenance } from '../hooks/useMaintenance';
import { KanbanBoard } from '../components/maintenance/KanbanBoard';
import { RaiseRequestForm } from '../components/maintenance/RaiseRequestForm';

export const MaintenanceScreen: React.FC = () => {
  const maintenance = useMaintenance();
  const [showForm, setShowForm] = useState(false);

  const stats = [
    { label: 'Pending', value: maintenance.stats.pending, icon: Clock, color: 'amber' },
    { label: 'In Progress', value: maintenance.stats.inProgress, icon: Wrench, color: 'orange' },
    { label: 'High Priority', value: maintenance.stats.highPriority, icon: AlertTriangle, color: 'red' },
    { label: 'Resolved', value: maintenance.stats.resolved, icon: CheckCircle, color: 'green' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage asset maintenance requests</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Raise Request
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {stats.map(stat => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-lg bg-${stat.color}-100`}>
                  <Icon className={`w-4 h-4 text-${stat.color}-600`} />
                </div>
                <span className="text-sm font-medium text-gray-500">{stat.label}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <KanbanBoard
          columns={maintenance.kanbanColumns}
          onCardClick={() => {}}
          onMoveCard={() => {}}
        />
      </div>

      <RaiseRequestForm
        isOpen={showForm}
        assets={maintenance.eligibleAssets}
        onClose={() => setShowForm(false)}
        onSubmit={maintenance.createRequest}
      />
    </div>
  );
};

export default MaintenanceScreen;
