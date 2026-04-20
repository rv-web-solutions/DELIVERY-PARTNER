import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchServices, updateServiceStatus } from '../../api';
import { useService } from '../../context/ServiceContext';
import toast from 'react-hot-toast';

const ManageServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const navigate = useNavigate();
  const { refreshServices } = useService();

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const { data } = await fetchServices();
      setServices(data);
    } catch (err) {
      toast.error('Failed to load services');
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (key, currentStatus) => {
    setUpdating(key);
    try {
      await updateServiceStatus(key, !currentStatus);
      await refreshServices(); // Update global state
      toast.success('Service status updated!');
      setServices(services.map(s => s.key === key ? { ...s, isEnabled: !currentStatus } : s));
    } catch (err) {
      toast.error('Failed to update service status');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-primary text-sm font-medium hover:-translate-x-1 transition-transform mb-4"
          >
            <ChevronLeft size={18} /> Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold flex items-center gap-4">
            <ShieldCheck className="text-primary" size={40} />
            Service Controls
          </h1>
          <p className="text-gray-500 mt-2">Enable or disable specific app features for all users.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-4">
          {services.map((service, idx) => (
            <motion.div
              key={service.key}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="glass p-6 rounded-3xl border-black/5 dark:border-white/5 flex items-center justify-between group"
            >
              <div>
                <h3 className="text-xl font-bold">{service.name}</h3>
                <p className="text-sm text-gray-500">Key: <span className="font-mono">{service.key}</span></p>
              </div>
              
              <button
                onClick={() => handleToggle(service.key, service.isEnabled)}
                disabled={updating === service.key}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-bold transition-all ${
                  service.isEnabled 
                    ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20' 
                    : 'bg-red-500/10 text-red-600 hover:bg-red-500/20'
                } disabled:opacity-50`}
              >
                {updating === service.key ? (
                  <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                ) : service.isEnabled ? (
                  <>
                    <ToggleRight size={24} />
                    ENABLED
                  </>
                ) : (
                  <>
                    <ToggleLeft size={24} />
                    DISABLED
                  </>
                )}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageServices;
