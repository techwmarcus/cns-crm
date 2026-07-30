import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Projects } from './pages/Projects';
import { Clients } from './pages/Clients';
import './index.css';

// 1. Configure the modern React Router v7 layout instance
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        index: true, 
        element: <Dashboard /> 
      },
      { 
        path: "projects", 
        element: <Projects /> 
      },
      { 
        path: "clients", 
        element: <Clients /> 
      },
      { 
        path: "*", 
        element: <div className="p-8 text-center text-slate-500">Module coming soon</div> 
      }
    ]
  }
]);

// 2. Safely render into the primary DOM root tree element
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
