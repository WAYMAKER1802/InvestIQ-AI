import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

interface LoadingScreenProps {
  message?: string;
}

export default function LoadingScreen({ message = 'Loading InvestIQ AI...' }: LoadingScreenProps) {
  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      {/* Soft background accent */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-100/60 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col items-center gap-6"
      >
        {/* Logo */}
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-3 rounded-full border border-indigo-200"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-6 rounded-full border border-indigo-100"
          />
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg">
            <TrendingUp className="w-8 h-8 text-slate-900" />
          </div>
        </div>

        {/* Brand */}
        <div className="text-center">
          <h2 className="text-2xl font-black text-indigo-600" style={{ fontFamily: 'Outfit, sans-serif' }}>InvestIQ AI</h2>
          <p className="text-sm text-slate-500 mt-1">{message}</p>
        </div>

        {/* Progress dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-indigo-500"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
