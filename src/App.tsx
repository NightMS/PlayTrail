import { useState } from 'react';
import { Sidebar, TabType } from './components/Sidebar';
import { CurrentlyPlaying } from './components/CurrentlyPlaying';
import { GameLibrary } from './components/GameLibrary';
import { MOCK_ACTIVE_SESSION, MOCK_GAMES } from './data/mockGames';
import { Game } from './types/game';

export function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [games, setGames] = useState<Game[]>(MOCK_GAMES);

  const handleUpdateGame = (updatedGame: Game) => {
    setGames((prev) =>
      prev.map((g) => (g.id === updatedGame.id ? updatedGame : g))
    );
  };

  const formatHours = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="flex h-screen bg-dark-bg text-gray-100 overflow-hidden select-none">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === 'dashboard' && (
          <div className="max-w-5xl mx-auto space-y-8">
            <header className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                <p className="text-sm text-gray-400 mt-1">Overview of your current session & playtime statistics</p>
              </div>
            </header>

            <CurrentlyPlaying session={MOCK_ACTIVE_SESSION} />

            <div>
              <h2 className="text-xl font-bold text-white mb-4">Top Tracked Games</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {games.map((game) => (
                  <div key={game.id} className="bg-dark-card border border-dark-border p-4 rounded-xl flex items-center gap-4 hover:border-dark-hover transition-colors">
                    <img src={game.coverUrl} alt={game.title} className="w-14 h-16 object-cover rounded-lg border border-dark-border" />
                    <div>
                      <h3 className="font-semibold text-white text-sm line-clamp-1">{game.title}</h3>
                      <p className="text-xs text-emerald-400 font-mono mt-1">
                        Active: {formatHours(game.totalActiveSeconds)}
                      </p>
                      <p className="text-xs text-amber-400 font-mono">
                        AFK: {formatHours(game.totalAfkSeconds)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'library' && (
          <div className="max-w-5xl mx-auto space-y-6">
            <header>
              <h1 className="text-3xl font-bold text-white">Game Library</h1>
              <p className="text-sm text-gray-400 mt-1">Manage games, statuses, personal notes, and goals</p>
            </header>
            <GameLibrary games={games} onUpdateGame={handleUpdateGame} />
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Gacha Event Calendar</h1>
            <p className="text-sm text-gray-400 mb-6">Upcoming updates, event dates, and livestreams</p>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
            <p className="text-sm text-gray-400 mb-6">Configure system tray, autostart, and tracking options</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;