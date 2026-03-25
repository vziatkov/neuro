/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Sparkles, Droplets, Eye, BookOpen, RefreshCw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// --- Types ---

interface StoryPage {
  id: number;
  text: string;
  title: string;
  imagePrompt: string;
  interactive?: 'sparks' | 'water' | 'both';
}

// --- Constants ---

let rainAudioCtx: AudioContext | null = null;
let rainMasterGain: GainNode | null = null;
let lastRainDropAt = 0;

function getRainAudioChain() {
  if (typeof window === 'undefined') return null;
  if (!rainAudioCtx) {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    if (!Ctx) return null;
    rainAudioCtx = new Ctx();
    rainMasterGain = rainAudioCtx.createGain();
    rainMasterGain.gain.value = 0.045;
    rainMasterGain.connect(rainAudioCtx.destination);
  }
  return { ctx: rainAudioCtx, master: rainMasterGain };
}

function playRainDropSound() {
  const chain = getRainAudioChain();
  if (!chain || !chain.ctx || !chain.master) return;

  const nowPerf = performance.now();
  if (nowPerf - lastRainDropAt < 42) return;
  lastRainDropAt = nowPerf;

  if (chain.ctx.state === 'suspended') {
    chain.ctx.resume().catch(() => {});
    return;
  }

  const now = chain.ctx.currentTime;

  // Small sine "drop" + filtered noise tail -> soft rain feel.
  const osc = chain.ctx.createOscillator();
  const oscGain = chain.ctx.createGain();
  osc.type = 'sine';
  const base = 720 + Math.random() * 260;
  osc.frequency.setValueAtTime(base, now);
  osc.frequency.exponentialRampToValueAtTime(base * 0.72, now + 0.07);
  oscGain.gain.setValueAtTime(0.0001, now);
  oscGain.gain.exponentialRampToValueAtTime(0.055, now + 0.008);
  oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);

  const noise = chain.ctx.createBufferSource();
  const noiseBuffer = chain.ctx.createBuffer(1, Math.floor(chain.ctx.sampleRate * 0.09), chain.ctx.sampleRate);
  const data = noiseBuffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.7;
  noise.buffer = noiseBuffer;

  const hp = chain.ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = 1400;
  const lp = chain.ctx.createBiquadFilter();
  lp.type = 'lowpass';
  lp.frequency.value = 4200;
  const noiseGain = chain.ctx.createGain();
  noiseGain.gain.setValueAtTime(0.0001, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.017, now + 0.006);
  noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

  osc.connect(oscGain);
  oscGain.connect(chain.master);
  noise.connect(hp);
  hp.connect(lp);
  lp.connect(noiseGain);
  noiseGain.connect(chain.master);

  osc.start(now);
  osc.stop(now + 0.12);
  noise.start(now);
  noise.stop(now + 0.09);
}

const STORY_PAGES: StoryPage[] = [
  {
    id: 0,
    title: "Quiet Forest",
    text: "Once, in a quiet forest, there lived two little friends - a Fox and a Beaver. They were always helping each other.",
    imagePrompt: "A cute small fox and a beaver sitting together in a peaceful, magical sunlit forest, warm organic colors, storybook illustration style, soft lighting.",
  },
  {
    id: 1,
    title: "The Owl's Task",
    text: "One day, an Owl manager came to them and said, \"Build me a road through the forest. Quickly, neatly, and in a way that shows how you think.\"",
    imagePrompt: "A wise owl wearing small glasses and a tiny vest, acting as a manager, talking to a fox and a beaver in a forest clearing, storybook illustration style.",
  },
  {
    id: 2,
    title: "Observation",
    text: "The Fox scratched an ear and said, \"We can build the road... but first let's understand how the forest flows.\" The Beaver nodded and began to observe: where the wind moves, where water runs, and where paths naturally appear.",
    imagePrompt: "A fox and a beaver standing on a hill, looking down at a forest, observing wind patterns in the trees and a flowing stream, atmospheric, magical forest, storybook style.",
  },
  {
    id: 3,
    title: "First Clearing: Sparks",
    text: "So instead of a road, they made two clearings. In the first one, the Fox released sparks - they rose upward, disappeared, and returned again.",
    imagePrompt: "A magical forest clearing at night where a small fox is releasing glowing golden sparks that float upwards into the dark blue sky, magical atmosphere, storybook style.",
    interactive: 'sparks',
  },
  {
    id: 4,
    title: "Second Clearing: Water",
    text: "In the second clearing, the Beaver made a still water surface - and every spark that touched it left a circle. The Owl was surprised: \"But I asked for a road...\"",
    imagePrompt: "A beaver standing by a perfectly still, glowing pond in a forest clearing, ripples forming on the water surface, magical night scene, storybook style.",
    interactive: 'water',
  },
  {
    id: 5,
    title: "The Essence of Motion",
    text: "The Fox answered softly, \"We are close to the task. Look deeper.\" And the Owl saw it: the little builders understood motion, every light was behavior, and a world should be shown in visible parts.",
    imagePrompt: "An owl looking closely at magical patterns of light and water ripples, realization on its face, glowing forest background, deep wisdom, storybook style.",
    interactive: 'both',
  },
  {
    id: 6,
    title: "Wisdom of the Forest",
    text: "It became clear: they could build the road at any moment, because they had already understood the main thing - how the forest itself works. Smart builders observe the system first, and only then build on top of it.",
    imagePrompt: "A beautiful wide shot of a magical forest with a subtle, glowing path appearing, fox, beaver and owl standing together, sunset, inspirational, storybook style.",
  }
];

