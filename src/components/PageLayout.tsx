
import { useState, useEffect, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Bell, Search, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';
import Auth from '@/pages/Auth';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const PageLayout = ({ children, title, subtitle }: PageLayoutProps) => {
  const { user, loading, signOut } = useAuth();
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
                {title}
              </h1>
              <p className="text-gray-600 mt-1 font-bold text-sm md:text-base">{subtitle}</p>
            </div>
            
            <div className="flex items-center space-x-2 md:space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="w-full md:w-auto pl-10 pr-4 py-2 bg-white border-2 border-black rounded-xl focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all font-bold text-sm"
                />
              </div>
              <button className="p-2 bg-white border-2 border-black rounded-xl hover:bg-gray-50 transition-colors shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                <Bell className="w-5 h-5 text-black" />
              </button>
              <button className="p-2 bg-white border-2 border-black rounded-xl hover:bg-gray-50 transition-colors shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                <SettingsIcon className="w-5 h-5 text-black" />
              </button>
              <button 
                onClick={signOut}
                className="p-2 bg-red-500 text-white border-2 border-black rounded-xl hover:bg-red-600 transition-colors shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.header>

        {/* Main Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
