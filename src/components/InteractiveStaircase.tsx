import React, { useState, useEffect } from 'react';
import { Play, Sparkles, RefreshCw, Zap } from 'lucide-react';

type LedColorType = 'warm-white' | 'white' | 'rgb';
type RgbSubColor = 'red' | 'blue' | 'mixture';

const MIXTURE_COLORS = [
  '#EF4444', // Red
  '#F97316', // Orange
  '#F59E0B', // Amber
  '#10B981', // Emerald
  '#06B6D4', // Cyan
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#EC4899', // Pink
];

export const InteractiveStaircase: React.FC = () => {
  const [activeStepsCount, setActiveStepsCount] = useState<number>(16);
  const [ledColorType, setLedColorType] = useState<LedColorType>('warm-white');
  const [rgbSubColor, setRgbSubColor] = useState<RgbSubColor>('mixture');
  const [speedMs, setSpeedMs] = useState<number>(150); // ms per step

  // Helper to determine step LED color
  const getStepColor = (index: number) => {
    if (ledColorType === 'warm-white') return '#F59E0B';
    if (ledColorType === 'white') return '#F8FAFC';
    // RGB Mode
    if (rgbSubColor === 'red') return '#EF4444';
    if (rgbSubColor === 'blue') return '#3B82F6';
    return MIXTURE_COLORS[index % MIXTURE_COLORS.length];
  };

  const getGlowColor = () => {
    if (ledColorType === 'warm-white') return '#F59E0B';
    if (ledColorType === 'white') return '#38BDF8';
    if (rgbSubColor === 'red') return '#EF4444';
    if (rgbSubColor === 'blue') return '#3B82F6';
    return '#8B5CF6';
  };
  
  // Animation state
  const [litSteps, setLitSteps] = useState<boolean[]>(Array(16).fill(false));
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [currentActiveSensor, setCurrentActiveSensor] = useState<'bottom' | 'top' | null>(null);

  useEffect(() => {
    setLitSteps(Array(activeStepsCount).fill(false));
    setIsAnimating(false);
    setCurrentActiveSensor(null);
  }, [activeStepsCount]);

  const runSimulation = (direction: 'up' | 'down') => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentActiveSensor(direction === 'up' ? 'bottom' : 'top');

    let currentStep = direction === 'up' ? 0 : activeStepsCount - 1;

    // Immediately light up the starting step (#1 for up, or #last for down)
    const startIdx = currentStep;
    setLitSteps(() => {
      const next = Array(activeStepsCount).fill(false);
      next[startIdx] = true;
      return next;
    });

    const interval = setInterval(() => {
      if (direction === 'up') {
        currentStep++;
        if (currentStep < activeStepsCount) {
          const stepToLight = currentStep;
          setLitSteps((prev) => {
            const next = [...prev];
            next[stepToLight] = true;
            return next;
          });
        } else {
          clearInterval(interval);
          setCurrentActiveSensor(null);
          // Auto turn off after delay
          setTimeout(() => {
            turnOffSequentially('up');
          }, 1800);
        }
      } else {
        currentStep--;
        if (currentStep >= 0) {
          const stepToLight = currentStep;
          setLitSteps((prev) => {
            const next = [...prev];
            next[stepToLight] = true;
            return next;
          });
        } else {
          clearInterval(interval);
          setCurrentActiveSensor(null);
          setTimeout(() => {
            turnOffSequentially('down');
          }, 1800);
        }
      }
    }, speedMs);
  };

  const turnOffSequentially = (direction: 'up' | 'down') => {
    let currentStep = direction === 'up' ? 0 : activeStepsCount - 1;

    // Immediately turn off first step
    const startIdx = currentStep;
    setLitSteps((prev) => {
      const next = [...prev];
      next[startIdx] = false;
      return next;
    });

    const interval = setInterval(() => {
      if (direction === 'up') {
        currentStep++;
        if (currentStep < activeStepsCount) {
          const stepToOff = currentStep;
          setLitSteps((prev) => {
            const next = [...prev];
            next[stepToOff] = false;
            return next;
          });
        } else {
          clearInterval(interval);
          setIsAnimating(false);
        }
      } else {
        currentStep--;
        if (currentStep >= 0) {
          const stepToOff = currentStep;
          setLitSteps((prev) => {
            const next = [...prev];
            next[stepToOff] = false;
            return next;
          });
        } else {
          clearInterval(interval);
          setIsAnimating(false);
        }
      }
    }, Math.max(40, speedMs - 20));
  };

  const resetStaircase = () => {
    setLitSteps(Array(activeStepsCount).fill(false));
    setIsAnimating(false);
    setCurrentActiveSensor(null);
  };

  return (
    <div id="interactive-staircase-simulator" className="bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-slate-800 relative overflow-hidden">
      {/* Background glow accent */}
      <div 
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none transition-all duration-700"
        style={{ backgroundColor: getGlowColor() }}
      />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full mb-2">
            <Zap className="w-3.5 h-3.5" /> Interactive Real-time Simulation
          </div>
          <h3 className="text-2xl font-black tracking-tight text-white">
            Simulate Relights Cascading Motion
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Test how the PIR sensors trigger individual steps step-by-step as you walk up or down.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => runSimulation('up')}
            disabled={isAnimating}
            className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            Walk Upstairs
          </button>
          <button
            onClick={() => runSimulation('down')}
            disabled={isAnimating}
            className="bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl transition-all border border-slate-700 flex items-center gap-2 cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current rotate-180" />
            Walk Downstairs
          </button>
          <button
            onClick={resetStaircase}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl transition-colors cursor-pointer"
            title="Reset simulation"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Interactive Staircase Visual Representation */}
        <div className="lg:col-span-7 rounded-2xl p-6 transition-colors duration-500 relative border bg-slate-950 border-slate-800">
          {/* Top Sensor Module Visual */}
          <div className="flex items-center justify-between mb-4 px-2">
            <button
              onClick={() => runSimulation('down')}
              disabled={isAnimating}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50"
              title="Click to trigger Top PIR Sensor"
            >
              <span className={`w-3 h-3 rounded-full transition-colors ${
                currentActiveSensor === 'top' ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'
              }`} />
              <span className="text-xs font-bold text-slate-300">Top PIR Motion Sensor</span>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-semibold ml-1">
                Click to Trigger
              </span>
            </button>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Landing 2</span>
          </div>

          {/* Stairs Step Visual Stack */}
          <div className="space-y-1.5 my-4 max-h-[360px] overflow-y-auto pr-1">
            {Array.from({ length: activeStepsCount }).map((_, index) => {
              const isLit = litSteps[index];
              const stepNum = index + 1;
              const stepColor = getStepColor(index);
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 transition-all duration-300"
                  style={{ paddingLeft: `${index * 12}px` }} // Isometric diagonal staircase effect
                >
                  <span className="text-[10px] font-mono text-slate-500 w-6 text-right">#{stepNum}</span>
                  <div
                    className={`h-4 rounded-md flex-1 transition-all duration-300 relative overflow-hidden ${
                      isLit
                        ? 'shadow-lg'
                        : 'bg-slate-800 border border-slate-700/50'
                    }`}
                    style={{
                      backgroundColor: isLit ? stepColor : undefined,
                      boxShadow: isLit ? `0 0 16px ${stepColor}90` : 'none',
                    }}
                  >
                    {isLit && (
                      <div className="absolute inset-0 bg-white/30 animate-pulse" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Sensor Module Visual */}
          <div className="flex items-center justify-between mt-4 px-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => runSimulation('up')}
              disabled={isAnimating}
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50"
              title="Click to trigger Bottom PIR Sensor"
            >
              <span className={`w-3 h-3 rounded-full transition-colors ${
                currentActiveSensor === 'bottom' ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'
              }`} />
              <span className="text-xs font-bold text-slate-300">Bottom PIR Motion Sensor</span>
              <span className="text-[10px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded-full font-semibold ml-1">
                Click to Trigger
              </span>
            </button>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Landing 1</span>
          </div>
        </div>

        {/* Customization Controls Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          {/* LED Color Picker */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              1. Choose LED Color
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setLedColorType('warm-white')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  ledColorType === 'warm-white'
                    ? 'bg-amber-500/20 border-amber-500 text-white font-bold'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-amber-400 border border-white/20 shrink-0" />
                <span className="text-xs font-bold">Warm White</span>
                <span className="text-[10px] text-slate-400">3000K</span>
              </button>

              <button
                onClick={() => setLedColorType('white')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  ledColorType === 'white'
                    ? 'bg-blue-500/20 border-blue-400 text-white font-bold'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-slate-100 border border-white/20 shrink-0" />
                <span className="text-xs font-bold">White</span>
                <span className="text-[10px] text-slate-400">6000K</span>
              </button>

              <button
                onClick={() => setLedColorType('rgb')}
                className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1.5 ${
                  ledColorType === 'rgb'
                    ? 'bg-purple-600/20 border-purple-500 text-white font-bold'
                    : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 border border-white/20 shrink-0" />
                <span className="text-xs font-bold">RGB</span>
                <span className="text-[10px] text-slate-400">Multi-Color</span>
              </button>
            </div>

            {/* RGB Sub-options */}
            {ledColorType === 'rgb' && (
              <div className="mt-3 p-3 bg-slate-950/80 rounded-xl border border-slate-800 space-y-2">
                <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                  Select RGB Color Mode:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => setRgbSubColor('red')}
                    className={`py-2 px-2 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      rgbSubColor === 'red'
                        ? 'bg-red-500/20 border-red-500 text-red-300'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0" />
                    Red
                  </button>

                  <button
                    onClick={() => setRgbSubColor('blue')}
                    className={`py-2 px-2 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      rgbSubColor === 'blue'
                        ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                    Blue
                  </button>

                  <button
                    onClick={() => setRgbSubColor('mixture')}
                    className={`py-2 px-2 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      rgbSubColor === 'mixture'
                        ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                        : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-red-500 via-green-500 to-blue-500 shrink-0" />
                    Mixture
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Staircase Steps Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              2. Staircase Step Count
            </label>
            <div className="flex gap-2">
              {[16, 24, 32].map((steps) => (
                <button
                  key={steps}
                  onClick={() => setActiveStepsCount(steps)}
                  className={`flex-1 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                    activeStepsCount === steps
                      ? 'bg-blue-600 text-white border-blue-500 shadow-md shadow-blue-600/20'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700'
                  }`}
                >
                  {steps} Steps
                </button>
              ))}
            </div>
          </div>

          {/* Cascading Speed Adjustment */}
          <div>
            <div className="flex justify-between text-xs font-bold text-slate-300 mb-2">
              <span>3. Cascading Animation Speed</span>
              <span className="text-blue-400">{speedMs}ms / step</span>
            </div>
            <input
              type="range"
              min="50"
              max="400"
              step="25"
              value={speedMs}
              onChange={(e) => setSpeedMs(Number(e.target.value))}
              className="w-full accent-blue-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Ultra Fast (50ms)</span>
              <span>Cinematic (400ms)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


