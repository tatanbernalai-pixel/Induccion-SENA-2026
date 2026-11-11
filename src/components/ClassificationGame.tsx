import React, { useState } from 'react';
import { CLASSIFICATION_GAME_ITEMS } from '../data/inductionData';
import { CheckCircle2, XCircle, RotateCcw, Trophy, Zap, ShieldAlert, Award, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ClassificationGameProps {
  onScoreSaved: (score: number) => void;
  bestScore: number;
}

export const ClassificationGame: React.FC<ClassificationGameProps> = ({
  onScoreSaved,
  bestScore
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [feedback, setFeedback] = useState<{
    isCorrect: boolean;
    chosen: string;
    actual: string;
    explanation: string;
    article: string;
  } | null>(null);
  const [isGameFinished, setIsGameFinished] = useState(false);

  const currentItem = CLASSIFICATION_GAME_ITEMS[currentIndex];

  const handleClassify = (chosenCategory: 'Derecho' | 'Deber' | 'Prohibición') => {
    if (feedback) return;

    const isCorrect = chosenCategory === currentItem.category;
    const newScore = isCorrect ? score + 10 : score;
    const newStreak = isCorrect ? streak + 1 : 0;

    setScore(newScore);
    setStreak(newStreak);

    setFeedback({
      isCorrect,
      chosen: chosenCategory,
      actual: currentItem.category,
      explanation: currentItem.explanation,
      article: currentItem.article
    });

    if (newStreak >= 5) {
      try {
        confetti({
          particleCount: 30,
          spread: 40,
          origin: { y: 0.8 }
        });
      } catch {
        // Fallback
      }
    }
  };

  const handleNextItem = () => {
    setFeedback(null);
    if (currentIndex < CLASSIFICATION_GAME_ITEMS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsGameFinished(true);
      onScoreSaved(score);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setFeedback(null);
    setIsGameFinished(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6 transition-colors duration-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#39A900] mb-1">
            <Zap className="w-4 h-4" />
            <span>Reto de Agilidad Normativa</span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>Clasificador Rápido</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            ¿Es un Derecho, un Deber o una Prohibición?
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pon a prueba tus reflejos reglamentarios clasificando cada enunciado institucional.
          </p>
        </div>

        {/* Stats bar */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="text-slate-500 dark:text-slate-400">Puntaje:</span>
            <span className="font-bold text-slate-900 dark:text-white tabular-nums">{score} pts</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3.5 py-1.5 rounded-xl text-xs flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#39A900]" />
            <span className="text-slate-500 dark:text-slate-400">Racha:</span>
            <span className="font-bold text-[#39A900] tabular-nums">{streak} 🔥</span>
          </div>
        </div>
      </div>

      {!isGameFinished ? (
        <div className="max-w-2xl mx-auto space-y-6 py-4">
          {/* Progress */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>
              Enunciado {currentIndex + 1} de {CLASSIFICATION_GAME_ITEMS.length}
            </span>
            <span>Mejor Marca: {bestScore} pts</span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#39A900] rounded-full transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / CLASSIFICATION_GAME_ITEMS.length) * 100}%`
              }}
            />
          </div>

          {/* Statement Card */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/20 dark:from-slate-950/80 dark:to-emerald-950/20 border-2 border-slate-200/80 dark:border-slate-800 text-center shadow-xs min-h-[160px] flex flex-col justify-center items-center">
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Enunciado a Clasificar
            </div>
            <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-white max-w-xl leading-relaxed">
              "{currentItem.text}"
            </p>
          </div>

          {/* Action buttons (Derecho / Deber / Prohibición) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              disabled={feedback !== null}
              onClick={() => handleClassify('Derecho')}
              className={`p-4 rounded-xl border text-sm font-bold transition-all shadow-xs flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                feedback
                  ? currentItem.category === 'Derecho'
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-500'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-50'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400'
              }`}
            >
              <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>DERECHO</span>
              <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">Art. 7 del Reglamento</span>
            </button>

            <button
              disabled={feedback !== null}
              onClick={() => handleClassify('Deber')}
              className={`p-4 rounded-xl border text-sm font-bold transition-all shadow-xs flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                feedback
                  ? currentItem.category === 'Deber'
                    ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-500 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-50'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-950/30 text-blue-800 dark:text-blue-400'
              }`}
            >
              <ShieldAlert className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>DEBER</span>
              <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">Art. 9 del Reglamento</span>
            </button>

            <button
              disabled={feedback !== null}
              onClick={() => handleClassify('Prohibición')}
              className={`p-4 rounded-xl border text-sm font-bold transition-all shadow-xs flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                feedback
                  ? currentItem.category === 'Prohibición'
                    ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-900 dark:text-rose-200 ring-2 ring-rose-500'
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-50'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-rose-500 hover:bg-rose-50/30 dark:hover:bg-rose-950/30 text-rose-800 dark:text-rose-400'
              }`}
            >
              <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400" />
              <span>PROHIBICIÓN</span>
              <span className="text-[10px] font-normal text-slate-500 dark:text-slate-400">Art. 10 del Reglamento</span>
            </button>
          </div>

          {/* Feedback banner */}
          {feedback && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed space-y-2 ${
              feedback.isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}>
              <div className="flex items-center justify-between font-bold text-sm">
                <span className="flex items-center gap-1.5">
                  {feedback.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ¡Acertaste! Corresponde a un {feedback.actual}.
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4 text-amber-600" />
                      Incorrecto. Seleccionaste {feedback.chosen}, pero es un {feedback.actual}.
                    </>
                  )}
                </span>
                <span className="text-[11px] font-semibold text-slate-600 flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  {feedback.article}
                </span>
              </div>
              <p>{feedback.explanation}</p>
              <div className="pt-1 flex justify-end">
                <button
                  onClick={handleNextItem}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-xs"
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Finished Screen */
        <div className="text-center py-8 space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center bg-emerald-50 text-[#39A900]">
            <Trophy className="w-10 h-10" />
          </div>

          <h4 className="text-xl font-bold text-slate-900">
            ¡Reto Normativo Finalizado!
          </h4>
          <p className="text-xs text-slate-500">
            Has completado la clasificación de derechos, deberes y prohibiciones del Acuerdo 009 de 2024.
          </p>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex justify-around items-center">
            <div>
              <div className="text-2xl font-bold text-slate-900 tabular-nums">{score}</div>
              <div className="text-[11px] text-slate-500">Puntaje Final</div>
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <div>
              <div className="text-2xl font-bold text-[#39A900] tabular-nums">10/10</div>
              <div className="text-[11px] text-slate-500">Completados</div>
            </div>
          </div>

          <button
            onClick={handleRestart}
            className="w-full flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-[#39A900] hover:bg-[#2e8800] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Jugar de Nuevo para Mejorar Racha</span>
          </button>
        </div>
      )}
    </div>
  );
};
