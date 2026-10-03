import React from 'react';
import { ActiveSession } from '../types/game';

interface CurrentlyPlayingProps {
  session: ActiveSession | null;
}

export const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({ session }) => {
  if (!session) {
    return (
      <div className="bg-dark-card border border-dark-border rounded-2xl p-6 text-center text-gray-400">
        <p className="text-lg font-medium">No game currently running</p>
        <p className="text-xs text-gray-500 mt-1">
          Launch a game and PlayTrail will automatically start tracking your playtime!
        </p>
      </div>
    );
  }

  const formatTime = (totalSeconds: number) => {
    const hrs = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSessionSeconds = session.activeSeconds + session.afkSeconds;
  const activePercent = totalSessionSeconds > 0 
    ? Math.round((session.activeSeconds / totalSessionSeconds) * 100) 
    : 100;

  return (
    <div className="bg-dark-card border border-dark-border rounded-2xl p-6 shadow-xl relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${session.coverUrl})` }}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase tracking-wider font-semibold text-accent-primary bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Currently Playing
          </span>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
            session.isFocused ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
          }`}>
            <span className={`w-2 h-2 rounded-full ${session.isFocused ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
            {session.isFocused ? 'Window Focused (Active)' : 'In Background (AFK)'}
          </span>
        </div>

        <div className="flex items-center gap-5 mb-6">
          <img 
            src={session.coverUrl} 
            alt={session.title} 
            className="w-20 h-24 object-cover rounded-xl shadow-md border border-dark-border"
          />
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">{session.title}</h2>
            <p className="text-sm text-gray-400 font-mono">
              Session Total: <span className="text-white font-semibold">{formatTime(totalSessionSeconds)}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm font-mono">
          <div className="bg-dark-bg/60 border border-dark-border p-3 rounded-xl">
            <span className="text-xs text-gray-400 block mb-1">Active Time</span>
            <span className="text-emerald-400 font-semibold text-base">{formatTime(session.activeSeconds)}</span>
          </div>
          <div className="bg-dark-bg/60 border border-dark-border p-3 rounded-xl">
            <span className="text-xs text-gray-400 block mb-1">AFK Time</span>
            <span className="text-amber-400 font-semibold text-base">{formatTime(session.afkSeconds)}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs text-gray-400 mb-1.5 font-medium">
            <span>Active Ratio</span>
            <span className="text-white">{activePercent}% Active</span>
          </div>
          <div className="w-full bg-dark-bg h-3 rounded-full overflow-hidden flex border border-dark-border">
            <div 
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${activePercent}%` }}
            />
            <div 
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${100 - activePercent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};