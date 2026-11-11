import React, { useState } from 'react';
import { X, Search, BookOpen, AlertCircle, Scale, Shield, Check } from 'lucide-react';

interface NormativeHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FREQUENT_NORMATIVE_TOPICS = [
  {
    question: '¿Qué ocurre si falto tres (3) días consecutivos o cinco (5) discontinuos sin justificar?',
    answer: 'El Acuerdo 009 de 2024 tipifica con rigor la Deserción. Si el aprendiz acumula 3 días hábiles continuos o 5 días hábiles discontinuos de inasistencia injustificada durante el período formativo, la coordinación enviará una comunicación formal de requerimiento al correo institucional @misena o domicilio, otorgándole un plazo de cinco (5) días hábiles para presentar descargos e incuestionables soportes médicos o de fuerza mayor. Si no responde o la justificación no es válida, se emitirá la resolución de cancelación de matrícula.',
    article: 'Acuerdo 009 de 2024 - Cap. IV (Deserción)'
  },
  {
    question: '¿Cuál es el plazo máximo para radicar una justificación formal de inasistencia?',
    answer: 'El aprendiz debe presentar la justificación médica expedida por EPS/IPS o soporte de calamidad doméstica verificable dentro de los tres (3) días hábiles siguientes a la ocurrencia del hecho o a su reintegro presencial/virtual.',
    article: 'Acuerdo 009 de 2024 - Cap. III y IV'
  },
  {
    question: '¿Cómo se regula el uso de Inteligencia Artificial (IA) en la formación SENA (Normativa 2026)?',
    answer: 'El reglamento y sus circulares de 2026 garantizan el derecho a usar la IA como herramienta de apoyo pedagógico, investigación e innovación. Sin embargo, se prohíbe la delegación total de evidencias, la copia no citada, la suplantación de identidad mediante voz/video y el fraude académico. Todo uso de IA debe declararse con transparencia, citación de prompts/fuentes y desarrollo de criterio formativo propio.',
    article: 'Acuerdo 009 de 2024 - Cap. II (Derecho 18) y Cap. III (Prohibición 16)'
  },
  {
    question: '¿Qué es el Plan de Mejoramiento Pedagógico Restaurativo y cuánto tiempo dura?',
    answer: 'Es una medida formativa pedagógica y restaurativa concertada entre el instructor y el aprendiz para superar fallas académicas o de convivencia. Prioriza el aprendizaje y la mediación sobre la sanción punitiva, fijando actividades específicas con un plazo perentorio de hasta treinta (30) días calendario.',
    article: 'Acuerdo 009 de 2024 - Cap. V (Medidas Formativas)'
  },
  {
    question: '¿Quién decide una sanción de condicionamiento o cancelación de matrícula?',
    answer: 'Únicamente el Subdirector del Centro de Formación tiene la potestad legal de emitir la resolución sancionatoria de Condicionamiento o Cancelación de Matrícula, previa recomendación y concepto motivado del Comité de Evaluación y Seguimiento tras agotar el debido proceso.',
    article: 'Acuerdo 009 de 2024 - Cap. V (Competencia Sancionatoria)'
  },
  {
    question: '¿Qué recursos legales proceden contra una resolución sancionatoria del Subdirector?',
    answer: 'Contra la resolución sancionatoria del Subdirector procede el Recurso de Reposición, el cual debe interponerse por escrito o a través del correo institucional dentro de los cinco (5) días hábiles siguientes a la notificación formal del acto administrativo.',
    article: 'Acuerdo 009 de 2024 - Cap. V (Debido Proceso)'
  },
  {
    question: '¿Cómo funcionan los traslados y aplazamientos (Política Antitrámites Electrónicos)?',
    answer: 'Se agiliza la gestión de novedades mediante trámites 100% electrónicos en SofiaPlus y Zajuna. El aplazamiento del programa de formación puede solicitarse por escrito hasta por seis (6) meses (prorrogables por causas de fuerza mayor o maternidad/paternidad), reservando el cupo para el reingreso.',
    article: 'Acuerdo 009 de 2024 - Cap. IV (Novedades Académicas)'
  },
  {
    question: '¿Cuáles son los derechos de Inclusión Social, Enfoque de Género y Campesinado (Vigencia 2026)?',
    answer: 'El Capítulo I y II consagran la protección integral contra todo acto de discriminación por género, etnia, orientación sexual o discapacidad. Asimismo, se reconoce al Campesinado Colombiano como sujeto de especial protección en el acceso a la formación profesional, apoyos de sostenimiento y modalidades adaptadas a la ruralidad.',
    article: 'Acuerdo 009 de 2024 - Cap. I y II (Principios y Derechos)'
  },
  {
    question: '¿Existe el Derecho a la Desconexión Digital fuera de la jornada de formación?',
    answer: 'Sí. Las directivas de 2026 ratifican que los aprendices tienen derecho a la desconexión digital fuera de sus horarios de formación y jornadas sincrónicas concertadas, protegiendo su tiempo de descanso, salud mental y vida familiar.',
    article: 'Acuerdo 009 de 2024 - Cap. II (Derechos del Aprendiz)'
  },
  {
    question: '¿Cuáles son las normas de Netiqueta y Convivencia en Zajuna LMS?',
    answer: 'Los deberes aplican con igual rigor en la virtualidad: mantener trato respetuoso en foros y chats, no incurrir en ciberacoso (bullying), no compartir enlaces maliciosos o contenido explícito, y salvaguardar las credenciales personales sin prestar la cuenta a terceros.',
    article: 'Acuerdo 009 de 2024 - Cap. III (Convivencia Digital)'
  }
];

