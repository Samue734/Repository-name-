// ============================================
// ASSETFLOW ERP - USE MAINTENANCE HOOK
// Screen 7: Maintenance Management
// ============================================

import { useState, useCallback, useMemo } from 'react';
import type { 
  MaintenanceRequest, 
  MaintenanceFormData,
  MaintenanceApprovalData,
  MaintenanceAssignData,
  MaintenanceResolveData,
  MaintenanceFilters,
  PaginatedResponse 
} from '../types';
import { mockMaintenanceRequests, mockAssets, getMaintenanceEligibleAssets, getTechnicians } from '../lib/mockData';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function useMaintenance() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(mockMaintenanceRequests);
  const [filters, setFilters] = useState<MaintenanceFilters>({});
  const [selectedRequest, setSelectedRequest] = useState<MaintenanceRequest | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const eligibleAssets = useMemo(() => getMaintenanceEligibleAssets(), []);
  const technicians = useMemo(() => getTechnicians(), []);

  // --- CRUD Operations ---
  const createRequest = useCallback(async (data: MaintenanceFormData): Promise<MaintenanceRequest> => {
    setLoading(true);
    setError(null);
    await delay(700);

    const asset = mockAssets.find(a => a.id === data.assetId);
    const user = { id: 'usr-005', name: 'Raj Patel', department: 'Engineering' }; // Current user mock

    const newRequest: MaintenanceRequest = {
      id: `mnt-${Date.now()}`,
      assetId: data.assetId,
      assetName: asset?.name || 'Unknown',
      assetTag: asset?.assetTag || '',
      assetCategory: asset?.categoryName,
      assetLocation: asset?.location,
      requestedBy: user.id,
      requestedByName: user.name,
      requestedByDepartment: user.department,
      issueDescription: data.issueDescription,
      priority: data.priority,
      photos: data.photos,
      status: 'pending',
      approvedBy: null,
      approvedByName: null,
      approvedAt: null,
      technicianId: null,
      technicianName: null,
      assignedAt: null,
      startedAt: null,
      resolvedAt: null,
      resolutionNotes: null,
      rejectionReason: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setRequests(prev => [newRequest, ...prev]);
    setLoading(false);
    return newRequest;
  }, []);

  const approveRequest = useCallback(async (id: string, data: MaintenanceApprovalData): Promise<MaintenanceRequest> => {
    setLoading(true);
    setError(null);
    await delay(600);

    const approver = { id: 'usr-002', name: 'Marcus Johnson' }; // Mock current approver

    setRequests(prev => prev.map(r => {
      if (r.id !== id) return r;

      if (data.status === 'approved') {
        return {
          ...r,
          status: 'approved',
          approvedBy: approver.id,
          approvedByName: approver.name,
          approvedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      } else {
        return {
          ...r,
          status: 'rejected',
          approvedBy: approver.id,
          approvedByName: approver.name,
          approvedAt: new Date().toISOString(),
          rejectionReason: data.rejectionReason || null,
          updatedAt: new Date().toISOString(),
        };
      }
    }));

    const updated = requests.find(r => r.id === id)!;
    setLoading(false);
    return updated;
  }, [requests]);

  const assignTechnician = useCallback(async (id: string, data: MaintenanceAssignData): Promise<MaintenanceRequest> => {
    setLoading(true);
    await delay(500);

    const tech = technicians.find(t => t.id === data.technicianId);

    setRequests(prev => prev.map(r => 
      r.id === id ? {
        ...r,
        status: 'technician_assigned',
        technicianId: data.technicianId,
        technicianName: tech?.name || null,
        assignedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } : r
    ));

    const updated = requests.find(r => r.id === id)!;
    setLoading(false);
    return updated;
  }, [requests, technicians]);

  const startWork = useCallback(async (id: string): Promise<MaintenanceRequest> => {
    setLoading(true);
    await delay(400);

    setRequests(prev => prev.map(r => 
      r.id === id ? {
        ...r,
        status: 'in_progress',
        startedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      } : r
    ));

    const updated = requests.find(r => r.id === id)!;
    setLoading(false);
    return updated;
  }, [requests]);

  const resolveRequest = useCallback(async (id: string, data: MaintenanceResolveData): Promise<MaintenanceRequest> => {
    setLoading(true);
    await delay(600);

    setRequests(prev => prev.map(r => 
      r.id === id ? {
        ...r,
        status: 'resolved',
        resolvedAt: new Date().toISOString(),
        resolutionNotes: data.resolutionNotes,
        updatedAt: new Date().toISOString(),
      } : r
    ));

    const updated = requests.find(r => r.id === id)!;
    setLoading(false);
    return updated;
  }, [requests]);

  const deleteRequest = useCallback(async (id: string): Promise<void> => {
    setLoading(true);
    await delay(300);
    setRequests(prev => prev.filter(r => r.id !== id));
    setLoading(false);
  }, []);

  // --- Filtering ---
  const filteredRequests = useMemo(() => {
    let result = [...requests];

    if (filters.status?.length) {
      result = result.filter(r => filters.status?.includes(r.status));
    }
    if (filters.priority?.length) {
      result = result.filter(r => filters.priority?.includes(r.priority));
    }
    if (filters.assetId) {
      result = result.filter(r => r.assetId === filters.assetId);
    }
    if (filters.requestedBy) {
      result = result.filter(r => r.requestedBy === filters.requestedBy);
    }
    if (filters.dateFrom) {
      result = result.filter(r => new Date(r.createdAt) >= new Date(filters.dateFrom!));
    }
    if (filters.dateTo) {
      result = result.filter(r => new Date(r.createdAt) <= new Date(filters.dateTo!));
    }

    return result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [requests, filters]);

  // --- Kanban Columns ---
  const kanbanColumns = useMemo(() => {
    const columns: Record<string, MaintenanceRequest[]> = {
      pending: [],
      approved: [],
      technician_assigned: [],
      in_progress: [],
      resolved: [],
      rejected: [],
    };

    filteredRequests.forEach(r => {
      if (columns[r.status]) {
        columns[r.status].push(r);
      }
    });

    return columns;
  }, [filteredRequests]);

  // --- Statistics ---
  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter(r => r.status === 'pending').length;
    const approved = requests.filter(r => r.status === 'approved').length;
    const inProgress = requests.filter(r => r.status === 'in_progress').length;
    const resolved = requests.filter(r => r.status === 'resolved').length;
    const rejected = requests.filter(r => r.status === 'rejected').length;
    const highPriority = requests.filter(r => r.priority === 'high' && r.status !== 'resolved' && r.status !== 'rejected').length;

    return { total, pending, approved, inProgress, resolved, rejected, highPriority };
  }, [requests]);

  // --- Asset History ---
  const getAssetHistory = useCallback((assetId: string): MaintenanceRequest[] => {
    return requests
      .filter(r => r.assetId === assetId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [requests]);

  return {
    // State
    requests,
    filters,
    selectedRequest,
    loading,
    error,
    eligibleAssets,
    technicians,

    // Setters
    setFilters,
    setSelectedRequest,
    setError,

    // CRUD
    createRequest,
    approveRequest,
    assignTechnician,
    startWork,
    resolveRequest,
    deleteRequest,

    // Derived
    filteredRequests,
    kanbanColumns,
    stats,
    getAssetHistory,
  };
}
