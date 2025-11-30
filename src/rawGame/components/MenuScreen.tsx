import React from 'react';
import { Brain, Play } from 'lucide-react';

interface MenuScreenProps {
  onStart: () => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen neuro-grid flex flex-col items-center justify-center text-center p-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 pointer-events-none" />
      
      <div className="z-10 animate-float">
        <Brain className="w-24 h-24 text-cyan-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
        <h1 className="text-5xl font-bold font-sans mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          NEURO KIDS
        </h1>
        <h2 className="text-2xl text-purple-200 font-mono mb-8 tracking-widest">MATH 1-20</h2>
      </div>

      <div className="z-10 space-y-4">
        <button 
          onClick={onStart}
          className="group relative px-8 py-4 bg-cyan-600 hover:bg-cyan-500 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105"
          aria-label="Start game"
        >
          <div className="flex items-center gap-3">
            <Play className="w-6 h-6 text-white" />
            <span className="text-xl font-bold text-white">Start</span>
          </div>
        </button>
      </div>
    </div>
  );
};

