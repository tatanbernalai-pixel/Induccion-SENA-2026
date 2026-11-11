import React, { useState } from 'react';
import { SENA_CREST_IMAGE, SENA_CREST_FALLBACK, CREST_HOTSPOTS } from '../data/inductionData';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const CrestHotspots: React.FC = () => {
  const [selectedHotspot, setSelectedHotspot] = useState(CREST_HOTSPOTS[0]);
  const [exploredIds, setExploredIds] = useState<string[]>(['caduceo']);

  const handleSelect = (hotspot: typeof CREST_HOTSPOTS[0]) => {
    setSelectedHotspot(hotspot);
    if (!exploredIds.includes(hotspot.id)) {
      setExploredIds(prev => [...prev, hotspot.id]);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs transition-colors duration-200">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            Explorador Interactivo del Escudo SENA
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Haz clic en los puntos interactivos del blasón para comprender los 3 sectores de la economía nacional
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 shrink-0">
          <span>Explorados:</span>
          <span className="font-bold text-[#39A900] tabular-nums">
            {exploredIds.length} de {CREST_HOTSPOTS.length}
          </span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left: Crest with interactive hotspot pins */}
        <div className="md:col-span-6 flex justify-center">
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 shadow-inner group">
            <img
              src={SENA_CREST_IMAGE}
              alt="Escudo Heráldico del SENA con sectores productivos"
              className="w-full h-full object-contain p-2"
              referrerPolicy="no-referrer"
              onError={(e) => {
                e.currentTarget.src = SENA_CREST_FALLBACK;
              }}
            />

            {/* Hotspot buttons */}
            {CREST_HOTSPOTS.map((spot) => {
              const isSelected = selectedHotspot.id === spot.id;
              const isExplored = exploredIds.includes(spot.id);

              return (
                <button
                  key={spot.id}
                  onClick={() => handleSelect(spot)}
                  aria-label={spot.name}
                  style={{ top: spot.position.top, left: spot.position.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-transform duration-200 cursor-pointer shadow-md ${
                    isSelected
                      ? 'scale-125 ring-4 ring-offset-2 ring-emerald-500 bg-[#39A900] text-white z-20'
                      : isExplored
                      ? 'bg-slate-900 dark:bg-slate-700 text-white hover:scale-110 z-10'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-white border-2 border-[#39A900] hover:scale-110 z-10'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed explanations and tabs */}
        <div className="md:col-span-6 space-y-4">
          <div className="flex flex-wrap gap-2">
            {CREST_HOTSPOTS.map((spot) => {
              const isSelected = selectedHotspot.id === spot.id;
              const isExplored = exploredIds.includes(spot.id);
              return (
                <button
                  key={spot.id}
                  onClick={() => handleSelect(spot)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-[#39A900] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {isExplored && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>{spot.name}</span>
                </button>
              );
            })}
          </div>

          <div className="bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 rounded-xl p-5 transition-all">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#39A900]">
              {selectedHotspot.sector}
            </div>
            <h5 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
              {selectedHotspot.name}
            </h5>
            <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {selectedHotspot.description}
            </p>
          </div>

          <div className="p-4 bg-emerald-50/60 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800 rounded-xl text-xs text-emerald-900 dark:text-emerald-300 leading-relaxed">
            <span className="font-semibold text-emerald-950 dark:text-emerald-200">Recordatorio Institucional: </span>
            Los tres sectores representan la universalidad de la oferta educativa del SENA: desde el agro colombiano hasta las industrias avanzadas y las tecnologías de servicios digitales.
          </div>
        </div>
      </div>
    </div>
  );
};
