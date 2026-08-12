import React, { useState } from 'react';
import { ActiveTab, AdminProject, ClientComplaint } from './types';
import { Header } from './components/Header';
import { OverviewSection } from './components/OverviewSection';
import { PrdEstimator } from './components/PrdEstimator';
import { ITDiagnostic } from './components/ITDiagnostic';
import { AdminDashboard } from './components/AdminDashboard';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';
import { INITIAL_ADMIN_PROJECTS, INITIAL_CLIENT_COMPLAINTS } from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isConsultModalOpen, setIsConsultModalOpen] = useState(false);
  const [consultationInitialData, setConsultationInitialData] = useState<any>(null);

  // Admin Portal State
  const [adminProjects, setAdminProjects] = useState<AdminProject[]>(INITIAL_ADMIN_PROJECTS);
  const [clientComplaints, setClientComplaints] = useState<ClientComplaint[]>(INITIAL_CLIENT_COMPLAINTS);

  const handleOpenConsultModal = (data?: any) => {
    if (data) {
      setConsultationInitialData(data);
    }
    setIsConsultModalOpen(true);
  };

  const handleUpdateProject = (updatedProject: AdminProject) => {
    setAdminProjects((prev) => prev.map((p) => (p.id === updatedProject.id ? updatedProject : p)));
  };

  const handleUpdateComplaint = (updatedComplaint: ClientComplaint) => {
    setClientComplaints((prev) => prev.map((c) => (c.id === updatedComplaint.id ? updatedComplaint : c)));
  };

  const handleAddComplaint = (newComplaint: ClientComplaint) => {
    setClientComplaints((prev) => [newComplaint, ...prev]);
  };

  const handleAddProject = (newProject: AdminProject) => {
    setAdminProjects((prev) => [newProject, ...prev]);
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
            <PrdEstimator
              onOpenConsultationModal={(data) => handleOpenConsultModal(data)}
            />
          )}

          {activeTab === 'diagnostic' && (
            <ITDiagnostic
              onOpenConsultationModal={(data) => handleOpenConsultModal(data)}
            />
          )}

          {activeTab === 'admin' && (
            <AdminDashboard
              projects={adminProjects}
              onUpdateProject={handleUpdateProject}
              complaints={clientComplaints}
              onUpdateComplaint={handleUpdateComplaint}
              onAddComplaint={handleAddComplaint}
              onAddProject={handleAddProject}
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
          onAddProject={handleAddProject}
        />
      </div>
    </div>
  );
}

