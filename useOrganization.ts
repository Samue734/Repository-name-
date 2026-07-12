// ============================================
// ASSETFLOW ERP - USE ORGANIZATION HOOK
// Screen 3: Organization Setup
// ============================================

import { useState, useCallback, useMemo } from 'react';
import type { 
  Department, 
  AssetCategory, 
  Employee, 
  DepartmentFormData, 
  AssetCategoryFormData,
  RolePromotionData,
  OrganizationFilters,
  OrganizationTab,
  PaginatedResponse 
} from '../types';
import { 
  mockDepartments, 
  mockCategories, 
  mockEmployees, 
  mockUsers 
} from '../lib/mockData';

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useOrganization() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [categories, setCategories] = useState<AssetCategory[]>(mockCategories);
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [activeTab, setActiveTab] = useState<OrganizationTab>('departments');
  const [filters, setFilters] = useState<OrganizationFilters>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Department Operations ---
  const createDepartment = useCallback(async (data: DepartmentFormData): Promise<Department> => {
    setLoading(true);
    await delay(600);

    const head = employees.find(e => e.id === data.headId);
    const parent = departments.find(d => d.id === data.parentId);

    const newDept: Department = {
      id: `dept-${Date.now()}`,
      name: data.name,
      headId: data.headId || null,
      headName: head?.name || null,
      parentId: data.parentId || null,
      parentName: parent?.name || null,
      status: data.status,
      employeeCount: 0,
      assetCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setDepartments(prev => [...prev, newDept]);
    setLoading(false);
    return newDept;
  }, [departments, employees]);

  const updateDepartment = useCallback(async (id: string, data: DepartmentFormData): Promise<Department> => {
    setLoading(true);
    await delay(600);

    const head = employees.find(e => e.id === data.headId);
    const parent = departments.find(d => d.id === data.parentId);

    setDepartments(prev => prev.map(d => 
      d.id === id ? {
        ...d,
        name: data.name,
        headId: data.headId || null,
        headName: head?.name || null,
        parentId: data.parentId || null,
        parentName: parent?.name || null,
        status: data.status,
        updatedAt: new Date().toISOString(),
      } : d
    ));

    const updated = departments.find(d => d.id === id);
    setLoading(false);
    return updated!;
  }, [departments, employees]);

  const deactivateDepartment = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    await delay(400);

    setDepartments(prev => prev.map(d => 
      d.id === id ? { ...d, status: 'inactive' as const, updatedAt: new Date().toISOString() } : d
    ));
    setLoading(false);
  }, []);

  const deleteDepartment = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    await delay(400);
    setDepartments(prev => prev.filter(d => d.id !== id));
    setLoading(false);
  }, []);

  // --- Category Operations ---
  const createCategory = useCallback(async (data: AssetCategoryFormData): Promise<AssetCategory> => {
    setLoading(true);
    await delay(500);

    const newCategory: AssetCategory = {
      id: `cat-${Date.now()}`,
      name: data.name,
      customFields: data.customFields.map(cf => ({
        ...cf,
        id: cf.id || `cf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      })),
      assetCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCategories(prev => [...prev, newCategory]);
    setLoading(false);
    return newCategory;
  }, []);

  const updateCategory = useCallback(async (id: string, data: AssetCategoryFormData): Promise<AssetCategory> => {
    setLoading(true);
    await delay(500);

    setCategories(prev => prev.map(c => 
      c.id === id ? {
        ...c,
        name: data.name,
        customFields: data.customFields.map(cf => ({
          ...cf,
          id: cf.id || `cf-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        })),
        updatedAt: new Date().toISOString(),
      } : c
    ));

    const updated = categories.find(c => c.id === id);
    setLoading(false);
    return updated!;
  }, [categories]);

  const deleteCategory = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    await delay(400);
    setCategories(prev => prev.filter(c => c.id !== id));
    setLoading(false);
  }, []);

  // --- Employee / Role Operations ---
  const promoteEmployee = useCallback(async (data: RolePromotionData): Promise<Employee> => {
    setLoading(true);
    await delay(700);

    const dept = departments.find(d => d.id === data.departmentId);

    setEmployees(prev => prev.map(e => 
      e.id === data.userId ? {
        ...e,
        role: data.role === 'department_head' ? 'department_head' : 'asset_manager',
        departmentId: data.departmentId || e.departmentId,
        departmentName: dept?.name || e.departmentName,
      } : e
    ));

    // Update department head if promoting to department_head
    if (data.role === 'department_head' && data.departmentId) {
      const employee = employees.find(e => e.id === data.userId);
      setDepartments(prev => prev.map(d => 
        d.id === data.departmentId ? {
          ...d,
          headId: data.userId,
          headName: employee?.name || null,
          updatedAt: new Date().toISOString(),
        } : d
      ));
    }

    const updated = employees.find(e => e.id === data.userId);
    setLoading(false);
    return updated!;
  }, [departments, employees]);

  const updateEmployee = useCallback(async (id: string, data: Partial<Employee>): Promise<Employee> => {
    setLoading(true);
    await delay(500);

    const dept = departments.find(d => d.id === data.departmentId);

    setEmployees(prev => prev.map(e => 
      e.id === id ? {
        ...e,
        ...data,
        departmentName: dept?.name || e.departmentName,
      } : e
    ));

    const updated = employees.find(e => e.id === id);
    setLoading(false);
    return updated!;
  }, [departments]);

  // --- Filtering & Pagination ---
  const filteredDepartments = useMemo(() => {
    let result = [...departments];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(d => 
        d.name.toLowerCase().includes(q) ||
        d.headName?.toLowerCase().includes(q)
      );
    }
    if (filters.status && filters.status !== 'all') {
      result = result.filter(d => d.status === filters.status);
    }
    return result;
  }, [departments, filters]);

  const filteredCategories = useMemo(() => {
    let result = [...categories];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(c => c.name.toLowerCase().includes(q));
    }
    return result;
  }, [categories, filters]);

  const filteredEmployees = useMemo(() => {
    let result = [...employees];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(e => 
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        e.departmentName?.toLowerCase().includes(q)
      );
    }
    if (filters.status && filters.status !== 'all') {
      result = result.filter(e => e.status === filters.status);
    }
    if (filters.role && filters.role !== 'all') {
      result = result.filter(e => e.role === filters.role);
    }
    if (filters.departmentId) {
      result = result.filter(e => e.departmentId === filters.departmentId);
    }
    return result;
  }, [employees, filters]);

  // --- Derived Data ---
  const departmentHierarchy = useMemo(() => {
    const buildTree = (parentId: string | null): Department[] => {
      return departments
        .filter(d => d.parentId === parentId)
        .map(d => ({
          ...d,
          children: buildTree(d.id),
        }));
    };
    return buildTree(null);
  }, [departments]);

  const activeEmployees = useMemo(() => employees.filter(e => e.status === 'active'), [employees]);
  const eligibleHeads = useMemo(() => activeEmployees.filter(e => e.role === 'employee'), [activeEmployees]);
  const eligibleTechnicians = useMemo(() => activeEmployees.filter(e => ['asset_manager', 'admin'].includes(e.role)), [activeEmployees]);

  return {
    // State
    departments,
    categories,
    employees,
    activeTab,
    filters,
    loading,
    error,

    // Setters
    setActiveTab,
    setFilters,
    setError,

    // Department Actions
    createDepartment,
    updateDepartment,
    deactivateDepartment,
    deleteDepartment,

    // Category Actions
    createCategory,
    updateCategory,
    deleteCategory,

    // Employee Actions
    promoteEmployee,
    updateEmployee,

    // Filtered Data
    filteredDepartments,
    filteredCategories,
    filteredEmployees,
    departmentHierarchy,
    activeEmployees,
    eligibleHeads,
    eligibleTechnicians,
  };
}
