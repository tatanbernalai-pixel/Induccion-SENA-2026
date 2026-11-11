import React, { useRef, useEffect } from 'react';
import { X, PlayCircle, Film, Sparkles, CheckCircle2 } from 'lucide-react';

interface VideoManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoManualModal: React.FC<VideoManualModalProps> = ({
  isOpen,
  onClose
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        // Autoplay may be blocked by browser policy until user interaction
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] text-slate-900 dark:text-white">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#39A900]/15 text-[#39A900] flex items-center justify-center font-bold shrink-0">
              <Film className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                  Video Manual de la Plataforma SENA
                </h3>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-[#39A900] border border-emerald-300 dark:border-emerald-800">
                  <Sparkles className="w-3 h-3" />
                  <span>Tutorial Oficial</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Guía en video sobre el uso de la Plataforma Interactiva y el Reglamento del Aprendiz (Acuerdo 009 de 2024)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            title="Cerrar Video Manual"
            aria-label="Cerrar Video Manual"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Container */}
        <div className="p-4 sm:p-6 bg-slate-950 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-black relative group">
            <video
              ref={videoRef}
              src="/assets/aistudio/2026__17_30_b07f3e8c.mp4"
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain"
            >
              Tu navegador no soporta la reproducción de video HTML5.
            </video>
          </div>
        </div>

        {/* Key Points Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-800 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-slate-900 dark:text-white">Perfil Aprendiz vs Instructor</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Registro intuitivo con pistas didácticas y monitoreo en tiempo real por el instructor.</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-slate-900 dark:text-white">Ruta Formativa de 5 Módulos</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Identidad, Símbolos Heráldicos, Reglamento 2024, Ecosistema Digital y Bienestar.</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#39A900] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold block text-slate-900 dark:text-white">Certificación con Código QR</span>
                <span className="text-slate-500 dark:text-slate-400 text-[11px]">Acta Digital verificable e imprimible al alcanzar el 80% de aprobación.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
