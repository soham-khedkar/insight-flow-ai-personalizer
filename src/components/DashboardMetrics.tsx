
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, DollarSign, ArrowUp, ArrowDown, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSegmentation } from '@/hooks/useSegmentation';

export const DashboardMetrics = () => {
  const { data, loading, refreshData } = useSegmentation();
  const [animatedValues, setAnimatedValues] = useState({
    totalUsers: 0,
    conversionRate: 0,
    avgOrderValue: 0,
    activeSegments: 0
  });

  const targetValues = {
    totalUsers: data?.analytics.totalCustomers || 0,
    conversionRate: data?.analytics.conversionRate || 0,
    avgOrderValue: data?.analytics.averageOrderValue || 0,
    activeSegments: data?.segments.length || 0
  };

  useEffect(() => {
    if (!data) return;

    const animateCounter = (key: keyof typeof targetValues) => {
      const target = targetValues[key];
      const increment = target / 100;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        setAnimatedValues(prev => ({ ...prev, [key]: current }));
      }, 20);
    };

    // Staggered animation start
    setTimeout(() => animateCounter('totalUsers'), 200);
    setTimeout(() => animateCounter('conversionRate'), 400);
    setTimeout(() => animateCounter('avgOrderValue'), 600);
    setTimeout(() => animateCounter('activeSegments'), 800);
  }, [data]);

  const metrics = [
    {
      title: 'Total Customers',
      value: Math.floor(animatedValues.totalUsers).toLocaleString(),
      change: '+12.5%',
      positive: true,
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-100',
      borderColor: 'border-blue-500'
    },
    {
      title: 'Conversion Rate',
      value: `${animatedValues.conversionRate.toFixed(1)}%`,
      change: '+0.8%',
      positive: true,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-100',
      borderColor: 'border-green-500'
    },
    {
      title: 'Avg Order Value',
      value: `$${animatedValues.avgOrderValue.toFixed(2)}`,
      change: '-2.1%',
      positive: false,
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-100',
      borderColor: 'border-purple-500'
    },
    {
      title: 'Active Segments',
      value: Math.floor(animatedValues.activeSegments),
      change: '+3',
      positive: true,
      icon: Target,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-100',
      borderColor: 'border-orange-500'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white rounded-2xl p-4 md:p-6 border-3 border-black shadow-brutal animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-8 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-black text-black">Live Metrics</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={refreshData}
          className="flex items-center space-x-2 bg-black text-white px-4 py-2 rounded-xl border-3 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh Data</span>
        </motion.button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`${metric.bgColor} rounded-2xl p-4 md:p-6 border-3 ${metric.borderColor} shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-300 group cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color} group-hover:scale-110 transition-transform duration-300 border-2 border-black`}>
                <metric.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div className={`flex items-center space-x-1 text-sm font-black ${
                metric.positive ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.positive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {metric.change}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-black text-gray-700 mb-1 uppercase tracking-wider">{metric.title}</h3>
              <p className="text-2xl md:text-3xl font-black text-black">{metric.value}</p>
            </div>
            
            {/* Animated progress bar */}
            <div className="mt-4 h-2 bg-white/50 rounded-full overflow-hidden border border-black">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '75%' }}
                transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                className={`h-full bg-gradient-to-r ${metric.color} rounded-full`}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
