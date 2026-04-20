import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, ChevronLeft, DollarSign, Utensils, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRestaurants } from '../../api';
import API from '../../api';
import ImageUploader from '../../components/ImageUploader';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';

const EMPTY_FORM = { 
  name: '', cuisine: '', deliveryFee: 40, imageUrl: '',
  rating: 4.5, deliveryTime: '30-40 mins', address: '' 
};

const ManageRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();

  useEffect(() => { loadRestaurants(); }, []);

  const loadRestaurants = async () => {
    try {
      const { data } = await fetchRestaurants();
      setRestaurants(data);
    } catch (err) {
      console.error('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData(EMPTY_FORM);
    setShowModal(true);
  };

  const openEditModal = (restaurant) => {
    setEditingId(restaurant._id);
    setFormData({
      name: restaurant.name,
      cuisine: restaurant.cuisine || '',
      deliveryFee: restaurant.deliveryFee,
      imageUrl: restaurant.imageUrl,
      rating: restaurant.rating,
      deliveryTime: restaurant.deliveryTime,
      address: restaurant.address || ''
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(EMPTY_FORM);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      toast.error('Please upload an image before saving.');
      return;
    }
    const token = localStorage.getItem('ring4delivery_admin_token');
    setSaving(true);
    try {
      if (editingId) {
        await API.put(`/restaurants/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await API.post('/restaurants', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      toast.success(editingId ? 'Restaurant updated successfully!' : 'Restaurant added successfully!');
      closeModal();
      loadRestaurants();
    } catch (err) {
      toast.error(`Error ${editingId ? 'updating' : 'saving'} restaurant: ${err.response?.data?.message || err.message}`);
    } finally {
      setSaving(false);
    }
  };

  const initiateDelete = (id) => {
    setConfirmModal({ isOpen: true, id });
  };

  const confirmDelete = async () => {
    const id = confirmModal.id;
    if (!id) return;
    const token = localStorage.getItem('ring4delivery_admin_token');
    try {
      await API.delete(`/restaurants/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Restaurant deleted successfully!');
      loadRestaurants();
    } catch (err) {
      toast.error('Error deleting restaurant.');
    }
    setConfirmModal({ isOpen: false, id: null });
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div>
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-primary text-sm font-medium hover:-translate-x-1 transition-transform mb-4"
          >
            <ChevronLeft size={18} /> Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold">Manage Restaurants</h1>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary text-dark px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
        >
          <Plus size={20} /> Add New Restaurant
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {restaurants.map((res) => (
              <motion.div
                key={res._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="glass p-6 rounded-[2rem] border-black/5 dark:border-white/5 group shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
                  <img 
                    src={res.imageUrl} 
                    alt={res.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button 
                      onClick={() => openEditModal(res)}
                      className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-primary hover:bg-primary hover:text-dark transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button 
                      onClick={() => initiateDelete(res._id)}
                      className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-accent hover:bg-accent hover:text-white transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-1">{res.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{res.cuisine} • Delivery Fee ₹{res.deliveryFee}</p>
                <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>{res.deliveryTime}</span>
                  <span className="bg-green-400/10 text-green-600 dark:text-green-400 px-2 py-0.5 rounded-full font-bold">ACTIVE</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {restaurants.length === 0 && (
            <div className="col-span-3 text-center py-20 text-gray-500">No restaurants yet. Add your first one!</div>
          )}
        </div>
      )}

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, y: 100 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 100 }}
              className="glass w-full max-w-2xl p-8 rounded-[2.5rem] relative max-h-[90vh] overflow-y-auto bg-white/90 dark:bg-dark/90"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <Utensils className="text-primary" />
                  {editingId ? 'Edit Restaurant' : 'Add New Restaurant'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Restaurant Image Upload */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Restaurant Image</label>
                  <ImageUploader
                    value={formData.imageUrl}
                    onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Restaurant Name</label>
                  <input 
                    type="text" required placeholder="e.g. Italian Delights"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary/50 transition-colors text-gray-900 dark:text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Cuisine Type</label>
                  <input 
                    type="text" required placeholder="e.g. Italian, Continental"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary/50 transition-colors text-gray-900 dark:text-white"
                    value={formData.cuisine}
                    onChange={(e) => setFormData({ ...formData, cuisine: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Delivery Fee (₹)</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input 
                      type="number" required min="0"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-10 pr-6 outline-none focus:border-primary/50 transition-colors"
                      value={formData.deliveryFee}
                      onChange={(e) => setFormData({ ...formData, deliveryFee: Number(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Delivery Time</label>
                  <input 
                    type="text" required placeholder="e.g. 20-30 mins"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary/50 transition-colors text-gray-900 dark:text-white"
                    value={formData.deliveryTime}
                    onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Rating (1–5)</label>
                  <input 
                    type="number" required min="1" max="5" step="0.1"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary/50 transition-colors text-gray-900 dark:text-white"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Address</label>
                  <input 
                    type="text" placeholder="Restaurant location address"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-primary/50 transition-colors text-gray-900 dark:text-white"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <div className="md:col-span-2 flex gap-4 pt-4">
                  <button 
                    type="button" onClick={closeModal}
                    className="flex-grow py-4 rounded-2xl bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors font-bold text-gray-600 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" disabled={saving}
                    className="flex-[2] py-4 rounded-2xl bg-primary text-dark font-bold hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100"
                  >
                    {saving ? 'Saving...' : editingId ? 'Update Restaurant' : 'Save Restaurant'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <ConfirmModal 
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Delete Restaurant"
        message="Are you sure you want to delete this restaurant? This action cannot be undone and will delete all associated menu items."
      />
    </div>
  );
};

export default ManageRestaurants;
