import React, { useState, useEffect } from 'react';
import { AdminProject, ClientComplaint, Lead, LeadStatus } from '../../types';
import { AdminDashboard } from '../AdminDashboard';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_ADMIN_PROJECTS, INITIAL_CLIENT_COMPLAINTS } from '../../data/mockData';
import { adminApi } from '../../services/admin';
import { LogOut, LayoutDashboard } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [adminProjects, setAdminProjects] = useState<AdminProject[]>([]);
  const [clientComplaints, setClientComplaints] = useState<ClientComplaint[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [dbMode, setDbMode] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [projects, complaints, leadList] = await Promise.all([
          adminApi.getProjects(),
          adminApi.getComplaints(),
          adminApi.getLeads(),
        ]);
        if (!mounted) return;
        setAdminProjects(projects);
        setClientComplaints(complaints);
        setLeads(leadList);
        setDbMode(true);
      } catch {
        // DB not configured / offline → fall back to local mock data
        if (!mounted) return;
        setAdminProjects(INITIAL_ADMIN_PROJECTS);
        setClientComplaints(INITIAL_CLIENT_COMPLAINTS);
        setDbMode(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const handleUpdateProject = async (updatedProject: AdminProject) => {
    const prev = adminProjects;
    setAdminProjects((p) => p.map((x) => (x.id === updatedProject.id ? updatedProject : x)));
    if (dbMode) {
      try {
        const saved = await adminApi.updateProject(updatedProject.id, updatedProject);
        setAdminProjects((p) => p.map((x) => (x.id === saved.id ? saved : x)));
      } catch {
        setAdminProjects(prev);
      }
    }
  };

  const handleAddProject = async (newProject: AdminProject) => {
    setAdminProjects((p) => [newProject, ...p]);
    if (dbMode) {
      try {
        const saved = await adminApi.createProject(newProject);
        setAdminProjects((p) => [saved, ...p.filter((x) => x.id !== newProject.id)]);
      } catch {
        setAdminProjects((p) => p.filter((x) => x.id !== newProject.id));
      }
    }
  };

  const handleUpdateComplaint = async (updatedComplaint: ClientComplaint) => {
    const prev = clientComplaints;
    setClientComplaints((c) => c.map((x) => (x.id === updatedComplaint.id ? updatedComplaint : x)));
    if (dbMode) {
      try {
        const saved = await adminApi.updateComplaint(updatedComplaint.id, updatedComplaint);
        setClientComplaints((c) => c.map((x) => (x.id === saved.id ? saved : x)));
      } catch {
        setClientComplaints(prev);
      }
    }
  };

  const handleAddComplaint = async (newComplaint: ClientComplaint) => {
    setClientComplaints((c) => [newComplaint, ...c]);
    if (dbMode) {
      try {
        const saved = await adminApi.createComplaint(newComplaint);
        setClientComplaints((c) => [saved, ...c.filter((x) => x.id !== newComplaint.id)]);
      } catch {
        setClientComplaints((c) => c.filter((x) => x.id !== newComplaint.id));
      }
    }
  };

  const handleUpdateLeadStatus = async (id: string, status: LeadStatus) => {
    const prev = leads;
    setLeads((l) => l.map((x) => (x.id === id ? { ...x, status } : x)));
    if (dbMode) {
      try {
        const saved = await adminApi.updateLeadStatus(id, status);
        setLeads((l) => l.map((x) => (x.id === saved.id ? saved : x)));
      } catch {
        setLeads(prev);
      }
    }
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
            leads={leads}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            dbMode={dbMode}
          />
        </main>
      </div>
    </ProtectedRoute>
  );
};