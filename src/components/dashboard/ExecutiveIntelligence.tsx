"use client";

import { motion } from "framer-motion";
import { Brain, ShieldAlert, TrendingUp, Users, Target, Zap, ArrowRight, MessageSquare, AlertTriangle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import apiClient from "@/lib/api-client";

export default function ExecutiveIntelligence() {
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [anomalies, setAnomalies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [chatQuery, setChatQuery] = useState("");
  const [chatResponse, setChatResponse] = useState("Hello Commissioner, I'm analyzing the latest city data. How can I assist you today?");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const orgId = localStorage.getItem('tenantId') || 'default-org';
        const [recRes, anoRes] = await Promise.all([
          apiClient.get(`/intelligence/recommendations?orgId=${orgId}`),
          apiClient.get(`/intelligence/anomalies?orgId=${orgId}`)
        ]);
        setRecommendations(recRes.data);
        setAnomalies(anoRes.data);
      } catch (error) {
        console.error("Intelligence Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAskAssistant = async () => {
    if (!chatQuery) return;
    try {
      setChatResponse("Analyzing data...");
      const orgId = localStorage.getItem('tenantId') || 'default-org';
      const res = await apiClient.post('/intelligence/assistant/ask', { query: chatQuery, orgId });
      setChatResponse(res.data.response);
      setChatQuery("");
    } catch (error) {
      setChatResponse("Sorry, I've encountered an error processing your query.");
    }
  };

  const handleExportReport = async () => {
    try {
      const orgId = localStorage.getItem('tenantId') || 'default-org';
      await apiClient.post('/intelligence/report/daily', { orgId });
      alert("Daily Intelligence Summary generated and sent to your email.");
    } catch (error) {
      alert("Failed to generate report.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-8 h-[calc(100vh-120px)] overflow-y-auto pr-2">
      
      {/* City-wide Health Score */}
      <div className="col-span-12 bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
         <div className="relative z-10 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 mb-6 text-emerald-400">
                <Brain className="w-6 h-6" />
                <span className="text-xs font-bold uppercase tracking-widest">Municipal Brain • Live Intelligence</span>
              </div>
              <h1 className="text-6xl font-bold mb-4 tracking-tighter">City Health Index: 88.4</h1>
              <p className="text-white/40 text-sm max-w-lg">Predicted operational efficiency for the next 24 hours. No critical disruptions forecasted.</p>
            </div>
            
            <div className="flex gap-12 text-center border-l border-white/10 pl-12">
               <div>
                  <p className="text-white/30 text-[10px] font-bold uppercase mb-1">Citizen Trust</p>
                  <p className="text-3xl font-bold text-blue-400">92%</p>
               </div>
               <div>
                  <p className="text-white/30 text-[10px] font-bold uppercase mb-1">SLA Health</p>
                  <p className="text-3xl font-bold text-emerald-400">96%</p>
               </div>
               <div>
                  <p className="text-white/30 text-[10px] font-bold uppercase mb-1">Budget Risk</p>
                  <p className="text-3xl font-bold text-rose-400">Low</p>
               </div>
            </div>
         </div>
         
         <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent blur-3xl" />
      </div>

      {/* Strategic AI Recommendations */}
      <div className="col-span-8 space-y-6">
        <h2 className="font-bold text-xl flex items-center gap-2">
          <Target className="w-5 h-5 text-emerald-500" />
          Strategic Decision Intelligence
        </h2>
        
        <div className="grid grid-cols-2 gap-6">
           {recommendations.map((rec, i) => (
             <motion.div 
               key={i}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               className="bg-card border border-border rounded-3xl p-6 shadow-sm hover:shadow-md transition-all group"
             >
                <div className="flex justify-between items-start mb-4">
                   <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full text-white ${rec.priority === 'HIGH' ? 'bg-rose-500' : 'bg-orange-500'}`}>
                     {rec.category}
                   </span>
                   <Zap className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-bold mb-2">{rec.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mb-6">{rec.description}</p>
                <button className="w-full py-3 bg-secondary/50 hover:bg-secondary rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2">
                   {rec.suggestedAction || 'Acknowledge'} <ArrowRight className="w-3 h-3" />
                </button>
             </motion.div>
           ))}
           {recommendations.length === 0 && (
             <div className="col-span-2 py-12 text-center text-muted-foreground bg-secondary/20 rounded-3xl border border-dashed">
               No strategic recommendations available at this time.
             </div>
           )}
        </div>

        {/* Predictive Map Overlay View */}
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm flex flex-col h-[400px]">
           <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Predictive Risk Heatmap</h3>
              <div className="flex gap-2">
                 <button className="px-3 py-1 bg-rose-500/10 text-rose-500 text-[10px] font-bold rounded-lg border border-rose-500/20">Overflow Risk</button>
                 <button className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-bold rounded-lg border border-blue-500/20">Staff Shortage</button>
              </div>
           </div>
           <div className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-rose-500/5 blur-2xl" />
              <div className="absolute inset-0 flex items-center justify-center opacity-10">
                 <Brain className="w-32 h-32" />
              </div>
              <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-rose-500/20 rounded-full blur-xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-orange-500/10 rounded-full blur-xl animate-pulse" />
           </div>
        </div>
      </div>

      {/* Intelligence Feed & AI Assistant */}
      <div className="col-span-4 space-y-6">
        
        {/* Real-time Anomaly Feed */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm">
           <h3 className="font-bold text-sm mb-6 flex items-center gap-2">
             <ShieldAlert className="w-5 h-5 text-rose-500" />
             Anomalies Detected
           </h3>
           <div className="space-y-4">
              {anomalies.map((a, i) => (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-2xl border ${a.severity === 'CRITICAL' ? 'bg-rose-500/5 border-rose-500/10' : 'bg-orange-500/5 border-orange-500/10'}`}>
                   <div className={`w-8 h-8 rounded-full flex items-center justify-center ${a.severity === 'CRITICAL' ? 'bg-rose-500/10' : 'bg-orange-500/10'}`}>
                      <AlertTriangle className={`w-4 h-4 ${a.severity === 'CRITICAL' ? 'text-rose-500' : 'text-orange-500'}`} />
                   </div>
                    <div className="flex-1">
                      <p className={`text-[11px] font-bold ${a.severity === 'CRITICAL' ? 'text-rose-600' : 'text-orange-600'}`}>{a.type.replace('_', ' ')}</p>
                      <p className="text-[9px] opacity-60">{a.targetId} • {a.details}</p>
                    </div>
                </div>
              ))}
              {anomalies.length === 0 && (
                <div className="py-8 text-center text-xs text-muted-foreground">
                  No active anomalies detected.
                </div>
              )}
           </div>
        </div>

        {/* AI Operations Assistant */}
        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl shadow-indigo-600/20 flex flex-col h-[350px]">
           <div className="flex items-center gap-2 mb-6">
             <Brain className="w-5 h-5" />
             <h3 className="font-bold text-sm">Ops Assistant</h3>
           </div>
           <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              <div className="bg-white/10 rounded-2xl p-3 text-xs leading-relaxed">
                 {chatResponse}
              </div>
           </div>
           <div className="relative mt-auto">
              <input 
                type="text" 
                value={chatQuery}
                onChange={(e) => setChatQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAskAssistant()}
                placeholder="Ask about city operations..." 
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-white/40"
              />
              <button 
                onClick={handleAskAssistant}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white text-indigo-600 rounded-lg shadow-lg hover:scale-105 transition-transform"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
           </div>
        </div>

        {/* Daily Intelligence Summary Export */}
        <button 
          onClick={handleExportReport}
          className="w-full py-4 bg-foreground text-background font-bold rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-lg shadow-black/10"
        >
          <TrendingUp className="w-5 h-5" />
          Export Daily Intelligence
        </button>

      </div>

    </div>
  );
}
