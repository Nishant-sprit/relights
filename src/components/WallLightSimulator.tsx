import React, { useState, useEffect } from 'react';
import {
  Zap,
  Sun,
  Moon,
  CloudRain,
  Eye,
  ShieldCheck,
  Footprints,
  RotateCcw,
  Sparkles,
  Sliders,
  Maximize2,
  SlidersHorizontal,
} from 'lucide-react';

export const WallLightSimulator: React.FC = () => {
  // Simulator State
  const [personPos, setPersonPos] = useState<number>(10); // 0 to 100% along pathway
  const [isAutoWalking, setIsAutoWalking] = useState<boolean>(true);
  const [timeOfDay, setTimeOfDay] = useState<'night' | 'day'>('night');
  const [environment, setEnvironment] = useState<'interior' | 'exterior' | 'brick'>('interior');
  const [colorTemp, setColorTemp] = useState<'3000k' | '4000k' | '6500k'>('3000k');
  const [detectionRange, setDetectionRange] = useState<number>(3); // 1m to 4m
  const [isRaining, setIsRaining] = useState<boolean>(false);

  // Auto-walk loop
  useEffect(() => {
    if (!isAutoWalking) return;
    const interval = setInterval(() => {
      setPersonPos((prev) => {
        if (prev >= 90) return 10;
        return prev + 1.2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isAutoWalking]);

  // Wall light positions along the 100% width canvas (Light 1 at 25%, Light 2 at 55%, Light 3 at 85%)
  const lightPositions = [25, 55, 85];

  // Calculate which lights are active based on person position and range
  const rangePercent = (detectionRange / 5) * 20; // convert range meters to % threshold (~12-16%)

  const activeLights = lightPositions.map((pos) => {
    if (timeOfDay === 'day') return false; // Daytime lux sensor keeps light off
    const distance = Math.abs(personPos - pos);
    return distance <= rangePercent;
  });

  // Light color glow hex mapping
  const glowColors = {
    '3000k': {
      beam: 'from-amber-300/80 via-amber-400/40 to-transparent',
      shadow: 'rgba(251, 191, 36, 0.5)',
      hex: '#fbbf24',
      name: 'Warm White 3000K',
    },
    '4000k': {
      beam: 'from-orange-100/80 via-orange-200/40 to-transparent',
      shadow: 'rgba(254, 215, 170, 0.5)',
      hex: '#ffedd5',
      name: 'Neutral 4000K',
    },
    '6500k': {
      beam: 'from-sky-200/80 via-sky-300/40 to-transparent',
      shadow: 'rgba(186, 230, 253, 0.5)',
      hex: '#bae6fd',
      name: 'Cool White 6500K',
    },
  };

  const activeGlow = glowColors[colorTemp];

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-5 sm:p-8 text-white shadow-2xl overflow-hidden space-y-6">
      {/* SIMULATOR HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive 3D Radar & Light Beam Simulator</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            3W Motion Sensor Wall Step Light Visualizer
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Simulate person detection, downward 45° beam projection, IP65 waterproofing, and lux sensor response.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAutoWalking(!isAutoWalking)}
            className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all flex items-center gap-2 cursor-pointer ${
              isAutoWalking
                ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/50'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <Footprints className="w-4 h-4" />
            <span>{isAutoWalking ? 'Pause Person Walk' : 'Auto Walk Person'}</span>
          </button>

          <button
            onClick={() => setPersonPos(10)}
            title="Reset position"
            className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 transition-all cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* INTERACTIVE STAIR / WALL SCENE CANVAS */}
      <div
        className={`relative w-full h-80 sm:h-96 rounded-2xl border border-slate-800 overflow-hidden transition-all duration-500 select-none ${
          timeOfDay === 'day'
            ? 'bg-gradient-to-b from-sky-200 via-slate-100 to-slate-300'
            : environment === 'interior'
            ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
            : environment === 'brick'
            ? 'bg-gradient-to-b from-stone-950 via-amber-950/40 to-stone-950'
            : 'bg-gradient-to-b from-slate-950 via-slate-900 to-zinc-950'
        }`}
      >
        {/* Wall Texture Overlay */}
        <div
          className={`absolute inset-0 opacity-20 pointer-events-none ${
            environment === 'brick'
              ? 'bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:16px_16px]'
              : 'bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]'
          }`}
        />

        {/* Rain Effect overlay */}
        {isRaining && (
          <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
            <div className="w-full h-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(56,189,248,0.2)_100%)] animate-pulse" />
            <div className="absolute top-0 left-10 w-0.5 h-12 bg-sky-300/40 animate-ping opacity-60" />
            <div className="absolute top-10 left-1/3 w-0.5 h-16 bg-sky-300/50 animate-ping opacity-80" />
            <div className="absolute top-5 right-1/4 w-0.5 h-10 bg-sky-300/40 animate-ping opacity-70" />
          </div>
        )}

        {/* Stairs / Ground Tread Platform */}
        <div className="absolute bottom-0 inset-x-0 h-28 bg-slate-900/90 border-t-2 border-slate-800 flex items-end">
          {/* Step Treads */}
          <div className="w-full h-full grid grid-cols-6 divide-x divide-slate-800/60 bg-slate-950/80">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-full border-t border-slate-700/50 p-2 relative">
                <span className="text-[10px] text-slate-600 font-mono">STEP 0{i + 1}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RECESSED WALL STEP LIGHT FIXTURES & BEAM PROJECTION */}
        {lightPositions.map((pos, idx) => {
          const isActive = activeLights[idx];

          return (
            <div
              key={idx}
              style={{ left: `${pos}%` }}
              className="absolute top-36 sm:top-40 -translate-x-1/2 flex flex-col items-center"
            >
              {/* Radar Detection Cone Arc (Visible on hover or active) */}
              <div
                style={{
                  width: `${detectionRange * 50}px`,
                  height: `${detectionRange * 50}px`,
                }}
                className={`absolute -top-12 rounded-full border border-dashed transition-all duration-300 pointer-events-none flex items-center justify-center ${
                  isActive
                    ? 'border-amber-400/60 bg-amber-400/5 scale-105'
                    : 'border-slate-700/40 opacity-30'
                }`}
              >
                <span className="text-[9px] font-mono text-amber-400/80 bg-slate-900/90 px-1.5 py-0.5 rounded border border-amber-400/20">
                  Radar {detectionRange}m
                </span>
              </div>

              {/* Physical Recessed Wall Light Box (86x86mm Black Matte Body) */}
              <div className="relative w-12 h-12 bg-slate-950 rounded-lg border-2 border-slate-800 shadow-2xl p-1 flex flex-col items-center justify-between z-10 group cursor-pointer">
                {/* PIR Sensor Eye Lens */}
                <div
                  className={`w-3 h-3 rounded-full border transition-all ${
                    isActive
                      ? 'bg-amber-400 border-amber-200 shadow-lg shadow-amber-400/80 animate-pulse'
                      : 'bg-slate-300 border-slate-400'
                  }`}
                />

                {/* Louvered Light Chamber */}
                <div className="w-full h-5 bg-slate-900 rounded border border-slate-800 flex flex-col justify-around p-0.5 overflow-hidden">
                  <div className="w-full h-0.5 bg-slate-800" />
                  <div className="w-full h-0.5 bg-slate-800" />
                  <div className="w-full h-0.5 bg-slate-800" />
                </div>
              </div>

              {/* DOWNWARD 45° LIGHT BEAM CONE */}
              <div
                style={{
                  boxShadow: isActive ? `0 20px 60px ${activeGlow.shadow}` : 'none',
                }}
                className={`w-40 sm:w-56 h-36 sm:h-44 -mt-1 bg-gradient-to-b ${
                  activeGlow.beam
                } transition-all duration-300 transform origin-top clip-path-cone ${
                  isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
              >
                <div className="w-full h-full bg-radial-light opacity-90" />
              </div>
            </div>
          );
        })}

        {/* WALKING PERSON AVATAR */}
        <div
          style={{ left: `${personPos}%` }}
          className="absolute bottom-10 -translate-x-1/2 flex flex-col items-center transition-all duration-75 z-30 cursor-grab active:cursor-grabbing"
        >
          {/* Person Distance Label */}
          <div className="bg-slate-900/90 text-slate-200 border border-slate-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full mb-1 shadow-lg whitespace-nowrap">
            Footstep @ {personPos.toFixed(0)}%
          </div>

          {/* Simple Vector Person Silhouette */}
          <div className="w-7 h-16 flex flex-col items-center relative group">
            {/* Head */}
            <div className="w-4 h-4 rounded-full bg-blue-400 border border-blue-200 shadow-md" />
            {/* Body */}
            <div className="w-3 h-6 bg-blue-500 rounded-sm mt-0.5" />
            {/* Legs */}
            <div className="flex gap-1 mt-0.5">
              <div className="w-1 h-5 bg-blue-600 rounded-full animate-bounce" />
              <div className="w-1 h-5 bg-blue-600 rounded-full animate-bounce delay-100" />
            </div>
          </div>
        </div>

        {/* Interactive Track Drag Slider */}
        <div className="absolute bottom-2 inset-x-6 z-40 flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded-full px-4 py-1.5">
          <Footprints className="w-4 h-4 text-blue-400 shrink-0" />
          <input
            type="range"
            min="5"
            max="95"
            value={personPos}
            onChange={(e) => {
              setIsAutoWalking(false);
              setPersonPos(parseFloat(e.target.value));
            }}
            className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <span className="text-xs font-mono font-bold text-slate-300 shrink-0">
            {personPos.toFixed(0)}%
          </span>
        </div>
      </div>

      {/* CONTROL DASHBOARD & SETTINGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Day / Night Lux Control */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Ambient Lux Threshold
            </span>
            {timeOfDay === 'night' ? (
              <Moon className="w-4 h-4 text-indigo-400" />
            ) : (
              <Sun className="w-4 h-4 text-amber-400" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={() => setTimeOfDay('night')}
              className={`py-2 text-xs font-extrabold rounded-xl border transition-all cursor-pointer ${
                timeOfDay === 'night'
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Night (Active)
            </button>
            <button
              onClick={() => setTimeOfDay('day')}
              className={`py-2 text-xs font-extrabold rounded-xl border transition-all cursor-pointer ${
                timeOfDay === 'day'
                  ? 'bg-amber-500/30 border-amber-500 text-amber-300'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Day (Sleep)
            </button>
          </div>
        </div>

        {/* 2. Color Temperature Selector */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            LED CCT Temperature
          </span>
          <div className="grid grid-cols-3 gap-1.5 pt-1">
            {(['3000k', '4000k', '6500k'] as const).map((temp) => (
              <button
                key={temp}
                onClick={() => setColorTemp(temp)}
                className={`py-2 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                  colorTemp === temp
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {temp.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Radar Sensitivity Slider */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              PIR Radar Range
            </span>
            <span className="text-xs font-extrabold text-blue-400 font-mono">
              {detectionRange} Meters
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="4"
            step="0.5"
            value={detectionRange}
            onChange={(e) => setDetectionRange(parseFloat(e.target.value))}
            className="w-full accent-blue-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer pt-2"
          />
        </div>

        {/* 4. IP65 Weather Simulation */}
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              IP65 Rain Proofing
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <button
            onClick={() => setIsRaining(!isRaining)}
            className={`w-full py-2.5 text-xs font-extrabold rounded-xl border transition-all flex items-center justify-center gap-2 cursor-pointer ${
              isRaining
                ? 'bg-sky-500/20 border-sky-400 text-sky-300 shadow-md'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <CloudRain className="w-4 h-4" />
            <span>{isRaining ? 'Stop Rain Effect' : 'Simulate Outdoor Rain'}</span>
          </button>
        </div>
      </div>

      {/* LIVE PRODUCT SPECIFICATION BADGES */}
      <div className="bg-gradient-to-r from-blue-950/60 via-slate-900 to-indigo-950/60 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-extrabold text-white">3W Low Power Consumption</h4>
            <p className="text-xs text-slate-400">Direct AC 85-265V input with built-in LED driver</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs font-bold font-mono text-slate-300">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>PIR Status: {activeLights.some(Boolean) ? 'DETECTION ON' : 'STANDBY'}</span>
          </div>
          <div className="hidden sm:block text-slate-600">|</div>
          <div>IP65 Water Resistance</div>
          <div className="hidden sm:block text-slate-600">|</div>
          <div>86x86mm Recessed Fit</div>
        </div>
      </div>
    </div>
  );
};
