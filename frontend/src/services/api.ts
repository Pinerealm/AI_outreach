import axios from 'axios';
import { 
  Prospect, 
  ProspectCreate, 
  EmailGenerateResponse, 
  EmailSendResponse,
  CallScriptGenerateResponse,
  CallMakeResponse,
  CallOutcome
} from '../types';
import { env } from '../utils/env';

const api = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Prospects API
export const prospectsApi = {
  getAll: async (skip = 0, limit = 100, industry?: string): Promise<Prospect[]> => {
    const params = { skip, limit, ...(industry && { industry }) };
    const response = await api.get('/prospects', { params });
    return response.data;
  },
  
  getById: async (id: number): Promise<Prospect> => {
    const response = await api.get(`/prospects/${id}`);
    return response.data;
  },
  
  create: async (prospect: ProspectCreate): Promise<Prospect> => {
    const response = await api.post('/prospects', prospect);
    return response.data;
  },
  
  update: async (id: number, prospect: Partial<ProspectCreate>): Promise<Prospect> => {
    const response = await api.put(`/prospects/${id}`, prospect);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/prospects/${id}`);
  },
  
  importProspects: async (prospects: ProspectCreate[]): Promise<Prospect[]> => {
    const response = await api.post('/prospects/import', { prospects });
    return response.data;
  },
  
  importCsv: async (file: File): Promise<Prospect[]> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/prospects/import-csv', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },
  
  classify: async (id: number): Promise<{ classification: string }> => {
    const response = await api.get(`/prospects/${id}/classification`);
    return response.data;
  },
};

// Emails API
export const emailsApi = {
  generate: async (prospectId: number): Promise<EmailGenerateResponse> => {
    const response = await api.post('/emails/generate', null, { params: { prospect_id: prospectId } });
    return response.data;
  },
  
  send: async (prospectId: number): Promise<EmailSendResponse> => {
    const response = await api.post('/emails/send', null, { params: { prospect_id: prospectId } });
    return response.data;
  },
  
  sendBatch: async (prospectIds: number[]): Promise<{ prospect_id: number, status: string }[]> => {
    const response = await api.post('/emails/send-batch', { prospect_ids: prospectIds });
    return response.data;
  },
  
  getEngagement: async (engagementId: number): Promise<{ id: number; type: string; status: string; metadata: Record<string, unknown> }> => {
    const response = await api.get(`/emails/engagement/${engagementId}`);
    return response.data;
  },
  
  trackEngagement: async (engagementId: number, eventType: 'open' | 'click' | 'reply'): Promise<{ id: number; type: string; status: string; event: string }> => {
    const response = await api.post(`/emails/engagement/${engagementId}/track`, null, { params: { event_type: eventType } });
    return response.data;
  },
};

// Calls API (Bonus Feature)
export const callsApi = {
  generateScript: async (prospectId: number): Promise<CallScriptGenerateResponse> => {
    const response = await api.post('/calls/generate-script', null, { params: { prospect_id: prospectId } });
    return response.data;
  },
  
  makeCall: async (prospectId: number): Promise<CallMakeResponse> => {
    const response = await api.post('/calls/make-call', null, { params: { prospect_id: prospectId } });
    return response.data;
  },
  
  updateOutcome: async (engagementId: number, outcome: CallOutcome): Promise<{ success: boolean; engagement_id: number; updated: boolean }> => {
    const response = await api.post(`/calls/update-outcome`, outcome, { params: { engagement_id: engagementId } });
    return response.data;
  },
};

const apiService = {
  prospects: prospectsApi,
  emails: emailsApi,
  calls: callsApi,
};

export default apiService;
