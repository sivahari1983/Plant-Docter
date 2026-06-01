const config = {
  healthy:     { label: 'Healthy',           bg: 'bg-forest-500', icon: '🌿' },
  mild_stress: { label: 'Mild Stress',        bg: 'bg-amber-400',  icon: '🌡' },
  stressed:    { label: 'Stressed',           bg: 'bg-orange-500', icon: '⚠️' },
  severe:      { label: 'Severely Stressed',  bg: 'bg-red-500',    icon: '🚨' },
};

export default function ConditionBadge({ condition }) {
  const cfg = config[condition] || config.mild_stress;
  return (
    <span className={`${cfg.bg} text-white inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold`}>
      <span aria-hidden="true">{cfg.icon}</span>
      {cfg.label}
    </span>
  );
}
