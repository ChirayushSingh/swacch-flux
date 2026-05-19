"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { 
  Trophy, 
  MapPin, 
  Leaf, 
  Award, 
  TrendingUp, 
  CheckCircle2, 
  Globe, 
  Lock, 
  RefreshCw, 
  Users, 
  ChevronRight,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";
import apiClient from "@/lib/api-client";

export default function TransparencyPortal() {
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
  const [loading, setLoading] = useState(true);

  // Citizen Feedback state
  const [feedbackCategory, setFeedbackCategory] = useState("SLA");
  const [feedbackComment, setFeedbackComment] = useState("");
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

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
        console.error("Transparency Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComment) return;
    setFeedbackSubmitted(true);
    setFeedbackComment("");
    setTimeout(() => setFeedbackSubmitted(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-4">
          <RefreshCw className="w-8 h-8 animate-spin text-orange-500" />
          <p className="text-xs uppercase tracking-widest text-slate-400">Loading Transparency Portal...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-orange-500 selection:text-white pb-16">
      
      {/* Top Banner Navigation */}
      <nav className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 h-16 flex items-center justify-between px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg shadow-orange-600/30">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="font-bold text-sm block leading-tight">Swachh DPI</span>
            <span className="text-[8px] text-slate-400 font-bold uppercase tracking-wider block">National Open Data Portal</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-[10px] text-slate-400 hidden sm:inline">🇮🇳 Ministry of Urban Affairs Initiative</span>
          <Link 
            href="/login" 
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-xs font-bold rounded-xl flex items-center gap-2 border border-slate-800 transition-colors"
          >
            Officer Sign In <Lock className="w-3.5 h-3.5 text-orange-500" />
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 text-[10px] font-bold rounded-full border border-orange-500/20">
            <Globe className="w-3.5 h-3.5" /> Live Open Data Network
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-none">
            Unified Citizen <span className="text-orange-500">Transparency Portal</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
            Real-time urban governance, route completion scores, waste segregation audits, and carbon offset ledgers published openly under Indian Smart City Protocols.
          </p>
        </div>

        {/* Global Impact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">National SLA Rate</p>
            <p className="text-3xl font-black text-orange-500">{transparency.averageNationalSlaCompliance}</p>
            <p className="text-[10px] text-slate-400 mt-2">Average response resolution across 142 cities</p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Carbon Offsets</p>
            <p className="text-3xl font-black text-emerald-500">{transparency.totalCo2SavedTons} Tons</p>
            <p className="text-[10px] text-slate-400 mt-2">Estimated carbon savings through routes optimization</p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Recycling Diverted</p>
            <p className="text-3xl font-black text-blue-500">{(transparency.wasteDivertedTons / 1000).toFixed(1)}k Tons</p>
            <p className="text-[10px] text-slate-400 mt-2">Diverted waste processed at modern compost parks</p>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 shadow-xl relative overflow-hidden">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Swachh Rewards</p>
            <p className="text-3xl font-black text-yellow-500">{(transparency.swachhCoinsIssued / 1000000).toFixed(2)}M</p>
            <p className="text-[10px] text-slate-400 mt-2">Swachh Coins issued directly to citizen wallets</p>
          </div>
        </div>

        {/* Benchmarking Table */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="col-span-12 lg:col-span-8 bg-slate-900/30 border border-slate-900 rounded-3xl p-6 md:p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-5 h-5 text-orange-500" />
                <h3 className="font-bold text-lg">National Cleanliness Scoreboard</h3>
              </div>
              <span className="text-[9px] font-bold px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full border border-emerald-500/20">
                Verified Benchmarks
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    <th className="pb-3">Rank</th>
                    <th className="pb-3">Municipality</th>
                    <th className="pb-3">Cleanliness Index</th>
                    <th className="pb-3">SLA Compliance</th>
                    <th className="pb-3">Active Crews</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {benchmarks.map((row, i) => (
                    <tr key={i} className="border-b border-slate-800/40 text-xs hover:bg-slate-900/20 transition-colors">
                      <td className="py-4 font-bold text-orange-500">#{row.nationalRank}</td>
                      <td className="py-4 font-bold">{row.city}</td>
                      <td className="py-4 font-black text-sm">{row.cleanlinessScore}</td>
                      <td className="py-4 font-semibold text-emerald-400">{row.slaCompliancePercent}%</td>
                      <td className="py-4 text-slate-400">{(row.activeWorkers).toLocaleString()}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                          row.status === 'EXCELLENT' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                          row.status === 'GOOD' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                          'bg-orange-500/10 text-orange-400 border border-orange-500/20'
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

          {/* Citizen Feedback & Open Inquiries */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-6 shadow-xl">
              <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                <Users className="w-4 h-4 text-orange-500" />
                Citizen Open Feedback
              </h3>
              <p className="text-[11px] text-slate-400 leading-relaxed mb-6">
                Directly submit complaints, suggestion ratings, or general governance audits to help improve cleanliness indicators.
              </p>

              {feedbackSubmitted ? (
                <div className="py-8 text-center space-y-2 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <p className="text-xs font-bold text-emerald-400">Feedback Submitted Successfully</p>
                  <p className="text-[10px] text-slate-400">Logged to the government decentralised database</p>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Audit Target Category</label>
                    <select 
                      value={feedbackCategory} 
                      onChange={(e) => setFeedbackCategory(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                    >
                      <option value="SLA">SLA Response Delays</option>
                      <option value="SEGREGATION">Segregation & Quality</option>
                      <option value="COMPACTOR">Compactor GPS Routing</option>
                      <option value="WARD">Ward Sweeper Coverage</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Observation / Audit Details</label>
                    <textarea 
                      value={feedbackComment} 
                      onChange={(e) => setFeedbackComment(e.target.value)}
                      rows={3} 
                      placeholder="Input local observation benchmarks..." 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-500 placeholder:text-slate-600"
                    />
                  </div>

                  <button className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                    Submit Audit Log <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>

            {/* DPI Public Policy Guidelines */}
            <div className="bg-slate-900/20 border border-slate-900/60 rounded-3xl p-6 text-xs text-slate-400 space-y-4">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Award className="w-4 h-4 text-orange-500" />
                DPI Access Policy
              </h4>
              <p className="leading-relaxed text-[11px]">
                Under the National Urban Governance initiative, citizens have the inherent right to scrutinize routing completion benchmarks and contractor billing aggregates. All data displayed here is cryptographically verified via NIC gateway nodes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
