import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: { value: number; isPositive: boolean };
}

export default function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
          {icon}
        </div>
        {trend && (
          <div className={`px-2.5 py-1 rounded-full text-xs font-semibold ${trend.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
            {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <div>
        <h4 className="text-slate-500 text-sm font-medium mb-1">{title}</h4>
        <div className="text-2xl font-bold text-slate-900">{value}</div>
      </div>
    </div>
  );
}
