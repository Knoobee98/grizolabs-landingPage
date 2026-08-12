import React, { useState, useEffect } from 'react';
import { CheckCircle2, Calendar, Send, X, MessageSquare, Video, ExternalLink } from 'lucide-react';
import { ADMIN_CONFIG } from '../data/mockData';
import { AdminProject } from '../types';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: any;
  onAddProject?: (newProject: AdminProject) => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  initialData,
  onAddProject,
}) => {
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [channel, setChannel] = useState<'whatsapp' | 'meeting'>('whatsapp');
  const [preferredDate, setPreferredDate] = useState('2026-08-14');
  const [preferredTime, setPreferredTime] = useState('10:00 WIB (Pagi)');
  const [notes, setNotes] = useState('');

  const [isBooked, setIsBooked] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  useEffect(() => {
    if (isOpen && initialData) {
      if (initialData.projectName) {
        setBusinessName(initialData.projectName);
      }
      if (initialData.estimatedPrice) {
        setNotes(`Simulasi PRD: ${initialData.estimatedPrice} (${initialData.estimatedWeeks} Minggu)`);
      } else if (initialData.auditScore !== undefined) {
        setNotes(`Hasil Audit IT: Skor ${initialData.auditScore}% - ${initialData.maturityStage}`);
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleOpenWhatsAppAdmin = (refCode: string) => {
    const mediaText = channel === 'whatsapp' ? 'WhatsApp Chat/Call' : 'Zoom / Google Meet';
    const message = `Halo Tim ${ADMIN_CONFIG.companyName}, saya *${contactName}* dari *${businessName}*.\n\n` +
      `Saya ingin menjadwalkan konsultasi via *${mediaText}*:\n` +
      `- Kode Ref: *${refCode}*\n` +
      `- Tanggal: ${preferredDate}\n` +
      `- Jam: ${preferredTime}\n` +
      `- No. WA Saya: ${whatsapp}\n` +
      `- Email: ${email}\n` +
      (notes ? `- Catatan/Kebutuhan: ${notes}\n` : '') +
      `\nMohon konfirmasi dan kirimkan tautan ${channel === 'meeting' ? 'Zoom/GMeet' : 'diskusi'}. Terima kasih!`;

    const waUrl = `https://wa.me/${ADMIN_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `GZ-BOOK-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(ref);
    setIsBooked(true);

    if (onAddProject) {
      const now = new Date();
      const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
        now.getDate()
      ).padStart(2, '0')}`;

      const randomNum = Math.floor(100 + Math.random() * 900);
      const uniqueProjectId = `GZ-PRJ-${now.getFullYear()}-${randomNum}`;
      const generatedUuid = crypto.randomUUID ? crypto.randomUUID() : `uuid-${Date.now()}`;

      const newProject: AdminProject = {
        id: uniqueProjectId,
        uuid: generatedUuid,
        clientName: businessName || contactName || 'Klien Baru (Web Form)',
        projectName: initialData?.projectName || 'Custom Application & Consulting',
        package: initialData?.estimatedPrice ? 'Paket Custom PRD' : 'Paket Tumbuh (Standard)',
        status: 'In Progress',
        progressPercent: 5,
        startDate: formattedDate,
        targetDate: preferredDate || formattedDate,
        leadArchitect: 'Budi Santoso (Lead Architect)',
        budgetIDR: initialData?.estimatedPrice || 'Rp 5.000.000',
        currentMilestone: 'Phase 1: Sesi Konsultasi & Pengumpulan Data Bisnis',
        milestonesCount: { completed: 0, total: 5 },
        contactPhone: whatsapp.replace(/[^0-9]/g, '') || '6281290008822',
        notes: `Order via Form Web (${channel.toUpperCase()}). Kontak: ${contactName} (${whatsapp}). Sesi: ${preferredDate} ${preferredTime}. Catatan: ${notes || '-'}`,
      };

      onAddProject(newProject);
    }

    // Auto launch WhatsApp to Admin
    handleOpenWhatsAppAdmin(ref);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white border border-black rounded-sm max-w-lg w-full p-4 sm:p-6 md:p-8 space-y-5 shadow-xl relative my-4 sm:my-8 font-sans">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xs font-mono text-[#757573] hover:text-black cursor-pointer p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {!isBooked ? (
          <>
            <div className="space-y-2 border-b border-[#E9E9E7] pb-4">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 rounded-sm font-mono text-[10px] sm:text-[11px] text-emerald-800 font-semibold">
                <Calendar className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                <span className="hidden sm:inline">KONSULTASI GRATIS VIA WHATSAPP & ZOOM / GOOGLE MEET</span>
                <span className="sm:hidden">KONSULTASI GRATIS</span>
              </div>
              <h2 className="text-xl font-bold text-[#050505] tracking-tight">
                Diskusi Kebutuhan Software UMKM Anda
              </h2>
              <p className="text-xs text-[#555553] leading-relaxed">
                Pilih media diskusi yang Anda inginkan: Chat/Call langsung via <strong>WhatsApp</strong> atau pertemuan tatap muka online via <strong>Zoom / Google Meet</strong>.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
              {/* Channel Selector */}
              <div className="space-y-1">
                <label className="text-[#050505] font-medium block">Pilihan Media Diskusi</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setChannel('whatsapp')}
                    className={`p-3 border rounded-sm flex items-center gap-2 transition-all cursor-pointer text-left ${
                      channel === 'whatsapp'
                        ? 'bg-black text-white border-black shadow-2xs'
                        : 'bg-[#F7F7F5] border-[#E9E9E7] text-[#050505] hover:border-black'
                    }`}
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <div>
                      <div className="font-bold text-xs">WhatsApp Chat / Call</div>
                      <div className={`text-[10px] ${channel === 'whatsapp' ? 'text-neutral-300' : 'text-[#757573]'}`}>
                        Respon Cepat & Santai
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setChannel('meeting')}
                    className={`p-3 border rounded-sm flex items-center gap-2 transition-all cursor-pointer text-left ${
                      channel === 'meeting'
                        ? 'bg-black text-white border-black shadow-2xs'
                        : 'bg-[#F7F7F5] border-[#E9E9E7] text-[#050505] hover:border-black'
                    }`}
                  >
                    <Video className="w-4 h-4 shrink-0" />
                    <div>
                      <div className="font-bold text-xs">Zoom / Google Meet</div>
                      <div className={`text-[10px] ${channel === 'meeting' ? 'text-neutral-300' : 'text-[#757573]'}`}>
                        Tatap Muka & Demo Live
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#050505] font-medium block">Nama Usaha / Toko</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    placeholder="Contoh: Kopi Senja"
                    className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs text-[#050505] focus:outline-none focus:border-black"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#050505] font-medium block">Nama Anda</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    required
                    placeholder="Contoh: Hendra (Owner)"
                    className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs text-[#050505] focus:outline-none focus:border-black"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#050505] font-medium block">No. WhatsApp Active</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    required
                    placeholder="0812-XXXX-XXXX"
                    className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs text-[#050505] focus:outline-none focus:border-black font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#050505] font-medium block">Email Usaha</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="nama@email.com"
                    className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs text-[#050505] focus:outline-none focus:border-black font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[#050505] font-medium block">Pilihan Tanggal</label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    required
                    className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs text-[#050505] focus:outline-none focus:border-black font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[#050505] font-medium block">Pilihan Jam Diskusi</label>
                  <select
                    value={preferredTime}
                    onChange={(e) => setPreferredTime(e.target.value)}
                    className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs text-[#050505] focus:outline-none focus:border-black font-sans"
                  >
                    <option value="10:00 WIB (Pagi)">10:00 WIB (Pagi)</option>
                    <option value="14:00 WIB (Siang)">14:00 WIB (Siang)</option>
                    <option value="16:30 WIB (Sore)">16:30 WIB (Sore)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[#050505] font-medium block">Catatan / Kebutuhan Khusus</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  placeholder="Ceritakan fitur apa yang ingin Anda tanyakan..."
                  className="w-full bg-[#F7F7F5] border border-[#E9E9E7] rounded-sm p-2.5 text-xs text-[#050505] focus:outline-none focus:border-black resize-none"
                />
              </div>

              <button
                type="submit"
                id="btn-confirm-booking"
                className="w-full bg-black text-white font-mono text-xs font-bold py-3 px-4 rounded-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs mt-2"
              >
                Konfirmasi Diskusi {channel === 'whatsapp' ? 'WhatsApp' : 'Zoom / Google Meet'}
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-5 py-4 font-sans">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-2xs">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="font-mono text-xs text-emerald-800 font-bold uppercase">JADWAL TERKONFIRMASI</span>
              <h2 className="text-2xl font-extrabold text-[#050505] tracking-tight font-mono">
                Kode Ref: {bookingRef}
              </h2>
              <p className="text-xs text-[#555553] max-w-sm mx-auto leading-relaxed">
                Terima kasih, <strong>{contactName}</strong>! Tim Software Architect Grizolabs akan menghubungi Anda melalui <strong>{channel === 'whatsapp' ? 'WhatsApp Chat/Call' : 'WhatsApp untuk mengirimkan undangan Google Meet/Zoom'}</strong> (<strong>{whatsapp}</strong>) pada tanggal <strong>{preferredDate} jam {preferredTime}</strong>.
              </p>
            </div>

            <div className="bg-[#F7F7F5] border border-[#E9E9E7] p-4 rounded-sm text-left text-xs space-y-1">
              <div className="flex justify-between text-[#555553]">
                <span>Nama Usaha:</span>
                <span className="font-bold text-[#050505]">{businessName}</span>
              </div>
              <div className="flex justify-between text-[#555553]">
                <span>Media Konsultasi:</span>
                <span className="font-bold text-[#050505]">
                  {channel === 'whatsapp' ? 'WhatsApp Chat / Call' : 'Zoom / Google Meet'}
                </span>
              </div>
              <div className="flex justify-between text-[#555553]">
                <span>Konsultan Pendamping:</span>
                <span className="font-bold text-[#050505]">Budi Santoso, S.T.</span>
              </div>
            </div>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => handleOpenWhatsAppAdmin(bookingRef)}
                className="w-full bg-emerald-600 text-white font-mono text-xs font-bold py-2.5 px-4 rounded-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
              >
                <span>Buka WhatsApp Admin ({ADMIN_CONFIG.whatsappFormatted})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setIsBooked(false);
                  onClose();
                }}
                className="w-full bg-[#F7F7F5] border border-[#D3D3D2] text-[#050505] font-mono text-xs font-semibold py-2.5 px-4 rounded-sm hover:bg-neutral-200 cursor-pointer"
              >
                Tutup Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
