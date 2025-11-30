import React from 'react';
import { Star, Activity } from 'lucide-react';
import { UserProfile } from '../types';

interface GameHeaderProps {
  profile: UserProfile;
}

export const GameHeader: React.FC<GameHeaderProps> = ({ profile }) => {
  const level = Math.floor(profile.elo / 100);
  const streakBars = Math.min(5, profile.streak);

  return (
    <header className="p-4 flex justify-between items-center bg-neuro-surface/50 backdrop-blur-sm border-b border-white/10 z-10">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-amber-400" aria-label={`Stars: ${profile.stars}`}>
          <Star className="fill-current w-5 h-5" />
          <span className="font-mono font-bold text-xl">{profile.stars}</span>
        </div>
        <div className="h-8 w-px bg-white/10" aria-hidden="true" />
        <div className="flex items-center gap-2 text-cyan-400" aria-label={`Level: ${level}`}>
          <Activity className="w-5 h-5" />
          <span className="font-mono text-sm">Lv: {level}</span>
        </div>
      </div>
      <div className="flex items-center gap-2" aria-label={`Streak: ${profile.streak}`}>
        <span className="text-xs uppercase tracking-widest text-slate-400">Streak</span>
        <div className="flex gap-1">
          {Array.from({ length: streakBars }).map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-6 bg-green-400 rounded-full shadow-[0_0_8px_rgba(74,222,128,0.6)]"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
    </header>
  );
};

