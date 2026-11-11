import React from 'react';
import { Award, GraduationCap, BarChart3, HelpCircle, Moon, Sun, Home, Film } from 'lucide-react';
import { SENA_LOGO_SVG } from '../data/inductionData';

interface HeaderProps {
  currentRole: 'apprentice' | 'instructor';
  onRoleChange: (role: 'apprentice' | 'instructor') => void;
  onGoToLanding?: () => void;
  overallProgress: number;
  onOpenNormativeHelp: () => void;
  onOpenVideoManual: () => void;
  onViewCertificate: () => void;
  certificateEarned: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isThemeBlurring?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onRoleChange,
  onGoToLanding,
  overallProgress,
  onOpenNormativeHelp,
  onOpenVideoManual,
  onViewCertificate,
  certificateEarned,
  isDarkMode,
  onToggleDarkMode,
  isThemeBlurring = false
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Bar: Zone 1 (Wordmark) - Zone 2 (Nav links) - Zone 3 (Primary Actions & Theme Toggle) */}
        <div className="flex items-center justify-between gap-6 sm:gap-8 h-16">
          {/* Zone 1: Single text element Brand wordmark with SENA green accent */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onGoToLanding}
              className="w-14 h-14 flex items-center justify-center shrink-0 cursor-pointer transition-transform hover:scale-105"
              title="Volver a la Página Principal (Seleccionar Rol)"
            >
              <img
                src={SENA_LOGO_SVG}
                alt="Logo SENA"
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
            </button>
            <button
              onClick={onGoToLanding}
              className="text-left cursor-pointer group"
              title="Volver a la Página Principal (Seleccionar Rol)"
            >
              <div className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap group-hover:text-[#39A900] transition-colors">
                SENA <span className="text-[#39A900] font-semibold">Inducción</span>
              </div>
            </button>
          </div>

          {/* Zone 2: Clean single-line navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {onGoToLanding && (
              <button
                onClick={onGoToLanding}
                className="hover:text-[#39A900] dark:hover:text-[#39A900] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 text-slate-700 dark:text-slate-300"
                title="Cambiar de Rol / Seleccionar Aprendiz"
              >
                <Home className="w-4 h-4 text-[#39A900]" />
                <span>Inicio / Cambiar Rol</span>
              </button>
            )}
            <button
              onClick={() => onRoleChange('apprentice')}
              className={`hover:text-[#39A900] dark:hover:text-[#39A900] transition-colors whitespace-nowrap cursor-pointer ${
                currentRole === 'apprentice' ? 'text-[#39A900] dark:text-[#39A900] font-semibold' : ''
              }`}
            >
              Ruta del Aprendiz
            </button>
            <button
              onClick={() => onRoleChange('instructor')}
              className={`hover:text-[#39A900] dark:hover:text-[#39A900] transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                currentRole === 'instructor' ? 'text-[#39A900] dark:text-[#39A900] font-semibold' : ''
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              Seguimiento Cohortes
            </button>
            <button
              onClick={onOpenVideoManual}
              className="hover:text-[#39A900] dark:hover:text-[#39A900] text-emerald-800 dark:text-emerald-400 font-semibold transition-colors whitespace-nowrap flex items-center gap-1.5 cursor-pointer bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800"
            >
              <Film className="w-4 h-4 text-[#39A900]" />
              Video Manual
            </button>
            <button
              onClick={onOpenNormativeHelp}
              className="hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap flex items-center gap-1.5 text-slate-500 dark:text-slate-400 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-500" />
              Consultar Reglamento
            </button>
          </nav>

          {/* Zone 3: Primary action & Theme Toggle in top right */}
          <div className="flex items-center gap-3 shrink-0">
            {currentRole === 'apprentice' ? (
              <div className="flex items-center gap-2">
                {certificateEarned ? (
                  <button
                    onClick={onViewCertificate}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#2e8800] rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
                  >
                    <Award className="w-4 h-4" />
                    <span>Certificado</span>
                  </button>
                ) : (
                  <div className="hidden sm:flex items-center gap-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-300">
                    <span className="text-slate-500 dark:text-slate-400">Progreso:</span>
                    <span className="font-bold text-[#39A900] tabular-nums">{overallProgress}%</span>
                    <div className="w-14 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#39A900] rounded-full transition-all duration-300"
                        style={{ width: `${overallProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                <button
                  onClick={() => onRoleChange('instructor')}
                  className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
                >
                  Modo Instructor
                </button>
              </div>
            ) : (
              <button
                onClick={() => onRoleChange('apprentice')}
                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 border border-transparent dark:border-slate-700 rounded-lg transition-colors shadow-xs whitespace-nowrap cursor-pointer"
              >
                <GraduationCap className="w-4 h-4" />
                <span>Modo Aprendiz</span>
              </button>
            )}

            {/* Dark Mode Toggle Button in the top right corner */}
            <div className="h-5 w-px bg-slate-200 dark:bg-slate-800" />
            <button
              onClick={onToggleDarkMode}
              disabled={isThemeBlurring}
              title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              aria-label={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all duration-200 cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-[#39A900]"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
