"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Cpu, 
  Play, 
  RotateCcw, 
  Sliders, 
  Terminal, 
  AlertTriangle, 
  CheckCircle2, 
  BrainCircuit, 
  ShieldAlert, 
  TrendingDown, 
  Gauge, 
  Zap, 
  UserCheck, 
  Send,
  CloudRain,
  Flame,
  UserX,
  Sparkles,
  RefreshCw
} from "lucide-react";
import apiClient from "@/lib/api-client";

export default function AutonomousOS() {
  const [agents, setAgents] = useState<any[]>([]);
  const [interventions, setInterventions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Scenario simulation state
  const [selectedScenario, setSelectedScenario] = useState<string>("monsoon");
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [simulating, setSimulating] = useState(false);

  // Override log state
  const [overridingId, setOverridingId] = useState<string | null>(null);

  const fetchActiveState = async () => {
    try {
      const [agentRes, interRes] = await Promise.all([
        apiClient.get('/autonomous/agents'),
        apiClient.get('/autonomous/interventions')
      ]);
      setAgents(agentRes.data);
      setInterventions(interRes.data);
    } catch (error) {
      console.error("Autonomous Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActiveState();
  }, []);

  const handleSimulate = async () => {
    try {
      setSimulating(true);
      const res = await apiClient.post('/autonomous/simulate', { scenario: selectedScenario });
      setSimulationResult(res.data);
    } catch (error) {
      console.error("Simulation Error:", error);
    } finally {
      setSimulating(false);
    }
  };

  const handleOverride = async (id: string) => {
    try {
      setOverridingId(id);
      const res = await apiClient.post('/autonomous/override', { 
        interventionId: id,
        actionType: 'SUPERVISOR_ROLLBACK' 
      });
      alert(res.data.message);
      // Refresh state
      await fetchActiveState();
    } catch (error) {
      alert("Failed to execute supervisor override.");
    } finally {
      setOverridingId(null);
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
      
      {/* Futuristic Banner */}
      <div className="bg-slate-950 border border-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-bold rounded-full border border-orange-500/20 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" /> Self-Operating Municipal OS Grid
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">Autonomous Municipal Operations</h1>
            <p className="text-slate-400 text-xs max-w-xl">
              India's first agentic AI urban governance engine. Orchestrates 7 specialized agents to self-heal fleet routes, auto-rebalance labor deficiencies, and enforce penalty ledger compliance dynamically.
            </p>
          </div>

          {/* Key aggregated stats in glassmorphic cards */}
          <div className="flex flex-wrap gap-4 lg:self-end">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[140px] text-center backdrop-blur-md">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">AI Confidence</p>
              <p className="text-2xl font-black text-emerald-400">97.6%</p>
              <p className="text-[8px] text-slate-500 mt-1">Average Grid Trust</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[140px] text-center backdrop-blur-md">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Active Actions</p>
              <p className="text-2xl font-black text-orange-500">42</p>
              <p className="text-[8px] text-slate-500 mt-1">Auto-Orchestrated Today</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[140px] text-center backdrop-blur-md">
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-1">Carbon Saved</p>
              <p className="text-2xl font-black text-blue-400">4,120t</p>
              <p className="text-[8px] text-slate-500 mt-1">Self-Optimized Routes</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-orange-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Real-time AI Decisions Terminal Console */}
        <div className="col-span-12 lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Terminal className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-base text-white">Dynamic AI Decision Console</h2>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Live Ingestion Log
            </span>
          </div>

          {/* Scrolling Terminal block */}
          <div className="flex-1 overflow-y-auto bg-black/60 border border-slate-900 rounded-2xl p-4 font-mono text-[11px] leading-relaxed space-y-4 text-emerald-400 shadow-inner">
            {interventions.map((row, i) => (
              <div key={i} className="border-l-2 border-orange-500/40 pl-3 space-y-1">
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>[{row.timestamp}] - {row.agent}</span>
                  <span className="font-bold text-orange-400">CONFIDENCE: {row.confidence}%</span>
                </div>
                <p className="text-slate-200">{row.description}</p>
                <div className="flex gap-4 text-[9px] text-slate-400 uppercase font-bold">
                  <span>RISK: {row.risk}</span>
                  <span>STATUS: {row.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Scenario Simulation Engine */}
        <div className="col-span-12 lg:col-span-5 bg-slate-900/40 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[400px]">
          <div className="flex items-center gap-3 mb-4">
            <Sliders className="w-5 h-5 text-orange-500" />
            <h2 className="font-bold text-base text-white">Municipal Policy Simulator</h2>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
            Evaluate high-risk operational policies before deployment. AI forecasts predicted SLA compliance risk, drain blockages, and resource reallocations.
          </p>

          <div className="flex gap-3 mb-6">
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="monsoon">Monsoon Flooding Clogging</option>
              <option value="festival">Festival Trash Overload Surge</option>
            </select>
            <button
              onClick={handleSimulate}
              disabled={simulating}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-xs font-bold text-white rounded-xl shadow-lg shadow-orange-600/30 flex items-center gap-2 hover:scale-105 transition-all shrink-0 active:scale-95"
            >
              {simulating ? 'Simulating...' : 'Run Scenario'} <Play className="w-3 h-3 fill-white" />
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
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Emergency Crews Needed</p>
                    <p className="text-lg font-black text-orange-400">{simulationResult.requiredEmergencyCrews}</p>
                  </div>
                </div>
                <div className="border-t border-slate-850 pt-3">
                  <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">AI Recommendation Insight</p>
                  <p className="text-[11px] leading-relaxed text-slate-300 italic">{simulationResult.insights}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500 italic text-[11px]">
                Click "Run Scenario" to calculate dynamic municipal forecasts.
              </div>
            )}
          </div>
        </div>

        {/* Multi-Agent Collaboration Grid */}
        <div className="col-span-12 space-y-6">
          <div className="flex items-center gap-3">
            <BrainCircuit className="w-6 h-6 text-orange-500 animate-pulse" />
            <h2 className="font-bold text-lg text-white">Agentic AI Grid Collaboration Mesh</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {agents.map((row, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-900/30 border border-slate-900 rounded-3xl p-5 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2 py-0.5 bg-orange-500/10 text-orange-400 text-[9px] font-bold rounded-full border border-orange-500/20">
                      Trust Quotient: {row.trustScore}%
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white mb-1.5">{row.name}</h3>
                    <p className="text-[10px] text-slate-400 leading-relaxed italic">
                      "{row.lastAction}"
                    </p>
                  </div>
                </div>
                
                <div className="border-t border-slate-950 mt-5 pt-4 flex justify-between items-center text-[10px] text-slate-500 font-bold">
                  <span>INTERVENTIONS: {row.activeInterventions}</span>
                  <span className="text-emerald-400">{row.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Human Override Queue */}
        <div className="col-span-12 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-lg text-white">Human Override & Low-Confidence Queue</h3>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-rose-500/10 text-rose-400 rounded-full border border-rose-500/20">
              Requires Verification
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3">Action ID</th>
                  <th className="pb-3">Executing Agent</th>
                  <th className="pb-3">Intervention Action</th>
                  <th className="pb-3">Confidence</th>
                  <th className="pb-3">Risk Assessment</th>
                  <th className="pb-3">Override Action</th>
                </tr>
              </thead>
              <tbody>
                {interventions.filter(r => r.status === 'SUSPENDED_APPROVAL_QUEUE').map((row, i) => (
                  <tr key={i} className="border-b border-slate-900/40 text-xs hover:bg-slate-900/10 transition-colors">
                    <td className="py-4 font-mono font-bold text-orange-500">{row.id}</td>
                    <td className="py-4 font-bold">{row.agent}</td>
                    <td className="py-4 text-slate-300 leading-relaxed max-w-sm">{row.description}</td>
                    <td className="py-4 font-bold text-rose-400">{row.confidence}%</td>
                    <td className="py-4">
                      <span className="px-2.5 py-0.5 bg-rose-500/10 text-rose-400 text-[9px] font-bold rounded-full border border-rose-500/20">
                        {row.risk}
                      </span>
                    </td>
                    <td className="py-4">
                      <button
                        onClick={() => handleOverride(row.id)}
                        disabled={overridingId === row.id}
                        className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-[10px] font-bold text-white rounded-xl shadow-lg shadow-rose-600/20 hover:scale-105 transition-all flex items-center gap-1.5 active:scale-95 disabled:opacity-50"
                      >
                        <RotateCcw className="w-3.5 h-3.5" /> Rollback Action
                      </button>
                    </td>
                  </tr>
                ))}
                {interventions.filter(r => r.status === 'SUSPENDED_APPROVAL_QUEUE').length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-500 italic">
                      Zero low-confidence actions currently require supervisor override. The platform is self-operating successfully.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
