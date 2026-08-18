import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { clientsApi, projectsApi, Client, Project } from '../lib/api';

interface AppState {
  theme: 'light' | 'dark';
  sidebarOpen: boolean;
  clients: Client[];
  projects: Project[];
  loading: boolean;
  error: string | null;
  
  toggleTheme: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  // API operations
  fetchClients: () => Promise<void>;
  fetchProjects: () => Promise<void>;
  addClient: (client: Omit<Client, 'id'>) => Promise<void>;
  addProject: (project: Omit<Project, 'id' | 'progress'>) => Promise<void>;
  updateClient: (id: string, client: Partial<Client>) => Promise<void>;
  updateProject: (id: string, project: Partial<Project>) => Promise<void>;
  deleteClient: (id: string) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      theme: 'light',
      sidebarOpen: true,
      clients: [],
      projects: [],
      loading: false,
      error: null,
      
      toggleTheme: () =>
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      toggleSidebar: () =>
        set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      fetchClients: async () => {
        set({ loading: true, error: null });
        try {
          const clients = await clientsApi.getAll();
          set({ clients, loading: false });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch clients', loading: false });
        }
      },
      
      fetchProjects: async () => {
        set({ loading: true, error: null });
        try {
          const projects = await projectsApi.getAll();
          set({ projects, loading: false });
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to fetch projects', loading: false });
        }
      },
      
      addClient: async (client) => {
        try {
          const newClient = await clientsApi.create(client);
          set((state) => ({ clients: [...state.clients, newClient] }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add client' });
        }
      },
      
      addProject: async (project) => {
        try {
          const newProject = await projectsApi.create(project);
          set((state) => ({ projects: [...state.projects, newProject] }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to add project' });
        }
      },
      
      updateClient: async (id, client) => {
        try {
          const updated = await clientsApi.update(id, client);
          set((state) => ({
            clients: state.clients.map((c) => (c.id === id ? updated : c)),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update client' });
        }
      },
      
      updateProject: async (id, project) => {
        try {
          const updated = await projectsApi.update(id, project);
          set((state) => ({
            projects: state.projects.map((p) => (p.id === id ? updated : p)),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to update project' });
        }
      },
      
      deleteClient: async (id) => {
        try {
          await clientsApi.delete(id);
          set((state) => ({
            clients: state.clients.filter((c) => c.id !== id),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to delete client' });
        }
      },
      
      deleteProject: async (id) => {
        try {
          await projectsApi.delete(id);
          set((state) => ({
            projects: state.projects.filter((p) => p.id !== id),
          }));
        } catch (error) {
          set({ error: error instanceof Error ? error.message : 'Failed to delete project' });
        }
      },
    }),
    {
      name: 'construction-crm-storage',
      partialize: (state) => ({
        theme: state.theme,
        sidebarOpen: state.sidebarOpen,
      }),
    }
  )
);