// --- Components ---

const InteractiveClearing: React.FC<{ type: 'sparks' | 'water' | 'both' }> = ({ type }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<any[]>([]);
  const ripples = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    window.addEventListener('resize', resize);
    resize();

    const createParticle = () => ({
      x: Math.random() * canvas.width,
      y: canvas.height + 10,
      size: Math.random() * 3 + 1,
      speedY: Math.random() * 1.5 + 0.5,
      opacity: 1,
      color: `hsla(${40 + Math.random() * 20}, 100%, 70%, 0.8)`
    });

    const createRipple = (x: number, y: number) => ({
      x,
      y,
      r: 0,
      opacity: 1,
      speed: 2
    });

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (type === 'sparks' || type === 'both') {
        if (particles.current.length < 50 && Math.random() > 0.9) {
          particles.current.push(createParticle());
        }

        particles.current.forEach((p, i) => {
          p.y -= p.speedY;
          p.opacity -= 0.002;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color.replace('0.8', p.opacity.toString());
          ctx.fill();

          // If spark hits "water" level (middle of screen) in 'both' mode
          if (type === 'both' && Math.abs(p.y - canvas.height * 0.7) < 2 && Math.random() > 0.7) {
            ripples.current.push(createRipple(p.x, canvas.height * 0.7));
            playRainDropSound();
          }

          if (p.opacity <= 0 || p.y < -10) {
            particles.current.splice(i, 1);
          }
        });
      }

      if (type === 'water' || type === 'both') {
        const waterY = canvas.height * 0.7;
        
        // Draw water line
        ctx.beginPath();
        ctx.moveTo(0, waterY);
        ctx.lineTo(canvas.width, waterY);
        ctx.strokeStyle = 'rgba(100, 200, 255, 0.3)';
        ctx.stroke();

        if (type === 'water' && Math.random() > 0.95) {
          ripples.current.push(createRipple(Math.random() * canvas.width, waterY));
          playRainDropSound();
        }

        ripples.current.forEach((r, i) => {
          r.r += r.speed;
          r.opacity -= 0.01;
          ctx.beginPath();
          ctx.ellipse(r.x, r.y, r.r, r.r * 0.3, 0, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(150, 230, 255, ${r.opacity})`;
          ctx.lineWidth = 2;
          ctx.stroke();

          if (r.opacity <= 0) {
            ripples.current.splice(i, 1);
          }
        });
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [type]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [images, setImages] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState<Record<number, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const ambientTimerRef = useRef<number | null>(null);
  const audioUnlockedRef = useRef(false);

  const ensureAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      if (!Ctx) return null;
      const ctx = new Ctx();
      const master = ctx.createGain();
      master.gain.value = 0.05; // Keep overall output intentionally quiet.
      master.connect(ctx.destination);
      audioCtxRef.current = ctx;
      masterGainRef.current = master;
    }
    return { ctx: audioCtxRef.current, master: masterGainRef.current };
  }, []);

  const unlockAudio = useCallback(() => {
    const chain = ensureAudio();
    if (!chain) return;
    if (chain.ctx?.state === 'suspended') {
      chain.ctx.resume().catch(() => {});
    }
    audioUnlockedRef.current = true;
  }, [ensureAudio]);

  const playTone = useCallback((
    freq: number,
    duration = 0.12,
    type: OscillatorType = 'sine',
    volume = 0.18
  ) => {
    const chain = ensureAudio();
    if (!chain || !chain.ctx || !chain.master || chain.ctx.state !== 'running') return;
    const { ctx, master } = chain;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0001, volume), now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + duration + 0.03);
  }, [ensureAudio]);

  const playHover = useCallback(() => {
    playTone(880, 0.07, 'triangle', 0.06);
  }, [playTone]);

  const playPageTurn = useCallback((forward: boolean) => {
    if (forward) {
      playTone(420, 0.11, 'sine', 0.12);
      window.setTimeout(() => playTone(560, 0.14, 'triangle', 0.09), 38);
    } else {
      playTone(540, 0.11, 'sine', 0.12);
      window.setTimeout(() => playTone(390, 0.14, 'triangle', 0.09), 38);
    }
  }, [playTone]);

  const playAmbientSparkle = useCallback(() => {
    playTone(1180 + Math.random() * 260, 0.16, 'triangle', 0.045);
    window.setTimeout(() => playTone(780 + Math.random() * 170, 0.12, 'sine', 0.03), 55);
  }, [playTone]);

  const generateImage = useCallback(async (pageIndex: number) => {
    if (images[pageIndex] || loading[pageIndex]) return;

    setLoading(prev => ({ ...prev, [pageIndex]: true }));
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: [{ parts: [{ text: STORY_PAGES[pageIndex].imagePrompt }] }],
      });

      let imageUrl = "";
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
          break;
        }
      }

      if (imageUrl) {
        setImages(prev => ({ ...prev, [pageIndex]: imageUrl }));
      }
    } catch (err) {
      console.error("Failed to generate image:", err);
      // Fallback to placeholder
      setImages(prev => ({ 
        ...prev, 
        [pageIndex]: `https://picsum.photos/seed/forest-${pageIndex}/800/600` 
      }));
    } finally {
      setLoading(prev => ({ ...prev, [pageIndex]: false }));
    }
  }, [images, loading]);

  useEffect(() => {
    generateImage(currentPage);
    // Preload next image
    if (currentPage < STORY_PAGES.length - 1) {
      generateImage(currentPage + 1);
    }
  }, [currentPage, generateImage]);

  useEffect(() => {
    const onFirstInput = () => {
      unlockAudio();
    };
    window.addEventListener('pointerdown', onFirstInput, { passive: true });
    window.addEventListener('keydown', onFirstInput, { passive: true });
    return () => {
      window.removeEventListener('pointerdown', onFirstInput);
      window.removeEventListener('keydown', onFirstInput);
    };
  }, [unlockAudio]);

  useEffect(() => {
    const scheduleAmbient = () => {
      if (ambientTimerRef.current) {
        window.clearTimeout(ambientTimerRef.current);
      }
      ambientTimerRef.current = window.setTimeout(() => {
        if (!document.hidden && audioUnlockedRef.current) {
          playAmbientSparkle();
        }
        scheduleAmbient();
      }, 12000 + Math.random() * 16000);
    };

    scheduleAmbient();
    return () => {
      if (ambientTimerRef.current) window.clearTimeout(ambientTimerRef.current);
      ambientTimerRef.current = null;
    };
  }, [playAmbientSparkle]);

  const nextPage = () => {
    if (currentPage < STORY_PAGES.length - 1) {
      playPageTurn(true);
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      playPageTurn(false);
      setCurrentPage(prev => prev - 1);
    }
  };

  const page = STORY_PAGES[currentPage];

  return (
    <div className="min-h-screen bg-[#f5f5f0] text-[#2c2c24] font-serif selection:bg-emerald-100 overflow-hidden flex flex-col">
      {/* Header */}
      <header className="p-6 flex justify-between items-center border-b border-[#5A5A40]/10 bg-white/50 backdrop-blur-sm z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#5A5A40] flex items-center justify-center text-white">
            <BookOpen size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">The Woodland System</h1>
            <p className="text-xs uppercase tracking-widest opacity-60">Interactive Storybook</p>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium flex-wrap justify-end">
          <a
            href={`${import.meta.env.BASE_URL}casino-oboz/index.html`}
            className="text-[#5A5A40] hover:text-[#3d3d2e] underline-offset-2 hover:underline opacity-80 hover:opacity-100 transition-opacity"
          >
            Casino / Oboz
          </a>
          <a
            href={`${import.meta.env.BASE_URL}woodland/index.html`}
            className="text-[#5A5A40] hover:text-[#3d3d2e] underline-offset-2 hover:underline opacity-80 hover:opacity-100 transition-opacity"
          >
            Matrix demos &amp; PDFs
          </a>
          <span className="opacity-60 tabular-nums">{currentPage + 1} / {STORY_PAGES.length}</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col md:flex-row items-center justify-center p-4 md:p-12 gap-8 max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col md:flex-row items-center gap-8 w-full"
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 aspect-[4/3] relative group">
              <div className="absolute inset-0 bg-[#5A5A40]/5 rounded-[32px] animate-pulse" />
              
              {images[currentPage] ? (
                <motion.img
                  initial={{ scale: 1.05, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={images[currentPage]}
                  alt={page.title}
                  className="w-full h-full object-cover rounded-[32px] shadow-2xl border-4 border-white relative z-10"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4 relative z-10 bg-white/40 rounded-[32px] border-4 border-white shadow-xl">
                  <RefreshCw className="animate-spin text-[#5A5A40]" size={32} />
                  <p className="text-sm italic opacity-60">Painting the story...</p>
                </div>
              )}

              {/* Interactive Layer */}
              {page.interactive && (
                <InteractiveClearing type={page.interactive} />
              )}

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#5A5A40]/30 rounded-tl-2xl" />
              <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#5A5A40]/30 rounded-br-2xl" />
            </div>

            {/* Text Section */}
            <div className="w-full md:w-1/2 flex flex-col gap-6">
              <div className="space-y-2">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs uppercase tracking-[0.2em] text-[#5A5A40] font-bold"
                >
                  Chapter {currentPage + 1}
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-5xl font-bold leading-tight text-[#1a1a1a]"
                >
                  {page.title}
                </motion.h2>
              </div>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl leading-relaxed text-[#4a4a40] first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left"
              >
                {page.text}
              </motion.p>

              <div className="flex items-center gap-4 pt-4">
                {page.interactive === 'sparks' && (
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-3 py-1.5 rounded-full border border-amber-200">
                    <Sparkles size={14} /> Spark Clearing
                  </div>
                )}
                {page.interactive === 'water' && (
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full border border-blue-200">
                    <Droplets size={14} /> Water Clearing
                  </div>
                )}
                {page.interactive === 'both' && (
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                    <Eye size={14} /> System Vision
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <footer className="p-8 flex justify-center items-center gap-6 z-20">
        <button
          onClick={prevPage}
          onMouseEnter={playHover}
          disabled={currentPage === 0}
          className={`p-4 rounded-full transition-all duration-300 flex items-center justify-center ${
            currentPage === 0 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-[#5A5A40] shadow-lg hover:shadow-xl hover:-translate-x-1 active:scale-95 border border-[#5A5A40]/10'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="flex gap-2">
          {STORY_PAGES.map((_, idx) => (
            <button
              key={idx}
              onMouseEnter={playHover}
              onClick={() => {
                if (idx === currentPage) return;
                playPageTurn(idx > currentPage);
                setCurrentPage(idx);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-500 ${
                currentPage === idx ? 'w-8 bg-[#5A5A40]' : 'bg-[#5A5A40]/20 hover:bg-[#5A5A40]/40'
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextPage}
          onMouseEnter={playHover}
          disabled={currentPage === STORY_PAGES.length - 1}
          className={`p-4 rounded-full transition-all duration-300 flex items-center justify-center ${
            currentPage === STORY_PAGES.length - 1 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-[#5A5A40] text-white shadow-lg hover:shadow-xl hover:translate-x-1 active:scale-95'
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={24} />
        </button>
      </footer>

      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')]" />
      </div>
    </div>
  );
}
