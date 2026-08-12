import React, { useState } from 'react';
import { WorkstationMilestone, ScopeChangeLog } from '../types';
import { SAMPLE_WORKSTATION_MILESTONES, SAMPLE_SCOPE_CHANGES } from '../data/mockData';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Download, 
  Plus, 
  ExternalLink, 
  Activity
} from 'lucide-react';

export const ProjectWorkstation: React.FC = () => {
  const [milestones, setMilestones] = useState<WorkstationMilestone[]>(SAMPLE_WORKSTATION_MILESTONES);
  const [scopeChanges, setScopeChanges] = useState<ScopeChangeLog[]>(SAMPLE_SCOPE_CHANGES);

  // New Scope Change Modal Form state
  const [showScopeModal, setShowScopeModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newImpactWeeks, setNewImpactWeeks] = useState(1);
  const [newImpactCost, setNewImpactCost] = useState(2000000);

  const handleAddScopeChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const newLog: ScopeChangeLog = {
      id: `sc-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      title: newTitle,
      impactWeeks: newImpactWeeks,
      impactCostIDR: newImpactCost,
      status: 'Sedang Ditinjau',
      author: 'Klien (Owner Kedai Kopi)',
    };

    setScopeChanges([newLog, ...scopeChanges]);
    setNewTitle('');
    setShowScopeModal(false);
  };

  const completedMilestones = milestones.filter((m) => m.status === 'Completed').length;
  const overallProgress = Math.round((completedMilestones / milestones.length) * 100);

  return (
    <div className="space-y-8 font-sans">
      {/* Header Banner */}
      <div className="bg-white border border-[#E9E9E7] rounded-sm p-6 md:p-8 space-y-4 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E9E9E7] pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-800 font-semibold uppercase tracking-wider">
              <LayoutDashboard className="w-4 h-4 text-emerald-700" />
              RUANG KERJA PROYEK (WORKSTATION TRANSPARAN)
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#050505] tracking-tight mt-1">
              Pantau Progres Pengerjaan Sistem Secara Real-Time
            </h1>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs">
            <span className="bg-[#F7F7F5] border border-[#E9E9E7] px-3 py-1.5 rounded-sm text-[#050505]">
              KODE PROYEK: <strong className="font-bold">GZ-2026-KS08</strong>
            </span>
            <span className="bg-emerald-950 text-emerald-300 border border-emerald-800 px-3 py-1.5 rounded-sm font-semibold">
              STATUS: SESUAI JADWAL
            </span>
          </div>
        </div>

        {/* Live Project Overview Metadata */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs pt-1">
          <div>
            <span className="text-[#757573] text-[10px] font-mono uppercase block">Nama Klien:</span>
            <span className="font-bold text-[#050505] text-sm block">Kedai Kopi Senja (3 Cabang)</span>
            <span className="text-[11px] text-[#757573]">Jakarta Selatan</span>
          </div>

          <div>
            <span className="text-[#757573] text-[10px] font-mono uppercase block">Lead Technical Architect:</span>
            <span className="font-bold text-[#050505] text-sm block">Budi Santoso, S.T.</span>
            <span className="text-[11px] text-[#757573]">Grizolabs Lead Engineer</span>
          </div>

          <div>
            <span className="text-[#757573] text-[10px] font-mono uppercase block">Tahap Pengerjaan:</span>
            <span className="font-bold text-[#050505] text-sm block">Sprint 3 (Integrasi Kasir)</span>
            <span className="text-[11px] text-emerald-700 font-bold">78% Progress</span>
          </div>

          <div>
            <span className="text-[#757573] text-[10px] font-mono uppercase block">Target Peluncuran:</span>
            <span className="font-bold text-[#050505] text-sm block">02 September 2026</span>
            <span className="text-[11px] text-[#757573]">Google Cloud Run SG</span>
          </div>
        </div>
      </div>

      {/* Main Workstation Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Milestone Sprint Tracker */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white border border-[#E9E9E7] rounded-sm p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-3">
              <h2 className="text-sm font-mono font-bold text-[#050505] uppercase flex items-center gap-2">
                <Activity className="w-4 h-4 text-black" />
                Tahapan Milestone & Dokumentasi Serah Terima
              </h2>
              <span className="font-mono text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-sm font-bold">
                Kemajuan Total: {overallProgress}%
              </span>
            </div>

            {/* Milestones List */}
            <div className="space-y-4">
              {milestones.map((m) => (
                <div
                  key={m.id}
                  className="bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm p-4 space-y-3 hover:border-black transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E9E9E7] pb-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-[#050505]">
                      {m.status === 'Completed' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      ) : m.status === 'In Progress' ? (
                        <Clock className="w-4 h-4 text-amber-600 animate-spin shrink-0" />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-[#757573] shrink-0"></span>
                      )}
                      <span>{m.title}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px]">
                      <span className="text-[#757573] font-mono">TARGET: {m.targetDate}</span>
                      <span
                        className={`px-2 py-0.5 rounded-sm text-[10px] font-bold font-mono ${
                          m.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : m.status === 'In Progress'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {m.status === 'Completed' ? 'SELESAI' : m.status === 'In Progress' ? 'PROSES' : 'MENDATANG'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-[#555553] leading-relaxed">{m.notes}</p>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-[#E9E9E7] text-xs">
                    <span className="text-[#757573] text-[11px]">Penanggung Jawab: {m.owner}</span>

                    {m.deliverableFile && (
                      <a
                        href={`#${m.deliverableFile}`}
                        onClick={(e) => {
                          e.preventDefault();
                          alert(`Membuka berkas serah terima: ${m.deliverableFile}`);
                        }}
                        className="bg-white border border-[#E9E9E7] text-[#050505] px-2.5 py-1 rounded-sm hover:bg-black hover:text-white transition-colors flex items-center gap-1.5 text-[11px] font-mono cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>{m.deliverableFile}</span>
                        <Download className="w-3 h-3 text-[#757573]" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scope Change Log & Request Engine */}
          <div className="bg-white border border-[#E9E9E7] rounded-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-3">
              <div>
                <h2 className="text-sm font-mono font-bold text-[#050505] uppercase">
                  Catatan Permintaan Tambahan Fitur
                </h2>
                <p className="text-xs text-[#555553]">Transparansi penuh jika ada perubahan scope di tengah jalan.</p>
              </div>

              <button
                onClick={() => setShowScopeModal(true)}
                id="btn-workstation-add-scope"
                className="bg-black text-white font-mono text-xs font-semibold px-3 py-1.5 rounded-sm hover:bg-neutral-800 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Tambah Request Fitur
              </button>
            </div>

            <div className="space-y-3">
              {scopeChanges.map((sc) => (
                <div
                  key={sc.id}
                  className="bg-[#F7F7F5] border border-[#E9E9E7] p-3.5 rounded-sm text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#050505]">{sc.title}</span>
                      <span className="text-[10px] bg-white border border-[#E9E9E7] px-1.5 py-0.5 rounded-sm text-emerald-800 font-mono font-semibold">
                        {sc.status}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#757573] block">
                      Diajukan tanggal {sc.date} oleh {sc.author}
                    </span>
                  </div>

                  <div className="text-right sm:text-right text-[11px] space-y-0.5 font-mono">
                    <div className="font-bold text-[#050505]">
                      +{sc.impactWeeks} Minggu | +Rp {sc.impactCostIDR.toLocaleString('id-ID')}
                    </div>
                    <span className="text-[#757573] text-[10px] font-sans">Dihitung Secara Transparan</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live System Activity & Code Audit Log */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#1B1B1B] text-white border border-black rounded-sm p-6 space-y-5 shadow-xs sticky top-24">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3 font-mono text-xs">
              <span className="text-neutral-400">AKTIVITAS SISTEM TEKNIS</span>
              <span className="text-emerald-400 font-bold">[REAL-TIME]</span>
            </div>

            <div className="space-y-3 font-mono text-xs text-neutral-300">
              <div className="border-l-2 border-emerald-400 pl-3 py-1 space-y-0.5">
                <span className="text-[10px] text-neutral-400 block">2026-08-11 10:42 WIB</span>
                <p className="text-white text-xs font-sans">
                  Pembaruan database Cloud SQL v1.4 selesai. Tabel <code>struk_penjualan</code> aktif.
                </p>
              </div>

              <div className="border-l-2 border-neutral-600 pl-3 py-1 space-y-0.5">
                <span className="text-[10px] text-neutral-400 block">2026-08-10 16:15 WIB</span>
                <p className="text-white text-xs font-sans">
                  Pengujian pembayaran QRIS Midtrans berhasil. 50 transaksi simulasi terverifikasi otomatis.
                </p>
              </div>

              <div className="border-l-2 border-neutral-600 pl-3 py-1 space-y-0.5">
                <span className="text-[10px] text-neutral-400 block">2026-08-09 11:20 WIB</span>
                <p className="text-white text-xs font-sans">
                  Fitur Kasir Offline PWA berhasil di-deploy ke server uji coba.
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-neutral-800 space-y-2">
              <span className="text-xs font-sans text-neutral-300 block">Link Akses Staging Server Uji Coba:</span>
              <a
                href="https://kopi-serenity-staging.grizolabs.app"
                target="_blank"
                rel="noreferrer"
                className="bg-neutral-900 border border-neutral-700 text-neutral-200 px-3 py-2 rounded-sm font-mono text-xs flex items-center justify-between hover:bg-neutral-800 transition-colors"
              >
                <span>kopi-serenity-staging.grizolabs.app</span>
                <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scope Change Modal */}
      {showScopeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-black rounded-sm max-w-md w-full p-6 space-y-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#E9E9E7] pb-3">
              <h3 className="font-mono text-sm font-bold text-[#050505] uppercase">
                Pengajuan Perubahan Scope Fitur
              </h3>
              <button
                onClick={() => setShowScopeModal(false)}
                className="text-xs font-mono text-[#757573] hover:text-black cursor-pointer"
              >
                ✕ Tutup
              </button>
            </div>

            <form onSubmit={handleAddScopeChange} className="space-y-4 text-xs font-sans">
              <div className="space-y-1">
                <label className="text-[#050505] font-medium block">Nama Fitur Tambahan</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  placeholder="Contoh: Tambah Integrasi Pesanan GrabFood"
                  className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs text-[#050505] focus:outline-none focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[#050505] font-medium block">Estimasi Waktu (Minggu)</label>
                  <input
                    type="number"
                    min={0}
                    max={4}
                    value={newImpactWeeks}
                    onChange={(e) => setNewImpactWeeks(Number(e.target.value))}
                    className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs font-mono text-[#050505] focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#050505] font-medium block">Biaya Tambahan (IDR)</label>
                  <input
                    type="number"
                    step={500000}
                    value={newImpactCost}
                    onChange={(e) => setNewImpactCost(Number(e.target.value))}
                    className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs font-mono text-[#050505] focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 font-mono">
                <button
                  type="button"
                  onClick={() => setShowScopeModal(false)}
                  className="px-3 py-2 bg-[#F7F7F5] text-[#050505] rounded-sm hover:bg-neutral-200 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-black text-white font-bold rounded-sm hover:bg-neutral-800 cursor-pointer"
                >
                  Kirim Request Fitur
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
