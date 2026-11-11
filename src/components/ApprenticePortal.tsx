import React, { useState } from 'react';
import {
  ModuleInfo,
  ModuleId,
  ApprenticeProgress,
  Badge,
  ApprenticeUser
} from '../types/induction';
import {
  MODULES_DATA,
  SENA_CAMPUS_IMAGE,
  INITIAL_BADGES
} from '../data/inductionData';
import {
  Sparkles,
  BookOpen,
  Award,
  Scale,
  Zap,
  Music,
  CheckCircle2,
  Clock,
  ChevronRight,
  ArrowRight,
  Shield,
  FileCheck2,
  GraduationCap
} from 'lucide-react';
import { CaseStudySimulator } from './CaseStudySimulator';
import { ClassificationGame } from './ClassificationGame';
import { AnthemPlayer } from './AnthemPlayer';
import { CertificateView } from './CertificateView';

interface ApprenticePortalProps {
  progress: ApprenticeProgress;
  currentApprentice?: ApprenticeUser;
  onOpenModule: (module: ModuleInfo) => void;
  onOpenQuiz: (module: ModuleInfo) => void;
  onCaseSolved: (caseId: string) => void;
  onClassificationScoreSaved: (score: number) => void;
  onViewCertificate: () => void;
  activeTab: 'modules' | 'cases' | 'game' | 'anthem' | 'certificate';
  onTabChange: (tab: 'modules' | 'cases' | 'game' | 'anthem' | 'certificate') => void;
}

