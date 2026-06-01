import { RotateCcw, Leaf, TrendingUp, FlaskConical, Sprout, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { useState } from 'react';
import NutrientCard from './NutrientCard';
import HealthAnalysisSection from './HealthAnalysisSection';

export default function ResultsScreen({ result, imagePreview, onReset }) {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    try {
      const existing = JSON.parse(localStorage.getItem('plantdoctor_results') || '[]');
      existing.unshift({ ...result, savedAt: new Date().toISOString() });
      localStorage.setItem('plantdoctor_results', JSON.stringify(existing.slice(0, 50)));
    } catch (_) { /* ignore */ }
    setSaved(true);
  }

  return (
    <div className="min-h-screen bg-cream-100 overflow-y-auto scroll-smooth">
      {/* Hero header */}
      <div className="bg-forest-700 text-white relative">
        {imagePreview && (
          <div className="w-full aspect-video overflow-hidden relative">
            <img
              src={imagePreview}
              alt={`Photo of ${result.plantName}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-forest-900/70 to-transparent" />
          </div>
        )}
        <div className="px-4 pt-4 pb-6">
          <div className="flex items-center gap-2 mb-3">
            <Leaf size={20} aria-hidden="true" />
            <span className="font-display text-xl font-bold">Plant Doctor</span>
          </div>
          <h1 className="font-display text-2xl font-bold">{result.plantName}</h1>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span
              className="inline-flex items-center gap-1 bg-forest-200 text-forest-900 rounded-full px-3 py-1 font-mono text-sm"
              aria-label={`Match confidence: ${result.confidence} percent`}
            >
              <TrendingUp size={14} aria-hidden="true" />
              {result.confidence}% match
            </span>
            {result.rawIdentification?.family && (
              <span className="inline-flex items-center bg-white/20 text-white rounded-full px-3 py-1 text-xs font-mono">
                Family: {result.rawIdentification.family}
              </span>
            )}
          </div>
          {result.rawIdentification?.sciName && result.rawIdentification.sciName !== result.plantName.split('(')[1]?.replace(')','').trim() && (
            <p className="text-sage-200 text-xs mt-1 italic">
              PlantNet identified: {result.rawIdentification.sciName}
              {result.rawIdentification.genus ? ` · Genus: ${result.rawIdentification.genus}` : ''}
            </p>
          )}
        </div>
      </div>

      <div className="px-4 py-4 space-y-4">

        {/* ── AI health & root-cause analysis (Gemini) ── */}
        {result.healthAnalysis && (
          <HealthAnalysisSection health={result.healthAnalysis} />
        )}

        {/* ── Divider when both sections present ── */}
        {result.healthAnalysis && result.nutrients?.length > 0 && (
          <div className="flex items-center gap-3 py-1">
            <div className="flex-1 border-t border-cream-300" />
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wide flex items-center gap-1">
              <Leaf size={12} /> Species Nutrition Profile
            </span>
            <div className="flex-1 border-t border-cream-300" />
          </div>
        )}

        {/* ── Nutritional status (static species DB) ── */}
        {result.nutrients?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-card p-4">
            <h2 className="font-sans text-lg font-semibold text-forest-900 mb-1 flex items-center gap-2">
              <FlaskConical size={20} className="text-forest-500" aria-hidden="true" />
              Nutritional Baseline
            </h2>
            <p className="text-xs text-slate-400 mb-3">General nutrient profile for this species</p>
            <ul className="space-y-3" role="list">
              {result.nutrients.map((n, i) => (
                <li key={i}>
                  <NutrientCard name={n.name} status={n.status} recommendation={n.recommendation} />
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── Fertilizer suggestions ── */}
        {result.fertilizerSuggestions?.length > 0 && (
          <div className="bg-white rounded-2xl shadow-card p-4">
            <h2 className="font-sans text-lg font-semibold text-forest-900 mb-3 flex items-center gap-2">
              <Sprout size={20} className="text-forest-500" aria-hidden="true" />
              General Fertilizer Guide
            </h2>
            <ul className="space-y-2" role="list">
              {result.fertilizerSuggestions.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                  <span className="text-forest-500 mt-0.5 flex-shrink-0">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ── General care ── */}
        {result.careAdvice && (
          <div className="bg-forest-50 rounded-2xl p-4">
            <h2 className="font-sans text-sm font-semibold text-forest-900 mb-1">Species Care Notes</h2>
            <p className="text-slate-600 text-sm leading-relaxed">{result.careAdvice}</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 pt-2 pb-8 pb-safe">
          <button
            onClick={onReset}
            className="flex-1 bg-white border-2 border-forest-500 hover:bg-forest-50 active:scale-95 text-forest-700 font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-150 min-h-[48px]"
          >
            <RotateCcw size={18} />
            Analyze Another
          </button>
          <button
            onClick={handleSave}
            aria-pressed={saved ? 'true' : 'false'}
            disabled={saved}
            className="flex-1 bg-forest-700 hover:bg-forest-900 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-150 min-h-[48px] disabled:opacity-80"
          >
            {saved ? <BookmarkCheck size={18} /> : <BookmarkPlus size={18} />}
            {saved ? 'Saved' : 'Save Result'}
          </button>
        </div>
      </div>
    </div>
  );
}
