import React from 'react';
import { Lead, LeadStatus } from '../../types';
import { LEAD_TYPE_LABELS, LEAD_STATUS_LABELS } from '../../services/leads';
import { Inbox, Database } from 'lucide-react';

interface AdminLeadsProps {
  leads: Lead[];
  onUpdateLeadStatus: (id: string, status: LeadStatus) => void;
  dbMode: boolean;
}

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: 'bg-emerald-50 text-emerald-800 border-emerald-200',
  contacted: 'bg-blue-50 text-blue-800 border-blue-200',
  converted: 'bg-violet-50 text-violet-800 border-violet-200',
  closed: 'bg-neutral-100 text-neutral-600 border-neutral-200',
};

const TYPE_STYLES: Record<string, string> = {
  consultation: 'bg-amber-50 text-amber-800 border-amber-200',
  diagnostic: 'bg-sky-50 text-sky-800 border-sky-200',
  prd: 'bg-rose-50 text-rose-800 border-rose-200',
};

export const AdminLeads: React.FC<AdminLeadsProps> = ({ leads, onUpdateLeadStatus, dbMode }) => {
  const openCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div className="space-y-6">
      {!dbMode && (
        <div className="bg-amber-50 border border-amber-200 rounded-sm p-3 text-xs font-sans flex items-center gap-2 text-amber-900">
          <Database className="w-4 h-4 shrink-0" />
          Database belum dikonfigurasi — data di bawah hanya sementara (mock) dan belum tersimpan.
        </div>
      )}

      <div className="bg-white border border-[#E9E9E7] rounded-sm p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Inbox className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-sm">Leads & Permintaan Masuk</h2>
            <p className="text-xs text-neutral-500">{leads.length} total • {openCount} baru</p>
          </div>
        </div>
      </div>

      {leads.length === 0 ? (
        <div className="bg-white border border-dashed border-[#E9E9E7] rounded-sm p-10 text-center text-xs text-neutral-500 font-sans">
          Belum ada leads. Form konsultasi, audit IT, dan estimasi PRD yang dikirim akan muncul di sini.
        </div>
      ) : (
        <div className="space-y-3">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-white border border-[#E9E9E7] rounded-sm p-4 space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded-sm border font-mono text-[10px] font-bold ${
                    TYPE_STYLES[lead.leadType] || 'bg-neutral-100 text-neutral-600 border-neutral-200'
                  }`}
                >
                  {LEAD_TYPE_LABELS[lead.leadType]}
                </span>
                <span
                  className={`px-2 py-0.5 rounded-sm border font-mono text-[10px] font-bold ${
                    STATUS_STYLES[lead.status]
                  }`}
                >
                  {LEAD_STATUS_LABELS[lead.status]}
                </span>
                <span className="font-mono text-[10px] text-neutral-400 ml-auto">
                  {new Date(lead.createdAt).toLocaleString('id-ID')}
                </span>
              </div>

              <div>
                <div className="font-bold text-sm">{lead.businessName || lead.contactName || 'Tanpa Nama'}</div>
                <div className="text-xs text-neutral-500">
                  {lead.contactName && <span className="mr-3">{lead.contactName}</span>}
                  {lead.whatsapp && <span className="mr-3">{lead.whatsapp}</span>}
                  {lead.email && <span>{lead.email}</span>}
                </div>
                {lead.preferredDate && (
                  <div className="text-[11px] text-neutral-500 mt-1">
                    Janji: {lead.preferredDate} {lead.preferredTime} (
                    {lead.channel === 'meeting' ? 'Meeting' : 'WhatsApp'})
                  </div>
                )}
                {lead.notes && (
                  <p className="text-xs text-[#333331] mt-1.5 leading-relaxed">{lead.notes}</p>
                )}
                {lead.sourceData && lead.sourceData.score !== undefined && (
                  <p className="text-[11px] font-mono text-sky-700 mt-1.5">
                    Skor Audit: {String(lead.sourceData.score)}% — {String(lead.sourceData.stage || '')}
                  </p>
                )}
                {lead.sourceData && lead.sourceData.estimatedPrice && (
                  <p className="text-[11px] font-mono text-rose-700 mt-1.5">
                    Estimasi: {String(lead.sourceData.estimatedPrice)}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#F0F0ED]">
                <span className="text-[11px] text-neutral-400 font-mono">#{lead.id.slice(0, 8)}</span>
                <select
                  value={lead.status}
                  onChange={(e) => onUpdateLeadStatus(lead.id, e.target.value as LeadStatus)}
                  className="px-2 py-1.5 border border-[#E9E9E7] rounded-sm text-xs font-sans bg-white focus:outline-none focus:ring-1 focus:ring-black cursor-pointer"
                >
                  {Object.entries(LEAD_STATUS_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};