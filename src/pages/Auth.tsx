
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Sparkles, Brain, Target } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { signInWithEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    const { error } = await signInWithEmail(email);
    
    if (!error) {
      setEmailSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-pink-400 to-purple-500 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Features */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-white space-y-8"
        >
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-4 leading-tight"
            >
              AI Customer
              <br />
              <span className="text-black">Segmentation</span>
            </motion.h1>
            <p className="text-xl md:text-2xl font-bold opacity-90">
              Real-time behavioral analytics & targeting powered by machine learning
            </p>
          </div>

          <div className="space-y-6">
            {[
              { icon: Brain, title: "AI-Powered Insights", desc: "Advanced clustering algorithms" },
              { icon: Target, title: "Precision Targeting", desc: "Behavioral segmentation" },
              { icon: Sparkles, title: "Real-time Analytics", desc: "Live customer journey tracking" }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center space-x-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border-2 border-black shadow-brutal"
              >
                <div className="p-3 bg-black rounded-xl">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-lg">{feature.title}</h3>
                  <p className="opacity-80">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right Side - Auth Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-8 md:p-12 border-4 border-black shadow-brutal"
        >
          {!emailSent ? (
            <>
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-black text-black mb-2">
                  Get Started
                </h2>
                <p className="text-lg font-bold text-gray-600">
                  Enter your email for a magic link
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-black uppercase tracking-wider">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="pl-12 h-14 text-lg font-bold border-3 border-black rounded-xl focus:ring-4 focus:ring-yellow-300 transition-all"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 text-lg font-black bg-black text-white hover:bg-gray-800 border-3 border-black rounded-xl shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all group"
                >
                  {loading ? (
                    "Sending Magic Link..."
                  ) : (
                    <>
                      Send Magic Link
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center border-3 border-black">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-black mb-2">Check Your Email!</h3>
                <p className="text-gray-600 font-bold">
                  We sent a magic link to <span className="text-black">{email}</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Click the link in your email to sign in
                </p>
              </div>
              <Button
                onClick={() => setEmailSent(false)}
                variant="outline"
                className="font-bold border-2 border-black rounded-xl hover:bg-gray-50"
              >
                Use Different Email
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
