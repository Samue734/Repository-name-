import React, { useState } from 'react';
import { Building2, Tag, Users } from 'lucide-react';
import { useOrganization } from '../hooks/useOrganization';
import { DepartmentTab } from '../components/organization/DepartmentTab';
import { CategoryTab } from '../components/organization/CategoryTab';
import { EmployeeTab } from '../components/organization/EmployeeTab';

export const OrganizationScreen: React.FC = () => {
  const org = useOrganization();
  const [activeTab, setActiveTab] = useState<'departments' | 'categories' | 'employees'>('departments');

  const tabs = [
    { id: 'departments' as const, label: 'Departments', icon: Building2, count: org.filteredDepartments.length },
    { id: 'categories' as const, label: 'Categories', icon: Tag, count: org.filteredCategories.length },
    { id: 'employees' as const, label: 'Employees', icon: Users, count: org.filteredEmployees.length },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Organization Setup</h1>
        <p className="text-sm text-gray-500 mt-1">Manage departments, asset categories, and employee roles</p>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 w-fit">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              <span className={`px-1.5 py-0.5 text-xs rounded-full ${
                activeTab === tab.id ? 'bg-gray-100 text-gray-600' : 'bg-gray-200 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="animate-in fade-in duration-200">
        {activeTab === 'departments' && (
          <DepartmentTab
            departments={org.filteredDepartments}
            hierarchy={org.departmentHierarchy}
            loading={org.loading}
            onCreate={org.createDepartment}
            onUpdate={org.updateDepartment}
            onDeactivate={org.deactivateDepartment}
            onDelete={org.deleteDepartment}
            eligibleHeads={org.eligibleHeads}
          />
        )}
        {activeTab === 'categories' && (
          <CategoryTab
            categories={org.filteredCategories}
            loading={org.loading}
            onCreate={org.createCategory}
            onUpdate={org.updateCategory}
            onDelete={org.deleteCategory}
          />
        )}
        {activeTab === 'employees' && (
          <EmployeeTab
            employees={org.filteredEmployees}
            departments={org.departments.map(d => ({ id: d.id, name: d.name }))}
            loading={org.loading}
            onPromote={org.promoteEmployee}
            onUpdate={org.updateEmployee}
          />
        )}
      </div>
    </div>
  );
};

export default OrganizationScreen;
