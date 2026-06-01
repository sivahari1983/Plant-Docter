import { SearchX, WifiOff, Camera, CheckCircle2 } from 'lucide-react';

const tips = [
  'Ensure the plant fills most of the frame',
  'Use good lighting — avoid harsh shadows',
  'Capture a clear leaf or distinctive feature',
  'Make sure the image is in focus',
];

function isNetworkError(error) {
  if (!error) return false;
  const msg = error.toLowerCase();
  return (
    msg.includes('network') ||
    msg.includes('fetch') ||
    msg.includes('internet') ||
    msg.includes('connection') ||
    msg.includes('offline') ||
    msg.includes('api error 5')
  );
}

export default function ErrorScreen({ error, onRetry }) {
  const network = isNetworkError(error);

  return (
    <div className="min-h-screen bg-cream-100 overflow-y-auto">
      {/* Page header */}
      <div className="flex items-center px-4 py-3">
        <button
          onClick={onRetry}
          aria-label="Go back"
          className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-forest-50 text-slate-400 hover:text-forest-700 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <span className="font-sans text-base font-semibold text-forest-900 ml-2">Analysis Result</span>
      </div>

      {/* Error card */}
      <div
        role="alert"
        className={`mx-4 mt-4 rounded-2xl p-6 text-center shadow-card ${network ? 'bg-slate-50' : 'bg-red-50'}`}
      >
        {network
          ? <WifiOff size={48} className="text-slate-400 mx-auto mb-4" aria-hidden="true" />
          : <SearchX size={48} className="text-red-400 mx-auto mb-4" aria-hidden="true" />
        }
        <h1 className={`font-sans text-lg font-bold ${network ? 'text-slate-700' : 'text-red-700'}`}>
          {network ? 'Connection Problem' : 'Plant Not Recognized'}
        </h1>
        <p className="font-sans text-sm text-slate-600 mt-2 leading-relaxed">
          {error || (network
            ? 'Please check your internet connection and try again.'
            : "We couldn't identify this plant from the photo. This sometimes happens with unclear, dark, or partial images."
          )}
        </p>
        <button
          onClick={onRetry}
          className="mt-5 mx-auto bg-forest-700 hover:bg-forest-900 active:scale-95 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-150 min-h-[48px]"
        >
          <Camera size={18} aria-hidden="true" />
          Try Another Photo
        </button>
      </div>

      {/* Tips section */}
      <div className="mx-4 mt-6 pb-8 pb-safe">
        <p className="font-sans text-sm font-semibold text-forest-900 mb-3">Tips for better results:</p>
        <ul className="space-y-2" role="list">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-2 font-sans text-sm text-slate-600">
              <CheckCircle2 size={16} className="text-forest-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
