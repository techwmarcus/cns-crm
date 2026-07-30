import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  HardHat, 
  Users, 
  Wallet, 
  CalendarDays, 
  FileText, 
  Settings,
  ChevronLeft
} from 'lucide-react';
import { useAppStore } from '@/src/store/useAppStore';
import { cn } from '@/src/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Projects', href: '/projects', icon: HardHat },
  { name: 'Clients', href: '/clients', icon: Users },
  { name: 'Finances', href: '/finances', icon: Wallet },
  { name: 'Schedule', href: '/schedule', icon: CalendarDays },
  { name: 'Reports', href: '/reports', icon: FileText },
];

export function Sidebar() {
  const { sidebarOpen, toggleSidebar } = useAppStore();
  const location = useLocation();

  return (
    <div
      className={cn(
        'h-screen bg-[#0F0F12] border-r border-slate-800 flex flex-col relative flex-shrink-0 transition-all duration-200',
        sidebarOpen ? 'w-64' : 'w-20'
      )}
    >
      <div className="h-16 flex items-center px-4 border-b border-slate-800">
        <div className="flex items-center gap-3 overflow-hidden whitespace-nowrap">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <HardHat className="w-5 h-5 text-white" />
          </div>
          <span className={cn(
            "text-white font-bold text-lg transition-opacity duration-200",
            !sidebarOpen && "opacity-0"
          )}>
            BuildCore OS
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group relative",
                isActive 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
              title={!sidebarOpen ? item.name : undefined}
            >
              <item.icon className={cn("w-5 h-5 flex-shrink-0", isActive ? "text-white" : "text-slate-400 group-hover:text-white")} />
              <span className={cn(
                "whitespace-nowrap transition-opacity duration-200",
                !sidebarOpen && "opacity-0 w-0 hidden"
              )}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-slate-800 flex flex-col gap-1">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-slate-400 hover:bg-slate-800 hover:text-white group"
          title={!sidebarOpen ? "Settings" : undefined}
        >
          <Settings className="w-5 h-5 flex-shrink-0 group-hover:text-white" />
          <span className={cn(
            "whitespace-nowrap transition-opacity duration-200",
            !sidebarOpen && "opacity-0 w-0 hidden"
          )}>
            Settings
          </span>
        </Link>
        <button
          onClick={toggleSidebar}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-slate-400 hover:bg-slate-800 hover:text-white group mt-2"
        >
          <div className={cn('flex-shrink-0 transition-transform duration-200', !sidebarOpen && 'rotate-180')}>
            <ChevronLeft className="w-5 h-5 group-hover:text-white" />
          </div>
          <span className={cn(
            "whitespace-nowrap transition-opacity duration-200",
            !sidebarOpen && "opacity-0 w-0 hidden"
          )}>
            Collapse
          </span>
        </button>
      </div>
    </div>
  );
}
