import React from 'react';
import { GAME_CONFIG } from '../constants';

type InputValue = number | 'DEL' | 'ENTER';

interface NumberPadProps {
  onInput: (value: InputValue) => void;
  disabled?: boolean;
}

export const NumberPad: React.FC<NumberPadProps> = ({ onInput, disabled = false }) => {
  const handleClick = (value: InputValue) => {
    if (disabled) return;
    onInput(value);
  };

  const numberButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className="w-full max-w-sm px-4">
      <div className="grid grid-cols-3 gap-3">
        {numberButtons.map((num) => (
          <button
            key={num}
            onClick={() => handleClick(num)}
            disabled={disabled}
            className="h-16 text-3xl font-bold bg-neuro-surface hover:bg-slate-700 rounded-xl border border-white/5 transition-colors shadow-lg active:scale-95 hover:border-cyan-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={`Number ${num}`}
          >
            {num}
          </button>
        ))}
        
        <button
          onClick={() => handleClick('DEL')}
          disabled={disabled}
          className="h-16 text-lg text-red-400 font-bold bg-neuro-surface hover:bg-red-900/20 rounded-xl border border-white/5 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Delete last digit"
        >
          DEL
        </button>
        
        <button
          onClick={() => handleClick(0)}
          disabled={disabled}
          className="h-16 text-3xl font-bold bg-neuro-surface hover:bg-slate-700 rounded-xl border border-white/5 transition-colors shadow-lg hover:border-cyan-500/50 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Number 0"
        >
          0
        </button>
        
        <button
          onClick={() => handleClick('ENTER')}
          disabled={disabled}
          className="h-16 text-lg text-green-400 font-bold bg-neuro-surface hover:bg-green-900/20 rounded-xl border border-green-500/30 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.2)] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Submit answer"
        >
          GO
        </button>
      </div>
    </div>
  );
};

