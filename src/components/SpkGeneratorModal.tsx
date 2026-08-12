import React, { useState } from 'react';
import { AdminProject, SPKContract } from '../types';
import { ADMIN_CONFIG } from '../data/mockData';
import { Printer, Copy, Check, X, FileCheck, Building2, Calendar, ShieldCheck, CreditCard, Edit3, Eye } from 'lucide-react';

interface SpkGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: AdminProject;
}

export const SpkGeneratorModal: React.FC<SpkGeneratorModalProps> = ({
  isOpen,
  onClose,
  project,
}) => {
  if (!isOpen) return null;

  const now = new Date();
  const defaultDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`;
  const randomNum = Math.floor(100 + Math.random() * 900);
  const defaultSpkNumber = `SPK/GZ/${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${randomNum}`;

  const [activeTab, setActiveTab] = useState<'preview' | 'edit'>('preview');
  const [copied, setCopied] = useState(false);

  const [contractData, setContractData] = useState<SPKContract>({
    spkNumber: defaultSpkNumber,
    date: defaultDate,
    clientName: project.clientName,
    clientAddress: 'Jl. Senopati Raya No. 42, Kebayoran Baru, Jakarta Selatan',
    clientPic: 'Bpk. Henra / Owner UMKM',
    projectName: project.projectName,
    package: project.package,
    totalBudgetIDR: project.budgetIDR,
    downPaymentPercent: 50,
    startDate: project.startDate,
    targetDate: project.targetDate,
    scopeDeliverables: [
      'Analisis Kebutuhan & Finalisasi Draf Arsitektur Sistem Cloud',
      'Pengembangan Frontend React PWA Mobile Responsive',
      'Pengembangan Backend Express API & Database Cloud SQL / Firestore',
      'Integrasi WhatsApp Official API & Payment Gateway QRIS',
      'Pengujian UAT, Pelatihan Staff Onsite/Online, & Deployment Cloud Run',
      'Jaminan Garansi Maintenance & Monitor Uptime 30-90 Hari',
    ],
    garansiDays: 30,
    notes: 'Pembayaran DP 50% dilakukan setelah penandatanganan SPK ini sebelum pekerjaan dimulai.',
  });

  // Calculate DP & Remaining Payment
  const numericBudget = parseInt(contractData.totalBudgetIDR.replace(/[^0-9]/g, '')) || 0;
  const dpAmount = Math.round((numericBudget * contractData.downPaymentPercent) / 100);
  const remainingAmount = numericBudget - dpAmount;

  const formatIDR = (num: number) => {
    return 'Rp ' + num.toLocaleString('id-ID');
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')}`;

    const cleanClientCompany = (contractData.clientName || project.clientName)
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '');

    const cleanClientPic = (contractData.clientPic || 'PIC')
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_+|_+$/g, '');

    const dynamicFilename = `SPK_${cleanClientCompany}_${cleanClientPic}_${dateStr}`;

    document.title = dynamicFilename;
    window.print();

    setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const handleCopyText = () => {
    const textToCopy = `
SURAT PERJANJIAN KERJA (SPK)
Nomor: ${contractData.spkNumber}
Tanggal: ${contractData.date}

PIHAK PERTAMA (Penyedia Jasa):
GRIZOLABS IT CONSULTING
Alamat: ${ADMIN_CONFIG.address}
Kontak: ${ADMIN_CONFIG.whatsappFormatted} / ${ADMIN_CONFIG.email}

PIHAK KEDUA (Klien):
${contractData.clientName}
Alamat: ${contractData.clientAddress}
Penanggung Jawab: ${contractData.clientPic}

PASAL 1: LINGKUP PEKERJAAN
Paket: ${contractData.package}
Proyek: ${contractData.projectName}
Deliverables:
${contractData.scopeDeliverables.map((d, i) => `${i + 1}. ${d}`).join('\n')}

PASAL 2: BIAYA & SKEMA PEMBAYARAN
Total Biaya: ${contractData.totalBudgetIDR}
- Pembayaran DP (${contractData.downPaymentPercent}%): ${formatIDR(dpAmount)}
- Pelunasan (${100 - contractData.downPaymentPercent}%): ${formatIDR(remainingAmount)} (Setelah UAT & Serah Terima)

PASAL 3: WAKTU PENGERJAAN & GARANSI
Periode: ${contractData.startDate} s/d ${contractData.targetDate}
Garansi Maintenance: ${contractData.garansiDays} Hari Pasca Go-Live
    `.trim();

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 md:p-4 overflow-y-auto spk-modal-overlay">
      <div className="bg-white rounded-lg max-w-4xl w-full my-auto shadow-2xl overflow-hidden relative flex flex-col max-h-[95vh] spk-modal-container">
        {/* Header Bar */}
        <div className="bg-neutral-900 text-white p-4 md:p-5 flex items-center justify-between no-print shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 text-black font-mono font-bold rounded flex items-center justify-center">
              SPK
            </div>
            <div>
              <h2 className="text-base md:text-lg font-bold">Generator SPK Kontrak Resmi</h2>
              <p className="text-xs text-neutral-400 font-mono">
                {project.clientName} • {contractData.spkNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="bg-neutral-800 p-1 rounded flex items-center gap-1 border border-neutral-700">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 text-xs font-mono rounded font-semibold cursor-pointer flex items-center gap-1 transition-colors ${
                  activeTab === 'preview' ? 'bg-white text-black' : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Pratinjau SPK
              </button>
              <button
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 text-xs font-mono rounded font-semibold cursor-pointer flex items-center gap-1 transition-colors ${
                  activeTab === 'edit' ? 'bg-white text-black' : 'text-neutral-300 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                Edit Parameter
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Action Toolbar */}
        <div className="bg-[#F7F7F5] border-b border-[#E9E9E7] px-4 py-2.5 flex items-center justify-between no-print shrink-0">
          <span className="text-xs font-mono text-neutral-600">
            Draf Kontrak SPK Siap Dicetak / Disalin (Dokumen Teks Resmi)
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyText}
              className="bg-white hover:bg-neutral-100 text-black border border-[#DCDCDA] text-xs font-mono px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Teks Tersalin!' : 'Salin Teks Kontrak'}
            </button>

            <button
              onClick={handlePrint}
              className="bg-black hover:bg-neutral-800 text-white text-xs font-mono font-bold px-4 py-1.5 rounded flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              Cetak / Simpan PDF
            </button>
          </div>
        </div>

        {/* Modal Body / Scrollable Content */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 font-sans bg-white">
          {/* TAB 1: FORM EDIT */}
          {activeTab === 'edit' && (
            <div className="space-y-5 no-print max-w-2xl mx-auto">
              <h3 className="text-sm font-bold text-black border-b pb-2 flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-emerald-600" />
                Pengaturan Parameter SPK Kontrak
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-mono font-bold block mb-1">Nomor SPK Resmi</label>
                  <input
                    type="text"
                    value={contractData.spkNumber}
                    onChange={(e) => setContractData({ ...contractData, spkNumber: e.target.value })}
                    className="w-full p-2 bg-[#F9F9F9] border rounded font-mono"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1">Tanggal Kontrak</label>
                  <input
                    type="date"
                    value={contractData.date}
                    onChange={(e) => setContractData({ ...contractData, date: e.target.value })}
                    className="w-full p-2 bg-[#F9F9F9] border rounded"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1">Nama Klien / Perusahaan</label>
                  <input
                    type="text"
                    value={contractData.clientName}
                    onChange={(e) => setContractData({ ...contractData, clientName: e.target.value })}
                    className="w-full p-2 bg-[#F9F9F9] border rounded"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1">Penanggung Jawab Klien (PIC)</label>
                  <input
                    type="text"
                    value={contractData.clientPic}
                    onChange={(e) => setContractData({ ...contractData, clientPic: e.target.value })}
                    className="w-full p-2 bg-[#F9F9F9] border rounded"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="font-mono font-bold block mb-1">Alamat Klien</label>
                  <input
                    type="text"
                    value={contractData.clientAddress}
                    onChange={(e) => setContractData({ ...contractData, clientAddress: e.target.value })}
                    className="w-full p-2 bg-[#F9F9F9] border rounded"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1">Skema Pembayaran Uang Muka (DP %)</label>
                  <select
                    value={contractData.downPaymentPercent}
                    onChange={(e) =>
                      setContractData({ ...contractData, downPaymentPercent: parseInt(e.target.value) })
                    }
                    className="w-full p-2 bg-[#F9F9F9] border rounded font-bold"
                  >
                    <option value={50}>DP 50% - Pelunasan 50% (Standard Grizolabs)</option>
                    <option value={40}>DP 40% - Pelunasan 60%</option>
                    <option value={30}>DP 30% - Pelunasan 70%</option>
                    <option value={100}>Pelunasan 100% di Awal</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1">Masa Garansi Maintenance (Hari)</label>
                  <select
                    value={contractData.garansiDays}
                    onChange={(e) => setContractData({ ...contractData, garansiDays: parseInt(e.target.value) })}
                    className="w-full p-2 bg-[#F9F9F9] border rounded font-bold"
                  >
                    <option value={30}>30 Hari Garansi (Standard Paket Rintisan / Tumbuh)</option>
                    <option value={60}>60 Hari Garansi (Paket Bintang)</option>
                    <option value={90}>90 Hari Priority SLA (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('preview')}
                  className="bg-black text-white text-xs font-mono font-bold px-5 py-2.5 rounded cursor-pointer"
                >
                  Simpan & Lihat Pratinjau Dokumen SPK
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: PRINTABLE SPK LEGAL DOCUMENT PREVIEW */}
          {activeTab === 'preview' && (
            <div className="space-y-5 text-[#050505] max-w-3xl mx-auto print-document font-sans">
              {/* Document Letterhead / Kop Surat */}
              <div className="border-b-2 border-black pb-3 flex items-start justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-black text-white font-mono font-bold text-xs flex items-center justify-center rounded">
                      GZ
                    </div>
                    <h1 className="text-lg font-extrabold tracking-tight">GRIZOLABS IT CONSULTING</h1>
                  </div>
                  <p className="text-[11px] font-sans text-neutral-600">
                    Custom Software Engineering & Digital Transformation Specialist
                  </p>
                  <p className="text-[10px] font-mono text-neutral-500">
                    {ADMIN_CONFIG.address} | WA: {ADMIN_CONFIG.whatsappFormatted} | Email: {ADMIN_CONFIG.email}
                  </p>
                </div>

                <div className="text-right font-mono text-[11px]">
                  <span className="font-bold text-black block">SURAT PERJANJIAN KERJA</span>
                  <span className="text-neutral-600 font-semibold">{contractData.spkNumber}</span>
                  <span className="text-neutral-500 block text-[10px] mt-0.5">Tanggal: {contractData.date}</span>
                </div>
              </div>

              {/* Title Header */}
              <div className="text-center space-y-0.5 py-1">
                <h2 className="text-sm md:text-base font-bold underline uppercase tracking-wide">
                  SURAT PERJANJIAN KERJA PENGEMBANGAN SOFTWARE
                </h2>
                <p className="text-[11px] text-neutral-600 font-mono">Nomor: {contractData.spkNumber}</p>
              </div>

              {/* Parties / Para Pihak */}
              <div className="space-y-2 text-xs leading-relaxed spk-pasal-block">
                <p>
                  Pada hari ini, tanggal <strong>{contractData.date}</strong>, kami yang bertanda tangan di bawah ini menyepakati Perjanjian Kerja Pengembangan Software:
                </p>

                <div className="bg-[#F9F9F8] p-3 rounded border border-[#EBEBE8] space-y-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <span className="font-bold font-mono text-black block mb-0.5 text-[11px]">PIHAK PERTAMA (Penyedia Jasa):</span>
                      <p className="font-semibold text-xs">GRIZOLABS IT CONSULTING</p>
                      <p className="text-neutral-600 text-[11px]">Representasi: Lead Software Architect Grizolabs</p>
                      <p className="text-neutral-600 text-[11px]">{ADMIN_CONFIG.address}</p>
                    </div>

                    <div>
                      <span className="font-bold font-mono text-black block mb-0.5 text-[11px]">PIHAK KEDUA (Klien / UMKM):</span>
                      <p className="font-semibold text-xs">{contractData.clientName}</p>
                      <p className="text-neutral-600 text-[11px]">Penanggung Jawab: {contractData.clientPic}</p>
                      <p className="text-neutral-600 text-[11px]">{contractData.clientAddress}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Legal Clauses */}
              <div className="space-y-3.5 text-xs leading-relaxed">
                {/* PASAL 1 */}
                <div className="space-y-1 spk-pasal-block">
                  <h3 className="font-bold font-mono text-xs border-b border-neutral-300 pb-0.5">
                    PASAL 1: LINGKUP PEKERJAAN & DELIVERABLES
                  </h3>
                  <p>
                    PIHAK PERTAMA setuju untuk melaksanakan pembuatan dan pengembangan aplikasi software untuk PIHAK KEDUA dengan rincian:
                  </p>
                  <ul className="list-disc pl-5 space-y-0.5 text-neutral-800 font-sans mt-1">
                    <li><strong>Nama Proyek:</strong> {contractData.projectName}</li>
                    <li><strong>Kategori Paket:</strong> {contractData.package}</li>
                    {contractData.scopeDeliverables.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* PASAL 2 */}
                <div className="space-y-1 spk-pasal-block">
                  <h3 className="font-bold font-mono text-xs border-b border-neutral-300 pb-0.5">
                    PASAL 2: JANGKA WAKTU PENGERJAAN
                  </h3>
                  <p>
                    Pekerjaan akan dilaksanakan mulai tanggal <strong>{contractData.startDate}</strong> dan ditargetkan selesai serah terima (Go-Live) pada tanggal <strong>{contractData.targetDate}</strong>, tergantung pada kelengkapan materi data dari PIHAK KEDUA.
                  </p>
                </div>

                {/* PASAL 3 */}
                <div className="space-y-1 spk-pasal-block">
                  <h3 className="font-bold font-mono text-xs border-b border-neutral-300 pb-0.5">
                    PASAL 3: BIAYA & SKEMA PEMBAYARAN
                  </h3>
                  <p>
                    Total biaya proyek yang disepakati adalah sebesar <strong className="text-black font-mono">{contractData.totalBudgetIDR}</strong> dengan rincian skema pembayaran sebagai berikut:
                  </p>
                  <div className="bg-[#F9F9F8] p-2.5 rounded border text-[11px] font-mono space-y-0.5 my-1">
                    <div className="flex justify-between">
                      <span>• Uang Muka / DP ({contractData.downPaymentPercent}%):</span>
                      <strong className="text-black">{formatIDR(dpAmount)}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>• Pelunasan ({100 - contractData.downPaymentPercent}% setelah UAT):</span>
                      <strong className="text-black">{formatIDR(remainingAmount)}</strong>
                    </div>
                  </div>
                  <p className="text-[10px] text-neutral-600">
                    * Pembayaran dilakukan melalui Transfer Bank Resmi Grizolabs. {contractData.notes}
                  </p>
                </div>

                {/* PASAL 4 */}
                <div className="space-y-1 spk-pasal-block">
                  <h3 className="font-bold font-mono text-xs border-b border-neutral-300 pb-0.5">
                    PASAL 4: HAK CIPTA & KERAHASIAAN DATA (NDA)
                  </h3>
                  <p>
                    Setelah pelunasan 100% diterima oleh PIHAK PERTAMA, hak guna software dan data bisnis sepenuhnya menjadi milik PIHAK KEDUA. PIHAK PERTAMA berkewajiban menjaga kerahasiaan seluruh data transaksi dan inventaris bisnis PIHAK KEDUA.
                  </p>
                </div>

                {/* PASAL 5 */}
                <div className="space-y-1 spk-pasal-block">
                  <h3 className="font-bold font-mono text-xs border-b border-neutral-300 pb-0.5">
                    PASAL 5: GARANSI MAINTENANCE & SLA SUPPORT
                  </h3>
                  <p>
                    PIHAK PERTAMA memberikan jaminan garansi *bug fixing* dan pendampingan teknis gratis selama <strong>{contractData.garansiDays} Hari</strong> terhitung sejak tanggal *Go-Live*.
                  </p>
                </div>
              </div>

              {/* Signatures Block */}
              <div className="pt-6 border-t border-neutral-300 grid grid-cols-2 gap-8 text-center text-xs font-sans spk-signature-block">
                <div className="space-y-12">
                  <div>
                    <span className="font-bold font-mono block text-xs">PIHAK PERTAMA</span>
                    <span className="text-neutral-500 text-[10px]">GRIZOLABS IT CONSULTING</span>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold underline font-mono text-xs">Budi Santoso, S.Kom</p>
                    <p className="text-[10px] text-neutral-600">Lead Enterprise Architect</p>
                  </div>
                </div>

                <div className="space-y-12">
                  <div>
                    <span className="font-bold font-mono block text-xs">PIHAK KEDUA</span>
                    <span className="text-neutral-500 text-[10px]">{contractData.clientName}</span>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-bold underline font-mono text-xs">{contractData.clientPic}</p>
                    <p className="text-[10px] text-neutral-600">Pemilik / Direktur Utama</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
