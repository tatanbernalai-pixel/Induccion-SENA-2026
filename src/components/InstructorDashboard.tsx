import React, { useState } from 'react';
import { ApprenticeUser, CohortGroup } from '../types/induction';
import { MOCK_COHORTS } from '../data/mockCohorts';
import {
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Filter,
  Download,
  Mail,
  UserPlus,
  Eye,
  FileSpreadsheet,
  Award,
  BookOpen,
  ArrowUpDown,
  Send,
  X
} from 'lucide-react';

interface InstructorDashboardProps {
  apprentices: ApprenticeUser[];
  onUpdateApprentice: (apprentice: ApprenticeUser) => void;
  onAddApprentice: (apprentice: ApprenticeUser) => void;
}

export const InstructorDashboard: React.FC<InstructorDashboardProps> = ({
  apprentices,
  onUpdateApprentice,
  onAddApprentice
}) => {
  const [selectedFicha, setSelectedFicha] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApprentice, setSelectedApprentice] = useState<ApprenticeUser | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notificationSentMessage, setNotificationSentMessage] = useState<string | null>(null);

  // New apprentice form state
  const [newAppName, setNewAppName] = useState('');
  const [newAppDoc, setNewAppDoc] = useState('');
  const [newAppEmail, setNewAppEmail] = useState('');
  const [newAppFicha, setNewAppFicha] = useState('2824910');

  // Filtered apprentices
  const filteredApprentices = apprentices.filter(app => {
    const matchesFicha = selectedFicha === 'all' || app.fichaCode === selectedFicha;
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.documentNumber.includes(searchQuery) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFicha && matchesStatus && matchesSearch;
  });

  // Cohort KPI computations
  const currentCohortApprentices = selectedFicha === 'all'
    ? apprentices
    : apprentices.filter(a => a.fichaCode === selectedFicha);

  const totalCount = currentCohortApprentices.length;
  const completedCount = currentCohortApprentices.filter(a => a.status === 'Completado').length;
  const inProgressCount = currentCohortApprentices.filter(a => a.status === 'En Progreso').length;
  const atRiskCount = currentCohortApprentices.filter(a => a.status === 'En Riesgo').length;
  const notStartedCount = currentCohortApprentices.filter(a => a.status === 'Sin Iniciar').length;

  const averageProgress = totalCount > 0
    ? Math.round(currentCohortApprentices.reduce((acc, curr) => acc + curr.overallProgress, 0) / totalCount)
    : 0;

  const averageScore = totalCount > 0
    ? Math.round(currentCohortApprentices.reduce((acc, curr) => acc + curr.averageScore, 0) / totalCount)
    : 0;

  const handleExportCSV = () => {
    const headers = 'ID,Nombre,Documento,Email,Ficha,Programa,Estado,Progreso_%,Modulos_Completados,Puntaje_Promedio,Ultimo_Acceso\n';
    const rows = filteredApprentices
      .map(
        a =>
          `"${a.id}","${a.name}","${a.documentType} ${a.documentNumber}","${a.email}","${a.fichaCode}","${a.programName}","${a.status}","${a.overallProgress}%","${a.completedModulesCount}/5","${a.averageScore}","${a.lastAccess}"`
      )
      .join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `SENA_Seguimiento_Induccion_${selectedFicha}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendReminder = (apprentice: ApprenticeUser) => {
    setNotificationSentMessage(`Se ha enviado notificación formal de avance a ${apprentice.name} (${apprentice.email}) con copia a su ficha.`);
    setTimeout(() => {
      setNotificationSentMessage(null);
    }, 4500);
  };

  const handleManualCertify = (apprentice: ApprenticeUser) => {
    const updated: ApprenticeUser = {
      ...apprentice,
      status: 'Completado',
      overallProgress: 100,
      completedModulesCount: 5,
      averageScore: Math.max(apprentice.averageScore, 90),
      notes: 'Inducción validada y certificada por el instructor de inducción.'
    };
    onUpdateApprentice(updated);
    setSelectedApprentice(updated);
  };

  const handleCreateApprentice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppName.trim() || !newAppDoc.trim()) return;

    const matchingFicha = MOCK_COHORTS.find(c => c.fichaCode === newAppFicha);

    const newApp: ApprenticeUser = {
      id: `app-${Date.now().toString().slice(-4)}`,
      name: newAppName.trim(),
      documentNumber: newAppDoc.trim(),
      documentType: 'CC',
      email: newAppEmail.trim() || `${newAppName.toLowerCase().replace(/\s+/g, '')}@misena.edu.co`,
      phone: '300 000 0000',
      fichaCode: newAppFicha,
      programName: matchingFicha?.programName || 'Tecnólogo SENA',
      regional: matchingFicha?.regional || 'Regional Distrito Capital',
      trainingCenter: matchingFicha?.trainingCenter || 'Centro de Formación SENA',
      status: 'Sin Iniciar',
      overallProgress: 0,
      completedModulesCount: 0,
      averageScore: 0,
      lastAccess: 'Recién registrado',
      notes: 'Registrado manualmente en plataforma de inducción.'
    };

    onAddApprentice(newApp);
    setNewAppName('');
    setNewAppDoc('');
    setNewAppEmail('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-8">
      {/* Toast alert */}
      {notificationSentMessage && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-xl text-xs flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notificationSentMessage}</span>
          </div>
          <button
            onClick={() => setNotificationSentMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      {/* Top Banner and Cohort Selector */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6 transition-colors duration-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#39A900] mb-1">
            <span>Coordinación de Formación Profesional</span>
            <span className="text-slate-400 dark:text-slate-500">·</span>
            <span>Seguimiento de Inducción</span>
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Tablero de Control del Instructor
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Monitorea en tiempo real el progreso de los aprendices en la apropiación de la identidad institucional y la normativa del Reglamento del Aprendiz (Acuerdo 009 de 2024).
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4 text-slate-500 dark:text-slate-400" />
            <span>Registrar Aprendiz</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#2e8800] rounded-lg shadow-xs transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Exportar Informe CSV</span>
          </button>
        </div>
      </div>

      {/* Ficha Selector Strip */}
      <div className="bg-slate-100 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 p-1.5 rounded-xl flex items-center gap-1 overflow-x-auto">
        <button
          onClick={() => setSelectedFicha('all')}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
            selectedFicha === 'all'
              ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Todas las Fichas ({apprentices.length})
        </button>

        {MOCK_COHORTS.map(c => (
          <button
            key={c.fichaCode}
            onClick={() => setSelectedFicha(c.fichaCode)}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
              selectedFicha === c.fichaCode
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span className="font-mono text-[#39A900]">{c.fichaCode}</span>
            <span>· {c.programName.split('(')[0].replace('Tecnólogo en ', '')}</span>
          </button>
        ))}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Aprendices en Cohorte</span>
            <Users className="w-4 h-4 text-slate-400 dark:text-slate-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {totalCount}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-2">
            <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{completedCount} completados</span>
            <span>·</span>
            <span>{inProgressCount} en curso</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Avance Promedio Global</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {averageProgress}%
          </div>
          <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden mt-2">
            <div
              className="h-full bg-[#39A900] rounded-full transition-all duration-300"
              style={{ width: `${averageProgress}%` }}
            />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Promedio en Quizzes</span>
            <Award className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums">
            {averageScore} / 100
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Exigencia mínima de aprobación: 80%
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-xs font-medium">Alertas de Rezago / Riesgo</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 tabular-nums">
            {atRiskCount + notStartedCount}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            {atRiskCount} con bajo puntaje · {notStartedCount} sin iniciar
          </div>
        </div>
      </div>

      {/* Cohort Search & Filter Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden transition-colors">
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar aprendiz por nombre, cédula o correo..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium shrink-0">Filtrar estado:</span>
            {['all', 'Completado', 'En Progreso', 'En Riesgo', 'Sin Iniciar'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer shrink-0 ${
                  statusFilter === st
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {st === 'all' ? 'Todos' : st}
              </button>
            ))}
          </div>
        </div>

        {/* Apprentices Data Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/60 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Ficha</th>
                <th className="py-3 px-4">Estado</th>
                <th className="py-3 px-4">Avance Inducción</th>
                <th className="py-3 px-4">Módulos</th>
                <th className="py-3 px-4">Nota Promedio</th>
                <th className="py-3 px-4">Último Acceso</th>
                <th className="py-3 px-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredApprentices.map(app => {
                let badgeClass = 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800';
                if (app.status === 'Completado') badgeClass = 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800';
                if (app.status === 'En Progreso') badgeClass = 'text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800';
                if (app.status === 'En Riesgo') badgeClass = 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800';
                if (app.status === 'Sin Iniciar') badgeClass = 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800';

                return (
                  <tr key={app.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                    {/* Apprentice Name & Doc */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900 dark:text-white">{app.name}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                        {app.documentType} {app.documentNumber} · {app.email}
                      </div>
                    </td>

                    {/* Ficha */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                        {app.fichaCode}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${badgeClass}`}>
                        {app.status}
                      </span>
                    </td>

                    {/* Overall Progress */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 dark:text-slate-200 tabular-nums w-8">
                          {app.overallProgress}%
                        </span>
                        <div className="w-20 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              app.overallProgress === 100
                                ? 'bg-[#39A900]'
                                : app.status === 'En Riesgo'
                                ? 'bg-amber-500'
                                : 'bg-blue-600'
                            }`}
                            style={{ width: `${app.overallProgress}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Modules Completed */}
                    <td className="py-3 px-4 font-mono font-medium text-slate-700 dark:text-slate-300">
                      {app.completedModulesCount}/5
                    </td>

                    {/* Average Score */}
                    <td className="py-3 px-4">
                      <span className={`font-bold tabular-nums ${
                        app.averageScore >= 80 ? 'text-[#39A900]' : app.averageScore > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400 dark:text-slate-500'
                      }`}>
                        {app.averageScore > 0 ? `${app.averageScore} pts` : '—'}
                      </span>
                    </td>

                    {/* Last Access */}
                    <td className="py-3 px-4 text-slate-500 dark:text-slate-400 text-[11px]">
                      {app.lastAccess}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedApprentice(app)}
                          title="Ver Ficha Detallada"
                          className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleSendReminder(app)}
                          title="Enviar Notificación de Avance"
                          className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-[#39A900] dark:hover:text-[#39A900] hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors cursor-pointer"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filteredApprentices.length === 0 && (
            <div className="text-center py-12 text-slate-400 dark:text-slate-500 text-xs">
              No se encontraron aprendices que coincidan con los filtros aplicados.
            </div>
          )}
        </div>
      </div>

      {/* Apprentice Details Modal */}
      {selectedApprentice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-slate-900 dark:text-white">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <div className="text-xs font-semibold text-[#39A900] uppercase tracking-wider">
                  Ficha Individual de Seguimiento
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedApprentice.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApprentice(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 block">Documento:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedApprentice.documentType} {selectedApprentice.documentNumber}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Ficha:</span>
                  <span className="font-bold text-[#39A900] font-mono">
                    {selectedApprentice.fichaCode}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Correo Institucional:</span>
                  <span className="font-semibold text-slate-800 break-all">
                    {selectedApprentice.email}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Teléfono de Contacto:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedApprentice.phone}
                  </span>
                </div>
              </div>

              {/* Progress Summary */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-700">Progreso en Inducción:</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {selectedApprentice.overallProgress}% ({selectedApprentice.completedModulesCount}/5 módulos)
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#39A900] rounded-full"
                    style={{ width: `${selectedApprentice.overallProgress}%` }}
                  />
                </div>
              </div>

              {/* Modules breakdown */}
              <div className="border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
                <div className="p-2.5 bg-slate-50 font-bold text-slate-700">
                  Desglose de Módulos Institucionales
                </div>
                <div className="p-2.5 flex items-center justify-between">
                  <span>Módulo 1: Identidad, Historia y Valores</span>
                  <span className="font-bold text-emerald-700">Aprobado (95 pts)</span>
                </div>
                <div className="p-2.5 flex items-center justify-between">
                  <span>Módulo 2: Símbolos Institucionales e Himno</span>
                  <span className="font-bold text-emerald-700">Aprobado (90 pts)</span>
                </div>
                <div className="p-2.5 flex items-center justify-between">
                  <span>Módulo 3: Normativa y Reglamento (Acuerdo 009)</span>
                  <span className={`font-bold ${
                    selectedApprentice.completedModulesCount >= 3 ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    {selectedApprentice.completedModulesCount >= 3 ? 'Aprobado (90 pts)' : 'Pendiente'}
                  </span>
                </div>
                <div className="p-2.5 flex items-center justify-between">
                  <span>Módulo 4: Ecosistema Digital (SofiaPlus, Zajuna)</span>
                  <span className={`font-bold ${
                    selectedApprentice.completedModulesCount >= 4 ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    {selectedApprentice.completedModulesCount >= 4 ? 'Aprobado (85 pts)' : 'Pendiente'}
                  </span>
                </div>
                <div className="p-2.5 flex items-center justify-between">
                  <span>Módulo 5: Bienestar al Aprendiz y Etapa Productiva</span>
                  <span className={`font-bold ${
                    selectedApprentice.completedModulesCount >= 5 ? 'text-emerald-700' : 'text-slate-400'
                  }`}>
                    {selectedApprentice.completedModulesCount >= 5 ? 'Aprobado (100 pts)' : 'Pendiente'}
                  </span>
                </div>
              </div>

              {/* Observaciones */}
              {selectedApprentice.notes && (
                <div className="p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl text-amber-900">
                  <span className="font-bold block mb-0.5">Observación del Coordinador:</span>
                  {selectedApprentice.notes}
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between gap-3">
              <button
                onClick={() => handleSendReminder(selectedApprentice)}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Notificar por Correo</span>
              </button>

              {selectedApprentice.status !== 'Completado' ? (
                <button
                  onClick={() => handleManualCertify(selectedApprentice)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#39A900] hover:bg-[#2e8800] rounded-lg shadow-xs transition-colors cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Validar y Certificar Inducción</span>
                </button>
              ) : (
                <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" />
                  Inducción Certificada
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add Apprentice Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h3 className="text-base font-bold text-slate-900">
                Registrar Nuevo Aprendiz a la Cohorte
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateApprentice} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Nombre Completo del Aprendiz *
                </label>
                <input
                  type="text"
                  required
                  value={newAppName}
                  onChange={e => setNewAppName(e.target.value)}
                  placeholder="Ej: Juliana Marcela Gómez Ruiz"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Número de Documento (C.C. o T.I.) *
                </label>
                <input
                  type="text"
                  required
                  value={newAppDoc}
                  onChange={e => setNewAppDoc(e.target.value)}
                  placeholder="Ej: 1029485721"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Correo Institucional (@misena.edu.co)
                </label>
                <input
                  type="email"
                  value={newAppEmail}
                  onChange={e => setNewAppEmail(e.target.value)}
                  placeholder="opcional, se autogenera si se omite"
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900]"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Ficha de Formación Asignada *
                </label>
                <select
                  value={newAppFicha}
                  onChange={e => setNewAppFicha(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-white"
                >
                  {MOCK_COHORTS.map(c => (
                    <option key={c.fichaCode} value={c.fichaCode}>
                      {c.fichaCode} - {c.programName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Inscribir a Inducción
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
