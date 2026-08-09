import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  TrendingUp, Brain, Shield, Target, Bot, FileText,
  CheckCircle2, ArrowRight, Sparkles, BarChart3, Bell,
  Users, Award, Zap, LineChart, PieChart, Star
} from 'lucide-react';
import TickerTape from '@/components/ui/TickerTape';

// ── Feature tiles ────────────────────────────────────────────────────────────
const features = [
  {
    icon: Brain,
    title: 'AI Portfolio Analysis',
    desc: 'Get a complete health check of your portfolio powered by AI. Uncover risks, opportunities, and insights in seconds.',
    iconBg: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
  },
  {
    icon: TrendingUp,
    title: 'Buy / Hold / Sell Engine',
    desc: 'AI-powered recommendations backed by fundamentals, technical indicators, and real-time market sentiment.',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Shield,
    title: 'Risk Assessment',
    desc: 'Stress-test your portfolio against market crashes, measure VaR, and get a one-click risk reduction plan.',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-600',
  },
  {
    icon: Target,
    title: 'Goal-Based Planning',
    desc: 'Set financial goals — retirement, education, home — and get a personalized SIP plan with AI course corrections.',
    iconBg: 'bg-amber-50',
    iconColor: 'text-amber-600',
  },
  {
    icon: Bot,
    title: 'AI Financial Coach',
    desc: 'Chat with your 24/7 AI advisor. Get expert answers tailored to your own portfolio, anytime.',
    iconBg: 'bg-sky-50',
    iconColor: 'text-sky-600',
  },
  {
    icon: FileText,
    title: 'Weekly AI Reports',
    desc: 'Auto-generated PDF reports every week — performance analysis, market digest, and next-week action items.',
    iconBg: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer',
    text: '"InvestIQ AI completely transformed how I manage my portfolio. The AI chat is like having a personal financial planner available 24/7. My returns improved by 22% in 6 months!"',
    initials: 'PS',
  },
  {
    name: 'Rahul Verma',
    role: 'Startup Founder',
    text: '"The risk analysis feature is incredible. It caught a dangerous concentration in my portfolio that I completely missed. The one-click risk reduction plan saved me from a significant loss."',
    initials: 'RV',
  },
  {
    name: 'Anita Patel',
    role: 'Doctor & Investor',
    text: '"As a busy professional, I needed something that could give me expert advice without spending hours on research. InvestIQ AI delivers exactly that — intelligent insights in seconds."',
    initials: 'AP',
  },
];

const stats = [
  { label: 'Investors', value: '12,000+', icon: Users },
  { label: 'AUM Tracked', value: '₹850 Cr+', icon: BarChart3 },
  { label: 'AI Insights Daily', value: '50,000+', icon: Sparkles },
  { label: 'Avg Returns Boost', value: '+18%', icon: TrendingUp },
];

