import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const suggestions = [
  { symbol: 'RELIANCE',   name: 'Reliance Industries'       },
  { symbol: 'TCS',        name: 'Tata Consultancy Services' },
  { symbol: 'HDFCBANK',   name: 'HDFC Bank'                 },
  { symbol: 'INFY',       name: 'Infosys'                   },
  { symbol: 'ZOMATO',     name: 'Zomato Ltd'                },
  { symbol: 'SUZLON',     name: 'Suzlon Energy'             },
  { symbol: 'TATAMOTORS', name: 'Tata Motors'               },
  { symbol: 'WIPRO',      name: 'Wipro Ltd'                 },
  { symbol: 'SBIN',       name: 'State Bank of India'       },
  { symbol: 'ADANIENT',   name: 'Adani Enterprises'         },
];

export default function GlobalSearch() {
  const [query, setQuery]   = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const navigate   = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (symbol: string) => {
    setQuery('');
    setIsOpen(false);
    navigate(`/app/stock/${symbol.toUpperCase()}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      e.preventDefault();
      const match = suggestions.find(s =>
        s.symbol.toLowerCase() === query.toLowerCase() ||
        s.name.toLowerCase().includes(query.toLowerCase())
      );
      handleSearch(match ? match.symbol : query.trim());
    }
    if (e.key === 'Escape') setIsOpen(false);
  };

  const filtered = suggestions.filter(s =>
    s.symbol.toLowerCase().includes(query.toLowerCase()) ||
    s.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="relative z-50 flex-1 max-w-md ml-4" ref={wrapperRef}>
      <div className="relative flex items-center">
        <Search className="w-4 h-4 text-slate-500 absolute left-3" />
        <input
          type="text"
          placeholder="Search stocks, ETFs on NSE & BSE..."
          value={query}
          onChange={(e) => { setQuery(e.target.value); setIsOpen(true); }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8, transition: { duration: 0.1 } }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden py-1.5"
          >
            {filtered.length > 0 ? (
              filtered.map((item) => (
                <div
                  key={item.symbol}
                  onClick={() => handleSearch(item.symbol)}
                  className="px-4 py-2.5 hover:bg-indigo-50 cursor-pointer flex justify-between items-center transition-colors"
                >
                  <span className="text-sm font-semibold text-slate-800">{item.name}</span>
                  <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded">{item.symbol}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-slate-500 text-center">
                Press Enter to search for "<span className="text-indigo-600 font-medium">{query}</span>"
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
