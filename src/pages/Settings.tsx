
import { motion } from 'framer-motion';
import { PageLayout } from '@/components/PageLayout';
import { User, Bell, Shield, Database, Palette, Globe } from 'lucide-react';

const Settings = () => {
  const settingsSections = [
    {
      title: 'Profile Settings',
      description: 'Manage your account information and preferences',
      icon: User,
      color: 'bg-blue-500'
    },
    {
      title: 'Notifications',
      description: 'Configure email and push notification preferences',
      icon: Bell,
      color: 'bg-yellow-500'
    },
    {
      title: 'Security',
      description: 'Password, two-factor authentication, and login settings',
      icon: Shield,
      color: 'bg-red-500'
    },
    {
      title: 'Data & Privacy',
      description: 'Data retention, export options, and privacy controls',
      icon: Database,
      color: 'bg-green-500'
    },
    {
      title: 'Appearance',
      description: 'Theme, layout, and display preferences',
      icon: Palette,
      color: 'bg-purple-500'
    },
    {
      title: 'API & Integrations',
      description: 'API keys, webhooks, and third-party integrations',
      icon: Globe,
      color: 'bg-orange-500'
    }
  ];

  return (
    <PageLayout 
      title="Settings" 
      subtitle="Configure your account and application preferences"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl border-3 border-black shadow-brutal">
          <h2 className="text-xl font-black text-black mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg border-2 border-black shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-bold text-sm">
              Export Data
            </button>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg border-2 border-black shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-bold text-sm">
              Reset Preferences
            </button>
            <button className="px-4 py-2 bg-green-500 text-white rounded-lg border-2 border-black shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all font-bold text-sm">
              Download Report
            </button>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {settingsSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl border-3 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all cursor-pointer"
            >
              <div className={`w-12 h-12 ${section.color} rounded-lg border-2 border-black flex items-center justify-center mb-4`}>
                <section.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-black text-black mb-2">{section.title}</h3>
              <p className="text-sm text-gray-600 font-bold">{section.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Account Information */}
        <div className="bg-white p-6 rounded-xl border-3 border-black shadow-brutal">
          <h2 className="text-xl font-black text-black mb-4">Account Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                defaultValue="user@example.com"
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Display Name</label>
              <input
                type="text"
                defaultValue="John Doe"
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Company</label>
              <input
                type="text"
                defaultValue="Acme Corp"
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 font-bold"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Role</label>
              <select className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-300 font-bold">
                <option>Marketing Manager</option>
                <option>Data Analyst</option>
                <option>Product Manager</option>
                <option>Administrator</option>
              </select>
            </div>
          </div>
          <div className="mt-6">
            <button className="px-6 py-3 bg-purple-500 text-white rounded-lg border-2 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold">
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </PageLayout>
  );
};

export default Settings;
