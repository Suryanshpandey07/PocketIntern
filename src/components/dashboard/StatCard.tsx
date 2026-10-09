import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: string;
  trendPositive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendPositive = true,
  onClick,
  className = '',
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-200/90 p-5 shadow-subtle transition-all duration-200 ${
        onClick ? 'cursor-pointer hover:border-slate-300 hover:shadow-hover' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
            {title}
          </span>
          <div className="text-2xl font-black text-navy-800 mt-1 tracking-tight">
            {value}
          </div>
          {subtitle && (
            <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2 text-[11px] font-semibold">
              <span className={trendPositive ? 'text-emerald-600' : 'text-rose-600'}>
                {trend}
              </span>
              <span className="text-slate-400 font-normal">vs last month</span>
            </div>
          )}
        </div>
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 shadow-sm flex-shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
};
