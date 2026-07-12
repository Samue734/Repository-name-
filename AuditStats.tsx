// ============================================================
// AssetFlow ERP — Audit Statistics Cards & Progress
// ============================================================

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { ProgressRing } from '@/components/shared/ProgressRing';
import {
  ClipboardCheck, CheckCircle2, AlertTriangle, XCircle,
  Clock, Shield,
} from 'lucide-react';

interface AuditStatsProps {
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

export function AuditStats({ auditStats }: AuditStatsProps) {
  const completionRate = auditStats.totalAudits > 0
    ? ((auditStats.completedAudits + auditStats.lockedAudits) / auditStats.totalAudits) * 100
    : 0;

  const verificationRate = (auditStats.totalVerified + auditStats.totalMissing + auditStats.totalDamaged) > 0
    ? (auditStats.totalVerified / (auditStats.totalVerified + auditStats.totalMissing + auditStats.totalDamaged)) * 100
    : 0;

  const statCards = [
    { label: 'Total Audits', value: auditStats.totalAudits, icon: ClipboardCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Active', value: auditStats.activeAudits, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Completed', value: auditStats.completedAudits, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Locked', value: auditStats.lockedAudits, icon: Shield, color: 'text-slate-600', bg: 'bg-slate-100' },
  ];

  return (
    <div className="space-y-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.07 }}
            className="bg-white rounded-xl border border-slate-200/80 p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', card.bg)}>
                <card.icon className={cn('w-4 h-4', card.color)} />
              </div>
            </div>
            <p className="text-[22px] font-bold text-slate-800 leading-tight">{card.value}</p>
            <p className="text-[11px] text-slate-400 font-medium mt-0.5">{card.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Progress Rings Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-xl border border-slate-200/80 p-5 flex flex-col items-center"
        >
          <ProgressRing
            value={completionRate}
            size={100}
            strokeWidth={7}
            color="#2563eb"
            label="Audit Completion"
            sublabel={`${Math.round(completionRate)}% of cycles completed`}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="bg-white rounded-xl border border-slate-200/80 p-5 flex flex-col items-center"
        >
          <ProgressRing
            value={verificationRate}
            size={100}
            strokeWidth={7}
            color="#10b981"
            label="Verification Rate"
            sublabel={`${auditStats.totalVerified} of ${auditStats.totalVerified + auditStats.totalMissing + auditStats.totalDamaged} assets`}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="bg-white rounded-xl border border-slate-200/80 p-5"
        >
          <h4 className="text-[13px] font-semibold text-slate-700 mb-4 text-center">Discrepancy Summary</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-[12px] text-slate-600">Verified</span>
              </div>
              <span className="text-[14px] font-bold text-emerald-600">{auditStats.totalVerified}</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${verificationRate}%` }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-emerald-500 h-2 rounded-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-[12px] text-slate-600">Missing</span>
              </div>
              <span className="text-[14px] font-bold text-red-500">{auditStats.totalMissing}</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                <span className="text-[12px] text-slate-600">Damaged</span>
              </div>
              <span className="text-[14px] font-bold text-amber-500">{auditStats.totalDamaged}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