export const ApprenticePortal: React.FC<ApprenticePortalProps> = ({
  progress,
  currentApprentice,
  onOpenModule,
  onOpenQuiz,
  onCaseSolved,
  onClassificationScoreSaved,
  onViewCertificate,
  activeTab,
  onTabChange
}) => {
  // Current user mock profile from prop or fallback
  const apprenticeProfile = currentApprentice || {
    name: 'Sebastián Camilo Bernal Ospina',
    documentNumber: '1018492011',
    documentType: 'CC',
    fichaCode: '2824910',
    programName: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    regional: 'Regional Distrito Capital (Bogotá)',
    trainingCenter: 'Centro de Tecnologías del Transporte (CTT)'
  };

  const completedModulesCount = progress.completedModules.length;
  const totalModulesCount = MODULES_DATA.length;
  const overallPercentage = Math.round((completedModulesCount / totalModulesCount) * 100);

  return (
    <div className="space-y-8">
      {/* Hero Welcome Card with SENA Campus Image Scrim */}
      <div className="relative rounded-3xl overflow-hidden bg-slate-900 text-white shadow-lg border border-slate-800">
        <div className="absolute inset-0">
          <img
            src={SENA_CAMPUS_IMAGE}
            alt="Ambiente de Formación SENA con aprendices"
            className="w-full h-full object-cover opacity-35 filter brightness-90"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#39A900]/25 text-emerald-300 border border-[#39A900]/40 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#39A900]" />
            <span>Fase de Inducción Institucional · Cohorte 2026</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            ¡Bienvenido a la Familia SENA,{' '}
            <span className="text-[#39A900]">{apprenticeProfile.name.split(' ')[0]}</span>!
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Inicia tu camino de formación profesional integral conociendo la historia y símbolos de la institución más querida de Colombia, tus derechos y deberes según el nuevo <strong className="text-white">Acuerdo 009 de 2024</strong>, y las herramientas del ecosistema digital.
          </p>

          {/* Apprentice Identification Strip */}
          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-300">
            <div className="bg-slate-900/80 border border-slate-700/80 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="text-slate-400">Ficha:</span>
              <span className="font-bold text-white font-mono">{apprenticeProfile.fichaCode}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-700/80 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="text-slate-400">Programa:</span>
              <span className="font-semibold text-white">ADSO</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-700/80 px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span className="text-slate-400">Regional:</span>
              <span className="font-medium text-white">{apprenticeProfile.regional}</span>
            </div>
          </div>
        </div>

        {/* Floating progress bottom bar inside hero */}
        <div className="relative z-10 bg-slate-950/80 border-t border-slate-800/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#39A900]/20 border border-[#39A900]/30 flex items-center justify-center text-[#39A900] font-bold text-base">
              {overallPercentage}%
            </div>
            <div>
              <div className="text-xs font-bold text-white">
                Progreso General de Inducción
              </div>
              <div className="text-[11px] text-slate-400">
                {completedModulesCount} de {totalModulesCount} módulos institucionales aprobados
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {progress.certificateEarned ? (
              <button
                onClick={onViewCertificate}
                className="flex items-center gap-2 px-4 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white text-xs font-bold rounded-lg transition-colors shadow-xs cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Ver Mi Acta de Inducción</span>
              </button>
            ) : (
              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>Al completar los 5 módulos obtendrás tu Certificado Oficial</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Interactive Navigation Tabs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-1.5 shadow-xs flex items-center gap-1 overflow-x-auto transition-colors duration-200">
        <button
          onClick={() => onTabChange('modules')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'modules'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Ruta de Módulos ({completedModulesCount}/{totalModulesCount})</span>
        </button>

        <button
          onClick={() => onTabChange('cases')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'cases'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Tribunal Normativo ({progress.casesCompleted.length}/3 Casos)</span>
        </button>

        <button
          onClick={() => onTabChange('game')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'game'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Reto: Derecho, Deber o Prohibición</span>
        </button>

        <button
          onClick={() => onTabChange('anthem')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            activeTab === 'anthem'
              ? 'bg-[#39A900] text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
        >
          <Music className="w-4 h-4" />
          <span>Himno y Mística SENA</span>
        </button>

        {progress.certificateEarned && (
          <button
            onClick={() => onTabChange('certificate')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === 'certificate'
                ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                : 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Mi Certificado Oficial</span>
          </button>
        )}
      </div>

      {/* Tab 1: Modules Grid */}
      {activeTab === 'modules' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Los 5 Módulos de la Inducción SENA
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Ingresa a cada módulo para interactuar con los contenidos multimedia y aprobar la evaluación reglamentaria.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES_DATA.map((mod) => {
              const isCompleted = progress.completedModules.includes(mod.id);
              const score = progress.moduleScores[mod.id];

              return (
                <div
                  key={mod.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div className="p-6 space-y-4">
                    {/* Top indicator & number */}
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                        0{mod.number}
                      </div>

                      {isCompleted ? (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Aprobado ({score}%)</span>
                        </div>
                      ) : (
                        <div className="text-xs text-slate-400 dark:text-slate-500 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>~{mod.durationMinutes} min</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
                        {mod.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                        {mod.shortDescription}
                      </p>
                    </div>

                    {/* Topics bullet strip */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                      <span>{mod.sections.length} temas interactivos</span>
                      <span>Quiz: {mod.quiz.questions.length} preguntas</span>
                    </div>
                  </div>

                  {/* Module Footer CTAs */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
                    <button
                      onClick={() => onOpenModule(mod)}
                      className="text-xs font-semibold text-[#39A900] hover:text-[#2e8800] transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isCompleted ? 'Repasar Contenido' : 'Explorar Módulo'}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onOpenQuiz(mod)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        isCompleted
                          ? 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                          : 'bg-[#39A900] hover:bg-[#2e8800] text-white shadow-xs'
                      }`}
                    >
                      {isCompleted ? 'Reintentar Quiz' : 'Presentar Quiz'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Badges Earned Strip */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-4 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-bold text-slate-900 dark:text-white">
                  Insignias de la Mística SENA
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Reconocimientos desbloqueados a medida que avanzas en tu inducción
                </p>
              </div>
              <div className="text-xs font-bold text-[#39A900]">
                {progress.earnedBadges.length} de {INITIAL_BADGES.length} Insignias
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {INITIAL_BADGES.map((b) => {
                const isUnlocked = progress.earnedBadges.some(eb => eb.id === b.id);
                return (
                  <div
                    key={b.id}
                    className={`p-3.5 rounded-xl border text-center transition-all ${
                      isUnlocked
                        ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60'
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full mx-auto flex items-center justify-center mb-2 bg-white dark:bg-slate-800 shadow-xs">
                      <Award className={`w-4 h-4 ${isUnlocked ? 'text-[#39A900]' : 'text-slate-300 dark:text-slate-600'}`} />
                    </div>
                    <div className="text-xs font-bold truncate">{b.title}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">
                      {b.description}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Case Studies */}
      {activeTab === 'cases' && (
        <CaseStudySimulator
          onCaseSolved={onCaseSolved}
          solvedCases={progress.casesCompleted}
        />
      )}

      {/* Tab 3: Gamified Classification */}
      {activeTab === 'game' && (
        <ClassificationGame
          onScoreSaved={onClassificationScoreSaved}
          bestScore={progress.classificationGameBestScore}
        />
      )}

      {/* Tab 4: Anthem Player */}
      {activeTab === 'anthem' && (
        <div className="space-y-6">
          <AnthemPlayer />
        </div>
      )}

      {/* Tab 5: Certificate */}
      {activeTab === 'certificate' && (
        <CertificateView
          apprenticeName={apprenticeProfile.name}
          documentNumber={apprenticeProfile.documentNumber}
          documentType={apprenticeProfile.documentType}
          fichaCode={apprenticeProfile.fichaCode}
          programName={apprenticeProfile.programName}
          regional={apprenticeProfile.regional}
          trainingCenter={apprenticeProfile.trainingCenter}
          completionDate={progress.certificateDate || '10 de Noviembre de 2026'}
          verificationCode={progress.inductionCode || 'SENA-IND-2824910-0982'}
          onBack={() => onTabChange('modules')}
        />
      )}
    </div>
  );
};
