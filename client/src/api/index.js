import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchRestaurants = () => API.get('/restaurants');
export const fetchRestaurant = (id) => API.get(`/restaurants/${id}`);
export const fetchAllItems = () => API.get('/items');
export const fetchItems = (restaurantId) => API.get(`/items/restaurant/${restaurantId}`);
export const login = (formData) => API.post('/auth/login', formData);
export const fetchServices = () => API.get('/services');
export const updateServiceStatus = (key, isEnabled) => {
  const token = localStorage.getItem('ring4delivery_admin_token');
  return API.patch(`/services/${key}`, { isEnabled }, {
    headers: { Authorization: `Bearer ${token}` }
  });
};

export const uploadImage = (file) => {
  const token = localStorage.getItem('ring4delivery_admin_token');
  const data = new FormData();
  data.append('image', file);
  return API.post('/upload', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token}`
    }
  });
};

export default API;
