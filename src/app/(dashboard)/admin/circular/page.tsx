"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Building2, 
  Coins, 
  Flame, 
  Leaf, 
  LineChart, 
  Percent, 
  Play, 
  RefreshCw, 
  Scale, 
  Send, 
  Sparkles, 
  Trophy, 
  TrendingUp, 
  Zap, 
  Activity, 
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  ChevronRight,
  Sliders
} from "lucide-react";
import apiClient from "@/lib/api-client";

export default function CircularEconomy() {
  const [exchange, setExchange] = useState<any>({
    totalDryWasteRecoveredTons: 0,
    activeRecyclersOnboarded: 0,
    carbonCreditsEarned: 0,
    swachhCoinsDistributed: 0,
    recyclingEfficiencyPercent: 0,
    sdgMetrics: {
      sdg11SustainableCities: '0%',
      sdg12ResponsibleConsumption: '0%',
      sdg13ClimateAction: '0%'
    },
    recentTrades: []
  });

  const [epr, setEpr] = useState<any[]>([]);
  const [bids, setBids] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // AI ESG simulation state
  const [selectedScenario, setSelectedScenario] = useState<string>("adaptation");
  const [simulationResult, setSimulationResult] = useState<any>(null);
  const [simulating, setSimulating] = useState(false);

  const fetchCircularData = async () => {
    try {
      const [exRes, eprRes, bidsRes] = await Promise.all([
        apiClient.get('/circular/exchange'),
        apiClient.get('/circular/epr'),
        apiClient.get('/circular/bids')
      ]);
      setExchange(exRes.data);
      setEpr(eprRes.data);
      setBids(bidsRes.data);
    } catch (error) {
      console.error("Circular Ingest Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCircularData();
  }, []);

  const handleSimulate = async () => {
    try {
      setSimulating(true);
      const res = await apiClient.post('/circular/simulate', { scenario: selectedScenario });
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

  return (
    <div className="space-y-8 h-[calc(100vh-120px)] overflow-y-auto pr-3 pb-8 text-slate-100 font-sans">
      
      {/* Dynamic Climate-Finance Banner */}
      <div className="bg-slate-950 border border-slate-900 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-bold rounded-full border border-orange-500/20 uppercase tracking-widest">
              <Sparkles className="w-3 h-3 text-orange-500 animate-pulse" /> Climate-Finance Operating Grid
            </div>
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight leading-none text-white">Urban Circular Economy Exchange</h1>
            <p className="text-slate-400 text-xs max-w-xl">
              India's federated waste-to-value settlement engine. Coordinates recyclables trading marketplace, monitors extended producer responsibility (EPR) compliance, and manages ESG green indices dynamically.
            </p>
          </div>

          {/* Core circular indicators */}
          <div className="flex flex-wrap gap-4 lg:self-end">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Coins className="w-4 h-4 text-orange-500 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Coins Distributed</p>
              <p className="text-xl font-black text-white">{(exchange.swachhCoinsDistributed / 1000000).toFixed(1)}M</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Leaf className="w-4 h-4 text-emerald-400 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Carbon Credits</p>
              <p className="text-xl font-black text-emerald-400">{exchange.carbonCreditsEarned}</p>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-4 min-w-[130px] text-center backdrop-blur-md">
              <Percent className="w-4 h-4 text-blue-400 mx-auto mb-1.5" />
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Recycling Rate</p>
              <p className="text-xl font-black text-blue-400">{exchange.recyclingEfficiencyPercent}%</p>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-full bg-gradient-to-l from-orange-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      </div>

      <div className="grid grid-cols-12 gap-8">
        
        {/* Scrap Material Marketplace pricing */}
        <div className="col-span-12 lg:col-span-8 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-orange-500" />
              <h2 className="font-bold text-base text-white">Waste-to-Value Recycler Marketplace</h2>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Active Trade Pricing
            </span>
          </div>

          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3">Material Category</th>
                  <th className="pb-3">Index Price (INR/KG)</th>
                  <th className="pb-3">Active Recycler Bids</th>
                  <th className="pb-3">Last Traded Qty</th>
                  <th className="pb-3">Trend</th>
                </tr>
              </thead>
              <tbody>
                {bids.map((row, i) => (
                  <tr key={i} className="border-b border-slate-900/40 text-xs hover:bg-slate-900/20 transition-colors">
                    <td className="py-4 font-bold text-white flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      {row.materialType}
                    </td>
                    <td className="py-4 font-black">₹{row.pricingInrPerKg.toFixed(2)}</td>
                    <td className="py-4 font-semibold text-emerald-400">{row.activeBiddersCount} Recyclers</td>
                    <td className="py-4 text-slate-400">{row.lastTradedQtyTons} Tons</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        row.trend === 'UPWARD' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        row.trend === 'STABLE' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                        'bg-orange-500/10 text-orange-400 border border-orange-500/20'
                      }`}>
                        {row.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI ESG & Climate-Finance Simulator */}
        <div className="col-span-12 lg:col-span-4 bg-slate-900/40 border border-slate-900 rounded-3xl p-6 shadow-2xl flex flex-col h-[400px]">
          <div className="flex items-center gap-3 mb-4">
            <Sliders className="w-5 h-5 text-orange-500" />
            <h2 className="font-bold text-base text-white">AI ESG & Finance Simulator</h2>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
            Ingest smart recycling policies to evaluate predicted 5-year carbon offsets, material growths, and estimated amortization returns (ROI).
          </p>

          <div className="flex gap-3 mb-6">
            <select
              value={selectedScenario}
              onChange={(e) => setSelectedScenario(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="adaptation">Smart Recovery Adaptation</option>
              <option value="recycling">Citizen Segregation Rewards Boost</option>
            </select>
            <button
              onClick={handleSimulate}
              disabled={simulating}
              className="px-5 py-3 bg-orange-600 hover:bg-orange-700 text-xs font-bold text-white rounded-xl shadow-lg shadow-orange-600/30 flex items-center gap-2 hover:scale-105 transition-all shrink-0 active:scale-95"
            >
              {simulating ? 'Calculating...' : 'Run Lab'} <Play className="w-3 h-3 fill-white" />
            </button>
          </div>

          <div className="flex-1 bg-slate-950/60 border border-slate-900 rounded-2xl p-4 flex flex-col justify-center text-xs">
            {simulationResult ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">5-Yr Carbon Offsets</p>
                    <p className="text-sm font-black text-emerald-400">{simulationResult.predictedCarbonReduction5Years}</p>
                  </div>
                  <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3">
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Est. Green ROI</p>
                    <p className="text-sm font-black text-orange-400">{simulationResult.estimatedReturnOnInvestment}</p>
                  </div>
                </div>
                <div className="border-t border-slate-850 pt-3 flex justify-between items-center text-[10px]">
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">ESG Score gains</p>
                    <p className="font-bold text-emerald-400">{simulationResult.esgScoreIncrease}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Efficiency growth</p>
                    <p className="font-bold text-blue-400">{simulationResult.expectedMaterialRecoveryGrowth}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-500 italic text-[11px]">
                Click "Run Lab" to calculate circular economy ROI variables and ESG scorecard metrics.
              </div>
            )}
          </div>
        </div>

        {/* EPR Compliance Obligations Table */}
        <div className="col-span-12 lg:col-span-8 bg-slate-950 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              <h3 className="font-bold text-lg text-white">EPR Compliance Obligations Ledger</h3>
            </div>
            <span className="text-[9px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
              Verified fulfillment
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  <th className="pb-3">Obliged Corporate Brand</th>
                  <th className="pb-3">Target Obligation</th>
                  <th className="pb-3">Fulfillment Claims</th>
                  <th className="pb-3">Fulfilled %</th>
                  <th className="pb-3">Plastic Neutrality Rating</th>
                  <th className="pb-3">Compliance Status</th>
                </tr>
              </thead>
              <tbody>
                {epr.map((row, i) => (
                  <tr key={i} className="border-b border-slate-900/40 text-xs hover:bg-slate-900/10 transition-colors">
                    <td className="py-4 font-bold text-white">{row.brandName}</td>
                    <td className="py-4 font-black">{row.targetTons.toLocaleString()} Tons</td>
                    <td className="py-4 font-semibold text-emerald-400">{row.fulfilledTons.toLocaleString()} Tons</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-900 h-1.5 rounded-full overflow-hidden border border-slate-800 shrink-0">
                          <div className="bg-orange-500 h-full" style={{ width: `${row.fulfillmentPercent}%` }} />
                        </div>
                        <span className="font-bold text-slate-300">{row.fulfillmentPercent}%</span>
                      </div>
                    </td>
                    <td className="py-4 text-slate-300 font-medium">{row.plasticNeutralityRating}</td>
                    <td className="py-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        row.complianceStatus === 'ON_TRACK' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {row.complianceStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Trades Ingress */}
        <div className="col-span-12 lg:col-span-4 bg-slate-950 border border-slate-900 rounded-3xl p-6 shadow-2xl h-[350px] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Activity className="w-5 h-5 text-orange-500 animate-pulse" />
              <h3 className="font-bold text-sm text-white">Live Exchange Trades</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
              Scrolling ledger audit trail of recent waste monetization transactions and Swachh Coins rewards issued.
            </p>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 font-mono text-[10px] text-emerald-400 bg-black/60 border border-slate-900 rounded-2xl p-4 shadow-inner">
            {exchange.recentTrades.map((ms: string, i: number) => (
              <div key={i} className="border-l border-orange-500/40 pl-2">
                <span className="text-slate-500">[COMPLETED] Transaction #{40902 + i}</span>
                <p className="text-slate-200 mt-0.5">{ms}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
