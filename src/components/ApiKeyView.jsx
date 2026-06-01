import { useState } from 'react';
import { Eye, EyeOff, Shield, Leaf, ChevronLeft } from 'lucide-react';

export default function ApiKeyView({ onKeySet, isSettingsMode = false, onBack }) {
  const existing = localStorage.getItem('plantnet_api_key') || '';
  const [key,  setKey]  = useState(isSettingsMode ? existing : '');
  const [show, setShow] = useState(false);
  const [err,  setErr]  = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = key.trim();
    if (!trimmed || trimmed.length < 8) {
      setErr('Please enter a valid Pl@ntNet API key.');
      return;
    }
    localStorage.setItem('plantnet_api_key', trimmed);
    onKeySet();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-700 via-forest-600 to-forest-500 flex items-center justify-center p-4">
      <section
        aria-labelledby="apikey-heading"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 md:p-8 relative"
      >
        {isSettingsMode && onBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label="Go back"
            className="absolute top-4 left-4 w-9 h-9 flex items-center justify-center rounded-full hover:bg-forest-50 text-slate-400 hover:text-forest-700 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        <div className="flex items-center gap-2 justify-center mb-2">
          <Leaf className="text-forest-500" size={28} aria-hidden="true" />
          <span className="font-display text-2xl font-bold text-forest-900">Plant Doctor</span>
        </div>
        <p className="text-center text-slate-400 text-xs mb-4">Know what your plant needs</p>

        <h2
          id="apikey-heading"
          className="font-sans text-2xl font-bold text-forest-900 text-center mt-4"
        >
          {isSettingsMode ? 'Update API Key' : 'Connect Pl@ntNet'}
        </h2>
        <p className="font-sans text-sm text-slate-500 text-center mt-2 leading-relaxed max-w-xs mx-auto">
          {isSettingsMode
            ? 'Enter a new Pl@ntNet API key. Your key is stored only in this browser.'
            : "Plant Doctor uses the free Pl@ntNet API — the world's most accurate plant ID service, built by botanists. Get your free key at my.plantnet.org (30 seconds, no payment needed)."}
        </p>

        {!isSettingsMode && (
          <ol className="text-sm text-slate-500 space-y-1 mt-4 mb-1 list-decimal list-inside bg-sage-100 rounded-xl p-4">
            <li>Go to <span className="text-forest-600 font-semibold">my.plantnet.org</span></li>
            <li>Create a free account (email only)</li>
            <li>Copy your API key from the dashboard</li>
            <li>Paste it below — you only do this once</li>
          </ol>
        )}

        <form onSubmit={handleSubmit} className="mt-5 space-y-0" noValidate>
          <label
            htmlFor="apikey-input"
            className="font-sans text-sm font-semibold text-forest-900 block mb-1.5 mt-3"
          >
            Pl@ntNet API Key
          </label>
          <div className="relative">
            <input
              id="apikey-input"
              type={show ? 'text' : 'password'}
              value={key}
              onChange={(e) => { setKey(e.target.value); setErr(''); }}
              placeholder="2b10..."
              aria-describedby={err ? 'apikey-error' : undefined}
              className="w-full rounded-xl border-2 border-cream-300 bg-cream-100 px-4 py-3 pr-12 font-mono text-sm text-slate-700 placeholder:text-slate-400 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20 transition-colors"
              autoComplete="off"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? 'Hide API key' : 'Show API key'}
              aria-controls="apikey-input"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-forest-700 hover:bg-forest-50 transition-colors"
            >
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {err && (
            <p id="apikey-error" role="alert" className="font-sans text-xs text-red-600 mt-1.5">
              {err}
            </p>
          )}

          <button
            type="submit"
            disabled={!key.trim()}
            className="w-full mt-5 bg-forest-700 hover:bg-forest-900 text-white font-semibold py-3 rounded-xl transition-all duration-150 min-h-[48px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSettingsMode ? 'Save Changes' : 'Get Started'}
          </button>
        </form>

        <a
          href="https://my.plantnet.org"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-sm text-forest-600 hover:text-forest-900 underline underline-offset-2 text-center block mt-4 transition-colors"
        >
          Get a free key at my.plantnet.org →
        </a>

        <div className="flex items-center justify-center gap-2 mt-5">
          <Shield size={14} className="text-forest-500" />
          <span className="font-sans text-xs text-slate-400">Your key never leaves your device</span>
        </div>
      </section>
    </div>
  );
}
