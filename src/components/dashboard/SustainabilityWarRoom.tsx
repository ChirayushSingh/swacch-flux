"use client";

import { motion } from "framer-motion";
import { Leaf, Wind, Recycle, Trash2, TrendingDown, Cloud, ArrowRight, Award } from "lucide-react";

export default function SustainabilityWarRoom() {
  return (
    <div className="grid grid-cols-12 gap-6 h-[calc(100vh-120px)] overflow-y-auto pr-2">
      
      {/* Carbon Intensity Header */}
      <div className="col-span-12 bg-emerald-500 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-emerald-500/20">
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/20 backdrop-blur-md rounded-xl">
              <Leaf className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold">Carbon Intelligence Hub</h1>
          </div>
          
          <div className="grid grid-cols-4 gap-8">
            {[
              { label: "Net CO2 Emitted", value: "1,242 kg", trend: "-12%", icon: Cloud },
              { label: "Waste Diverted", value: "84.5 Tons", trend: "+24%", icon: Recycle },
              { label: "Methane Avoided", value: "12,400 kg", trend: "+18%", icon: Wind },
              { label: "Efficiency Gain", value: "22%", trend: "+5%", icon: TrendingDown },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-white/60 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
                <div className="flex items-center gap-2">
                   <p className="text-3xl font-bold">{stat.value}</p>
                   <span className="text-[10px] font-bold bg-white/20 px-1.5 py-0.5 rounded-full">{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Abstract Background Decoration */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -left-10 -top-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl" />
      </div>

      {/* Main Impact Analytics */}
      <div className="col-span-8 grid grid-cols-2 gap-6">
        
        {/* Landfill vs Diversion Chart Placeholder */}
        <div className="col-span-2 bg-card border border-border rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold flex items-center gap-2">
              <Recycle className="w-5 h-5 text-emerald-500" />
              Waste Lifecycle Analytics
            </h3>
            <div className="flex gap-2">
               <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500">
                 <div className="w-2 h-2 rounded-full bg-emerald-500" /> Diverted
               </span>
               <span className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                 <div className="w-2 h-2 rounded-full bg-slate-400" /> Landfill
               </span>
            </div>
          </div>
          <div className="h-64 flex items-end gap-4 px-4">
             {[60, 80, 45, 90, 70, 85, 100].map((h, i) => (
               <div key={i} className="flex-1 flex flex-col items-center gap-2">
                 <div className="w-full relative group">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      className="w-full bg-emerald-500/20 rounded-t-lg transition-colors group-hover:bg-emerald-500/30" 
                    />
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${h * 0.7}%` }}
                      className="absolute bottom-0 w-full bg-emerald-500 rounded-t-lg" 
                    />
                 </div>
                 <span className="text-[10px] font-bold text-muted-foreground">Day {i+1}</span>
               </div>
             ))}
          </div>
        </div>

        {/* Carbon Heatmap Preview */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col">
           <h3 className="font-bold text-sm mb-4">Emissions Heatmap</h3>
           <div className="flex-1 bg-slate-100 dark:bg-slate-900 rounded-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-orange-500/10 to-emerald-500/20 blur-xl opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GIS Emission Layer Active</p>
              </div>
           </div>
        </div>

        {/* AI Sustainability Suggestions */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-sm flex flex-col">
           <h3 className="font-bold text-sm mb-4">Sustainability Actions</h3>
           <div className="space-y-3">
              {[
                { task: "Optimize Route 12", save: "4.2kg CO2", icon: ArrowRight },
                { task: "Deploy EV Compactor", save: "12kg CO2/day", icon: Leaf },
                { task: "Redirect Ward 4 Waste", save: "8% Fuel", icon: TrendingDown },
              ].map((act, i) => (
                <div key={i} className="p-3 bg-secondary/30 rounded-xl flex items-center justify-between group cursor-pointer hover:bg-secondary/50 transition-all">
                  <div>
                    <p className="text-xs font-bold">{act.task}</p>
                    <p className="text-[10px] text-emerald-500">Potential: {act.save}</p>
                  </div>
                  <act.icon className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 transition-colors" />
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* ESG Scoring & Reporting */}
      <div className="col-span-4 space-y-6">
        
        {/* ESG Scorecard */}
        <div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="font-bold text-lg">ESG Score</h3>
              <p className="text-xs text-white/40">Sustainability Index</p>
            </div>
            <div className="w-12 h-12 rounded-full border-4 border-emerald-500 flex items-center justify-center font-bold text-sm">
              84
            </div>
          </div>
          
          <div className="space-y-6">
            {[
              { label: "Environmental", val: 88 },
              { label: "Social", val: 92 },
              { label: "Governance", val: 78 },
            ].map((score, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-white/60">{score.label}</span>
                  <span>{score.val}%</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${score.val}%` }}
                    className="h-full bg-emerald-500" 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Green Certificates */}
        <div className="bg-card border border-border rounded-3xl p-6">
           <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
             <Award className="w-4 h-4 text-emerald-500" />
             Municipal Recognition
           </h3>
           <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl text-center">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-xs font-bold mb-1">Ward 4 Certificate</p>
              <p className="text-[10px] text-muted-foreground mb-4">For 20% reduction in fleet emissions.</p>
              <button className="text-[10px] font-bold text-emerald-500 hover:underline">Download PDF</button>
           </div>
        </div>

        {/* Export Reporting */}
        <button className="w-full py-4 bg-foreground text-background font-bold rounded-2xl flex items-center justify-center gap-3 hover:opacity-90 transition-all">
          <Trash2 className="w-5 h-5" />
          Generate ESG Audit
        </button>
      </div>

    </div>
  );
}
