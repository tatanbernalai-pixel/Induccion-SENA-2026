import React, { useState } from 'react';
import {
  GraduationCap,
  BarChart3,
  Scale,
  Sparkles,
  ShieldCheck,
  Award,
  Users,
  Search,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  FileCheck2,
  AlertTriangle,
  ChevronRight,
  Sun,
  Moon,
  UserPlus,
  X,
  Check,
  Film,
  PlayCircle
} from 'lucide-react';
import { ApprenticeUser } from '../types/induction';
import { SENA_LOGO_SVG, SENA_CAMPUS_IMAGE } from '../data/inductionData';

interface LandingPageProps {
  apprentices: ApprenticeUser[];
  selectedApprenticeId: string;
  onSelectApprentice: (apprenticeId: string) => void;
  onAddApprentice: (newApp: ApprenticeUser) => void;
  onEnterAsApprentice: () => void;
  onEnterAsInstructor: () => void;
  onOpenVideoManual: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isThemeBlurring?: boolean;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  apprentices,
  selectedApprenticeId,
  onSelectApprentice,
  onAddApprentice,
  onEnterAsApprentice,
  onEnterAsInstructor,
  onOpenVideoManual,
  isDarkMode,
  onToggleDarkMode,
  isThemeBlurring = false
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isInstructorLoginModalOpen, setIsInstructorLoginModalOpen] = useState(false);
  const [instructorUser, setInstructorUser] = useState('');
  const [instructorPass, setInstructorPass] = useState('');
  const [instructorLoginError, setInstructorLoginError] = useState('');

  const handleInstructorLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = instructorUser.trim().toLowerCase();
    const cleanPass = instructorPass.trim();

    if ((cleanUser === 'instructor' || cleanUser === 'jmendoza' || cleanUser === 'jmendozap@sena.edu.co') && cleanPass === 'sena2026') {
      setIsInstructorLoginModalOpen(false);
      setInstructorLoginError('');
      onEnterAsInstructor();
    } else {
      setInstructorLoginError('Usuario o contraseña genéricos incorrectos. Consulta la pista de ayuda.');
    }
  };

  // Form state for new apprentice registration / interest data (starts clean with helpful guidance hints)
  const [formData, setFormData] = useState({
    name: '',
    documentType: 'CC' as 'CC' | 'TI' | 'CE',
    documentNumber: '',
    soysenaEmail: '',
    personalEmail: '',
    phone: '',
    fichaCode: '',
    programName: '',
    trainingCenter: '',
    regional: ''
  });

  // The single designated lead instructor in charge
  const leadInstructor = {
    name: 'Ing. Javier Orlando Mendoza',
    title: 'Instructor Líder de Formación e Inducción',
    center: 'Centro de Tecnologías del Transporte (CTT)',
    regional: 'Regional Distrito Capital (Bogotá)',
    email: 'jmendozap@sena.edu.co',
    assignedFicha: '2824910 - Tecnólogo ADSO',
    totalSupervised: apprentices.length
  };

  // Selected apprentice object
  const currentSelectedApprentice = apprentices.find(a => a.id === selectedApprenticeId) || apprentices[0];

  // Filtered apprentices for list preview
  const filteredApprentices = apprentices.filter(
    a =>
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.documentNumber.includes(searchQuery) ||
      a.programName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Overall statistics for the landing overview
  const totalCompleted = apprentices.filter(a => a.status === 'Completado').length;
  const totalInProgress = apprentices.filter(a => a.status === 'En Progreso').length;
  const totalAtRisk = apprentices.filter(a => a.status === 'En Riesgo').length;

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.documentNumber.trim()) {
      alert('Por favor ingresa al menos el Nombre y el Número de Documento.');
      return;
    }

    const newAppId = `app-${Date.now().toString().slice(-4)}`;
    const newApprentice: ApprenticeUser = {
      id: newAppId,
      name: formData.name.trim(),
      documentNumber: formData.documentNumber.trim(),
      documentType: formData.documentType,
      email: formData.soysenaEmail.trim() || formData.personalEmail.trim() || `${formData.name.toLowerCase().replace(/\s+/g, '')}@soysena.edu.co`,
      phone: formData.phone.trim() || '300 000 0000',
      fichaCode: formData.fichaCode.trim(),
      programName: formData.programName.trim(),
      regional: formData.regional.trim(),
      trainingCenter: formData.trainingCenter.trim(),
      status: 'En Progreso',
      overallProgress: 0,
      completedModulesCount: 0,
      averageScore: 0,
      lastAccess: 'Justo ahora',
      notes: 'Aprendiz registrado mediante datos de interés e identificación institucional.'
    };

    onAddApprentice(newApprentice);
    onSelectApprentice(newAppId);
    setIsRegisterModalOpen(false);
    onEnterAsApprentice();
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-200 flex flex-col">
      {/* Top Navigation Bar of the Landing Page */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Mark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-12 h-12 flex items-center justify-center shrink-0">
              <img
                src={SENA_LOGO_SVG}
                alt="Logo Oficial SENA"
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
            </div>
            <div>
              <div className="text-lg font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                SENA <span className="text-[#39A900]">Inducción Interactiva</span>
              </div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                Servicio Nacional de Aprendizaje · República de Colombia
              </div>
            </div>
          </div>

          {/* Quick Badges & Dark Mode Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenVideoManual}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#39A900] hover:bg-[#2e8800] text-white shadow-xs transition-all duration-200 cursor-pointer hover:scale-105"
            >
              <PlayCircle className="w-4 h-4" />
              <span>Ver Video Manual</span>
            </button>

            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-[#39A900] border border-emerald-200 dark:border-emerald-800">
              <Scale className="w-3.5 h-3.5" />
              <span>Reglamento Acuerdo 009 de 2024</span>
            </span>

            <button
              onClick={onToggleDarkMode}
              disabled={isThemeBlurring}
              title={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              aria-label={isDarkMode ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-all duration-200 cursor-pointer shadow-xs focus-visible:ring-2 focus-visible:ring-[#39A900]"
            >
              {isDarkMode ? (
                <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white border-b border-slate-800">
        <div className="absolute inset-0">
          <img
            src={SENA_CAMPUS_IMAGE}
            alt="Ambiente de formación profesional SENA con aprendices e instructores"
            className="w-full h-full object-cover opacity-25 filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#39A900]/20 text-emerald-300 border border-[#39A900]/40 backdrop-blur-xs">
            <Sparkles className="w-4 h-4 text-[#39A900]" />
            <span>Fase de Inducción Institucional · Cohorte 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Aprende, Conoce la Normativa y Certifícate en la{' '}
            <span className="text-[#39A900]">Familia SENA</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Plataforma institucional para el seguimiento y apropiación de los símbolos, valores, ecosistema digital y el{' '}
            <strong className="text-white font-semibold">nuevo Reglamento del Aprendiz (Acuerdo 009 de 2024)</strong>. Registra tus datos de interés para iniciar tu ruta mientras un instructor titular supervisa el progreso de la ficha.
          </p>

          <div className="pt-2 flex items-center justify-center gap-4">
            <button
              onClick={onOpenVideoManual}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl text-sm font-bold bg-[#39A900] hover:bg-[#2e8800] text-white shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer transform hover:-translate-y-0.5 border border-emerald-400/30"
            >
              <PlayCircle className="w-5 h-5 text-white animate-pulse" />
              <span>Ver Video Manual de la Plataforma</span>
            </button>
          </div>

          {/* Institutional Highlights Grid */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto text-left">
            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl backdrop-blur-xs">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <BookOpen className="w-4 h-4 text-[#39A900]" />
                <span>Módulos Interactivos</span>
              </div>
              <div className="text-lg font-bold text-white mt-1">5 Unidades</div>
              <div className="text-[11px] text-slate-400">Historia, símbolos y valores</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl backdrop-blur-xs">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Scale className="w-4 h-4 text-[#39A900]" />
                <span>Normativa 2024</span>
              </div>
              <div className="text-lg font-bold text-white mt-1">Acuerdo 009</div>
              <div className="text-[11px] text-slate-400">53 Arts. y 24 Derechos</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl backdrop-blur-xs">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Users className="w-4 h-4 text-[#39A900]" />
                <span>Gestión de Ficha</span>
              </div>
              <div className="text-lg font-bold text-white mt-1">{apprentices.length} Aprendices</div>
              <div className="text-[11px] text-slate-400">1 Instructor a cargo</div>
            </div>

            <div className="bg-slate-900/80 border border-slate-800 p-3.5 rounded-xl backdrop-blur-xs">
              <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                <Award className="w-4 h-4 text-[#39A900]" />
                <span>Certificación</span>
              </div>
              <div className="text-lg font-bold text-white mt-1">Acta Digital</div>
              <div className="text-[11px] text-slate-400">Con código QR verificable</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Role Selection Section ("Elige tu Perfil de Ingreso") */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 flex-1 w-full space-y-12">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold uppercase tracking-wider text-[#39A900]">
            Acceso Institucional por Roles
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Selecciona tu Perfil para Ingresar a la Plataforma
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Elige el rol de Aprendiz (llenando tus datos de interés para guardar tu perfil) o ingresa como el Instructor titular encargado de la revisión.
          </p>
        </div>

        {/* Dual Role Cards: Apprentices (Multiple) vs Instructor (Single in charge) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Card 1: APPRENTICE ROLE (Multiple Apprentices & Registration Flow) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-500/30 dark:border-emerald-500/40 p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-emerald-500/60 group">
            {/* Corner Decorative Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-full pointer-events-none" />

            <div className="space-y-6">
              {/* Header badge */}
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#39A900]/15 text-[#39A900] border border-[#39A900]/30">
                  <GraduationCap className="w-4 h-4" />
                  <span>Perfil Aprendiz · Registro y Datos de Interés</span>
                </div>
                <span className="text-xs text-slate-400 font-mono">
                  {apprentices.length} Registrados
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Soy Aprendiz SENA
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Completa tus datos de interés e identificación institucional para guardar tu perfil y avanzar en tu ruta de inducción, interactuar con el reglamento y certificar tus competencias.
                </p>
              </div>

              {/* Action buttons for Apprentice: Register New */}
              <div className="bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wide">
                      Paso 1: Identificación y Datos de Interés
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Regístrate como nuevo aprendiz o actualiza tus datos de interés institucional.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsRegisterModalOpen(true)}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white rounded-xl text-xs font-bold shadow-xs transition-colors cursor-pointer shrink-0"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span>Registrar Mis Datos de Interés</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: INSTRUCTOR ROLE (Single Designated Instructor) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700 group">
            {/* Decorative Top Banner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-slate-100 dark:bg-slate-800/40 rounded-bl-full pointer-events-none" />

            <div className="space-y-6">
              {/* Header badge */}
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700">
                  <BarChart3 className="w-4 h-4 text-[#39A900]" />
                  <span>Perfil Instructor · Único Encargado</span>
                </div>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Titular Asignado</span>
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Panel del Instructor
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                  Como único instructor encargado de la cohorte, supervisa en tiempo real los avances de los {apprentices.length} aprendices, evalúa resultados, gestiona alertas tempranas de deserción e inasistencias y avala las certificaciones oficiales.
                </p>
              </div>

            </div>

            {/* Primary Action Button */}
            <div className="pt-6">
              <button
                onClick={() => setIsInstructorLoginModalOpen(true)}
                className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group-hover:translate-x-0.5"
              >
                <span>Acceder al Tablero de Control del Instructor</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Section */}
        <div className="pt-8 space-y-6">
          <div className="text-center space-y-1">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Herramientas y Componentes de la Inducción SENA
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Apropiación integral de la identidad institucional y cumplimiento normativo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-[#39A900]/15 text-[#39A900] flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Identidad y Símbolos Heráldicos
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Explora el Escudo oficial con sus 4 sectores productivos interactivos, conoce la Bandera y entona el Himno solemne con reproductor y letra estrofa por estrofa.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Reglamento Acuerdo 009 de 2024
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Aprende los 24 derechos fundamentales, los deberes éticos en presencialidad y virtualidad, y resuelve casos del Tribunal Normativo con debido proceso.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Seguimiento & Certificación Oficial
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                El instructor avala el avance y el aprendiz genera de manera inmediata su Acta de Culminación con código de verificación institucional para guardar o imprimir en PDF.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Registration & Interest Data Modal for Apprentice */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-900 dark:text-white animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-[#39A900]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Registro de Datos de Interés del Aprendiz
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Guarda tu perfil para iniciar tu ruta de inducción SENA
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsRegisterModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleRegisterSubmit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300 flex items-center justify-between">
                  <span>Nombre Completo *</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej. María Fernanda Gómez Ruiz"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  💡 Pista: Escribe tus nombres y apellidos tal como figuran en tu documento de identidad.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Tipo de Documento
                  </label>
                  <select
                    value={formData.documentType}
                    onChange={e => setFormData({ ...formData, documentType: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  >
                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                    <option value="TI">Tarjeta de Identidad (TI)</option>
                    <option value="CE">Cédula de Extranjería (CE)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Número de Documento *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.documentNumber}
                    onChange={e => setFormData({ ...formData, documentNumber: e.target.value })}
                    placeholder="Ej. 1092837482"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    💡 Pista: Ingresa tu número sin puntos.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Correo Electrónico Institucional (@soysena.edu.co)
                  </label>
                  <input
                    type="email"
                    value={formData.soysenaEmail}
                    onChange={e => setFormData({ ...formData, soysenaEmail: e.target.value })}
                    placeholder="usuario@soysena.edu.co"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    💡 Pista: Tu correo corporativo asignado por el SENA.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Correo Electrónico Personal (Opcional)
                  </label>
                  <input
                    type="email"
                    value={formData.personalEmail}
                    onChange={e => setFormData({ ...formData, personalEmail: e.target.value })}
                    placeholder="tucorreo@gmail.com / hotmail.com"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    💡 Pista: Cuenta alternativa de Gmail o Outlook si aún no tienes institucional.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Teléfono / Celular
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ej. 310 492 0192"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    💡 Pista: Número de contacto móvil o WhatsApp.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Ficha de Caracterización
                  </label>
                  <input
                    type="text"
                    value={formData.fichaCode}
                    onChange={e => setFormData({ ...formData, fichaCode: e.target.value })}
                    placeholder="Ej. 2824910"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    💡 Pista: Código de 7 dígitos en SofiaPlus.
                  </p>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Programa de Formación
                  </label>
                  <input
                    type="text"
                    value={formData.programName}
                    onChange={e => setFormData({ ...formData, programName: e.target.value })}
                    placeholder="Ej. Análisis y Desarrollo de Software"
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                  />
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    💡 Pista: Nombre de tu tecnólogo o técnico.
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Centro de Formación y Regional
                </label>
                <input
                  type="text"
                  value={formData.trainingCenter}
                  onChange={e => setFormData({ ...formData, trainingCenter: e.target.value })}
                  placeholder="Ej. Centro de Tecnologías del Transporte - Regional Distrito Capital"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  💡 Pista: Sede y regional a la que perteneces.
                </p>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsRegisterModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white rounded-xl font-bold shadow-md transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Guardar Perfil y Continuar al Prototipo</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Instructor Login Modal with Generic Credentials */}
      {isInstructorLoginModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col text-slate-900 dark:text-white animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-6 h-6 text-[#39A900]" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Acceso de Instructor Titular
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Ingresa con usuario y contraseña genéricos institucionales
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsInstructorLoginModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleInstructorLoginSubmit} className="p-6 space-y-4 text-xs">
              {instructorLoginError && (
                <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-xl text-xs font-medium">
                  {instructorLoginError}
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Usuario o Correo Institucional *
                </label>
                <input
                  type="text"
                  required
                  value={instructorUser}
                  onChange={e => setInstructorUser(e.target.value)}
                  placeholder="Ej. instructor o jmendozap@sena.edu.co"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  💡 Pista: Usuario genérico: <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[#39A900]">instructor</code>
                </p>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 dark:text-slate-300">
                  Contraseña Genérica *
                </label>
                <input
                  type="password"
                  required
                  value={instructorPass}
                  onChange={e => setInstructorPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
                <p className="text-[10px] text-slate-400 dark:text-slate-500">
                  💡 Pista: Contraseña genérica: <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded text-[#39A900]">sena2026</code>
                </p>
              </div>

              {/* Quick Fill Button for Testing Convenience */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setInstructorUser('instructor');
                    setInstructorPass('sena2026');
                    setInstructorLoginError('');
                  }}
                  className="w-full py-1.5 px-3 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-[#39A900] border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>🔑 Rellenar con Credenciales Genéricas</span>
                </button>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsInstructorLoginModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 bg-slate-900 dark:bg-white dark:text-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold shadow-md transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Ingresar al Tablero</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Institutional Landing Footer */}
      <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-8 transition-colors duration-200">
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
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Servicio Nacional de Aprendizaje (SENA)
              </span>
              <span> · Dirección de Formación Profesional Integral</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
              SofiaPlus
            </span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
              Zajuna LMS
            </span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
              Acuerdo 009 de 2024
            </span>
          </div>

          <div className="text-slate-400 dark:text-slate-500">
            República de Colombia · {new Date().getFullYear()}
          </div>
        </div>
      </footer>
    </div>
  );
};
