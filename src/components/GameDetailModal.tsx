import React, { useState, useEffect } from 'react';
import { Game, Goal } from '../types/game';

interface GameDetailModalProps {
  game: Game | null;
  onClose: () => void;
  onUpdateGame: (updatedGame: Game) => void;
}

export const GameDetailModal: React.FC<GameDetailModalProps> = ({
  game,
  onClose,
  onUpdateGame,
}) => {
  if (!game) return null;

  const [notes, setNotes] = useState(game.notes);
  const [goals, setGoals] = useState<Goal[]>(game.goals);
  const [newGoalTitle, setNewGoalTitle] = useState('');

  // Sync state whenever selected game changes
  useEffect(() => {
    setNotes(game.notes);
    setGoals(game.goals);
    setNewGoalTitle('');
  }, [game]);

  // Close modal on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const formatHours = (seconds: number) => {
    return `${(seconds / 3600).toFixed(1)}h`;
  };

  const handleGoalToggle = (goalId: string) => {
    const updatedGoals = goals.map((g) =>
      g.id === goalId ? { ...g, isCompleted: !g.isCompleted } : g
    );
    setGoals(updatedGoals);
    onUpdateGame({ ...game, notes, goals: updatedGoals });
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    const newGoal: Goal = {
      id: Date.now().toString(),
      title: newGoalTitle.trim(),
      isCompleted: false,
    };
    const updatedGoals = [...goals, newGoal];
    setGoals(updatedGoals);
    setNewGoalTitle('');
    onUpdateGame({ ...game, notes, goals: updatedGoals });
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedNotes = e.target.value;
    setNotes(updatedNotes);
    onUpdateGame({ ...game, notes: updatedNotes, goals });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-dark-card border border-dark-border rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner Header */}
        <div className="relative h-44 bg-dark-bg border-b border-dark-border">
          <img
            src={game.coverUrl}
            alt={game.title}
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent" />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-dark-bg/80 hover:bg-dark-hover text-gray-300 hover:text-white w-8 h-8 rounded-full flex items-center justify-center border border-dark-border text-sm transition-colors"
          >
            ✕
          </button>

          <div className="absolute bottom-4 left-6 flex items-end gap-4">
            <img
              src={game.coverUrl}
              alt={game.title}
              className="w-20 h-24 object-cover rounded-xl border border-dark-border shadow-lg"
            />
            <div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-accent-primary/20 text-indigo-400 border border-indigo-500/30">
                {game.status}
              </span>
              <h2 className="text-2xl font-bold text-white mt-1">{game.title}</h2>
              <p className="text-xs text-gray-400 font-mono mt-0.5">{game.exeName}</p>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Stats Summary */}
          <div className="grid grid-cols-3 gap-3 font-mono text-xs">
            <div className="bg-dark-bg p-3 rounded-xl border border-dark-border">
              <span className="text-gray-400 block mb-1">Active Time</span>
              <span className="text-emerald-400 text-base font-semibold">
                {formatHours(game.totalActiveSeconds)}
              </span>
            </div>
            <div className="bg-dark-bg p-3 rounded-xl border border-dark-border">
              <span className="text-gray-400 block mb-1">AFK Time</span>
              <span className="text-amber-400 text-base font-semibold">
                {formatHours(game.totalAfkSeconds)}
              </span>
            </div>
            <div className="bg-dark-bg p-3 rounded-xl border border-dark-border">
              <span className="text-gray-400 block mb-1">Last Played</span>
              <span className="text-white text-sm font-semibold">
                {game.lastPlayed || 'Never'}
              </span>
            </div>
          </div>

          {/* Launcher Actions */}
          <div className="flex gap-3">
            <button className="flex-1 bg-accent-primary hover:bg-indigo-600 text-white font-semibold py-2.5 px-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-colors flex items-center justify-center gap-2 text-sm">
              <span>▶</span> Launch Game
            </button>
            {game.officialUrl && (
              <a
                href={game.officialUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-dark-hover hover:bg-dark-border text-gray-200 py-2.5 px-4 rounded-xl border border-dark-border text-sm flex items-center gap-2 transition-colors"
              >
                🌐 Official Website
              </a>
            )}
          </div>

          {/* Personal Notes */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              📝 Personal Notes
            </h3>
            <textarea
              value={notes}
              onChange={handleNotesChange}
              placeholder="Add modpack details, build configs, or notes..."
              className="w-full bg-dark-bg border border-dark-border rounded-xl p-3 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-accent-primary resize-none h-24"
            />
          </div>

          {/* In-Game Goals */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
              🎯 In-Game Goals
            </h3>
            <div className="space-y-2 mb-3">
              {goals.map((goal) => (
                <label
                  key={goal.id}
                  className="flex items-center gap-3 bg-dark-bg border border-dark-border p-3 rounded-xl cursor-pointer hover:border-dark-hover transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={goal.isCompleted}
                    onChange={() => handleGoalToggle(goal.id)}
                    className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
                  />
                  <span
                    className={`text-sm ${
                      goal.isCompleted
                        ? 'line-through text-gray-500'
                        : 'text-gray-200'
                    }`}
                  >
                    {goal.title}
                  </span>
                </label>
              ))}
            </div>

            <form onSubmit={handleAddGoal} className="flex gap-2">
              <input
                type="text"
                value={newGoalTitle}
                onChange={(e) => setNewGoalTitle(e.target.value)}
                placeholder="Add a new goal..."
                className="flex-1 bg-dark-bg border border-dark-border rounded-xl px-3 py-2 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-accent-primary"
              />
              <button
                type="submit"
                className="bg-dark-hover hover:bg-dark-border border border-dark-border text-white text-sm px-4 py-2 rounded-xl transition-colors font-medium"
              >
                Add
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};