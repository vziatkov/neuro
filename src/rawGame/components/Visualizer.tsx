import React, { useState, useEffect } from 'react';

interface VisualizerProps {
  count: number;
  color: string;
  isSubtraction?: boolean;
}

// A single interactive "energy node" (dot)
const NeuroNode: React.FC<{ 
  active: boolean; 
  color: string; 
  isGhost: boolean;
  onClick: () => void;
}> = ({ active, color, isGhost, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300
        ${isGhost 
          ? 'border-2 border-dashed opacity-30 scale-90' 
          : 'shadow-[0_0_10px_currentColor] scale-100 hover:scale-110'
        }
        ${active ? 'brightness-150 scale-110 shadow-[0_0_15px_currentColor]' : 'brightness-75'}
      `}
      style={{
        backgroundColor: isGhost ? 'transparent' : (active ? color : `${color}80`), // 80 is ~50% opacity hex
        borderColor: color,
        color: color
      }}
    >
      {/* Inner core to show activation state clearly */}
      <div className={`w-2 h-2 rounded-full bg-white transition-opacity ${active ? 'opacity-100' : 'opacity-0'}`} />
    </button>
  );
};

// Represents a group of 10 (standard pedagogical Ten-Frame)
const TenFrame: React.FC<{
  count: number; // How many filled in this frame (0-10)
  totalNodes: number; // Total slots (usually 10)
  color: string;
  isSubtraction: boolean;
  startIndex: number; // Global index offset for tracking clicks
  clickedIndices: Set<number>;
  toggleClick: (idx: number) => void;
}> = ({ count, totalNodes = 10, color, isSubtraction, startIndex, clickedIndices, toggleClick }) => {
  
  // Create an array of 10 slots
  const slots = Array.from({ length: 10 });

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-2 grid grid-cols-5 gap-2 w-max shadow-inner">
      {slots.map((_, i) => {
        const globalIndex = startIndex + i;
        const isFilled = i < count;
        
        // Logic: 
        // If isFilled is true, render a node.
        // If !isFilled, render an empty slot placeholder for structure.
        
        if (!isFilled) {
          return <div key={i} className="w-8 h-8 rounded-full bg-slate-900/50 border border-slate-800" />;
        }

        return (
          <NeuroNode
            key={i}
            active={clickedIndices.has(globalIndex)}
            color={color}
            isGhost={isSubtraction}
            onClick={() => toggleClick(globalIndex)}
          />
        );
      })}
    </div>
  );
};

export const Visualizer: React.FC<VisualizerProps> = ({ count, color, isSubtraction = false }) => {
  // We keep track of which specific dots the user has "touched" (counted)
  const [clickedIndices, setClickedIndices] = useState<Set<number>>(new Set());

  // Cap visuals at 20 for layout sanity, though TenFrames handle more gracefully
  const displayCount = Math.min(count, 20);
  
  // Calculate how many full frames and partial frames we need
  // 13 -> [10, 3]
  const frames = [];
  let remaining = displayCount;
  while (remaining > 0) {
    frames.push(Math.min(remaining, 10));
    remaining -= 10;
  }

  // Ensure at least one frame if count is 0 (though unlikely in logic)
  if (frames.length === 0 && count === 0) frames.push(0);

  const toggleClick = (index: number) => {
    setClickedIndices(prev => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-wrap justify-center gap-4 max-w-[350px]">
        {frames.map((frameCount, i) => (
          <TenFrame
            key={i}
            count={frameCount}
            totalNodes={10}
            color={color}
            isSubtraction={isSubtraction}
            startIndex={i * 10}
            clickedIndices={clickedIndices}
            toggleClick={toggleClick}
          />
        ))}
      </div>
      
      {/* Helper text only if count is large, to encourage mental grouping */}
      {count > 20 && (
        <span className="text-xs text-gray-400 font-mono">
          +{count - 20} energy units
        </span>
      )}
    </div>
  );
};