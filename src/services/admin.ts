import { AdminProject, ClientComplaint, Lead, LeadStatus } from '../types';

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    credentials: 'include',
    ...options,
    headers: {
      ...(options?.body ? { 'Content-Type': 'application/json' } : {}),
      ...options?.headers,
    },
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return res.json();
}

export const adminApi = {
  // Projects
  getProjects: () =>
    request<{ success: boolean; projects: AdminProject[] }>('/api/admin/projects').then((r) => r.projects),
  createProject: (p: AdminProject) =>
    request<{ success: boolean; project: AdminProject }>('/api/admin/projects', {
      method: 'POST',
      body: JSON.stringify(p),
    }).then((r) => r.project),
  updateProject: (id: string, p: AdminProject) =>
    request<{ success: boolean; project: AdminProject }>(`/api/admin/projects/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(p),
    }).then((r) => r.project),
  deleteProject: (id: string) =>
    request<{ success: boolean }>(`/api/admin/projects/${encodeURIComponent(id)}`, { method: 'DELETE' }),

  // Complaints
  getComplaints: () =>
    request<{ success: boolean; complaints: ClientComplaint[] }>('/api/admin/complaints').then((r) => r.complaints),
  createComplaint: (c: ClientComplaint) =>
    request<{ success: boolean; complaint: ClientComplaint }>('/api/admin/complaints', {
      method: 'POST',
      body: JSON.stringify(c),
    }).then((r) => r.complaint),
  updateComplaint: (id: string, c: ClientComplaint) =>
    request<{ success: boolean; complaint: ClientComplaint }>(`/api/admin/complaints/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify(c),
    }).then((r) => r.complaint),

  // Leads
  getLeads: () =>
    request<{ success: boolean; leads: Lead[] }>('/api/admin/leads').then((r) => r.leads),
  updateLeadStatus: (id: string, status: LeadStatus) =>
    request<{ success: boolean; lead: Lead }>(`/api/admin/leads/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }).then((r) => r.lead),
};