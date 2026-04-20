import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Users, 
  Utensils, 
  Plus, 
  ArrowRight, 
  Settings, 
  LogOut, 
  TrendingUp, 
  ClipboardList,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchRestaurants } from '../../api';

const Dashboard = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const adminDoc = JSON.parse(localStorage.getItem('ring4delivery_admin_user') || '{}');

  useEffect(() => {
    const token = localStorage.getItem('ring4delivery_admin_token');
    if (!token) {
      navigate('/admin/login');
      return;
    }

    const loadStats = async () => {
      try {
        const { data } = await fetchRestaurants();
        setRestaurants(data);
      } catch (err) {
        console.error('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('ring4delivery_admin_token');
    localStorage.removeItem('ring4delivery_admin_user');
    navigate('/admin/login');
  };

  const stats = [
    { title: 'Total Restaurants', value: restaurants.length, icon: <Utensils className="text-primary" />, change: '+2 this month' },
    { title: 'Registered Admins', value: '1', icon: <Users className="text-blue-400" />, change: 'Only You' },
    { title: 'Total Items', value: '---', icon: <ClipboardList className="text-accent" />, change: 'Across all shops' }
  ];

  if (loading) return (
    <div className="pt-32 flex justify-center">
      <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {adminDoc.email?.split('@')[0] || 'Admin'}!</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's what's happening with Ring4Delivery today.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-sm font-medium"
          >
            <LogOut size={18} /> Logout
          </button>
          <button className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-primary text-gray-900 font-bold text-sm hover:scale-105 transition-all">
            <Settings size={18} /> System Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass p-8 rounded-[2rem] border-black/5 dark:border-white/5"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-black/5 dark:bg-white/5 rounded-2xl">{stat.icon}</div>
              <div className="flex items-center gap-1 text-green-600 dark:text-green-400 text-xs font-bold bg-green-400/10 px-2 py-1 rounded-full">
                <TrendingUp size={12} /> {stat.change}
              </div>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm font-medium mb-1">{stat.title}</h3>
            <p className="text-4xl font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Management Tiles */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Manage Restaurants Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass p-1 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-transparent group"
        >
          <div className="bg-white dark:bg-dark p-8 rounded-[2.4rem] h-full shadow-sm">
            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Utensils className="text-primary" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Manage Restaurants</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Add new restaurant partners, update existing information, or manage delivery coverage and images via Cloudinary.
            </p>
            <Link 
              to="/admin/restaurants" 
              className="flex items-center justify-between w-full p-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors group/link"
            >
              <div className="flex items-center gap-3">
                <Plus size={20} className="text-primary" />
                <span className="font-bold">Add or Edit Restaurants</span>
              </div>
              <ChevronRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Manage Items Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass p-1 rounded-[2.5rem] bg-gradient-to-br from-accent/20 via-transparent to-transparent group"
        >
          <div className="bg-white dark:bg-dark p-8 rounded-[2.4rem] h-full shadow-sm">
            <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ClipboardList className="text-accent" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Manage Menu Items</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Create menu categories, add food items, set prices, and toggle item availability in real-time for your customers.
            </p>
            <Link 
              to="/admin/items" 
              className="flex items-center justify-between w-full p-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors group/link"
            >
              <div className="flex items-center gap-3">
                <Plus size={20} className="text-accent" />
                <span className="font-bold">Add or Edit Menu Items</span>
              </div>
              <ChevronRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Manage Services Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass p-1 rounded-[2.5rem] bg-gradient-to-br from-green-400/20 via-transparent to-transparent group"
        >
          <div className="bg-white dark:bg-dark p-8 rounded-[2.4rem] h-full shadow-sm">
            <div className="w-12 h-12 bg-green-400/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldCheck className="text-green-500" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-3">Service Controls</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Enable or disable specific services like Medicines, Groceries, or Pickup/Drop functionality app-wide with one click.
            </p>
            <Link 
              to="/admin/services" 
              className="flex items-center justify-between w-full p-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors group/link"
            >
              <div className="flex items-center gap-3">
                <Plus size={20} className="text-green-500" />
                <span className="font-bold">Manage Active Features</span>
              </div>
              <ChevronRight size={20} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Quick View Table (Recent Restaurants) */}
      <div className="glass rounded-[2rem] border-black/5 dark:border-white/5 overflow-hidden shadow-sm">
        <div className="p-8 border-b border-black/5 dark:border-white/5 flex items-center justify-between">
          <h3 className="text-xl font-bold">Recent Partners</h3>
          <Link to="/admin/restaurants" className="text-sm text-primary hover:underline">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
                <th className="px-8 py-4">Restaurant</th>
                <th className="px-8 py-4">Cuisine</th>
                <th className="px-8 py-4">Delivery Fee</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {restaurants.slice(0, 5).map((r) => (
                <tr key={r._id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-8 py-4 flex items-center gap-3">
                    <img src={r.imageUrl} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <span className="font-bold">{r.name}</span>
                  </td>
                  <td className="px-8 py-4 text-sm text-gray-600 dark:text-gray-400">{r.cuisine}</td>
                  <td className="px-8 py-4 text-sm">₹{r.deliveryFee}</td>
                  <td className="px-8 py-4">
                    <span className="px-2 py-1 rounded-full bg-green-400/10 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-tighter">Active</span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button className="text-primary hover:text-black dark:hover:text-white p-2 transition-colors">
                      <ArrowRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
