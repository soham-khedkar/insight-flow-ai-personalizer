
import { motion } from 'framer-motion';
import { TrendingUp, Users, Target, DollarSign, ArrowUp, ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export const DashboardMetrics = () => {
  const [animatedValues, setAnimatedValues] = useState({
    totalUsers: 0,
    conversionRate: 0,
    avgOrderValue: 0,
    activeSegments: 0
  });

  const targetValues = {
    totalUsers: 24567,
    conversionRate: 3.8,
    avgOrderValue: 127.50,
    activeSegments: 12
  };

  useEffect(() => {
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
  }, []);

  const metrics = [
    {
      title: 'Total Customers',
      value: Math.floor(animatedValues.totalUsers).toLocaleString(),
      change: '+12.5%',
      positive: true,
      icon: Users,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Conversion Rate',
      value: `${animatedValues.conversionRate.toFixed(1)}%`,
      change: '+0.8%',
      positive: true,
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Avg Order Value',
      value: `$${animatedValues.avgOrderValue.toFixed(2)}`,
      change: '-2.1%',
      positive: false,
      icon: DollarSign,
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Active Segments',
      value: Math.floor(animatedValues.activeSegments),
      change: '+3',
      positive: true,
      icon: Target,
      color: 'from-orange-500 to-red-500'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <motion.div
          key={metric.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300 group"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${metric.color} group-hover:scale-110 transition-transform duration-300`}>
              <metric.icon className="w-6 h-6 text-white" />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              metric.positive ? 'text-green-600' : 'text-red-600'
            }`}>
              {metric.positive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
              {metric.change}
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-600 mb-1">{metric.title}</h3>
            <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
          </div>
          
          {/* Animated progress bar */}
          <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
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
  );
};
