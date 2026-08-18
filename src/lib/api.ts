export const TENANT_ID = '550e8400-e29b-41d4-a716-446655440000';
export const API_BASE_URL = 'http://a8f2e2b674e4a47bea093810e970eac0-1139740659.us-west-1.elb.amazonaws.com:8080/api';

export type ClientStatus = 'Active' | 'Inactive' | 'Prospect';
export type ProjectStatus = 'Planning' | 'Active' | 'Delayed' | 'Completed';
export type ProjectHealth = 'Good' | 'At Risk' | 'Critical';

export interface Client {
  id: string;
  tenantId: string;
  name: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  status: ClientStatus;
  totalRevenue: number;
  activeProjectsCount: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string | null;
  updatedBy?: string | null;
  isDeleted?: boolean;
}

export interface Project {
  id: string;
  tenantId: string;
  name: string;
  description?: string | null;
  clientId: string;
  managerId?: string | null;
  status: ProjectStatus;
  health: ProjectHealth;
  totalBudget: number;
  totalSpent: number;
  expectedEndDate?: string | null;
  progress: number;
  createdAt: string;
  updatedAt: string;
  client?: {
    id: string;
    name: string;
  } | null;
}

async function apiRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: unknown
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-Tenant-Id': TENANT_ID,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export const clientsApi = {
  getAll: () => apiRequest<Client[]>('/clients'),
  getById: (id: string) => apiRequest<Client>(`/clients/${id}`),
  create: (client: Omit<Client, 'id' | 'tenantId' | 'createdAt' | 'updatedAt'>) =>
    apiRequest<Client>('/clients', 'POST', client),
  update: (id: string, client: Partial<Client>) =>
    apiRequest<Client>(`/clients/${id}`, 'PUT', client),
  delete: (id: string) => apiRequest<void>(`/clients/${id}`, 'DELETE'),
};

export const projectsApi = {
  getAll: () => apiRequest<Project[]>('/projects'),
  getById: (id: string) => apiRequest<Project>(`/projects/${id}`),
  getByClient: (clientId: string) => apiRequest<Project[]>(`/projects/client/${clientId}`),
  create: (project: Omit<Project, 'id' | 'tenantId' | 'createdAt' | 'updatedAt' | 'progress'>) =>
    apiRequest<Project>('/projects', 'POST', project),
  update: (id: string, project: Partial<Project>) =>
    apiRequest<Project>(`/projects/${id}`, 'PUT', project),
  delete: (id: string) => apiRequest<void>(`/projects/${id}`, 'DELETE'),
};
