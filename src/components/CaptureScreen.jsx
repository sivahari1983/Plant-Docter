import { useRef } from 'react';
import { Camera, ImagePlus, Leaf } from 'lucide-react';
import { validateImageFile } from '../utils/imageUtils';

export default function CaptureScreen({ onImageCapture }) {
  const cameraRef  = useRef();
  const galleryRef = useRef();

  function handleFile(file) {
    if (!file) return;
    const err = validateImageFile(file);
    if (err) { alert(err); return; }
    onImageCapture(file);
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col relative overflow-y-auto">
      {/* Header / Logo */}
      <div className="px-4 pt-6 pb-2 flex items-center gap-2">
        <Leaf className="text-forest-500" size={28} aria-hidden="true" />
        <span className="font-display text-2xl font-bold text-forest-900">Plant Doctor</span>
      </div>

      {/* Tagline */}
      <div className="px-4 mt-2">
        <p className="font-display text-2xl font-bold text-forest-900 leading-tight">
          Identify any plant.
        </p>
        <p className="font-display text-2xl font-bold text-forest-700 leading-tight">
          Get expert care advice.
        </p>
      </div>

      {/* Hero illustration */}
      <div className="w-full h-44 flex items-center justify-center my-4 px-4">
        <div className="w-full h-full bg-forest-50 rounded-3xl flex items-center justify-center">
          <Leaf size={96} className="text-forest-200" aria-hidden="true" />
        </div>
      </div>

      {/* Prompt text */}
      <p className="text-sm text-slate-400 text-center px-6 mb-6">
        Take or upload a photo of your plant to get started
      </p>

      {/* Hidden file inputs */}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        aria-label="Select plant image file"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        aria-label="Select plant image file"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {/* Camera FAB */}
      <div className="flex flex-col items-center my-4">
        <button
          onClick={() => cameraRef.current.click()}
          aria-label="Take a photo of your plant"
          className="w-20 h-20 rounded-full bg-forest-700 hover:bg-forest-900 hover:scale-105 active:scale-95 text-white flex items-center justify-center shadow-fab transition-all duration-200"
        >
          <Camera size={32} />
        </button>
        <span className="text-xs text-slate-400 text-center mt-2">Take a Photo</span>
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 px-8 my-2">
        <div className="flex-1 border-t border-cream-300" />
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide">or</span>
        <div className="flex-1 border-t border-cream-300" />
      </div>

      {/* Upload button */}
      <div className="px-4 mt-2 flex justify-center">
        <button
          onClick={() => galleryRef.current.click()}
          aria-label="Upload a plant photo from your device"
          className="w-full max-w-xs bg-white border-2 border-forest-500 hover:bg-forest-50 active:scale-95 text-forest-700 font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-150 min-h-[48px]"
        >
          <ImagePlus size={20} />
          Upload Photo
        </button>
      </div>

      {/* Caption */}
      <p className="text-xs text-slate-400 text-center mt-3 mb-8 pb-safe">
        Supports JPG, PNG, WebP up to 10MB
      </p>
    </div>
  );
}
