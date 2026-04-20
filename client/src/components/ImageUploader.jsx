import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader } from 'lucide-react';
import { uploadImage } from '../api';

/**
 * ImageUploader — drop zone + file picker that uploads to Cloudinary.
 * Props:
 *   value       {string}   current image URL (controlled)
 *   onChange    {fn}       called with the new Cloudinary URL after upload
 *   className   {string}   optional wrapper class
 */
const ImageUploader = ({ value, onChange, className = '' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;

    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowed.includes(file.type)) {
      setError('Only JPG, PNG, WEBP, or GIF files are allowed.');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('File must be smaller than 5 MB.');
      return;
    }

    setError('');
    setUploading(true);
    try {
      const { data } = await uploadImage(file);
      onChange(data.imageUrl);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const onInputChange = (e) => handleFile(e.target.files[0]);

  const onDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const clearImage = (e) => {
    e.stopPropagation();
    onChange('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Drop zone */}
      <div
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={onDrop}
        className={`relative flex flex-col items-center justify-center gap-3 border-2 border-dashed rounded-2xl p-6 cursor-pointer transition-colors
          ${dragOver ? 'border-primary bg-primary/10' : 'border-white/20 hover:border-primary/50 bg-white/5'}
          ${uploading ? 'cursor-wait opacity-70' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={onInputChange}
          disabled={uploading}
        />

        {uploading ? (
          <>
            <Loader size={28} className="text-primary animate-spin" />
            <p className="text-sm text-gray-400">Uploading to Cloudinary…</p>
          </>
        ) : (
          <>
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Upload size={22} className="text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">Click to upload or drag & drop</p>
              <p className="text-xs text-gray-500 mt-1">JPG, PNG, WEBP, GIF — max 5 MB</p>
            </div>
          </>
        )}
      </div>

      {/* Error */}
      {error && (
        <p className="text-accent text-xs ml-1 flex items-center gap-1">
          <X size={12} /> {error}
        </p>
      )}

      {/* Preview — shown after upload */}
      {value && !uploading && (
        <div className="relative group rounded-2xl overflow-hidden border border-white/10">
          <img
            src={value}
            alt="Preview"
            className="w-full h-40 object-cover"
            onError={(e) => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-white/20 backdrop-blur px-3 py-2 rounded-xl text-xs font-bold hover:bg-white/30 transition-colors flex items-center gap-1"
            >
              <ImageIcon size={14} /> Change
            </button>
            <button
              type="button"
              onClick={clearImage}
              className="bg-accent/80 backdrop-blur px-3 py-2 rounded-xl text-xs font-bold hover:bg-accent transition-colors flex items-center gap-1"
            >
              <X size={14} /> Remove
            </button>
          </div>
          <div className="absolute top-2 right-2 bg-green-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
            Uploaded ✓
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
