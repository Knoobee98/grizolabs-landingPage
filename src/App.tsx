import React, { useState, lazy, Suspense } from 'react';
import { ActiveTab } from './types';
import { Header } from './components/Header';
import { OverviewSection } from './components/OverviewSection';
import { ITDiagnostic } from './components/ITDiagnostic';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { usePathname } from './hooks/usePathname';
import { Loader2 } from 'lucide-react';

const AuthLogin = lazy(() => import('./components/auth/AuthLogin').then(m => ({ default: m.AuthLogin })));
const AdminPage = lazy(() => import('./components/admin/AdminPage').then(m => ({ default: m.AdminPage })));
const PrdEstimator = lazy(() => import('./components/PrdEstimator').then(m => ({ default: m.PrdEstimator })));

function RouteLoading() {
  return (
    <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center p-4">
      <div className="flex items-center gap-2 text-xs font-mono text-[#555553]">
        <Loader2 className="w-4 h-4 animate-spin text-black" />
        <span>Memuat halaman...</span>
      </div>
    </div>
  );
}

export default function App() {
  const pathname = usePathname();

  // Login route
  if (pathname === '/login') {
    return (
      <Suspense fallback={<RouteLoading />}>
        <AuthLogin />
      </Suspense>
    );
  }

  // Admin route (protected)
  if (pathname === '/admin' || pathname.startsWith('/admin/')) {
    return (
      <Suspense fallback={<RouteLoading />}>
        <AdminPage />
      </Suspense>
    );
  }

  return <LandingPage />;
}

export function LandingPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultationInitialData, setConsultationInitialData] = useState<any>(null);

  const handleOpenConsultModal = (data?: any) => {
    if (data) {
      setConsultationInitialData(data);
    }
    setIsConsultModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#050505] font-sans flex flex-col justify-between selection:bg-black selection:text-white">
      <div>
        {/* Top Sticky Header */}
        <div className="no-print">
          <Header
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenConsultationModal={() => handleOpenConsultModal()}
          />
        </div>

        {/* Main Content Area */}
        <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 md:py-12">
          {activeTab === 'overview' && (
            <OverviewSection
              setActiveTab={setActiveTab}
              onOpenConsultationModal={() => handleOpenConsultModal()}
            />
          )}

          {activeTab === 'prd-estimator' && (
            <Suspense fallback={<RouteLoading />}>
              <PrdEstimator
                onOpenConsultationModal={(data) => handleOpenConsultModal(data)}
              />
            </Suspense>
          )}

          {activeTab === 'diagnostic' && (
            <ITDiagnostic
              onOpenConsultationModal={(data) => handleOpenConsultModal(data)}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <div className="no-print">
        <Footer
          setActiveTab={setActiveTab}
          onOpenConsultationModal={() => handleOpenConsultModal()}
        />
      </div>

      {/* Strategy Consultation Booking Modal */}
      <div className="no-print">
        <ConsultationModal
          isOpen={isConsultModalOpen}
          onClose={() => {
            setIsConsultModalOpen(false);
            setConsultationInitialData(null);
          }}
          initialData={consultationInitialData}
        />
      </div>
    </div>
  );
}