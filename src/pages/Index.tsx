
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Users, Target, TrendingUp, Settings, Bell, Search, LogOut } from 'lucide-react';
import { DashboardMetrics } from '@/components/DashboardMetrics';
import { SegmentExplorer } from '@/components/SegmentExplorer';
import { CustomerJourney } from '@/components/CustomerJourney';
import { CampaignManager } from '@/components/CampaignManager';
import { RealTimePanel } from '@/components/RealTimePanel';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';
import Auth from './Auth';

const Index = () => {
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 flex items-center justify-center">
        <div className="text-center text-white">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-pink-100 to-purple-100">
      <Navigation sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'} ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-16'} md:ml-16`}>
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm border-b-3 border-black px-4 md:px-6 py-4"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-black to-purple-600 bg-clip-text text-transparent">
                AI Customer Segmentation
              </h1>
              <p className="text-gray-600 mt-1 font-bold text-sm md:text-base">Real-time behavioral analytics & targeting</p>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search customers..."
                  className="w-full md:w-auto pl-10 pr-4 py-2 bg-white border-2 border-black rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all font-bold text-sm"
                />
              </div>
              <button className="p-2 bg-white border-2 border-black rounded-xl hover:bg-gray-50 transition-colors shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                <Bell className="w-5 h-5 text-black" />
              </button>
              <button className="p-2 bg-white border-2 border-black rounded-xl hover:bg-gray-50 transition-colors shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                <Settings className="w-5 h-5 text-black" />
              </button>
              <button 
                onClick={signOut}
                className="p-2 bg-red-500 text-white border-2 border-black rounded-xl hover:bg-red-600 transition-colors shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 mt-6 bg-gray-100 rounded-xl p-1 border-2 border-black overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'segments', label: 'Segments', icon: Users },
              { id: 'campaigns', label: 'Campaigns', icon: Target },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-3 md:px-4 py-2 rounded-lg transition-all duration-200 font-bold whitespace-nowrap ${
                  activeTab === tab.id 
                    ? 'bg-black text-white shadow-brutal' 
                    : 'text-black hover:text-gray-700 hover:bg-white'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden sm:inline text-sm md:text-base">{tab.label}</span>
              </button>
            ))}
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <DashboardMetrics />
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2">
                  <SegmentExplorer />
                </div>
                <div>
                  <RealTimePanel />
                </div>
              </div>
              <CustomerJourney />
            </motion.div>
          )}
          
          {activeTab === 'segments' && (
            <motion.div
              key="segments"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <SegmentExplorer expanded />
            </motion.div>
          )}
          
          {activeTab === 'campaigns' && (
            <motion.div
              key="campaigns"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <CampaignManager />
            </motion.div>
          )}
          
          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-6"
            >
              <RealTimePanel />
              <CustomerJourney />
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Index;
