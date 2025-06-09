
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Target, 
  TrendingUp, 
  Settings, 
  Brain, 
  Menu,
  X,
  Home,
  Database,
  Zap
} from 'lucide-react';

interface NavigationProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const Navigation = ({ sidebarOpen, setSidebarOpen }: NavigationProps) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Users, label: 'Segments' },
    { icon: Target, label: 'Campaigns' },
    { icon: TrendingUp, label: 'Analytics' },
    { icon: Brain, label: 'AI Models' },
    { icon: Database, label: 'Data Sources' },
    { icon: Zap, label: 'Automation' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <motion.nav
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className={`fixed top-0 left-0 h-full bg-white/90 backdrop-blur-xl border-r border-white/20 z-50 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-slate-900">SegmentAI</span>
            </motion.div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-2 space-y-1">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
              item.active 
                ? 'bg-blue-50 text-blue-600 shadow-sm' 
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <item.icon className={`w-5 h-5 ${item.active ? 'text-blue-600' : 'text-slate-500 group-hover:text-slate-700'}`} />
            {sidebarOpen && (
              <span className="font-medium">{item.label}</span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Status Indicator */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="absolute bottom-4 left-4 right-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200"
        >
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-700">AI Model Active</span>
          </div>
          <p className="text-xs text-green-600 mt-1">Real-time segmentation running</p>
        </motion.div>
      )}
    </motion.nav>
  );
};
