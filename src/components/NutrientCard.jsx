import { CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';

const statusConfig = {
  sufficient: {
    chipBg:   'bg-forest-200',
    chipText: 'text-forest-900',
    icon:     CheckCircle2,
    label:    'Sufficient',
    cardBg:   'bg-forest-50',
    border:   'border-l-forest-500',
  },
  low: {
    chipBg:   'bg-soil-200',
    chipText: 'text-soil-800',
    icon:     AlertTriangle,
    label:    'Low',
    cardBg:   'bg-amber-50',
    border:   'border-l-amber-400',
  },
  deficient: {
    chipBg:   'bg-red-50',
    chipText: 'text-red-700',
    icon:     AlertCircle,
    label:    'Deficient',
    cardBg:   'bg-red-50',
    border:   'border-l-red-500',
  },
};

export default function NutrientCard({ name, status, recommendation }) {
  const cfg  = statusConfig[status] || statusConfig.sufficient;
  const Icon = cfg.icon;

  return (
    <div className={`${cfg.cardBg} ${cfg.border} border-l-4 rounded-xl p-4`}>
      <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
        <span className="font-semibold text-forest-900 text-sm">{name}</span>
        <span
          className={`${cfg.chipBg} ${cfg.chipText} inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold`}
          aria-label={`${name}: ${cfg.label}`}
        >
          <Icon size={12} aria-hidden="true" />
          {cfg.label}
        </span>
      </div>
      <p className="text-slate-600 text-sm">{recommendation}</p>
    </div>
  );
}
