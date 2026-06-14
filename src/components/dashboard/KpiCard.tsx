"use client";

interface Props {
  title: string;
  value: string;
  icon: string;
  badge?: string;
  badgeColor?: "green" | "red" | "yellow" | "default";
  iconBg?: string;
}

export default function KpiCard({ title, value, icon, badge, badgeColor = "default", iconBg }: Props) {
  const badgeColors = {
    green: "text-green-700 bg-green-50",
    red: "text-error bg-error-container/50",
    yellow: "text-on-secondary-container bg-secondary-container/40",
    default: "text-on-surface-variant bg-surface-container",
  };

  return (
    <div className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/20 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${iconBg ?? "bg-primary/10 text-primary"}`}>
          <span className="material-symbols-outlined" style={{ fontSize: 22 }}>{icon}</span>
        </div>
        {badge && (
          <span className={`text-xs font-bold px-2 py-1 rounded-md ${badgeColors[badgeColor]}`}>
            {badge}
          </span>
        )}
      </div>
      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">{title}</p>
      <p className="font-headline-sm text-headline-sm text-on-surface">{value}</p>
    </div>
  );
}
