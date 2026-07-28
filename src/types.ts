export type ProjectStatus = 'Planning' | 'Active' | 'Delayed' | 'Completed';

export interface Project {
  id: string;
  name: string;
  client: string;
  status: ProjectStatus;
  budget: number;
  spent: number;
  startDate: string;
  endDate: string;
  progress: number;
  health: 'Good' | 'At Risk' | 'Critical';
}

export interface KPI {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down';
}

export interface ChartData {
  name: string;
  revenue: number;
  expenses: number;
}
