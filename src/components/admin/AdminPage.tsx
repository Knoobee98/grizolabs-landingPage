import React, { useState } from 'react';
import { AdminProject, ClientComplaint } from '../../types';
import { AdminDashboard } from '../AdminDashboard';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_ADMIN_PROJECTS, INITIAL_CLIENT_COMPLAINTS } from '../../data/mockData';
import { LogOut, LayoutDashboard } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [adminProjects, setAdminProjects] = useState<AdminProject[]>(INITIAL_ADMIN_PROJECTS);
  const [clientComplaints, setClientComplaints] = useState<ClientComplaint[]>(INITIAL_CLIENT_COMPLAINTS);

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

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#F9F9F9] text-[#050505] font-sans selection:bg-black selection:text-white">
        <div className="bg-[#1B1B1B] text-white px-4 py-2 text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            <span>GRIZOLABS ADMIN PORTAL</span>
            <span className="text-neutral-400 hidden sm:inline">
              {user?.username || 'admin'} • {user?.role || 'admin'}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-neutral-300 hover:text-white underline">Landing Page</a>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 flex items-center gap-1 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        <main className="max-w-[1280px] mx-auto px-4 md:px-8 py-8 md:py-12">
          <AdminDashboard
            projects={adminProjects}
            onUpdateProject={handleUpdateProject}
            complaints={clientComplaints}
            onUpdateComplaint={handleUpdateComplaint}
            onAddComplaint={handleAddComplaint}
            onAddProject={handleAddProject}
          />
        </main>
      </div>
    </ProtectedRoute>
  );
};