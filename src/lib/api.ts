const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const TENANT_ID = '00000000-0000-0000-0000-000000000000'; // Placeholder tenant ID

// Types
export interface Client {
  id: string;
  name: string;
  contactName?: string;
  email?: string;
  phone?: string;
  industry?: string;
  status: string;
  totalRevenue: number;
  activeProjectsCount: number;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  clientId: string;
  status: string;
  health: string;
  totalBudget: number;
  totalSpent: number;
  expectedEndDate?: string;
  progress: number;
}

// Clients API
export const clientsApi = {
  getAll: async (): Promise<Client[]> => {
    const response = await fetch(`${API_BASE_URL}/clients?tenantId=${TENANT_ID}`);
    if (!response.ok) throw new Error('Failed to fetch clients');
    return response.json();
  },

  getById: async (id: string): Promise<Client> => {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`);
    if (!response.ok) throw new Error('Failed to fetch client');
    return response.json();
  },

  create: async (client: Omit<Client, 'id'>): Promise<Client> => {
    const response = await fetch(`${API_BASE_URL}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tenantId: TENANT_ID, ...client }),
    });
    if (!response.ok) throw new Error('Failed to create client');
    return response.json();
  },

  update: async (id: string, client: Partial<Client>): Promise<Client> => {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(client),
    });
    if (!response.ok) throw new Error('Failed to update client');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete client');
  },
};

// Projects API
export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await fetch(`${API_BASE_URL}/projects?tenantId=${TENANT_ID}`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  getById: async (id: string): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return response.json();
  },

  getByClient: async (clientId: string): Promise<Project[]> => {
    const response = await fetch(`${API_BASE_URL}/projects/client/${clientId}`);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return response.json();
  },

  create: async (project: Omit<Project, 'id' | 'progress'>): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tenantId: TENANT_ID,
        managerId: '00000000-0000-0000-0000-000000000001', // Placeholder
        ...project,
      }),
    });
    if (!response.ok) throw new Error('Failed to create project');
    return response.json();
  },

  update: async (id: string, project: Partial<Project>): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(project),
    });
    if (!response.ok) throw new Error('Failed to update project');
    return response.json();
  },

  delete: async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete project');
  },
};
