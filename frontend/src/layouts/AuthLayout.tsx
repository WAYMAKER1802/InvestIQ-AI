import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Shield, Brain, BarChart3, CheckCircle2 } from 'lucide-react';

const features = [
  { icon: Brain,      text: 'GPT-4 AI Financial Coach'          },
  { icon: BarChart3,  text: 'Real-time Portfolio Analytics'     },
  { icon: Shield,     text: 'Enterprise-grade Security'          },
  { icon: TrendingUp, text: 'Smart Investment Recommendations'   },
];

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-[#f8faff]">

      {/* Left Panel — Brand (Angel One-inspired) */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-indigo-600 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/5 translate-y-1/3 -translate-x-1/3" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />

        <div className="relative">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-lg font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>InvestIQ AI</div>
              <div className="text-xs text-indigo-200">AI-Driven Portfolio Advisor</div>
            </div>
          </div>

          {/* Hero text */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h1 className="text-4xl font-black text-white leading-tight mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Your AI-Powered<br />
              <span className="text-indigo-200">Financial Coach</span><br />
              is waiting.
            </h1>
            <p className="text-indigo-200 text-sm leading-relaxed max-w-sm">
              Track portfolios, get GPT-4 investment insights, plan goals, and stress-test your wealth — all in one premium platform.
            </p>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="relative space-y-3">
          {features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
                <f.icon className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm text-indigo-100">{f.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <div className="relative text-xs text-indigo-300">
          © 2025 InvestIQ AI · Built with ❤️ for smart investors
        </div>
      </div>

      {/* Right Panel — Auth Form */}
      <div className="flex items-center justify-center px-6 py-12 lg:px-12 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-indigo-600" style={{ fontFamily: 'Outfit, sans-serif' }}>InvestIQ AI</span>
          </div>

          {children || <Outlet />}
        </div>
      </div>
    </div>
  );
}
