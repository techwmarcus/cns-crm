import { Search, Filter, Plus, Mail, Phone, MoreHorizontal } from 'lucide-react';

const clients = [
  {
    id: 'CLI-001',
    name: 'Summit Group',
    contact: 'Jessica Alba',
    email: 'jessica@summitgroup.com',
    phone: '+1 (555) 123-4567',
    activeProjects: 3,
    totalRevenue: 8500000,
    status: 'Active',
  },
  {
    id: 'CLI-002',
    name: 'Horizon Dev',
    contact: 'Marcus Chen',
    email: 'm.chen@horizondev.net',
    phone: '+1 (555) 987-6543',
    activeProjects: 1,
    totalRevenue: 12000000,
    status: 'Active',
  },
  {
    id: 'CLI-003',
    name: 'City Health Department',
    contact: 'Dr. Sarah Jenkins',
    email: 'sjenkins@cityhealth.gov',
    phone: '+1 (555) 456-7890',
    activeProjects: 1,
    totalRevenue: 4500000,
    status: 'Active',
  },
  {
    id: 'CLI-004',
    name: 'State DOT',
    contact: 'Robert Wilson',
    email: 'rwilson@dot.state.gov',
    phone: '+1 (555) 222-3333',
    activeProjects: 2,
    totalRevenue: 22000000,
    status: 'Onboarding',
  }
];

export function Clients() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Clients</h1>
          <p className="text-sm text-slate-400 mt-1">Manage client relationships and contact information.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Client
          </button>
        </div>
      </div>

      <div className="bg-[#16161A] border border-slate-800/50 rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-800/50 flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#09090B]">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#16161A] text-slate-200"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-800 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 bg-[#16161A] w-full sm:w-auto justify-center transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold text-slate-500 bg-[#09090B]">
                <th className="p-4 whitespace-nowrap">Company</th>
                <th className="p-4 whitespace-nowrap">Primary Contact</th>
                <th className="p-4 whitespace-nowrap hidden lg:table-cell text-right">Active Projects</th>
                <th className="p-4 whitespace-nowrap text-right">Total Value</th>
                <th className="p-4 whitespace-nowrap w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-sm">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-800/30 transition-colors group cursor-pointer text-slate-300">
                  <td className="p-4">
                    <div className="font-medium text-slate-200">{client.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{client.id}</div>
                  </td>
                  <td className="p-4 text-slate-400">
                    <div className="font-medium text-slate-200">{client.contact}</div>
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Mail className="w-3 h-3" /> {client.email}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500">
                        <Phone className="w-3 h-3" /> {client.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 hidden lg:table-cell text-right">
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-medium text-xs">
                      {client.activeProjects}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="font-medium text-slate-200">${(client.totalRevenue / 1000000).toFixed(1)}M</div>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-1.5 text-slate-500 hover:text-slate-200 hover:bg-slate-800 rounded-md transition-colors opacity-0 group-hover:opacity-100">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
