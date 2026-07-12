// ============================================================
// AssetFlow ERP — Activity Log Table
// ============================================================

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import type { ActivityLog, ActivityLogFilters } from '@/types';
import { StatusChip } from '@/components/shared/StatusChip';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import {
  Search, ChevronLeft, ChevronRight, Globe,
  Clock, Filter, Download,
} from 'lucide-react';
import { EmptyState } from '@/components/shared/EmptyState';

interface ActivityLogTableProps {
  logs: ActivityLog[];
  filters: ActivityLogFilters;
  onFilterChange: (filters: Partial<ActivityLogFilters>) => void;
  modules: string[];
  onExport: () => void;
  isExporting: boolean;
}

function formatDate(date: string): string {
  const d = new Date(date);
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function getActionColor(action: string): string {
  if (action.includes('CREATE') || action.includes('REGISTER')) return 'text-emerald-600 bg-emerald-50';
  if (action.includes('DELETE') || action.includes('REJECT')) return 'text-red-600 bg-red-50';
  if (action.includes('UPDATE') || action.includes('VERIFY')) return 'text-blue-600 bg-blue-50';
  if (action.includes('CLOSE') || action.includes('APPROVE')) return 'text-purple-600 bg-purple-50';
  return 'text-slate-600 bg-slate-50';
}

export function ActivityLogTable({
  logs, filters, onFilterChange, modules, onExport, isExporting,
}: ActivityLogTableProps) {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      if (filters.search) {
        const s = filters.search.toLowerCase();
        if (!log.description.toLowerCase().includes(s) &&
            !log.userName.toLowerCase().includes(s) &&
            !log.action.toLowerCase().includes(s)) return false;
      }
      if (filters.severity !== 'all' && log.severity !== filters.severity) return false;
      if (filters.users.length > 0 && !filters.users.includes(log.userId)) return false;
      if (filters.actions.length > 0 && !filters.actions.includes(log.action)) return false;
      if (filters.modules.length > 0 && !filters.modules.includes(log.module)) return false;
      return true;
    });
  }, [logs, filters]);

  const paginatedLogs = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredLogs.slice(start, start + pageSize);
  }, [filteredLogs, page]);

  const totalPages = Math.ceil(filteredLogs.length / pageSize);

  const toggleModule = (mod: string) => {
    const current = filters.modules;
    onFilterChange({
      modules: current.includes(mod) ? current.filter(m => m !== mod) : [...current, mod],
    });
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={filters.search}
              onChange={(e) => onFilterChange({ search: e.target.value })}
              placeholder="Search logs..."
              className="pl-9 text-[12px] h-9"
            />
          </div>
          <Select value={filters.severity} onValueChange={(v) => onFilterChange({ severity: v as any })}>
            <SelectTrigger className="w-[110px] h-9 text-[12px]">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severity</SelectItem>
              <SelectItem value="critical">Critical</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="debug">Debug</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onExport}
          disabled={isExporting}
          className="gap-1.5 text-[11px] font-medium border-slate-200 text-slate-600 hover:bg-slate-50"
        >
          <Download className="w-3.5 h-3.5" />
          Export
        </Button>
      </div>

      {/* Quick Filters */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
          <Filter className="w-3 h-3" /> Modules:
        </span>
        {modules.map(m => (
          <button
            key={m}
            onClick={() => toggleModule(m)}
            className={cn(
              'px-2 py-0.5 rounded text-[10px] font-medium border capitalize transition-all',
              filters.modules.includes(m)
                ? 'bg-blue-50 border-blue-200 text-blue-700'
                : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
            )}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Table */}
      {paginatedLogs.length === 0 ? (
        <EmptyState
          icon="search"
          title="No Activity Logs"
          description="No logs match your current filters."
        />
      ) : (
        <div className="border rounded-xl overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-[180px]">Timestamp</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">User</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Action</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Module</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Description</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider hidden sm:table-cell">IP / Browser</TableHead>
                  <TableHead className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider w-[80px]">Severity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLogs.map((log, i) => (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.15, delay: i * 0.02 }}
                    className="hover:bg-slate-50/50 border-b border-slate-50 last:border-b-0"
                  >
                    <TableCell className="py-3">
                      <span className="flex items-center gap-1.5 text-[11px] text-slate-500">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {formatDate(log.timestamp)}
                      </span>
                    </TableCell>
                    <TableCell className="py-3">
                      <div>
                        <span className="text-[12px] font-medium text-slate-700">{log.userName}</span>
                        <span className="text-[10px] text-slate-400 ml-1.5 capitalize">({log.role.replace('_', ' ')})</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className={cn('px-2 py-0.5 rounded text-[10px] font-semibold', getActionColor(log.action))}>
                        {log.action}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 hidden md:table-cell">
                      <span className="text-[11px] text-slate-500 capitalize">{log.module}</span>
                    </TableCell>
                    <TableCell className="py-3">
                      <span className="text-[12px] text-slate-600 max-w-[300px] truncate block" title={log.description}>
                        {log.description}
                      </span>
                    </TableCell>
                    <TableCell className="py-3 hidden sm:table-cell">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400">
                        <Globe className="w-3 h-3" />
                        {log.ipAddress}
                      </div>
                    </TableCell>
                    <TableCell className="py-3">
                      <StatusChip status={log.severity} variant="severity" size="sm" />
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t bg-slate-50/50">
              <span className="text-[11px] text-slate-400">
                Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredLogs.length)} of {filteredLogs.length}
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
