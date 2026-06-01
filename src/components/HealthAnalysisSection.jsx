import { AlertTriangle, Beaker, Clock, ShieldCheck, Zap } from 'lucide-react';
import ConditionBadge from './ConditionBadge';

const likelihoodStyle = {
  high:   'bg-red-100   text-red-700   border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low:    'bg-slate-100 text-slate-600 border-slate-200',
};

const priorityStyle = {
  urgent:      { bar: 'bg-red-500',    badge: 'bg-red-100   text-red-700',   label: 'Urgent'      },
  recommended: { bar: 'bg-amber-400',  badge: 'bg-amber-100 text-amber-700', label: 'Recommended' },
  optional:    { bar: 'bg-forest-400', badge: 'bg-sage-100  text-forest-700',label: 'Optional'    },
};

export default function HealthAnalysisSection({ health }) {
  if (!health) return null;

  const { overallCondition, conditionSummary, symptoms, rootCauses,
          supplements, immediateActions, recoveryTimeline, preventionTips } = health;

  return (
    <div className="space-y-4">

      {/* ── Overall condition ── */}
      <div className="bg-white rounded-2xl shadow-card p-4">
        <div className="flex items-center gap-3 mb-2">
          <ConditionBadge condition={overallCondition} />
        </div>
        {conditionSummary && (
          <p className="text-slate-600 text-sm leading-relaxed">{conditionSummary}</p>
        )}
      </div>

      {/* ── Observed symptoms ── */}
      {symptoms?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-card p-4">
          <h2 className="font-semibold text-forest-900 mb-3 flex items-center gap-2 text-base">
            <AlertTriangle size={18} className="text-amber-500" aria-hidden="true" />
            Observed Symptoms
          </h2>
          <ul className="space-y-2">
            {symptoms.map((s, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="text-amber-500 mt-0.5 flex-shrink-0">•</span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Root causes ── */}
      {rootCauses?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-card p-4">
          <h2 className="font-semibold text-forest-900 mb-3 flex items-center gap-2 text-base">
            <Zap size={18} className="text-forest-500" aria-hidden="true" />
            Root Cause Analysis
          </h2>
          <div className="space-y-3">
            {rootCauses.map((rc, i) => (
              <div key={i} className={`border rounded-xl p-3 ${likelihoodStyle[rc.likelihood] || likelihoodStyle.low}`}>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-semibold text-sm">{rc.cause}</span>
                  <span className={`text-xs font-bold uppercase tracking-wide px-2 py-0.5 rounded-full border ${likelihoodStyle[rc.likelihood] || likelihoodStyle.low}`}>
                    {rc.likelihood}
                  </span>
                </div>
                <p className="text-xs leading-relaxed opacity-80">{rc.explanation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Supplements & treatments ── */}
      {supplements?.length > 0 && (
        <div className="bg-white rounded-2xl shadow-card p-4">
          <h2 className="font-semibold text-forest-900 mb-3 flex items-center gap-2 text-base">
            <Beaker size={18} className="text-forest-500" aria-hidden="true" />
            Supplements & Treatments
          </h2>
          <div className="space-y-3">
            {supplements.map((s, i) => {
              const ps = priorityStyle[s.priority] || priorityStyle.optional;
              return (
                <div key={i} className="border border-gray-100 rounded-xl overflow-hidden">
                  {/* Priority colour bar */}
                  <div className={`${ps.bar} h-1`} />
                  <div className="p-3">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <span className="font-semibold text-sm text-forest-900">{s.name}</span>
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0 ${ps.badge}`}>
                        {ps.label}
                      </span>
                    </div>
                    {s.purpose && (
                      <p className="text-xs text-slate-500 mb-2">{s.purpose}</p>
                    )}
                    <div className="grid grid-cols-2 gap-1 text-xs text-slate-600">
                      <span><span className="font-medium">Type:</span> {s.type}</span>
                      <span><span className="font-medium">How often:</span> {s.frequency}</span>
                      {s.dosage && (
                        <span className="col-span-2"><span className="font-medium">Dosage:</span> {s.dosage}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Action plan ── */}
      {(immediateActions || recoveryTimeline || preventionTips) && (
        <div className="bg-white rounded-2xl shadow-card p-4">
          <h2 className="font-semibold text-forest-900 mb-3 flex items-center gap-2 text-base">
            <ShieldCheck size={18} className="text-forest-500" aria-hidden="true" />
            Action Plan
          </h2>
          <div className="space-y-3">
            {immediateActions && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3">
                <p className="text-xs font-bold text-red-600 uppercase tracking-wide mb-1">Do Now</p>
                <p className="text-sm text-red-800">{immediateActions}</p>
              </div>
            )}
            {recoveryTimeline && (
              <div className="flex items-start gap-3 text-sm text-slate-600">
                <Clock size={16} className="text-forest-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-medium text-forest-900">Recovery timeline: </span>
                  {recoveryTimeline}
                </div>
              </div>
            )}
            {preventionTips && (
              <div className="bg-sage-100 rounded-xl p-3">
                <p className="text-xs font-bold text-forest-700 uppercase tracking-wide mb-1">Prevention</p>
                <p className="text-sm text-forest-800">{preventionTips}</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
