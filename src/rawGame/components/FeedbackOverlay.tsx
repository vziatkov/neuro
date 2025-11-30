import React, { useEffect, useState } from 'react';

interface FeedbackOverlayProps {
  type: 'success' | 'error' | null;
  message: string;
}

export const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({ type, message }) => {
  if (!type) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className={`
        relative px-8 py-6 rounded-2xl border-2 backdrop-blur-md
        flex flex-col items-center transform transition-all duration-300 animate-float
        ${type === 'success' 
          ? 'bg-green-500/20 border-green-400 text-green-100 shadow-[0_0_50px_rgba(16,185,129,0.5)]' 
          : 'bg-red-500/20 border-red-400 text-red-100 shadow-[0_0_50px_rgba(239,68,68,0.5)]'}
      `}>
        <span className="text-6xl mb-2">
          {type === 'success' ? '🌟' : '🔧'}
        </span>
        <h2 className="text-3xl font-bold font-sans">{message}</h2>
      </div>
    </div>
  );
};