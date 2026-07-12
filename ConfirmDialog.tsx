// ============================================================
// AssetFlow ERP — Confirmation Dialog
// ============================================================

import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription, AlertDialogFooter,
  AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'info';
  onConfirm: () => void;
  onCancel?: () => void;
}

const VARIANT_CONFIG = {
  danger: { icon: AlertTriangle, iconColor: 'text-red-500', bgColor: 'bg-red-50', buttonColor: 'bg-red-600 hover:bg-red-700' },
  warning: { icon: AlertTriangle, iconColor: 'text-amber-500', bgColor: 'bg-amber-50', buttonColor: 'bg-amber-600 hover:bg-amber-700' },
  info: { icon: CheckCircle, iconColor: 'text-blue-500', bgColor: 'bg-blue-50', buttonColor: 'bg-blue-600 hover:bg-blue-700' },
};

export function ConfirmDialog({
  open, onOpenChange, title, description,
  confirmLabel = 'Confirm', cancelLabel = 'Cancel',
  variant = 'warning', onConfirm, onCancel,
}: ConfirmDialogProps) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.icon;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader className="gap-3">
          <div className={cn('w-12 h-12 rounded-full flex items-center justify-center', config.bgColor)}>
            <Icon className={cn('w-6 h-6', config.iconColor)} />
          </div>
          <AlertDialogTitle className="text-[16px] font-semibold text-slate-800">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-[13px] text-slate-500 leading-relaxed">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel 
            onClick={onCancel}
            className="text-[13px] font-medium border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={cn('text-[13px] font-medium text-white', config.buttonColor)}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
