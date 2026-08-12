import React, { useState } from 'react';
import { AdminProject, ClientComplaint, ProjectStatus, ComplaintStatus, ComplaintPriority } from '../types';
import { SpkGeneratorModal } from './SpkGeneratorModal';
import {
  LayoutDashboard,
  FolderKanban,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Search,
  Filter,
  PlusCircle,
  FolderPlus,
  MessageSquare,
  Send,
  ExternalLink,
  Edit3,
  TrendingUp,
  UserCheck,
  Building2,
  PhoneCall,
  ChevronRight,
  X,
  FileText,
  FileCheck,
  ShieldAlert,
} from 'lucide-react';

interface AdminDashboardProps {
  projects: AdminProject[];
  onUpdateProject: (updatedProject: AdminProject) => void;
  complaints: ClientComplaint[];
  onUpdateComplaint: (updatedComplaint: ClientComplaint) => void;
  onAddComplaint: (newComplaint: ClientComplaint) => void;
  onAddProject?: (newProject: AdminProject) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  projects,
  onUpdateProject,
  complaints,
  onUpdateComplaint,
  onAddComplaint,
  onAddProject,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'projects' | 'complaints'>('projects');
  
  // Project Search & Filters
  const [projectSearch, setProjectSearch] = useState('');
  const [projectStatusFilter, setProjectStatusFilter] = useState<string>('ALL');

  // SPK Generator Modal State
  const [spkProject, setSpkProject] = useState<AdminProject | null>(null);

  // Add Manual Project Modal State
  const [isAddProjectModalOpen, setIsAddProjectModalOpen] = useState(false);
  const now = new Date();
  const defaultDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`;

  const [newProjectForm, setNewProjectForm] = useState({
    clientName: '',
    projectName: '',
    package: 'Paket Tumbuh (Standard)',
    budgetIDR: 'Rp 5.000.000',
    leadArchitect: 'Budi Santoso (Lead Architect)',
    startDate: defaultDate,
    targetDate: defaultDate,
    contactPhone: '',
    notes: '',
  });

  // Complaint Search & Filters
  const [complaintSearch, setComplaintSearch] = useState('');
  const [complaintStatusFilter, setComplaintStatusFilter] = useState<string>('ALL');

  // Modal States
  const [selectedProject, setSelectedProject] = useState<AdminProject | null>(null);
  const [selectedComplaint, setSelectedComplaint] = useState<ClientComplaint | null>(null);
  const [adminResponseText, setAdminResponseText] = useState('');
  const [newComplaintStatus, setNewComplaintStatus] = useState<ComplaintStatus>('In Investigation');

  const [isAddComplaintModalOpen, setIsAddComplaintModalOpen] = useState(false);
  const [newComplaintForm, setNewComplaintForm] = useState({
    clientName: '',
    projectName: '',
    category: 'Bug / Error' as ClientComplaint['category'],
    priority: 'High' as ComplaintPriority,
    subject: '',
    description: '',
    reportedBy: '',
  });

  // Calculate Metrics
  const activeProjectsCount = projects.filter((p) => p.status === 'In Progress' || p.status === 'Under Review').length;
  const openComplaintsCount = complaints.filter((c) => c.status === 'Open' || c.status === 'In Investigation').length;
  const completedProjectsCount = projects.filter((p) => p.status === 'Completed').length;

  // Filtered Projects
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.clientName.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.projectName.toLowerCase().includes(projectSearch.toLowerCase()) ||
      p.leadArchitect.toLowerCase().includes(projectSearch.toLowerCase());
    const matchesFilter = projectStatusFilter === 'ALL' || p.status === projectStatusFilter;
    return matchesSearch && matchesFilter;
  });

  // Filtered Complaints
  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(complaintSearch.toLowerCase()) ||
      c.ticketCode.toLowerCase().includes(complaintSearch.toLowerCase()) ||
      c.subject.toLowerCase().includes(complaintSearch.toLowerCase());
    const matchesFilter = complaintStatusFilter === 'ALL' || c.status === complaintStatusFilter;
    return matchesSearch && matchesFilter;
  });

  const handleStatusChange = (project: AdminProject, newStatus: ProjectStatus) => {
    let newProgress = project.progressPercent;
    if (newStatus === 'Completed') {
      newProgress = 100;
    } else if (newStatus === 'Under Review') {
      newProgress = 85;
    } else if (newStatus === 'In Progress') {
      newProgress = newProgress === 100 || newProgress === 0 ? 50 : newProgress;
    }

    onUpdateProject({
      ...project,
      status: newStatus,
      progressPercent: newProgress,
    });
  };

  const handleProgressChange = (project: AdminProject, newProgress: number) => {
    const clamped = Math.max(0, Math.min(100, newProgress));
    let newStatus = project.status;
    if (clamped === 100) newStatus = 'Completed';
    else if (clamped < 100 && project.status === 'Completed') newStatus = 'In Progress';

    onUpdateProject({
      ...project,
      progressPercent: clamped,
      status: newStatus,
    });
  };

  const handleLiveStatusChange = (
    project: AdminProject,
    newLiveStatus: 'ONLINE' | 'STAGING' | 'MAINTENANCE' | 'OFFLINE'
  ) => {
    onUpdateProject({
      ...project,
      liveStatus: newLiveStatus,
    });
  };

  const handleSaveComplaintResponse = () => {
    if (!selectedComplaint) return;
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')} WIB`;

