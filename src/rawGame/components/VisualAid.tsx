import React from 'react';
import { Visualizer } from './Visualizer';
import { Problem, ProblemType } from '../types';
import { VISUAL_CONFIG } from '../constants';

interface VisualAidProps {
  problem: Problem;
}

export const VisualAid: React.FC<VisualAidProps> = ({ problem }) => {
  if (!problem.visualData) return null;

  const { a, b, operator } = problem.visualData;
  const isSubtraction = problem.type === ProblemType.SUBTRACTION;

  return (
    <div className="mb-6 w-full flex flex-col md:flex-row gap-4 items-center justify-center animate-float">
      <Visualizer 
        key={`a-${problem.id}`} 
        count={a} 
        color={VISUAL_CONFIG.COLORS.PRIMARY} 
      />
      
      <div 
        className="text-4xl font-mono text-slate-400 font-bold bg-slate-800/50 w-12 h-12 rounded-full flex items-center justify-center border border-slate-700 shadow-xl"
        aria-label={`Operator: ${operator}`}
      >
        {operator}
      </div>
      
      <Visualizer 
        key={`b-${problem.id}`} 
        count={b} 
        color={VISUAL_CONFIG.COLORS.SECONDARY}
        isSubtraction={isSubtraction}
      />
    </div>
  );
};

