import React, { useState } from 'react';
import { ModuleInfo } from '../types/induction';
import { X, CheckCircle2, BookOpen, Clock, ArrowRight, Award, Shield, ChevronRight, Sparkles } from 'lucide-react';
import { CrestHotspots } from './CrestHotspots';
import { AnthemPlayer } from './AnthemPlayer';
import { INSTITUTIONAL_VALUES } from '../data/inductionData';

interface ModuleViewerModalProps {
  module: ModuleInfo;
  isOpen: boolean;
  onClose: () => void;
  onOpenQuiz: (module: ModuleInfo) => void;
  isCompleted: boolean;
  score?: number;
}

export const ModuleViewerModal: React.FC<ModuleViewerModalProps> = ({
  module,
  isOpen,
  onClose,
  onOpenQuiz,
  isCompleted,
  score
}) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  if (!isOpen) return null;

  const currentSection = module.sections[activeSectionIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-900 dark:text-white transition-colors duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-[#39A900] text-white flex items-center justify-center font-bold text-sm">
              {module.number}
            </span>
            <div>
              <div className="text-[11px] font-semibold text-[#39A900] uppercase tracking-wider">
                Módulo de Inducción {module.number}
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1">
                {module.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isCompleted && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <CheckCircle2 className="w-4 h-4" />
                <span>Aprobado ({score}%)</span>
              </div>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Section Tabs */}
        <div className="px-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center gap-2 overflow-x-auto py-2">
          {module.sections.map((sec, idx) => {
            const isActive = activeSectionIndex === idx;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSectionIndex(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <span>Tema {idx + 1}: {sec.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Section Heading */}
          <div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              {currentSection.title}
            </h4>
            {currentSection.subtitle && (
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">
                {currentSection.subtitle}
              </p>
            )}
          </div>

          {/* Section Prose Content */}
          <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {currentSection.content.map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>

          {/* Dynamic Interactive Elements depending on section type */}
          {currentSection.interactiveType === 'hotspots' && (
            <div className="pt-2">
              <CrestHotspots />
            </div>
          )}

          {currentSection.interactiveType === 'anthem_player' && (
            <div className="pt-2">
              <AnthemPlayer />
            </div>
          )}

          {currentSection.interactiveType === 'cards_grid' && (
            <div className="pt-2 space-y-3">
              <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                Los 7 Valores del Código de Integridad SENA
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {INSTITUTIONAL_VALUES.map((val, vIdx) => (
                  <div
                    key={vIdx}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/60 hover:border-[#39A900] transition-colors"
                  >
                    <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
                      {val.name}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Takeaways */}
          {currentSection.keyTakeaways && currentSection.keyTakeaways.length > 0 && (
            <div className="p-4 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800 rounded-xl space-y-2">
              <div className="text-xs font-bold text-emerald-950 dark:text-emerald-200 flex items-center gap-1.5 uppercase tracking-wide">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Puntos Clave para tu Formación</span>
              </div>
              <ul className="space-y-1.5 text-xs text-emerald-900 dark:text-emerald-300">
                {currentSection.keyTakeaways.map((item, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39A900] mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Legal citation badge if present */}
          {currentSection.articleRef && (
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-lg">
              <Shield className="w-4 h-4 text-[#39A900]" />
              <span>Base normativa: <strong className="text-slate-700 dark:text-slate-200">{currentSection.articleRef}</strong></span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between">
          <div className="text-xs text-slate-500 dark:text-slate-400">
            {activeSectionIndex < module.sections.length - 1 ? (
              <span>Sección {activeSectionIndex + 1} de {module.sections.length}</span>
            ) : (
              <span className="text-[#39A900] font-semibold">¡Contenido del módulo completado!</span>
            )}
          </div>

          <div className="flex items-center gap-3">
            {activeSectionIndex < module.sections.length - 1 ? (
              <button
                onClick={() => setActiveSectionIndex(prev => prev + 1)}
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors"
              >
                <span>Siguiente Tema</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => {
                  onClose();
                  onOpenQuiz(module);
                }}
                className="flex items-center gap-2 px-5 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white rounded-lg text-xs font-semibold cursor-pointer transition-colors shadow-xs"
              >
                <Award className="w-4 h-4" />
                <span>{isCompleted ? 'Repetir Evaluación' : 'Realizar Evaluación del Módulo'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
