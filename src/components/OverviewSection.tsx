import React, { useState } from 'react';
import { ActiveTab, ServiceItem } from '../types';
import { SERVICES_DATA, CASE_STUDIES, OFFICIAL_PACKAGES } from '../data/mockData';
import { HeroIllustration } from './HeroIllustration';
import { 
  ArrowRight, 
  CheckCircle2, 
  Database, 
  MessageSquare, 
  Smartphone, 
  Server, 
  ShieldCheck, 
  Zap, 
  Terminal,
  Cpu,
  Layers,
  Building2,
  Sparkles,
  HeartHandshake
} from 'lucide-react';

interface OverviewSectionProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenConsultationModal: (data?: any) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({
  setActiveTab,
  onOpenConsultationModal,
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<'fnb' | 'retail' | 'logistics'>('fnb');

  return (
    <div className="space-y-12 md:space-y-16">
      {/* Friendly Editorial Hero Section */}
      <section className="bg-white border border-[#E9E9E7] rounded-sm p-6 md:p-10 relative overflow-hidden shadow-2xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-sm font-sans text-xs text-emerald-800 font-medium">
              <HeartHandshake className="w-3.5 h-3.5 text-emerald-600" />
              Bantu UMKM Indonesia Naik Kelas Tanpa Pusing Teknologi
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#050505] leading-[1.18]">
              Website & Aplikasi Web Profesional dengan Harga Pas di Kantong.
            </h1>

            <p className="text-base md:text-lg text-[#555553] leading-relaxed max-w-2xl">
              Lahir dari pengalaman mengelola bisnis <strong>Grizo Coffee & Barber</strong>, Grizolabs paham betul kebutuhan UMKM: sistem yang simpel, cepat, tidak ribet, dan harga yang transparan. Mulai dari Company Profile hingga Kasir POS & Otomatisasi WhatsApp!
            </p>

            <div className="pt-2 space-y-3">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setActiveTab('prd-estimator')}
                  id="btn-hero-prd-scope"
                  className="bg-black text-white px-5 py-3 rounded-sm text-xs font-mono font-bold hover:bg-neutral-800 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  Simulasi Fitur & Biaya
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenConsultationModal()}
                  id="btn-hero-strategy-session"
                  className="bg-emerald-600 text-white px-5 py-3 rounded-sm text-xs font-mono font-bold hover:bg-emerald-700 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  Konsultasi WA / Zoom & Meet
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-1">
                <button
                  onClick={() => setActiveTab('diagnostic')}
                  id="btn-hero-diagnostic"
                  className="text-xs font-mono font-semibold text-[#555553] hover:text-emerald-700 underline underline-offset-4 flex items-center gap-1.5 transition-colors cursor-pointer group"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  <span>Atau ikuti Audit Kesehatan IT UMKM (5 Menit)</span>
                  <ArrowRight className="w-3 h-3 text-emerald-600" />
                </button>
              </div>
            </div>
          </div>

          {/* Hero Cartoon Vector Illustration */}
          <div className="lg:col-span-5 w-full">
            <HeroIllustration />
          </div>
        </div>

        {/* Quick Value Points Ribbon */}
        <div className="mt-8 pt-6 border-t border-[#E9E9E7] grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-[#757573] text-[11px] uppercase tracking-wider block font-sans">Harga Beli Sekali</span>
            <span className="text-lg font-bold text-[#050505] block">Mulai 1,5 Juta</span>
            <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-sans">
              <CheckCircle2 className="w-3.5 h-3.5" /> Tanpa Biaya Bulanan
            </span>
          </div>

          <div className="space-y-1">
            <span className="text-[#757573] text-[11px] uppercase tracking-wider block font-sans">Proses Cepat</span>
            <span className="text-lg font-bold text-[#050505] block">1 – 3 Minggu</span>
            <span className="text-[11px] text-[#757573] font-sans">Langsung Siap Pakai</span>
          </div>

          <div className="space-y-1">
            <span className="text-[#757573] text-[11px] uppercase tracking-wider block font-sans">Kepemilikan Sistem</span>
            <span className="text-lg font-bold text-[#050505] block">100% Milik Anda</span>
            <span className="text-[11px] text-[#757573] font-sans">Kode & Database Bebas</span>
          </div>

          <div className="space-y-1">
            <span className="text-[#757573] text-[11px] uppercase tracking-wider block font-sans">Dukungan Garansi</span>
            <span className="text-lg font-bold text-[#050505] block">Bebas Khawatir</span>
            <span className="text-[11px] text-[#757573] font-sans">Gratis Domain & Hosting 1 Thn</span>
          </div>
        </div>
      </section>

      {/* Official Package Tier Comparison Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#E9E9E7] pb-4">
          <div>
            <div className="text-xs font-mono text-emerald-700 font-semibold uppercase tracking-wider block mb-1">
              PAKET RESMI & TRANSPARAN
            </div>
            <h2 className="text-2xl font-bold text-[#050505] tracking-tight">
              Pilihan Paket Yang Pas Sesuai Skala Bisnis Anda
            </h2>
          </div>
          <p className="text-xs text-[#666664] max-w-md leading-relaxed font-sans">
            Tidak perlu bayar mahal untuk fitur yang belum Anda butuhkan. Anda bisa mulai dari paket paling simpel dan berkembang kapan saja!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {OFFICIAL_PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white border ${
                pkg.popular ? 'border-black ring-2 ring-black shadow-sm' : 'border-[#E9E9E7]'
              } rounded-sm p-6 space-y-5 hover:border-black transition-all flex flex-col justify-between`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-[10px] px-2.5 py-0.5 rounded-sm font-bold uppercase tracking-wider ${
                    pkg.popular ? 'bg-black text-white' : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  }`}>
                    {pkg.badge}
                  </span>
                  <span className="font-mono text-[11px] text-[#757573]">EST. {pkg.timeframe}</span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-[#050505]">{pkg.name}</h3>
                  <p className="text-xs text-[#666664] font-sans mt-1 leading-snug">{pkg.target}</p>
                </div>

                <div className="pt-2 border-t border-[#E9E9E7]">
                  <span className="text-[10px] font-sans text-[#757573] block uppercase font-medium">Investasi Proyek:</span>
                  <div className="text-2xl font-extrabold font-mono text-[#050505]">{pkg.priceRange}</div>
                </div>

                <div className="space-y-2 pt-2 border-t border-[#E9E9E7]">
                  <span className="font-sans text-[11px] text-[#757573] uppercase block font-bold">Apa Yang Anda Dapatkan:</span>
                  <ul className="space-y-2 text-xs">
                    {pkg.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[#050505] leading-snug">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E9E9E7]">
                <button
                  onClick={() =>
                    onOpenConsultationModal({
                      projectName: pkg.name,
                      estimatedPrice: pkg.priceRange,
                      estimatedWeeks: pkg.timeframe,
                    })
                  }
                  id={`btn-select-package-${pkg.id}`}
                  className={`w-full py-2.5 px-4 font-mono text-xs font-bold rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2 ${
                    pkg.popular
                      ? 'bg-black text-white hover:bg-neutral-800'
                      : 'bg-[#F7F7F5] text-[#050505] border border-[#D3D3D2] hover:bg-black hover:text-white'
                  }`}
                >
                  Pilih {pkg.name}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Services Breakdown Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#E9E9E7] pb-4">
          <div>
            <div className="text-xs font-mono text-emerald-700 font-semibold uppercase tracking-wider block mb-1">
              KATALOG MODUL SPESIFIK
            </div>
            <h2 className="text-2xl font-bold text-[#050505] tracking-tight">
              Modul Layanan Siap Pasang Sesuai Kebutuhan
            </h2>
          </div>
          <span className="font-mono text-xs text-[#757573]">PILIH MODUL & PRAKTIS DITAMBAHKAN</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <div
              key={service.id}
              className={`bg-white border ${
                service.featured ? 'border-black ring-1 ring-black' : 'border-[#E9E9E7]'
              } rounded-sm p-6 space-y-4 hover:border-black transition-all flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] bg-[#F7F7F5] border border-[#E9E9E7] text-[#050505] px-2 py-0.5 rounded-sm">
                    {service.code}
                  </span>
                  {service.featured && (
                    <span className="font-mono text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-sm uppercase font-semibold tracking-wider">
                      Favorit UMKM
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-[#050505] leading-snug">{service.title}</h3>
                <p className="text-xs font-sans text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-sm">{service.tagline}</p>
                <p className="text-xs text-[#555553] leading-relaxed">{service.description}</p>

                <div className="pt-3 border-t border-[#E9E9E7] space-y-2">
                  <span className="font-sans text-[11px] text-[#757573] uppercase block font-semibold">Hasil Fitur:</span>
                  <ul className="space-y-1.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="text-xs text-[#050505] flex items-start gap-2">
                        <span className="text-emerald-600 font-bold select-none">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E9E9E7] flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-[10px] font-sans text-[#757573] block">Estimasi Mulai Dari:</span>
                  <span className="font-bold text-[#050505] text-sm">{service.startingPriceIDR}</span>
                </div>
                <button
                  onClick={() => setActiveTab('prd-estimator')}
                  className="bg-[#F7F7F5] border border-[#D3D3D2] text-[#050505] px-3 py-1.5 rounded-sm hover:bg-black hover:text-white transition-colors cursor-pointer text-[11px] font-semibold"
                >
                  Hitung Fitur →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive System Architecture Topology Explorer */}
      <section className="bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#E9E9E7] pb-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-emerald-700 font-semibold uppercase tracking-wider mb-1">
              <Terminal className="w-4 h-4 text-emerald-700" />
              ALUR KERJA SISTEM OTO
            </div>
            <h2 className="text-xl font-bold text-[#050505] tracking-tight">Bagaimana Sistem Bekerja Otomatis?</h2>
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 border border-[#E9E9E7] rounded-sm font-mono text-xs overflow-x-auto">
            <button
              onClick={() => setSelectedIndustry('fnb')}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                selectedIndustry === 'fnb' ? 'bg-black text-white font-medium' : 'text-[#757573] hover:text-[#050505]'
              }`}
            >
              Kafe & Resto (F&B)
            </button>
            <button
              onClick={() => setSelectedIndustry('retail')}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                selectedIndustry === 'retail' ? 'bg-black text-white font-medium' : 'text-[#757573] hover:text-[#050505]'
              }`}
            >
              Toko / Retail Online
            </button>
            <button
              onClick={() => setSelectedIndustry('logistics')}
              className={`px-3 py-1.5 rounded-sm transition-colors cursor-pointer whitespace-nowrap ${
                selectedIndustry === 'logistics' ? 'bg-black text-white font-medium' : 'text-[#757573] hover:text-[#050505]'
              }`}
            >
              Barbershop & Jasa
            </button>
          </div>
        </div>

        {/* Dynamic Topology Flow Visualization */}
        <div className="bg-white border border-[#E9E9E7] rounded-sm p-5 md:p-6 space-y-5">
          <div className="text-xs font-mono text-[#757573] flex items-center justify-between border-b border-[#E9E9E7] pb-3">
            <span>ALUR OPERASIONAL INTEGRASI REAL-TIME</span>
            <span className="text-emerald-600 font-semibold font-sans">[PRAKTIS & LENGKAP]</span>
          </div>

          {selectedIndustry === 'fnb' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#050505]">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  01. Kasir Tablet POS
                </div>
                <p className="text-[11px] text-[#555553] font-sans leading-relaxed">
                  Kasir melayani pelanggan via tablet/HP. Tetap bisa catat transaksi meski koneksi internet terputus.
                </p>
                <div className="bg-white border border-[#E9E9E7] p-1.5 text-[10px] text-[#050505] font-mono">
                  Layar Kasir Cepat & Ringan
                </div>
              </div>

              <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#050505]">
                  <Server className="w-4 h-4 text-emerald-600" />
                  02. Server Pengurang Stok
                </div>
                <p className="text-[11px] text-[#555553] font-sans leading-relaxed">
                  Tiap pesanan masuk langsung memotong stok bahan baku (kopi, susu, sirup) secara otomatis.
                </p>
                <div className="bg-white border border-[#E9E9E7] p-1.5 text-[10px] text-[#050505] font-mono">
                  Potong Stok Baku Akurat
                </div>
              </div>

              <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#050505]">
                  <Database className="w-4 h-4 text-emerald-600" />
                  03. Cloud Database Rekap
                </div>
                <p className="text-[11px] text-[#555553] font-sans leading-relaxed">
                  Laporan Omzet & Laba Bersih tersimpan aman. Owner bisa pantau dari HP dari mana saja.
                </p>
                <div className="bg-white border border-[#E9E9E7] p-1.5 text-[10px] text-[#050505] font-mono">
                  Akses Omzet 24/7
                </div>
              </div>

              <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#050505]">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  04. Bot WA Laporan Malam
                </div>
                <p className="text-[11px] text-[#555553] font-sans leading-relaxed">
                  Tiap jam tutup toko, ringkasan omzet dan peringatan stok menipis dikirim otomatis ke WhatsApp Anda!
                </p>
                <div className="bg-white border border-[#E9E9E7] p-1.5 text-[10px] text-[#050505] font-mono">
                  Rekap Otomatis WA
                </div>
              </div>
            </div>
          )}

          {selectedIndustry === 'retail' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#050505]">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  01. Katalog Produk WA
                </div>
                <p className="text-[11px] text-[#555553] font-sans leading-relaxed">
                  Pembeli pilih barang dari link katalog interaktif tanpa perlu admin ketik stok berulang kali.
                </p>
              </div>
              <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#050505]">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  02. Kunci Stok Otomatis
                </div>
                <p className="text-[11px] text-[#555553] font-sans leading-relaxed">
                  Barang dikunci selama 15 menit agar tidak diserobot pembeli lain selama alur pembayaran.
                </p>
              </div>
              <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#050505]">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  03. Payment Dynamic QRIS
                </div>
                <p className="text-[11px] text-[#555553] font-sans leading-relaxed">
                  Pembeli bayar pakai QRIS / Transfer. Sistem memverifikasi lunas secara otomatis tanpa perlu kirim struk foto.
                </p>
              </div>
              <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#050505]">
                  <Building2 className="w-4 h-4 text-emerald-600" />
                  04. Cetak Resi Gudang
                </div>
                <p className="text-[11px] text-[#555553] font-sans leading-relaxed">
                  Resi alamat tercetak di gudang, dan nomor resi pengiriman otomatis terkirim ke WhatsApp pembeli.
                </p>
              </div>
            </div>
          )}

          {selectedIndustry === 'logistics' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#050505]">
                  <Smartphone className="w-4 h-4 text-emerald-600" />
                  01. Jadwal Booking Online
                </div>
                <p className="text-[11px] text-[#555553] font-sans leading-relaxed">
                  Pelanggan memilih slot jam barber/dokter yang masih kosong secara mandiri dari website.
                </p>
              </div>
              <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#050505]">
                  <Server className="w-4 h-4 text-emerald-600" />
                  02. Cegah Anti Bentrok
                </div>
                <p className="text-[11px] text-[#555553] font-sans leading-relaxed">
                  Sistem langsung menutup kuota jam tersebut agar tidak ada 2 orang memesan di jam yang sama.
                </p>
              </div>
              <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#050505]">
                  <Database className="w-4 h-4 text-emerald-600" />
                  03. Rekam Pelanggan
                </div>
                <p className="text-[11px] text-[#555553] font-sans leading-relaxed">
                  Catatan potongan favorit atau histori treatment tersimpan rapi untuk kunjungan berikutnya.
                </p>
              </div>
              <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#050505]">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  04. Pengingat WA H-1
                </div>
                <p className="text-[11px] text-[#555553] font-sans leading-relaxed">
                  Pelanggan otomatis menerima pesan WhatsApp pengingat 1 jam sebelum jadwal tiba!
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Real-World UMKM Case Studies Section */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 border-b border-[#E9E9E7] pb-4">
          <div>
            <div className="text-xs font-mono text-emerald-700 font-semibold uppercase tracking-wider block mb-1">
              CERITA BUKTI NYATA
            </div>
            <h2 className="text-2xl font-bold text-[#050505] tracking-tight">
              UMKM Yang Telah Tumbuh Bersama Kami
            </h2>
          </div>
          <span className="font-mono text-xs text-[#757573]">HASIL TERUKUR & NYATA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => (
            <div
              key={study.id}
              className="bg-white border border-[#E9E9E7] rounded-sm p-6 space-y-4 hover:border-black transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-mono text-[#757573]">
                  <span>{study.industry}</span>
                  <span>{study.location}</span>
                </div>
                <h3 className="text-lg font-bold text-[#050505]">{study.clientName}</h3>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <p className="text-[#666664] leading-relaxed">
                  <strong className="text-[#050505]">Tantangan:</strong> {study.challenge}
                </p>
                <p className="text-[#050505] leading-relaxed">
                  <strong>Solusi Grizolabs:</strong> {study.solution}
                </p>
              </div>

              {/* Metric Highlights */}
              <div className="grid grid-cols-3 gap-1.5 pt-3 border-t border-[#E9E9E7] font-mono text-center">
                {study.results.map((res, idx) => (
                  <div key={idx} className="bg-emerald-50/60 p-1.5 rounded-sm border border-emerald-100">
                    <span className="block font-extrabold text-xs md:text-sm text-emerald-900">{res.metric}</span>
                    <span className="block text-[8px] md:text-[9px] text-emerald-700 leading-tight font-sans mt-0.5">{res.label}</span>
                  </div>
                ))}
              </div>

              {/* Stack Tags */}
              <div className="pt-2 flex flex-wrap gap-1 font-mono text-[10px]">
                {study.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="bg-[#F7F7F5] border border-[#E9E9E7] text-[#050505] px-1.5 py-0.5 rounded-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
