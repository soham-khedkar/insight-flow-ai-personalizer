
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Eye, ShoppingCart, Heart, Users, ArrowRight, TrendingUp } from 'lucide-react';

export const CustomerJourney = () => {
  const [hoveredStage, setHoveredStage] = useState<number | null>(null);

  const journeyStages = [
    {
      id: 1,
      title: 'Awareness',
      description: 'Customer discovers your brand',
      icon: Eye,
      color: 'from-blue-500 to-cyan-500',
      metrics: { users: 15420, conversionRate: 12.5 },
      triggers: ['Social media ads', 'Search results', 'Referrals']
    },
    {
      id: 2,
      title: 'Interest',
      description: 'Engages with content and products',
      icon: Heart,
      color: 'from-purple-500 to-pink-500',
      metrics: { users: 8730, conversionRate: 35.2 },
      triggers: ['Product views', 'Email opens', 'Content engagement']
    },
    {
      id: 3,
      title: 'Consideration',
      description: 'Compares options and evaluates',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500',
      metrics: { users: 4250, conversionRate: 67.8 },
      triggers: ['Cart additions', 'Reviews reading', 'Price comparisons']
    },
    {
      id: 4,
      title: 'Purchase',
      description: 'Completes transaction',
      icon: ShoppingCart,
      color: 'from-orange-500 to-red-500',
      metrics: { users: 2180, conversionRate: 85.4 },
      triggers: ['Checkout completion', 'Payment processing', 'Order confirmation']
    },
    {
      id: 5,
      title: 'Loyalty',
      description: 'Becomes repeat customer',
      icon: Users,
      color: 'from-indigo-500 to-purple-500',
      metrics: { users: 1640, conversionRate: 92.1 },
      triggers: ['Repeat purchases', 'Referral activity', 'Review submissions']
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/20"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-slate-900">Customer Journey Analytics</h3>
        <p className="text-sm text-slate-600">AI-tracked behavioral progression through purchase funnel</p>
      </div>

      {/* Journey Visualization */}
      <div className="relative">
        {/* Connection Lines */}
        <div className="absolute top-16 left-0 right-0 flex items-center justify-between px-16 z-0">
          {journeyStages.slice(0, -1).map((_, index) => (
            <div key={index} className="flex-1 flex items-center">
              <div className="flex-1 h-0.5 bg-gradient-to-r from-slate-200 to-slate-300"></div>
              <ArrowRight className="w-4 h-4 text-slate-400 mx-2" />
            </div>
          ))}
        </div>

        {/* Journey Stages */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-5 gap-4">
          {journeyStages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative"
              onMouseEnter={() => setHoveredStage(stage.id)}
              onMouseLeave={() => setHoveredStage(null)}
            >
              {/* Stage Node */}
              <div className={`relative p-4 rounded-xl transition-all duration-300 cursor-pointer ${
                hoveredStage === stage.id 
                  ? 'bg-white shadow-lg scale-105 border-2 border-blue-200' 
                  : 'bg-white/60 hover:bg-white/80 border border-white/30'
              }`}>
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${stage.color} flex items-center justify-center mx-auto mb-3 ${
                  hoveredStage === stage.id ? 'animate-pulse' : ''
                }`}>
                  <stage.icon className="w-6 h-6 text-white" />
                </div>

                {/* Content */}
                <div className="text-center">
                  <h4 className="font-semibold text-slate-900 mb-1">{stage.title}</h4>
                  <p className="text-xs text-slate-600 mb-3">{stage.description}</p>
                  
                  {/* Metrics */}
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-slate-900">
                      {stage.metrics.users.toLocaleString()}
                    </div>
                    <div className="text-xs text-slate-600">
                      {stage.metrics.conversionRate}% conversion
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-3 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stage.metrics.conversionRate}%` }}
                      transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                      className={`h-full bg-gradient-to-r ${stage.color} rounded-full`}
                    />
                  </div>
                </div>

                {/* Hover Details */}
                {hoveredStage === stage.id && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-3 bg-white rounded-lg shadow-xl border border-white/20 min-w-48 z-20"
                  >
                    <h5 className="font-semibold text-slate-900 mb-2">Key Triggers</h5>
                    <ul className="space-y-1">
                      {stage.triggers.map((trigger, triggerIndex) => (
                        <li key={triggerIndex} className="text-xs text-slate-600 flex items-center">
                          <div className="w-1 h-1 bg-slate-400 rounded-full mr-2"></div>
                          {trigger}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 border border-blue-100">
          <div className="flex items-center space-x-2 mb-2">
            <Eye className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">Total Reach</span>
          </div>
          <div className="text-2xl font-bold text-blue-900">15.4K</div>
          <div className="text-xs text-blue-600">+8.2% from last week</div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-100">
          <div className="flex items-center space-x-2 mb-2">
            <TrendingUp className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-900">Conversion Rate</span>
          </div>
          <div className="text-2xl font-bold text-green-900">14.1%</div>
          <div className="text-xs text-green-600">+2.3% from last week</div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-100">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-900">Loyal Customers</span>
          </div>
          <div className="text-2xl font-bold text-purple-900">1.6K</div>
          <div className="text-xs text-purple-600">+12.5% from last week</div>
        </div>
      </div>
    </motion.div>
  );
};
