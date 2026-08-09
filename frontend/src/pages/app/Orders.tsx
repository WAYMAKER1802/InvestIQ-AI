import React from 'react';
import { FileText, Clock } from 'lucide-react';

export default function Orders() {
  return (
    <div className="space-y-6 max-w-[1000px] mx-auto">
      <div>
        <h1 className="text-2xl font-black font-display text-slate-900 flex items-center gap-2">
          <FileText className="w-6 h-6 text-indigo-600" /> Orders
        </h1>
        <p className="text-slate-500 text-sm mt-0.5">Track your past and pending orders.</p>
      </div>

      <div className="card-static p-12 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center mb-4">
          <Clock className="w-8 h-8 text-indigo-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">No active orders</h3>
        <p className="text-slate-500 max-w-sm">
          You haven't placed any orders recently. Go to Explore to start investing.
        </p>
      </div>
    </div>
  );
}
