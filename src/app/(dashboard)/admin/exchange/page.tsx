"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Building2, 
  Code, 
  Cpu, 
  Search, 
  Terminal, 
  MapPin, 
  Trophy, 
  Share2, 
  ShieldCheck, 
  BrainCircuit, 
  CheckCircle, 
  Send, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  FileText
} from "lucide-react";
import apiClient from "@/lib/api-client";

export default function GovernanceExchange() {
  const [benchmarks, setBenchmarks] = useState<any[]>([]);
  const [transparency, setTransparency] = useState<any>({
    totalMunicipalitiesConnected: 0,
    activeSensorsIngested: 0,
    averageNationalSlaCompliance: '0%',
    wasteDivertedTons: 0,
    totalCo2SavedTons: 0,
    swachhCoinsIssued: 0,
    recentMilestones: []
  });
  
  const [activeTab, setActiveTab] = useState<'exchange' | 'developer' | 'marketplace'>('exchange');
  
  // AI Governance Assistant state
  const [chatQuery, setChatQuery] = useState("");
  const [chatResponse, setChatResponse] = useState("Jai Hind Commissioner. I'm connected to the National Urban Data Exchange (NUDE). How can I assist you with inter-municipal analytics today?");
  const [asking, setAsking] = useState(false);

  // Developer portal state
  const [copiedKey, setCopiedKey] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [benchRes, transRes] = await Promise.all([
          apiClient.get('/dpi/benchmarks'),
          apiClient.get('/dpi/transparency')
        ]);
        setBenchmarks(benchRes.data);
        setTransparency(transRes.data);
      } catch (error) {
        console.error("DPI Fetch Error:", error);
      }
    };
    fetchData();
  }, []);

  const handleAskAssistant = async () => {
    if (!chatQuery) return;
    try {
      setAsking(true);
      setChatResponse("Quering federated databases...");
      const res = await apiClient.post('/dpi/assistant/ask', { query: chatQuery });
      setChatResponse(res.data.response);
      setChatQuery("");
    } catch (error) {
      setChatResponse("Error accessing the federated AI nodes. Please try again.");
    } finally {
      setAsking(false);
    }
  };

  const copyApiKey = () => {
    navigator.clipboard.writeText("swachh_dpi_live_pk_8a92f03f7e21");
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="space-y-8 h-[calc(100vh-120px)] overflow-y-auto pr-3 pb-8">
      {/* Header Banner */}
      <div className="bg-slate-950 rounded-3xl p-10 text-white relative overflow-hidden border border-slate-800 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-4 text-orange-500 font-bold text-xs uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              Digital Public Infrastructure (DPI)
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-tight">National Urban Governance Exchange</h1>
            <p className="text-slate-400 text-sm max-w-xl">
              India's federated smart city data exchange, benchmark registries, open API transparency models, and ESG compliance exchanges.
            </p>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={() => setActiveTab('exchange')}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all ${activeTab === 'exchange' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
            >
              Exchange Hub
            </button>
            <button 
              onClick={() => setActiveTab('developer')}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all ${activeTab === 'developer' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
            >
              Open APIs
            </button>
            <button 
              onClick={() => setActiveTab('marketplace')}
              className={`px-5 py-3 rounded-2xl text-xs font-bold transition-all ${activeTab === 'marketplace' ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/30' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
            >
              App Marketplace
            </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-80 h-full bg-gradient-to-l from-orange-500/10 via-transparent to-transparent blur-3xl pointer-events-none" />
      </div>

      {activeTab === 'exchange' && (
        <div className="grid grid-cols-12 gap-8">
          {/* Main Benchmark scoreboards */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-orange-500" />
                  <h2 className="font-bold text-lg">National Cleanliness & SLA Benchmarks</h2>
                </div>
                <span className="text-[10px] font-bold px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full border border-emerald-500/20">
                  Live Exchange Feeds
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                      <th className="pb-3">Rank</th>
                      <th className="pb-3">Municipal Corporation</th>
                      <th className="pb-3">Cleanliness Index</th>
                      <th className="pb-3">SLA Compliance</th>
                      <th className="pb-3">Route Coverage</th>
                      <th className="pb-3">CO2 Offsets</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {benchmarks.map((row, i) => (
                      <tr key={i} className="border-b border-border/50 text-xs hover:bg-muted/30 transition-colors">
                        <td className="py-4 font-bold text-orange-500">#{row.nationalRank}</td>
                        <td className="py-4 font-bold flex items-center gap-2">
                          <Building2 className="w-3.5 h-3.5 text-muted-foreground" />
                          {row.city}
                        </td>
                        <td className="py-4 font-black">{row.cleanlinessScore}</td>
                        <td className="py-4 font-semibold text-emerald-500">{row.slaCompliancePercent}%</td>
                        <td className="py-4 text-muted-foreground">{row.routeCoveragePercent}%</td>
                        <td className="py-4 font-medium">{row.carbonSavedTons} Tons</td>
                        <td className="py-4">
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                            row.status === 'EXCELLENT' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                            row.status === 'GOOD' ? 'bg-blue-500/10 text-blue-500 border border-blue-500/20' :
                            'bg-orange-500/10 text-orange-500 border border-orange-500/20'
                          }`}>
                            {row.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* DPI Stats Panel */}
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Federated Nodes</p>
                <p className="text-3xl font-black text-orange-600">{transparency.totalMunicipalitiesConnected}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Municipalities Active</p>
              </div>
              <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Global Ingestion</p>
                <p className="text-3xl font-black text-emerald-600">{(transparency.activeSensorsIngested / 1000).toFixed(1)}k</p>
                <p className="text-[10px] text-muted-foreground mt-1">Active IoT Sensors</p>
              </div>
              <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
                <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">Swachh Coin Rewards</p>
                <p className="text-3xl font-black text-blue-600">{(transparency.swachhCoinsIssued / 1000000).toFixed(2)}M</p>
                <p className="text-[10px] text-muted-foreground mt-1">DPI Tokens Earned</p>
              </div>
            </div>
          </div>

          {/* AI Governance Assistant Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-2xl border border-slate-800 flex flex-col h-[400px]">
              <div className="flex items-center gap-2 mb-6">
                <BrainCircuit className="w-5 h-5 text-orange-500 animate-pulse" />
                <h3 className="font-bold text-sm">Federated AI Gov Assistant</h3>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-1 text-xs leading-relaxed text-slate-300">
                <div className="bg-white/5 rounded-2xl p-4 border border-white/5 shadow-inner">
                  {chatResponse}
                </div>
              </div>
              <div className="relative mt-auto">
                <input 
                  type="text" 
                  value={chatQuery}
                  onChange={(e) => setChatQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAskAssistant()}
                  placeholder="Query national city indices..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 text-white"
                  disabled={asking}
                />
                <button 
                  onClick={handleAskAssistant}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-600 text-white rounded-lg shadow-lg hover:scale-105 transition-transform"
                  disabled={asking}
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* DPI Trust milestones */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
              <h3 className="font-bold text-xs mb-4 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                DPI Verified Milestones
              </h3>
              <div className="space-y-4">
                {transparency.recentMilestones.map((ms: string, i: number) => (
                  <div key={i} className="flex gap-3 items-start text-[11px] leading-relaxed text-muted-foreground">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                    <span>{ms}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'developer' && (
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm space-y-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Terminal className="w-6 h-6 text-orange-500" />
                <h2 className="font-bold text-2xl">Urban Governance API Developer Portal</h2>
              </div>
              <p className="text-xs text-muted-foreground">
                Expose data sets directly to municipal partners, environmental agencies, and public health systems.
              </p>
            </div>
            
            <div className="bg-slate-950 text-white rounded-2xl p-4 flex items-center gap-4 border border-slate-800 text-xs font-mono">
              <span>Key: swachh_dpi_live_pk_8a92f03f7e21</span>
              <button 
                onClick={copyApiKey} 
                className="px-3 py-1.5 bg-orange-600 rounded-lg font-sans font-bold hover:bg-orange-700 active:scale-95 transition-all"
              >
                {copiedKey ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>

          {/* API endpoints list */}
          <div className="space-y-6">
            <h3 className="font-bold text-sm">Core Data Exchange Endpoints</h3>
            
            <div className="space-y-4">
              {/* Endpoint 1 */}
              <div className="border border-border rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded font-mono">GET</span>
                    <span className="font-mono text-xs font-bold text-foreground">/api/v1/dpi/benchmarks</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Retrieve live cleanliness and SLA benchmarks for all 100+ cities in India.</p>
                </div>
                <button className="px-4 py-2 bg-secondary text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-secondary/80">
                  Try Out <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Endpoint 2 */}
              <div className="border border-border rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded font-mono">GET</span>
                    <span className="font-mono text-xs font-bold text-foreground">/api/v1/dpi/transparency</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Retrieve general open data indices, carbon savings log, and milestone arrays.</p>
                </div>
                <button className="px-4 py-2 bg-secondary text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-secondary/80">
                  Try Out <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Endpoint 3 */}
              <div className="border border-border rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded font-mono">POST</span>
                    <span className="font-mono text-xs font-bold text-foreground">/api/v1/dpi/identity/validate</span>
                  </div>
                  <p className="text-[11px] text-muted-foreground">Validate federated worker and citizen identity tokens across partner states.</p>
                </div>
                <button className="px-4 py-2 bg-secondary text-xs font-bold rounded-xl flex items-center gap-2 hover:bg-secondary/80">
                  Try Out <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'marketplace' && (
        <div className="space-y-8">
          <div>
            <h2 className="font-bold text-2xl flex items-center gap-3">
              <Cpu className="w-6 h-6 text-orange-500" />
              Municipal App & Device Marketplace
            </h2>
            <p className="text-xs text-muted-foreground mt-1">
              Plug-and-play modules for smart city administrators, vendor IoT edges, and third-party municipal ERP nodes.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 bg-orange-500/10 text-orange-500 text-[9px] font-bold rounded-full">IoT Telemetry Edge</span>
                <h3 className="font-bold mt-4 mb-2">SmartBin Capacitive Connector</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Direct hardware-level adapter plugin for Smart Bin capacitive fill level indicators, utilizing MQTT payload formats.
                </p>
              </div>
              <button className="w-full mt-6 py-3 bg-secondary text-xs font-bold rounded-xl hover:bg-secondary/80">Install Module</button>
            </div>

            {/* Card 2 */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[9px] font-bold rounded-full">GIS Visualization</span>
                <h3 className="font-bold mt-4 mb-2">NIC Spatial Twin Overlay</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Integrate National Informatics Centre (NIC) spatial mapping schemas to project city digital twin layers seamlessly.
                </p>
              </div>
              <button className="w-full mt-6 py-3 bg-secondary text-xs font-bold rounded-xl hover:bg-secondary/80">Install Module</button>
            </div>

            {/* Card 3 */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 text-[9px] font-bold rounded-full">Citizen Rewards</span>
                <h3 className="font-bold mt-4 mb-2">Swachh Coins UPI Settlement</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Enables real-time payout conversions of accumulated citizen Swachh Coins rewards into direct UPI bank accounts.
                </p>
              </div>
              <button className="w-full mt-6 py-3 bg-secondary text-xs font-bold rounded-xl hover:bg-secondary/80">Install Module</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
