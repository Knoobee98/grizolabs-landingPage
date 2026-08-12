import React, { useState } from 'react';
import { AdvisoryReport, ActiveTab } from '../types';
import { 
  Sparkles, 
  Send, 
  Loader2, 
  Cpu, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  HeartHandshake
} from 'lucide-react';

interface AiAdvisorProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenConsultationModal: (data?: any) => void;
}

export const AiAdvisor: React.FC<AiAdvisorProps> = ({ setActiveTab, onOpenConsultationModal }) => {
  const [businessType, setBusinessType] = useState('Kedai Kopi & Kafe Multi-Cabang');
  const [companySize, setCompanySize] = useState('3 Cabang Toko (12 Karyawan)');
  const [currentChallenge, setCurrentChallenge] = useState(
    'Stok bahan baku sering tekor dan tidak cocok dengan laporan kasir harian. Karyawan menghabiskan waktu 45 menit tiap malam untuk rekap struk manual.'
  );
  const [budgetTier, setBudgetTier] = useState('Paket UMKM Terjangkau (Rp 3,5M - 6M)');
  const [targetFeatures, setTargetFeatures] = useState('Kasir POS Tablet, Sinkronkan Stok Bahan, Laporan WA Harian');

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [report, setReport] = useState<AdvisoryReport | null>(null);

  // Quick Preset Scenarios
  const applyPreset = (scenario: string) => {
    if (scenario === 'fnb') {
      setBusinessType('Kedai Kopi & Kafe Multi-Cabang');
      setCompanySize('3 Cabang Toko di Jakarta');
      setCurrentChallenge('Stok susu & biji kopi sering selisih 15% tiap bulan karena belum ada sistem potong stok otomatis dari kasir.');
      setBudgetTier('Paket Tumbuh Standard (Rp 3,5M - 6M)');
      setTargetFeatures('Aplikasi Kasir POS, Cloud Database Stok Central, WA Warning Stok Menipis');
    } else if (scenario === 'retail') {
      setBusinessType('Toko Baju & Online Fashion WA');
      setCompanySize('1 Toko Utama + Penjualan Aktif WhatsApp');
      setCurrentChallenge('Admin kewalahan balas 150+ chat WA per hari. Cek stok baju & ukuran di Excel butuh waktu 5 menit per pembeli.');
      setBudgetTier('Paket Rintisan Basic (Rp 1,5M - 2,5M)');
      setTargetFeatures('Katalog Produk WA, Payment Gateway QRIS, Hitung Ongkir Otomatis');
    } else if (scenario === 'excel') {
      setBusinessType('Grosir Bahan Bangunan & Material');
      setCompanySize('1 Gudang Utama + 5 Sales Lapangan');
      setCurrentChallenge('Masih pakai file Excel besar yang sering lempar error/crash. Nota sering hilang sehingga penagihan utang terhambat.');
      setBudgetTier('Paket Bintang Premium (Rp 7,5M - 15M)');
      setTargetFeatures('Migrasi Excel ke Database Cloud, Portal Admin Sales, Hak Akses Staff Safe');
    }
  };

  const handleGenerateReport = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/ai-advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessType,
          companySize,
          currentChallenge,
          budgetTier,
          targetFeatures: targetFeatures.split(',').map((f) => f.trim()),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Gagal memproses analisis AI Advisor.');
      }

      setReport(data.advice);
    } catch (err: any) {
      console.error('Error fetching AI advice:', err);
      setErrorMsg(err.message || 'Terjadi kesalahan saat berkomunikasi dengan server AI Advisor.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-white border border-[#E9E9E7] rounded-sm p-6 md:p-8 space-y-3 shadow-2xs">
        <div className="flex items-center gap-2 font-mono text-xs text-amber-700 font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-500" />
          KONSULTAN ARSITEKTUR TEKNOLOGI AI
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#050505] tracking-tight">
          Diskusi Santai Bersama AI Architect Grizolabs
        </h1>
        <p className="text-sm text-[#555553] max-w-3xl leading-relaxed font-sans">
          Ceritakan masalah operasional usaha Anda di bawah ini. AI Architect kami akan menganalisis kebutuhan bisnis Anda dan memberikan rekomendasi solusi teknologi yang hemat biaya, mudah dipahami, dan paling pas untuk UMKM Anda!
        </p>

        {/* Quick Presets */}
        <div className="pt-3 border-t border-[#E9E9E7] flex flex-wrap items-center gap-2 text-xs font-mono">
          <span className="text-[#757573] font-sans">Pilih Contoh Skenario Cepat:</span>
          <button
            onClick={() => applyPreset('fnb')}
            className="bg-[#F7F7F5] border border-[#E9E9E7] text-[#050505] px-2.5 py-1 rounded-sm hover:bg-black hover:text-white transition-colors cursor-pointer font-sans"
          >
            Kedai Kopi & Kafe
          </button>
          <button
            onClick={() => applyPreset('retail')}
            className="bg-[#F7F7F5] border border-[#E9E9E7] text-[#050505] px-2.5 py-1 rounded-sm hover:bg-black hover:text-white transition-colors cursor-pointer font-sans"
          >
            Toko Baju & WhatsApp
          </button>
          <button
            onClick={() => applyPreset('excel')}
            className="bg-[#F7F7F5] border border-[#E9E9E7] text-[#050505] px-2.5 py-1 rounded-sm hover:bg-black hover:text-white transition-colors cursor-pointer font-sans"
          >
            Migrasi Excel ke Cloud DB
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Panel */}
        <div className="lg:col-span-5 bg-white border border-[#E9E9E7] rounded-sm p-6 space-y-5">
          <h2 className="text-sm font-mono font-bold text-[#050505] uppercase border-b border-[#E9E9E7] pb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-700" />
            1. Form Kebutuhan Usaha Anda
          </h2>

          <form onSubmit={handleGenerateReport} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-sans font-medium text-[#050505] block">Jenis / Sektor Usaha</label>
              <input
                type="text"
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                required
                className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs font-sans text-[#050505] focus:outline-none focus:border-black"
                placeholder="Contoh: Kedai Kopi, Toko Baju, Barbershop"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-medium text-[#050505] block">Skala Usaha / Jumlah Cabang</label>
              <input
                type="text"
                value={companySize}
                onChange={(e) => setCompanySize(e.target.value)}
                className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs font-sans text-[#050505] focus:outline-none focus:border-black"
                placeholder="Contoh: 2 Cabang Toko, 8 Staff"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-medium text-[#050505] block">Kendala Utama Operasional Saat Ini</label>
              <textarea
                value={currentChallenge}
                onChange={(e) => setCurrentChallenge(e.target.value)}
                required
                rows={3}
                className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm p-3 text-xs font-sans text-[#050505] focus:outline-none focus:border-black resize-none leading-relaxed"
                placeholder="Jelaskan hal apa yang sering memakan waktu lama atau memusingkan..."
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-medium text-[#050505] block">Target Anggaran Paket</label>
              <select
                value={budgetTier}
                onChange={(e) => setBudgetTier(e.target.value)}
                className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs font-sans text-[#050505] focus:outline-none focus:border-black"
              >
                <option value="Paket Rintisan Basic (Rp 1,5M - 2,5M)">Paket Rintisan Basic (Rp 1,5M - 2,5M)</option>
                <option value="Paket Tumbuh Standard (Rp 3,5M - 6M)">Paket Tumbuh Standard (Rp 3,5M - 6M)</option>
                <option value="Paket Bintang Premium (Rp 7,5M - 15M)">Paket Bintang Premium (Rp 7,5M - 15M)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-sans font-medium text-[#050505] block">Fitur Utama Yang Diharapkan</label>
              <input
                type="text"
                value={targetFeatures}
                onChange={(e) => setTargetFeatures(e.target.value)}
                className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs font-sans text-[#050505] focus:outline-none focus:border-black"
                placeholder="Pisahkan dengan koma"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              id="btn-ai-advisor-submit"
              className="w-full bg-black text-white font-mono text-xs font-bold py-3 px-4 rounded-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Sedang Menganalisis Solusi AI...
                </>
              ) : (
                <>
                  Dapatkan Rekomendasi Solusi AI
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-sm text-xs text-red-700 flex items-start gap-2 font-mono">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>{errorMsg}</div>
            </div>
          )}
        </div>

        {/* Right Output Panel */}
        <div className="lg:col-span-7 space-y-6">
          {!report && !isLoading && (
            <div className="bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-white border border-[#E9E9E7] rounded-sm flex items-center justify-center mx-auto text-amber-500 shadow-2xs">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="font-bold text-[#050505] text-base font-sans">Siap Menguji Rekomendasi Solusi IT</h3>
                <p className="text-xs text-[#555553] font-sans leading-relaxed">
                  Isi informasi usaha Anda di panel sebelah kiri atau klik contoh skenario cepat. AI Architect kami akan menyusun cetak biru sistem, estimasi waktu, dan modul yang paling pas!
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="bg-white border border-[#E9E9E7] rounded-sm p-12 text-center space-y-4">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-black" />
              <div className="space-y-1 font-mono text-xs">
                <p className="font-bold text-[#050505]">Menganalisis Kebutuhan Bisnis Anda...</p>
                <p className="text-[#757573]">Menghubungkan ke Engine Gemini AI Studio...</p>
              </div>
            </div>
          )}

          {report && !isLoading && (
            <div className="bg-white border border-black rounded-sm p-6 md:p-8 space-y-6 shadow-sm font-sans">
              <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-3">
                <div>
                  <span className="font-mono text-xs text-emerald-800 font-semibold block">
                    REKOMENDASI ARSITEKTUR GRIZOLABS AI
                  </span>
                  <h3 className="text-lg font-bold text-[#050505]">
                    {report.recommendedArchitecture?.title || 'Rancangan Solusi Sistem UMKM'}
                  </h3>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[10px] text-[#757573] block uppercase font-sans">Skor Kesiapan Digital</span>
                  <span className="text-xl font-bold text-emerald-700">{report.readinessScore} / 100</span>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-emerald-50/60 border border-emerald-200 p-4 rounded-sm space-y-2 text-xs">
                <span className="font-mono font-bold text-emerald-900 uppercase text-[11px] block flex items-center gap-1.5">
                  <HeartHandshake className="w-4 h-4 text-emerald-700" />
                  Kesimpulan & Solusi Utama:
                </span>
                <p className="text-[#050505] leading-relaxed font-sans">{report.executiveSummary}</p>
              </div>

              {/* Recommended Components Table */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold text-[#050505] uppercase border-b border-[#E9E9E7] pb-1 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-black" />
                  Modul & Komponen Rekomendasi
                </h4>

                <div className="border border-[#E9E9E7] rounded-sm overflow-x-auto">
                  <table className="w-full min-w-[480px] text-left font-sans text-xs">
                    <thead className="bg-[#F7F7F5] font-mono text-[10px] text-[#757573] border-b border-[#E9E9E7]">
                      <tr>
                        <th className="p-2.5">Komponen Fitur</th>
                        <th className="p-2.5">Teknologi Terpakai</th>
                        <th className="p-2.5">Manfaat Untuk Usaha Anda</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E9E9E7]">
                      {report.recommendedArchitecture?.components?.map((comp, idx) => (
                        <tr key={idx} className="hover:bg-[#F7F7F5]">
                          <td className="p-2.5 font-bold text-[#050505] text-[11px]">{comp.name}</td>
                          <td className="p-2.5 font-mono text-[11px] text-[#757573]">{comp.tech}</td>
                          <td className="p-2.5 text-[#050505] text-[11px]">{comp.purpose}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Implementation Phases */}
              <div className="space-y-3">
                <h4 className="font-mono text-xs font-bold text-[#050505] uppercase border-b border-[#E9E9E7] pb-1">
                  Tahapan Pelaksanaan (Roadmap)
                </h4>

                <div className="space-y-2">
                  {report.phases?.map((phase, idx) => (
                    <div key={idx} className="border border-[#E9E9E7] p-3 rounded-sm space-y-1 bg-[#F7F7F5]/50">
                      <div className="flex items-center justify-between font-mono text-xs font-bold text-[#050505]">
                        <span>{phase.phaseName}</span>
                        <span className="text-[#757573] text-[11px] font-sans">{phase.duration}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-[11px] text-[#050505] pt-1">
                        {phase.deliverables?.map((d, dIdx) => (
                          <span key={dIdx} className="bg-white border border-[#E9E9E7] px-2 py-0.5 rounded-sm font-sans text-[11px]">
                            ✓ {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost & ROI Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
                <div className="bg-[#1B1B1B] text-white p-4 rounded-sm space-y-1">
                  <span className="text-neutral-400 text-[10px] block uppercase font-sans">Estimasi Investasi System</span>
                  <span className="text-lg font-bold block">{report.estimatedCostIDR}</span>
                  <span className="text-[10px] text-emerald-400 block mt-1 font-sans">Pemeliharaan Ops: {report.monthlyOpsCostIDR}</span>
                </div>

                <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-1">
                  <span className="text-[#757573] text-[10px] block uppercase font-sans">Hasil Efisiensi Nyata</span>
                  <span className="text-xs font-bold text-[#050505] font-sans leading-snug block">
                    {report.roiEstimate}
                  </span>
                </div>
              </div>

              {/* Convert to Proposal CTA */}
              <div className="pt-4 border-t border-[#E9E9E7] flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setActiveTab('prd-estimator')}
                  className="w-full sm:w-auto bg-[#F7F7F5] border border-[#D3D3D2] text-[#050505] font-mono text-xs px-4 py-2.5 rounded-sm hover:bg-neutral-200 transition-colors cursor-pointer"
                >
                  Lihat Simulasi PRD →
                </button>

                <button
                  onClick={() => onOpenConsultationModal({ report })}
                  className="w-full sm:w-auto bg-black text-white font-mono text-xs font-bold px-5 py-2.5 rounded-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  Jadwalkan Konsultasi Gratis
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
