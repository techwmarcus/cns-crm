import { Search, Filter, Plus, MoreHorizontal } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const projects = [
  {
    id: 'PRJ-1024',
    name: 'Downtown Commercial Plaza',
    client: 'Summit Group',
    manager: 'Alex Carter',
    status: 'Active',
    budget: 4500000,
    spent: 3100000,
    progress: 68,
    dueDate: 'Oct 15, 2026',
  },
  {
    id: 'PRJ-1025',
    name: 'Westside Residential Complex',
    client: 'Horizon Dev',
    manager: 'Sarah Jenkins',
    status: 'Delayed',
    budget: 12000000,
    spent: 4500000,
    progress: 34,
    dueDate: 'Dec 01, 2026',
  },
  {
    id: 'PRJ-1026',
    name: 'Medical Center Expansion',
    client: 'City Health',
    manager: 'Mike Ross',
    status: 'Active',
    budget: 8500000,
    spent: 7800000,
    progress: 89,
    dueDate: 'Aug 20, 2026',
  },
  {
    id: 'PRJ-1027',
    name: 'Highway 99 Overpass',
    client: 'State DOT',
    manager: 'David Chen',
    status: 'Planning',
    budget: 22000000,
    spent: 150000,
    progress: 5,
    dueDate: 'Mar 10, 2028',
  }
];

export function Projects() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Projects</h1>
          <p className="text-sm text-slate-400 mt-1">Manage all construction projects and their status.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      <div className="bg-[#16161A] border border-slate-800/50 rounded-xl shadow-sm overflow-hidden flex flex-col">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-800/50 flex flex-col sm:flex-row gap-4 justify-between items-center bg-[#09090B]">
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search projects..." 
              className="w-full pl-9 pr-4 py-2 border border-slate-800 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-[#16161A] text-slate-200"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 border border-slate-800 rounded-lg text-sm font-medium text-slate-300 hover:bg-slate-800 bg-[#16161A] w-full sm:w-auto justify-center transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] uppercase tracking-wider font-semibold text-slate-500 bg-[#09090B]">
                <th className="p-4 whitespace-nowrap">Project Name</th>
                <th className="p-4 whitespace-nowrap hidden md:table-cell">Client</th>
                <th className="p-4 whitespace-nowrap">Status</th>
                <th className="p-4 whitespace-nowrap hidden lg:table-cell">Progress</th>
                <th className="p-4 whitespace-nowrap text-right">Budget</th>
                <th className="p-4 whitespace-nowrap w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-sm">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-slate-800/30 transition-colors group cursor-pointer text-slate-300">
                  <td className="p-4">
                    <div className="font-medium text-slate-200">{project.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{project.id} • Due {project.dueDate}</div>
                  </td>
                  <td className="p-4 hidden md:table-cell text-slate-400">
                    {project.client}
                  </td>
                  <td className="p-4">
                    <span className={cn(
                      "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase",
                      project.status === 'Active' ? "bg-blue-500/10 text-blue-500" :
                      project.status === 'Delayed' ? "bg-red-500/10 text-red-500" :
                      project.status === 'Planning' ? "bg-slate-700 text-slate-400" :
                      "bg-green-500/10 text-green-500"
                    )}>
                      {project.status}
                    </span>
                  </td>
                  <td className="p-4 hidden lg:table-cell min-w-[150px]">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full",
                            project.status === 'Delayed' ? "bg-red-500" : "bg-blue-500"
                          )}
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-mono text-slate-400 w-8">{project.progress}%</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="font-medium text-slate-200">${(project.budget / 1000000).toFixed(1)}M</div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      ${(project.spent / 1000000).toFixed(1)}M spent
                    </div>
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
