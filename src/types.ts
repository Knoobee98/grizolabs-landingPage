export type ActiveTab = 'overview' | 'prd-estimator' | 'diagnostic' | 'admin';

export type ProjectStatus = 'In Progress' | 'Under Review' | 'Completed' | 'On Hold';
export type ComplaintStatus = 'Open' | 'In Investigation' | 'Resolved';
export type ComplaintPriority = 'High' | 'Medium' | 'Low';

export interface AdminProject {
  id: string;
  uuid?: string;
  clientName: string;
  projectName: string;
  package: string;
  status: ProjectStatus;
  progressPercent: number;
  startDate: string;
  targetDate: string;
  leadArchitect: string;
  budgetIDR: string;
  currentMilestone: string;
  milestonesCount: { completed: number; total: number };
  contactPhone: string;
  notes: string;
  liveUrl?: string;
  liveStatus?: 'ONLINE' | 'STAGING' | 'MAINTENANCE' | 'OFFLINE';
}

export interface ClientComplaint {
  id: string;
  ticketCode: string;
  clientName: string;
  projectName: string;
  date: string;
  category: 'Bug / Error' | 'Delay / Schedule' | 'Scope Request' | 'Billing / Payment';
  priority: ComplaintPriority;
  status: ComplaintStatus;
  subject: string;
  description: string;
  adminResponse?: string;
  resolvedAt?: string;
  reportedBy: string;
}

export interface ServiceItem {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  category: 'Web & App' | 'Automation' | 'Cloud & DB' | 'Audit & Security';
  deliverables: string[];
  startingPriceIDR: string;
  deliveryTimeWeeks: number;
  featured?: boolean;
}

export interface PRDModuleOption {
  id: string;
  name: string;
  category: string;
  baseDays: number;
  baseCostIDR: number;
  description: string;
  codeTag: string;
}

export interface ArchitectureComponent {
  name: string;
  tech: string;
  purpose: string;
}

export interface AdvisoryPhase {
  phaseName: string;
  duration: string;
  deliverables: string[];
}

export interface RiskMitigation {
  risk: string;
  mitigation: string;
}

export interface AdvisoryReport {
  executiveSummary: string;
  readinessScore: number;
  recommendedArchitecture: {
    title: string;
    description: string;
    components: ArchitectureComponent[];
  };
  phases: AdvisoryPhase[];
  estimatedCostIDR: string;
  monthlyOpsCostIDR: string;
  roiEstimate: string;
  risksAndMitigation: RiskMitigation[];
}

export interface DiagnosticQuestion {
  id: number;
  category: string;
  question: string;
  options: {
    label: string;
    points: number;
    description: string;
  }[];
}

export interface WorkstationMilestone {
  id: string;
  title: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  targetDate: string;
  owner: string;
  deliverableFile?: string;
  notes: string;
  progressPercent: number;
}

export interface ScopeChangeLog {
  id: string;
  date: string;
  title: string;
  impactWeeks: number;
  impactCostIDR: number;
  status: 'Approved' | 'Under Review' | 'Completed' | 'Sedang Ditinjau' | 'Disetujui';
  author: string;
}

export interface CaseStudy {
  id: string;
  clientName: string;
  industry: string;
  location: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    label: string;
  }[];
  techStack: string[];
}

export interface SPKContract {
  spkNumber: string;
  date: string;
  clientName: string;
  clientAddress: string;
  clientPic: string;
  projectName: string;
  package: string;
  totalBudgetIDR: string;
  downPaymentPercent: number;
  startDate: string;
  targetDate: string;
  scopeDeliverables: string[];
  garansiDays: number;
  notes?: string;
}