export const NormativeHelpModal: React.FC<NormativeHelpModalProps> = ({
  isOpen,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(FREQUENT_NORMATIVE_TOPICS[0]);

  if (!isOpen) return null;

  const filteredTopics = FREQUENT_NORMATIVE_TOPICS.filter(
    t =>
      t.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.article.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[88vh] text-slate-900 dark:text-white transition-colors duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-800 dark:text-emerald-400">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Consultorio Normativo del Aprendiz SENA
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Reglamento del Aprendiz · Acuerdo 009 de 2024 (Vigente)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Buscar por palabra clave: inasistencias, plagio, comité, carné, sanciones..."
              className="w-full pl-9 pr-4 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#39A900] bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Body content with split view */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800">
          {/* Left: Questions list */}
          <div className="md:col-span-5 p-4 space-y-2 overflow-y-auto max-h-[420px]">
            <div className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
              Preguntas Frecuentes ({filteredTopics.length})
            </div>

            {filteredTopics.map((item, idx) => {
              const isSelected = selectedTopic.question === item.question;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedTopic(item)}
                  className={`w-full text-left p-3 rounded-xl text-xs transition-colors cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-950 dark:text-emerald-200 font-semibold'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="line-clamp-2">{item.question}</div>
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-1">
                    {item.article}
                  </div>
                </button>
              );
            })}

            {filteredTopics.length === 0 && (
              <div className="text-center py-8 text-xs text-slate-400 dark:text-slate-500">
                No se encontraron artículos con ese criterio de búsqueda.
              </div>
            )}
          </div>

          {/* Right: Detailed legal resolution */}
          <div className="md:col-span-7 p-6 space-y-4 bg-slate-50/50 dark:bg-slate-950/40">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#39A900] uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>{selectedTopic.article}</span>
            </div>

            <h4 className="text-base font-bold text-slate-900 dark:text-white leading-snug">
              {selectedTopic.question}
            </h4>

            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-3">
              <p>{selectedTopic.answer}</p>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 flex items-start gap-2">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Garantía del Debido Proceso: </span>
                Recuerda que en el SENA todo aprendiz tiene derecho a ser escuchado en descargos y a presentar pruebas antes de que se tome cualquier medida.
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Servicio Nacional de Aprendizaje · República de Colombia</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 font-medium cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
