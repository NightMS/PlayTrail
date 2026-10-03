import React from 'react';

export type TabType = 'dashboard' | 'library' | 'calendar' | 'settings';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: '🎮' },
    { id: 'library', label: 'Game Library', icon: '📚' },
    { id: 'calendar', label: 'Gacha Calendar', icon: '📅' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <aside className="w-64 bg-dark-card border-r border-dark-border flex flex-col h-screen select-none">
      <div className="p-6 border-b border-dark-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent-primary flex items-center justify-center font-bold text-lg text-white shadow-lg shadow-indigo-500/20">
            PT
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-wide text-white">PlayTrail</h1>
            <p className="text-xs font-medium text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Local Tracker
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1.5">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-accent-primary text-white shadow-lg shadow-indigo-500/25'
                  : 'text-gray-400 hover:text-white hover:bg-dark-hover'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-dark-border text-xs text-gray-500 text-center">
        PlayTrail v0.1.0 • Phase 1
      </div>
    </aside>
  );
};