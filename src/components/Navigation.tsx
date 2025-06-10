
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
      className={`fixed top-0 left-0 h-full bg-white/95 backdrop-blur-xl border-r-3 border-black z-50 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } shadow-brutal`}
    >
      {/* Header */}
      <div className="p-4 border-b-3 border-black bg-gradient-to-r from-purple-500 to-pink-500">
        <div className="flex items-center justify-between">
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center border-2 border-black">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="font-black text-white text-lg">SegmentAI</span>
            </motion.div>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors border-2 border-white/30"
          >
            {sidebarOpen ? <X className="w-4 h-4 text-white" /> : <Menu className="w-4 h-4 text-black" />}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-2 space-y-1 bg-gradient-to-b from-purple-50 to-pink-50 h-full">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group font-bold border-2 ${
              item.active 
                ? 'bg-black text-white border-black shadow-brutal' 
                : 'text-black hover:bg-white hover:border-black hover:shadow-brutal border-transparent'
            }`}
          >
            <item.icon className={`w-5 h-5 ${item.active ? 'text-white' : 'text-black group-hover:text-black'}`} />
            {sidebarOpen && (
              <span className="font-black text-sm">{item.label}</span>
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
          className="absolute bottom-4 left-4 right-4 p-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-xl border-2 border-green-500 shadow-brutal"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse border border-black"></div>
            <span className="text-sm font-black text-green-700">AI Model Active</span>
          </div>
          <p className="text-xs text-green-600 mt-1 font-bold">Real-time clustering running</p>
        </motion.div>
      )}
    </motion.nav>
  );
};
