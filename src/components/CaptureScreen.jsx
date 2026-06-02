import { useRef, useState } from 'react';
import { Camera, ImagePlus, Leaf, Settings, X } from 'lucide-react';
import { validateImageFile } from '../utils/imageUtils';

const ORGANS = [
  { value: 'leaf',   label: 'Leaf',   emoji: '🍃' },
  { value: 'flower', label: 'Flower', emoji: '🌸' },
  { value: 'fruit',  label: 'Fruit',  emoji: '🍎' },
  { value: 'auto',   label: 'Auto',   emoji: '🌿' },
];

export default function CaptureScreen({ onImageCapture, onOpenSettings }) {
  const cameraRef  = useRef();
  const galleryRef = useRef();
  const [organ, setOrgan]       = useState('leaf');
  const [tipDismissed, setTip]  = useState(
    () => localStorage.getItem('plantdoctor_tip_dismissed') === '1'
  );

  function dismissTip() {
    localStorage.setItem('plantdoctor_tip_dismissed', '1');
    setTip(true);
  }

  function handleFile(file) {
    if (!file) return;
    const err = validateImageFile(file);
    if (err) { alert(err); return; }
    onImageCapture(file, organ);
  }

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col relative overflow-y-auto">
      {/* Settings button */}
      <button
        onClick={onOpenSettings}
        aria-label="Open API key settings"
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:text-forest-700 hover:bg-forest-50 active:bg-forest-200 transition-colors duration-150"
      >
        <Settings size={20} />
      </button>

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
      <div className="w-full h-36 flex items-center justify-center my-3 px-4">
        <div className="w-full h-full bg-forest-50 rounded-3xl flex items-center justify-center">
          <Leaf size={80} className="text-forest-200" aria-hidden="true" />
        </div>
      </div>

      {/* Photo tip banner */}
      {!tipDismissed && (
        <div className="mx-4 mb-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
          <span className="text-xl flex-shrink-0" aria-hidden="true">📸</span>
          <p className="text-sm text-amber-800 flex-1 leading-snug">
            <strong>For best results:</strong> fill the frame with a single leaf or stem on a plain background.
          </p>
          <button
            onClick={dismissTip}
            className="flex-shrink-0 text-amber-400 hover:text-amber-700 mt-0.5"
            aria-label="Dismiss tip"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Organ selector */}
      <div className="mx-4 mb-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
          What part are you photographing?
        </p>
        <div className="flex gap-2" role="group" aria-label="Plant organ selector">
          {ORGANS.map(o => (
            <button
              key={o.value}
              onClick={() => setOrgan(o.value)}
              aria-pressed={organ === o.value}
              className={`flex-1 flex flex-col items-center py-2 px-1 rounded-xl border text-xs font-semibold transition-colors duration-150 min-h-[56px] ${
                organ === o.value
                  ? 'bg-forest-500 border-forest-500 text-white'
                  : 'bg-white border-forest-200 text-forest-700 hover:bg-forest-50'
              }`}
            >
              <span className="text-lg leading-none mb-1" aria-hidden="true">{o.emoji}</span>
              {o.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="sr-only"
        aria-label="Take plant photo"
        onChange={(e) => handleFile(e.target.files[0])}
      />
      <input
        ref={galleryRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        aria-label="Upload plant photo"
        onChange={(e) => handleFile(e.target.files[0])}
      />

      {/* Camera FAB */}
      <div className="flex flex-col items-center my-3">
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

      <p className="text-xs text-slate-400 text-center mt-3 mb-8 pb-safe">
        Supports JPG, PNG, WebP up to 10MB
      </p>
    </div>
  );
}
