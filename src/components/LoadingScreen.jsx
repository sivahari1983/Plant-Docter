import { useEffect, useState } from 'react';
import { Leaf } from 'lucide-react';

const messages = [
  'Sending image to Pl@ntNet...',
  'Identifying your plant...',
  'Matching species database...',
  'Checking nutritional profiles...',
  'Preparing recommendations...',
];

export default function LoadingScreen({ imagePreview }) {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setMsgIdx((i) => (i + 1) % messages.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col overflow-hidden">
      {/* Page header */}
      <div className="flex items-center px-4 py-3 sticky top-0 z-10 bg-cream-100">
        <div className="w-11 h-11 flex items-center justify-center rounded-full pointer-events-none opacity-40">
          {/* back button disabled during load */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-slate-600">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>
        <span className="font-sans text-base font-semibold text-forest-900 ml-2">Analyzing Plant</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Photo with scanning overlay */}
        {imagePreview && (
          <div className="relative max-w-xs w-full mx-auto mb-8">
            <img
              src={imagePreview}
              alt="Captured plant photo for analysis"
              className="w-full aspect-square object-cover rounded-xl shadow-card"
            />
            <div className="absolute inset-0 bg-forest-900/20 rounded-xl" />
            {/* Scanning animation */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              role="img"
              aria-label="Plant analysis in progress"
            >
              <div className="relative w-32 h-32 flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full border-4 border-forest-200 animate-pulse-ring" />
                <div className="absolute w-24 h-24 rounded-full border-4 border-t-forest-500 border-forest-200 animate-spin-slow [animation-duration:2s]" />
                <Leaf className="text-forest-500 relative z-10" size={32} aria-hidden="true" />
              </div>
            </div>
          </div>
        )}

        {/* If no preview, show standalone spinner */}
        {!imagePreview && (
          <div
            className="relative w-32 h-32 flex items-center justify-center mb-8"
            role="img"
            aria-label="Plant analysis in progress"
          >
            <div className="absolute w-32 h-32 rounded-full border-4 border-forest-200 animate-pulse-ring" />
            <div className="absolute w-24 h-24 rounded-full border-4 border-t-forest-500 border-forest-200 animate-spin-slow" />
            <Leaf className="text-forest-500 relative z-10" size={32} aria-hidden="true" />
          </div>
        )}

        {/* Progress messages */}
        <div role="status" aria-live="polite" className="text-center mt-2 px-4">
          <p className="font-sans text-base font-semibold text-forest-900 transition-all duration-500">
            {messages[msgIdx]}
          </p>
          <p className="font-sans text-sm text-slate-400 mt-1">
            This usually takes 3–5 seconds
          </p>
        </div>
      </div>
    </div>
  );
}
