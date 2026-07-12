// ============================================
// ASSETFLOW ERP - DEPARTMENT TAB (Screen 3)
// ============================================

import React, { useState } from 'react';
import { Building2, Plus, Pencil, Trash2, ChevronRight, ChevronDown, Users, Package } from 'lucide-react';
import type { Department, DepartmentFormData } from '../../types';
import { StatusChip } from '../shared/StatusChip';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { EmptyState } from '../shared/EmptyState';

interface DepartmentTabProps {
  departments: Department[];
  hierarchy: Department[];
  loading: boolean;
  onCreate: (data: DepartmentFormData) => Promise<void>;
  onUpdate: (id: string, data: DepartmentFormData) => Promise<void>;
  onDeactivate: (id: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  eligibleHeads: Array<{ id: string; name: string; departmentId: string | null }>;
}

export const DepartmentTab: React.FC<DepartmentTabProps> = ({
  departments,
  hierarchy,
  loading,
  onCreate,
  onUpdate,
  onDeactivate,
  onDelete,
  eligibleHeads,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDept, setEditingDept] = useState<Department | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [deactivateConfirm, setDeactivateConfirm] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState<DepartmentFormData>({
    name: '',
    headId: null,
    parentId: null,
    status: 'active',
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreate = () => {
    setEditingDept(null);
    setFormData({ name: '', headId: null, parentId: null, status: 'active' });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEdit = (dept: Department) => {
    setEditingDept(dept);
    setFormData({
      name: dept.name,
      headId: dept.headId,
      parentId: dept.parentId,
      status: dept.status,
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Department name is required';
    if (formData.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
    if (editingDept && formData.parentId === editingDept.id) errors.parentId = 'Cannot be its own parent';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      if (editingDept) {
        await onUpdate(editingDept.id, formData);
      } else {
        await onCreate(formData);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const renderHierarchy = (items: Department[], level: number = 0) => {
    return items.map(dept => {
      const hasChildren = departments.some(d => d.parentId === dept.id);
      const isExpanded = expandedRows.has(dept.id);
      const children = departments.filter(d => d.parentId === dept.id);

      return (
        <React.Fragment key={dept.id}>
          <tr className={`hover:bg-gray-50 transition-colors ${level > 0 ? 'bg-gray-50/50' : ''}`}>
            <td className="px-4 py-3">
              <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
                {hasChildren ? (
                  <button 
                    onClick={() => toggleExpand(dept.id)}
                    className="mr-2 p-0.5 rounded hover:bg-gray-200 transition-colors"
                  >
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-gray-500" /> : <ChevronRight className="w-4 h-4 text-gray-500" />}
                  </button>
                ) : (
                  <span className="w-6 mr-2" />
                )}
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Building2 className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{dept.name}</div>
                    {dept.parentName && (
                      <div className="text-xs text-gray-500">Under: {dept.parentName}</div>
                    )}
                  </div>
                </div>
              </div>
            </td>
            <td className="px-4 py-3">
              {dept.headName ? (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-medium text-gray-600">
                    {dept.headName.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-700">{dept.headName}</span>
                </div>
              ) : (
                <span className="text-sm text-gray-400 italic">Unassigned</span>
              )}
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Users className="w-3.5 h-3.5" />
                {dept.employeeCount || 0}
              </div>
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1.5 text-sm text-gray-600">
                <Package className="w-3.5 h-3.5" />
                {dept.assetCount || 0}
              </div>
            </td>
            <td className="px-4 py-3">
              <StatusChip status={dept.status} size="sm" />
            </td>
            <td className="px-4 py-3">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => openEdit(dept)}
                  className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                {dept.status === 'active' ? (
                  <button
                    onClick={() => setDeactivateConfirm(dept.id)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-amber-600 transition-colors"
                    title="Deactivate"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(dept.id)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </td>
          </tr>
          {isExpanded && hasChildren && renderHierarchy(children, level + 1)}
        </React.Fragment>
      );
    });
  };

  const rootDepartments = hierarchy;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Departments</h3>
          <p className="text-sm text-gray-500 mt-0.5">Manage departments, assign heads, and set hierarchy</p>
        </div>
        <button
          onClick={openCreate}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          Add Department
        </button>
      </div>

      {/* Table */}
      {rootDepartments.length === 0 ? (
        <EmptyState 
          type="data" 
          title="No departments yet"
          description="Create your first department to organize your organization."
          actionLabel="Add Department"
          onAction={openCreate}
        />
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Head</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Employees</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Assets</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {renderHierarchy(rootDepartments)}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4 animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingDept ? 'Edit Department' : 'Create Department'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {editingDept ? 'Update department details and assignments.' : 'Set up a new department in your organization.'}
              </p>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                  placeholder="e.g., Engineering"
                />
                {formErrors.name && <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department Head</label>
                <select
                  value={formData.headId || ''}
                  onChange={e => setFormData(prev => ({ ...prev, headId: e.target.value || null }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="">Select a head...</option>
                  {eligibleHeads.map(head => (
                    <option key={head.id} value={head.id}>{head.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Parent Department</label>
                <select
                  value={formData.parentId || ''}
                  onChange={e => setFormData(prev => ({ ...prev, parentId: e.target.value || null }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${formErrors.parentId ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                >
                  <option value="">No parent (top-level)</option>
                  {departments
                    .filter(d => d.id !== editingDept?.id && d.status === 'active')
                    .map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                </select>
                {formErrors.parentId && <p className="mt-1 text-xs text-red-600">{formErrors.parentId}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === 'active'}
                      onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-sm text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.status === 'inactive'}
                      onChange={e => setFormData(prev => ({ ...prev, status: e.target.value as 'active' | 'inactive' }))}
                      className="w-4 h-4 text-gray-600"
                    />
                    <span className="text-sm text-gray-700">Inactive</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3 rounded-b-xl">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Saving...' : editingDept ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm Dialogs */}
      <ConfirmDialog
        open={!!deactivateConfirm}
        title="Deactivate Department?"
        description="This department will be hidden from picklists. Existing assignments remain but new ones cannot be made."
        confirmLabel="Deactivate"
        variant="warning"
        onConfirm={async () => {
          if (deactivateConfirm) {
            await onDeactivate(deactivateConfirm);
            setDeactivateConfirm(null);
          }
        }}
        onCancel={() => setDeactivateConfirm(null)}
      />

      <ConfirmDialog
        open={!!deleteConfirm}
        title="Delete Department?"
        description="This will permanently delete the inactive department. This action cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        onConfirm={async () => {
          if (deleteConfirm) {
            await onDelete(deleteConfirm);
            setDeleteConfirm(null);
          }
        }}
        onCancel={() => setDeleteConfirm(null)}
      />
    </div>
  );
};

export default React.memo(DepartmentTab);
