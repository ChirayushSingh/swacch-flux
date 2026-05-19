"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Building2, 
  Scale, 
  Trash2, 
  Leaf, 
  Sliders, 
  ArrowRight, 
  RefreshCw, 
  Trophy, 
  TrendingUp, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Activity, 
  Sparkles,
  Zap,
  Gauge,
  Thermometer,
  ShieldAlert
} from "lucide-react";
import apiClient from "@/lib/api-client";

export default function WasteInfraOS() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [mrfLogs, setMrfLogs] = useState<any[]>([]);
  const [landfill, setLandfill] = useState<any>({
    activeCellId: "",
    dailyDumpTons: 0,
    totalCapacityTons: 0,
    utilizedCapacityTons: 0,
    volumeUtilizationPercent: 0,
    lifespanYearsPredicted: 0,
    environmentalIndicators: {
      leachateLevelMm: 0,
      methaneEmissionPpm: 0,
      complianceIndexPercent: 0
    }
  });
  const [organic, setOrganic] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // AI Flow simulation state
  const [surgeLevel, setSurgeLevel] = useState<string>("low");
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [simulating, setSimulating] = useState(false);

  const fetchInfraData = async () => {
    try {
      const [wbRes, mrfRes, lfRes, orgRes] = await Promise.all([
        apiClient.get('/waste-infra/weighbridge'),
        apiClient.get('/waste-infra/mrf'),
        apiClient.get('/waste-infra/landfill'),
        apiClient.get('/waste-infra/organic-processing')
      ]);
      setTickets(wbRes.data);
      setMrfLogs(mrfRes.data);
      setLandfill(lfRes.data);
      setOrganic(orgRes.data);
    } catch (error) {
      console.error("Infrastructure Ingest Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInfraData();
  }, []);

  const handleSimulate = async () => {
    try {
      setSimulating(true);
      const res = await apiClient.post('/waste-infra/simulate', { surge: surgeLevel });
      setSimulationResult(res.data);
    } catch (error) {
      console.error("Simulation Error:", error);
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

  // Derived global metrics
  const totalIncomingTons = tickets.reduce((acc, tk) => acc + tk.netWeightKg, 0) / 1000;
  const globalDiversionPercent = 88.4; // Wet processing + MRF recovery index

  return (
    <div className="space-y-8 h-[calc(100vh-120px)] overflow-y-auto pr-3 pb-8 text-slate-100 font-sans">
      
      {/* Dynamic Industrial Command Banner */}
      <div className="bg-slate-950 border border-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-bold rounded-full border border-orange-500/20 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" /> National Waste Flow Operating System
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">Waste Infrastructure & Material Flow</h1>
            <p className="text-slate-400 text-xs max-w-xl">
              India's industrial-grade municipal waste operating network. Reconciles high-frequency weighbridge tickets, audits Material Recovery Facility (MRF) purities, and monitors landfill saturation lifespans dynamically.
            </p>
          </div>

          {/* Core industrial indicators */}
          <div className="flex flex-wrap gap-4 lg:self-end">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Scale className="w-4 h-4 text-orange-500 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Incoming Tonnage</p>
              <p className="text-xl font-black text-white">{(totalIncomingTons + landfill.dailyDumpTons).toFixed(1)} Tons</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Leaf className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Diversion Ratio</p>
              <p className="text-xl font-black text-emerald-400">{globalDiversionPercent}%</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Trash2 className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Active Cell Utilization</p>
              <p className="text-xl font-black text-blue-400">{landfill.volumeUtilizationPercent}%</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-orange-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Weighbridge Ingress Tickets */}
        <div className="col-span-12 lg:col-span-8 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Scale className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-base text-white">Weighbridge Ingest Tickets Ledger</h2>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Live certified Weight
            </span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3">Ticket No</th>
                  <th className="pb-3">Vehicle No</th>
                  <th className="pb-3">Gross Weight</th>
                  <th className="pb-3">Tare Weight</th>
                  <th className="pb-3">Certified Net Weight</th>
                  <th className="pb-3 text-right">Reconcile</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((row, i) => (
                  <tr key={i} className="border-b border-slate-900/40 text-xs hover:bg-slate-900/20 transition-colors">
                    <td className="py-4 font-mono font-bold text-orange-500">{row.ticketNo}</td>
                    <td className="py-4 font-bold text-white">{row.vehicleNo}</td>
                    <td className="py-4 text-slate-400">{(row.grossWeightKg / 1000).toFixed(2)} Tons</td>
                    <td className="py-4 text-slate-400">{(row.tareWeightKg / 1000).toFixed(2)} Tons</td>
                    <td className="py-4 font-black text-white">{(row.netWeightKg / 1000).toFixed(2)} Tons</td>
                    <td className="py-4 text-right">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        row.reconciledStatus === 'MATCHED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      }`}>
                        {row.reconciledStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Material Flow Forecasting Engine */}
        <div className="col-span-12 lg:col-span-4 bg-slate-900/40 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[400px] justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Sliders className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-base text-white">AI Material Flow Lab</h2>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
              Simulate waste generation surges (e.g., heavy monsoon runoff) to identify facility congestion risks and dynamically balance processing outputs.
            </p>

            <div className="flex gap-3 mb-6">
              <select
                value={surgeLevel}
                onChange={(e) => setSurgeLevel(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none"
              >
                <option value="low">Standard Flow Rate</option>
                <option value="high">Heavy Monsoon Surge (+40%)</option>
              </select>
              <button
                onClick={handleSimulate}
                disabled={simulating}
                className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-xs font-bold text-white rounded-xl shadow-lg shadow-orange-600/30 flex items-center gap-2 hover:scale-105 transition-all shrink-0 active:scale-95"
              >
                {simulating ? 'Calculating...' : 'Run Simulation'} <Play className="w-3 h-3 fill-white" />
              </button>
            </div>

            <div className="flex-1 bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex flex-col justify-center text-xs">
              {simulationResult ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Saturation Risk</p>
                      <p className="text-sm font-black text-rose-400">{simulationResult.infrastructureBottleneckRisk}</p>
                    </div>
                    <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3">
                      <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Landfill Saturation</p>
                      <p className="text-sm font-black text-orange-400">{simulationResult.predictedLandfillLifeShorteningMonths} Months early</p>
                    </div>
                  </div>
                  <div className="border-t border-slate-850 pt-3">
                    <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Dynamic Reroute Recommendation</p>
                    <p className="font-semibold text-emerald-400 leading-tight">{simulationResult.optimizationAction}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center text-slate-500 italic text-[11px]">
                  Click "Run Simulation" to model material flow stress levels.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MRF Sorting Facility details */}
        <div className="col-span-12 lg:col-span-7 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Building2 className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-lg text-white">Material Recovery Facilities (MRF) Segregation</h3>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Recovered Materials Audit
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3">Facility Location</th>
                  <th className="pb-3">Plastic recovered</th>
                  <th className="pb-3">Cardboard recovered</th>
                  <th className="pb-3">Metals recovered</th>
                  <th className="pb-3">Rejected Residuals</th>
                  <th className="pb-3 text-right">Purity Score</th>
                </tr>
              </thead>
              <tbody>
                {mrfLogs.map((row, i) => (
                  <tr key={i} className="border-b border-slate-900/40 text-xs hover:bg-slate-900/10 transition-colors">
                    <td className="py-4 font-bold text-white">{row.facilityName}</td>
                    <td className="py-4 font-semibold text-emerald-400">{row.plasticRecoveredTons} Tons</td>
                    <td className="py-4 text-slate-300">{row.cardboardRecoveredTons} Tons</td>
                    <td className="py-4 text-slate-300">{row.metalRecoveredTons} Tons</td>
                    <td className="py-4 text-rose-400 font-bold">{row.rejectedResidueTons} Tons</td>
                    <td className="py-4 text-right font-black text-white">{row.materialPurityPercent}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Landfill Lifespan & environmental diagnostics */}
        <div className="col-span-12 lg:col-span-5 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl h-[380px] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <ShieldAlert className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-sm text-white">Landfill Cell Saturation & Environment</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
              Track environmental compliance indices, leachate drainage levels, and methane emission pings dynamically.
            </p>
          </div>

          <div className="flex-1 bg-slate-900/40 border border-slate-850 rounded-2xl p-4 space-y-4 text-xs">
            <div className="flex justify-between items-center pb-3 border-b border-slate-850/50">
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Active cell ID</p>
                <p className="font-black text-white">{landfill.activeCellId}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Environmental compliance</p>
                <p className="font-black text-emerald-400">{landfill.environmentalIndicators.complianceIndexPercent}%</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-3">
                <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Leachate Drainage</p>
                <p className="font-bold text-white">{landfill.environmentalIndicators.leachateLevelMm} mm</p>
              </div>
              <div className="bg-slate-950 border border-slate-900 rounded-xl p-3">
                <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Methane Emission</p>
                <p className="font-bold text-orange-400">{landfill.environmentalIndicators.methaneEmissionPpm} ppm</p>
              </div>
            </div>

            <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-3 flex justify-between items-center text-[10px]">
              <span className="font-bold text-orange-400 uppercase">Predicted Lifespan Longevity:</span>
              <span className="text-sm font-black text-white">{landfill.lifespanYearsPredicted} Years</span>
            </div>
          </div>
        </div>

        {/* Organic Compost & RDF processing plant statistics */}
        <div className="col-span-12 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-orange-500 animate-pulse" />
              <h3 className="font-bold text-lg text-white">Organic Compost & RDF Processing Stations</h3>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Waste-to-Value Processing
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {organic.map((row, i) => (
              <div key={i} className="bg-slate-900/40 border border-slate-900 rounded-2xl p-6 space-y-4">
                <div className="flex justify-between items-start">
                  <h4 className="font-black text-base text-white">{row.facilityName}</h4>
                  <span className="text-[9px] font-bold px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded border border-emerald-500/20 uppercase">
                    {row.qualityRating}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-xs font-mono border-t border-slate-850 pt-4">
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Daily Intake</p>
                    <p className="font-bold text-white">{row.wetWasteIntakeTons} Tons</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Value Output</p>
                    <p className="font-bold text-emerald-400">{row.rdfOutputTons || row.compostOutputTons} Tons</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-500 uppercase mb-0.5">Processing Cycle</p>
                    <p className="font-bold text-blue-400">{row.processingCycleDays} Days</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
