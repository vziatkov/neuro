import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, ChevronRight, RefreshCw, Volume2, VolumeX } from 'lucide-react';
import { story, Scene } from './story';
import { cn } from './lib/utils';

export default function App() {
  const [currentSceneId, setCurrentSceneId] = useState<string>('start');
  const [isMuted, setIsMuted] = useState(true);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const currentScene = story[currentSceneId];

  useEffect(() => {
    let index = 0;
    setIsTyping(true);
    setDisplayedText('');
    
    const timer = setInterval(() => {
      if (index < currentScene.text.length) {
        setDisplayedText((prev) => prev + currentScene.text.charAt(index));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 30);

    return () => clearInterval(timer);
  }, [currentSceneId, currentScene.text]);

  const handleChoice = (nextId: string) => {
    if (isTyping) return;
    setCurrentSceneId(nextId);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E4E3E0] font-mono selection:bg-[#F27D26] selection:text-black overflow-hidden relative">
      {/* Atmospheric Background */}
      <div className="fixed inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene.image}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 2 }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${currentScene.image})` }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
      </div>

      {/* UI Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto min-h-screen flex flex-col p-6 md:p-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 border border-[#F27D26] flex items-center justify-center">
              <Terminal className="w-5 h-5 text-[#F27D26]" />
            </div>
            <div>
              <h1 className="text-xs uppercase tracking-[0.3em] font-bold text-[#F27D26]">System.Narrative</h1>
              <p className="text-[10px] opacity-50 uppercase tracking-widest">Node: {currentSceneId.toUpperCase()}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 border border-white/10 hover:border-[#F27D26] transition-colors"
          >
            {isMuted ? <VolumeX className="w-4 h-4 opacity-50" /> : <Volume2 className="w-4 h-4 text-[#F27D26]" />}
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="relative">
                  <div className="absolute -left-4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#F27D26] to-transparent" />
                  <p className="text-lg md:text-2xl leading-relaxed font-serif italic text-white/90">
                    {displayedText}
                    {isTyping && <span className="inline-block w-2 h-5 bg-[#F27D26] ml-1 animate-pulse" />}
                  </p>
                </div>

                <div className="flex flex-col gap-4 pt-8">
                  <AnimatePresence>
                    {!isTyping && currentScene.choices.map((choice, idx) => (
                      <motion.button
                        key={choice.text}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => handleChoice(choice.nextSceneId)}
                        className="group flex items-center gap-4 text-left p-4 border border-white/5 hover:border-[#F27D26] hover:bg-[#F27D26]/5 transition-all"
                      >
                        <span className="text-[10px] opacity-30 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                        <span className="flex-grow text-sm uppercase tracking-widest group-hover:text-[#F27D26] transition-colors">{choice.text}</span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-[#F27D26]" />
                      </motion.button>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>

            {/* Sidebar Stats/Meta */}
            <div className="md:col-span-4 hidden md:block">
              <div className="sticky top-12 space-y-8">
                <div className="p-6 border border-white/5 bg-white/[0.02] space-y-4">
                  <h3 className="text-[10px] uppercase tracking-widest text-[#F27D26] font-bold">Status Report</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase">
                      <span className="opacity-50">Integrity</span>
                      <span>98.4%</span>
                    </div>
                    <div className="h-1 bg-white/5">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '98.4%' }}
                        className="h-full bg-[#F27D26]" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] uppercase">
                      <span className="opacity-50">Sync Rate</span>
                      <span>{isTyping ? 'CALCULATING...' : 'STABLE'}</span>
                    </div>
                    <div className="h-1 bg-white/5">
                      <motion.div 
                        animate={{ width: isTyping ? [0, 100, 0] : '100%' }}
                        transition={{ duration: 2, repeat: isTyping ? Infinity : 0 }}
                        className="h-full bg-[#F27D26]" 
                      />
                    </div>
                  </div>
                </div>

                <div className="text-[9px] uppercase tracking-widest leading-loose opacity-30">
                  <p>Warning: Variable detected.</p>
                  <p>Location: Sector 7G.</p>
                  <p>Status: Unresolved.</p>
                  <p>Protocol: Observation.</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#F27D26] animate-pulse" />
              <span className="text-[9px] uppercase tracking-widest opacity-50">System Live</span>
            </div>
            <span className="text-[9px] uppercase tracking-widest opacity-30">© 2026 OBOZ.CORP</span>
          </div>
          <button 
            onClick={() => setCurrentSceneId('start')}
            className="flex items-center gap-2 text-[9px] uppercase tracking-widest hover:text-[#F27D26] transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            Reset Sequence
          </button>
        </footer>
      </div>

      {/* Scanline Effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
}
