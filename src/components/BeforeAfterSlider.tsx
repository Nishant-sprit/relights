import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronsLeftRight, Sparkles, ShieldAlert, ShieldCheck, Play, Pause, RotateCcw } from 'lucide-react';

export const BeforeAfterSlider: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // 0 to 100%
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  // Smooth handle drag logic (X coordinate conversion)
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPos(percentage);
  }, []);

  // Global mouse and touch event listeners for flawless drag on mobile & desktop
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length > 0) {
        // Prevent background page scrolling while dragging slider on mobile
        if (e.cancelable) e.preventDefault();
        handleMove(e.touches[0].clientX);
      }
    };

    const onEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', onEnd);
      window.addEventListener('touchcancel', onEnd);
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchcancel', onEnd);
    };
  }, [isDragging, handleMove]);

  // Auto sweep demo animation
  useEffect(() => {
    if (!isAutoPlaying) return;
    let direction = -1; // Default sweep towards left (turning lights ON)
    let currentPos = sliderPos;

    const animate = () => {
      currentPos += direction * 0.4;
      if (currentPos <= 0) {
        currentPos = 0;
        direction = 1;
      } else if (currentPos >= 100) {
        currentPos = 100;
        direction = -1;
      }
      setSliderPos(currentPos);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isAutoPlaying, sliderPos]);

  // Total steps in diagram for sequential lighting calculation
  const totalSteps = 10;
  // Swipe LEFT (sliderPos -> 0) turns lights ON (10 steps lit).
  // Swipe RIGHT (sliderPos -> 100) turns lights OFF (0 steps lit).
  const illuminatedStepsCount = Math.round(((100 - sliderPos) / 100) * totalSteps);

  return (
    <div id="before-after-comparison-section" className="py-8 scroll-mt-24">
      {/* Outer Card Container - Apple + Tesla + Dyson inspired minimalist luxury UI */}
      <div className="bg-white rounded-[24px] border border-slate-200/80 shadow-2xl p-6 sm:p-10 space-y-8 max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            See the Relights Difference
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Drag the slider to experience how the Relights Motion Sensor converts dark, hazardous stairs into a warm, modern automated highlight.
          </p>

          {/* Interactive Control Toolbar */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-sm cursor-pointer"
            >
              {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isAutoPlaying ? 'Pause Auto Sweep' : 'Auto Sweep Demo'}</span>
            </button>

            <button
              onClick={() => {
                setIsAutoPlaying(false);
                setSliderPos(50);
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 hover:bg-slate-200 transition-colors border border-slate-200 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Center</span>
            </button>
          </div>
        </div>

        {/* MAIN INTERACTIVE BEFORE / AFTER SLIDER CONTAINER */}
        <div
          ref={containerRef}
          className="relative w-full h-[420px] sm:h-[540px] rounded-[24px] overflow-hidden shadow-2xl border border-slate-800/80 select-none cursor-ew-resize bg-slate-950 touch-none"
          style={{ touchAction: 'none' }}
          onMouseDown={(e) => {
            setIsAutoPlaying(false);
            setIsDragging(true);
            handleMove(e.clientX);
          }}
          onTouchStart={(e) => {
            setIsAutoPlaying(false);
            setIsDragging(true);
            if (e.touches.length > 0) {
              handleMove(e.touches[0].clientX);
            }
          }}
        >
          {/* ========================================================= */}
          {/* 1. AFTER STATE (RIGHT LAYER - ILLUMINATED STAIRCASE)       */}
          {/* ========================================================= */}
          <div className="absolute inset-0 bg-[#0B0F19] overflow-hidden">
            {/* Vector Rendered Architectural Staircase Scene */}
            <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
              <defs>
                {/* Stair Tread Warm LED Glow Gradients */}
                <radialGradient id="ledGlow" cx="50%" cy="50%" r="70%">
                  <stop offset="0%" stopColor="#FEF3C7" stopOpacity="0.9" />
                  <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="wallGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1E293B" />
                  <stop offset="40%" stopColor="#334155" />
                  <stop offset="100%" stopColor="#0F172A" />
                </linearGradient>

                <linearGradient id="treadIlluminated" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#382109" />
                  <stop offset="30%" stopColor="#78350F" />
                  <stop offset="70%" stopColor="#B45309" />
                  <stop offset="100%" stopColor="#451A03" />
                </linearGradient>

                <linearGradient id="ledStrip" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="50%" stopColor="#FDE68A" />
                  <stop offset="100%" stopColor="#FFFBEB" />
                </linearGradient>
              </defs>

              {/* Background Wall & Floor */}
              <rect width="1000" height="600" fill="url(#wallGlow)" />

              {/* Architectural Wall Accent Panel */}
              <polygon points="150,0 850,0 950,600 50,600" fill="#020617" opacity="0.4" />

              {/* 10 Staircase Treads (Perspective Drawing) */}
              {[
                { id: 1, yStart: 520, width: 600, height: 26, offset: 200 },
                { id: 2, yStart: 475, width: 560, height: 24, offset: 220 },
                { id: 3, yStart: 432, width: 520, height: 22, offset: 240 },
                { id: 4, yStart: 391, width: 480, height: 20, offset: 260 },
                { id: 5, yStart: 352, width: 440, height: 19, offset: 280 },
                { id: 6, yStart: 315, width: 400, height: 18, offset: 300 },
                { id: 7, yStart: 280, width: 360, height: 17, offset: 320 },
                { id: 8, yStart: 247, width: 320, height: 16, offset: 340 },
                { id: 9, yStart: 216, width: 280, height: 15, offset: 360 },
                { id: 10, yStart: 187, width: 240, height: 14, offset: 380 },
              ].map((stair, idx) => {
                const isLit = idx < illuminatedStepsCount;
                return (
                  <g key={stair.id}>
                    {/* Riser (Vertical Face) */}
                    <polygon
                      points={`${stair.offset},${stair.yStart} ${stair.offset + stair.width},${stair.yStart} ${stair.offset + stair.width - 15},${stair.yStart + stair.height} ${stair.offset + 15},${stair.yStart + stair.height}`}
                      fill={isLit ? '#1E1B18' : '#0F172A'}
                    />

                    {/* Tread Surface */}
                    <polygon
                      points={`${stair.offset + 15},${stair.yStart + stair.height} ${stair.offset + stair.width - 15},${stair.yStart + stair.height} ${stair.offset + stair.width - 30},${stair.yStart + stair.height + 12} ${stair.offset + 30},${stair.yStart + stair.height + 12}`}
                      fill={isLit ? 'url(#treadIlluminated)' : '#090D16'}
                      stroke={isLit ? '#B45309' : '#1E293B'}
                      strokeWidth="1"
                    />

                    {/* Under-Tread LED Strip Light (Warm White 3000K) */}
                    {isLit && (
                      <>
                        {/* Soft Ambient Light Bloom / Glow Below Tread */}
                        <ellipse
                          cx={stair.offset + stair.width / 2}
                          cy={stair.yStart + stair.height + 18}
                          rx={stair.width / 1.8}
                          ry="24"
                          fill="url(#ledGlow)"
                          opacity="0.85"
                        />

                        {/* Bright LED Light Strip Line */}
                        <line
                          x1={stair.offset + 20}
                          y1={stair.yStart + stair.height + 1}
                          x2={stair.offset + stair.width - 20}
                          y2={stair.yStart + stair.height + 1}
                          stroke="url(#ledStrip)"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          filter="drop-shadow(0px 0px 8px #F59E0B)"
                        />
                      </>
                    )}
                  </g>
                );
              })}

              {/* Glass Handrail & Stainless Steel Posts */}
              <line x1="220" y1="540" x2="400" y2="180" stroke="#94A3B8" strokeWidth="3" opacity="0.6" />
              <line x1="220" y1="460" x2="400" y2="100" stroke="#F1F5F9" strokeWidth="2.5" opacity="0.8" />
              <polygon points="220,540 400,180 400,100 220,460" fill="#38BDF8" opacity="0.08" />

              {/* Top Motion Sensor Node Indicator */}
              <circle cx="410" cy="160" r="6" fill={illuminatedStepsCount > 0 ? '#10B981' : '#64748B'} />
              {illuminatedStepsCount > 0 && (
                <circle cx="410" cy="160" r="12" fill="#10B981" opacity="0.3" className="animate-ping" />
              )}
            </svg>

            {/* AFTER TOP-RIGHT BADGE */}
            <div className="absolute top-6 right-6 bg-slate-900/90 backdrop-blur-md text-white border border-emerald-500/40 px-4 py-2 rounded-xl shadow-xl flex items-center gap-2 pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-emerald-300">🟢 AFTER – Relights Smart Automation</span>
            </div>

            {/* AFTER BOTTOM-RIGHT LABELS */}
            <div className="absolute bottom-6 right-6 hidden sm:flex items-center gap-3 bg-slate-900/85 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700 text-xs text-slate-200 shadow-xl pointer-events-none">
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                • Automatic Motion Detection
              </span>
              <span className="text-slate-600">•</span>
              <span className="text-amber-300 font-semibold">• Safe Night Navigation</span>
              <span className="text-slate-600">•</span>
              <span className="text-blue-300 font-semibold">• Premium Ambient Lighting</span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 2. BEFORE STATE (LEFT LAYER - DARK UNLIT STAIRCASE)        */}
          {/* ========================================================= */}
          <div
            className="absolute top-0 bottom-0 left-0 bg-[#04070D] overflow-hidden border-r border-white/20"
            style={{ width: `${sliderPos}%` }}
          >
            {/* Same Exact Camera Angle Staircase SVG, but completely pitch-black & unlit */}
            <div
              className="absolute top-0 bottom-0 left-0"
              style={{
                width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '1000px',
                maxWidth: 'none',
              }}
            >
              <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice">
                {/* Dark Background */}
                <rect width="1000" height="600" fill="#030712" />
                <polygon points="150,0 850,0 950,600 50,600" fill="#020617" opacity="0.9" />

                {/* Unlit Treads */}
                {[
                  { id: 1, yStart: 520, width: 600, height: 26, offset: 200 },
                  { id: 2, yStart: 475, width: 560, height: 24, offset: 220 },
                  { id: 3, yStart: 432, width: 520, height: 22, offset: 240 },
                  { id: 4, yStart: 391, width: 480, height: 20, offset: 260 },
                  { id: 5, yStart: 352, width: 440, height: 19, offset: 280 },
                  { id: 6, yStart: 315, width: 400, height: 18, offset: 300 },
                  { id: 7, yStart: 280, width: 360, height: 17, offset: 320 },
                  { id: 8, yStart: 247, width: 320, height: 16, offset: 340 },
                  { id: 9, yStart: 216, width: 280, height: 15, offset: 360 },
                  { id: 10, yStart: 187, width: 240, height: 14, offset: 380 },
                ].map((stair) => (
                  <g key={stair.id}>
                    <polygon
                      points={`${stair.offset},${stair.yStart} ${stair.offset + stair.width},${stair.yStart} ${stair.offset + stair.width - 15},${stair.yStart + stair.height} ${stair.offset + 15},${stair.yStart + stair.height}`}
                      fill="#0B0F19"
                    />
                    <polygon
                      points={`${stair.offset + 15},${stair.yStart + stair.height} ${stair.offset + stair.width - 15},${stair.yStart + stair.height} ${stair.offset + stair.width - 30},${stair.yStart + stair.height + 12} ${stair.offset + 30},${stair.yStart + stair.height + 12}`}
                      fill="#030712"
                      stroke="#111827"
                      strokeWidth="1"
                    />
                  </g>
                ))}

                {/* Handrail silhouette */}
                <line x1="220" y1="540" x2="400" y2="180" stroke="#1E293B" strokeWidth="2" opacity="0.4" />
                <line x1="220" y1="460" x2="400" y2="100" stroke="#1E293B" strokeWidth="2" opacity="0.4" />
              </svg>

              {/* BEFORE TOP-LEFT BADGE & TITLE */}
              <div className="absolute top-6 left-6 space-y-1 pointer-events-none">
                <div className="inline-flex items-center gap-2 bg-rose-950/90 backdrop-blur-md text-rose-200 border border-rose-500/40 px-3.5 py-1.5 rounded-xl shadow-xl">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                  <span className="text-xs sm:text-sm font-bold text-rose-300">🔴 BEFORE</span>
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-wide drop-shadow-md">
                  Dark Staircase
                </h3>
              </div>

              {/* BEFORE BOTTOM-LEFT LABELS */}
              <div className="absolute bottom-6 left-6 hidden sm:flex items-center gap-3 bg-rose-950/85 backdrop-blur-md p-3.5 rounded-2xl border border-rose-800/60 text-xs text-rose-200 shadow-xl pointer-events-none">
                <span className="flex items-center gap-1 font-semibold text-rose-300">• Poor Visibility</span>
                <span className="text-rose-700">•</span>
                <span className="font-semibold text-rose-300">• Trip Hazard</span>
                <span className="text-rose-700">•</span>
                <span className="font-semibold text-rose-300">• Manual Switch Required</span>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* 3. CENTER DRAGGABLE HANDLE & DIVIDER LINE                  */}
          {/* ========================================================= */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.9)] z-30"
            style={{ left: `${sliderPos}%` }}
          >
            {/* White Circular Button, Blue Outline, Left-Right Arrow Icon, Soft Shadow */}
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white text-blue-600 border-2 border-blue-600 shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-transform duration-150 cursor-ew-resize">
              <ChevronsLeftRight className="w-6 h-6 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* Mobile Labels Summary (Visible on small screens below the slider) */}
        <div className="grid grid-cols-1 sm:hidden gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-100 text-rose-900 text-xs space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-rose-700">
              <ShieldAlert className="w-4 h-4" /> BEFORE: Dark Staircase
            </p>
            <p className="text-[11px] text-rose-800">
              • Poor Visibility &nbsp;• Trip Hazard &nbsp;• Manual Switch Required
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-900 text-xs space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> AFTER: Relights Smart Automation
            </p>
            <p className="text-[11px] text-emerald-800">
              • Automatic Motion Detection &nbsp;• Safe Night Navigation &nbsp;• Premium Ambient Lighting
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};


