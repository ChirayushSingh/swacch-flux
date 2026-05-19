"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  CloudRain, 
  Flame, 
  MapPin, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  Globe, 
  Sliders, 
  Trophy, 
  UserCheck, 
  Cpu, 
  ShieldAlert, 
  Sparkles,
  Thermometer,
  Wind,
  Droplet,
  Compass,
  Zap,
  ArrowRight,
  RefreshCw,
  Play
} from "lucide-react";
import apiClient from "@/lib/api-client";

export default function ClimateResilience() {
  const [sensors, setSensors] = useState<any>({
    averageAqi: 0,
    drainageHealthIndex: 0,
    activeWaterlogSensorsCount: 0,
    drainBlockagesDetected: 0,
    temperatureCelsius: 0,
    humidityPercent: 0,
    heatwaveSeverity: 'LOW',
    waterlogZones: []
  });
  
  const [floodModel, setFloodModel] = useState<any>({
    predictedOverloadProbability: '0%',
    activeEvacuationScenarios: 0,
    floodProneHotspots: [],
    emergencyDispatchedFleetsCount: 0,
    alternateRoutesPreCalculated: 0
  });

  const [resilienceIndex, setResilienceIndex] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Climate Simulation State
  const [selectedScenario, setSelectedScenario] = useState<string>("monsoon");
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [simulating, setSimulating] = useState(false);

  // Digital Twin active layer state
  const [activeTwinLayer, setActiveTwinLayer] = useState<'drainage' | 'fleet' | 'risk'>('drainage');

  const fetchResilienceData = async () => {
    try {
      const [sensorRes, floodRes, indexRes] = await Promise.all([
        apiClient.get('/climate/sensors'),
        apiClient.get('/climate/flood-model'),
        apiClient.get('/climate/resilience-index')
      ]);
      setSensors(sensorRes.data);
      setFloodModel(floodRes.data);
      setResilienceIndex(indexRes.data);
    } catch (error) {
      console.error("Resilience Ingest Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResilienceData();
  }, []);

  const handleSimulate = async () => {
    try {
      setSimulating(true);
      const res = await apiClient.post('/climate/simulate', { scenario: selectedScenario });
      setSimulationResult(res.data);
    } catch (error) {
      console.error("Simulation Ingestion Error:", error);
    } finally {
      setSimulating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="space-y-8 h-[calc(100vh-120px)] overflow-y-auto pr-3 pb-8 text-slate-100">
      
      {/* Futuristic Command Banner */}
      <div className="bg-slate-950 border border-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-bold rounded-full border border-orange-500/20 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" /> National Emergency Command Center
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">Climate Resilience & Digital Twin Grid</h1>
            <p className="text-slate-400 text-xs max-w-xl">
              India's real-time urban digital twin and environmental stress grid. Auto-reroutes emergency fleets during floods, monitors heatwave worker exposure limits, and simulates stress factors dynamically.
            </p>
          </div>

          {/* Quick climate telemetry indicators */}
          <div className="flex flex-wrap gap-4 lg:self-end">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Thermometer className="w-4 h-4 text-orange-500 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Temp</p>
              <p className="text-xl font-black text-white">{sensors.temperatureCelsius}°C</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Wind className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">AQI Index</p>
              <p className="text-xl font-black text-emerald-400">{sensors.averageAqi}</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Droplet className="w-4 h-4 text-cyan-400 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Waterlog Sensors</p>
              <p className="text-xl font-black text-cyan-400">{sensors.activeWaterlogSensorsCount}</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-orange-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Interactive 3D Digital Twin Visualizer Panel */}
        <div className="col-span-12 lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[450px]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Compass className="w-5 h-5 text-orange-500 animate-spin" />
              <h2 className="font-bold text-base text-white">Interactive 3D Digital Twin Grid</h2>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTwinLayer('drainage')}
                className={`px-3 py-1 text-[9px] font-bold rounded-lg border transition-all ${activeTwinLayer === 'drainage' ? 'bg-orange-600 text-white border-orange-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'}`}
              >
                Drainage stress
              </button>
              <button 
                onClick={() => setActiveTwinLayer('fleet')}
                className={`px-3 py-1 text-[9px] font-bold rounded-lg border transition-all ${activeTwinLayer === 'fleet' ? 'bg-orange-600 text-white border-orange-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'}`}
              >
                Fleet Movement
              </button>
              <button 
                onClick={() => setActiveTwinLayer('risk')}
                className={`px-3 py-1 text-[9px] font-bold rounded-lg border transition-all ${activeTwinLayer === 'risk' ? 'bg-orange-600 text-white border-orange-500' : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'}`}
              >
                Risk overlays
              </button>
            </div>
          </div>

          {/* Graphic simulated digital twin */}
          <div className="flex-1 bg-black/80 border border-slate-900 rounded-2xl relative overflow-hidden flex items-center justify-center shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />
            
            {activeTwinLayer === 'drainage' && (
              <div className="relative text-center space-y-4 z-10 animate-fade-in">
                <CloudRain className="w-20 h-20 text-orange-500 mx-auto animate-bounce" />
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Drainage Inflow Capacity Overlay</p>
                  <p className="text-[10px] text-slate-400">Showing 5 drainage sensors at risk in Sector 3 (Ward D)</p>
                </div>
                <div className="w-48 bg-slate-900 h-2 rounded-full overflow-hidden mx-auto border border-slate-800">
                  <div className="bg-orange-500 h-full w-[88%]" />
                </div>
              </div>
            )}

            {activeTwinLayer === 'fleet' && (
              <div className="relative text-center space-y-4 z-10 animate-fade-in">
                <Activity className="w-20 h-20 text-emerald-500 mx-auto animate-pulse" />
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Compactor Routing Vectors</p>
                  <p className="text-[10px] text-slate-400">14 active trucks running optimized paths</p>
                </div>
                <div className="flex gap-2 justify-center text-[9px] text-slate-500">
                  <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800">Speed: 42 km/h</span>
                  <span className="px-2 py-0.5 bg-slate-900 rounded border border-slate-800">Telemetry: Ok</span>
                </div>
              </div>
            )}

            {activeTwinLayer === 'risk' && (
              <div className="relative text-center space-y-4 z-10 animate-fade-in">
                <ShieldAlert className="w-20 h-20 text-rose-500 mx-auto animate-pulse" />
                <div>
                  <p className="text-xs font-bold text-white uppercase tracking-wider">Urban Stress & Hazard Indices</p>
                  <p className="text-[10px] text-rose-400">Waterlogging predicted at Ward D Underpass within 15 mins</p>
                </div>
                <span className="px-3 py-1 bg-rose-500/10 text-rose-400 text-[10px] font-bold rounded-lg border border-rose-500/20">
                  IMMEDIATE ATTENTION
                </span>
              </div>
            )}

            {/* Glowing blur effects */}
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl animate-pulse" />
          </div>
        </div>

        {/* AI Climate Scenario Stress Simulator */}
        <div className="col-span-12 lg:col-span-5 bg-slate-900/40 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[450px]">
          <div className="flex items-center gap-3 mb-4">
            <Sliders className="w-5 h-5 text-orange-500" />
            <h2 className="font-bold text-base text-white">AI Policy & Stress Simulation</h2>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
            Input localized climate variables to preview predicted SLA impacts, emergency workforce pooling quotas, and financial logs.
          </p>

          <div className="flex gap-3 mb-6">
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="monsoon">Monsoon Deluge Overflow</option>
              <option value="heatwave">45°C Heatwave Strike</option>
            </select>
            <button
              onClick={handleSimulate}
              disabled={simulating}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-xs font-bold text-white rounded-xl shadow-lg shadow-orange-600/30 flex items-center gap-2 hover:scale-105 transition-all shrink-0 active:scale-95"
            >
              {simulating ? 'Calculating...' : 'Run Simulation'} <Play className="w-3 h-3 fill-white" />
            </button>
          </div>

          <div className="flex-1 bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex flex-col justify-center text-xs">
            {simulationResult ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Predicted SLA Risk</p>
                    <p className="text-lg font-black text-rose-400">{simulationResult.predictedSlaRisk}</p>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Emergency Crews</p>
                    <p className="text-lg font-black text-orange-400">{simulationResult.requiredEmergencyCrews}</p>
                  </div>
                </div>
                <div className="border-t border-slate-850 pt-3">
                  <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">AI Mitigation Recommendation</p>
                  <p className="text-[11px] leading-relaxed text-slate-300 italic">{simulationResult.insights}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500 italic text-[11px]">
                Click "Run Simulation" to ingest parameters and evaluate operational stress limits.
              </div>
            )}
          </div>
        </div>

        {/* Climate Disaster Orchestration Console */}
        <div className="col-span-12 lg:col-span-4 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl h-[350px] flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <Cpu className="w-5 h-5 text-orange-500 animate-pulse" />
            <h3 className="font-bold text-sm text-white">Disaster Orchestration Console</h3>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
            Real-time autonomous overrides executed by specialized AI agents to resolve climate threats.
          </p>

          <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px] text-emerald-400 bg-black/60 border border-slate-900 rounded-2xl p-4 shadow-inner">
            <div className="border-l border-orange-500/40 pl-2">
              <span className="text-slate-500">[LIVE] Flood Response Agent</span>
              <p className="text-slate-200">Blocked drainage detected at Sector 3. Rerouted Compactor MH-12-A3 to secondary pathway.</p>
            </div>
            <div className="border-l border-orange-500/40 pl-2">
              <span className="text-slate-500">[12m ago] Heatwave Agent</span>
              <p className="text-slate-200">Hydration Warning: Sweeping shift rebalanced. Workforce ID #104 moved to 5:00 PM routine.</p>
            </div>
          </div>
        </div>

        {/* National City Resilience Index Table */}
        <div className="col-span-12 lg:col-span-8 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Trophy className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-lg text-white">National City Resilience Index</h3>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Verified Readiness
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3">Rank</th>
                  <th className="pb-3">Municipal Corporation</th>
                  <th className="pb-3">Resilience Score</th>
                  <th className="pb-3">Flood Preparedness</th>
                  <th className="pb-3">IoT Coverage</th>
                  <th className="pb-3">Fleet Adaptability</th>
                </tr>
              </thead>
              <tbody>
                {resilienceIndex.map((row, i) => (
                  <tr key={i} className="border-b border-slate-900/40 text-xs hover:bg-slate-900/10 transition-colors">
                    <td className="py-4 font-mono font-bold text-orange-500">#{row.nationalResilienceRank}</td>
                    <td className="py-4 font-bold">{row.city}</td>
                    <td className="py-4 font-black text-sm">{row.resilienceScore}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 text-[9px] font-bold rounded ${
                        row.floodPreparedness === 'EXCELLENT' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {row.floodPreparedness}
                      </span>
                    </td>
                    <td className="py-4 text-slate-400">{row.activeIotDensity}%</td>
                    <td className="py-4 font-semibold text-slate-300">{row.fleetAdaptability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