    const updated: ClientComplaint = {
      ...selectedComplaint,
      status: newComplaintStatus,
      adminResponse: adminResponseText || selectedComplaint.adminResponse,
      resolvedAt: newComplaintStatus === 'Resolved' ? formattedDate : selectedComplaint.resolvedAt,
    };

    onUpdateComplaint(updated);
    setSelectedComplaint(null);
    setAdminResponseText('');
  };

  const handleCreateComplaintSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComplaintForm.clientName || !newComplaintForm.subject) return;

    const randomNum = Math.floor(100 + Math.random() * 900);
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')}`;

    const complaint: ClientComplaint = {
      id: `tk-${Date.now()}`,
      ticketCode: `TKT-2026-${randomNum}`,
      clientName: newComplaintForm.clientName,
      projectName: newComplaintForm.projectName || 'Layanan Custom Grizolabs',
      date: formattedDate,
      category: newComplaintForm.category,
      priority: newComplaintForm.priority,
      status: 'Open',
      subject: newComplaintForm.subject,
      description: newComplaintForm.description,
      reportedBy: newComplaintForm.reportedBy || 'Klien Admin Entry',
    };

    onAddComplaint(complaint);
    setIsAddComplaintModalOpen(false);
    setNewComplaintForm({
      clientName: '',
      projectName: '',
      category: 'Bug / Error',
      priority: 'High',
      subject: '',
      description: '',
      reportedBy: '',
    });
  };

  const handleCreateProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectForm.clientName || !newProjectForm.projectName) return;

    const randomNum = Math.floor(100 + Math.random() * 900);
    const uniqueId = `GZ-PRJ-${new Date().getFullYear()}-${randomNum}`;
    const generatedUuid = crypto.randomUUID ? crypto.randomUUID() : `uuid-${Date.now()}`;

    const project: AdminProject = {
      id: uniqueId,
      uuid: generatedUuid,
      clientName: newProjectForm.clientName,
      projectName: newProjectForm.projectName,
      package: newProjectForm.package,
      status: 'In Progress',
      progressPercent: 10,
      startDate: newProjectForm.startDate || defaultDate,
      targetDate: newProjectForm.targetDate || defaultDate,
      leadArchitect: newProjectForm.leadArchitect,
      budgetIDR: newProjectForm.budgetIDR,
      currentMilestone: 'Phase 1: Kickoff & Pengumpulan Data Bisnis',
      milestonesCount: { completed: 0, total: 5 },
      contactPhone: newProjectForm.contactPhone.replace(/[^0-9]/g, '') || '6281290008822',
      notes: newProjectForm.notes || 'Input manual oleh admin.',
    };

    if (onAddProject) {
      onAddProject(project);
    }
    setIsAddProjectModalOpen(false);
    setNewProjectForm({
      clientName: '',
      projectName: '',
      package: 'Paket Tumbuh (Standard)',
      budgetIDR: 'Rp 5.000.000',
      leadArchitect: 'Budi Santoso (Lead Architect)',
      startDate: defaultDate,
      targetDate: defaultDate,
      contactPhone: '',
      notes: '',
    });
  };

  const getStatusBadge = (status: ProjectStatus) => {
    switch (status) {
      case 'In Progress':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1"><Clock className="w-3 h-3" /> In Progress</span>;
      case 'Under Review':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Under Review (UAT)</span>;
      case 'Completed':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Completed</span>;
      case 'On Hold':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-neutral-100 text-neutral-600 border border-neutral-300 flex items-center gap-1">On Hold</span>;
    }
  };

  const getComplaintStatusBadge = (status: ComplaintStatus) => {
    switch (status) {
      case 'Open':
        return <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-red-100 text-red-700 border border-red-200 animate-pulse flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> Open (Perlu Penanganan)</span>;
      case 'In Investigation':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800 border border-amber-200 flex items-center gap-1"><Clock className="w-3 h-3" /> Sedang Ditangani</span>;
      case 'Resolved':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Selesai (Resolved)</span>;
    }
  };

  const getPriorityBadge = (priority: ComplaintPriority) => {
    switch (priority) {
      case 'High':
        return <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-red-50 text-red-600 border border-red-200 rounded">PRIORITAS TINGGI</span>;
      case 'Medium':
        return <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-amber-50 text-amber-700 border border-amber-200 rounded">MEDIUM</span>;
      case 'Low':
        return <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-blue-50 text-blue-600 border border-blue-200 rounded">NORMAL / LOW</span>;
    }
  };

  const getLiveStatusBadge = (status?: string) => {
    switch (status) {
      case 'ONLINE':
        return (
          <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 bg-emerald-600 rounded-full animate-ping" />
            ONLINE (PROD)
          </span>
        );
      case 'STAGING':
        return (
          <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-amber-100 text-amber-800 border border-amber-300 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 bg-amber-500 rounded-full" />
            STAGING READY
          </span>
        );
      case 'MAINTENANCE':
        return (
          <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-blue-100 text-blue-800 border border-blue-300 rounded-full flex items-center gap-1">
            <span className="w-2 h-2 bg-blue-500 rounded-full" />
            MAINTENANCE
          </span>
        );
      default:
        return (
          <span className="px-2 py-0.5 text-[11px] font-mono font-bold bg-neutral-100 text-neutral-600 border border-neutral-300 rounded-full flex items-center gap-1">
            OFFLINE / DEV
          </span>
        );
    }
  };

  return (
    <div>
      {/* Dashboard Main UI - Hidden during printing */}
      <div className="space-y-8 animate-fade-in no-print">
      {/* Admin Header Banner */}
      <div className="bg-neutral-900 text-white rounded-lg p-4 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <LayoutDashboard className="w-64 h-64" />
        </div>
        <div className="relative z-10 flex flex-col gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold rounded">
                GRIZOLABS INTERNAL CONTROL
              </span>
              <span className="text-xs text-neutral-400 font-mono">v2.4 Live</span>
            </div>
            <h1 className="text-xl md:text-3xl font-extrabold tracking-tight">Admin Project & Complaint Portal</h1>
            <p className="text-neutral-300 text-xs md:text-sm mt-1 hidden sm:block">
              Pusat kendali proyek berjalan, pembaruan milestone, dan penanganan tiket komplain klien UMKM.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setIsAddProjectModalOpen(true)}
              className="bg-emerald-500 hover:bg-emerald-400 text-black px-3 py-2 rounded-sm font-mono font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <FolderPlus className="w-3.5 h-3.5 text-black" />
              + Proyek Baru
            </button>

            <button
              onClick={() => setIsAddComplaintModalOpen(true)}
              className="bg-white text-black hover:bg-neutral-200 px-3 py-2 rounded-sm font-mono font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
            >
              <PlusCircle className="w-3.5 h-3.5 text-red-600" />
              + Tiket Komplain
            </button>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 md:mt-8 pt-4 md:pt-6 border-t border-neutral-800">
          <div className="bg-neutral-800/80 p-4 rounded border border-neutral-700/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Proyek Berlangsung</span>
              <FolderKanban className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold font-mono mt-1 text-white">{activeProjectsCount}</p>
            <span className="text-[11px] text-neutral-400 mt-1 block">Aktif pengerjaan & UAT</span>
          </div>

          <div className="bg-neutral-800/80 p-4 rounded border border-neutral-700/60 relative overflow-hidden">
            {openComplaintsCount > 0 && (
              <div className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
            )}
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Tiket Komplain Pending</span>
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <p className="text-2xl font-bold font-mono mt-1 text-red-400">{openComplaintsCount}</p>
            <span className="text-[11px] text-neutral-400 mt-1 block">Membutuhkan investigasi</span>
          </div>

          <div className="bg-neutral-800/80 p-4 rounded border border-neutral-700/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Proyek Selesai</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold font-mono mt-1 text-emerald-400">{completedProjectsCount}</p>
            <span className="text-[11px] text-neutral-400 mt-1 block">Telah serah terima / Go-Live</span>
          </div>

          <div className="bg-neutral-800/80 p-4 rounded border border-neutral-700/60">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-neutral-400">Rata-rata Respon SLA</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-bold font-mono mt-1 text-white">&lt; 45 Menit</p>
            <span className="text-[11px] text-neutral-400 mt-1 block">SLA Support Grizolabs</span>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation (Projects vs Complaints) */}
      <div className="flex items-center gap-2 border-b border-[#E9E9E7] pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab('projects')}
          className={`flex items-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-sm font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
            activeSubTab === 'projects'
              ? 'bg-black text-white shadow-sm ring-1 ring-black'
              : 'bg-white text-[#050505] hover:bg-[#F0F0ED] border border-[#E9E9E7]'
          }`}
        >
          <FolderKanban className="w-4 h-4" />
          <span className="hidden sm:inline">Proyek Berlangsung & Status</span>
          <span className="sm:hidden">Proyek</span>
          <span>({projects.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('complaints')}
          className={`flex items-center gap-1.5 px-3 sm:px-5 py-2.5 rounded-sm font-sans text-xs sm:text-sm font-bold transition-all cursor-pointer relative whitespace-nowrap shrink-0 ${
            activeSubTab === 'complaints'
              ? 'bg-black text-white shadow-sm ring-1 ring-black'
              : 'bg-white text-[#050505] hover:bg-[#F0F0ED] border border-[#E9E9E7]'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <span className="hidden sm:inline">Komplain & Tiket Klien</span>
          <span className="sm:hidden">Komplain</span>
          {openComplaintsCount > 0 && (
            <span className="px-2 py-0.5 bg-red-600 text-white font-mono text-[11px] rounded-full font-bold">
              {openComplaintsCount}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: PROJECTS MANAGEMENT */}
      {activeSubTab === 'projects' && (
        <div className="space-y-6">
          {/* Controls & Filter Header */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-sm border border-[#E9E9E7] shadow-2xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Cari nama klien, nama proyek, atau lead architect..."
                value={projectSearch}
                onChange={(e) => setProjectSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#F9F9F9] border border-[#E9E9E7] rounded-sm text-xs font-sans focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Filter className="w-4 h-4 text-neutral-500" />
              <span className="text-xs font-mono text-neutral-600">Status:</span>
              <select
                value={projectStatusFilter}
                onChange={(e) => setProjectStatusFilter(e.target.value)}
                className="bg-[#F9F9F9] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs font-sans focus:outline-none cursor-pointer"
              >
                <option value="ALL">Semua Status ({projects.length})</option>
                <option value="In Progress">In Progress</option>
                <option value="Under Review">Under Review (UAT)</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>

          {/* Projects Table / Card List */}
          <div className="space-y-4">
            {filteredProjects.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-sm border border-[#E9E9E7]">
                <FolderKanban className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
                <p className="text-sm font-bold text-[#050505]">Tidak ada proyek yang cocok</p>
                <p className="text-xs text-neutral-500 mt-1">Coba sesuaikan kata kunci pencarian atau filter status.</p>
              </div>
            ) : (
              filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white border border-[#E9E9E7] rounded-sm p-5 md:p-6 shadow-2xs hover:shadow-xs transition-all space-y-4"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-[#F0F0ED] pb-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded font-bold">
                          {project.package}
                        </span>
                        {getLiveStatusBadge(project.liveStatus)}
                        <span className="text-xs font-mono text-neutral-400">• ID: {project.id}</span>
                      </div>
                      <h2 className="text-lg font-bold text-[#050505] flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-neutral-500" />
                        {project.clientName}
                      </h2>
                      <p className="text-xs text-neutral-600 font-sans font-medium">{project.projectName}</p>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap self-start lg:self-center">
                      <div className="text-right hidden sm:block mr-2">
                        <span className="text-[11px] font-mono text-neutral-500 block">Total Anggaran:</span>
                        <span className="text-sm font-bold font-mono text-emerald-700">{project.budgetIDR}</span>
                      </div>

                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-black hover:bg-neutral-800 text-white text-xs font-mono px-3 py-2 rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                          Buka Live App ↗
                        </a>
                      )}

                      <a
                        href={`https://wa.me/${project.contactPhone}?text=Halo%20${encodeURIComponent(
                          project.clientName
                        )},%20update%20terbaru%20proyek%20${encodeURIComponent(project.projectName)}:`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-mono px-3 py-2 rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        Hubungi WA
                      </a>
                    </div>
                  </div>

                  {/* Status & Progress Editing Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-[#FDFDFD] p-3.5 rounded border border-[#F0F0ED]">
                    {/* Status Dropdown */}
                    <div>
                      <label className="text-[11px] font-mono text-neutral-500 block mb-1">Ubah Status Proyek:</label>
                      <select
                        value={project.status}
                        onChange={(e) => handleStatusChange(project, e.target.value as ProjectStatus)}
                        className="w-full bg-white border border-[#DCDCDA] rounded px-2.5 py-1.5 text-xs font-bold font-sans text-[#050505] focus:ring-1 focus:ring-black focus:outline-none cursor-pointer"
                      >
                        <option value="In Progress">In Progress (Pengerjaan)</option>
                        <option value="Under Review">Under Review (UAT)</option>
                        <option value="Completed">Completed (Selesai)</option>
                        <option value="On Hold">On Hold (Ditangguhkan)</option>
                      </select>
                    </div>

                    {/* Live Server Status Dropdown */}
                    <div>
                      <label className="text-[11px] font-mono text-neutral-500 block mb-1">Status Server Live:</label>
                      <select
                        value={project.liveStatus || 'OFFLINE'}
                        onChange={(e) =>
                          handleLiveStatusChange(
                            project,
                            e.target.value as 'ONLINE' | 'STAGING' | 'MAINTENANCE' | 'OFFLINE'
                          )
                        }
                        className="w-full bg-white border border-[#DCDCDA] rounded px-2.5 py-1.5 text-xs font-bold font-sans text-[#050505] focus:ring-1 focus:ring-black focus:outline-none cursor-pointer"
                      >
                        <option value="ONLINE">🟢 ONLINE (PROD)</option>
                        <option value="STAGING">🟡 STAGING READY</option>
                        <option value="MAINTENANCE">🔵 MAINTENANCE</option>
                        <option value="OFFLINE">⚪ OFFLINE / DEV</option>
                      </select>
                    </div>

                    {/* Progress Percentage Display (Auto-bound to Status) */}
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-mono text-neutral-600 font-semibold">Progres (Otomatis):</span>
                        <span className="font-mono font-bold text-black">{project.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-[#E9E9E7] rounded-full h-2 overflow-hidden border border-[#D3D3D2] my-1.5">
                        <div
                          className={`h-full transition-all duration-500 rounded-full ${
                            project.status === 'Completed'
                              ? 'bg-emerald-600'
                              : project.status === 'Under Review'
                              ? 'bg-amber-500'
                              : project.status === 'On Hold'
                              ? 'bg-neutral-400'
                              : 'bg-black'
                          }`}
                          style={{ width: `${project.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    {/* Current Milestone Info */}
                    <div>
                      <span className="text-[11px] font-mono text-neutral-500 block mb-0.5">Milestone Aktif:</span>
                      <p className="text-xs font-bold text-[#050505] line-clamp-1">{project.currentMilestone}</p>
                    </div>
                  </div>

                  {/* Project Details Footer */}
                  <div className="space-y-2 pt-1 text-xs text-neutral-600">
                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <UserCheck className="w-3.5 h-3.5 text-neutral-400" />
                        {project.leadArchitect}
                      </span>
                      <span className="font-mono text-[11px] text-neutral-400">
                        Target: {project.targetDate}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setSpkProject(project)}
                        className="text-xs font-mono font-bold bg-neutral-900 hover:bg-black text-white px-3 py-1.5 rounded-sm flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
                      >
                        <FileCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Generate SPK
                      </button>

                      <button
                        onClick={() => setSelectedProject(project)}
                        className="text-xs font-mono font-bold text-black hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        Detail & Catatan
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CLIENT COMPLAINT MANAGEMENT */}
      {activeSubTab === 'complaints' && (
        <div className="space-y-6">
          {/* Complaint Controls Header */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-white p-4 rounded-sm border border-[#E9E9E7] shadow-2xs">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Cari kode tiket, nama klien, atau topik komplain..."
                value={complaintSearch}
                onChange={(e) => setComplaintSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#F9F9F9] border border-[#E9E9E7] rounded-sm text-xs font-sans focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Filter className="w-4 h-4 text-neutral-500" />
              <span className="text-xs font-mono text-neutral-600">Status Tiket:</span>
              <select
                value={complaintStatusFilter}
                onChange={(e) => setComplaintStatusFilter(e.target.value)}
                className="bg-[#F9F9F9] border border-[#E9E9E7] rounded-sm px-3 py-2 text-xs font-sans focus:outline-none cursor-pointer"
              >
                <option value="ALL">Semua Tiket ({complaints.length})</option>
                <option value="Open">Open (Perlu Tindakan)</option>
                <option value="In Investigation">Sedang Ditangani</option>
                <option value="Resolved">Resolved (Selesai)</option>
              </select>
            </div>
          </div>

          {/* Complaints List */}
          <div className="space-y-4">
            {filteredComplaints.length === 0 ? (
              <div className="bg-white p-12 text-center rounded-sm border border-[#E9E9E7]">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
                <p className="text-sm font-bold text-[#050505]">Tidak ada tiket komplain</p>
                <p className="text-xs text-neutral-500 mt-1">Semua keluhan klien telah ditangani dengan baik.</p>
              </div>
            ) : (
              filteredComplaints.map((ticket) => (
                <div
                  key={ticket.id}
                  className={`bg-white border rounded-sm p-5 md:p-6 shadow-2xs transition-all space-y-4 ${
                    ticket.status === 'Open'
                      ? 'border-red-300 ring-1 ring-red-100'
                      : ticket.status === 'In Investigation'
                      ? 'border-amber-200'
                      : 'border-[#E9E9E7]'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-[#F0F0ED] pb-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-xs bg-neutral-900 text-white px-2 py-0.5 rounded">
                          {ticket.ticketCode}
                        </span>
                        {getPriorityBadge(ticket.priority)}
                        <span className="text-xs font-mono text-neutral-500">Kategori: {ticket.category}</span>
                        <span className="text-xs font-mono text-neutral-400">• Tanggal: {ticket.date}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#050505]">{ticket.subject}</h3>
                      <p className="text-xs text-neutral-600 font-sans">
                        Klien: <strong className="text-black">{ticket.clientName}</strong> ({ticket.projectName})
                      </p>
                    </div>

                    <div className="self-start md:self-center">
                      {getComplaintStatusBadge(ticket.status)}
                    </div>
                  </div>

                  {/* Complaint Description */}
                  <div className="bg-[#F9F9F8] p-3.5 rounded border border-[#EBEBE8] text-xs text-neutral-800 space-y-1">
                    <span className="font-mono text-[11px] font-bold text-neutral-500 block">Detail Kendala Klien (Pelapor: {ticket.reportedBy}):</span>
                    <p className="leading-relaxed">{ticket.description}</p>
                  </div>

                  {/* Admin Response Section if exists */}
                  {ticket.adminResponse && (
                    <div className="bg-emerald-50/60 border border-emerald-200/80 p-3.5 rounded text-xs text-emerald-900 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-emerald-800 text-[11px]">Tanggapan & Penanganan Admin Grizolabs:</span>
                        {ticket.resolvedAt && (
                          <span className="font-mono text-[10px] text-emerald-700">Selesai: {ticket.resolvedAt}</span>
                        )}
                      </div>
                      <p className="leading-relaxed font-sans">{ticket.adminResponse}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        setSelectedComplaint(ticket);
                        setAdminResponseText(ticket.adminResponse || '');
                        setNewComplaintStatus(ticket.status);
                      }}
                      className="bg-black hover:bg-neutral-800 text-white text-xs font-mono font-bold px-4 py-2 rounded-sm flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      Tanggapi / Update Status Tiket
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
      </div>

      {/* MODAL 1: PROJECT DETAIL & NOTES */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-2xl space-y-5 animate-fade-in relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <span className="text-xs font-mono bg-black text-white px-2.5 py-0.5 rounded">
                {selectedProject.package}
              </span>
              <h2 className="text-xl font-bold text-[#050505] mt-2">{selectedProject.clientName}</h2>
              <p className="text-xs text-neutral-500 font-sans">{selectedProject.projectName}</p>
            </div>

            <div className="space-y-3 bg-[#F9F9F9] p-4 rounded border border-[#E9E9E7] text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <span className="text-neutral-500 font-mono block">Status:</span>
                  {getStatusBadge(selectedProject.status)}
                </div>
                <div>
                  <span className="text-neutral-500 font-mono block">Progres:</span>
                  <span className="font-bold font-mono text-black">{selectedProject.progressPercent}%</span>
                </div>
                <div>
                  <span className="text-neutral-500 font-mono block">Lead Architect:</span>
                  <span className="font-semibold text-black">{selectedProject.leadArchitect}</span>
                </div>
                <div>
                  <span className="text-neutral-500 font-mono block">Budget IDR:</span>
                  <span className="font-bold text-emerald-700 font-mono">{selectedProject.budgetIDR}</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold font-mono text-neutral-700 block mb-1">Catatan Tim Internal:</label>
              <textarea
                value={selectedProject.notes}
                onChange={(e) => {
                  const updated = { ...selectedProject, notes: e.target.value };
                  setSelectedProject(updated);
                  onUpdateProject(updated);
                }}
                rows={3}
                className="w-full p-3 bg-white border border-[#E9E9E7] rounded text-xs font-sans focus:ring-1 focus:ring-black focus:outline-none"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedProject(null)}
                className="bg-black text-white text-xs font-mono font-bold px-5 py-2 rounded cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: RESPOND TO COMPLAINT */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-2xl space-y-5 animate-fade-in relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedComplaint(null)}
              className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs bg-neutral-900 text-white px-2 py-0.5 rounded">
                  {selectedComplaint.ticketCode}
                </span>
                {getPriorityBadge(selectedComplaint.priority)}
              </div>
              <h2 className="text-lg font-bold text-[#050505] mt-2">{selectedComplaint.subject}</h2>
              <p className="text-xs text-neutral-500">
                Klien: {selectedComplaint.clientName} ({selectedComplaint.projectName})
              </p>
            </div>

            <div className="bg-[#F9F9F8] p-3.5 rounded border text-xs space-y-1">
              <span className="font-mono text-[11px] font-bold text-neutral-500 block">Keluhan Klien:</span>
              <p className="text-neutral-800">{selectedComplaint.description}</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold font-mono text-neutral-700 block mb-1">Status Tiket Baru:</label>
                <select
                  value={newComplaintStatus}
                  onChange={(e) => setNewComplaintStatus(e.target.value as ComplaintStatus)}
                  className="w-full bg-white border border-[#E9E9E7] rounded px-3 py-2 text-xs font-bold focus:ring-1 focus:ring-black focus:outline-none cursor-pointer"
                >
                  <option value="Open">Open (Masih Dalam Antrean / Perlu Penanganan)</option>
                  <option value="In Investigation">In Investigation (Sedang Ditangani Tim Teknis)</option>
                  <option value="Resolved">Resolved (Telah Selesai & Terverifikasi)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold font-mono text-neutral-700 block mb-1">Tanggapan & Solusi Admin:</label>
                <textarea
                  value={adminResponseText}
                  onChange={(e) => setAdminResponseText(e.target.value)}
                  placeholder="Tuliskan langkah perbaikan atau pesan klarifikasi untuk klien..."
                  rows={4}
                  className="w-full p-3 bg-white border border-[#E9E9E7] rounded text-xs font-sans focus:ring-1 focus:ring-black focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <a
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Halo ${selectedComplaint.clientName}, perihal tiket ${selectedComplaint.ticketCode} (${selectedComplaint.subject}): ${adminResponseText || 'Tim kami sedang memproses kendala Anda.'}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-mono text-emerald-700 font-bold hover:underline flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
                Kirim Solusi via WA
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="px-4 py-2 border border-[#E9E9E7] rounded text-xs font-mono font-semibold hover:bg-neutral-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveComplaintResponse}
                  className="bg-black text-white text-xs font-mono font-bold px-5 py-2 rounded hover:bg-neutral-800 cursor-pointer shadow-xs"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: CREATE NEW COMPLAINT TICKET */}
      {isAddComplaintModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-2xl space-y-5 animate-fade-in relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsAddComplaintModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-[#050505]">Buat Tiket Komplain Klien</h2>
              <p className="text-xs text-neutral-500 font-sans mt-0.5">
                Catat komplain atau laporan isu teknis dari klien yang diterima via WhatsApp/Telepon.
              </p>
            </div>

            <form onSubmit={handleCreateComplaintSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold block mb-1 text-neutral-700">Nama Klien / UMKM *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Grizo Coffee"
                    value={newComplaintForm.clientName}
                    onChange={(e) => setNewComplaintForm({ ...newComplaintForm, clientName: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1 text-neutral-700">Nama Proyek</label>
                  <input
                    type="text"
                    placeholder="Contoh: POS Kasir PWA"
                    value={newComplaintForm.projectName}
                    onChange={(e) => setNewComplaintForm({ ...newComplaintForm, projectName: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold block mb-1 text-neutral-700">Kategori Izin / Masalah</label>
                  <select
                    value={newComplaintForm.category}
                    onChange={(e) =>
                      setNewComplaintForm({
                        ...newComplaintForm,
                        category: e.target.value as ClientComplaint['category'],
                      })
                    }
                    className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none cursor-pointer"
                  >
                    <option value="Bug / Error">Bug / Error Teknis</option>
                    <option value="Delay / Schedule">Delay / Jadwal Timeline</option>
                    <option value="Scope Request">Permintaan Fitur Baru (Scope)</option>
                    <option value="Billing / Payment">Tagihan / Pembayaran</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1 text-neutral-700">Tingkat Prioritas</label>
                  <select
                    value={newComplaintForm.priority}
                    onChange={(e) =>
                      setNewComplaintForm({
                        ...newComplaintForm,
                        priority: e.target.value as ComplaintPriority,
                      })
                    }
                    className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none cursor-pointer"
                  >
                    <option value="High">PRIORITAS TINGGI (Urgent)</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Normal / Low</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono font-bold block mb-1 text-neutral-700">Subjek Kendala *</label>
                <input
                  type="text"
                  required
                  placeholder="Ringkasan kendala (misal: Printer struk tidak tersambung)"
                  value={newComplaintForm.subject}
                  onChange={(e) => setNewComplaintForm({ ...newComplaintForm, subject: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono font-bold block mb-1 text-neutral-700">Deskripsi Lengkap Kendala</label>
                <textarea
                  rows={3}
                  placeholder="Jelaskan detail kendala yang dialami klien..."
                  value={newComplaintForm.description}
                  onChange={(e) => setNewComplaintForm({ ...newComplaintForm, description: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none"
                />
              </div>

              <div>
                <label className="font-mono font-bold block mb-1 text-neutral-700">Nama Pelapor (Klien / Admin)</label>
                <input
                  type="text"
                  placeholder="Contoh: Pak Henra (Manager)"
                  value={newComplaintForm.reportedBy}
                  onChange={(e) => setNewComplaintForm({ ...newComplaintForm, reportedBy: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E9E9E7]">
                <button
                  type="button"
                  onClick={() => setIsAddComplaintModalOpen(false)}
                  className="px-4 py-2 border border-[#E9E9E7] rounded font-mono text-xs font-bold hover:bg-neutral-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-neutral-800 text-white font-mono font-bold text-xs px-5 py-2 rounded cursor-pointer shadow-xs"
                >
                  Simpan Tiket Komplain
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: MANUAL PROJECT ENTRY */}
      {isAddProjectModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 no-print">
          <div className="bg-white rounded-lg max-w-xl w-full p-6 shadow-2xl space-y-5 animate-fade-in relative max-h-[90vh] overflow-y-auto font-sans text-xs">
            <button
              onClick={() => setIsAddProjectModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-full text-neutral-400 hover:text-black hover:bg-neutral-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h2 className="text-xl font-bold text-[#050505] flex items-center gap-2">
                <FolderPlus className="w-5 h-5 text-emerald-600" />
                Input Proyek Baru (Manual)
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Daftarkan kesepakatan proyek baru yang didapatkan via WhatsApp, telepon, atau meeting offline.
              </p>
            </div>

            <form onSubmit={handleCreateProjectSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold block mb-1 text-neutral-700">Nama Perusahaan / Klien *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Kopi Kenangan Senopati"
                    value={newProjectForm.clientName}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, clientName: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1 text-neutral-700">Nama Proyek Software *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: POS Touchscreen & WA Rekap"
                    value={newProjectForm.projectName}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, projectName: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold block mb-1 text-neutral-700">Paket Layanan Grizolabs</label>
                  <select
                    value={newProjectForm.package}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, package: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none cursor-pointer font-bold"
                  >
                    <option value="Paket Rintisan (Basic)">Paket Rintisan (Basic) - Rp 1.5jt-2.5jt</option>
                    <option value="Paket Tumbuh (Standard)">Paket Tumbuh (Standard) - Rp 3.5jt-6.0jt</option>
                    <option value="Paket Bintang (Premium)">Paket Bintang (Premium) - Rp 7.5jt-15.0jt</option>
                    <option value="Custom Enterprise">Custom Enterprise Software</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1 text-neutral-700">Total Anggaran (IDR) *</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rp 6.000.000"
                    value={newProjectForm.budgetIDR}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, budgetIDR: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded font-mono focus:ring-1 focus:ring-black focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold block mb-1 text-neutral-700">Tanggal Start Proyek</label>
                  <input
                    type="date"
                    value={newProjectForm.startDate}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, startDate: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1 text-neutral-700">Target Tanggal Go-Live</label>
                  <input
                    type="date"
                    value={newProjectForm.targetDate}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, targetDate: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="font-mono font-bold block mb-1 text-neutral-700">Lead Architect Grizolabs</label>
                  <input
                    type="text"
                    value={newProjectForm.leadArchitect}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, leadArchitect: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-mono font-bold block mb-1 text-neutral-700">No. WhatsApp Klien (Format 62...)</label>
                  <input
                    type="text"
                    placeholder="Contoh: 6281299008877"
                    value={newProjectForm.contactPhone}
                    onChange={(e) => setNewProjectForm({ ...newProjectForm, contactPhone: e.target.value })}
                    className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded font-mono focus:ring-1 focus:ring-black focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono font-bold block mb-1 text-neutral-700">Catatan Internal / Scope Khusus</label>
                <textarea
                  rows={2}
                  placeholder="Catatan tambahan mengenai kebutuhan klien..."
                  value={newProjectForm.notes}
                  onChange={(e) => setNewProjectForm({ ...newProjectForm, notes: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#E9E9E7] rounded focus:ring-1 focus:ring-black focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E9E9E7]">
                <button
                  type="button"
                  onClick={() => setIsAddProjectModalOpen(false)}
                  className="px-4 py-2 border border-[#E9E9E7] rounded font-mono text-xs font-bold hover:bg-neutral-100 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-mono font-bold text-xs px-5 py-2 rounded cursor-pointer shadow-xs"
                >
                  Daftarkan Proyek Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: AUTOMATED SPK CONTRACT GENERATOR */}
      {spkProject && (
        <SpkGeneratorModal
          isOpen={!!spkProject}
          onClose={() => setSpkProject(null)}
          project={spkProject}
        />
      )}
    </div>
  );
};
