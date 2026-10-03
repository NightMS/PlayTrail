import React, { useState } from 'react';
import { Game, GameStatus } from '../types/game';
import { GameDetailModal } from './GameDetailModal';

interface GameLibraryProps {
  games: Game[];
  onUpdateGame: (updatedGame: Game) => void;
}

export const GameLibrary: React.FC<GameLibraryProps> = ({ games, onUpdateGame }) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<GameStatus | 'All'>('All');

  const statuses: (GameStatus | 'All')[] = ['All', 'Playing', 'Backlog', 'Completed', 'On Hold', 'Dropped'];

  const filteredGames = games.filter((game) => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'All' || game.status === selectedStatus;
    return matchesSearch && matchesStatus && !game.isHidden;
  });

  const formatHours = (seconds: number) => {
    return `${(seconds / 3600).toFixed(0)}h`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search library..."
          className="bg-dark-card border border-dark-border px-4 py-2.5 rounded-xl text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-accent-primary w-full md:w-72"
        />

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedStatus === status
                  ? 'bg-accent-primary text-white shadow-md shadow-indigo-500/20'
                  : 'bg-dark-card text-gray-400 hover:text-white border border-dark-border hover:bg-dark-hover'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => setSelectedGame(game)}
            className="bg-dark-card border border-dark-border rounded-2xl p-4 flex flex-col justify-between hover:border-dark-hover hover:scale-[1.01] transition-all cursor-pointer group"
          >
            <div>
              <div className="relative mb-3 rounded-xl overflow-hidden aspect-video bg-dark-bg border border-dark-border">
                <img
                  src={game.coverUrl}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 text-xs font-semibold px-2 py-0.5 rounded-md bg-dark-bg/80 text-indigo-400 border border-dark-border backdrop-blur-sm">
                  {game.status}
                </span>
              </div>

              <h3 className="font-bold text-white text-base mb-1 line-clamp-1">
                {game.title}
              </h3>

              <div className="flex flex-wrap gap-1.5 mb-3">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-dark-bg text-gray-400 border border-dark-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-dark-border flex justify-between items-center text-xs font-mono">
              <div>
                <span className="text-gray-500 block text-[10px]">Active</span>
                <span className="text-emerald-400 font-semibold">
                  {formatHours(game.totalActiveSeconds)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-gray-500 block text-[10px]">AFK</span>
                <span className="text-amber-400 font-semibold">
                  {formatHours(game.totalAfkSeconds)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <GameDetailModal
        game={selectedGame}
        onClose={() => setSelectedGame(null)}
        onUpdateGame={(updated) => {
          onUpdateGame(updated);
          setSelectedGame(updated);
        }}
      />
    </div>
  );
};