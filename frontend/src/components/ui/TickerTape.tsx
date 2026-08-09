import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { marketApi } from '@/api/market.api';

const baseIndices = [
  { symbol: '^NSEI',    name: 'NIFTY 50',   value: '23,962.80', change: '+80.75',  percent: '+0.34%', up: true  },
  { symbol: '^BSESN',   name: 'SENSEX',      value: '76,741.82', change: '+238.22', percent: '+0.31%', up: true  },
  { symbol: '^NSEBANK', name: 'BANKNIFTY',   value: '57,252.45', change: '+509.85', percent: '+0.90%', up: true  },
  { symbol: 'RELIANCE', name: 'RELIANCE',    value: '2954.20',   change: '+70.50',  percent: '+2.45%', up: true  },
  { symbol: 'TATASTEEL',name: 'TATA STEEL',  value: '142.50',    change: '+2.50',   percent: '+1.80%', up: true  },
  { symbol: 'INFY',     name: 'INFOSYS',     value: '1482.00',   change: '-18.75',  percent: '-1.25%', up: false },
  { symbol: 'ZOMATO',   name: 'ZOMATO',      value: '165.30',    change: '+6.55',   percent: '+4.12%', up: true  },
];

export default function TickerTape() {
  const [indices, setIndices] = useState(baseIndices);

  useEffect(() => {
    const symbols = baseIndices.map(b => b.symbol);
    const fetchPrices = () => {
      marketApi.getBatchQuotes(symbols)
        .then(res => {
          const data = res.data?.data || res.data || {};
          const livePrices = data.quotes || data;
          setIndices(prev => prev.map(item => {
            const lp = livePrices[item.symbol];
            if (lp) {
              return {
                ...item,
                value: lp.currentPrice.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
                change: (lp.dayChange > 0 ? '+' : '') + lp.dayChange.toFixed(2),
                percent: (lp.dayChange > 0 ? '+' : '') + lp.dayChangePct.toFixed(2) + '%',
                up: lp.dayChange >= 0
              };
            }
            return item;
          }));
        })
        .catch(() => {});
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex overflow-hidden bg-white border-b border-slate-100 h-9 items-center select-none flex-shrink-0">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...indices, ...indices, ...indices].map((idx, i) => (
          <div key={i} className="flex items-center gap-2.5 px-5 border-r border-slate-100">
            <span className="text-xs font-bold text-slate-600" style={{ fontFamily: 'Outfit, sans-serif' }}>{idx.name}</span>
            <span className="text-xs font-numeric text-slate-800 font-semibold">{idx.value}</span>
            <span className={`text-xs font-numeric flex items-center gap-0.5 font-semibold ${idx.up ? 'text-emerald-600' : 'text-red-500'}`}>
              {idx.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {idx.change} ({idx.percent})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