// ── Mini mock dashboard preview ──────────────────────────────────────────────
const DashboardPreview = () => {
  const [price, setPrice] = useState(1307.8);
  useEffect(() => {
    const t = setInterval(() => setPrice(p => parseFloat((p + (Math.random() - 0.48) * 3).toFixed(2))), 2000);
    return () => clearInterval(t);
  }, []);
  const stocks = [
    { s: 'RELIANCE', p: price, c: +0.5 },
    { s: 'TCS', p: 2069.45, c: -0.32 },
    { s: 'INFY', p: 1068.2, c: +1.12 },
    { s: 'HDFCBANK', p: 824.95, c: -0.18 },
  ];
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl overflow-hidden">
      {/* Dashboard header */}
      <div className="bg-indigo-600 px-4 py-3 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-white/30" />
        <div className="w-3 h-3 rounded-full bg-white/30" />
        <div className="w-3 h-3 rounded-full bg-white/30" />
        <span className="ml-2 text-white text-xs font-medium opacity-80">InvestIQ AI — Dashboard</span>
      </div>
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* Portfolio value */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-3">
          <div className="text-xs text-slate-500 font-medium">Portfolio Value</div>
          <div className="text-xl font-black text-slate-900 font-numeric mt-0.5">₹8,42,350.00</div>
          <div className="text-xs text-emerald-600 font-semibold">▲ +₹12,420 (+1.50%) today</div>
        </div>
        {/* Chart placeholder */}
        <div className="h-16 bg-gradient-to-r from-indigo-100 to-indigo-50 rounded-xl flex items-end px-2 pb-1 gap-0.5">
          {[40, 55, 45, 70, 60, 75, 65, 80, 72, 88, 78, 92, 85, 95].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-indigo-400 opacity-70 transition-all" style={{ height: `${h}%` }} />
          ))}
        </div>
        {/* Stock list */}
        <div className="space-y-1.5">
          {stocks.map(s => (
            <div key={s.s} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-indigo-100 flex items-center justify-center text-2xs font-bold text-indigo-600">
                  {s.s[0]}
                </div>
                <span className="text-xs font-semibold text-slate-700">{s.s}</span>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-slate-900 font-numeric">₹{s.p.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</div>
                <div className={`text-2xs font-semibold ${s.c >= 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                  {s.c >= 0 ? '▲' : '▼'} {Math.abs(s.c)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* ── Ticker Tape ── */}
      <TickerTape />

      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center h-16 gap-8">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-sm">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-indigo-600 text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>InvestIQ AI</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600 flex-1">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#how" className="hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#testimonials" className="hover:text-indigo-600 transition-colors">Reviews</a>
            <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <Link to="/login" className="hidden md:block text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors px-4 py-2">
              Sign In
            </Link>
            <Link to="/register" className="btn-primary text-sm px-5 py-2.5">
              Get Started Free →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-100">
              <Sparkles className="w-3.5 h-3.5" />
              AI-Powered Financial Coaching
            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-tight" style={{ fontFamily: 'Outfit, sans-serif', color: '#0f172a' }}>
              Your AI Financial
              <span className="block text-indigo-600">Coach is Waiting.</span>
            </h1>

            <p className="text-lg text-slate-500 leading-relaxed">
              Track portfolios, get GPT-4 investment insights, plan goals,
              and stress-test your wealth — all in one premium platform.
            </p>

            <ul className="space-y-2">
              {['Live NSE & BSE stock prices', 'AI Buy/Hold/Sell signals', 'Risk analysis & goal planning', 'Free to start, no credit card needed'].map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 pt-2">
              <Link to="/register" className="btn-primary text-base px-6 py-3">
                Start for Free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link to="/login" className="text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors">
                Already have an account →
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex -space-x-2">
                {['P', 'R', 'A', 'S'].map((l, i) => (
                  <div key={i} className="w-7 h-7 rounded-full bg-indigo-100 border-2 border-white flex items-center justify-center text-2xs font-bold text-indigo-600">
                    {l}
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-500">
                <span className="font-bold text-slate-800">12,000+</span> investors trust InvestIQ AI
              </div>
            </div>
          </motion.div>

          {/* Right: Dashboard preview */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl -z-10" />
            <DashboardPreview />
          </motion.div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="bg-indigo-600">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center text-white">
              <div className="text-2xl md:text-3xl font-black">{value}</div>
              <div className="text-indigo-200 text-sm mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-indigo-100 mb-4">
            <Zap className="w-3.5 h-3.5" /> Everything you need
          </div>
          <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: 'Outfit, sans-serif', color: '#0f172a' }}>
            Invest smarter with AI
          </h2>
          <p className="text-slate-500 mt-3 text-lg max-w-2xl mx-auto">
            Six powerful AI tools to help you build wealth faster, avoid costly mistakes, and stay ahead of the market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="card p-6 group"
            >
              <div className={`w-10 h-10 rounded-xl ${f.iconBg} ${f.iconColor} flex items-center justify-center mb-4`}>
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── How it Works ── */}
      <section id="how" className="bg-slate-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: 'Outfit, sans-serif', color: '#0f172a' }}>
              Get started in 3 steps
            </h2>
            <p className="text-slate-500 mt-3 text-lg">No paperwork, no KYC delays. Just sign up and start investing smarter.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create your account', desc: 'Sign up for free in under 60 seconds. No credit card required.', icon: Users },
              { step: '02', title: 'Add your portfolio', desc: 'Import your holdings or add stocks manually. Works with any broker.', icon: PieChart },
              { step: '03', title: 'Get AI insights', desc: 'Instantly receive AI-powered analysis, recommendations, and alerts.', icon: Sparkles },
            ].map((s) => (
              <div key={s.step} className="text-center space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto font-black text-lg" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {s.step}
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section id="testimonials" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-black" style={{ fontFamily: 'Outfit, sans-serif', color: '#0f172a' }}>
            Loved by <span className="text-indigo-600">12,000+</span> investors
          </h2>
          <p className="text-slate-500 mt-3 text-lg">Real results from real people.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card p-6 space-y-4">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-600" />)}
              </div>
              <p className="text-slate-600 text-sm leading-relaxed italic">{t.text}</p>
              <div className="flex items-center gap-3 pt-1">
                <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-indigo-600 py-16">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Start investing smarter today
          </h2>
          <p className="text-indigo-200 text-lg">
            Join 12,000+ investors already using AI to grow their wealth. Free to start.
          </p>
          <Link to="/register" className="inline-flex items-center gap-2 bg-white text-indigo-600 font-bold px-8 py-3.5 rounded-xl hover:bg-indigo-50 transition-colors shadow-lg text-base">
            Get Started Free <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-slate-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-slate-700 text-sm">InvestIQ AI</span>
          </div>
          <p className="text-xs text-slate-500">© 2025 InvestIQ AI. Built with ❤️ for smart investors.</p>
          <div className="flex items-center gap-6 text-xs text-slate-500">
            <a href="#" className="hover:text-slate-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-slate-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
