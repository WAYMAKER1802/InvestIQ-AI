import { motion } from 'framer-motion';
import { FileText, Download, Plus, Clock, CheckCircle, AlertCircle, Trash2 } from 'lucide-react';

const reports = [
  { id: '1', title: 'Portfolio Analysis Report — June 2025', type: 'portfolio_analysis', date: '2025-06-30', status: 'ready', size: '2.4 MB', pages: 18 },
  { id: '2', title: 'Weekly Digest — Week 26, 2025', type: 'weekly_digest', date: '2025-06-28', status: 'ready', size: '1.1 MB', pages: 8 },
  { id: '3', title: 'AI Risk Assessment Report', type: 'risk_assessment', date: '2025-06-15', status: 'ready', size: '3.2 MB', pages: 24 },
  { id: '4', title: 'Goal Progress Report — Q2 2025', type: 'goal_progress', date: '2025-06-01', status: 'ready', size: '1.8 MB', pages: 12 },
  { id: '5', title: 'Tax Harvest Opportunities', type: 'tax_report', date: '2025-05-30', status: 'generating', size: null, pages: null },
];

const statusIcon = (status: string) => {
  if (status === 'ready') return <CheckCircle className="w-4 h-4 text-emerald-600" />;
  if (status === 'generating') return <Clock className="w-4 h-4 text-amber-600 animate-spin" />;
  return <AlertCircle className="w-4 h-4 text-red-500" />;
};

const typeColors: Record<string, string> = {
  portfolio_analysis: 'bg-indigo-600/15 text-indigo-600',
  weekly_digest     : 'bg-cyan-500/15 text-cyan-400',
  risk_assessment   : 'bg-rose-500/15 text-red-500',
  goal_progress     : 'bg-emerald-500/15 text-emerald-600',
  tax_report        : 'bg-amber-500/15 text-amber-600',
};

export default function Reports() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black font-display text-slate-900">AI Reports</h1>
          <p className="text-slate-500 text-sm mt-0.5">Auto-generated portfolio analysis documents</p>
        </div>
        <button className="btn-primary text-sm gap-2">
          <Plus className="w-4 h-4" /> Generate Report
        </button>
      </div>

      {/* Report Cards */}
      <div className="space-y-3">
        {reports.map((r, i) => (
          <motion.div key={r.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="card-static flex items-center gap-4 p-4 hover:border-white/15 transition-all">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-slate-900 truncate">{r.title}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className={`badge text-2xs ${typeColors[r.type] || 'badge-neutral'}`}>{r.type.replace(/_/g, ' ')}</span>
                <span className="text-2xs text-slate-500">{r.date}</span>
                {r.size && <span className="text-2xs text-slate-500">{r.size} · {r.pages} pages</span>}
              </div>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              {statusIcon(r.status)}
              {r.status === 'ready' && (
                <button className="btn-secondary text-xs gap-1.5 py-1.5 px-3">
                  <Download className="w-3.5 h-3.5" /> Download
                </button>
              )}
              {r.status === 'generating' && (
                <span className="text-2xs text-amber-600 font-medium">Generating...</span>
              )}
              <button className="btn-icon p-1.5"><Trash2 className="w-3.5 h-3.5 text-slate-600 hover:text-red-500" /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
