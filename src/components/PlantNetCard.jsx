import { useState } from 'react';
import { Microscope, ChevronDown, ChevronUp } from 'lucide-react';

export default function PlantNetCard({ matches }) {
  const [open, setOpen] = useState(false);
  if (!matches?.length) return null;

  const top = matches[0];

  return (
    <div className="bg-white rounded-2xl shadow-card overflow-hidden border-t-4 border-forest-500">
      <div className="p-4">
        {/* Heading */}
        <div className="flex items-center gap-2 mb-3">
          <Microscope size={18} className="text-forest-500" aria-hidden="true" />
          <span className="font-semibold text-forest-900 text-sm uppercase tracking-wide">Botanical ID</span>
        </div>

        {/* Primary identification */}
        <p className="text-lg font-semibold italic text-forest-900 leading-tight">{top.sciName}</p>
        {top.commonName && (
          <p className="text-sm text-slate-600 mt-0.5">{top.commonName}</p>
        )}

        {/* Confidence badge */}
        <span
          className="inline-flex items-center bg-forest-500 text-white rounded-full px-3 py-1 text-xs font-mono mt-2"
          aria-label={`Match confidence: ${top.confidence} percent`}
        >
          {top.confidence}% confidence
        </span>

        {/* Taxonomy chips */}
        <div className="flex flex-wrap gap-2 mt-3">
          {top.genus && (
            <span
              className="bg-forest-50 border border-forest-200 rounded-full px-3 py-1 text-xs"
              aria-label={`Genus: ${top.genus}`}
            >
              <span className="font-bold text-forest-700">Genus</span>
              <span className="text-slate-500"> · {top.genus}</span>
            </span>
          )}
          {top.family && (
            <span
              className="bg-forest-50 border border-forest-200 rounded-full px-3 py-1 text-xs"
              aria-label={`Family: ${top.family}`}
            >
              <span className="font-bold text-forest-700">Family</span>
              <span className="text-slate-500"> · {top.family}</span>
            </span>
          )}
        </div>
      </div>

      {/* Alternative matches */}
      {matches.length > 1 && (
        <>
          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(o => !o)}
            className="md:hidden w-full flex items-center justify-between px-4 py-2 border-t border-gray-100 text-sm text-forest-600 font-medium"
            aria-expanded={open}
          >
            <span>{open ? 'Hide' : 'Show'} alternative matches</span>
            {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {/* List: toggled on mobile, always visible on md+ */}
          <ul
            className={`border-t border-gray-100 divide-y divide-gray-50 ${open ? 'block' : 'hidden'} md:block`}
            role="list"
          >
            {matches.map((m) => (
              <li key={m.rank} className="flex items-center gap-3 px-4 py-2.5">
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    m.rank === 1 ? 'bg-forest-500 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                  aria-label={`Rank ${m.rank}`}
                >
                  {m.rank}
                </span>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium italic text-forest-900 truncate">{m.sciName}</p>
                  {m.commonName && (
                    <p className="text-xs text-slate-500 truncate">{m.commonName}</p>
                  )}
                </div>

                <div className="flex-shrink-0 flex flex-col items-end gap-1">
                  <span className="text-xs font-mono text-slate-600">{m.confidence}%</span>
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-forest-500 rounded-full"
                      style={{ width: `${m.confidence}%` }}
                      role="meter"
                      aria-valuenow={m.confidence}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${m.sciName} confidence ${m.confidence}%`}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
