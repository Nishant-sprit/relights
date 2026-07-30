import React, { useState } from 'react';
import { RotateCw, Cpu, Layers, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const ThreeSixtyProductViewer: React.FC = () => {
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    setRotationAngle((prev) => (prev + deltaX * 0.8) % 360);
    setStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div id="product-360-viewer" className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-100/60 px-3 py-1 rounded-full">
            Hardware Engineering
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1">
            Interactive 360° Controller View
          </h3>
          <p className="text-xs text-slate-500">
            Click and drag horizontally to rotate the Relights Smart Microprocessor Hub.
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 text-xs text-slate-600 shadow-sm">
          <RotateCw className="w-4 h-4 text-blue-600 animate-spin-slow" />
          <span>360° Drag Rotator</span>
        </div>
      </div>

      {/* 360 Interactive Stage */}
      <div
        className="relative h-72 sm:h-80 bg-white rounded-2xl border border-slate-200 flex items-center justify-center cursor-grab active:cursor-grabbing select-none overflow-hidden shadow-inner"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Rendered 3D Box Simulation using CSS Transforms */}
        <div
          className="transition-transform duration-75 ease-out relative"
          style={{ transform: `rotateY(${rotationAngle}deg) rotateX(12deg)` }}
        >
          {/* Main Controller Body */}
          <div className="w-64 h-36 bg-gradient-to-r from-slate-100 via-white to-slate-200 rounded-2xl border-2 border-slate-300 shadow-2xl p-4 relative flex flex-col justify-between">
            {/* Top Display Panel */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[10px] font-black tracking-wider text-slate-800">RELIGHTS PRO-32</span>
              </div>
              <div className="bg-slate-900 text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded border border-slate-700">
                24 STEPS • 3000K
              </div>
            </div>

            {/* LED Status Bar & Microprocessor Indicator */}
            <div className="flex items-center justify-center my-1 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="w-3 h-1.5 bg-blue-500 rounded-full shadow-[0_0_6px_#3b82f6]" />
              ))}
            </div>

            {/* Bottom Push Terminals */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-[8px] font-mono text-slate-500">
              <span>DC 12V-24V IN</span>
              <span>PIR TOP</span>
              <span>PIR BOT</span>
              <span>32-CH OUT</span>
            </div>
          </div>
        </div>

        {/* Rotate Indicator Overlay */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-slate-900/80 text-white text-[10px] font-medium px-3 py-1.5 rounded-full pointer-events-none flex items-center gap-1.5">
          <RotateCw className="w-3 h-3 text-blue-400" />
          <span>Angle: {Math.round((rotationAngle % 360 + 360) % 360)}°</span>
        </div>
      </div>

      {/* Controller Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
        <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
          <p className="font-bold text-slate-900 flex items-center gap-1">
            <Cpu className="w-3.5 h-3.5 text-blue-600" /> Dual Microchip
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Zero lag motion response</p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
          <p className="font-bold text-slate-900 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-blue-600" /> Push Terminals
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Screwless quick wiring</p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
          <p className="font-bold text-slate-900 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" /> ABS Flameproof
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Heat-dissipating housing</p>
        </div>

        <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
          <p className="font-bold text-slate-900 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Lux Light Sensor
          </p>
          <p className="text-[10px] text-slate-500 mt-0.5">Automatic day lockout</p>
        </div>
      </div>
    </div>
  );
};
