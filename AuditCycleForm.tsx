// ============================================================
// AssetFlow ERP — Audit Cycle Form (Create/Edit)
// ============================================================

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { AuditCycle, Department } from '@/types';
import { Loader2 } from 'lucide-react';

interface AuditCycleFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  audit: AuditCycle | null;
  departments: Department[];
  locations: string[];
  auditors: { id: string; name: string }[];
  onSubmit: (data: any) => Promise<void>;
  isSubmitting: boolean;
}

export function AuditCycleForm({ open, onOpenChange, audit, departments, locations, auditors, onSubmit, isSubmitting }: AuditCycleFormProps) {
  const [name, setName] = useState('');
  const [selectedDepts, setSelectedDepts] = useState<string[]>([]);
  const [selectedLocs, setSelectedLocs] = useState<string[]>([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedAuditors, setSelectedAuditors] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (audit) {
      setName(audit.name);
      setSelectedDepts(audit.departments);
      setSelectedLocs(audit.locations);
      setStartDate(audit.startDate);
      setEndDate(audit.endDate);
      setSelectedAuditors(audit.assignedAuditors);
      setNotes(audit.notes || '');
    } else {
      setName('');
      setSelectedDepts([]);
      setSelectedLocs([]);
      setStartDate('');
      setEndDate('');
      setSelectedAuditors([]);
      setNotes('');
    }
    setErrors({});
  }, [audit, open]);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim() || name.length < 3) errs.name = 'Name must be at least 3 characters';
    if (selectedDepts.length === 0) errs.departments = 'Select at least one department';
    if (selectedLocs.length === 0) errs.locations = 'Select at least one location';
    if (!startDate) errs.startDate = 'Start date is required';
    if (!endDate) errs.endDate = 'End date is required';
    if (startDate && endDate && new Date(endDate) <= new Date(startDate)) errs.endDate = 'End date must be after start date';
    if (selectedAuditors.length === 0) errs.auditors = 'Assign at least one auditor';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      name,
      departments: selectedDepts,
      locations: selectedLocs,
      startDate,
      endDate,
      auditors: selectedAuditors,
      notes,
    });
    onOpenChange(false);
  };

  const toggleSelection = (id: string, selected: string[], setter: (v: string[]) => void) => {
    setter(selected.includes(id) ? selected.filter(v => v !== id) : [...selected, id]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[16px] font-semibold text-slate-800">
            {audit ? 'Edit Audit Cycle' : 'Create Audit Cycle'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="space-y-1.5">
            <Label className="text-[12px] font-semibold text-slate-700">Audit Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Q3 2025 Engineering Audit"
              className={cn('text-[13px]', errors.name && 'border-red-300 focus-visible:ring-red-200')}
            />
            {errors.name && <p className="text-[11px] text-red-500">{errors.name}</p>}
          </div>

          {/* Departments */}
          <div className="space-y-1.5">
            <Label className="text-[12px] font-semibold text-slate-700">Departments</Label>
            <div className="flex flex-wrap gap-1.5 p-2 border rounded-lg bg-slate-50/50">
              {departments.map(d => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => toggleSelection(d.id, selectedDepts, setSelectedDepts)}
                  className={cn(
                    'px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all',
                    selectedDepts.includes(d.id)
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  )}
                >
                  {d.name}
                </button>
              ))}
            </div>
            {errors.departments && <p className="text-[11px] text-red-500">{errors.departments}</p>}
          </div>

          {/* Locations */}
          <div className="space-y-1.5">
            <Label className="text-[12px] font-semibold text-slate-700">Locations</Label>
            <div className="flex flex-wrap gap-1.5 p-2 border rounded-lg bg-slate-50/50">
              {locations.map(loc => (
                <button
                  key={loc}
                  type="button"
                  onClick={() => toggleSelection(loc, selectedLocs, setSelectedLocs)}
                  className={cn(
                    'px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all',
                    selectedLocs.includes(loc)
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  )}
                >
                  {loc}
                </button>
              ))}
            </div>
            {errors.locations && <p className="text-[11px] text-red-500">{errors.locations}</p>}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label className="text-[12px] font-semibold text-slate-700">Start Date</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={cn('text-[13px]', errors.startDate && 'border-red-300')}
              />
              {errors.startDate && <p className="text-[11px] text-red-500">{errors.startDate}</p>}
            </div>
            <div className="space-y-1.5">
              <Label className="text-[12px] font-semibold text-slate-700">End Date</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={cn('text-[13px]', errors.endDate && 'border-red-300')}
              />
              {errors.endDate && <p className="text-[11px] text-red-500">{errors.endDate}</p>}
            </div>
          </div>

          {/* Auditors */}
          <div className="space-y-1.5">
            <Label className="text-[12px] font-semibold text-slate-700">Assigned Auditors</Label>
            <div className="flex flex-wrap gap-1.5 p-2 border rounded-lg bg-slate-50/50">
              {auditors.map(a => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => toggleSelection(a.id, selectedAuditors, setSelectedAuditors)}
                  className={cn(
                    'px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all',
                    selectedAuditors.includes(a.id)
                      ? 'bg-blue-50 border-blue-200 text-blue-700'
                      : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'
                  )}
                >
                  {a.name}
                </button>
              ))}
            </div>
            {errors.auditors && <p className="text-[11px] text-red-500">{errors.auditors}</p>}
          </div>

          {/* Notes */}
          <div className="space-y-1.5">
            <Label className="text-[12px] font-semibold text-slate-700">Notes</Label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes about this audit cycle..."
              className="text-[13px] min-h-[80px] resize-none"
            />
          </div>

          <DialogFooter className="gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-[12px] font-medium border-slate-200"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="text-[12px] font-medium bg-[#2563eb] hover:bg-blue-700 text-white gap-2"
            >
              {isSubmitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {audit ? 'Update Cycle' : 'Create Cycle'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
