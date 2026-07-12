// ============================================
// ASSETFLOW ERP - CATEGORY TAB (Screen 3)
// ============================================

import React, { useState } from 'react';
import { Tag, Plus, Pencil, Trash2, GripVertical, X, ChevronDown, ChevronUp } from 'lucide-react';
import type { AssetCategory, AssetCategoryFormData, CustomField } from '../../types';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { EmptyState } from '../shared/EmptyState';

interface CategoryTabProps {
  categories: AssetCategory[];
  loading: boolean;
  onCreate: (data: AssetCategoryFormData) => Promise<void>;
  onUpdate: (id: string, data: AssetCategoryFormData) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

const fieldTypeIcons = {
  text: 'Aa',
  number: '123',
  date: 'Cal',
  boolean: '✓',
};

export const CategoryTab: React.FC<CategoryTabProps> = ({
  categories,
  loading,
  onCreate,
  onUpdate,
  onDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AssetCategory | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [formData, setFormData] = useState<AssetCategoryFormData>({
    name: '',
    customFields: [],
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const openCreate = () => {
    setEditingCategory(null);
    setFormData({ name: '', customFields: [] });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEdit = (category: AssetCategory) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      customFields: [...category.customFields],
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const toggleExpand = (id: string) => {
    setExpandedCards(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const addCustomField = () => {
    setFormData(prev => ({
      ...prev,
      customFields: [
        ...prev.customFields,
        { id: `cf-${Date.now()}`, name: '', type: 'text', required: false },
      ],
    }));
  };

  const updateCustomField = (index: number, updates: Partial<CustomField>) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields.map((f, i) => i === index ? { ...f, ...updates } : f),
    }));
  };

  const removeCustomField = (index: number) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields.filter((_, i) => i !== index),
    }));
  };

  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim()) errors.name = 'Category name is required';
    if (formData.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';

    formData.customFields.forEach((f, i) => {
      if (!f.name.trim()) errors[`field_${i}`] = 'Field name is required';
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      if (editingCategory) {
        await onUpdate(editingCategory.id, formData);
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Asset Categories</h3>
          <p className="text-sm text-gray-500 mt-0.5">Define categories with custom fields for specialized tracking</p>
        </div>
        <button
          onClick={openCreate}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      {categories.length === 0 ? (
        <EmptyState
          type="data"
          title="No categories yet"
          description="Create asset categories like Electronics, Furniture, Vehicles to organize your assets."
          actionLabel="Add Category"
          onAction={openCreate}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map(category => {
            const isExpanded = expandedCards.has(category.id);
            return (
              <div 
                key={category.id} 
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <Tag className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {category.assetCount || 0} assets · {category.customFields.length} custom fields
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(category)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-blue-600 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(category.id)}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {category.customFields.length > 0 && (
                    <div className="mt-3">
                      <button
                        onClick={() => toggleExpand(category.id)}
                        className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        {isExpanded ? 'Hide' : 'Show'} custom fields
                      </button>

                      {isExpanded && (
                        <div className="mt-2 space-y-1.5">
                          {category.customFields.map(field => (
                            <div 
                              key={field.id} 
                              className="flex items-center gap-2 px-2.5 py-1.5 bg-gray-50 rounded-lg text-sm"
                            >
                              <span className="text-xs font-medium text-gray-500 w-8">
                                {fieldTypeIcons[field.type]}
                              </span>
                              <span className="text-gray-700 flex-1">{field.name}</span>
                              {field.required && (
                                <span className="text-xs text-red-500 font-medium">Required</span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm overflow-y-auto py-8">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full mx-4 my-auto animate-in fade-in zoom-in duration-200">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                {editingCategory ? 'Edit Category' : 'Create Category'}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {editingCategory ? 'Update category and custom fields.' : 'Define a new asset category with tracking fields.'}
              </p>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${formErrors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'}`}
                  placeholder="e.g., Electronics"
                />
                {formErrors.name && <p className="mt-1 text-xs text-red-600">{formErrors.name}</p>}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">Custom Fields</label>
                  <button
                    onClick={addCustomField}
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Field
                  </button>
                </div>

                <div className="space-y-2">
                  {formData.customFields.length === 0 ? (
                    <p className="text-sm text-gray-400 italic py-2">No custom fields added yet</p>
                  ) : (
                    formData.customFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                        <GripVertical className="w-4 h-4 text-gray-400 cursor-grab" />

                        <input
                          type="text"
                          value={field.name}
                          onChange={e => updateCustomField(index, { name: e.target.value })}
                          className={`flex-1 px-2.5 py-1.5 text-sm border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none ${formErrors[`field_${index}`] ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'}`}
                          placeholder="Field name"
                        />

                        <select
                          value={field.type}
                          onChange={e => updateCustomField(index, { type: e.target.value as CustomField['type'] })}
                          className="px-2.5 py-1.5 text-sm border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                        >
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="date">Date</option>
                          <option value="boolean">Boolean</option>
                        </select>

                        <label className="flex items-center gap-1.5 cursor-pointer whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={e => updateCustomField(index, { required: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-xs text-gray-600">Required</span>
                        </label>

                        <button
                          onClick={() => removeCustomField(index)}
                          className="p-1 rounded hover:bg-red-100 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
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
                {isSubmitting ? 'Saving...' : editingCategory ? 'Update' : 'Create'}
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!deleteConfirm}
        title="Delete Category?"
        description="This will permanently delete the category. Assets using this category will need to be reassigned."
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

export default React.memo(CategoryTab);
