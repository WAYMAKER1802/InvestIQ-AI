import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, PieChart, MessageSquare, BarChart3, Newspaper,
  Target, ShieldAlert, Calculator, FileText, Bell, Activity, Trophy,
  Brain, Sunset, Settings, User, TrendingUp, Menu, X,
  ChevronRight, LogOut, Sparkles, ShoppingBag
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useNavigate } from 'react-router-dom';
import TickerTape from '@/components/ui/TickerTape';
import GlobalSearch from '@/components/ui/GlobalSearch';

const navItems = [
  { group: 'Trading',
    items: [
      { to: '/app/live-market', icon: Activity,        label: 'Explore'     },
      { to: '/app/portfolio',   icon: PieChart,        label: 'Holdings'    },
      { to: '/app/positions',   icon: LayoutDashboard, label: 'Positions'   },
      { to: '/app/orders',      icon: FileText,        label: 'Orders'      },
      { to: '/app/watchlist',   icon: Target,          label: 'Watchlist'   },
    ]
  },
  { group: 'AI Features',
    items: [
      { to: '/app/ai-chat',          icon: MessageSquare, label: 'AI Coach',          badge: 'AI'  },
      { to: '/app/recommendation',   icon: Sparkles,      label: 'AI Picks',          badge: 'New' },
      { to: '/app/risk-simulator',   icon: ShieldAlert,   label: 'Risk Simulator'                  },
      { to: '/app/wealth-score',     icon: Trophy,        label: 'Wealth Score'                    },
      { to: '/app/personality-test', icon: Brain,         label: 'Investor Profile'               },
    ]
  },
  { group: 'Planning & Tools',
    items: [
      { to: '/app/analytics',          icon: BarChart3,  label: 'Analytics'           },
      { to: '/app/goals',              icon: Target,     label: 'Goal Planner'        },
      { to: '/app/retirement-planner', icon: Sunset,     label: 'Retirement'          },
      { to: '/app/calculators',        icon: Calculator, label: 'Calculators'         },
      { to: '/app/news',               icon: Newspaper,  label: 'News'                },
      { to: '/app/alerts',             icon: Bell,       label: 'Alerts', badge: '3'  },
    ]
  },
  { group: 'Account',
    items: [
      { to: '/app/reports',  icon: FileText, label: 'Reports'  },
      { to: '/app/profile',  icon: User,     label: 'Profile'  },
      { to: '/app/settings', icon: Settings, label: 'Settings' },
    ]
  },
];

export default function AppLayout() {
  const [collapsed, setCollapsed]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate         = useNavigate();
  const location         = useLocation();

  const handleLogout = () => { logout(); navigate('/'); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-4 border-b border-slate-100 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
          <TrendingUp className="w-4 h-4 text-slate-900" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-sm font-black font-display text-indigo-600">InvestIQ AI</div>
            <div className="text-2xs text-slate-500">AI Portfolio Advisor</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-5 no-scrollbar px-2">
        {navItems.map(group => (
          <div key={group.group}>
            {!collapsed && (
              <div className="px-2 mb-1.5 text-2xs font-semibold text-slate-500 uppercase tracking-wider">
                {group.group}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `sidebar-item ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-2' : ''}`
                  }
                  title={collapsed ? item.label : undefined}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  {!collapsed && (
                    <>
                      <span className="flex-1 text-sm">{item.label}</span>
                      {'badge' in item && item.badge && (
                        <span className={item.badge === 'AI' || item.badge === 'New' ? 'badge-brand text-2xs' : 'badge-loss text-2xs px-1.5 py-0.5 rounded-full min-w-4 text-center'}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* User Footer */}
      <div className={`border-t border-slate-100 p-3 ${collapsed ? 'flex justify-center' : ''}`}>
        {!collapsed ? (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600 flex-shrink-0">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-slate-800 truncate">{user?.name || 'Demo User'}</div>
              <div className="text-2xs text-slate-500 truncate capitalize">{user?.role || 'free'} plan</div>
            </div>
            <button onClick={handleLogout} className="p-1.5 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-500 transition-all" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button onClick={handleLogout} className="btn-icon p-2 text-slate-500 hover:text-red-500" title="Logout">
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f8faff] overflow-hidden">

      {/* Desktop Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
        className="hidden md:flex flex-col bg-white border-r border-slate-100 relative z-10 flex-shrink-0"
        style={{ boxShadow: '1px 0 0 #e2e8f0' }}
      >
        <SidebarContent />
        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-32 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:border-indigo-300 hover:bg-indigo-50 transition-all z-20 shadow-sm"
        >
          <ChevronRight className={`w-3 h-3 text-slate-500 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
        </button>
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/30 z-30" onClick={() => setMobileOpen(false)} />
            <motion.aside initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }} transition={{ duration: 0.2 }}
              className="md:hidden fixed left-0 top-0 bottom-0 w-60 bg-white border-r border-slate-100 z-40 shadow-xl">
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Ticker Tape */}
        <TickerTape />

        {/* Top Bar */}
        <header className="relative z-50 h-14 border-b border-slate-100 bg-white flex items-center justify-between px-4 flex-shrink-0 gap-4">
          <div className="flex items-center gap-4 flex-1">
            <button onClick={() => setMobileOpen(true)} className="md:hidden btn-icon p-2">
              <Menu className="w-5 h-5 text-slate-600" />
            </button>

            {/* Global Search Bar */}
            <div className="hidden md:block flex-1 max-w-xl">
              <GlobalSearch />
            </div>

            {/* Asset Class Navigation */}
            <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-500">
              <NavLink to="/app/live-market" className={({ isActive }) =>
                `hover:text-indigo-600 transition-colors ${isActive ? 'text-indigo-600 border-b-2 border-indigo-600 py-4' : ''}`
              }>
                Stocks
              </NavLink>
              <button className="hover:text-indigo-600 transition-colors py-4">F&O</button>
              <button className="hover:text-indigo-600 transition-colors py-4">Mutual Funds</button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <NavLink to="/app/alerts" className="relative btn-icon p-2">
              <Bell className="w-4 h-4 text-slate-600" />
              <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-slate-900 text-2xs flex items-center justify-center font-bold">3</span>
            </NavLink>
            <NavLink to="/app/ai-chat" className="btn-primary text-xs gap-1.5 px-3 py-2">
              <Sparkles className="w-3.5 h-3.5" /> Ask AI
            </NavLink>
            <NavLink to="/app/profile" className="w-7 h-7 rounded-full bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">
              {user?.name?.[0]?.toUpperCase() || 'A'}
            </NavLink>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
