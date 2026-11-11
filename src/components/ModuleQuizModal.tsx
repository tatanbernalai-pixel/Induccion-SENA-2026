import React, { useState } from 'react';
import { ModuleQuiz, ModuleId } from '../types/induction';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Sparkles, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ModuleQuizModalProps {
  quiz: ModuleQuiz;
  moduleId: ModuleId;
  moduleTitle: string;
  isOpen: boolean;
  onClose: () => void;
  onQuizComplete: (moduleId: ModuleId, score: number) => void;
}

export const ModuleQuizModal: React.FC<ModuleQuizModalProps> = ({
  quiz,
  moduleId,
  moduleTitle,
  isOpen,
  onClose,
  onQuizComplete
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isOpen) return null;

  const currentQ = quiz.questions[currentIndex];
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
    setUserAnswers(prev => [...prev, idx]);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate final score
      let correct = 0;
      quiz.questions.forEach((q, i) => {
        if (userAnswers[i] === q.correctIndex) {
          correct++;
        }
      });
      const score = Math.round((correct / quiz.questions.length) * 100);
      setIsCompleted(true);
      onQuizComplete(moduleId, score);

      if (score >= quiz.passingScore) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        } catch {
          // Confetti fallback
        }
      }
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setUserAnswers([]);
    setIsCompleted(false);
  };

  // Compute stats on completion
  const correctCount = userAnswers.filter(
    (ans, i) => ans === quiz.questions[i]?.correctIndex
  ).length;
  const scorePercent = Math.round((correctCount / quiz.questions.length) * 100);
  const hasPassed = scorePercent >= quiz.passingScore;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-900 dark:text-white transition-colors duration-200">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div>
            <div className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
              Cuestionario Evaluativo
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
              {moduleTitle}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {!isCompleted ? (
            <>
              {/* Question progress indicator */}
              <div className="flex items-center justify-between text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>
                  Pregunta {currentIndex + 1} de {quiz.questions.length}
                </span>
                <span className="font-semibold text-slate-700 dark:text-slate-300">
                  Aprobación mínima: {quiz.passingScore}%
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#39A900] rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / quiz.questions.length) * 100}%` }}
                />
              </div>

              {/* Question statement */}
              <div className="text-base sm:text-lg font-semibold text-slate-900 dark:text-white leading-snug">
                {currentQ.question}
              </div>

              {/* Options list */}
              <div className="space-y-3">
                {currentQ.options.map((option, idx) => {
                  let optionStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200';

                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-semibold ring-1 ring-emerald-500';
                    } else if (idx === selectedOption) {
                      optionStyle = 'border-rose-400 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200';
                    } else {
                      optionStyle = 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 text-slate-400 dark:text-slate-600 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${optionStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{option}</span>
                      </div>
                      {isAnswered && idx === currentQ.correctIndex && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                      )}
                      {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && (
                        <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate pedagogical explanation */}
              {isAnswered && (
                <div className={`p-4 rounded-xl text-xs leading-relaxed border ${
                  selectedOption === currentQ.correctIndex
                    ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                    : 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200'
                }`}>
                  <div className="font-bold flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>
                      {selectedOption === currentQ.correctIndex ? '¡Respuesta Correcta!' : 'Fundamentación Pedagógica:'}
                    </span>
                  </div>
                  <p>{currentQ.explanation}</p>
                  {currentQ.normativeRef && (
                    <div className="mt-2 text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      Referencia: {currentQ.normativeRef}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                {hasPassed ? (
                  <Award className="w-10 h-10 text-[#39A900]" />
                ) : (
                  <RotateCcw className="w-8 h-8 text-amber-500" />
                )}
              </div>

              <div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white">
                  {hasPassed ? '¡Felicitaciones! Módulo Aprobado' : 'Módulo No Aprobado'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {hasPassed
                    ? 'Has demostrado el dominio de los conceptos esenciales institucionales.'
                    : 'No alcanzaste el puntaje mínimo del 80%. Puedes repasar los contenidos y reintentar.'}
                </p>
              </div>

              {/* Score pill */}
              <div className="inline-flex items-center gap-4 bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 px-6 py-3 rounded-2xl">
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {scorePercent}%
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Puntaje Obtenido</div>
                </div>
                <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
                    {correctCount}/{quiz.questions.length}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Aciertos</div>
                </div>
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-400 pt-2">
                {hasPassed ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    Se ha registrado tu avance en el sistema de seguimiento de inducción.
                  </span>
                ) : (
                  <span>Puedes intentarlo cuantas veces sea necesario para afianzar el conocimiento.</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          {!isCompleted ? (
            <>
              <button
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Cerrar por ahora
              </button>
              <button
                disabled={!isAnswered}
                onClick={handleNext}
                className={`flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  isAnswered
                    ? 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-xs'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
                }`}
              >
                <span>{isLastQuestion ? 'Ver Resultados' : 'Siguiente Pregunta'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-between gap-3">
              {!hasPassed && (
                <button
                  onClick={handleRetry}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reintentar Evaluación</span>
                </button>
              )}
              <button
                onClick={onClose}
                className="ml-auto px-5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
              >
                {hasPassed ? 'Continuar con la Ruta' : 'Cerrar y Repasar'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
