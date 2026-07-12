// ============================================================
// AssetFlow ERP — Audit Management Hook
// ============================================================

import { useState, useCallback, useMemo } from 'react';
import type { AuditCycle, AuditItem, AuditFilters } from '@/types';
import {
  MOCK_AUDIT_CYCLES,
  MOCK_AUDIT_ITEMS,
  MOCK_DEPARTMENTS,
  MOCK_LOCATIONS,
  MOCK_USERS,
} from '@/lib/mockData';

export interface UseAuditReturn {
  // Data
  audits: AuditCycle[];
  auditItems: AuditItem[];
  selectedAudit: AuditCycle | null;
  filters: AuditFilters;
  departments: typeof MOCK_DEPARTMENTS;
  locations: typeof MOCK_LOCATIONS;
  auditors: typeof MOCK_USERS;
  
  // Loading states
  isLoading: boolean;
  isSubmitting: boolean;
  isExporting: boolean;
  exportReport: (format: 'pdf' | 'excel' | 'csv') => Promise<void>;
  
  // Actions
  setFilters: (filters: Partial<AuditFilters>) => void;
  selectAudit: (audit: AuditCycle | null) => void;
  createAudit: (data: Omit<AuditCycle, 'id' | 'createdAt' | 'totalAssets' | 'verifiedCount' | 'missingCount' | 'damagedCount' | 'pendingCount'>) => Promise<void>;
  updateAudit: (id: string, data: Partial<AuditCycle>) => Promise<void>;
  deleteAudit: (id: string) => Promise<void>;
  activateAudit: (id: string) => Promise<void>;
  closeAudit: (id: string) => Promise<void>;
  verifyItem: (auditId: string, itemId: string, status: 'verified' | 'missing' | 'damaged', notes?: string) => Promise<void>;
  bulkVerify: (auditId: string, itemIds: string[], status: 'verified' | 'missing' | 'damaged') => Promise<void>;
  
  // Computed
  filteredAudits: AuditCycle[];
  filteredAuditItems: AuditItem[];
  auditStats: {
    totalAudits: number;
    activeAudits: number;
    completedAudits: number;
    lockedAudits: number;
    draftAudits: number;
    totalVerified: number;
    totalMissing: number;
    totalDamaged: number;
  };
}

const DEFAULT_FILTERS: AuditFilters = {
  search: '',
  departments: [],
  locations: [],
  status: 'all',
  auditor: '',
};

