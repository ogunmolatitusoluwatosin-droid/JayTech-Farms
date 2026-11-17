export type PageId = 'home' | 'services' | 'about' | 'contact';

export interface LeadFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  location: string;
  farmingInterests: string[];
  landStatus: string;
  otherStateLocation?: string;
  landScale: string;
  budget: string;
  timeline: string;
  additionalDetails: string;
  googleSheetWebappUrl?: string;
}

export interface LeadSubmissionResponse {
  success: boolean;
  lead: LeadFormData & { id: string; submittedAt: string };
  whatsappUrl: string;
  googleSheetSynced: boolean;
  message: string;
}

export interface StoredLead extends LeadFormData {
  id: string;
  submittedAt: string;
}
