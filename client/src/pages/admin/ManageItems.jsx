import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Plus, Edit2, Trash2, ChevronLeft, DollarSign, Tag, Store, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { fetchRestaurants } from '../../api';
import API from '../../api';
import ImageUploader from '../../components/ImageUploader';
import toast from 'react-hot-toast';
import ConfirmModal from '../../components/ConfirmModal';

const EMPTY_FORM = { 
  name: '', price: 0, category: '', imageUrl: '', description: '',
  isAvailable: true, hasPortions: false, singlePrice: 0, fullPrice: 0, restaurantId: ''
};

const ManageItems = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, id: null });
  const navigate = useNavigate();

  useEffect(() => { loadInitialData(); }, []);

  const loadInitialData = async () => {
    try {
      const { data } = await fetchRestaurants();
      setRestaurants(data);
      if (data.length > 0) {
        setSelectedRestaurant(data[0]._id);
        setFormData(prev => ({ ...prev, restaurantId: data[0]._id }));
        loadItems(data[0]._id);
      }
    } catch (err) {
      console.error('Failed to load initial data');
    } finally {
      setLoading(false);
    }
  };

  const loadItems = async (restaurantId) => {
    try {
      const { data } = await API.get(`/items/restaurant/${restaurantId}`);
      setItems(data);
    } catch (err) {
      console.error('Failed to load items');
    }
  };

  const handleRestaurantChange = (id) => {
    setSelectedRestaurant(id);
    setFormData(prev => ({ ...prev, restaurantId: id }));
    loadItems(id);
  };

  const openAddModal = () => {
    setEditingId(null);
    setFormData({ ...EMPTY_FORM, restaurantId: selectedRestaurant });
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingId(item._id);
    setFormData({
      name: item.name,
      price: item.price || 0,
      category: item.category,
      imageUrl: item.imageUrl,
      description: item.description || '',
      isAvailable: item.isAvailable,
      hasPortions: item.hasPortions || false,
      singlePrice: item.singlePrice || 0,
      fullPrice: item.fullPrice || 0,
      restaurantId: item.restaurantId
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData({ ...EMPTY_FORM, restaurantId: selectedRestaurant });
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
        await API.put(`/items/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await API.post('/items', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      toast.success(editingId ? 'Item updated successfully!' : 'Item added successfully!');
      closeModal();
      const targetRestaurant = formData.restaurantId;
      setSelectedRestaurant(targetRestaurant);
      loadItems(targetRestaurant);
    } catch (err) {
      toast.error(`Error ${editingId ? 'updating' : 'saving'} item: ${err.response?.data?.message || err.message}`);
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
      await API.delete(`/items/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Item deleted successfully!');
      loadItems(selectedRestaurant);
    } catch (err) {
      toast.error('Error deleting item.');
    }
    setConfirmModal({ isOpen: false, id: null });
  };

  const toggleAvailability = async (item) => {
    const token = localStorage.getItem('ring4delivery_admin_token');
    try {
      await API.put(`/items/${item._id}`, { ...item, isAvailable: !item.isAvailable }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success(`Item marked as ${!item.isAvailable ? 'In Stock' : 'Unavailable'}`);
      loadItems(selectedRestaurant);
    } catch (err) {
      toast.error('Error updating availability.');
    }
  };

  return (
    <div className="pt-24 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="flex items-center gap-2 text-accent text-sm font-medium hover:-translate-x-1 transition-transform mb-4"
          >
            <ChevronLeft size={18} /> Back to Dashboard
          </button>
          <h1 className="text-4xl font-bold">Manage Items</h1>
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <select 
              className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-12 pr-10 outline-none focus:border-accent/50 appearance-none text-sm text-gray-900 dark:text-white"
              value={selectedRestaurant}
              onChange={(e) => handleRestaurantChange(e.target.value)}
            >
              {restaurants.map(r => <option key={r._id} value={r._id}>{r.name}</option>)}
            </select>
          </div>
          <button 
            onClick={openAddModal}
            className="bg-accent text-white px-6 py-4 rounded-2xl font-bold flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-accent/20"
          >
            <Plus size={20} /> Add New Item
          </button>
        </div>
      </div>

      {/* Items Table */}
      <div className="overflow-x-auto glass rounded-[2rem] border-black/5 dark:border-white/5">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              <th className="px-8 py-4">Item</th>
              <th className="px-8 py-4">Category</th>
              <th className="px-8 py-4">Price</th>
              <th className="px-8 py-4">Availability</th>
              <th className="px-8 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 dark:divide-white/5">
            {loading ? (
              <tr>
                <td colSpan="5" className="px-8 py-20 text-center">
                  <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
                </td>
              </tr>
            ) : items.length > 0 ? items.map((item) => (
              <tr key={item._id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                <td className="px-8 py-4 flex items-center gap-4">
                  <img src={item.imageUrl} className="w-12 h-12 rounded-xl object-cover shrink-0" alt="" />
                  <div>
                    <span className="font-bold">{item.name}</span>
                    {item.description && (
                      <p className="text-[10px] text-gray-500 line-clamp-1">{item.description}</p>
                    )}
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className="px-3 py-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-transparent rounded-lg text-xs font-medium text-gray-600 dark:text-gray-300">{item.category}</span>
                </td>
                <td className="px-8 py-4 font-bold text-accent whitespace-nowrap">
                  {item.hasPortions 
                    ? `Single: ₹${item.singlePrice} / Full: ₹${item.fullPrice}` 
                    : `₹${item.price}`}
                </td>
                <td className="px-8 py-4">
                  <button
                    onClick={() => toggleAvailability(item)}
                    className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full transition-colors ${
                      item.isAvailable 
                        ? 'text-green-400 bg-green-400/10 hover:bg-green-400/20' 
                        : 'text-accent bg-accent/10 hover:bg-accent/20'
                    }`}
                    title="Click to toggle"
                  >
                    {item.isAvailable ? 'In Stock' : 'Unavailable'}
                  </button>
                </td>
                <td className="px-8 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <button 
                      onClick={() => openEditModal(item)}
                      className="p-2 text-gray-500 hover:text-primary transition-colors"
                      title="Edit Item"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button 
                      onClick={() => initiateDelete(item._id)}
                      className="p-2 text-gray-500 hover:text-accent transition-colors"
                      title="Delete Item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="px-8 py-20 text-center text-gray-500">
                  No items found. Add your first item!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

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
                  <Tag className="text-accent" />
                  {editingId ? 'Edit Menu Item' : 'Add New Menu Item'}
                </h2>
                <button onClick={closeModal} className="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-xl transition-colors">
                  <X size={20} />
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Image Upload — first */}
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Item Image</label>
                  <ImageUploader
                    value={formData.imageUrl}
                    onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                  />
                </div>

                {/* Restaurant Selector */}
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Restaurant</label>
                  <div className="relative">
                    <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <select
                      required
                      className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-accent/50 transition-colors appearance-none text-gray-900 dark:text-white"
                      value={formData.restaurantId}
                      onChange={(e) => setFormData({ ...formData, restaurantId: e.target.value })}
                    >
                      <option value="" disabled>-- Select a Restaurant --</option>
                      {restaurants.map(r => (
                        <option key={r._id} value={r._id}>{r.name}</option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">▾</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Item Name</label>
                  <input 
                    type="text" required placeholder="e.g. Cheese Pizza"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-accent/50 transition-colors text-gray-900 dark:text-white"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Category</label>
                  <input 
                    type="text" required placeholder="e.g. Main Course, Desserts"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-accent/50 transition-colors text-gray-900 dark:text-white"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>

                {/* Portion toggle */}
                <div className="md:col-span-2">
                  <label className="flex items-center gap-3 cursor-pointer p-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 hover:border-accent/50 transition-colors">
                    <input 
                      type="checkbox" className="w-5 h-5 accent-accent"
                      checked={formData.hasPortions}
                      onChange={(e) => setFormData({ ...formData, hasPortions: e.target.checked })}
                    />
                    <span className="font-bold text-gray-900 dark:text-white">Enable Single / Full Portion Pricing</span>
                  </label>
                </div>

                {!formData.hasPortions ? (
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Regular Price (₹)</label>
                    <div className="relative">
                      <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                      <input 
                        type="number" required={!formData.hasPortions} min="0"
                        className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-10 pr-6 outline-none focus:border-accent/50 transition-colors text-gray-900 dark:text-white"
                        value={formData.price || ''}
                        onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Single Price (₹)</label>
                      <div className="relative">
                        <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input 
                          type="number" required min="0"
                          className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-10 pr-6 outline-none focus:border-accent/50 transition-colors text-gray-900 dark:text-white"
                          value={formData.singlePrice || ''}
                          onChange={(e) => setFormData({ ...formData, singlePrice: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Full Price (₹)</label>
                      <div className="relative">
                        <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input 
                          type="number" required min="0"
                          className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 pl-10 pr-6 outline-none focus:border-accent/50 transition-colors text-gray-900 dark:text-white"
                          value={formData.fullPrice || ''}
                          onChange={(e) => setFormData({ ...formData, fullPrice: Number(e.target.value) })}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Availability</label>
                  <select
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-accent/50 transition-colors appearance-none text-gray-900 dark:text-white"
                    value={formData.isAvailable ? 'true' : 'false'}
                    onChange={(e) => setFormData({ ...formData, isAvailable: e.target.value === 'true' })}
                  >
                    <option value="true">In Stock</option>
                    <option value="false">Unavailable</option>
                  </select>
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-500 dark:text-gray-400 ml-1 uppercase">Description (Optional)</label>
                  <textarea 
                    placeholder="Describe the item (ingredients, taste, size...)"
                    rows="3"
                    className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-accent/50 resize-none transition-colors text-gray-900 dark:text-white"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
                    className="flex-[2] py-4 rounded-2xl bg-accent text-white font-bold hover:scale-[1.02] transition-all disabled:opacity-50 disabled:scale-100 shadow-lg shadow-accent/20"
                  >
                    {saving ? 'Saving...' : editingId ? 'Update Item' : 'Save Menu Item'}
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
        title="Delete Menu Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
      />
    </div>
  );
};

export default ManageItems;