export function useAudit(): UseAuditReturn {
  const [audits, setAudits] = useState<AuditCycle[]>(MOCK_AUDIT_CYCLES);
  const [auditItems, setAuditItems] = useState<AuditItem[]>(MOCK_AUDIT_ITEMS);
  const [selectedAudit, setSelectedAudit] = useState<AuditCycle | null>(null);
  const [filters, setFiltersState] = useState<AuditFilters>(DEFAULT_FILTERS);
  const [isLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const setFilters = useCallback((partial: Partial<AuditFilters>) => {
    setFiltersState(prev => ({ ...prev, ...partial }));
  }, []);

  const filteredAudits = useMemo(() => {
    return audits.filter(audit => {
      if (filters.search) {
        const s = filters.search.toLowerCase();
        const match = audit.name.toLowerCase().includes(s) ||
          audit.departments.some(d => d.toLowerCase().includes(s)) ||
          audit.locations.some(l => l.toLowerCase().includes(s));
        if (!match) return false;
      }
      if (filters.status !== 'all' && audit.status !== filters.status) return false;
      if (filters.departments.length > 0 && !audit.departments.some(d => filters.departments.includes(d))) return false;
      if (filters.locations.length > 0 && !audit.locations.some(l => filters.locations.includes(l))) return false;
      if (filters.auditor && !audit.assignedAuditors.includes(filters.auditor)) return false;
      return true;
    });
  }, [audits, filters]);

  const filteredAuditItems = useMemo(() => {
    if (!selectedAudit) return [];
    return auditItems.filter(item => item.auditCycleId === selectedAudit.id);
  }, [auditItems, selectedAudit]);

  const auditStats = useMemo(() => ({
    totalAudits: audits.length,
    activeAudits: audits.filter(a => a.status === 'active').length,
    completedAudits: audits.filter(a => a.status === 'completed').length,
    lockedAudits: audits.filter(a => a.status === 'locked').length,
    draftAudits: audits.filter(a => a.status === 'draft').length,
    totalVerified: auditItems.filter(i => i.verificationStatus === 'verified').length,
    totalMissing: auditItems.filter(i => i.verificationStatus === 'missing').length,
    totalDamaged: auditItems.filter(i => i.verificationStatus === 'damaged').length,
  }), [audits, auditItems]);

  const selectAudit = useCallback((audit: AuditCycle | null) => {
    setSelectedAudit(audit);
  }, []);

  const createAudit = useCallback(async (data: Omit<AuditCycle, 'id' | 'createdAt' | 'totalAssets' | 'verifiedCount' | 'missingCount' | 'damagedCount' | 'pendingCount'>) => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 600));
    const newAudit: AuditCycle = {
      ...data,
      id: `ac${Date.now()}`,
      createdAt: new Date().toISOString(),
      totalAssets: 0,
      verifiedCount: 0,
      missingCount: 0,
      damagedCount: 0,
      pendingCount: 0,
    };
    setAudits(prev => [newAudit, ...prev]);
    setIsSubmitting(false);
  }, []);

  const updateAudit = useCallback(async (id: string, data: Partial<AuditCycle>) => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 400));
    setAudits(prev => prev.map(a => a.id === id ? { ...a, ...data } : a));
    setIsSubmitting(false);
  }, []);

  const deleteAudit = useCallback(async (id: string) => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 400));
    setAudits(prev => prev.filter(a => a.id !== id));
    if (selectedAudit?.id === id) setSelectedAudit(null);
    setIsSubmitting(false);
  }, [selectedAudit]);

  const activateAudit = useCallback(async (id: string) => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 500));
    setAudits(prev => prev.map(a => {
      if (a.id !== id) return a;
      // When activating, populate audit items from assets
      const deptAssets = MOCK_AUDIT_ITEMS.filter(i => i.auditCycleId === id);
      const totalAssets = deptAssets.length || Math.floor(Math.random() * 8) + 3;
      return { ...a, status: 'active' as const, totalAssets, pendingCount: totalAssets };
    }));
    setIsSubmitting(false);
  }, []);

  const closeAudit = useCallback(async (id: string) => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    setAudits(prev => prev.map(a => {
      if (a.id !== id) return a;
      return { ...a, status: 'locked' as const, completedAt: new Date().toISOString() };
    }));
    setIsSubmitting(false);
  }, []);

  const verifyItem = useCallback(async (auditId: string, itemId: string, status: 'verified' | 'missing' | 'damaged', notes?: string) => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 300));
    setAuditItems(prev => prev.map(item => {
      if (item.id !== itemId) return item;
      return { ...item, verificationStatus: status, notes: notes || item.notes, verifiedBy: 'Alex Chen', verifiedAt: new Date().toISOString() };
    }));
    // Update audit counts
    setAudits(prev => prev.map(a => {
      if (a.id !== auditId) return a;
      const items = auditItems.filter(i => i.auditCycleId === auditId);
      const verified = items.filter(i => i.verificationStatus === 'verified').length + (status === 'verified' ? 1 : 0);
      const missing = items.filter(i => i.verificationStatus === 'missing').length + (status === 'missing' ? 1 : 0);
      const damaged = items.filter(i => i.verificationStatus === 'damaged').length + (status === 'damaged' ? 1 : 0);
      return { ...a, verifiedCount: verified, missingCount: missing, damagedCount: damaged };
    }));
    setIsSubmitting(false);
  }, [auditItems]);

  const exportReport = useCallback(async (_format: 'pdf' | 'excel' | 'csv') => {
    setIsExporting(true);
    await new Promise(r => setTimeout(r, 1200));
    setIsExporting(false);
  }, []);

  const bulkVerify = useCallback(async (auditId: string, itemIds: string[], status: 'verified' | 'missing' | 'damaged') => {
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 600));
    setAuditItems(prev => prev.map(item => {
      if (!itemIds.includes(item.id)) return item;
      return { ...item, verificationStatus: status, verifiedBy: 'Alex Chen', verifiedAt: new Date().toISOString() };
    }));
    setAudits(prev => prev.map(a => {
      if (a.id !== auditId) return a;
      const items = auditItems.filter(i => i.auditCycleId === auditId);
      const verified = items.filter(i => i.verificationStatus === 'verified' || (itemIds.includes(i.id) && status === 'verified')).length;
      const missing = items.filter(i => i.verificationStatus === 'missing' || (itemIds.includes(i.id) && status === 'missing')).length;
      const damaged = items.filter(i => i.verificationStatus === 'damaged' || (itemIds.includes(i.id) && status === 'damaged')).length;
      return { ...a, verifiedCount: verified, missingCount: missing, damagedCount: damaged };
    }));
    setIsSubmitting(false);
  }, [auditItems]);

  return {
    audits,
    auditItems,
    selectedAudit,
    filters,
    departments: MOCK_DEPARTMENTS,
    locations: MOCK_LOCATIONS,
    auditors: MOCK_USERS.filter(u => u.role === 'asset_manager' || u.role === 'admin'),
    isLoading,
    isSubmitting,
    isExporting,
    setFilters,
    exportReport,
    selectAudit,
    createAudit,
    updateAudit,
    deleteAudit,
    activateAudit,
    closeAudit,
    verifyItem,
    bulkVerify,
    filteredAudits,
    filteredAuditItems,
    auditStats,
  };
}
