import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, LogIn, ChevronLeft, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { login } from '../api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data } = await login({ email, password });
      localStorage.setItem('ring4delivery_admin_token', data.token);
      localStorage.setItem('ring4delivery_admin_user', JSON.stringify(data.admin));
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700"></div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass w-full max-w-md p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShieldCheck size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold">Admin Portal</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">Secure access for management</p>
        </div>

        {error && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-accent/10 border border-accent/20 text-accent text-sm p-4 rounded-xl mb-6 flex items-center gap-3"
          >
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            {error}
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">Admin Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="email"
                placeholder="admin@ring4delivery.com"
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary/50 transition-all text-gray-900 dark:text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Password</label>
              <button type="button" className="text-xs text-primary hover:underline">Forgot?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="password"
                placeholder="••••••••"
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-12 pr-6 outline-none focus:border-primary/50 transition-all text-gray-900 dark:text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-dark py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 shadow-lg shadow-primary/20"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <LogIn size={20} /> Login Securely
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-black/10 dark:border-white/5 text-center">
          <button 
            onClick={() => navigate('/')}
            className="text-sm text-gray-500 dark:text-gray-500 hover:text-black dark:hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto"
          >
            <ChevronLeft size={16} /> Back to Customer Site
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
