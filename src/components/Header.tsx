import React, { useRef, useState, useEffect } from 'react';
import { ActiveTab } from '../types';
import { Terminal, FileCode2, ShieldCheck, LayoutDashboard, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenConsultationModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenConsultationModal,
}) => {
  const navRef = useRef<HTMLInputElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    if (navRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navRef.current;
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const scrollNav = (direction: 'left' | 'right') => {
    if (navRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      navRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const navItems: { id: ActiveTab; label: string; number: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Layanan & Paket', number: '01', icon: <Terminal className="w-4 h-4" /> },
    { id: 'prd-estimator', label: 'Estimasi Biaya PRD', number: '02', icon: <FileCode2 className="w-4 h-4" /> },
    { id: 'diagnostic', label: 'Audit IT UMKM', number: '03', icon: <ShieldCheck className="w-4 h-4 text-emerald-600" /> },
    { id: 'admin', label: 'Admin Dashboard', number: '04', icon: <LayoutDashboard className="w-4 h-4 text-amber-500" /> },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#E9E9E7] no-print shadow-2xs">
      {/* Primary Brand & Navigation Bar */}
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 py-3 flex flex-col lg:flex-row items-center justify-between gap-3">
        {/* Brand Logotype */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className="flex items-center gap-3 group text-left focus:outline-none cursor-pointer"
            id="btn-brand-home"
          >
            <div className="w-9 h-9 bg-black text-white rounded-sm flex items-center justify-center font-mono font-bold text-lg tracking-tighter group-hover:bg-neutral-800 transition-colors shadow-xs">
              GZ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg tracking-tight font-sans text-[#050505]">GRIZOLABS</span>
              </div>
              <p className="text-[11px] font-sans text-[#757573] tracking-tight">
                Mitra Software & Konsultan IT Terpercaya
              </p>
            </div>
          </button>

          <button
            onClick={onOpenConsultationModal}
            className="lg:hidden text-xs font-mono font-bold bg-black text-white px-3 py-2 rounded-sm hover:bg-neutral-800 transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
            id="btn-consult-mobile"
          >
            Konsultasi
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Scrollable Tab Navigation Bar */}
        <div className="relative w-full lg:w-auto flex items-center border-t lg:border-t-0 border-[#E9E9E7] pt-2 lg:pt-0">
          {/* Scroll Left Button Indicator */}
          {canScrollLeft && (
            <button
              onClick={() => scrollNav('left')}
              aria-label="Scroll Nav Left"
              className="absolute left-0 z-10 bg-white/90 border border-[#E9E9E7] p-1 rounded-full shadow-md text-[#050505] hover:bg-black hover:text-white transition-colors cursor-pointer flex items-center justify-center -ml-2"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}

          <nav
            ref={navRef}
            onScroll={checkScroll}
            className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1.5 lg:pb-0 scroll-smooth no-scrollbar scrollbar-none px-1"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  id={`tab-nav-${item.id}`}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-sm text-xs transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-black text-white font-semibold shadow-xs ring-1 ring-black'
                      : 'bg-[#F7F7F5] text-[#050505] hover:bg-[#EEEEEE] border border-[#E9E9E7]'
                  }`}
                >
                  <span className={`font-mono ${isActive ? 'text-neutral-400' : 'text-[#757573]'}`}>{item.number}.</span>
                  {item.icon}
                  <span className="font-sans text-xs">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Scroll Right Button Indicator */}
          {canScrollRight && (
            <button
              onClick={() => scrollNav('right')}
              aria-label="Scroll Nav Right"
              className="absolute right-0 z-10 bg-white/90 border border-[#E9E9E7] p-1 rounded-full shadow-md text-[#050505] hover:bg-black hover:text-white transition-colors cursor-pointer flex items-center justify-center -mr-2"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Desktop Call To Action */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={onOpenConsultationModal}
            id="btn-consult-desktop"
            className="text-xs font-mono font-bold bg-black text-white px-4 py-2.5 rounded-sm hover:bg-neutral-800 transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-[0.98]"
          >
            Konsultasi WA / Zoom
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
