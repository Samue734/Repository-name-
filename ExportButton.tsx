// ============================================================
// AssetFlow ERP — Export Button (PDF/Excel/CSV)
// ============================================================

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { FileText, Download, Loader2, FileSpreadsheet, FileCode } from 'lucide-react';

interface ExportButtonProps {
  onExport: (format: 'pdf' | 'excel' | 'csv') => Promise<void>;
  isExporting?: boolean;
  className?: string;
  label?: string;
}

export function ExportButton({ onExport, isExporting, className, label = 'Export' }: ExportButtonProps) {
  const [activeFormat, setActiveFormat] = useState<string | null>(null);

  const handleExport = async (format: 'pdf' | 'excel' | 'csv') => {
    setActiveFormat(format);
    await onExport(format);
    setActiveFormat(null);
  };

  const exporting = isExporting || activeFormat !== null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          disabled={exporting}
          className={cn(
            'gap-2 text-[12px] font-medium border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-800',
            className
          )}
        >
          {exporting ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Download className="w-3.5 h-3.5" />
          )}
          {label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem onClick={() => handleExport('pdf')} className="gap-2 text-[12px] cursor-pointer">
          <FileText className="w-3.5 h-3.5 text-red-500" />
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('excel')} className="gap-2 text-[12px] cursor-pointer">
          <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-500" />
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('csv')} className="gap-2 text-[12px] cursor-pointer">
          <FileCode className="w-3.5 h-3.5 text-blue-500" />
          Export as CSV
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
