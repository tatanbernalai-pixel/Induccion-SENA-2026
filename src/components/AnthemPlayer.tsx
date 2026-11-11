import React, { useState, useEffect } from 'react';
import { Play, Square, Volume2, Music, Sparkles } from 'lucide-react';
import { ANTHEM_VERSES } from '../data/inductionData';
import { senaAnthemSynthesizer } from '../utils/senaAnthemAudio';

interface AnthemPlayerProps {
  onCompleted?: () => void;
}

export const AnthemPlayer: React.FC<AnthemPlayerProps> = ({ onCompleted }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeVerse, setActiveVerse] = useState(0);
  const [activeLine, setActiveLine] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    return () => {
      senaAnthemSynthesizer.stop();
    };
  }, []);

  const handlePlayToggle = () => {
    if (isPlaying) {
      senaAnthemSynthesizer.stop();
      setIsPlaying(false);
    } else {
      setHasStarted(true);
      setIsPlaying(true);
      senaAnthemSynthesizer.startAnthemSequence(
        (verseIdx, lineIdx) => {
          setActiveVerse(verseIdx);
          setActiveLine(lineIdx);
        },
        () => {
          setIsPlaying(false);
          onCompleted?.();
        }
      );
    }
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md border border-slate-800">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#39A900] mb-1">
            <Music className="w-4 h-4" />
            <span>Himno Oficial del SENA</span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400">Audio Interactivo</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white">
            Himno de la Formación Profesional Integral
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Letra: <span className="text-slate-300 font-medium">Luis Alfredo Sarmiento</span> · Música: <span className="text-slate-300 font-medium">Daniel Marlez</span>
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayToggle}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md cursor-pointer ${
              isPlaying
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-[#39A900] hover:bg-[#2e8800] text-white'
            }`}
          >
            {isPlaying ? (
              <>
                <Square className="w-4 h-4 fill-current" />
                <span>Pausar Marcha</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>{hasStarted ? 'Reanudar Himno' : 'Entonar Himno'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Visualizer & Synchronized Karaoke Lyrics */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Audio visualizer simulation & Anthem meaning */}
        <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800/80 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-medium text-slate-400">Ondas de Frecuencia</span>
            <span className={`text-xs font-semibold ${isPlaying ? 'text-[#39A900]' : 'text-slate-500'}`}>
              {isPlaying ? 'Sintetizador Activo' : 'En Pausa'}
            </span>
          </div>

          {/* Equalizer bars animation */}
          <div className="flex items-end justify-center gap-1.5 h-20 px-2 py-3 bg-slate-900/80 rounded-lg border border-slate-800">
            {[45, 80, 60, 95, 30, 70, 85, 40, 90, 65, 50, 75, 100, 55, 35, 80].map((h, i) => (
              <div
                key={i}
                className={`w-2 rounded-t transition-all duration-300 ${
                  isPlaying
                    ? 'bg-[#39A900]'
                    : 'bg-slate-700 h-2'
                }`}
                style={{
                  height: isPlaying ? `${Math.max(12, (h * ((activeLine + 1) * 0.25 + 0.3)) % 100)}%` : '6px'
                }}
              />
            ))}
          </div>

          <div className="mt-5 space-y-3 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-4">
            <div className="flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
              <p>
                El himno es un canto a la esperanza y la juventud trabajadora, exaltando el estudio técnico como la vía más noble para la paz.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p>
                Se entona solemnemente con la cabeza erguida en ceremonias de apertura, juramentos y graduaciones.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Lyrics with active highlights */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-medium text-slate-400 mb-2">
            Letra Oficial (Sigue la estrofa activa mientras se reproduce):
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ANTHEM_VERSES.map((verse, vIdx) => {
              const isCurrentVerse = isPlaying && activeVerse === vIdx;
              return (
                <div
                  key={vIdx}
                  className={`p-4 rounded-xl border transition-all ${
                    isCurrentVerse
                      ? 'bg-slate-800/90 border-[#39A900] shadow-md shadow-[#39A900]/10'
                      : 'bg-slate-950/40 border-slate-800/60 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${
                      isCurrentVerse ? 'text-[#39A900]' : 'text-slate-500'
                    }`}>
                      {verse.label}
                    </span>
                    {isCurrentVerse && (
                      <span className="text-[10px] bg-[#39A900]/20 text-[#39A900] font-semibold px-2 py-0.5 rounded">
                        En reproducción
                      </span>
                    )}
                  </div>
                  <div className="space-y-1 text-sm font-medium">
                    {verse.lines.map((line, lIdx) => {
                      const isCurrentLine = isCurrentVerse && activeLine === lIdx;
                      return (
                        <p
                          key={lIdx}
                          className={`transition-all duration-200 ${
                            isCurrentLine
                              ? 'text-white font-bold translate-x-1'
                              : isCurrentVerse
                              ? 'text-slate-300'
                              : 'text-slate-400'
                          }`}
                        >
                          {line}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
