import React from 'react';
import { Problem } from '../types';

interface ProblemDisplayProps {
  problem: Problem | null;
  userAnswer: string;
}

export const ProblemDisplay: React.FC<ProblemDisplayProps> = ({ problem, userAnswer }) => {
  if (!problem) return null;

  const questionPart = problem.question.split('=')[0];

  return (
    <div className="mb-8 text-center">
      <h1 
        className="text-6xl md:text-8xl font-bold font-mono tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
        aria-label={`Question: ${problem.question}, Your answer: ${userAnswer || 'not entered'}`}
      >
        {questionPart}
        <span className="text-slate-500">=</span>
        <span className="text-amber-400 ml-4 animate-pulse">{userAnswer || '?'}</span>
      </h1>
    </div>
  );
};

