import React from 'react';
import { ActiveTab } from '../types';
import { Terminal, ShieldCheck, FileText, ArrowUp, HeartHandshake } from 'lucide-react';
import { ADMIN_CONFIG } from '../data/mockData';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  onOpenConsultationModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenConsultationModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-[#E9E9E7] pt-12 pb-8 mt-20 no-print font-sans">
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Brand & Mission Statement */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-black text-white rounded-sm flex items-center justify-center font-mono font-bold text-base shadow-2xs">
                GZ
              </div>
              <span className="font-bold text-lg tracking-tight font-sans text-[#050505]">GRIZOLABS</span>
            </div>

            <p className="text-xs text-[#555553] leading-relaxed max-w-sm">
              Grizolabs adalah divisi konsultan IT & pengembang software kustom dari Grizo Group. Kami berkomitmen membantu UMKM Indonesia memiliki sistem digital sendiri yang hemat, transparan, dan tanpa ketergantungan biaya langganan bulanan.
            </p>

            <div className="text-xs text-[#555553] space-y-1">
              <div>📍 Kantor: {ADMIN_CONFIG.address}</div>
              <div>✉ Email: {ADMIN_CONFIG.email}</div>
              <div>💬 WhatsApp: {ADMIN_CONFIG.whatsappFormatted}</div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3 font-sans text-xs">
            <span className="font-bold text-[#050505] uppercase block tracking-wider font-mono">
              Menu Navigasi
            </span>
            <ul className="space-y-2 text-[#555553]">
              <li>
                <button onClick={() => setActiveTab('overview')} className="hover:text-black cursor-pointer text-left">
                  01. Layanan & Garansi UMKM
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('prd-estimator')} className="hover:text-black cursor-pointer text-left">
                  02. Simulasi Kebutuhan (PRD)
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('diagnostic')} className="hover:text-black cursor-pointer text-left">
                  03. Audit Kesehatan IT (5 Menit)
                </button>
              </li>
              <li>
                <button onClick={onOpenConsultationModal} className="hover:text-black cursor-pointer text-left font-semibold text-black">
                  💬 Konsultasi WA / Zoom & Meet
                </button>
              </li>
            </ul>
          </div>

          {/* Service Guarantees & SLA */}
          <div className="md:col-span-4 space-y-3 text-xs">
            <span className="font-bold text-[#050505] uppercase block tracking-wider font-mono">
              Komitmen Layanan
            </span>
            <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#050505]">
                <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>100% Hak Milik Source Code & Data</span>
              </div>
              <div className="flex items-center gap-2 text-[#050505]">
                <Terminal className="w-4 h-4 text-black shrink-0" />
                <span>Bebas Biaya Sewa Aplikasi Bulanan</span>
              </div>
              <div className="flex items-center gap-2 text-[#050505]">
                <FileText className="w-4 h-4 text-neutral-800 shrink-0" />
                <span>Garansi Biaya & Waktu Pengerjaan Pasti</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-6 border-t border-[#E9E9E7] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#757573]">
          <div>
            © {new Date().getFullYear()} Grizolabs IT Consulting. Hak Cipta Dilindungi.
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px]">Ditenagai React 19 + Express + Gemini AI Studio</span>
            <button
              onClick={scrollToTop}
              className="bg-[#F7F7F5] border border-[#E9E9E7] p-1.5 rounded-sm hover:bg-black hover:text-white transition-colors cursor-pointer"
              title="Kembali ke atas"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
