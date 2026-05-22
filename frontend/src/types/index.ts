export interface Machine {
  id: number;
  name: string;
  type: string;
  status: 'producing' | 'stopped' | 'idle' | 'maintenance' | 'offline';
  shift: 'morning' | 'afternoon' | 'night';
  availability: number;
  current_speed: number;
  oee: number;
  total_products: number;
  performance: number;
  operator: string | null;
  sku: string | null;
  operation: string;
  elapsed_time: string;
  quality?: number;
  production_time?: number;
  stop_time?: number;
}

export interface ProductionOrder {
  id: number;
  name: string;
  machine: string;
  status: 'draft' | 'running' | 'paused' | 'completed' | 'cancelled';
  produced: number;
  planned: number;
  quality: number;
  start_time: string;
}

export interface MachineStop {
  id: number;
  machine: string;
  start_time: string;
  end_time: string | null;
  general_cause: string;
  specific_cause: string;
  duration: number;
  status: 'ongoing' | 'completed';
  annotated: boolean;
}

export interface OEEMetric {
  date: string;
  availability: number;
  performance: number;
  quality: number;
  oee: number;
  produced: number;
}

export interface DashboardSummary {
  total_machines: number;
  producing: number;
  stopped: number;
  average_oee: number;
}
