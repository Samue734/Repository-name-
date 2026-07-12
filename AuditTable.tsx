// ============================================================
// AssetFlow ERP — Asset Verification Table
// ============================================================

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import type { AuditItem, AuditCycle } from '@/types';
import { StatusChip } from '@/components/shared/StatusChip';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
  Search, CheckCircle2, AlertTriangle, XCircle, MoreHorizontal,
  ChevronLeft, ChevronRight, ShieldCheck, ShieldAlert, ShieldX,
} from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';

interface AuditTableProps {
  audit: AuditCycle | null;
  items: AuditItem[];
  onVerify: (auditId: string, itemId: string, status: 'verified' | 'missing' | 'damaged', notes?: string) => Promise<void>;
  onBulkVerify: (auditId: string, itemIds: string[], status: 'verified' | 'missing' | 'damaged') => Promise<void>;
  isSubmitting: boolean;
}

export function AuditTable({ audit, items, onVerify, onBulkVerify, isSubmitting }: AuditTableProps) {
  const [search, setSearch] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const isActive = audit?.status === 'active';

  const filteredItems = useMemo(() => {
    return items.filter(item => {
      if (!search) return true;
      const s = search.toLowerCase();
      return item.assetTag.toLowerCase().includes(s) ||
        item.assetName.toLowerCase().includes(s) ||
        item.department.toLowerCase().includes(s) ||
        item.expectedLocation.toLowerCase().includes(s);
    });
  }, [items, search]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredItems.slice(start, start + pageSize);
  }, [filteredItems, page]);

  const totalPages = Math.ceil(filteredItems.length / pageSize);

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedItems.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedItems.map(i => i.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]);
  };

  const handleBulk = async (status: 'verified' | 'missing' | 'damaged') => {
    if (!audit || selectedIds.length === 0) return;
    await onBulkVerify(audit.id, selectedIds, status);
    setSelectedIds([]);
  };

  if (!audit) {
    return (
      <EmptyState
        icon="clipboard"
        title="No Audit Cycle Selected"
        description="Select an audit cycle from the list above to view and verify assets."
      />
    );
  }

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by tag, name, department..."
            className="pl-9 text-[12px] h-9"
          />
        </div>

        {isActive && selectedIds.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-medium">{selectedIds.length} selected</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulk('verified')}
              disabled={isSubmitting}
              className="h-8 text-[11px] gap-1.5 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Verify
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulk('missing')}
              disabled={isSubmitting}
              className="h-8 text-[11px] gap-1.5 border-red-200 text-red-700 hover:bg-red-50"
            >
              <ShieldX className="w-3.5 h-3.5" />
              Missing
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulk('damaged')}
              disabled={isSubmitting}
              className="h-8 text-[11px] gap-1.5 border-amber-200 text-amber-700 hover:bg-amber-50"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              Damaged
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      {filteredItems.length === 0 ? (
        <EmptyState
          icon="search"
          title="No Assets Found"
          description="No assets match your search criteria."
        />
      ) : (
        <div className="border rounded-xl overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                  {isActive && (
                    <TableHead className="w-10">
                      <Checkbox
                        checked={selectedIds.length === paginatedItems.length && paginatedItems.length > 0}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                  )}
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Asset Tag</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Asset Name</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Department</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Expected Location</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Current Location</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">Auditor</TableHead>
                  {isActive && <TableHead className="w-10"></TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedItems.map(item => (
                  <TableRow key={item.id} className="hover:bg-slate-50/50 group">
                    {isActive && (
                      <TableCell className="py-3">
                        <Checkbox
                          checked={selectedIds.includes(item.id)}
                          onCheckedChange={() => toggleSelect(item.id)}
                        />
                      </TableCell>
                    )}
                    <TableCell className="py-3">
                      <span className="font-mono text-[12px] font-semibold text-slate-700">{item.assetTag}</span>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="text-[12px] text-slate-700 font-medium">{item.assetName}</span>
                    </TableCell>
                    <TableCell className="py-3 hidden md:table-cell">
                      <span className="text-[12px] text-slate-500">{item.department}</span>
                    </TableCell>
                    <TableCell className="py-3 hidden lg:table-cell">
                      <span className="text-[12px] text-slate-500">{item.expectedLocation}</span>
                    </TableCell>
                    <TableCell className="py-3 hidden lg:table-cell">
                      <span className={cn(
                        'text-[12px]',
                        item.currentLocation !== item.expectedLocation ? 'text-red-500 font-medium' : 'text-slate-500'
                      )}>
                        {item.currentLocation}
                      </span>
                    </TableCell>
                    <TableCell className="py-3">
                      <StatusChip status={item.verificationStatus} variant="verification" size="sm" />
                    </TableCell>
                    <TableCell className="py-3 hidden sm:table-cell">
                      <span className="text-[12px] text-slate-500">{item.verifiedBy || '—'}</span>
                    </TableCell>
                    {isActive && (
                      <TableCell className="py-3">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
                              <MoreHorizontal className="w-4 h-4 text-slate-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => onVerify(audit.id, item.id, 'verified')} className="gap-2 text-[12px] cursor-pointer">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              Mark Verified
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onVerify(audit.id, item.id, 'missing')} className="gap-2 text-[12px] cursor-pointer">
                              <XCircle className="w-3.5 h-3.5 text-red-500" />
                              Mark Missing
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onVerify(audit.id, item.id, 'damaged')} className="gap-2 text-[12px] cursor-pointer">
                              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                              Mark Damaged
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t bg-slate-50/50">
              <span className="text-[11px] text-slate-400">
                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredItems.length)} of {filteredItems.length}
              </span>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="h-7 w-7 p-0">
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-[11px] text-slate-500 px-2">{page} / {totalPages}</span>
                <Button variant="ghost" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="h-7 w-7 p-0">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
