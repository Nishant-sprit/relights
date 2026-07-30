import React, { useState } from 'react';
import { X, Check, FileText, Zap, ShieldAlert, Cpu } from 'lucide-react';

interface WiringGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFootLight?: boolean;
}

export const WiringGuideModal: React.FC<WiringGuideModalProps> = ({ isOpen, onClose, isFootLight }) => {
  const [selectedTab, setSelectedTab] = useState<'schema' | 'steps' | 'safety'>('schema');

  if (!isOpen) return null;

  return (
    <div id="wiring-guide-modal-backdrop" className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900">
              {isFootLight
                ? '3W Motion Sensor Foot Light AC Wiring & Box Cutout'
                : 'Relights Smart Controller Wiring Diagram'}
            </h3>
            <p className="text-xs text-slate-500">
              {isFootLight
                ? 'Concealed 86mm x 86mm modular box installation & 220V AC direct wiring'
                : 'Illustrated schematic guide for 12V/24V DC installation'}
            </p>
          </div>
        </div>

        {/* Modal Nav Tabs */}
        <div className="flex gap-2 border-b border-slate-200 pb-3 mb-6">
          <button
            onClick={() => setSelectedTab('schema')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              selectedTab === 'schema'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Wiring Schema Diagram
          </button>
          <button
            onClick={() => setSelectedTab('steps')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              selectedTab === 'steps'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Step-by-Step Instructions
          </button>
          <button
            onClick={() => setSelectedTab('safety')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
              selectedTab === 'safety'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Safety Guidelines
          </button>
        </div>

        {/* Tab Content */}
        {selectedTab === 'schema' && (
          <div className="space-y-6">
            {/* Visual Wiring Diagram Container */}
            <div className="bg-slate-900 rounded-2xl p-6 text-slate-200 border border-slate-800">
              <div className="text-center mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400">
                  {isFootLight
                    ? 'SCHEMATIC: 3W RECESSED FOOT LIGHT AC 85-265V DIRECT BUS'
                    : 'SCHEMATIC: RELIGHTS-PRO-24 DC WIRING BUS'}
                </span>
              </div>

              {isFootLight ? (
                /* 3W Foot Light Direct AC Schematic */
                <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-400 block mb-1">Mains Power Supply Input</span>
                      <span className="text-xs font-mono text-slate-300">Live (L - Red/Brown) & Neutral (N - Black/Blue) AC 220V</span>
                    </div>
                    <span className="text-xs font-mono bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded">AC 85-265V</span>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border-2 border-blue-500/50 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-xs font-extrabold text-white flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-blue-400" /> 86x86mm Concealed Modular Junction Box
                      </span>
                      <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-mono">
                        IP65 Sealed
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono text-slate-300">
                      <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                        <span className="text-blue-400 font-bold block">Internal Constant Driver</span>
                        3W High Efficiency COB LED Module
                      </div>
                      <div className="bg-slate-900 p-2.5 rounded border border-slate-800">
                        <span className="text-emerald-400 font-bold block">Integrated PIR Radar</span>
                        Auto Lux & 120° Motion Photocell
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-800 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between text-xs">
                    <span className="text-slate-300">Output Downward Beam:</span>
                    <span className="font-bold text-amber-300">3000K Warm White Anti-Glare Louvered Light</span>
                  </div>
                </div>
              ) : (
                /* Standard Controller Schematic */
                <div className="space-y-6">
                  {/* Top PIR Sensor */}
                  <div className="flex items-center justify-between bg-slate-800 p-3 rounded-xl border border-slate-700">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-emerald-400" />
                      <span className="text-xs font-bold text-white">Top Landing PIR Motion Sensor</span>
                    </div>
                    <span className="text-xs font-mono text-blue-300">Port: PIR-1 (3-Pin Quick Connector)</span>
                  </div>

                  {/* Controller Terminal Ports Block */}
                  <div className="bg-slate-800/80 p-4 rounded-xl border-2 border-blue-500/50 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                      <span className="text-xs font-extrabold text-white flex items-center gap-1.5">
                        <Cpu className="w-4 h-4 text-blue-400" /> RELIGHTS CONTROLLER HUB
                      </span>
                      <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded">DC 12V-24V</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] font-mono text-slate-300">
                      <div className="bg-slate-900 p-2 rounded border border-slate-700">Ch 01 &rarr; Step #1 LED (+) (-)</div>
                      <div className="bg-slate-900 p-2 rounded border border-slate-700">Ch 02 &rarr; Step #2 LED (+) (-)</div>
                      <div className="bg-slate-900 p-2 rounded border border-slate-700">Ch 03 &rarr; Step #3 LED (+) (-)</div>
                      <div className="bg-slate-900 p-2 rounded border border-slate-700">Ch 24 &rarr; Step #24 LED (+) (-)</div>
                    </div>
                  </div>

                  {/* Power Supply & Bottom Sensor */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                      <p className="text-xs font-bold text-white mb-1">Bottom PIR Motion Sensor</p>
                      <p className="text-[10px] font-mono text-blue-300">Port: PIR-2 Connector</p>
                    </div>
                    <div className="bg-slate-800 p-3 rounded-xl border border-slate-700">
                      <p className="text-xs font-bold text-amber-400 mb-1">24V DC Transformer Power Supply</p>
                      <p className="text-[10px] font-mono text-slate-300">Connect to (+) V+ and (-) V- Main In</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl text-xs text-blue-900 flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Need a physical printed diagram?</p>
                <p className="text-slate-600 mt-0.5">
                  Every Relights unit includes a full-color folded wiring blueprint inside the product box.
                </p>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'steps' && (
          <div className="space-y-4">
            <div className="space-y-3">
              {isFootLight ? (
                <>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Install Standard 86x86mm Concealed Modular Box</h4>
                      <p className="text-xs text-slate-600 mt-1">Recess standard modular wall junction back-boxes into brick/drywall 15–20 cm above step treads or along pathway walls.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Connect AC 220V Mains Wires to Terminal Block</h4>
                      <p className="text-xs text-slate-600 mt-1">Insert Live (L) and Neutral (N) power wires into the fixture rear terminal block. No external transformer or driver needed.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Fit IP65 Sealing Gasket & Fasten Front Plate</h4>
                      <p className="text-xs text-slate-600 mt-1">Place the silicone waterproof ring behind the aluminium faceplate and tighten the two stainless steel mounting screws into the back box.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">4</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Power On & Test Radar Motion Sensor</h4>
                      <p className="text-xs text-slate-600 mt-1">Switch on power. The light will automatically trigger when footsteps are detected within 3 meters in darkness, then turn off after 30 seconds.</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">1</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Mount LED Channels under each stair step</h4>
                      <p className="text-xs text-slate-600 mt-1">Adhere aluminum profiles or COB LED strip light strips along the under-nosing or riser of each stair step.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">2</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Route channel wires to central controller</h4>
                      <p className="text-xs text-slate-600 mt-1">Run each step wire pair into corresponding numbered terminal channel (1 to 24) on the Relights hub.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">3</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Install Top & Bottom Motion Sensors</h4>
                      <p className="text-xs text-slate-600 mt-1">Mount the PIR motion sensors at waist height (or riser height) on the top and bottom staircase landings.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">4</span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Connect 12V/24V Power Supply & Test</h4>
                      <p className="text-xs text-slate-600 mt-1">Plug the DC transformer output into the main power terminal, program total step count on the screen, and test motion detection.</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'safety' && (
          <div className="space-y-4 text-xs text-slate-700">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 space-y-2">
              <p className="font-bold flex items-center gap-2 text-sm text-amber-800">
                <ShieldAlert className="w-5 h-5 text-amber-600" /> Safe Low-Voltage Notice
              </p>
              <p>
                The Relights Controller Hub operates on safe 12V to 24V DC power. Always turn off main power before connecting or splicing any wire cables.
              </p>
            </div>
            <ul className="space-y-2 pl-4 list-disc text-slate-600">
              <li>Ensure power transformer wattage exceeds total LED strip wattage by at least 20%.</li>
              <li>Do not expose the controller hub directly to outdoor rain unless installed inside an IP65 junction enclosure.</li>
              <li>Always check polarity (+ and -) before powering on the controller for the first time.</li>
            </ul>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-900 text-white font-bold text-xs px-6 py-2.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
          >
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
};
