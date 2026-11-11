import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ApprenticePortal } from './components/ApprenticePortal';
import { InstructorDashboard } from './components/InstructorDashboard';
import { ModuleViewerModal } from './components/ModuleViewerModal';
import { ModuleQuizModal } from './components/ModuleQuizModal';
import { NormativeHelpModal } from './components/NormativeHelpModal';
import { VideoManualModal } from './components/VideoManualModal';
import { CertificateView } from './components/CertificateView';
import { LandingPage } from './components/LandingPage';
import { ModuleInfo, ModuleId, ApprenticeProgress, ApprenticeUser } from './types/induction';
import { MODULES_DATA, INITIAL_BADGES, SENA_LOGO_SVG } from './data/inductionData';
import { INITIAL_APPRENTICES } from './data/mockCohorts';

export default function App() {
  // Dark mode state with persistence & smooth blur transition
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('sena_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return document.documentElement.classList.contains('dark') ||
        window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  const [isThemeBlurring, setIsThemeBlurring] = useState<boolean>(false);

  // Sync dark class on mount
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Theme toggle with blur transition requested by user
  const handleToggleDarkMode = () => {
    if (isThemeBlurring) return;

    // 1. Activate full screen blur
    setIsThemeBlurring(true);

    // 2. Midpoint of blur: flip colors
    setTimeout(() => {
      setIsDarkMode(prev => {
        const next = !prev;
        if (next) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('sena_theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('sena_theme', 'light');
        }
        return next;
      });
    }, 180);

    // 3. Clear blur smoothly after color transition settles
    setTimeout(() => {
      setIsThemeBlurring(false);
    }, 450);
  };

  // View mode: 'landing' (role selection landing page) | 'apprentice' | 'instructor'
  const [currentView, setCurrentView] = useState<'landing' | 'apprentice' | 'instructor'>('landing');

  // Selected apprentice identifier (out of the multiple apprentices in the cohort)
  const [selectedApprenticeId, setSelectedApprenticeId] = useState<string>('app-01');

  // Apprentice interactive progress state
  const [progress, setProgress] = useState<ApprenticeProgress>({
    completedModules: ['identity', 'symbols'],
    moduleScores: {
      identity: 100,
      symbols: 100,
      normative: 0,
      digital: 0,
      wellness: 0
    },
    casesCompleted: ['caso-1'],
    earnedBadges: [INITIAL_BADGES[0], INITIAL_BADGES[1]],
    classificationGameBestScore: 70,
    certificateEarned: false,
    certificateDate: '10 de Noviembre de 2026',
    inductionCode: 'SENA-IND-2824910-0982'
  });

  // Apprentices list for instructor dashboard
  const [apprentices, setApprentices] = useState<ApprenticeUser[]>(INITIAL_APPRENTICES);

  // Active navigation tab within Apprentice portal
  const [apprenticeTab, setApprenticeTab] = useState<'modules' | 'cases' | 'game' | 'anthem' | 'certificate'>('modules');

  // Modal states
  const [activeModuleForViewing, setActiveModuleForViewing] = useState<ModuleInfo | null>(null);
  const [activeModuleForQuiz, setActiveModuleForQuiz] = useState<ModuleInfo | null>(null);
  const [isNormativeHelpOpen, setIsNormativeHelpOpen] = useState(false);
  const [isVideoManualOpen, setIsVideoManualOpen] = useState(false);

  // Handling quiz completion
  const handleQuizComplete = (moduleId: ModuleId, score: number) => {
    setProgress(prev => {
      const isNewCompletion = !prev.completedModules.includes(moduleId) && score >= 80;
      const updatedModules = isNewCompletion
        ? [...prev.completedModules, moduleId]
        : prev.completedModules;

      const updatedScores = {
        ...prev.moduleScores,
        [moduleId]: Math.max(prev.moduleScores[moduleId] || 0, score)
      };

      // Check badges
      const newBadges = [...prev.earnedBadges];
      if (moduleId === 'normative' && score >= 80 && !newBadges.some(b => b.id === 'b-normativa')) {
        const bNorm = INITIAL_BADGES.find(b => b.id === 'b-normativa');
        if (bNorm) newBadges.push(bNorm);
      }
      if (moduleId === 'digital' && score >= 80 && !newBadges.some(b => b.id === 'b-digital')) {
        const bDig = INITIAL_BADGES.find(b => b.id === 'b-digital');
        if (bDig) newBadges.push(bDig);
      }

      // Check certificate completion
      const hasCompletedAll = updatedModules.length === MODULES_DATA.length;
      if (hasCompletedAll && !newBadges.some(b => b.id === 'b-induccion-master')) {
        const bMaster = INITIAL_BADGES.find(b => b.id === 'b-induccion-master');
        if (bMaster) newBadges.push(bMaster);
      }

      return {
        ...prev,
        completedModules: updatedModules,
        moduleScores: updatedScores,
        earnedBadges: newBadges,
        certificateEarned: hasCompletedAll || prev.certificateEarned
      };
    });
  };

  // Handling case solved
  const handleCaseSolved = (caseId: string) => {
    setProgress(prev => {
      if (prev.casesCompleted.includes(caseId)) return prev;
      const updatedCases = [...prev.casesCompleted, caseId];
      const newBadges = [...prev.earnedBadges];
      if (updatedCases.length >= 2 && !newBadges.some(b => b.id === 'b-tribunal')) {
        const bTrib = INITIAL_BADGES.find(b => b.id === 'b-tribunal');
        if (bTrib) newBadges.push(bTrib);
      }
      return {
        ...prev,
        casesCompleted: updatedCases,
        earnedBadges: newBadges
      };
    });
  };

  // Handling classification game best score
  const handleClassificationScoreSaved = (score: number) => {
    setProgress(prev => ({
      ...prev,
      classificationGameBestScore: Math.max(prev.classificationGameBestScore, score)
    }));
  };

  // Overall progress percentage
  const overallPercentage = Math.round(
    (progress.completedModules.length / MODULES_DATA.length) * 100
  );

  // Active apprentice object based on selection
  const currentApprentice = apprentices.find(a => a.id === selectedApprenticeId) || apprentices[0];

  // Landing Page view (entry point to select Apprentice vs Instructor)
  if (currentView === 'landing') {
    return (
      <div className={`min-h-screen flex flex-col font-sans theme-blur-layer ${isThemeBlurring ? 'theme-is-blurring' : ''}`}>
        <LandingPage
          apprentices={apprentices}
          selectedApprenticeId={selectedApprenticeId}
          onSelectApprentice={setSelectedApprenticeId}
          onAddApprentice={(newApp) => {
            setApprentices(prev => [newApp, ...prev]);
          }}
          onEnterAsApprentice={() => setCurrentView('apprentice')}
          onEnterAsInstructor={() => setCurrentView('instructor')}
          onOpenVideoManual={() => setIsVideoManualOpen(true)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={handleToggleDarkMode}
          isThemeBlurring={isThemeBlurring}
        />

        <NormativeHelpModal
          isOpen={isNormativeHelpOpen}
          onClose={() => setIsNormativeHelpOpen(false)}
        />
        <VideoManualModal
          isOpen={isVideoManualOpen}
          onClose={() => setIsVideoManualOpen(false)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* Top Header with Dark Mode Toggle in top right */}
      <Header
        currentRole={currentView === 'instructor' ? 'instructor' : 'apprentice'}
        onRoleChange={(role) => setCurrentView(role)}
        onGoToLanding={() => setCurrentView('landing')}
        overallProgress={overallPercentage}
        onOpenNormativeHelp={() => setIsNormativeHelpOpen(true)}
        onOpenVideoManual={() => setIsVideoManualOpen(true)}
        onViewCertificate={() => {
          setCurrentView('apprentice');
          setApprenticeTab('certificate');
        }}
        certificateEarned={progress.certificateEarned || overallPercentage === 100}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
        isThemeBlurring={isThemeBlurring}
      />

      {/* Main Content Stage with Screen Blur Transition layer */}
      <div className={`flex-1 flex flex-col theme-blur-layer ${isThemeBlurring ? 'theme-is-blurring' : ''}`}>
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {currentView === 'apprentice' ? (
            <ApprenticePortal
              progress={progress}
              currentApprentice={currentApprentice}
              onOpenModule={(mod) => setActiveModuleForViewing(mod)}
              onOpenQuiz={(mod) => setActiveModuleForQuiz(mod)}
              onCaseSolved={handleCaseSolved}
              onClassificationScoreSaved={handleClassificationScoreSaved}
              onViewCertificate={() => setApprenticeTab('certificate')}
              activeTab={apprenticeTab}
              onTabChange={setApprenticeTab}
            />
          ) : (
            <InstructorDashboard
              apprentices={apprentices}
              onUpdateApprentice={(updated) => {
                setApprentices(prev => prev.map(a => a.id === updated.id ? updated : a));
              }}
              onAddApprentice={(newApp) => {
                setApprentices(prev => [newApp, ...prev]);
              }}
            />
          )}
        </main>

        {/* Institutional Footer */}
        <footer className="no-print bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-16 py-8 transition-colors duration-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <img
                  src={SENA_LOGO_SVG}
                  alt="Logo SENA"
                  className="w-full h-full object-contain filter drop-shadow-xs"
                />
              </div>
              <div>
                <span className="font-semibold text-slate-800 dark:text-slate-200">Servicio Nacional de Aprendizaje (SENA)</span>
                <span> · Dirección de Formación Profesional Integral</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">SENA SofiaPlus</span>
              <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Plataforma Zajuna LMS</span>
              <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Sistema de Bibliotecas</span>
              <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">Reglamento Acuerdo 009 de 2024</span>
            </div>

            <div className="text-slate-400 dark:text-slate-500">
              República de Colombia · {new Date().getFullYear()}
            </div>
          </div>
        </footer>
      </div>

      {/* Modals */}
      {activeModuleForViewing && (
        <ModuleViewerModal
          module={activeModuleForViewing}
          isOpen={true}
          onClose={() => setActiveModuleForViewing(null)}
          onOpenQuiz={(mod) => {
            setActiveModuleForViewing(null);
            setActiveModuleForQuiz(mod);
          }}
          isCompleted={progress.completedModules.includes(activeModuleForViewing.id)}
          score={progress.moduleScores[activeModuleForViewing.id]}
        />
      )}

      {activeModuleForQuiz && (
        <ModuleQuizModal
          quiz={activeModuleForQuiz.quiz}
          moduleId={activeModuleForQuiz.id}
          moduleTitle={activeModuleForQuiz.title}
          isOpen={true}
          onClose={() => setActiveModuleForQuiz(null)}
          onQuizComplete={handleQuizComplete}
        />
      )}

      <NormativeHelpModal
        isOpen={isNormativeHelpOpen}
        onClose={() => setIsNormativeHelpOpen(false)}
      />
      <VideoManualModal
        isOpen={isVideoManualOpen}
        onClose={() => setIsVideoManualOpen(false)}
      />
    </div>
  );
}
