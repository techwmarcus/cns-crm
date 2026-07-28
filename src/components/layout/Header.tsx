import { Search, Bell, Menu } from 'lucide-react';
import { useAppStore } from '@/src/store/useAppStore';

export function Header() {
  const { toggleSidebar } = useAppStore();

  return (
    <header className="h-16 bg-[#09090B] border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="lg:hidden p-2 -ml-2 text-slate-400 hover:bg-slate-800 rounded-lg"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        <div className="max-w-md w-full relative hidden sm:block">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-slate-800 rounded-lg leading-5 bg-[#16161A] text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent sm:text-sm transition-colors"
            placeholder="Search projects, clients, invoices (⌘K)"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 text-slate-400 hover:bg-slate-800 rounded-lg transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full"></span>
        </button>
        
        <div className="h-8 w-px bg-slate-800 mx-2"></div>
        
        <button className="flex items-center gap-2 hover:bg-slate-800 p-1 pr-2 rounded-full border border-transparent hover:border-slate-700 transition-all">
          <img
            className="h-8 w-8 rounded-full object-cover border border-slate-700"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User avatar"
          />
          <span className="text-sm font-medium text-slate-200 hidden md:block">
            Alex Carter
          </span>
        </button>
      </div>
    </header>
  );
}
