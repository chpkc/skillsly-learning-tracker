
import React from 'react';
import { LayoutDashboard, Users, Settings, LogOut } from 'lucide-react';

const AdminLayout = ({ children, onExit }) => {
  return (
    <div className="flex h-screen bg-neutral-950 text-white font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-neutral-800 bg-neutral-900/50 hidden md:flex flex-col">
        <div className="p-6 border-b border-neutral-800">
          <h2 className="text-xl font-bold tracking-tight text-blue-500">Skillsly Admin</h2>
          <p className="text-xs text-neutral-500 mt-1">Data Analysis Portal</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-500/10 text-blue-400 rounded-lg text-sm font-medium">
            <LayoutDashboard size={18} />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-lg text-sm font-medium transition-colors">
            <Users size={18} />
            Users
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-3 text-neutral-400 hover:bg-neutral-800 hover:text-white rounded-lg text-sm font-medium transition-colors">
            <Settings size={18} />
            Settings
          </a>
        </nav>

        <div className="p-4 border-t border-neutral-800">
          <button 
            onClick={onExit}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors"
          >
            <LogOut size={18} />
            Exit Admin
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-neutral-950">
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
