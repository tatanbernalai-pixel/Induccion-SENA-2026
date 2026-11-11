import React from 'react';
import { Printer, Download, Award, ShieldCheck, QrCode, CheckCircle2, ArrowLeft } from 'lucide-react';
import { SENA_CREST_IMAGE, SENA_CREST_FALLBACK, SENA_LOGO_SVG } from '../data/inductionData';

interface CertificateViewProps {
  apprenticeName: string;
  documentNumber: string;
  documentType: string;
  fichaCode: string;
  programName: string;
  regional: string;
  trainingCenter: string;
  completionDate: string;
  verificationCode: string;
  onBack: () => void;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  apprenticeName,
  documentNumber,
  documentType,
  fichaCode,
  programName,
  regional,
  trainingCenter,
  completionDate,
  verificationCode,
  onBack
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Action Toolbar (hidden during print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Portal de Aprendiz</span>
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Inducción Institucional Aprobada</span>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-[#39A900] hover:bg-[#2e8800] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Imprimir / Guardar en PDF</span>
          </button>
        </div>
      </div>

      {/* Official Certificate Canvas */}
      <div className="bg-white border-8 border-double border-emerald-900/40 rounded-2xl p-8 sm:p-14 shadow-xl max-w-4xl mx-auto relative overflow-hidden print:border-4 print:shadow-none print:p-8">
        {/* Subtle background seal */}
        <div className="absolute right-6 bottom-6 opacity-10 pointer-events-none w-96 h-96">
          <img
            src={SENA_CREST_IMAGE}
            alt="Watermark Escudo SENA"
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.src = SENA_CREST_FALLBACK;
            }}
          />
        </div>

        {/* Certificate Header */}
        <div className="text-center space-y-3 relative z-10">
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="w-16 h-16 flex items-center justify-center shrink-0">
              <img
                src={SENA_LOGO_SVG}
                alt="Logo SENA"
                className="w-full h-full object-contain filter drop-shadow-xs"
              />
            </div>
            <div className="text-left">
              <div className="text-xl font-black text-slate-900 tracking-tight leading-none">
                SENA
              </div>
              <div className="text-[11px] font-semibold tracking-wider text-[#39A900] uppercase mt-0.5">
                Servicio Nacional de Aprendizaje
              </div>
              <div className="text-[10px] text-slate-500 font-medium">
                Ministerio del Trabajo · República de Colombia
              </div>
            </div>
          </div>

          <div className="pt-2">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-800">
              Certificación Oficial de Competencias Ciudadanas e Institucionales
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-serif">
              ACTA DE CULMINACIÓN DEL PROCESO DE INDUCCIÓN
            </h2>
          </div>
        </div>

        {/* Body Text */}
        <div className="my-8 text-center space-y-5 relative z-10 text-slate-700">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
            La Dirección de Formación Profesional Integral hace constar que:
          </p>

          <div className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-wide font-serif py-1 border-b-2 border-emerald-600/30 max-w-lg mx-auto">
            {apprenticeName}
          </div>

          <p className="text-xs text-slate-600">
            Identificado(a) con documento <span className="font-semibold text-slate-900">{documentType} No. {documentNumber}</span>
          </p>

          <p className="text-sm max-w-2xl mx-auto leading-relaxed text-slate-800">
            Ha participado activamente y aprobado satisfactoriamente todos los componentes de la
            <span className="font-semibold text-emerald-900"> Fase de Inducción Institucional</span>, demostrando
            la apropiación de la <span className="font-semibold">Identidad, Símbolos y Valores del SENA</span>,
            el dominio del <span className="font-semibold">Reglamento del Aprendiz (Acuerdo 009 de 2024)</span>,
            el manejo del ecosistema digital <span className="font-semibold">(SofiaPlus, Zajuna LMS, Correo @misena)</span> y
            la vinculación a los servicios de <span className="font-semibold">Bienestar al Aprendiz</span>.
          </p>

          {/* Program & Center Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left">
            <div>
              <span className="text-slate-500 block">Programa de Formación:</span>
              <span className="font-bold text-slate-900">{programName}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Ficha de Caracterización:</span>
              <span className="font-bold text-[#39A900] tabular-nums font-mono">{fichaCode}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Centro de Formación:</span>
              <span className="font-semibold text-slate-800">{trainingCenter}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Regional:</span>
              <span className="font-semibold text-slate-800">{regional}</span>
            </div>
          </div>
        </div>

        {/* Signatures & Verification footer */}
        <div className="pt-8 border-t border-slate-200 relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-center">
          {/* Subdirector signature */}
          <div className="space-y-2">
            <div className="font-serif italic text-base text-slate-800 border-b border-slate-400 pb-1 max-w-[180px] mx-auto">
              Dr. Álvaro Martínez
            </div>
            <div className="text-[11px] font-bold text-slate-900">Subdirector de Centro</div>
            <div className="text-[10px] text-slate-500">Centro de Formación Profesional SENA</div>
          </div>

          {/* QR & Verification code */}
          <div className="flex flex-col items-center justify-center space-y-1">
            <div className="w-14 h-14 bg-slate-100 border border-slate-300 rounded-lg p-1.5 flex items-center justify-center">
              <QrCode className="w-full h-full text-slate-800" />
            </div>
            <span className="text-[9px] text-slate-400 font-mono">Código Verificación:</span>
            <span className="text-[10px] font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              {verificationCode}
            </span>
            <span className="text-[9px] text-slate-500">Fecha: {completionDate}</span>
          </div>

          {/* Coordinator signature */}
          <div className="space-y-2">
            <div className="font-serif italic text-base text-slate-800 border-b border-slate-400 pb-1 max-w-[180px] mx-auto">
              Ing. Javier Mendoza
            </div>
            <div className="text-[11px] font-bold text-slate-900">Coordinador Académico</div>
            <div className="text-[10px] text-slate-500">Líder del Proceso de Inducción</div>
          </div>
        </div>
      </div>
    </div>
  );
};
