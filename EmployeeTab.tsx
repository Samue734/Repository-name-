import React, { useState } from 'react';
import { Users, Shield, Search, Filter } from 'lucide-react';
import type { Employee, RolePromotionData } from '../../types';
import { StatusChip } from '../shared/StatusChip';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { EmptyState } from '../shared/EmptyState';
import { ROLE_LABELS } from '../../lib/constants';

interface EmployeeTabProps {
  employees: Employee[];
  departments: Array<{ id: string; name: string }>;
  loading: boolean;
  onPromote: (data: RolePromotionData) => Promise<void>;
  onUpdate: (id: string, data: Partial<Employee>) => Promise<void>;
}

export const EmployeeTab: React.FC<EmployeeTabProps> = ({
  employees,
  departments,
  loading,
  onPromote,
  onUpdate,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [promoteDialog, setPromoteDialog] = useState<Employee | null>(null);
  const [promoteForm, setPromoteForm] = useState<RolePromotionData>({
    userId: '',
    role: 'department_head',
    departmentId: null,
  });

  const filteredEmployees = employees.filter(e => {
    const matchesSearch = !searchQuery || 
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || e.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || e.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const openPromote = (employee: Employee) => {
    setPromoteForm({
      userId: employee.id,
      role: 'department_head',
      departmentId: employee.departmentId,
    });
    setPromoteDialog(employee);
  };

  const handlePromote = async () => {
    await onPromote(promoteForm);
    setPromoteDialog(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Employee Directory</h3>
          <p className="text-sm text-gray-500 mt-0.5">Manage employees and assign roles</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 bg-white p-3 rounded-lg border border-gray-200">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          />
        </div>
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">All Roles</option>
          <option value="employee">Employee</option>
          <option value="department_head">Department Head</option>
          <option value="asset_manager">Asset Manager</option>
          <option value="admin">Admin</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Employee</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Department</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Role</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredEmployees.map(employee => (
              <tr key={employee.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-semibold text-blue-700">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 text-sm">{employee.name}</div>
                      <div className="text-xs text-gray-500">{employee.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {employee.departmentName || <span className="text-gray-400 italic">Unassigned</span>}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    employee.role === 'admin' ? 'bg-purple-50 text-purple-700' :
                    employee.role === 'asset_manager' ? 'bg-blue-50 text-blue-700' :
                    employee.role === 'department_head' ? 'bg-amber-50 text-amber-700' :
                    'bg-gray-50 text-gray-700'
                  }`}>
                    <Shield className="w-3 h-3" />
                    {ROLE_LABELS[employee.role]}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <StatusChip status={employee.status} size="sm" />
                </td>
                <td className="px-4 py-3">
                  {employee.role === 'employee' && (
                    <button
                      onClick={() => openPromote(employee)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      <Shield className="w-3.5 h-3.5" />
                      Promote
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredEmployees.length === 0 && <EmptyState type="search" />}
      </div>

      {promoteDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">Promote Employee</h3>
              <p className="text-sm text-gray-500 mt-1">
                Promote <strong>{promoteDialog.name}</strong> to a new role
              </p>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">New Role</label>
                <select
                  value={promoteForm.role}
                  onChange={e => setPromoteForm(prev => ({ 
                    ...prev, 
                    role: e.target.value as 'department_head' | 'asset_manager' 
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="department_head">Department Head</option>
                  <option value="asset_manager">Asset Manager</option>
                </select>
              </div>
              {promoteForm.role === 'department_head' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Assign Department *</label>
                  <select
                    value={promoteForm.departmentId || ''}
                    onChange={e => setPromoteForm(prev => ({ 
                      ...prev, 
                      departmentId: e.target.value || null 
                    }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select department...</option>
                    {departments.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={() => setPromoteDialog(null)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePromote}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Confirm Promotion
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default React.memo(EmployeeTab);
