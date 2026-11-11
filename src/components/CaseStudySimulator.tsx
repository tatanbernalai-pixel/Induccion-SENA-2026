import React, { useState } from 'react';
import { NORMATIVE_CASES } from '../data/inductionData';
import { CaseStudy } from '../types/induction';
import { Scale, CheckCircle2, XCircle, ArrowRight, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CaseStudySimulatorProps {
  onCaseSolved: (caseId: string) => void;
  solvedCases: string[];
}

export const CaseStudySimulator: React.FC<CaseStudySimulatorProps> = ({
  onCaseSolved,
  solvedCases
}) => {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [hasEvaluated, setHasEvaluated] = useState(false);

  const currentCase = NORMATIVE_CASES[selectedCaseIndex];
  const isCaseAlreadySolved = solvedCases.includes(currentCase.id);

  const handleSelectOption = (optId: string) => {
    if (hasEvaluated) return;
    setSelectedOptionId(optId);
  };

  const handleEvaluateDecision = () => {
    if (!selectedOptionId) return;
    setHasEvaluated(true);
    const chosen = currentCase.options.find(o => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      onCaseSolved(currentCase.id);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {
        // Fallback
      }
    }
  };

  const handleResetForCase = (index: number) => {
    setSelectedCaseIndex(index);
    setSelectedOptionId(null);
    setHasEvaluated(false);
  };

  const selectedOption = currentCase.options.find(o => o.id === selectedOptionId);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#39A900] mb-1">
            <Scale className="w-4 h-4" />
            <span>Simulador de Casos Reales</span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>Tribunal Normativo SENA</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Toma de Decisiones y Debido Proceso (Acuerdo 009 de 2024)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Analiza situaciones del día a día en los centros de formación y determina la ruta jurídica y pedagógica correcta.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 rounded-lg shrink-0">
          <span>Casos Superados:</span>
          <span className="font-bold text-[#39A900] tabular-nums">
            {solvedCases.length} de {NORMATIVE_CASES.length}
          </span>
        </div>
      </div>

      {/* Case Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {NORMATIVE_CASES.map((cs, idx) => {
          const isSelected = selectedCaseIndex === idx;
          const isSolved = solvedCases.includes(cs.id);

          return (
            <button
              key={cs.id}
              onClick={() => handleResetForCase(idx)}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-2 cursor-pointer ${
                isSelected
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {isSolved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              <span>Caso #{idx + 1}: {cs.title}</span>
            </button>
          );
        })}
      </div>

      {/* Case Details Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Scenario context */}
        <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-950/60 rounded-xl p-5 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Ámbito: {currentCase.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
              Gravedad: {currentCase.severity}
            </span>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              {currentCase.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              {currentCase.context}
            </p>
          </div>

          <div className="p-3.5 bg-white dark:bg-slate-900 rounded-lg border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <span className="font-bold text-slate-900 dark:text-white block mb-1">El Suceso:</span>
            {currentCase.description}
          </div>

          <div className="p-3.5 bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800 rounded-lg text-xs text-emerald-950 dark:text-emerald-200">
            <div className="font-bold flex items-center gap-1.5 mb-1 text-emerald-900 dark:text-emerald-300">
              <AlertCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Dilema Ético & Normativo:</span>
            </div>
            <p>{currentCase.dilemma}</p>
          </div>
        </div>

        {/* Right: Decision options and evaluation */}
        <div className="lg:col-span-7 space-y-4">
          <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Selecciona la decisión institucional correcta:
          </div>

          <div className="space-y-3">
            {currentCase.options.map((option, idx) => {
              const isSelected = selectedOptionId === option.id;

              let style = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200';

              if (hasEvaluated) {
                if (option.isCorrect) {
                  style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-200 ring-1 ring-emerald-500';
                } else if (isSelected && !option.isCorrect) {
                  style = 'border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-950 dark:text-rose-200';
                } else {
                  style = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-400 dark:text-slate-600 opacity-60';
                }
              } else if (isSelected) {
                style = 'border-[#39A900] bg-emerald-50/40 dark:bg-emerald-950/30 text-slate-900 dark:text-white ring-1 ring-[#39A900]';
              }

              return (
                <button
                  key={option.id}
                  disabled={hasEvaluated}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full text-left p-4 rounded-xl border text-xs sm:text-sm transition-all duration-150 flex items-start justify-between gap-3 cursor-pointer ${style}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{option.action}</span>
                  </div>

                  {hasEvaluated && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  )}
                  {hasEvaluated && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action button */}
          {!hasEvaluated ? (
            <div className="pt-2">
              <button
                disabled={!selectedOptionId}
                onClick={handleEvaluateDecision}
                className={`px-5 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-2 cursor-pointer ${
                  selectedOptionId
                    ? 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-xs'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Evaluar Dictamen Jurídico</span>
              </button>
            </div>
          ) : (
            /* Feedback card */
            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
              selectedOption?.isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}>
              <div className="font-bold flex items-center gap-1.5 text-sm">
                {selectedOption?.isCorrect ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>¡Decisión Correcta Conforme al Reglamento!</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-600" />
                    <span>Decisión Incorrecta o Violatoria del Debido Proceso</span>
                  </>
                )}
              </div>
              <p>{selectedOption?.feedback}</p>
              {selectedOption?.normativeRef && (
                <div className="text-[11px] font-semibold text-slate-700 pt-1 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Fundamento Legal: {selectedOption.normativeRef}</span>
                </div>
              )}

              <div className="pt-2 flex items-center gap-3">
                {!selectedOption?.isCorrect && (
                  <button
                    onClick={() => {
                      setHasEvaluated(false);
                      setSelectedOptionId(null);
                    }}
                    className="px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-100 font-semibold text-xs cursor-pointer"
                  >
                    Intentar otra opción
                  </button>
                )}
                {selectedCaseIndex < NORMATIVE_CASES.length - 1 && (
                  <button
                    onClick={() => handleResetForCase(selectedCaseIndex + 1)}
                    className="ml-auto px-4 py-1.5 bg-slate-900 text-white rounded-lg hover:bg-slate-800 font-semibold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Siguiente Caso</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
