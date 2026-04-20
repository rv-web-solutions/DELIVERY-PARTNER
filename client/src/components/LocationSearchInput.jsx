import { useState, useEffect, useRef } from 'react';
import { MapPin, Search, Loader2 } from 'lucide-react';

const LocationSearchInput = ({ value, onChange, onSelect, placeholder, icon: Icon, error }) => {
  const [query, setQuery] = useState(value || '');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);

  // Sync with external value
  useEffect(() => {
    if (value !== undefined) setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length < 3) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(query)}&limit=5`);
        const data = await response.json();
        
        const results = data.features.map(f => ({
          name: f.properties.name || '',
          city: f.properties.city || f.properties.state || '',
          country: f.properties.country || '',
          fullAddress: [f.properties.name, f.properties.street, f.properties.city, f.properties.state, f.properties.country]
            .filter(Boolean)
            .join(', '),
          lat: f.geometry.coordinates[1],
          lng: f.geometry.coordinates[0]
        }));
        
        setSuggestions(results);
        setIsOpen(true);
      } catch (error) {
        console.error('Error fetching locations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchSuggestions, 500);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSelect = (s) => {
    setQuery(s.fullAddress);
    setSuggestions([]);
    setIsOpen(false);
    if (onSelect) onSelect(s);
    if (onChange) onChange(s.fullAddress);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />}
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (onChange) onChange(e.target.value);
          }}
          placeholder={placeholder}
          className={`w-full bg-white dark:bg-white/5 border ${error ? 'border-accent' : 'border-gray-200 dark:border-white/10'} text-gray-900 dark:text-white rounded-2xl py-4 ${Icon ? 'pl-12' : 'px-6'} pr-12 outline-none focus:border-primary/50 transition-all text-sm`}
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <Loader2 className="text-primary animate-spin" size={18} />
          ) : (
            <Search className="text-gray-400" size={18} />
          )}
        </div>
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-[100] w-full mt-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {suggestions.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSelect(s)}
              className="w-full flex items-start gap-4 p-4 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-b border-gray-50 dark:border-white/5 last:border-0 text-left"
            >
              <div className="mt-0.5 p-2 bg-primary/10 rounded-lg text-primary">
                <MapPin size={16} />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="font-bold text-sm text-gray-900 dark:text-gray-100 truncate">{s.name || 'Unnamed Location'}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{s.fullAddress}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearchInput;
