import React, { useState } from 'react';
import { PRDModuleOption } from '../types';
import { PRD_MODULE_OPTIONS } from '../data/mockData';
import { 
  FileCode2, 
  CheckSquare, 
  Square, 
  Printer, 
  Send, 
  CheckCircle2, 
  Sparkles,
  HeartHandshake,
  Download,
  ExternalLink
} from 'lucide-react';

interface PrdEstimatorProps {
  onOpenConsultationModal: (initialData?: any) => void;
}

export const PrdEstimator: React.FC<PrdEstimatorProps> = ({ onOpenConsultationModal }) => {
  const [projectName, setProjectName] = useState('Kasir POS & Katalog WA');
  const [industry, setIndustry] = useState('F&B / Restaurant');
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([
    'mod-compro',
    'mod-pos',
    'mod-inventory',
    'mod-catalog',
    'mod-payment',
  ]);
  const [complexityTier, setComplexityTier] = useState<'starter' | 'business' | 'enterprise'>('business');
  const [docRefNumber] = useState(() => `GZ-PRD-${Math.floor(10000 + Math.random() * 90000)}`);

  const currentDate = new Date().toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  // Module toggle
  const toggleModule = (id: string) => {
    if (selectedModuleIds.includes(id)) {
      if (selectedModuleIds.length === 1) return; // Keep at least 1 module
      setSelectedModuleIds(selectedModuleIds.filter((mId) => mId !== id));
    } else {
      setSelectedModuleIds([...selectedModuleIds, id]);
    }
  };

  // Calculations
  const selectedModules = PRD_MODULE_OPTIONS.filter((mod) => selectedModuleIds.includes(mod.id));
  const baseCost = selectedModules.reduce((acc, mod) => acc + mod.baseCostIDR, 0);
  const totalDays = selectedModules.reduce((acc, mod) => acc + mod.baseDays, 0);

  const tierMultiplier = complexityTier === 'starter' ? 0.9 : complexityTier === 'business' ? 1.0 : 1.35;
  const finalCostIDR = Math.round(baseCost * tierMultiplier);
  const finalWeeks = Math.ceil((totalDays * (complexityTier === 'enterprise' ? 1.25 : 1.0)) / 5);

  const formattedIDR = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(finalCostIDR);

  // Helper to generate a full standalone HTML document for printing or downloading
  const generateDocumentHTML = () => {
    return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Spesifikasi Fitur & Estimasi PRD - ${projectName}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #050505; margin: 0; padding: 40px; background: #fff; line-height: 1.5; }
    .container { max-width: 800px; margin: 0 auto; border: 1px solid #e2e2df; padding: 32px; border-radius: 8px; }
    .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #000; padding-bottom: 16px; margin-bottom: 24px; }
    .brand { font-family: monospace; font-weight: bold; font-size: 18px; }
    .brand span { background: #000; color: #fff; padding: 3px 8px; border-radius: 4px; margin-right: 6px; }
    .tag { font-family: monospace; font-size: 11px; background: #ecfdf5; color: #065f46; border: 1px solid #a7f3d0; padding: 4px 10px; border-radius: 4px; font-weight: bold; }
    .meta-box { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; background: #f7f7f5; padding: 16px; border-radius: 6px; font-family: monospace; font-size: 12px; margin-bottom: 24px; border: 1px solid #e9e9e7; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
    th { background: #f1f1ee; text-align: left; padding: 10px; font-family: monospace; font-size: 11px; border-bottom: 2px solid #000; text-transform: uppercase; }
    td { padding: 10px; border-bottom: 1px solid #eee; }
    tfoot td { background: #111; color: #fff; font-weight: bold; font-family: monospace; }
    .footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid #eee; font-size: 11px; color: #666; font-family: monospace; display: flex; justify-content: space-between; }
    @media print {
      body { padding: 0; }
      .container { border: none; padding: 0; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="no-print" style="margin-bottom: 20px; text-align: right;">
      <button onclick="window.print()" style="background: #10b981; color: white; border: none; padding: 10px 20px; font-weight: bold; border-radius: 4px; cursor: pointer; font-family: monospace;">Cetak / Simpan Sebagai PDF</button>
    </div>
    <div class="header">
      <div>
        <div class="brand"><span>GRIZOLABS</span> SOFTWARE HOUSE</div>
        <div style="font-size: 12px; color: #555; margin-top: 4px;">Spesialis Aplikasi Web, Kasir POS & Otomatisasi Sistem UMKM</div>
        <div style="font-size: 11px; font-family: monospace; color: #777; margin-top: 8px;">
          REF NO: ${docRefNumber} | TANGGAL: ${currentDate}
        </div>
      </div>
      <div>
        <span class="tag">DOKUMEN SPESIFIKASI</span>
      </div>
    </div>

    <h2 style="margin: 0 0 4px 0; font-size: 20px;">${projectName}</h2>
    <p style="margin: 0 0 20px 0; font-size: 13px; color: #555;">Spesifikasi Kebutuhan Fitur & Estimasi Investasi System UMKM</p>

    <div class="meta-box">
      <div><strong>Industri:</strong><br>${industry}</div>
      <div><strong>Tingkat Kebutuhan:</strong><br>${complexityTier.toUpperCase()}</div>
      <div><strong>Estimasi Waktu:</strong><br>${finalWeeks} Minggu (Rapid Sprint)</div>
    </div>

    <table>
      <thead>
        <tr>
          <th>FITUR / MODUL</th>
          <th>KODE</th>
          <th>KATEGORI</th>
          <th style="text-align: right;">INVESTASI</th>
        </tr>
      </thead>
      <tbody>
        ${selectedModules
          .map(
            (m) => `
          <tr>
            <td><strong>${m.name}</strong><br><span style="font-size: 11px; color: #666;">${m.description}</span></td>
            <td style="font-family: monospace; font-size: 11px;">${m.codeTag}</td>
            <td style="font-family: monospace; font-size: 11px;">${m.category}</td>
            <td style="text-align: right; font-family: monospace;">Rp ${Math.round(m.baseCostIDR * tierMultiplier).toLocaleString('id-ID')}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" style="text-align: right; padding: 12px;">TOTAL ESTIMASI INVESTASI SYSTEM:</td>
          <td style="text-align: right; padding: 12px; color: #34d399; font-size: 15px;">${formattedIDR}</td>
        </tr>
      </tfoot>
    </table>

    <div style="margin-top: 24px; font-size: 12px; background: #fdfbf7; border: 1px solid #fef3c7; padding: 16px; border-radius: 6px;">
      <strong>Komitmen Kualitas & Layanan Grizolabs:</strong>
      <ul style="margin: 8px 0 0 0; padding-left: 20px;">
        <li>Source Code 100% Hak Milik Klien (Tanpa Terkunci).</li>
        <li>Termasuk Gratis Domain (.com / .id) & Cloud Hosting 1 Tahun Pertama.</li>
        <li>Garansi Maintenance, Pelatihan Staf Onsite/Online.</li>
      </ul>
    </div>

    <div class="footer">
      <div>
        <strong>GRIZOLABS SOFTWARE HOUSE</strong><br>
        Email: hello@grizolabs.id | WA: 0812-3456-7890<br>
        Website: https://grizolabs.id
      </div>
      <div style="text-align: right;">
        Dokumen Resmi Hasil Estimasi PRD<br>
        Grizolabs IT Consultation
      </div>
    </div>
  </div>
</body>
</html>`;
  };

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      handleOpenNewTab();
    }
  };

  const handleOpenNewTab = () => {
    const htmlContent = generateDocumentHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const newWin = window.open(url, '_blank');
    if (!newWin) {
      handleDownloadDoc();
    }
  };

  const handleDownloadDoc = () => {
    const htmlContent = generateDocumentHTML();
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Spesifikasi-PRD-Grizolabs-${projectName.replace(/\s+/g, '-')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="no-print bg-white border border-[#E9E9E7] rounded-sm p-4 md:p-8 space-y-3 shadow-2xs">
        <div className="flex items-center gap-2 font-mono text-xs text-emerald-800 font-semibold uppercase tracking-wider">
          <FileCode2 className="w-4 h-4 text-emerald-700" />
          KALKULATOR RANCANGAN FITUR & BIAYA (PRD ESTIMATOR)
        </div>
        <h1 className="text-xl md:text-3xl font-extrabold text-[#050505] tracking-tight">
          Hitung Estimasi Biaya & Waktu Pengerjaan Secara Transparan
        </h1>
        <p className="text-xs md:text-sm text-[#555553] max-w-3xl leading-relaxed font-sans">
          Pilih modul fitur yang sesuai kebutuhan bisnis Anda. Kami akan tampilkan estimasi biaya investasi dan waktu pengerjaan secara jujur dan transparan!
        </p>
      </div>

      <div className="no-print grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        {/* Left Column: Scope Configuration Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Project Details Setup */}
          <div className="bg-white border border-[#E9E9E7] rounded-sm p-6 space-y-4">
            <h2 className="text-sm font-mono font-bold text-[#050505] uppercase border-b border-[#E9E9E7] pb-2 flex items-center justify-between">
              <span>01. Identitas Usaha Anda</span>
              <span className="text-xs text-[#757573] font-normal font-sans">[INFORMASI DASAR]</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-sans font-medium text-[#050505] block">Nama Usaha / Proyek</label>
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs font-sans text-[#050505] focus:outline-none focus:border-black"
                  placeholder="Contoh: Kedai Kopi Senja POS"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-sans font-medium text-[#050505] block">Kategori Industri</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs font-sans text-[#050505] focus:outline-none focus:border-black"
                >
                  <option value="F&B / Restaurant">F&B / Kafe & Restoran</option>
                  <option value="Retail & Fashion Store">Toko Retail & Fashion</option>
                  <option value="Wholesale & Supplier">Grosir & Distributor</option>
                  <option value="Clinic & Pharmacy">Klinik & Apotek</option>
                  <option value="Barbershop & Service">Barbershop & Jasa Salon</option>
                  <option value="E-Commerce & Digital Store">Toko Online / E-Commerce</option>
                </select>
              </div>
            </div>
          </div>

          {/* Module Selector Grid */}
          <div className="bg-white border border-[#E9E9E7] rounded-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-2">
              <h2 className="text-sm font-mono font-bold text-[#050505] uppercase">
                02. Pilih Modul Fitur Yang Dibutuhkan
              </h2>
              <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                {selectedModuleIds.length} dari {PRD_MODULE_OPTIONS.length} Fitur Terpilih
              </span>
            </div>

            <div className="space-y-2">
              {PRD_MODULE_OPTIONS.map((mod: PRDModuleOption) => {
                const isSelected = selectedModuleIds.includes(mod.id);
                return (
                  <div
                    key={mod.id}
                    onClick={() => toggleModule(mod.id)}
                    className={`p-3.5 border rounded-sm transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-[#F7F7F5] border-black ring-1 ring-black/10'
                        : 'bg-white border-[#E9E9E7] hover:border-neutral-400'
                    }`}
                  >
                    <button className="mt-0.5 text-black focus:outline-none" tabIndex={-1}>
                      {isSelected ? (
                        <CheckSquare className="w-4 h-4 text-black fill-black/10" />
                      ) : (
                        <Square className="w-4 h-4 text-[#757573]" />
                      )}
                    </button>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[#050505] font-sans">{mod.name}</span>
                        <span className="font-mono text-[10px] bg-white border border-[#E9E9E7] px-1.5 py-0.5 rounded-sm text-[#757573]">
                          {mod.codeTag}
                        </span>
                      </div>
                      <p className="text-xs text-[#555553] leading-snug font-sans">{mod.description}</p>
                      <div className="flex items-center gap-3 text-[10px] font-mono text-[#757573] pt-1">
                        <span>EST. PENGERJAAN: {mod.baseDays} HARI</span>
                        <span>•</span>
                        <span className="font-bold text-[#050505]">
                          Rp {(mod.baseCostIDR / 1000000).toFixed(1)} Juta
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Architecture / Complexity Tier Selection */}
          <div className="bg-white border border-[#E9E9E7] rounded-sm p-6 space-y-4">
            <h2 className="text-sm font-mono font-bold text-[#050505] uppercase border-b border-[#E9E9E7] pb-2">
              03. Pilih Skala Server & Infrastruktur
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <button
                onClick={() => setComplexityTier('starter')}
                className={`p-3 border text-left rounded-sm transition-all font-mono cursor-pointer ${
                  complexityTier === 'starter'
                    ? 'bg-black text-white border-black'
                    : 'bg-[#F7F7F5] text-[#050505] border-[#E9E9E7] hover:border-black'
                }`}
              >
                <div className="text-xs font-bold uppercase mb-1">1 Cabang (Starter)</div>
                <div className="text-[11px] opacity-80 font-sans leading-tight">
                  Cocok untuk 1 toko/kafe. Penggunaan server standar hemat biaya.
                </div>
              </button>

              <button
                onClick={() => setComplexityTier('business')}
                className={`p-3 border text-left rounded-sm transition-all font-mono cursor-pointer ${
                  complexityTier === 'business'
                    ? 'bg-black text-white border-black'
                    : 'bg-[#F7F7F5] text-[#050505] border-[#E9E9E7] hover:border-black'
                }`}
              >
                <div className="text-xs font-bold uppercase mb-1">Multi-Cabang (Standard)</div>
                <div className="text-[11px] opacity-80 font-sans leading-tight">
                  Sinkronisasi hingga 5 cabang. Cloud Database real-time + backup harian.
                </div>
              </button>

              <button
                onClick={() => setComplexityTier('enterprise')}
                className={`p-3 border text-left rounded-sm transition-all font-mono cursor-pointer ${
                  complexityTier === 'enterprise'
                    ? 'bg-black text-white border-black'
                    : 'bg-[#F7F7F5] text-[#050505] border-[#E9E9E7] hover:border-black'
                }`}
              >
                <div className="text-xs font-bold uppercase mb-1">Skala Besar (Enterprise)</div>
                <div className="text-[11px] opacity-80 font-sans leading-tight">
                  Cabang &gt;5, server kapasitas tinggi, performa tinggi 24/7.
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Scope Calculation Summary & PRD Document Preview */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Pricing & Timeline Summary Widget */}
          <div className="bg-[#1B1B1B] text-white border border-black rounded-sm p-4 md:p-6 space-y-5 shadow-md lg:sticky lg:top-24">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 font-mono text-xs">
              <span className="text-neutral-400">ESTIMASI INVESTASI IT</span>
              <span className="text-emerald-400 font-bold font-sans">[HARGA BELI SEKALI]</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-sans text-neutral-400 uppercase tracking-wider block">
                Total Estimasi Investasi System:
              </span>
              <div className="text-2xl md:text-4xl font-extrabold font-mono text-white tracking-tight">
                {formattedIDR}
              </div>
              <p className="text-xs font-sans text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Termasuk Gratis Domain (.com/.id) & Cloud Hosting 1 Tahun
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-neutral-800 font-mono text-xs">
              <div className="bg-neutral-900 p-3 rounded-sm border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase font-sans">Estimasi Pengerjaan:</span>
                <span className="text-base font-bold text-white block mt-0.5">{finalWeeks} Minggu</span>
                <span className="text-[10px] text-neutral-400 font-sans">Metode Rapid Sprint</span>
              </div>

              <div className="bg-neutral-900 p-3 rounded-sm border border-neutral-800">
                <span className="text-[10px] text-neutral-400 block uppercase font-sans">Jumlah Modul:</span>
                <span className="text-base font-bold text-white block mt-0.5">{selectedModules.length} Fitur</span>
                <span className="text-[10px] text-neutral-400 font-sans">Custom Kebutuhan</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={() =>
                  onOpenConsultationModal({
                    projectName,
                    industry,
                    selectedModules: selectedModules.map((m) => m.name),
                    estimatedPrice: formattedIDR,
                    estimatedWeeks: finalWeeks,
                  })
                }
                id="btn-prd-submit-proposal"
                className="w-full bg-white text-black font-mono text-xs font-bold py-3 px-4 rounded-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              >
                Kirim Rancangan ke Tim Grizolabs
                <Send className="w-3.5 h-3.5" />
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  onClick={handleDownloadDoc}
                  id="btn-prd-download-doc"
                  className="w-full bg-emerald-700 text-white font-mono text-xs font-bold py-2.5 px-3 rounded-sm hover:bg-emerald-600 transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  title="Unduh file dokumen spesifikasi langsung ke komputer/HP Anda"
                >
                  <Download className="w-3.5 h-3.5" />
                  Unduh Dokumen (.html)
                </button>

                <button
                  onClick={handleOpenNewTab}
                  id="btn-prd-print-pdf"
                  className="w-full bg-neutral-900 text-neutral-200 border border-neutral-700 font-mono text-xs py-2.5 px-3 rounded-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Buka dokumen di tab baru untuk dicetak / disimpan sebagai PDF"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
                  Buka & Cetak PDF
                </button>
              </div>
            </div>

            {/* Guarantees */}
            <div className="pt-3 border-t border-neutral-800 space-y-1.5 text-[11px] font-sans text-neutral-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Source Code 100% Hak Milik Anda</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Garansi Maintenance & Pelatihan Staff Onsite/Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generated Formal PRD Document Preview (Printable View) */}
      <div className="print-document bg-white border border-[#E9E9E7] rounded-sm p-6 md:p-10 space-y-6 shadow-2xs font-sans">
        <div className="flex items-start justify-between border-b-2 border-black pb-4">
          <div>
            <div className="font-mono font-extrabold text-base text-black tracking-wider flex items-center gap-2">
              <span className="bg-black text-white px-2 py-0.5 rounded-xs">GRIZOLABS</span>
              <span>SOFTWARE HOUSE & IT CONSULTANT</span>
            </div>
            <p className="text-xs text-[#555553] mt-1 font-sans">
              Spesialis Aplikasi Web, Kasir POS & Otomatisasi Sistem UMKM
            </p>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#757573] mt-2">
              <span className="font-bold text-black">[PRD DOKUMEN SPESIFIKASI FITUR]</span>
              <span>• NO: {docRefNumber}</span>
              <span>• TGL: {currentDate}</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="font-mono text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-sm font-bold block">
              DOKUMEN SPESIFIKASI
            </span>
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="text-xl font-bold text-[#050505]">{projectName} - Spesifikasi System</h3>
          <p className="text-xs text-[#555553]">Spesifikasi kebutuhan fitur dan estimasi investasi pengembangan aplikasi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs bg-[#F7F7F5] p-4 rounded-sm border border-[#E9E9E7]">
          <div>
            <span className="text-[#757573] block uppercase text-[10px] font-sans">Kategori Bisnis:</span>
            <span className="font-bold text-[#050505]">{industry}</span>
          </div>
          <div>
            <span className="text-[#757573] block uppercase text-[10px] font-sans">Skala Infrastruktur:</span>
            <span className="font-bold text-[#050505] uppercase">{complexityTier} Tier</span>
          </div>
          <div>
            <span className="text-[#757573] block uppercase text-[10px] font-sans">Target Selesai:</span>
            <span className="font-bold text-[#050505]">{finalWeeks} Minggu dari Kickoff</span>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-mono text-xs font-bold text-[#050505] uppercase border-b border-[#E9E9E7] pb-1">
            1. Matriks Fitur & Estimasi Biaya
          </h4>

          <div className="border border-[#E9E9E7] rounded-sm overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full text-left font-sans text-xs min-w-[480px]">
              <thead className="bg-[#F7F7F5] font-mono text-[11px] text-[#757573] border-b border-[#E9E9E7]">
                <tr>
                  <th className="p-3">Nama Modul Fitur</th>
                  <th className="p-3">Kode Tag</th>
                  <th className="p-3">Kategori</th>
                  <th className="p-3 text-right">Estimasi Biaya</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9E9E7]">
                {selectedModules.map((mod) => (
                  <tr key={mod.id} className="hover:bg-[#F7F7F5]/50">
                    <td className="p-3 font-medium text-[#050505]">
                      {mod.name}
                      <p className="text-[11px] text-[#757573] font-normal">{mod.description}</p>
                    </td>
                    <td className="p-3 font-mono text-[11px] text-[#757573]">{mod.codeTag}</td>
                    <td className="p-3 font-mono text-[11px] text-[#050505]">{mod.category}</td>
                    <td className="p-3 font-mono text-right text-[#050505]">
                      Rp {Math.round(mod.baseCostIDR * tierMultiplier).toLocaleString('id-ID')}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-[#111111] text-white font-mono text-xs border-t-2 border-black">
                <tr>
                  <td colSpan={3} className="p-3.5 font-bold uppercase text-right">
                    Total Estimasi Investasi System:
                  </td>
                  <td className="p-3.5 font-bold text-right text-emerald-400 text-sm">
                    {formattedIDR}
                  </td>
                </tr>
              </tfoot>
            </table>
            </div>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <h4 className="font-mono text-xs font-bold text-[#050505] uppercase border-b border-[#E9E9E7] pb-1">
            2. Komitmen Kualitas & Dukungan Garansi
          </h4>
          <ul className="space-y-2 text-xs text-[#050505] font-sans">
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                <strong>Kecepatan & Keamanan:</strong> Aplikasi dikembangkan dengan arsitektur modern (React 19, Express TypeScript, Cloud SQL) yang stabil dan bebas lag.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                <strong>Keamanan Data:</strong> Database terenkripsi dengan backup harian otomatis agar data penjualan Anda selalu aman dari kehilangan.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold">•</span>
              <span>
                <strong>Serah Terima Lengkap:</strong> Seluruh source code, panduan penggunaan, serta pendampingan pelatihan staff siap diserahterimakan.
              </span>
            </li>
          </ul>
        </div>

        {/* Document Footer Sign-off & Contact Info */}
        <div className="pt-6 border-t border-[#E9E9E7] flex flex-wrap items-end justify-between gap-4 font-mono text-xs text-[#757573]">
          <div className="space-y-1">
            <p className="font-bold text-black">GRIZOLABS SOFTWARE HOUSE</p>
            <p>Konsultasi & Informasi: hello@grizolabs.id | WA: 0812-3456-7890</p>
            <p>Website Resmi: https://grizolabs.id</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-[#999]">Dicetak secara digital melalui sistem PRD Estimator Grizolabs</p>
          </div>
        </div>
      </div>
    </div>
  );
};
