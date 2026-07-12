// ============================================================
// AssetFlow ERP — Screen 8: Asset Audit Management
// ============================================================

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { PageHeader } from '@/components/shared/PageHeader';
import { AuditCycleForm } from '@/components/audit/AuditCycleForm';
import { AuditTable } from '@/components/audit/AuditTable';
import { AuditStats } from '@/components/audit/AuditStats';
import { AuditCharts } from '@/components/audit/AuditCharts';
import { StatusChip } from '@/components/shared/StatusChip';
import { ConfirmDialog } from '@/components/shared/ConfirmDialog';
import { ExportButton } from '@/components/shared/ExportButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Search, Plus, Play, Lock, Pencil, Trash2, FileText,
  ChevronDown, ChevronUp, ClipboardCheck,
} from 'lucide-react';
import { useAudit } from '@/hooks/useAudit';
import { CHART_COLORS } from '@/lib/constants';

export function AuditScreen() {
  const audit = useAudit();
  const [showForm, setShowForm] = useState(false);
  const [editingAudit, setEditingAudit] = useState<any>(null);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [closingAuditId, setClosingAuditId] = useState<string | null>(null);
  const [expandedAudit, setExpandedAudit] = useState<string | null>(null);

  const handleCreate = () => {
    setEditingAudit(null);
    setShowForm(true);
  };

  const handleEdit = (a: any) => {
    setEditingAudit(a);
    setShowForm(true);
  };

  const handleCloseAudit = (id: string) => {
    setClosingAuditId(id);
    setShowCloseDialog(true);
  };

  const confirmClose = async () => {
    if (closingAuditId) {
      await audit.closeAudit(closingAuditId);
      setShowCloseDialog(false);
      setClosingAuditId(null);
      if (audit.selectedAudit?.id === closingAuditId) {
        audit.selectAudit(null);
      }
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedAudit(expandedAudit === id ? null : id);
  };

  // Chart data
  const verificationData = useMemo(() => [
    { name: 'Verified', value: audit.auditStats.totalVerified, color: CHART_COLORS.secondary },
    { name: 'Missing', value: audit.auditStats.totalMissing, color: CHART_COLORS.danger },
    { name: 'Damaged', value: audit.auditStats.totalDamaged, color: CHART_COLORS.warning },
  ], [audit.auditStats]);

  const departmentData = useMemo(() => {
    const depts = [...new Set(audit.filteredAuditItems.map(i => i.department))];
    return depts.map(d => {
      const items = audit.filteredAuditItems.filter(i => i.department === d);
      return {
        name: d,
        total: items.length,
        verified: items.filter(i => i.verificationStatus === 'verified').length,
        pending: items.filter(i => i.verificationStatus === 'pending').length,
      };
    });
  }, [audit.filteredAuditItems]);

  return (
    <div className="space-y-6 pb-8">
      <PageHeader
        title="Asset Audit Management"
        subtitle="Run structured audit cycles, verify assets, and generate discrepancy reports"
      >
        <div className="flex items-center gap-2">
          <ExportButton onExport={audit.exportReport} isExporting={audit.isExporting} />
          <Button
            onClick={handleCreate}
            size="sm"
            className="gap-2 text-[12px] font-medium bg-[#2563eb] hover:bg-blue-700 text-white"
          >
            <Plus className="w-3.5 h-3.5" />
            New Audit
          </Button>
        </div>
      </PageHeader>

      {/* Statistics */}
      <AuditStats auditStats={audit.auditStats} />

      {/* Charts */}
      <AuditCharts verificationData={verificationData} departmentData={departmentData} />

      {/* Filters + Audit List */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={audit.filters.search}
              onChange={(e) => audit.setFilters({ search: e.target.value })}
              placeholder="Search audits..."
              className="pl-9 text-[12px] h-9"
            />
          </div>
          <Select value={audit.filters.status} onValueChange={(v) => audit.setFilters({ status: v as any })}>
            <SelectTrigger className="w-[140px] h-9 text-[12px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="locked">Locked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Audit Cycle List */}
        <div className="space-y-2">
          {audit.filteredAudits.map((a, i) => {
            const isExpanded = expandedAudit === a.id;
            const isSelected = audit.selectedAudit?.id === a.id;
            const progress = a.totalAssets > 0 ? ((a.verifiedCount + a.missingCount + a.damagedCount) / a.totalAssets) * 100 : 0;

            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: i * 0.05 }}
                className={cn(
                  'bg-white rounded-xl border transition-all duration-200 overflow-hidden',
                  isSelected ? 'border-blue-300 shadow-md shadow-blue-100/50' : 'border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
                )}
              >
                {/* Header Row */}
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                  onClick={() => { toggleExpand(a.id); audit.selectAudit(a); }}
                >
                  <button className="p-1 rounded hover:bg-slate-100 transition-colors">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="text-[13px] font-semibold text-slate-700 truncate">{a.name}</h4>
                      <StatusChip status={a.status} variant="audit" size="sm" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {a.departments.length} dept{a.departments.length > 1 ? 's' : ''} · {a.locations.length} loc{a.locations.length > 1 ? 's' : ''} · {a.startDate} to {a.endDate}
                    </p>
                  </div>

                  {/* Progress */}
                  <div className="hidden sm:flex items-center gap-2 w-32">
                    <div className="flex-1 bg-slate-100 rounded-full h-1.5">
                      <div
                        className={cn(
                          'h-1.5 rounded-full transition-all duration-500',
                          a.status === 'locked' ? 'bg-slate-400' : 'bg-blue-500'
                        )}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 w-8 text-right">{Math.round(progress)}%</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    {a.status === 'draft' && (
                      <>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => { e.stopPropagation(); audit.activateAudit(a.id); }}
                          disabled={audit.isSubmitting}
                          className="h-7 w-7 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                          title="Activate"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => { e.stopPropagation(); handleEdit(a); }}
                          className="h-7 w-7 p-0 text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                          title="Edit"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => { e.stopPropagation(); audit.deleteAudit(a.id); }}
                          disabled={audit.isSubmitting}
                          className="h-7 w-7 p-0 text-slate-500 hover:text-red-600 hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </>
                    )}
                    {a.status === 'active' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={(e) => { e.stopPropagation(); handleCloseAudit(a.id); }}
                        disabled={audit.isSubmitting}
                        className="h-7 gap-1 text-[11px] text-slate-600 hover:text-amber-700 hover:bg-amber-50"
                      >
                        <Lock className="w-3.5 h-3.5" />
                        Close
                      </Button>
                    )}
                    {a.status === 'locked' && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 gap-1 text-[11px] text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Report
                      </Button>
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.25 }}
                    className="border-t border-slate-100 px-4 py-3 bg-slate-50/30"
                  >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                      <div className="bg-white rounded-lg p-3 border border-slate-100">
                        <p className="text-[11px] text-slate-400">Total Assets</p>
                        <p className="text-[16px] font-bold text-slate-700">{a.totalAssets}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-slate-100">
                        <p className="text-[11px] text-emerald-500">Verified</p>
                        <p className="text-[16px] font-bold text-emerald-600">{a.verifiedCount}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-slate-100">
                        <p className="text-[11px] text-red-400">Missing</p>
                        <p className="text-[16px] font-bold text-red-500">{a.missingCount}</p>
                      </div>
                      <div className="bg-white rounded-lg p-3 border border-slate-100">
                        <p className="text-[11px] text-amber-500">Damaged</p>
                        <p className="text-[16px] font-bold text-amber-600">{a.damagedCount}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-slate-400">
                      <span>Auditors: {a.assignedAuditors.map(id => audit.auditors.find(u => u.id === id)?.name).join(', ')}</span>
                      {a.notes && <span>Notes: {a.notes}</span>}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Asset Verification Table */}
      <div>
        <h3 className="text-[14px] font-semibold text-slate-700 mb-3 flex items-center gap-2">
          <ClipboardCheck className="w-4 h-4 text-blue-500" />
          Asset Verification Checklist
          {audit.selectedAudit && (
            <span className="text-[12px] font-normal text-slate-400">
              — {audit.selectedAudit.name}
            </span>
          )}
        </h3>
        <AuditTable
          audit={audit.selectedAudit}
          items={audit.filteredAuditItems}
          onVerify={audit.verifyItem}
          onBulkVerify={audit.bulkVerify}
          isSubmitting={audit.isSubmitting}
        />
      </div>

      {/* Form Dialog */}
      <AuditCycleForm
        open={showForm}
        onOpenChange={setShowForm}
        audit={editingAudit}
        departments={audit.departments}
        locations={audit.locations}
        auditors={audit.auditors}
        onSubmit={editingAudit ? (data) => audit.updateAudit(editingAudit.id, data) : audit.createAudit}
        isSubmitting={audit.isSubmitting}
      />

      {/* Close Audit Confirmation */}
      <ConfirmDialog
        open={showCloseDialog}
        onOpenChange={setShowCloseDialog}
        title="Close Audit Cycle"
        description="Closing this audit will lock all records, update asset statuses for missing/damaged items, and generate a discrepancy report. This action cannot be undone."
        confirmLabel="Close & Lock"
        variant="warning"
        onConfirm={confirmClose}
      />
    </div>
  );
}
