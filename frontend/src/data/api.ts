import axios from 'axios';
import { Machine, ProductionOrder, MachineStop, OEEMetric, DashboardSummary } from '../types';

const API_BASE = '/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Machines
export const machineAPI = {
  list: () => api.get<{ success: boolean; data: Machine[] }>('/machines'),
  get: (id: number) => api.get<{ success: boolean; data: Machine }>(`/machines/${id}`),
  updateStatus: (id: number, status: string) => api.post(`/machines/${id}/status`, { status }),
  getMetrics: (id: number) => api.get<{ success: boolean; data: OEEMetric[] }>(`/machines/${id}/metrics`),
};

// Production Orders
export const productionAPI = {
  list: (machineId?: number) => {
    const params = machineId ? `?machine_id=${machineId}` : '';
    return api.get<{ success: boolean; data: ProductionOrder[] }>(`/production-orders${params}`);
  },
};

// Machine Stops
export const stopsAPI = {
  list: (machineId?: number) => {
    const params = machineId ? `?machine_id=${machineId}` : '';
    return api.get<{ success: boolean; data: MachineStop[] }>(`/stops${params}`);
  },
};

// Dashboard
export const dashboardAPI = {
  summary: () => api.get<{ success: boolean; data: DashboardSummary }>('/dashboard/summary'),
};

export default api;
