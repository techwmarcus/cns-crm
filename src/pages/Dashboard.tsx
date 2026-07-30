import { 
  TrendingUp, 
  Wallet, 
  HardHat, 
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle2,
  CloudLightning
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const revenueData = [
  { month: 'Jan', revenue: 450000, expenses: 320000 },
  { month: 'Feb', revenue: 520000, expenses: 380000 },
  { month: 'Mar', revenue: 480000, expenses: 350000 },
  { month: 'Apr', revenue: 610000, expenses: 410000 },
  { month: 'May', revenue: 590000, expenses: 430000 },
  { month: 'Jun', revenue: 750000, expenses: 480000 },
];

const activeProjects = [
  {
    id: 'PRJ-1024',
    name: 'Downtown Commercial Plaza',
    client: 'Summit Group',
    progress: 68,
    status: 'On Track',
    health: 'Good'
  },
  {
    id: 'PRJ-1025',
    name: 'Westside Residential Complex',
    client: 'Horizon Dev',
    progress: 34,
    status: 'Delayed',
    health: 'At Risk'
  },
  {
    id: 'PRJ-1026',
    name: 'Medical Center Expansion',
    client: 'City Health',
    progress: 89,
    status: 'On Track',
    health: 'Good'
  }
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Main Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Welcome back. Here's what's happening across your projects today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-[#16161A] border border-slate-800/50 text-slate-200 rounded-lg hover:bg-slate-800 text-sm font-medium transition-colors shadow-sm">
            Download Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors shadow-sm flex items-center gap-2">
            <HardHat className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Weather Alert Bar */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-start sm:items-center gap-3 text-amber-500">
        <CloudLightning className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
        <div className="text-sm">
          <span className="font-semibold text-amber-400">Weather Alert:</span> Heavy rain expected tomorrow at Westside Residential Complex. Consider securing exposed materials.
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Total Revenue (YTD)" 
          value="$3.4M" 
          change={+12.5} 
          icon={Wallet} 
          trend="up" 
        />
        <KPICard 
          title="Active Projects" 
          value="14" 
          change={+2} 
          icon={HardHat} 
          trend="up" 
          suffix="vs last month"
        />
        <KPICard 
          title="Budget Variance" 
          value="-$42.5k" 
          change={-3.2} 
          icon={TrendingUp} 
          trend="down" 
          suffix="under budget"
        />
        <KPICard 
          title="Critical RFIs" 
          value="5" 
          change={+1} 
          icon={AlertTriangle} 
          trend="down" 
          suffix="need attention"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-[#16161A] rounded-xl border border-slate-800/50 shadow-sm p-5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Financial Overview</h2>
            <select className="text-sm border-slate-800 rounded-md bg-[#09090B] text-slate-300 px-3 py-1.5 focus:ring-blue-500 focus:border-blue-500">
              <option>Last 6 Months</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>
          <div className="h-[300px] w-full rounded-lg border border-slate-800 bg-[#09090B] p-4 text-sm text-slate-400 flex items-center justify-center">
            Placeholder chart area
          </div>
        </div>

        {/* Project Health */}
        <div className="bg-[#16161A] rounded-xl border border-slate-800/50 shadow-sm p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Project Health</h2>
            <button className="text-sm text-blue-400 hover:text-blue-300 font-medium">View All</button>
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            {activeProjects.map((project) => (
              <div key={project.id} className="p-3 border border-slate-800/50 rounded-lg bg-[#09090B] hover:bg-slate-800/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-200">{project.name}</h3>
                    <p className="text-xs text-slate-400">{project.client}</p>
                  </div>
                  <span className={cn(
                    "text-xs px-2 py-1 rounded-full font-medium",
                    project.health === 'Good' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                  )}>
                    {project.health}
                  </span>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Progress</span>
                    <span className="font-medium text-slate-200">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5">
                    <div 
                      className={cn(
                        "h-1.5 rounded-full",
                        project.health === 'Good' ? "bg-blue-600" : "bg-red-500"
                      )} 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

function KPICard({ title, value, change, icon: Icon, trend, suffix }: any) {
  return (
    <div className="bg-[#16161A] p-5 rounded-xl border border-slate-800/50 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">{title}</h3>
        <div className="p-2 bg-slate-800/50 rounded-lg">
          <Icon className="w-5 h-5 text-slate-400" />
        </div>
      </div>
      <div className="flex items-baseline gap-2 mt-auto">
        <span className="text-2xl font-bold text-white">{value}</span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className={cn(
          "flex items-center text-xs font-medium",
          trend === 'up' ? "text-green-400" : "text-red-400"
        )}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
          {Math.abs(change)}%
        </span>
        {suffix && <span className="text-xs text-slate-500">{suffix}</span>}
      </div>
    </div>
  );
}
