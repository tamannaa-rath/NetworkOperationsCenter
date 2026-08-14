import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  variant: "blue" | "red" | "orange" | "green" | "purple";
  positive?: boolean;
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  variant,
  positive = true,
}: StatCardProps) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${variant}`}>
        <Icon size={21} />
      </div>

      <div className="stat-content">
        <span className="stat-title">{title}</span>

        <strong className="stat-value">
          {value}
        </strong>

        <span
          className={`stat-change ${
            positive ? "positive" : "negative"
          }`}
        >
          {positive ? "▲" : "▼"} {change}
        </span>
      </div>
    </div>
  );
}

export default StatCard;