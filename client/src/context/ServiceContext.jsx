import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchServices } from '../api';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [services, setServices] = useState({});
  const [loading, setLoading] = useState(true);

  const loadServices = useCallback(async () => {
    try {
      const { data } = await fetchServices();
      const statusMap = data.reduce((acc, curr) => {
        acc[curr.key] = curr.isEnabled;
        return acc;
      }, {});
      setServices(statusMap);
    } catch (err) {
      console.error('Failed to load services status:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadServices();
  }, [loadServices]);

  const value = {
    services,
    loading,
    refreshServices: loadServices
  };

  return (
    <ServiceContext.Provider value={value}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};
