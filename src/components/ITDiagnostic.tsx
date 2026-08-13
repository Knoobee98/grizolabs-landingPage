import React, { useState } from 'react';
import { DIAGNOSTIC_QUESTIONS } from '../data/mockData';
import { postLead } from '../services/leads';
import { 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw, 
  HeartHandshake
} from 'lucide-react';

interface ITDiagnosticProps {
  onOpenConsultationModal: (diagnosticScore?: any) => void;
}

export const ITDiagnostic: React.FC<ITDiagnosticProps> = ({ onOpenConsultationModal }) => {
  const [answers, setAnswers] = useState<Record<number, number>>({
    1: 25, // Default pre-selected for quick preview
    2: 15,
    3: 45,
    4: 30,
    5: 20,
    6: 10,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (questionId: number, points: number) => {
    setAnswers({ ...answers, [questionId]: points });
  };

  const totalPoints = (Object.values(answers) as number[]).reduce((sum: number, val: number) => sum + val, 0);
  const maxPoints = DIAGNOSTIC_QUESTIONS.length * 100;
  const percentageScore = Math.round((totalPoints / maxPoints) * 100);

  const getMaturityStage = (score: number) => {
    if (score < 35) {
      return {
        stage: 'Tahap 1: Sangat Manual & Rentan Error',
        badge: 'BUTUH BENAHLI',
        color: 'text-red-700 bg-red-50 border-red-200',
        description: 'Pencatatan usaha masih sangat bergantung pada buku kertas atau file Excel biasa. Resiko data hilang, salah hitung kembalian, dan stok sering selisih sangat tinggi.',
        priorityAction: 'Sangat disarankan memakai Aplikasi Kasir POS & Migrasi Data dari Excel ke Cloud.',
      };
    } else if (score < 65) {
      return {
        stage: 'Tahap 2: Semi-Digital (UMKM Berkembang)',
        badge: 'CUKUP BAIK',
        color: 'text-amber-800 bg-amber-50 border-amber-200',
        description: 'Sudah menggunakan beberapa aplikasi, namun sistem antara kasir, pesanan WhatsApp, dan catatan stok di gudang masih terpisah-pisah.',
        priorityAction: 'Hubungkan Otomatisasi Katalog WA Store & Pembayaran Dynamic QRIS.',
      };
    } else if (score < 85) {
      return {
        stage: 'Tahap 3: Terintegrasi & Efisien',
        badge: 'SANGAT SEHAT',
        color: 'text-blue-800 bg-blue-50 border-blue-200',
        description: 'Sistem operasional sudah rapi. Stok terpotong otomatis saat ada penjualan, laporan keuangan dapat diakses dari HP.',
        priorityAction: 'Gunakan Dashboard Laporan Laba Bersih & Sistem Kasir Offline-First Multi-Cabang.',
      };
    } else {
      return {
        stage: 'Tahap 4: Sistem Otomatis Kelas Industri',
        badge: 'SIAP FRANCHISE',
        color: 'text-emerald-800 bg-emerald-50 border-emerald-200',
        description: 'Sistem usaha Anda sudah sepenuhnya otomatis, memiliki proteksi data yang kuat, dan siap untuk ekspansi banyak cabang!',
        priorityAction: 'Otomatisasi Pembelian Bahan Baku Otomatis & Analisis Prediksi Penjualan AI.',
      };
    }
  };

  const maturityInfo = getMaturityStage(percentageScore);

  const handleCalculate = () => {
    setIsSubmitted(true);
    // Fire-and-forget lead capture
    postLead({
      leadType: 'diagnostic',
      notes: `Skor Audit IT: ${percentageScore}% - ${maturityInfo.stage}`,
      sourceData: {
        score: percentageScore,
        stage: maturityInfo.stage,
        badge: maturityInfo.badge,
        answers,
      },
    });
  };

  const handleReset = () => {
    setAnswers({});
    setIsSubmitted(false);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-[#E9E9E7] rounded-sm p-6 md:p-8 space-y-3 shadow-2xs">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-800 font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          AUDIT KESEHATAN SISTEM IT UMKM (5 MENIT)
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#050505] tracking-tight">
          Cek Seberapa Siap & Aman Sistem Operasional Usaha Anda!
        </h1>
        <p className="text-sm text-[#555553] max-w-3xl leading-relaxed font-sans">
          Jawab 6 pertanyaan singkat di bawah ini tentang cara Anda mencatat penjualan, kelola stok, dan rekap keuangan. Langsung dapatkan skor tingkat kesehatan sistem dan langkah perbaikan terbaik untuk UMKM Anda!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Diagnostic Questions Form */}
        <div className="lg:col-span-7 space-y-6">
          {DIAGNOSTIC_QUESTIONS.map((q) => (
            <div key={q.id} className="bg-white border border-[#E9E9E7] rounded-sm p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-2 font-mono">
                <span className="text-xs font-bold text-[#050505] uppercase">
                  PERTANYAAN {q.id} DARI {DIAGNOSTIC_QUESTIONS.length}
                </span>
                <span className="text-[11px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-sm font-semibold">
                  {q.category}
                </span>
              </div>

              <h2 className="font-bold text-[#050505] text-sm leading-snug font-sans">{q.question}</h2>

              <div className="space-y-2">
                {q.options.map((opt, idx) => {
                  const isSelected = answers[q.id] === opt.points;
                  return (
                    <div
                      key={idx}
                      onClick={() => handleSelectOption(q.id, opt.points)}
                      className={`p-3.5 border rounded-sm transition-all cursor-pointer flex items-start gap-3 ${
                        isSelected
                          ? 'bg-black text-white border-black shadow-2xs'
                          : 'bg-[#F7F7F5] text-[#050505] border-[#E9E9E7] hover:border-black'
                      }`}
                    >
                      <div className="mt-0.5">
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            isSelected ? 'border-white bg-white' : 'border-[#757573]'
                          }`}
                        >
                          {isSelected && <div className="w-2 h-2 rounded-full bg-black"></div>}
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-xs font-bold font-sans">{opt.label}</div>
                        <div
                          className={`text-[11px] leading-relaxed font-sans ${
                            isSelected ? 'text-neutral-300' : 'text-[#555553]'
                          }`}
                        >
                          {opt.description}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={handleReset}
              className="text-xs font-sans font-medium text-[#757573] hover:text-[#050505] flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Semua Jawaban
            </button>

            <button
              onClick={handleCalculate}
              id="btn-diagnostic-calculate"
              className="bg-black text-white font-mono text-xs font-bold py-3 px-6 rounded-sm hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
            >
              Hitung Skor Kesehatan IT
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Audit Results & Benchmark Scorecard */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border border-black rounded-sm p-6 space-y-6 shadow-xs sticky top-24 font-sans">
            <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-3 font-mono">
              <span className="text-xs text-[#757573] uppercase font-bold">SKOR AUDIT KESEHATAN IT</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-sm border font-bold ${maturityInfo.color}`}>
                {maturityInfo.badge}
              </span>
            </div>

            {/* Gauge Display */}
            <div className="text-center space-y-2 py-2">
              <div className="inline-block relative">
                <span className="text-5xl font-extrabold font-mono text-[#050505] tracking-tight">
                  {percentageScore}%
                </span>
                <span className="block text-xs font-mono text-[#757573] mt-1">INDEKS KESIAPAN TEKNOLOGI</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-[#EEEEEE] h-2.5 rounded-sm overflow-hidden border border-[#E9E9E7]">
                <div
                  className="bg-emerald-600 h-full transition-all duration-500"
                  style={{ width: `${percentageScore}%` }}
                ></div>
              </div>
            </div>

            {/* Stage Title & Description */}
            <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-sm space-y-2 text-xs">
              <span className="font-bold text-emerald-950 text-xs block">{maturityInfo.stage}</span>
              <p className="text-[#333331] leading-relaxed">{maturityInfo.description}</p>
            </div>

            {/* Recommended Action */}
            <div className="border border-[#E9E9E7] p-4 rounded-sm space-y-2 text-xs bg-[#F7F7F5]">
              <span className="text-[10px] text-emerald-800 font-mono block uppercase font-bold">Langkah Perbaikan Prioritas:</span>
              <p className="font-bold text-[#050505] text-xs leading-relaxed">
                {maturityInfo.priorityAction}
              </p>
            </div>

            {/* Category Sub-scores */}
            <div className="space-y-2 pt-2 border-t border-[#E9E9E7] text-xs font-mono">
              <span className="text-[10px] text-[#757573] block uppercase font-sans font-bold">Rincian Per Kategori:</span>
              <div className="space-y-1.5">
                {DIAGNOSTIC_QUESTIONS.map((q) => {
                  const score = answers[q.id] || 0;
                  return (
                    <div key={q.id} className="flex items-center justify-between text-[11px]">
                      <span className="text-[#757573] font-sans">{q.category}:</span>
                      <span className="font-bold text-[#050505]">{score} / 100</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              onClick={() =>
                onOpenConsultationModal({
                  auditScore: percentageScore,
                  maturityStage: maturityInfo.stage,
                })
              }
              id="btn-diagnostic-book-consult"
              className="w-full bg-black text-white font-mono text-xs font-bold py-3 px-4 rounded-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              Konsultasikan Hasil Audit Ini
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
